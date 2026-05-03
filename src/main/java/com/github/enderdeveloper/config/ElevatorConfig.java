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
            .build();

    private int maxSearchDistance = 320;
    private long cooldownMs = 500;

    public int getMaxSearchDistance() {
        return maxSearchDistance;
    }

    public long getCooldownMs() {
        return cooldownMs;
    }
}
