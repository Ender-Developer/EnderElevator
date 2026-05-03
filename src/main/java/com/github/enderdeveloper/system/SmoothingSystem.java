package com.github.enderdeveloper.system;

import com.github.enderdeveloper.component.SmoothingComponent;
import com.hypixel.hytale.component.ArchetypeChunk;
import com.hypixel.hytale.component.CommandBuffer;
import com.hypixel.hytale.component.Store;
import com.hypixel.hytale.component.query.Query;
import com.hypixel.hytale.component.system.tick.EntityTickingSystem;
import com.hypixel.hytale.math.util.MathUtil;
import com.hypixel.hytale.math.vector.Transform;
import com.hypixel.hytale.server.core.entity.entities.Player;
import com.hypixel.hytale.server.core.modules.entity.component.TransformComponent;
import com.hypixel.hytale.server.core.modules.entity.teleport.Teleport;
import com.hypixel.hytale.server.core.universe.world.World;
import com.hypixel.hytale.server.core.universe.world.storage.EntityStore;
import org.checkerframework.checker.nullness.compatqual.NonNullDecl;
import org.checkerframework.checker.nullness.compatqual.NullableDecl;
import org.joml.Vector3d;

public class SmoothingSystem extends EntityTickingSystem<EntityStore> {

    private final Query<EntityStore> query;

    public SmoothingSystem() {
        this.query = Query.and(
                Player.getComponentType(),
                SmoothingComponent.getComponentType(),
                TransformComponent.getComponentType()
        );
    }

    @Override
    public void tick(float dt, int index, @NonNullDecl ArchetypeChunk<EntityStore> archetypeChunk, @NonNullDecl Store<EntityStore> store, @NonNullDecl CommandBuffer<EntityStore> commandBuffer) {
        SmoothingComponent smoothing = archetypeChunk.getComponent(index, SmoothingComponent.getComponentType());
        if (smoothing == null) return;

        World world = store.getExternalData().getWorld();
        
        float progress = smoothing.getProgress() + (dt * smoothing.getSpeed());
        
        if (progress >= 1.0f) {
            // Arrived at destination
            world.execute(() -> {
                Teleport teleport = Teleport.createForPlayer(world, new Transform(smoothing.getEndPosition(), new com.hypixel.hytale.math.vector.Rotation3f()));
                store.addComponent(archetypeChunk.getReferenceTo(index), Teleport.getComponentType(), teleport);
                store.removeComponent(archetypeChunk.getReferenceTo(index), SmoothingComponent.getComponentType());
            });
        } else {
            smoothing.setProgress(progress);
            
            // Calculate interpolated position
            Vector3d currentPos = new Vector3d();
            currentPos.x = MathUtil.lerp(smoothing.getStartPosition().x, smoothing.getEndPosition().x, progress);
            currentPos.y = MathUtil.lerp(smoothing.getStartPosition().y, smoothing.getEndPosition().y, progress);
            currentPos.z = MathUtil.lerp(smoothing.getStartPosition().z, smoothing.getEndPosition().z, progress);

            world.execute(() -> {
                // Use teleport for smooth but forced server-authoritative movement 
                Teleport teleport = Teleport.createForPlayer(world, new Transform(currentPos, new com.hypixel.hytale.math.vector.Rotation3f()));
                store.addComponent(archetypeChunk.getReferenceTo(index), Teleport.getComponentType(), teleport);
            });
        }
    }

    @NullableDecl
    @Override
    public Query<EntityStore> getQuery() {
        return query;
    }
}
