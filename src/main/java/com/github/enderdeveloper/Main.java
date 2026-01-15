package com.github.enderdeveloper;

import com.hypixel.hytale.logger.HytaleLogger;
import com.hypixel.hytale.server.core.plugin.JavaPlugin;
import com.hypixel.hytale.server.core.plugin.JavaPluginInit;

import javax.annotation.Nonnull;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Main extends JavaPlugin {

    public static HytaleLogger LOGGER = HytaleLogger.get("Ender");

    public Main(@Nonnull JavaPluginInit init) {
        super(init);
    }

    @Override
    protected void setup() {
        String currentlyYear = (new SimpleDateFormat("yyyy")).format(new Date());
        LOGGER.atInfo().log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
        LOGGER.atInfo().log("");
        LOGGER.atInfo().log("  ______           _           _____              ");
        LOGGER.atInfo().log(" |  ____|         | |         |  __ \\             ");
        LOGGER.atInfo().log(" | |__   _ __   __| | ___ _ __| |  | | _____   __ ");
        LOGGER.atInfo().log(" |  __| | '_ \\ / _` |/ _ \\ '__| |  | |/ _ \\ \\ / / ");
        LOGGER.atInfo().log(" | |____| | | | (_| |  __/ |  | |__| |  __/\\ V /  ");
        LOGGER.atInfo().log(" |______|_| |_|\\__,_|\\___|_|  |_____/ \\___| \\_/   ");
        LOGGER.atInfo().log("                                                  ");
        LOGGER.atInfo().log(" :: " + Tags.PROJECT_NAME + " :: (v" + Tags.PROJECT_VERSION + ")");
        LOGGER.atInfo().log(" [!] Authors: https://github.com/Nxkoo (NykooX), https://github.com/JoaoAlberis (MrJoao04)");
        LOGGER.atInfo().log(" [!] Copyright (c) 2026-" + currentlyYear);
        LOGGER.atInfo().log(" [!] Status: Elevators Online");
        LOGGER.atInfo().log(" [!] Github: https://github.com/Ender-Developer/EnderElevator");
        LOGGER.atInfo().log("");
        LOGGER.atInfo().log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
    }

    @Override
    protected void shutdown() {
        LOGGER.atInfo().log("");
        LOGGER.atInfo().log(" [" + Tags.PROJECT_NAME + "] Systems shutting down...");
        LOGGER.atInfo().log(" [" + Tags.PROJECT_NAME + "] Goodbye!");
        LOGGER.atInfo().log("");

        super.shutdown();
    }
}