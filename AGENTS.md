# EnderElevator - Agent Guide

This file provides context and instructions for AI agents working on the EnderElevator mod for Hytale.

## 🛠 Project Overview

**EnderElevator** is a Hytale mod inspired by the "OpenBlocks Elevator". It allows players to teleport vertically between elevator blocks by jumping (up) or crouching (down).

### Technical Stack
- **Game Version**: Hytale Pre-Release. Manifest `ServerVersion` is SemverRange `*`.
- **Java Version**: 25
- **Math Library**: JOML (`org.joml.Vector3d`)
- **System Architecture**: ECS (Entity Component System)

## 🏗 Key Components

### 1. `ElevatorSystem`
The heart of the mod. It runs as an `EntityTickingSystem` and:
- Checks if the player is standing on an `ender_elevator_block`.
- Monitors `MovementStates` (jumping/crouching).
- Performs safe vertical searches for target blocks.
- Triggers instant `Teleport` components or starts a smooth travel component.
- Plays the teleport sound if enabled in config.

### 2. `ElevatorComponent`
A native ECS component used to store the `lastUseTimestamp` for each player. This handles cooldowns without using static maps, ensuring better performance and persistence compatibility.
It also stores short failed-search timestamps per direction so holding jump/crouch on an elevator without a valid destination does not scan the full vertical range every tick.

### 3. `SmoothingComponent` and `SmoothingSystem`
Native ECS state and ticking logic for optional smooth vertical travel.
- `SmoothingComponent` stores start/end positions, elapsed time, and duration.
- `SmoothingSystem` moves the player through `TransformComponent#setPosition()` each tick and uses a single final `Teleport` correction.
- Capture a copy of look rotation (prefer `HeadRotation`, fallback `TransformComponent#getRotation()`) when travel starts and pass it to `Teleport.createForPlayer(...)`; this preserves the player's pitch/yaw.
- Do **not** call `setRotation` with the full look rotation after `createForPlayer` — that API already applies yaw-only body + full head rotation, and `Teleport.clone()` copies `headRotation`.
- Never implement smoothing by adding a `Teleport` component every tick; that creates visible jitter and rotation resets.

### 4. `ElevatorConfig`
Managed via Hytale's `BuilderCodec`. Configuration is stored in `config.json` and includes:
- `maxSearchDistance`: Maximum vertical range.
- `cooldownMs`: Time between teleports.
- `enableSound`: Toggle for teleport sound (Default: false).
- `enableSmoothMovement`: Toggle for smooth vertical travel (Default: false).
- `smoothingDurationMs`: Smooth travel duration, clamped between 180ms and 650ms (Default: 320).

## ⚠️ Important Implementation Notes

### 1. Store Processing & Threading
Never modify the `Store` directly during a system tick or via `world.execute`. This causes `java.lang.IllegalStateException: Store is currently processing!`.
**Correct Pattern**: Use `commandBuffer.addComponent(entityRef, ...)` for all mutations.

### 2. Chunk Readiness
Before calling `world.getBlockType()`, always verify the chunk is ticking:
```java
long chunkIndex = ChunkUtil.indexChunkFromBlock(x, z);
if (world.getChunkIfLoaded(chunkIndex) == null) return;
```
Accessing blocks in non-ticking chunks during a tick cycle will crash the server.
Note: `getChunkIfLoaded` / `getBlockType` are `@Deprecated(forRemoval = true)` on current pre-release servers but remain the supported readiness check for this mod until a chunk-ref migration.

### 3. Asset Indexing
Hytale 2.0 registries load after plugin initialization. Always use **Lazy Loading** for sound indices:
- Sound: `SoundEvent.getAssetMap().getIndex("SFX/...")`
- Missing key → `AssetMapWithIndexes.NOT_FOUND` (`Integer.MIN_VALUE`); never play `SoundEvent.EMPTY_ID` (`0`).
- Resolve the sound only when a teleport succeeds and sound is enabled; do not retry asset lookup on every idle player tick.

## 🚀 Development Workflow

- **Build**: `./gradlew build`
- **Run**: Use the `HytaleServer` run configuration in IntelliJ.
- **Assets**: Located in `src/main/resources`. `IncludesAssetPack` must be `true` in `manifest.json`.
- **Debugging**: Enable Hytale Diagnostic Mode in game settings for UI/Asset errors.
- **patchline**: `pre-release` when targeting the current pre-release channel.

## 🗺 Roadmap 2.0
- [x] ECS Modernization.
- [x] Sound Effects (`SFX_Portal_Neutral_Teleport_Local`).
- [x] Configuration toggles for sound and smooth travel.
- [x] Smooth Interpolated Movement.
- [ ] Directional Elevators (Horizontal teleportation).
