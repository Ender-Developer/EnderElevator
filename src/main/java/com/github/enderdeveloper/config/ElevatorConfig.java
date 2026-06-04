package com.github.enderdeveloper.config;

import com.github.enderdeveloper.util.SmoothingMath;
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
            .append(new KeyedCodec<>("EnableSmoothMovement", Codec.BOOLEAN),
                    (config, value) -> config.enableSmoothMovement = value,
                    config -> config.enableSmoothMovement)
            .add()
            .append(new KeyedCodec<>("SmoothingDurationMs", Codec.INTEGER),
                    (config, value) -> config.smoothingDurationMs = value,
                    config -> config.smoothingDurationMs)
            .add()
            .build();

    private int maxSearchDistance = 320;
    private long cooldownMs = 500;
    private boolean enableSound = false;
    private boolean enableSmoothMovement = false;
    private int smoothingDurationMs = SmoothingMath.DEFAULT_DURATION_MS;

    public int getMaxSearchDistance() {
        return maxSearchDistance;
    }

    public long getCooldownMs() {
        return cooldownMs;
    }

    public boolean isEnableSound() {
        return enableSound;
    }

    public boolean isEnableSmoothMovement() {
        return enableSmoothMovement;
    }

    public int getSmoothingDurationMs() {
        return SmoothingMath.clampDurationMs(smoothingDurationMs);
    }
}
