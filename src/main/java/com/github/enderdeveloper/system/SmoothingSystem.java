package com.github.enderdeveloper.system;

import com.github.enderdeveloper.component.SmoothingComponent;
import com.github.enderdeveloper.util.PlayerTeleportFactory;
import com.github.enderdeveloper.util.SmoothingMath;
import com.hypixel.hytale.component.ArchetypeChunk;
import com.hypixel.hytale.component.CommandBuffer;
import com.hypixel.hytale.component.Ref;
import com.hypixel.hytale.component.Store;
import com.hypixel.hytale.component.query.Query;
import com.hypixel.hytale.component.system.tick.EntityTickingSystem;
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
    private final ThreadLocal<Vector3d> currentPosition = ThreadLocal.withInitial(Vector3d::new);

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

        TransformComponent transformComp = archetypeChunk.getComponent(index, TransformComponent.getComponentType());
        if (transformComp == null) return;

        World world = store.getExternalData().getWorld();
        Ref<EntityStore> entityRef = archetypeChunk.getReferenceTo(index);

        smoothing.setElapsedSeconds(smoothing.getElapsedSeconds() + dt);
        float progress = SmoothingMath.normalizedProgress(smoothing.getElapsedSeconds(), smoothing.getDurationSeconds());
        float easedProgress = SmoothingMath.easeInOutCubic(progress);
        Vector3d interpolatedPosition = currentPosition.get();
        SmoothingMath.interpolate(smoothing.getStartPosition(), smoothing.getEndPosition(), easedProgress, interpolatedPosition);
        transformComp.setPosition(interpolatedPosition);

        if (progress >= 1.0f) {
            Teleport teleport = PlayerTeleportFactory.create(world, smoothing.getEndPosition(), smoothing.getRotation());
            commandBuffer.addComponent(entityRef, Teleport.getComponentType(), teleport);
            commandBuffer.removeComponent(entityRef, SmoothingComponent.getComponentType());
        }
    }

    @NullableDecl
    @Override
    public Query<EntityStore> getQuery() {
        return query;
    }
}
