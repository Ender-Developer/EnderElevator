package com.github.enderdeveloper.util;

import com.hypixel.hytale.math.vector.Rotation3f;
import com.hypixel.hytale.server.core.modules.entity.component.HeadRotation;
import com.hypixel.hytale.server.core.modules.entity.component.TransformComponent;

public final class PlayerLookRotation {

    private PlayerLookRotation() {
    }

    public static Rotation3f capture(TransformComponent transform, HeadRotation headRotation) {
        if (headRotation != null) {
            return new Rotation3f(headRotation.getRotation());
        }
        return new Rotation3f(transform.getRotation());
    }
}
