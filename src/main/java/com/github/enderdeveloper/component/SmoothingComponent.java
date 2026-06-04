package com.github.enderdeveloper.component;

import com.github.enderdeveloper.util.SmoothingMath;
import com.hypixel.hytale.component.Component;
import com.hypixel.hytale.component.ComponentType;
import com.hypixel.hytale.math.vector.Rotation3f;
import com.hypixel.hytale.server.core.universe.world.storage.EntityStore;
import javax.annotation.Nonnull;
import org.joml.Vector3d;

public class SmoothingComponent implements Component<EntityStore> {
    private static ComponentType<EntityStore, SmoothingComponent> componentType;

    public static ComponentType<EntityStore, SmoothingComponent> getComponentType() {
        return componentType;
    }

    public static void setComponentType(ComponentType<EntityStore, SmoothingComponent> componentType) {
        SmoothingComponent.componentType = componentType;
    }

    private Vector3d startPosition;
    private Vector3d endPosition;
    private Rotation3f rotation;
    private float elapsedSeconds;
    private float durationSeconds;

    public SmoothingComponent() {
    }

    public SmoothingComponent(Vector3d startPosition, Vector3d endPosition, Rotation3f rotation, int durationMs) {
        this.startPosition = new Vector3d(startPosition);
        this.endPosition = new Vector3d(endPosition);
        this.rotation = new Rotation3f(rotation);
        this.elapsedSeconds = 0.0f;
        this.durationSeconds = SmoothingMath.durationSeconds(durationMs);
    }

    public SmoothingComponent(@Nonnull SmoothingComponent other) {
        this.startPosition = new Vector3d(other.startPosition);
        this.endPosition = new Vector3d(other.endPosition);
        this.rotation = other.rotation == null ? new Rotation3f() : new Rotation3f(other.rotation);
        this.elapsedSeconds = other.elapsedSeconds;
        this.durationSeconds = other.durationSeconds;
    }

    public Vector3d getStartPosition() {
        return startPosition;
    }

    public Vector3d getEndPosition() {
        return endPosition;
    }

    public Rotation3f getRotation() {
        return rotation == null ? new Rotation3f() : new Rotation3f(rotation);
    }

    public float getElapsedSeconds() {
        return elapsedSeconds;
    }

    public void setElapsedSeconds(float elapsedSeconds) {
        this.elapsedSeconds = Math.max(0.0f, elapsedSeconds);
    }

    public float getDurationSeconds() {
        return durationSeconds;
    }

    @Nonnull
    @Override
    public Component<EntityStore> clone() {
        return new SmoothingComponent(this);
    }
}
