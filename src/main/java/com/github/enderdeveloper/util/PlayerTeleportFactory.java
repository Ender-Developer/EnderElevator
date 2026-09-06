package com.github.enderdeveloper.util;

import com.hypixel.hytale.math.vector.Rotation3f;
import com.hypixel.hytale.server.core.modules.entity.teleport.Teleport;
import com.hypixel.hytale.server.core.universe.world.World;
import org.joml.Vector3d;

public final class PlayerTeleportFactory {

    private PlayerTeleportFactory() {
    }

    /**
     * Builds a player teleport using the Shared Source {@code createForPlayer} contract:
     * yaw-only body rotation + full look rotation on the head.
     * {@link Teleport#clone()} now copies {@code headRotation}, so callers must not
     * overwrite body rotation with the full look rotation afterward.
     */
    public static Teleport create(World world, Vector3d position, Rotation3f lookRotation) {
        return Teleport.createForPlayer(world, position, lookRotation);
    }
}
