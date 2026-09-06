package com.github.enderdeveloper.system;

import com.github.enderdeveloper.component.ElevatorComponent;
import com.github.enderdeveloper.component.SmoothingComponent;
import com.github.enderdeveloper.config.ElevatorConfig;
import com.github.enderdeveloper.util.PlayerLookRotation;
import com.github.enderdeveloper.util.PlayerTeleportFactory;
import com.hypixel.hytale.assetstore.map.AssetMapWithIndexes;
import com.hypixel.hytale.component.ArchetypeChunk;
import com.hypixel.hytale.component.CommandBuffer;
import com.hypixel.hytale.component.ComponentType;
import com.hypixel.hytale.component.Ref;
import com.hypixel.hytale.component.Store;
import com.hypixel.hytale.component.query.Query;
import com.hypixel.hytale.component.system.tick.EntityTickingSystem;
import com.hypixel.hytale.logger.HytaleLogger;
import com.hypixel.hytale.math.util.ChunkUtil;
import com.hypixel.hytale.math.vector.Rotation3f;
import com.hypixel.hytale.protocol.MovementStates;
import com.hypixel.hytale.protocol.SoundCategory;
import com.hypixel.hytale.server.core.asset.type.blocktype.config.BlockType;
import com.hypixel.hytale.server.core.asset.type.soundevent.config.SoundEvent;
import com.hypixel.hytale.server.core.entity.entities.Player;
import com.hypixel.hytale.server.core.entity.movement.MovementStatesComponent;
import com.hypixel.hytale.server.core.modules.entity.component.HeadRotation;
import com.hypixel.hytale.server.core.modules.entity.component.TransformComponent;
import com.hypixel.hytale.server.core.modules.entity.teleport.Teleport;
import com.hypixel.hytale.server.core.universe.PlayerRef;
import com.hypixel.hytale.server.core.universe.world.SoundUtil;
import com.hypixel.hytale.server.core.universe.world.World;
import com.hypixel.hytale.server.core.universe.world.storage.EntityStore;
import org.joml.Vector3d;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class ElevatorSystem extends EntityTickingSystem<EntityStore> {

    private static final HytaleLogger LOGGER = HytaleLogger.forEnclosingClass();
    private static final long FAILED_SEARCH_COOLDOWN_MS = 150L;
    private final ElevatorConfig config;

    private final ComponentType<EntityStore, MovementStatesComponent> movementType;
    private final ComponentType<EntityStore, TransformComponent> transformType;
    private final ComponentType<EntityStore, HeadRotation> headRotationType;
    private final Query<EntityStore> query;

    // Asset indices (lazy loaded). NOT_FOUND until resolved; EMPTY_ID is never played.
    private int teleportSoundIndex = AssetMapWithIndexes.NOT_FOUND;
    private boolean soundIndexInitialized = false;

    public ElevatorSystem(ElevatorConfig config) {
        this.config = config;
        this.movementType = MovementStatesComponent.getComponentType();
        this.transformType = TransformComponent.getComponentType();
        this.headRotationType = HeadRotation.getComponentType();
        this.query = Query.and(
                Player.getComponentType(),
                movementType,
                transformType
        );
    }

    private void ensureSoundIndexInitialized() {
        if (soundIndexInitialized || !config.isEnableSound()) return;

        // Try different path patterns common in Hytale 2.0
        int soundIdx = SoundEvent.getAssetMap().getIndex("SFX_Portal_Neutral_Teleport_Local");
        if (soundIdx == AssetMapWithIndexes.NOT_FOUND) {
            soundIdx = SoundEvent.getAssetMap().getIndex("SFX.Magic.Portals.SFX_Portal_Neutral_Teleport_Local");
        }

        if (soundIdx == AssetMapWithIndexes.NOT_FOUND || soundIdx == SoundEvent.EMPTY_ID) {
            return;
        }

        this.teleportSoundIndex = soundIdx;
        this.soundIndexInitialized = true;
        LOGGER.atInfo().log("Elevator teleport sound successfully indexed.");
    }

    @Override
    public void tick(float dt, int index, @Nonnull ArchetypeChunk<EntityStore> archetypeChunk, @Nonnull Store<EntityStore> store, @Nonnull CommandBuffer<EntityStore> commandBuffer) {
        PlayerRef playerRef = archetypeChunk.getComponent(index, PlayerRef.getComponentType());
        if (playerRef == null) return;

        TransformComponent transformComp = archetypeChunk.getComponent(index, transformType);
        if (transformComp == null) return;

        if (archetypeChunk.getComponent(index, SmoothingComponent.getComponentType()) != null) {
            return;
        }

        MovementStatesComponent moveComp = archetypeChunk.getComponent(index, movementType);
        if (moveComp == null) return;

        MovementStates states = moveComp.getMovementStates();
        if (!states.jumping && !states.crouching) return;

        boolean goingUp = states.jumping;
        long now = System.currentTimeMillis();
        ElevatorComponent elevatorComp = archetypeChunk.getComponent(index, ElevatorComponent.getComponentType());
        if (elevatorComp != null) {
            if (now - elevatorComp.getLastUseTimestamp() < config.getCooldownMs()) {
                return;
            }

            if (now - elevatorComp.getLastFailedUseTimestamp(goingUp) < FAILED_SEARCH_COOLDOWN_MS) {
                return;
            }
        }

        Vector3d pos = transformComp.getPosition();
        World world = store.getExternalData().getWorld();

        int playerX = (int) Math.floor(pos.x);
        int playerY = (int) Math.floor(pos.y - 1);
        int playerZ = (int) Math.floor(pos.z);

        long chunkIndex = ChunkUtil.indexChunkFromBlock(playerX, playerZ);
        // Prefer ticking chunks only (still present on Sync 2026-09-03; deprecated forRemoval).
        if (world.getChunkIfLoaded(chunkIndex) == null) {
            return;
        }

        BlockType currentBlock = world.getBlockType(playerX, playerY, playerZ);
        if (currentBlock == null || !isElevatorBlock(currentBlock.getId())) {
            return;
        }

        String elevatorVariant = currentBlock.getId();
        HeadRotation headRotation = archetypeChunk.getComponent(index, headRotationType);
        Rotation3f lookRotation = PlayerLookRotation.capture(transformComp, headRotation);
        boolean teleported = false;

        if (goingUp) {
            int maxY = Math.min(playerY + config.getMaxSearchDistance(), 318);
            for (int y = playerY + 2; y <= maxY; y++) {
                if (tryTeleport(world, archetypeChunk, index, states, playerX, y, playerZ, elevatorVariant, commandBuffer, playerRef, transformComp, lookRotation, now)) {
                    states.jumping = false;
                    teleported = true;
                    break;
                }
            }
        } else {
            int minY = Math.max(playerY - config.getMaxSearchDistance(), 1);
            for (int y = playerY - 2; y >= minY; y--) {
                if (tryTeleport(world, archetypeChunk, index, states, playerX, y, playerZ, elevatorVariant, commandBuffer, playerRef, transformComp, lookRotation, now)) {
                    states.crouching = false;
                    teleported = true;
                    break;
                }
            }
        }

        if (!teleported) {
            applyFailedSearchCooldown(archetypeChunk, index, commandBuffer, elevatorComp, goingUp, now);
        }
    }

    private boolean tryTeleport(World world, ArchetypeChunk<EntityStore> chunk, int index, MovementStates states, int x, int y, int z, String elevatorVariant, CommandBuffer<EntityStore> commandBuffer, PlayerRef playerRef, TransformComponent transformComp, Rotation3f lookRotation, long now) {
        if (!isChunkLoaded(world, x, z)) {
            return false;
        }

        BlockType targetBlock = world.getBlockType(x, y, z);

        if (targetBlock != null && targetBlock.getId().equalsIgnoreCase(elevatorVariant)) {
            if (isObstructed(world, x, y + 1, z) || isObstructed(world, x, y + 2, z)) {
                return false;
            }

            Vector3d targetPos = new Vector3d(x + 0.5, y + 1.2, z + 0.5);
            Ref<EntityStore> entityRef = chunk.getReferenceTo(index);
            Rotation3f teleportRotation = new Rotation3f(lookRotation);

            if (config.isEnableSmoothMovement()) {
                commandBuffer.addComponent(
                        entityRef,
                        SmoothingComponent.getComponentType(),
                        new SmoothingComponent(transformComp.getPosition(), targetPos, teleportRotation, config.getSmoothingDurationMs())
                );
            } else {
                Teleport teleport = PlayerTeleportFactory.create(world, targetPos, teleportRotation);
                commandBuffer.addComponent(entityRef, Teleport.getComponentType(), teleport);
            }

            states.onGround = true;

            applyEffects(playerRef);
            applyCooldown(chunk, index, commandBuffer, now);

            return true;
        }
        return false;
    }

    private void applyEffects(PlayerRef playerRef) {
        if (!config.isEnableSound()) return;

        ensureSoundIndexInitialized();
        if (teleportSoundIndex != AssetMapWithIndexes.NOT_FOUND && teleportSoundIndex != SoundEvent.EMPTY_ID) {
            SoundUtil.playSoundEvent2dToPlayer(playerRef, teleportSoundIndex, SoundCategory.UI, 1.0F, 1.0F);
        }
    }

    private boolean isElevatorBlock(String blockId) {
        return containsIgnoreCase(blockId, "ender_elevator_block");
    }

    private boolean isObstructed(World world, int x, int y, int z) {
        if (!isChunkLoaded(world, x, z)) {
            return true;
        }

        BlockType block = world.getBlockType(x, y, z);
        if (block == null) return false;
        return !block.getId().equalsIgnoreCase(BlockType.EMPTY_KEY);
    }

    private boolean isChunkLoaded(World world, int x, int z) {
        return world.getChunkIfLoaded(ChunkUtil.indexChunkFromBlock(x, z)) != null;
    }

    private boolean containsIgnoreCase(String value, String expected) {
        int maxStart = value.length() - expected.length();
        for (int i = 0; i <= maxStart; i++) {
            if (value.regionMatches(true, i, expected, 0, expected.length())) {
                return true;
            }
        }
        return false;
    }

    private void applyCooldown(ArchetypeChunk<EntityStore> chunk, int index, CommandBuffer<EntityStore> commandBuffer, long now) {
        ElevatorComponent elevatorComp = chunk.getComponent(index, ElevatorComponent.getComponentType());
        if (elevatorComp == null) {
            commandBuffer.addComponent(chunk.getReferenceTo(index), ElevatorComponent.getComponentType(), new ElevatorComponent(now));
        } else {
            elevatorComp.setLastUseTimestamp(now);
        }
    }

    private void applyFailedSearchCooldown(ArchetypeChunk<EntityStore> chunk, int index, CommandBuffer<EntityStore> commandBuffer, ElevatorComponent elevatorComp, boolean goingUp, long now) {
        if (elevatorComp == null) {
            ElevatorComponent newComponent = new ElevatorComponent(0L);
            newComponent.setLastFailedUseTimestamp(goingUp, now);
            commandBuffer.addComponent(chunk.getReferenceTo(index), ElevatorComponent.getComponentType(), newComponent);
        } else {
            elevatorComp.setLastFailedUseTimestamp(goingUp, now);
        }
    }

    @Nullable
    @Override
    public Query<EntityStore> getQuery() {
        return query;
    }
}
