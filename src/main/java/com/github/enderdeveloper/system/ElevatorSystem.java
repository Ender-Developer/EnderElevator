package com.github.enderdeveloper.system;

import com.github.enderdeveloper.component.ElevatorComponent;
import com.github.enderdeveloper.config.ElevatorConfig;
import com.hypixel.hytale.component.ArchetypeChunk;
import com.hypixel.hytale.component.CommandBuffer;
import com.hypixel.hytale.component.ComponentType;
import com.hypixel.hytale.component.Store;
import com.hypixel.hytale.component.query.Query;
import com.hypixel.hytale.component.system.tick.EntityTickingSystem;
import com.hypixel.hytale.logger.HytaleLogger;
import com.hypixel.hytale.math.vector.Transform;
import com.hypixel.hytale.protocol.MovementStates;
import com.hypixel.hytale.server.core.asset.type.blocktype.config.BlockType;
import com.hypixel.hytale.server.core.entity.entities.Player;
import com.hypixel.hytale.server.core.entity.movement.MovementStatesComponent;
import com.hypixel.hytale.server.core.modules.entity.component.TransformComponent;
import com.hypixel.hytale.server.core.modules.entity.teleport.Teleport;
import com.hypixel.hytale.server.core.universe.PlayerRef;
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

    @Override
    public void tick(float dt, int index, @NonNullDecl ArchetypeChunk<EntityStore> archetypeChunk, @NonNullDecl Store<EntityStore> store, @NonNullDecl CommandBuffer<EntityStore> commandBuffer) {
        PlayerRef playerRef = archetypeChunk.getComponent(index, PlayerRef.getComponentType());
        if (playerRef == null) return;

        TransformComponent transformComp = archetypeChunk.getComponent(index, transformType);
        if (transformComp == null) return;

        Vector3d pos = transformComp.getPosition();
        World world = store.getExternalData().getWorld();

        int playerX = (int) Math.floor(pos.x);
        int playerY = (int) Math.floor(pos.y - 1);
        int playerZ = (int) Math.floor(pos.z);

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
            for (int y = playerY + 2; y < (config.getMaxSearchDistance()); y++) {
                if (tryTeleport(world, store, archetypeChunk, index, states, playerX, y, playerZ, elevatorVariant, commandBuffer)) {
                    states.jumping = false;
                    break;
                }
            }
        } else if (states.crouching) {
            for (int y = playerY - 2; y > 0; y--) {
                if (tryTeleport(world, store, archetypeChunk, index, states, playerX, y, playerZ, elevatorVariant, commandBuffer)) {
                    states.crouching = false;
                    break;
                }
            }
        }
    }

    private boolean tryTeleport(World world, Store<EntityStore> store, ArchetypeChunk<EntityStore> chunk, int index, MovementStates states, int x, int y, int z, String elevatorVariant, CommandBuffer<EntityStore> commandBuffer) {
        BlockType targetBlock = world.getBlockType(x, y, z);

        if (targetBlock != null && targetBlock.getId().equalsIgnoreCase(elevatorVariant)) {
            if (isObstructed(world, x, y + 1, z) || isObstructed(world, x, y + 2, z)) {
                return false;
            }

            double targetX = x + 0.5;
            double targetY = y + 1.2;
            double targetZ = z + 0.5;

            states.onGround = true;

            world.execute(() -> {
                Teleport teleport = Teleport.createForPlayer(world, new Transform(targetX, targetY, targetZ));
                store.addComponent(chunk.getReferenceTo(index), Teleport.getComponentType(), teleport);
            });

            applyCooldown(chunk, index, commandBuffer);
            return true;
        }
        return false;
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
