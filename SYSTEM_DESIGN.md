# EnderElevator - System Design Document

**Version**: 1.1.3 (Pre-Release 2.0 Ready)  
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
| `ElevatorComponent` | Data Store | Stores per-player persistent state (e.g., Cooldowns). |
| `ElevatorConfig` | Configuration | Defines search distances, cooldown timings, and effect toggles via `BuilderCodec`. |

---

## 3. Functional Logic

### 3.1 Interaction Triggering
The system queries for entities containing `Player`, `MovementStatesComponent`, and `TransformComponent`.
- **Upward**: Triggered when `MovementStates.jumping` is `true`.
- **Downward**: Triggered when `MovementStates.crouching` is `true`.

### 3.2 Search Algorithm (Vertical Search)
1. **Validation**: Checks if the player is standing on a block whose ID contains `ender_elevator_block`.
2. **Chunk Safety**: Calculates the chunk index of the current position and verifies it is loaded via `world.getChunkIfLoaded()`.
3. **Iteration**: Scans vertically (Y-axis) up to `maxSearchDistance`.
4. **Target Matching**: Matches only blocks of the same variant (color-matching support).
5. **Obstruction Check**: Verifies that the two blocks above the target elevator are `empty` to prevent player suffocation.

### 3.3 Teleportation Execution
Teleportation is performed by adding a `Teleport` component to the player entity.
- **Threading Model**: Mutations are queued via the `CommandBuffer` to ensure thread safety within Hytale's ticking cycle.
- **Positioning**: Target coordinates are calculated at the center of the block (`+0.5`) with a vertical offset (`+1.2`) to align feet with the floor.

---

## 4. Technical Constraints & Safety

### 4.1 Store Processing Protection
Hytale's `Store` cannot be modified while it is being iterated (the `tick` phase).
- **Rule**: Never use `store.addComponent()` or `world.execute()` during a tick.
- **Solution**: All state changes are dispatched via `commandBuffer.addComponent()`.

### 4.2 Chunk Loading Hazards
Accessing `world.getBlockType()` on a chunk that is not in a "ticking" state triggers synchronous IO, which crashes the ECS loop.
- **Rule**: Always gate block access with a `getChunkIfLoaded` check.

### 4.3 Asset Registry Timing
Sound and Camera registries are initialized after the plugin lifecycle starts.
- **Solution**: **Lazy Loading**. The system attempts to retrieve asset indices during the first valid tick and caches them once found.

---

## 5. Visual & Auditory Feedback (UX)

### 5.1 Immersion Effects
- **Auditory**: Plays `SFX_Portal_Neutral_Teleport_Local` on successful teleport using `SoundUtil` (if enabled in config).
- **Visual**: Dispatches a `CameraShakeEffect` packet (`Impact_Light`) to provide a subtle "jolt" during the warp (if enabled in config).

### 5.2 Configuration
Administrators can toggle effects in `config.json`:
- `EnableSound`: true/false (Default: false)
- `EnableShake`: true/false (Default: false)

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
2. **Interpolated Travel**: Optional smooth movement instead of instant warp.
3. **Multi-Block Elevators**: Support for larger elevator platforms (3x3, etc.).
4. **Enhanced UI**: Diagnostic HUD for floor names and destination selection.
