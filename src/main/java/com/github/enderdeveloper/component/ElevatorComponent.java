package com.github.enderdeveloper.component;

import com.hypixel.hytale.component.Component;
import com.hypixel.hytale.component.ComponentType;
import com.hypixel.hytale.server.core.universe.world.storage.EntityStore;
import javax.annotation.Nonnull;

public class ElevatorComponent implements Component<EntityStore> {
    private static ComponentType<EntityStore, ElevatorComponent> componentType;

    public static ComponentType<EntityStore, ElevatorComponent> getComponentType() {
        return componentType;
    }

    public static void setComponentType(ComponentType<EntityStore, ElevatorComponent> componentType) {
        ElevatorComponent.componentType = componentType;
    }

    private long lastUseTimestamp;
    private long lastFailedUpTimestamp;
    private long lastFailedDownTimestamp;

    public ElevatorComponent() {
    }

    public ElevatorComponent(long lastUseTimestamp) {
        this.lastUseTimestamp = lastUseTimestamp;
    }

    public ElevatorComponent(@Nonnull ElevatorComponent other) {
        this.lastUseTimestamp = other.lastUseTimestamp;
        this.lastFailedUpTimestamp = other.lastFailedUpTimestamp;
        this.lastFailedDownTimestamp = other.lastFailedDownTimestamp;
    }

    public long getLastUseTimestamp() {
        return lastUseTimestamp;
    }

    public void setLastUseTimestamp(long lastUseTimestamp) {
        this.lastUseTimestamp = lastUseTimestamp;
    }

    public long getLastFailedUseTimestamp(boolean up) {
        return up ? lastFailedUpTimestamp : lastFailedDownTimestamp;
    }

    public void setLastFailedUseTimestamp(boolean up, long timestamp) {
        if (up) {
            this.lastFailedUpTimestamp = timestamp;
        } else {
            this.lastFailedDownTimestamp = timestamp;
        }
    }

    @Nonnull
    @Override
    public Component<EntityStore> clone() {
        return new ElevatorComponent(this);
    }
}
