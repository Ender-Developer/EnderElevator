package com.github.enderdeveloper.config;

import com.hypixel.hytale.codec.Codec;
import com.hypixel.hytale.codec.KeyedCodec;
import com.hypixel.hytale.codec.builder.BuilderCodec;

public class ElevatorConfig {
    public static final BuilderCodec<ElevatorConfig> CODEC = BuilderCodec.builder(ElevatorConfig.class, ElevatorConfig::new)
            .append(new KeyedCodec<>("MaxSearchDistance", Codec.INTEGER),
                    (config, value) -> config.maxSearchDistance = value,
                    config -> config.maxSearchDistance)
            .add()
            .append(new KeyedCodec<>("CooldownMs", Codec.LONG),
                    (config, value) -> config.cooldownMs = value,
                    config -> config.cooldownMs)
            .add()
            .append(new KeyedCodec<>("EnableSound", Codec.BOOLEAN),
                    (config, value) -> config.enableSound = value,
                    config -> config.enableSound)
            .add()
            .append(new KeyedCodec<>("EnableShake", Codec.BOOLEAN),
                    (config, value) -> config.enableShake = value,
                    config -> config.enableShake)
            .add()
            .append(new KeyedCodec<>("EnableSmoothMovement", Codec.BOOLEAN),
                    (config, value) -> config.enableSmoothMovement = value,
                    config -> config.enableSmoothMovement)
            .add()
            .append(new KeyedCodec<>("SmoothingSpeed", Codec.FLOAT),
                    (config, value) -> config.smoothingSpeed = value,
                    config -> config.smoothingSpeed)
            .add()
            .build();

    private int maxSearchDistance = 320;
    private long cooldownMs = 500;
    private boolean enableSound = false;
    private boolean enableShake = false;
    private boolean enableSmoothMovement = false;
    private float smoothingSpeed = 5.0f; // progress units per second (1.0 = 1 sec total)

    public int getMaxSearchDistance() {
        return maxSearchDistance;
    }

    public long getCooldownMs() {
        return cooldownMs;
    }

    public boolean isEnableSound() {
        return enableSound;
    }

    public boolean isEnableShake() {
        return enableShake;
    }

    public boolean isEnableSmoothMovement() {
        return enableSmoothMovement;
    }

    public float getSmoothingSpeed() {
        return smoothingSpeed;
    }
}
