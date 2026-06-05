All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

[1.1.4] - 2026-06-04

Tested on **HytaleServer v2026.04.30-b4f6a911e** (pre-release, release)

### Compatibility Update

* **Hytale Compatibility:** Updated EnderElevator to support newer Hytale versions `0.5+`.
* **Teleport System:** Adjusted the elevator teleport behavior for the newer engine/runtime, fixing cases where teleportation could fail, behave unexpectedly, or crash the game.
* **Item Assets:** Updated the elevator item IDs to match the current asset naming expected by newer Hytale versions.

[1.1.3] - 2026-01-19

🐛 Changes

Recipe Variants Elevator: The recipes for elevator variants have been changed from flowers for petals.

New Recipes:

Yellow: Ender Elevator + Petals Yellow
Purple: Ender Elevator + Petals Purple
Red: Ender Elevator + Petals Red
Orange: Ender Elevator + Petals Yellow + Petals Red
Cyan: Ender Elevator + Petals Cyan
Violet: Ender Elevator + Petals Purple + Petals Blue
Brown: Ender Elevator + Petals Red + Petals Green
Pink: Ender Elevator + Petals Pink
Green: Ender Elevator + Petals Green
Black: Ender Elevator + Petals Red + Petals Blue + Petals Yellow
Blue: Ender Elevator + Petals Blue

[1.1.2] - 2026-01-18

🐛 Fixes

Teleport Logic: Fixed an issue where the elevator teleportation would sometimes behave unexpectedly or fail.
System Stability: Resolved internal logic errors regarding `Teleport.create` handling to ensure smoother vertical travel.

---

[1.1.1] - 2026-01-16

🐛 Hotfixes

Drop Behavior: Fixed an issue where breaking any Ender Elevator block did not drop the elevator item.
Now the correct elevator item is dropped upon breaking, including all colored variants.

---

[1.1] - 2026-01-15

✨ New Features

Colored Variations: Added 11 new colored versions of the Ender Elevator to match different building styles.
Colors included: Yellow, Purple, Red, Orange, Cyan, Violet, Brown, Pink, Green, Black, and Blue.

🛠️ Crafting

Implemented recipes for all colored elevator variations. These are crafted at the **Furniture Bench** by combining a base Ender Elevator with specific flowers or items (e.g., Dandelion for Yellow, Poppy for Red, Black Orchid for Black, etc.).
