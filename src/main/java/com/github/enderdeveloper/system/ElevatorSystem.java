package com.github.enderdeveloper.system;

import com.github.enderdeveloper.component.ElevatorComponent;
import com.github.enderdeveloper.config.ElevatorConfig;
import com.hypixel.hytale.builtin.adventure.camera.asset.camerashake.CameraShake;
import com.hypixel.hytale.component.ArchetypeChunk;
import com.hypixel.hytale.component.CommandBuffer;
import com.hypixel.hytale.component.ComponentType;
import com.hypixel.hytale.component.Ref;
import com.hypixel.hytale.component.Store;
import com.hypixel.hytale.component.query.Query;
import com.hypixel.hytale.component.system.tick.EntityTickingSystem;
import com.hypixel.hytale.logger.HytaleLogger;
import com.hypixel.hytale.math.util.ChunkUtil;
import com.hypixel.hytale.math.vector.Transform;
import com.hypixel.hytale.protocol.AccumulationMode;
import com.hypixel.hytale.protocol.MovementStates;
import com.hypixel.hytale.protocol.SoundCategory;
import com.hypixel.hytale.protocol.packets.camera.CameraShakeEffect;
import com.hypixel.hytale.server.core.asset.type.blocktype.config.BlockType;
import com.hypixel.hytale.server.core.asset.type.soundevent.config.SoundEvent;
import com.hypixel.hytale.server.core.entity.entities.Player;
import com.hypixel.hytale.server.core.entity.movement.MovementStatesComponent;
import com.hypixel.hytale.server.core.modules.entity.component.TransformComponent;
import com.hypixel.hytale.server.core.modules.entity.teleport.Teleport;
import com.hypixel.hytale.server.core.universe.PlayerRef;
import com.hypixel.hytale.server.core.universe.world.SoundUtil;
import com.hypixel.hytale.server.core.universe.world.World;
import com.hypixel.hytale.server.core.universe.world.storage.EntityStore;
import org.checkerframework.checker.nullness.compatqual.NonNullDecl;
import org.checkerframework.checker.nullness.compatqual.NullableDecl;
import org.joml.Vector3d;

public class ElevatorSystem extends EntityTickingSystem<EntityStore> {

    private static final HytaleLogger LOGGER = HytaleLogger.forEnclosingClass();
    private final ElevatorConfig config;

    private final ComponentType<EntityStore, MovementStatesComponent> movementType;
    private final ComponentType<EntityStore, TransformComponent> transformType;
    private final Query<EntityStore> query;

    // Asset indices (lazy loaded)
    private int teleportSoundIndex = 0;
    private int cameraShakeIndex = 0;
    private boolean indicesInitialized = false;

    public ElevatorSystem(ElevatorConfig config) {
        this.config = config;
        this.movementType = MovementStatesComponent.getComponentType();
        this.transformType = TransformComponent.getComponentType();
        this.query = Query.and(
                Player.getComponentType(),
                movementType,
                transformType
        );
    }

    private void ensureIndicesInitialized() {
        if (indicesInitialized) return;

        // Try different path patterns common in Hytale 2.0
        int soundIdx = SoundEvent.getAssetMap().getIndex("SFX_Portal_Neutral_Teleport_Local");
        if (soundIdx == Integer.MIN_VALUE) {
            soundIdx = SoundEvent.getAssetMap().getIndex("SFX.Magic.Portals.SFX_Portal_Neutral_Teleport_Local");
        }
        
        int shakeIdx = CameraShake.getAssetMap().getIndex("Impact_Light");
        if (shakeIdx == Integer.MIN_VALUE) {
            shakeIdx = CameraShake.getAssetMap().getIndex("Impact.Impact_Light");
        }

        if (soundIdx != Integer.MIN_VALUE && shakeIdx != Integer.MIN_VALUE) {
            this.teleportSoundIndex = soundIdx;
            this.cameraShakeIndex = shakeIdx;
            this.indicesInitialized = true;
            LOGGER.atInfo().log("Elevator Effects Successfully Indexed!");
        }
    }

    @Override
    public void tick(float dt, int index, @NonNullDecl ArchetypeChunk<EntityStore> archetypeChunk, @NonNullDecl Store<EntityStore> store, @NonNullDecl CommandBuffer<EntityStore> commandBuffer) {
        ensureIndicesInitialized();

        PlayerRef playerRef = archetypeChunk.getComponent(index, PlayerRef.getComponentType());
        if (playerRef == null) return;

        TransformComponent transformComp = archetypeChunk.getComponent(index, transformType);
        if (transformComp == null) return;

        Vector3d pos = transformComp.getPosition();
        World world = store.getExternalData().getWorld();

        int playerX = (int) Math.floor(pos.x);
        int playerY = (int) Math.floor(pos.y - 1);
        int playerZ = (int) Math.floor(pos.z);

        long chunkIndex = ChunkUtil.indexChunkFromBlock(playerX, playerZ);
        if (world.getChunkIfLoaded(chunkIndex) == null) {
            return;
        }

        BlockType currentBlock = world.getBlockType(playerX, playerY, playerZ);
        if (currentBlock == null || !isElevatorBlock(currentBlock.getId())) {
            return;
        }

        ElevatorComponent elevatorComp = archetypeChunk.getComponent(index, ElevatorComponent.getComponentType());
        if (elevatorComp != null && (System.currentTimeMillis() - elevatorComp.getLastUseTimestamp() < config.getCooldownMs())) {
            return;
        }

        MovementStatesComponent moveComp = archetypeChunk.getComponent(index, movementType);
        if (moveComp == null) return;

        MovementStates states = moveComp.getMovementStates();
        if (!states.jumping && !states.crouching) return;

        String elevatorVariant = currentBlock.getId();

        if (states.jumping) {
            int maxY = Math.min(playerY + config.getMaxSearchDistance(), 318);
            for (int y = playerY + 2; y <= maxY; y++) {
                if (tryTeleport(world, store, archetypeChunk, index, states, playerX, y, playerZ, elevatorVariant, commandBuffer, playerRef)) {
                    states.jumping = false;
                    break;
                }
            }
        } else if (states.crouching) {
            int minY = Math.max(playerY - config.getMaxSearchDistance(), 1);
            for (int y = playerY - 2; y >= minY; y--) {
                if (tryTeleport(world, store, archetypeChunk, index, states, playerX, y, playerZ, elevatorVariant, commandBuffer, playerRef)) {
                    states.crouching = false;
                    break;
                }
            }
        }
    }

    private boolean tryTeleport(World world, Store<EntityStore> store, ArchetypeChunk<EntityStore> chunk, int index, MovementStates states, int x, int y, int z, String elevatorVariant, CommandBuffer<EntityStore> commandBuffer, PlayerRef playerRef) {
        BlockType targetBlock = world.getBlockType(x, y, z);

        if (targetBlock != null && targetBlock.getId().equalsIgnoreCase(elevatorVariant)) {
            if (isObstructed(world, x, y + 1, z) || isObstructed(world, x, y + 2, z)) {
                return false;
            }

            double targetX = x + 0.5;
            double targetY = y + 1.2;
            double targetZ = z + 0.5;

            Ref<EntityStore> entityRef = chunk.getReferenceTo(index);
            Teleport teleport = Teleport.createForPlayer(world, new Transform(targetX, targetY, targetZ));
            commandBuffer.addComponent(entityRef, Teleport.getComponentType(), teleport);

            states.onGround = true;

            applyEffects(playerRef);
            applyCooldown(chunk, index, commandBuffer);

            return true;
        }
        return false;
    }

    private void applyEffects(PlayerRef playerRef) {
        if (teleportSoundIndex != 0 && teleportSoundIndex != Integer.MIN_VALUE) {
            SoundUtil.playSoundEvent2dToPlayer(playerRef, teleportSoundIndex, SoundCategory.UI, 1.0F, 1.0F);
        }

        if (cameraShakeIndex != 0 && cameraShakeIndex != Integer.MIN_VALUE) {
            playerRef.getPacketHandler().write(new CameraShakeEffect(cameraShakeIndex, 1.0F, AccumulationMode.Set));
        }
    }

    private boolean isElevatorBlock(String blockId) {
        return blockId.toLowerCase().contains("ender_elevator_block");
    }

    private boolean isObstructed(World world, int x, int y, int z) {
        BlockType block = world.getBlockType(x, y, z);
        if (block == null) return false;
        String id = block.getId().toLowerCase();
        return !id.equalsIgnoreCase("empty");
    }

    private void applyCooldown(ArchetypeChunk<EntityStore> chunk, int index, CommandBuffer<EntityStore> commandBuffer) {
        long now = System.currentTimeMillis();
        ElevatorComponent elevatorComp = chunk.getComponent(index, ElevatorComponent.getComponentType());
        if (elevatorComp == null) {
            commandBuffer.addComponent(chunk.getReferenceTo(index), ElevatorComponent.getComponentType(), new ElevatorComponent(now));
        } else {
            elevatorComp.setLastUseTimestamp(now);
        }
    }

    @NullableDecl
    @Override
    public Query<EntityStore> getQuery() {
        return query;
    }
}
