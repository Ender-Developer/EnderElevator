package com.github.enderdeveloper.component;

import com.hypixel.hytale.component.Component;
import com.hypixel.hytale.component.ComponentType;
import com.hypixel.hytale.server.core.universe.world.storage.EntityStore;
import org.joml.Vector3d;
import javax.annotation.Nonnull;

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
    private float progress; // 0.0 to 1.0
    private float speed;    // progress increment per second

    public SmoothingComponent() {
    }

    public SmoothingComponent(Vector3d startPosition, Vector3d endPosition, float speed) {
        this.startPosition = new Vector3d(startPosition);
        this.endPosition = new Vector3d(endPosition);
        this.progress = 0.0f;
        this.speed = speed;
    }

    public SmoothingComponent(@Nonnull SmoothingComponent other) {
        this.startPosition = new Vector3d(other.startPosition);
        this.endPosition = new Vector3d(other.endPosition);
        this.progress = other.progress;
        this.speed = other.speed;
    }

    public Vector3d getStartPosition() { return startPosition; }
    public Vector3d getEndPosition() { return endPosition; }
    public float getProgress() { return progress; }
    public void setProgress(float progress) { this.progress = progress; }
    public float getSpeed() { return speed; }

    @Nonnull
    @Override
    public Component<EntityStore> clone() {
        return new SmoothingComponent(this);
    }
}
