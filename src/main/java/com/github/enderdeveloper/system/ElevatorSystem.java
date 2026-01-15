package com.github.enderdeveloper.system;

import com.hypixel.hytale.component.ArchetypeChunk;
import com.hypixel.hytale.component.CommandBuffer;
import com.hypixel.hytale.component.ComponentType;
import com.hypixel.hytale.component.Store;
import com.hypixel.hytale.component.query.Query;
import com.hypixel.hytale.component.system.tick.EntityTickingSystem;
import com.hypixel.hytale.math.vector.Transform;
import com.hypixel.hytale.math.vector.Vector3d;
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

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class ElevatorSystem extends EntityTickingSystem<EntityStore> {

    public static final int MAX_WORLD_HEIGHT_POSITION = 320;
    private final ComponentType<EntityStore, MovementStatesComponent> movementType;
    private final ComponentType<EntityStore, TransformComponent> transformType;
    private final Query<EntityStore> query;

    private final Map<UUID, Long> cooldowns = new HashMap<>();

    private static final long COOLDOWN_TIME_MS = 500; // 0.5 second cooldown

    public ElevatorSystem() {
        this.movementType = MovementStatesComponent.getComponentType();
        this.transformType = TransformComponent.getComponentType();
        this.query = Query.and(
                Player.getComponentType(),
                movementType,
                transformType
        );
    }

    @Override
    public void tick( float dt, int index, @NonNullDecl ArchetypeChunk<EntityStore> archetypeChunk, @NonNullDecl Store<EntityStore> store, @NonNullDecl CommandBuffer<EntityStore> commandBuffer ) {
        PlayerRef playerRef = archetypeChunk.getComponent(index, PlayerRef.getComponentType());
        if ( playerRef == null ) return;

        UUID playerUUID = playerRef.getUuid();
        if ( isOnCooldown(playerUUID) ) return;

        MovementStatesComponent moveComp = archetypeChunk.getComponent(index, movementType);
        if ( moveComp == null ) return;

        MovementStates states = moveComp.getMovementStates();

        if ( !states.jumping && !states.crouching ) return;

        TransformComponent transformComp = archetypeChunk.getComponent(index, transformType);
        if ( transformComp == null ) return;

        Vector3d pos = transformComp.getPosition();
        World world = store.getExternalData().getWorld();

        int playerX = (int) Math.floor(pos.getX());
        int playerY = (int) Math.floor(pos.getY() - 1);
        int playerZ = (int) Math.floor(pos.getZ());

        BlockType currentBlock = world.getBlockType(playerX, playerY, playerZ);
        if ( currentBlock == null || !isElevatorBlock(currentBlock.getId()) ) {
            return;
        }

        String elevatorVariant = currentBlock.getId();

        if ( states.jumping ) {
            for ( int y = playerY + 2; y < (MAX_WORLD_HEIGHT_POSITION - 2); y++ ) {
                if ( tryTeleport(world, store, archetypeChunk, index, states, playerX, y, playerZ, playerUUID, elevatorVariant) ) {
                    states.jumping = false;
                    break;
                }
            }
        } else if ( states.crouching ) {
            for ( int y = playerY - 2; y > 0; y-- ) {
                if ( tryTeleport(world, store, archetypeChunk, index, states, playerX, y, playerZ, playerUUID, elevatorVariant) ) {
                    states.crouching = false;
                    break;
                }
            }
        }
    }

    private boolean tryTeleport( World world, Store<EntityStore> store, ArchetypeChunk<EntityStore> chunk, int index, MovementStates states, int x, int y, int z, UUID playerUUID, String elevatorVariant ) {
        BlockType targetBlock = world.getBlockType(x, y, z);

        if ( targetBlock != null && targetBlock.getId().equalsIgnoreCase(elevatorVariant)) {

            if ( isObstructed(world, x, y + 1, z) || isObstructed(world, x, y + 2, z) ) {
                return false;
            }
            double targetX = x + 0.5;
            double targetY = y + 1.2;
            double targetZ = z + 0.5;

            states.onGround = true;

            world.execute(() -> {
                Teleport teleport = new Teleport(new Transform(targetX, targetY, targetZ));
                store.addComponent(chunk.getReferenceTo(index), Teleport.getComponentType(), teleport);
            });

            applyCooldown(playerUUID);

            return true;
        }
        return false;
    }

    private boolean isElevatorBlock( String blockId ) {
        return blockId.toLowerCase().contains("ender_elevator_block");
    }

    private boolean isOnCooldown( UUID playerUUID ) {
        if ( !cooldowns.containsKey(playerUUID) ) return false;
        long lastUse = cooldowns.get(playerUUID);
        return (System.currentTimeMillis() - lastUse) < COOLDOWN_TIME_MS;
    }

    private boolean isObstructed( World world, int x, int y, int z ) {
        BlockType block = world.getBlockType(x, y, z);
        if ( block == null ) return false;

        String id = block.getId().toLowerCase();

        return !id.equalsIgnoreCase("empty");
    }

    private void applyCooldown( UUID playerUUID ) {
        cooldowns.put(playerUUID, System.currentTimeMillis());
    }

    @NullableDecl
    @Override
    public Query<EntityStore> getQuery() {
        return query;
    }
}