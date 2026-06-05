# EnderElevator - System Design Document

**Version**: 1.1.4 (Pre-Release 2026 Ready)
**Author**: EnderDeveloper Team  
**Architecture**: Hytale ECS (Entity Component System)  

---

## 1. Executive Summary
EnderElevator is a gameplay-enhancing mod for Hytale, inspired by the "OpenBlocks Elevator" from Minecraft. It provides a seamless vertical transportation solution using specialized elevator blocks. Players interact with these blocks using natural movement keys (Jump/Crouch) to navigate between floors instantly.

## 2. System Architecture

### 2.1 Overview
The mod is built on the Hytale **Entity Component System (ECS)**. It operates as a server-authoritative plugin that monitors player states and world geometry to facilitate safe and immersive teleportation.

### 2.2 Core Components
| Class | Role | Responsibility |
| :--- | :--- | :--- |
| `Main` | Plugin Entry | Registration of systems, components, and configuration. |
| `ElevatorSystem` | Orchestrator | The primary logic loop. Handles detection, search, and effect triggering. |
| `ElevatorComponent` | Data Store | Stores per-player persistent state: successful teleport cooldown plus short failed-search throttles. |
| `SmoothingComponent` | Travel State | Stores start/end positions, elapsed time, and smooth travel duration. |
| `SmoothingSystem` | Travel Runner | Interpolates player position through `TransformComponent#setPosition()` and queues a final correction teleport. |
| `ElevatorConfig` | Configuration | Defines search distances, cooldown timings, and effect toggles via `BuilderCodec`. |

---

## 3. Functional Logic

### 3.1 Interaction Triggering
The system queries for entities containing `Player`, `MovementStatesComponent`, and `TransformComponent`.
- **Upward**: Triggered when `MovementStates.jumping` is `true`.
- **Downward**: Triggered when `MovementStates.crouching` is `true`.
- **Hot Path**: Input, smooth-travel, and cooldown checks run before world block reads so idle players do not touch chunk/block APIs.

### 3.2 Search Algorithm (Vertical Search)
1. **Validation**: Checks if the player is standing on a block whose ID contains `ender_elevator_block`.
2. **Chunk Safety**: Calculates the chunk index of the current position and verifies it is loaded via `world.getChunkIfLoaded()`.
3. **Iteration**: Scans vertically (Y-axis) up to `maxSearchDistance`.
4. **Target Matching**: Matches only blocks of the same variant (color-matching support).
5. **Obstruction Check**: Verifies that the two blocks above the target elevator are `empty` to prevent player suffocation.
6. **Failed Search Throttle**: If no target is found, the player receives a short per-direction retry delay to avoid rescanning hundreds of blocks every tick while holding input.

### 3.3 Travel Execution
Instant travel is performed by adding a `Teleport` component to the player entity.
- **Threading Model**: Mutations are queued via the `CommandBuffer` to ensure thread safety within Hytale's ticking cycle.
- **Positioning**: Target coordinates are calculated at the center of the block (`+0.5`) with a vertical offset (`+1.2`) to align feet with the floor.

Optional smooth travel avoids adding `Teleport` every tick. `ElevatorSystem` adds a `SmoothingComponent`, and `SmoothingSystem` advances the player with `TransformComponent#setPosition()` using cubic ease-in-out interpolation. The component stores a copy of the player's starting rotation, so looking down/up during activation is preserved when progress reaches 100% and the system queues one final `Teleport.createForPlayer(...)` correction at the destination.

---

## 4. Technical Constraints & Safety

### 4.1 Store Processing Protection
Hytale's `Store` cannot be modified while it is being iterated (the `tick` phase).
- **Rule**: Never use `store.addComponent()` or `world.execute()` during a tick.
- **Solution**: All state changes are dispatched via `commandBuffer.addComponent()`.
- **Smooth Movement**: Per-tick travel updates mutate the already-fetched `TransformComponent`; adding/removing ECS components still goes through `CommandBuffer`.

### 4.2 Chunk Loading Hazards
Accessing `world.getBlockType()` on a chunk that is not in a "ticking" state triggers synchronous IO, which crashes the ECS loop.
- **Rule**: Always gate block access with a `getChunkIfLoaded` check.

### 4.3 Asset Registry Timing
Sound registries are initialized after the plugin lifecycle starts.
- **Solution**: **Lazy Loading**. The system attempts to retrieve the sound index only when a teleport succeeds and sound is enabled, then caches it once found.

---

## 5. Visual & Auditory Feedback (UX)

### 5.1 Immersion Effects
- **Auditory**: Plays `SFX_Portal_Neutral_Teleport_Local` on successful teleport using `SoundUtil` (if enabled in config).
- **Motion**: Smooth travel uses a short 180ms-650ms cubic interpolation window when enabled. The default duration is 320ms.

### 5.2 Configuration
Administrators can toggle effects in `config.json`:
- `EnableSound`: true/false (Default: false)
- `EnableSmoothMovement`: true/false (Default: false)
- `SmoothingDurationMs`: integer milliseconds, clamped to 180-650 (Default: 320)

---

## 6. Asset Pack Structure
The mod utilizes the Hytale Asset Pack system (`IncludesAssetPack: true`):
```text
resources/
├── manifest.json
├── Common/
│   ├── BlockTextures/
│   └── Icons/
└── Server/
    ├── Item/Items/
    └── Languages/
```

---

## 7. Roadmap & Future Evolution (2.0+)
1. **Directional Teleportation**: Support for horizontal "push" elevators.
2. **Multi-Block Elevators**: Support for larger elevator platforms (3x3, etc.).
3. **Enhanced UI**: Diagnostic HUD for floor names and destination selection.
