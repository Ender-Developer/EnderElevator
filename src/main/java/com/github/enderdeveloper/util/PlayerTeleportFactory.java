package com.github.enderdeveloper.util;

import com.hypixel.hytale.math.vector.Rotation3f;
import com.hypixel.hytale.server.core.modules.entity.teleport.Teleport;
import com.hypixel.hytale.server.core.universe.world.World;
import org.joml.Vector3d;

public final class PlayerTeleportFactory {

    private PlayerTeleportFactory() {
    }

    public static Teleport create(World world, Vector3d position, Rotation3f lookRotation) {
        Rotation3f rotation = new Rotation3f(lookRotation);
        Teleport teleport = Teleport.createForPlayer(world, position, rotation);

        // Teleport.clone() currently does not copy headRotation. Keeping the full
        // rotation on the body rotation as well prevents pitch loss if the component
        // is cloned before Hytale's teleport system consumes it.
        teleport.setRotation(rotation);
        teleport.setHeadRotation(rotation);
        return teleport;
    }
}
