package com.github.enderdeveloper;

import com.hypixel.hytale.logger.HytaleLogger;
import com.hypixel.hytale.server.core.plugin.JavaPlugin;
import com.hypixel.hytale.server.core.plugin.JavaPluginInit;

import javax.annotation.Nonnull;

public class Main extends JavaPlugin {

    public static HytaleLogger LOGGER = HytaleLogger.get("Ender");

    public Main(@Nonnull JavaPluginInit init) {
        super(init);
    }

    @Override
    protected void setup() {
    }
}