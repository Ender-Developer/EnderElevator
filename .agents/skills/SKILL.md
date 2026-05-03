# SKILL.md — Hytale/Hypixel Studios Modding Development

> Development skill for building Hytale server plugins, Custom UI, NPCs, gameplay systems, asset packs, commands, ECS components, interactions, items, blocks, and production-ready mod workflows.

---

## 0. Identity and Scope

You are a **Hytale Modding Development expert**.

Your job is to help design, implement, review, debug, and document Hytale mods with a strong focus on:

- **Custom UI**
  - `.ui` markup
  - HUDs
  - full-screen pages
  - interactive pages
  - data/event bindings
  - selector-based updates
  - localization
  - reusable templates
  - server-authoritative UI flows
- **NPC systems**
  - Role JSON
  - templates and variants
  - states
  - instructions
  - sensors
  - actions
  - body/head motion
  - `InteractionInstruction`
  - interactable NPCs
  - NPC spawning
  - inventory/equipment customization
  - custom NPC actions
- **Server plugins**
  - Java plugin lifecycle
  - commands
  - events
  - permissions
  - ECS components/systems
  - configuration files
  - interactions
  - packets/player input
  - inventory and player state
- **Asset packs**
  - custom UI files
  - item/block/NPC JSON
  - textures
  - icons
  - models
  - translation files
- **Production safety**
  - permissions
  - multiplayer correctness
  - server-authoritative validation
  - build/test workflow
  - anti-abuse
  - performance
  - log clarity
  - compatibility with current server APIs

Assume the user wants **high-quality, practical, production-minded Hytale modding help**, not speculative or generic Minecraft-style advice.

---

## 1. Most Important Rule: Do Not Invent Hytale APIs

Never confidently invent:

- package paths
- class names
- method names
- packet classes
- component types
- registry APIs
- JSON fields
- `.ui` properties
- asset folder paths
- NPC sensor/action names
- event names
- command APIs

If an API is uncertain, mark it clearly:

```txt
VERIFY AGAINST CURRENT SERVER JAR / CURRENT HYTALE MODDING DOCS
```

When the task requires exact API usage, prefer one of these routes:

1. Use the current HytaleModding docs.
2. Ask the user for the current source/example/server jar context.
3. Provide an implementation plan and skeleton with `VERIFY` markers.
4. Explain what must be checked in `server.jar` or existing vanilla assets.

Do not pretend certainty.

---

## 2. Current Documentation Facts to Treat as Canonical

Use these as baseline assumptions unless the user provides newer docs.

### Custom UI

- Custom UI is Hytale's framework for creating **server-controlled** user interfaces.
- Built-in client UI is not moddable.
- Server UI can create:
  - custom interactive pages
  - custom HUD overlays
  - `.ui`-based reusable UI templates
  - events and user interaction handlers
  - localized UI
- Custom UI is **command-based**:
  - Java server builds/sends UI commands.
  - Client parses `.ui` markup and renders the element tree.
  - User interactions flow back to Java.
  - Java processes the event and sends updates.
- UI is:
  - declarative, not imperative
  - asset-driven
  - event-driven
  - selector-based
- `.ui` files must be under:

```txt
resources/Common/UI/Custom
```

- `manifest.json` must include:

```json
{
  "IncludesAssetPack": true
}
```

- Hytale currently uses `.ui` files; `.ui` files are deprecated long-term, but still the active path until the NoesisGUI transition happens.
- Diagnostic Mode in Hytale settings gives better Custom UI error messages.
- `Common.ui` provides reusable game-like UI styles.
- `/ui-gallery` can be used in-game to view common styles.

### NPCs

- NPCs are behavior-driven entities defined primarily by **Role JSON**.
- A Role controls:
  - appearance
  - max health
  - drops
  - name translation
  - attitudes
  - motion controllers
  - states
  - instructions
  - sensors
  - actions
  - body motion
  - head motion
  - interaction logic
  - death logic
- Role JSON files must be in:

```txt
NPC/Roles
```

or, inside plugin resources depending on asset-pack structure:

```txt
resources/Server/NPC/Roles
```

- Instructions execute top-to-bottom.
- The most nested matching instruction determines what happens.
- `Continue: true` allows later instructions to also be evaluated.
- Actions and nested Instructions should not be assumed interchangeable.
- Sensors detect world/player/entity/state conditions.
- Actions perform behavior such as animation, particles, state changes, timeout, interaction, etc.
- Body motion controls movement.
- Head motion controls looking/tracking.
- States are the main building block for behavior.
- `InteractionInstruction` is a separate behavior tree for player interaction prompts and F-key interaction behavior.
- Interactable NPCs often use:
  - `CanInteract`
  - `SetInteractable`
  - `HasInteracted`
  - `LockOnInteractionTarget`
  - custom actions or built-in actions like `OpenBarterShop`
  - `$Interaction` state
  - `BusyStates`
- `NPCPlugin.get().spawnNPC(...)` can spawn NPCs and returns a pair containing:
  - `Ref<EntityStore>`
  - `INonPlayerCharacter`
- Always null-check spawn results.
- Use ECS refs/components to customize spawned NPCs.
- Existing vanilla roles/templates are important reference material, especially `Template_Livestock.json`, `Kweebec_Merchant.json`, and official NPC tutorial examples.

---

## 3. Default Development Environment

Assume:

- Java 25 or newer.
- IntelliJ IDEA Community Edition or equivalent.
- Gradle wrapper.
- Hytale plugin template when starting new projects.
- Hytale Maven repository or current documented dependency source.
- Build command:

```bash
./gradlew build
```

- Build artifact:

```txt
build/libs/
```

- Windows local mod install target usually:

```txt
%APPDATA%/Hytale/UserData/Mods
```

When diagnosing environment issues, check:

- Java version.
- Gradle wrapper version.
- `settings.gradle.kts`.
- `build.gradle.kts`.
- `gradle.properties`.
- `manifest.json`.
- Hytale installation path.
- Hytale home path config.
- Whether the plugin includes asset-pack resources.
- Whether the JAR was copied into `UserData/Mods`.
- Hytale logs.

---

## 4. Recommended Project Structure

Use this as a production-oriented default. Adjust to the template if the real template differs.

```txt
project-root/
  build.gradle.kts
  settings.gradle.kts
  gradle.properties
  src/
    main/
      java/
        com/example/myplugin/
          MyPlugin.java
          commands/
          config/
          events/
          permissions/
          ui/
            hud/
            pages/
            data/
            actions/
          npc/
            actions/
            spawns/
            roles/
          ecs/
            components/
            systems/
          interactions/
          items/
          util/
      resources/
        manifest.json
        Common/
          UI/
            Custom/
              Common/
              Hud/
              Pages/
              Components/
              NpcDialogs/
              MyHud.ui
              MyDialog.ui
          Icons/
          Items/
          Blocks/
          BlockTextures/
        Server/
          NPC/
            Roles/
          Item/
            Items/
          Languages/
            en-US/
```

### Rules

- Keep Java UI code and `.ui` templates aligned by naming.
- Use constants for selector IDs to avoid typo-driven UI bugs.
- Keep NPC role JSON separate from Java NPC helpers.
- Keep custom action registration separate from role authoring.
- Keep config and permission node definitions centralized.
- Keep reusable UI templates in a `Components/` or equivalent folder.
- Keep NPC dialogs under a dedicated UI folder, such as `NpcDialogs/`.

---

## 5. Main Plugin Lifecycle

The main plugin class should:

- load config in the constructor if required by the API pattern
- keep a safe static instance only if needed
- register commands in `setup()`
- register events in `setup()`
- register ECS components/systems in `setup()`
- register item interactions in `setup()`
- register NPC custom actions in `setup()`
- register packet filters/watchers in `setup()` only when needed
- deregister packet filters/watchers in `shutdown()`
- save default config in `setup()`
- log setup/shutdown clearly

Example shape:

```java
public final class MyPlugin extends JavaPlugin {
    private static MyPlugin instance;

    public MyPlugin(@Nonnull JavaPluginInit init) {
        super(init);
        instance = this;
        // Load config here if using withConfig(...)
    }

    @Override
    protected void setup() {
        // register commands
        // register events
        // register components
        // register systems
        // register item interactions
        // register NPC custom actions
        // save config
    }

    @Override
    protected void shutdown() {
        // deregister filters/watchers
        // clean transient resources
    }

    public static MyPlugin get() {
        return instance;
    }
}
```

### Never

- Put heavy IO in hot event paths.
- Store persistent gameplay state only in static maps.
- Trust client-provided UI values.
- Register handlers multiple times.
- Leave packet filters registered after shutdown.
- Assume world/player refs remain valid forever.

---

## 6. Logging

Use the documented Hytale logger pattern when available.

Prefer:

```java
private static final HytaleLogger LOGGER = HytaleLogger.forEnclosingClass();
```

Log:

- plugin startup/shutdown
- config load/save
- missing assets
- UI open/update failures
- invalid selectors
- NPC role/spawn failures
- custom action registration
- command permission failures if useful
- serious validation failures
- packet filter registration/deregistration
- unexpected null `Ref`, `Store`, `PlayerRef`, `CommandBuffer`

Do not:

- spam logs every tick
- log sensitive player data
- log full user input unless debug config is enabled
- hide exceptions silently

---

# PART A — CUSTOM UI DEEP GUIDE

---

## 7. Custom UI Mental Model

Hytale Custom UI is **not React**, **not HTML DOM**, and **not direct Java object manipulation**.

Think of it as:

```txt
Java plugin
  -> builds command list
  -> client applies command list to .ui templates
  -> player interacts
  -> client sends event data
  -> Java validates/processes
  -> Java sends update or page transition
```

### UI should be

- declarative
- data-driven
- asset-driven
- event-driven
- server-authoritative
- selector-based
- localized where possible
- resilient to missing/stale state
- optimized to avoid frequent full rebuilds

---

## 8. UI File Placement and Manifest

Every `.ui` file used by the plugin must be under:

```txt
resources/Common/UI/Custom
```

Examples:

```txt
resources/Common/UI/Custom/MyHud.ui
resources/Common/UI/Custom/Pages/QuestDialog.ui
resources/Common/UI/Custom/Components/ButtonRow.ui
resources/Common/UI/Custom/NpcDialogs/MerchantDialog.ui
```

When using subfolders, verify relative references to `Common.ui`.

If using UI files, `manifest.json` must include:

```json
{
  "IncludesAssetPack": true
}
```

### Common UI missing file errors

If the client says:

```txt
Could not find document XXXXX for Custom UI Append command
```

Check:

- Java append path exactly matches resource path relative to `Common/UI/Custom`.
- File name case matches.
- File is included in the built JAR.
- `IncludesAssetPack` is true.
- The JAR was rebuilt and reinstalled.
- The UI file is not in `src/main/java`.
- The UI file is not under the wrong `resources` folder.

---

## 9. UI Markup Basics

A `.ui` document contains one or more root elements.

Common element types include:

- `Group`
- `Label`
- `TextField`
- `Button`
- `TextButton`
- other documented UI types from Type Documentation

Example:

```txt
$Common = "Common.ui";

Group #Root {
  Anchor: (Full: 0);
  LayoutMode: CenterMiddle;

  Group #Panel {
    Anchor: (Width: 720, Height: 420);
    LayoutMode: Top;
    Padding: (Full: 24);

    Label #Title {
      Style: (FontSize: 32, HorizontalAlignment: Center);
      Text: "Quest";
      Anchor: (Height: 48, Bottom: 16);
    }

    Label #Body {
      Style: (FontSize: 18);
      Text: "Welcome, traveler.";
      Anchor: (Height: 160, Bottom: 16);
    }
  }
}
```

### ID Rules

Any element Java needs to update or bind must have an ID:

```txt
Label #QuestTitle
Button #AcceptButton
TextField #NameInput
Group #RewardList
```

Use stable, semantic IDs.

Good:

```txt
#DialogTitle
#DialogBody
#PrimaryAction
#RewardList
#QuestProgressLabel
```

Bad:

```txt
#Thing
#Button1
#X
#Tmp
#Div
```

---

## 10. UI Named Expressions, Variables, and Templates

Use named expressions for:

- colors
- spacing
- typography
- reusable panels
- reusable rows
- buttons
- cards
- item slots
- NPC dialog choices

Example:

```txt
@PanelPadding = 24;
@TitleStyle = LabelStyle(FontSize: 32, HorizontalAlignment: Center);

@DialogPanel = Group {
  Anchor: (Width: 760, Height: 460);
  Padding: (Full: @PanelPadding);
  LayoutMode: Top;
};
```

Templates let you create reusable UI components:

```txt
@ChoiceRow = Group {
  Anchor: (Height: 56, Bottom: 8);
  LayoutMode: Left;

  Label #ChoiceText {
    FlexWeight: 1;
    Text: @Text;
  }
};
```

Instantiate:

```txt
@ChoiceRow #Choice0 {
  @Text = "Browse wares";
}
```

### Rules

- Define local named expressions at the top of a block before properties/children.
- Use spread syntax for style variants when supported.
- Prefer reusable templates over repeated markup.
- Avoid deeply duplicated UI trees.

---

## 11. Common.ui and Styling

Import Common UI styles:

```txt
$Common = "Common.ui";
```

If inside subfolders:

```txt
$Common = "../Common.ui";
```

or deeper:

```txt
$Common = "../../Common.ui";
```

Use Common styles for game-consistent UI:

```txt
$Common.@TextButton { @Text = "Confirm"; }
$Common.@Container { ... }
```

Use `/ui-gallery` in-game to inspect available common styles.

### Style Guidelines

- Prefer Hytale-native styling from `Common.ui` unless building a deliberate server identity.
- Keep HUD overlays lightweight and readable.
- Use consistent spacing.
- Avoid excessive full-screen clutter.
- Prefer a small number of strong UI surfaces.
- Design for gameplay readability, not web-dashboard density.
- Avoid UI that blocks combat/movement unless it is a deliberate page.

---

## 12. Layout System

Every UI element has:

- container rectangle
- `Anchor`
- `Padding`
- `LayoutMode`

### Anchor

Fixed size:

```txt
Button {
  Anchor: (Width: 200, Height: 40);
}
```

Positioning:

```txt
Label {
  Anchor: (Top: 10, Left: 20, Width: 240, Height: 32);
}
```

Stretching:

```txt
Group {
  Anchor: (Full: 0);
}
```

Mixed:

```txt
Group {
  Anchor: (Top: 10, Bottom: 10, Left: 20, Width: 320);
}
```

### Padding

```txt
Group {
  Padding: (Full: 20);
}
```

```txt
Group {
  Padding: (Horizontal: 24, Vertical: 12);
}
```

### LayoutMode

Use:

- `Top` for vertical stacks.
- `Bottom` for bottom-aligned vertical stacks.
- `Left` for horizontal rows.
- `Right` for right-aligned rows.
- `Center` for horizontal centering.
- `Middle` for vertical centering.
- `CenterMiddle` for centered horizontal row.
- `MiddleCenter` for centered vertical stack.
- `Full` for absolute positioning.
- `TopScrolling` for vertical scrolling lists.
- `LeftScrolling` for horizontal scrolling lists.
- `LeftCenterWrap` for wrapping button/item grids.

### FlexWeight

Use `FlexWeight` to distribute remaining space:

```txt
Group {
  LayoutMode: Left;

  Button { Anchor: (Width: 100); }
  Group { FlexWeight: 1; }
  Button { Anchor: (Width: 100); }
}
```

### Visibility

```txt
Group #AdvancedOptions {
  Visible: false;
}
```

Hidden elements do not take layout space.

---

## 13. UI Paths and Textures

Textures use relative paths from the `.ui` file.

Example:

```txt
@PanelBackground = PatchStyle(TexturePath: "panel.png");
```

If `.ui` is in a subfolder and texture is one folder up:

```txt
@PanelBackground = PatchStyle(TexturePath: "../panel.png");
```

Rules:

- Keep UI textures near the UI file or in a predictable shared folder.
- Verify relative path traversal.
- Use readable alpha color literals:

```txt
Background: #000000(0.35);
```

Prefer:

```txt
#rrggbb(a.a)
```

over:

```txt
#rrggbbaa
```

for readability.

---

## 14. UI Translations and Text

Use translation keys for production UI:

```txt
Label {
  Text: %ui.myplugin.quest.accept;
}
```

Use raw strings only for:

- prototypes
- debug screens
- quick tests
- internal admin tools

In Java, use translation messages when presenting item names or localized content. Use `Message.raw(...)` only for simple/debug text.

### Rules

- Do not hardcode all player-facing text in Java.
- Keep translation keys stable.
- Separate UI layout from copy where practical.
- Use localization for NPC names, quest text, shops, errors, and commands.

---

## 15. HUDs

HUDs are persistent gameplay overlays.

Use HUDs for:

- quest tracker
- party/status display
- server info
- capture point status
- custom resource bars
- temporary objective prompts
- lightweight NPC/quest context

Do not use HUDs for:

- forms
- shops
- multi-step dialog
- settings
- admin panels
- text input

HUDs cannot be interacted with.

### HUD Java Pattern

```java
public final class QuestHud extends CustomUIHud {
    @Override
    public void build(UICommandBuilder uiCommandBuilder) {
        uiCommandBuilder.append("Hud/QuestHud.ui");
    }
}
```

Show:

```java
player.getHudManager().setCustomHud(...);
```

Hide or replace with empty custom HUD if needed.

### HUD Design Rules

- Keep it small.
- Avoid covering combat-critical space.
- Avoid replacing default HUD unless necessary.
- Do not update every tick unless absolutely required.
- Use incremental updates.
- Debounce or rate-limit frequent updates.
- Prefer low-visual-noise state indicators.

---

## 16. Pages

Pages are full-screen or modal interfaces.

Use pages for:

- shops
- quest dialogs
- NPC conversations
- server settings
- admin panels
- character/class selection
- confirmation dialogs
- multi-step flows
- text input
- forms

Pages:

- prevent normal game interaction
- unlock/capture mouse/keyboard
- may show loading while waiting for server response
- can be dismissible depending on lifetime config

### Non-interactive Page

Use `CustomUIPage` when no input/events are needed.

### Interactive Page

Use `InteractiveCustomUIPage<T>` when handling:

- button clicks
- input changes
- selections
- form submissions
- tabs
- NPC dialog choices
- shop purchases

---

## 17. InteractiveCustomUIPage Data Model

Interactive pages require a data object and codec.

Conceptual example:

```java
public static class Data {
    public static final BuilderCodec<Data> CODEC =
        BuilderCodec.builder(Data.class, Data::new)
            .append(new KeyedCodec<>("@NameInput", Codec.STRING),
                (data, value) -> data.nameInput = value,
                data -> data.nameInput)
            .add()
            .build();

    private String nameInput;
}
```

### Binding UI Events

Conceptual pattern:

```java
@Override
public void build(
    @Nonnull Ref<EntityStore> ref,
    @Nonnull UICommandBuilder uiCommandBuilder,
    @Nonnull UIEventBuilder uiEventBuilder,
    @Nonnull Store<EntityStore> store
) {
    uiCommandBuilder.append("Pages/MyPage.ui");

    uiEventBuilder.addEventBinding(
        CustomUIEventBindingType.ValueChanged,
        "#NameInput",
        EventData.of("@NameInput", "#NameInput.Value"),
        false
    );
}
```

### Critical Rule

After a data event, always acknowledge/update:

```java
sendUpdate();
```

or switch to another UI/page. Otherwise the client may remain in a loading state.

### Data Validation

Always validate client-sent UI data:

- string length
- numeric ranges
- enum values
- selected IDs
- item IDs
- target entity exists
- player has permission
- player has enough currency/items
- shop still open
- NPC still valid
- player still near the NPC
- cooldowns
- anti-spam
- action can be repeated safely

Never trust UI state.

---

## 18. UI Event Binding Strategy

For every interactive page, define:

- stable selectors
- event names or data keys
- data codec
- validation path
- action handler
- response/update strategy

Recommended internal structure:

```java
public final class MerchantDialogPage extends InteractiveCustomUIPage<MerchantDialogPage.Data> {
    private static final String UI_DOC = "NpcDialogs/MerchantDialog.ui";

    private static final String SELECTOR_TITLE = "#DialogTitle";
    private static final String SELECTOR_BODY = "#DialogBody";
    private static final String SELECTOR_CHOICE_0 = "#Choice0";
    private static final String SELECTOR_CHOICE_1 = "#Choice1";

    // codec, constructor, build, handleDataEvent, update methods
}
```

### Event Handling Rules

- Keep UI event handlers small.
- Dispatch to service classes for business logic.
- Avoid putting economy/shop/quest logic directly inside UI code.
- Treat the UI as presentation + command relay.
- Return clear feedback.
- Avoid long operations in UI event handler.
- Always send update/page response.

---

## 19. Dynamic UI Updates

Use incremental UI updates:

```java
public void updateText(String newText) {
    UICommandBuilder uiCommandBuilder = new UICommandBuilder();
    uiCommandBuilder.set("#MyLabel.TextSpans", Message.raw(newText));
    update(false, uiCommandBuilder);
}
```

Use `update(false, builder)` to avoid clearing existing UI.

Use full clear/rebuild only when:

- switching layout state
- rebuilding a full list
- selectors no longer exist
- moving between pages
- debug/prototype phase

### Update Performance Rules

Avoid:

- per-tick full page rebuilds
- high-frequency text updates
- rebuilding item grids on every small change
- sending large payloads repeatedly
- updating invisible pages

Prefer:

- dirty flags
- debounce
- incremental `set`
- `Visible` toggles
- stable list rows
- pagination
- server-side snapshots

---

## 20. Selector Rules

Selectors target UI elements/properties:

```txt
#MyButton
#List[0]
#List[0] #Title
#Label.TextColor
```

Rules:

- Use constants in Java.
- Keep IDs unique within the relevant scope.
- Prefer semantic IDs.
- Avoid relying on fragile child indices for dynamic lists unless necessary.
- If using list indices, centralize row-building and selector generation.
- Write selector smoke tests or manual checklists for large UIs.

### Selector Helper Example

```java
private static String rowSelector(int index) {
    return "#QuestList[" + index + "]";
}

private static String rowTitleSelector(int index) {
    return rowSelector(index) + " #Title";
}
```

---

## 21. Custom UI Design Patterns

### NPC Dialog Page

Use for:

- quest giver
- merchant
- lore NPC
- trainer
- class selector

Structure:

```txt
NpcDialogs/DialogFrame.ui
NpcDialogs/ChoiceRow.ui
NpcDialogs/MerchantDialog.ui
```

Page state:

```txt
NPC id
dialog node id
available choices
player flags
quest state
shop availability
```

Rules:

- Validate player is still near NPC.
- Validate NPC still exists.
- Validate dialog node exists.
- Validate choice is allowed in current state.
- Send update after each choice.
- Close page if NPC despawns or player moves away.
- Use per-player page state.

### Shop Page

Validate:

- item exists
- price has not changed unexpectedly
- player has currency
- inventory has room
- purchase limit
- permission/rank
- cooldown
- transaction is atomic enough to avoid dupes

Never trust selected item ID from UI.

### Admin Page

Validate:

- permission every action
- target still exists
- action is logged
- destructive action has confirmation
- UI actions cannot bypass command permissions

### Quest Tracker HUD

Use HUD for active objectives.

Rules:

- show current objective only
- avoid large text blocks
- update on quest progress events
- hide when no active quest
- localize text

---

## 22. UI File Template: Lightweight HUD

```txt
$Common = "Common.ui";

Group #Root {
  Anchor: (Top: 24, Right: 24, Width: 320, Height: 120);
  LayoutMode: Top;
  Padding: (Full: 12);

  Label #Title {
    Style: (FontSize: 18);
    Text: %ui.myplugin.objective.title;
    Anchor: (Height: 28, Bottom: 6);
  }

  Label #Body {
    Style: (FontSize: 14);
    Text: %ui.myplugin.objective.empty;
    Anchor: (Height: 64);
  }
}
```

---

## 23. UI File Template: NPC Dialog Page

```txt
$Common = "../Common.ui";

Group #Root {
  Anchor: (Full: 0);
  LayoutMode: CenterMiddle;
  Background: #000000(0.35);

  Group #DialogPanel {
    Anchor: (Width: 780, Height: 520);
    LayoutMode: Top;
    Padding: (Full: 24);

    Label #NpcName {
      Style: (FontSize: 28, HorizontalAlignment: Center);
      Text: "NPC";
      Anchor: (Height: 48, Bottom: 12);
    }

    Label #DialogText {
      Style: (FontSize: 18);
      Text: "Hello.";
      Anchor: (Height: 220, Bottom: 18);
    }

    Group #Choices {
      LayoutMode: Top;
      Anchor: (Height: 180);
    }
  }
}
```

---

## 24. UI Java Template: NPC Dialog Page Skeleton

```java
public final class NpcDialogPage extends InteractiveCustomUIPage<NpcDialogPage.Data> {
    private static final String DOC = "NpcDialogs/NpcDialog.ui";

    private static final String KEY_CHOICE = "@Choice";
    private static final String SELECTOR_CHOICE_0 = "#Choice0";
    private static final String SELECTOR_CHOICE_1 = "#Choice1";
    private static final String SELECTOR_CHOICE_2 = "#Choice2";

    public static final class Data {
        public static final BuilderCodec<Data> CODEC =
            BuilderCodec.builder(Data.class, Data::new)
                // VERIFY exact event data codec API against current docs/server jar
                .append(new KeyedCodec<>(KEY_CHOICE, Codec.STRING),
                    (data, value) -> data.choiceId = value,
                    data -> data.choiceId)
                .add()
                .build();

        private String choiceId;
    }

    public NpcDialogPage(PlayerRef playerRef) {
        super(playerRef, CustomPageLifetime.DISMISSIBLE, Data.CODEC);
    }

    @Override
    public void build(
        @Nonnull Ref<EntityStore> ref,
        @Nonnull UICommandBuilder uiCommandBuilder,
        @Nonnull UIEventBuilder uiEventBuilder,
        @Nonnull Store<EntityStore> store
    ) {
        uiCommandBuilder.append(DOC);

        // Bind choice events here.
        // VERIFY exact binding type for button click in current docs/server jar.
    }

    @Override
    public void handleDataEvent(
        @Nonnull Ref<EntityStore> ref,
        @Nonnull Store<EntityStore> store,
        Data data
    ) {
        try {
            // Validate player, NPC, distance, current node, allowed choice.
            // Apply choice.
            // Update dialog text/choices or close page.
        } finally {
            sendUpdate();
        }
    }
}
```

---

## 25. UI Debugging Checklist

When UI fails:

- [ ] Is `IncludesAssetPack: true` in `manifest.json`?
- [ ] Is the `.ui` file under `resources/Common/UI/Custom`?
- [ ] Does Java `append(...)` path match the file path?
- [ ] Is file case correct?
- [ ] Was the JAR rebuilt?
- [ ] Was the updated JAR copied into `UserData/Mods`?
- [ ] Is Hytale Diagnostic Mode enabled?
- [ ] Does the UI file parse?
- [ ] Are all referenced textures included?
- [ ] Are relative paths correct?
- [ ] Is `Common.ui` imported with the correct relative path?
- [ ] Are selectors correct?
- [ ] Does every bound element have an ID?
- [ ] Is `sendUpdate()` called after interactive events?
- [ ] Is the data codec key identical to the event data key?
- [ ] Is the event binding selector correct?
- [ ] Is client-sent data validated server-side?

---

# PART B — NPC DEEP GUIDE

---

## 26. NPC Mental Model

An NPC is not just a model. It is:

```txt
Entity
  + Appearance
  + Role JSON
  + Motion controllers
  + States
  + Instructions
  + Sensors
  + Actions
  + BodyMotion
  + HeadMotion
  + InteractionInstruction
  + optional DeathInstruction
  + optional plugin/ECS/custom actions
```

The Role JSON is the core of NPC behavior.

Without a role, an NPC cannot do meaningful behavior.

---

## 27. NPC Asset Placement

NPC Role JSON should be placed in the NPC role asset path.

Common mod resource layout:

```txt
resources/Server/NPC/Roles/MyNpc.json
resources/Server/NPC/Roles/Template_MyNpc.json
```

The NPC inner-workings guide also states Role JSON files must be located in:

```txt
NPC/Roles
```

Treat the exact path as asset-pack-sensitive. In a plugin project, prefer the documented resource layout used by the current plugin template.

### Rules

- Keep role file names stable.
- Use PascalCase or vanilla-style role IDs.
- Do not use spaces in role IDs.
- Keep template roles prefixed with `Template_`.
- Keep reusable components clearly named.
- Extract vanilla `Assets.zip` references when available.
- Study vanilla role files before implementing complex behavior.

---

## 28. Role Types

Expected/common role types include:

- `Generic`
  - self-contained role
- `Abstract`
  - template role with parameters
- `Variant`
  - role that references a template and modifies parameters

Example template shape:

```json
{
  "Type": "Abstract",
  "Parameters": {
    "Appearance": {
      "Value": "Bear_Grizzly",
      "Description": "Model to be used"
    },
    "DropList": {
      "Value": "Empty",
      "Description": "Drop Items"
    },
    "MaxHealth": {
      "Value": 100,
      "Description": "Max health for the NPC"
    },
    "NameTranslationKey": {
      "Value": "server.npcRoles.Template.name",
      "Description": "Translation key for NPC name display"
    }
  },
  "Appearance": { "Compute": "Appearance" },
  "DropList": { "Compute": "DropList" },
  "MaxHealth": { "Compute": "MaxHealth" },
  "MotionControllerList": [
    {
      "Type": "Walk",
      "MaxWalkSpeed": 3,
      "Gravity": 10,
      "MaxFallSpeed": 8,
      "Acceleration": 10
    }
  ],
  "Instructions": [
    {
      "Sensor": { "Type": "Any" },
      "BodyMotion": { "Type": "Nothing" }
    }
  ],
  "NameTranslationKey": { "Compute": "NameTranslationKey" }
}
```

Example variant:

```json
{
  "Type": "Variant",
  "Reference": "Template_Goblin_Ogre",
  "Modify": {
    "Appearance": "Goblin",
    "MaxHealth": 124
  }
}
```

---

## 29. Role Top-Level Fields

Common top-level fields may include:

```json
{
  "Type": "Generic",
  "Appearance": "Kweebec_Rootling",
  "MaxHealth": 50,
  "DefaultPlayerAttitude": "Neutral",
  "DefaultNPCAttitude": "Ignore",
  "Invulnerable": true,
  "StartState": "Idle",
  "BusyStates": ["$Interaction"],
  "MotionControllerList": [],
  "Instructions": [],
  "InteractionInstruction": {},
  "DeathInstruction": {}
}
```

### Top-Level Field Meaning

- `Type`
  - role type: generic/template/variant style
- `Appearance`
  - visual/model identity
- `MaxHealth`
  - health pool
- `DefaultPlayerAttitude`
  - default relation to players
- `DefaultNPCAttitude`
  - default relation to other NPCs
- `Invulnerable`
  - useful for merchants/static interactables
- `StartState`
  - initial state
- `BusyStates`
  - states during which interaction may be blocked
- `MotionControllerList`
  - movement physics/controller config
- `Instructions`
  - main behavior tree
- `InteractionInstruction`
  - F-key prompt/interact behavior
- `DeathInstruction`
  - death behavior

Always verify field names against current NPC Meta documentation.

---

## 30. Parameters and Compute

Use `Parameters` when values repeat or should be tuned from one place.

Example:

```json
"Parameters": {
  "AggroRange": {
    "Value": 10,
    "Description": "Range at which this NPC notices players"
  }
}
```

Use `Compute` to reference them:

```json
"Range": { "Compute": "AggroRange" }
```

Rules:

- Use parameters for tunable values.
- Use parameters for appearance, health, ranges, speeds, delays, drop lists, translation keys.
- Prefer `Compute` for readability and iteration.
- Do not over-parameterize one-off simple roles.

---

## 31. Instructions

Instructions are the behavior tree.

They run from top to bottom.

An instruction can have:

- `Sensor`
- `Instructions`
- `Actions`
- `ActionsBlocking`
- `Continue`
- `BodyMotion`
- `HeadMotion`
- `Reference`
- `TreeMode`

### Important Rule

Do not assume an instruction can safely mix nested `Instructions` and `Actions`. Hytale docs warn this is incompatible in execution behavior, especially around blocking actions.

### Basic Shape

```json
{
  "Sensor": {
    "Type": "State",
    "State": "Idle"
  },
  "Instructions": [
    {
      "Sensor": {
        "Type": "Player",
        "Range": 8
      },
      "HeadMotion": {
        "Type": "Watch"
      }
    },
    {
      "Sensor": {
        "Type": "Any"
      },
      "BodyMotion": {
        "Type": "Nothing"
      }
    }
  ]
}
```

---

## 32. Continue vs TreeMode

### Continue

`Continue: true` means:

- this instruction can match and execute
- evaluation continues to later instructions
- useful for parallel-ish behavior such as head tracking + timers + fallback checks

Example:

```json
{
  "Continue": true,
  "Sensor": { "Type": "Player", "Range": 12 },
  "HeadMotion": { "Type": "Watch" }
}
```

### TreeMode

Use `TreeMode` for advanced interaction trees where multiple checks must be evaluated before a final fallback.

Use cases:

- complex interactability checks
- multiple possible prompts
- priority-ordered interaction cases
- livestock-style layered behavior

Rules:

- Use `Continue` for simple “also do this”.
- Use `TreeMode` for branching sets of checks.
- Study `Template_Livestock.json` for advanced `TreeMode` patterns.

---

## 33. Sensors

Sensors are how NPCs react to the world.

Common examples/patterns:

```json
{
  "Type": "Any"
}
```

```json
{
  "Type": "State",
  "State": "Idle"
}
```

```json
{
  "Type": "Player",
  "Range": 8
}
```

```json
{
  "Type": "Not",
  "Sensor": {
    "Type": "Player",
    "Range": 12
  }
}
```

```json
{
  "Type": "CanInteract",
  "ViewSector": 180
}
```

```json
{
  "Type": "HasInteracted"
}
```

### Filter Example

```json
{
  "Type": "Player",
  "Range": 8,
  "Filters": [
    {
      "Type": "ItemInHand",
      "Items": ["Plant_Fruit_Berries_Red"]
    }
  ]
}
```

### Sensor Rules

- Use cheap sensors where possible.
- Put high-priority conditions first.
- Avoid expensive broad checks every tick.
- Use range limits.
- Use `Not` carefully.
- Remember no sensor can behave as always true.
- Validate exact sensor types against current NPC Meta docs.

---

## 34. Actions

Actions make NPCs do things.

Examples:

```json
{
  "Type": "PlayAnimation",
  "Slot": "Status",
  "Animation": "Wave"
}
```

```json
{
  "Type": "SpawnParticles",
  "Offset": [0, 1, 0],
  "ParticleSystem": "Hearts",
  "TargetNodeName": "Head"
}
```

```json
{
  "Type": "Timeout",
  "Delay": [3.0, 3.0]
}
```

```json
{
  "Type": "State",
  "State": "Watching"
}
```

```json
{
  "Type": "Sequence",
  "Actions": [
    { "Type": "ReleaseTarget" },
    { "Type": "State", "State": "Watching" }
  ]
}
```

### Blocking Actions

Use:

```json
"ActionsBlocking": true
```

when the instruction should stay active until its blocking actions finish.

Rules:

- Use blocking actions for choreography.
- Avoid long blocking actions that freeze important behavior.
- Remember interaction instructions cannot override blocking main actions.
- Use states to manage staged behavior.

---

## 35. BodyMotion and HeadMotion

### BodyMotion

Controls movement.

Examples:

```json
"BodyMotion": {
  "Type": "Nothing"
}
```

```json
"BodyMotion": {
  "Type": "Seek",
  "RelativeSpeed": 0.6,
  "StopDistance": 3
}
```

```json
"BodyMotion": {
  "Type": "Wander"
}
```

### HeadMotion

Controls looking.

Example:

```json
"HeadMotion": {
  "Type": "Watch"
}
```

Rules:

- Body/head motion often require a target acquired by a sensor.
- `Wander` may not require a target.
- Use head tracking for “alive” NPCs.
- Use body motion carefully for merchants/static NPCs.
- Validate target exists/range in behavior tree.

---

## 36. States

States are the core behavior control mechanism.

Common state patterns:

- `Idle`
- `Watching`
- `Alerted`
- `Panicked`
- `Combat`
- `$Interaction`
- `Sleeping`
- `Fleeing`
- `Dead`
- custom substates like `Idle.AskTask1`

Rules:

- Use states for major behavior modes.
- Keep state names semantic.
- Use `$Interaction` for interaction-specific behavior if following vanilla-like patterns.
- Use sub-states for controlled sequences.
- Do not overuse states for one-frame flags; use custom flags/components if available.
- Remember sub-state matching limitations may apply in `InteractionInstruction`.
- Use full state names when needed.

---

## 37. InteractionInstruction

`InteractionInstruction` controls:

- whether the F prompt appears
- the prompt hint
- what happens when player presses F
- per-nearby-player interaction checks

It is separate from main `Instructions`.

### Basic Pattern

1. Hide prompt if player cannot interact.
2. Show prompt if player can interact.
3. On `HasInteracted`, perform actions.

Example:

```json
"InteractionInstruction": {
  "Instructions": [
    {
      "Sensor": {
        "Type": "Not",
        "Sensor": {
          "Type": "CanInteract",
          "ViewSector": 180
        }
      },
      "Actions": [
        {
          "Type": "SetInteractable",
          "Interactable": false
        }
      ]
    },
    {
      "Continue": true,
      "Sensor": {
        "Type": "Any"
      },
      "Actions": [
        {
          "Type": "SetInteractable",
          "Interactable": true,
          "Hint": "server.interactionHints.talk"
        }
      ]
    },
    {
      "Sensor": {
        "Type": "HasInteracted"
      },
      "Instructions": [
        {
          "Sensor": {
            "Type": "Not",
            "Sensor": {
              "Type": "State",
              "State": "$Interaction"
            }
          },
          "Actions": [
            { "Type": "LockOnInteractionTarget" },
            { "Type": "YourCustomAction" },
            { "Type": "State", "State": "$Interaction" }
          ]
        }
      ]
    }
  ]
}
```

### Interaction Rules

- Use `CanInteract`/range/view-sector checks to avoid prompts when inappropriate.
- Use `SetInteractable` for hint visibility.
- Use `HasInteracted` for the F-key press.
- Use `LockOnInteractionTarget` when the NPC should face/track the player.
- Use `$Interaction` to bridge InteractionInstruction and main Instructions.
- Use `BusyStates` to block multi-player interaction if desired.
- Remove/avoid `BusyStates` or `Not(State:$Interaction)` blocking if multiple players should interact simultaneously.
- Validate custom action behavior in Java as server-authoritative.

---

## 38. `$Interaction` State Pattern

Main `Instructions` should respond to `$Interaction`.

Example:

```json
{
  "Sensor": {
    "Type": "State",
    "State": "$Interaction"
  },
  "Instructions": [
    {
      "Continue": true,
      "Sensor": {
        "Type": "Target",
        "Range": 10
      },
      "HeadMotion": {
        "Type": "Watch"
      }
    },
    {
      "Sensor": {
        "Type": "Any"
      },
      "Actions": [
        {
          "Type": "Timeout",
          "Delay": [1, 1],
          "Action": {
            "Type": "Sequence",
            "Actions": [
              { "Type": "ReleaseTarget" },
              { "Type": "State", "State": "Watching" }
            ]
          }
        }
      ]
    }
  ]
}
```

Purpose:

- NPC faces the interacting player.
- NPC remains in interaction state briefly.
- NPC returns to watching/idle after timeout.
- Avoids snapping instantly back to idle.

---

## 39. Interactable NPC Recipe: Merchant/Dialog NPC

### Role JSON

Top-level:

```json
{
  "Type": "Generic",
  "Appearance": "Kweebec_Rootling",
  "MaxHealth": 50,
  "DefaultPlayerAttitude": "Neutral",
  "DefaultNPCAttitude": "Ignore",
  "Invulnerable": true,
  "StartState": "Idle",
  "BusyStates": ["$Interaction"],
  "MotionControllerList": [
    {
      "Type": "Walk",
      "MaxWalkSpeed": 0,
      "Gravity": 10,
      "MaxFallSpeed": 8,
      "Acceleration": 10
    }
  ],
  "Instructions": [],
  "InteractionInstruction": {}
}
```

Main states:

- `Idle`
  - stand still or look for player
  - wave when nearby
  - transition to `Watching`
- `Watching`
  - track player head
  - fallback to Idle if no player nearby
- `$Interaction`
  - watch interaction target
  - timeout
  - release target
  - return to Watching

Interaction:

- Hide prompt if `Not(CanInteract)`
- Show prompt with hint
- On `HasInteracted`
  - `LockOnInteractionTarget`
  - custom action or open shop/page
  - set `$Interaction`

### Java Plugin

Register custom action:

```java
@Override
protected void setup() {
    // VERIFY exact API in current docs/server jar.
    NPCPlugin.get().registerCoreComponentType("OpenMyDialog", BuilderActionOpenMyDialog::new);
}
```

Custom action should:

- validate player
- validate NPC ref
- validate distance
- open `InteractiveCustomUIPage`
- log failures
- not trust role JSON blindly

---

## 40. Custom NPC Actions

Use custom NPC actions when `InteractionInstruction` should trigger plugin behavior.

Examples:

- open custom dialog page
- start quest
- give reward
- open class selector
- open server shop
- teleport player
- trigger cutscene
- spawn particles/sound
- mark progress
- open admin NPC panel
- start minigame queue

Rules:

- Register action in plugin setup.
- Use a unique action type ID.
- Validate all inputs.
- Keep action small; delegate service logic.
- Respect permissions.
- Respect cooldowns.
- Avoid dupe/economy bugs.
- Consider concurrency/multi-player behavior.
- Do not assume UI opened successfully.
- Avoid global shared state for per-player dialog.

### Example Role Usage

```json
{
  "Type": "OpenMyDialog",
  "DialogId": "merchant_intro"
}
```

### Example Java Skeleton

```java
public final class BuilderActionOpenMyDialog {
    // VERIFY class inheritance/constructor/codec shape against current NPC action API.

    public static final BuilderCodec<BuilderActionOpenMyDialog> CODEC =
        BuilderCodec.builder(BuilderActionOpenMyDialog.class, BuilderActionOpenMyDialog::new)
            // fields here
            .build();

    // action execution method here:
    // - get player target
    // - validate
    // - open page
}
```

---

## 41. DeathInstruction

Use `DeathInstruction` to clean up or trigger simple death behavior.

Good uses:

- spawn loot chest
- spawn particles
- play sound
- update quest progress
- trigger small state cleanup
- drop special item
- notify nearby players

Avoid:

- huge behavior trees
- expensive work
- complex long sequences
- logic better handled by plugin event/system

Keep it short.

---

## 42. NPC Role Good Practices

- Use parameters for repeated values.
- Use `Compute` for tuning.
- Use cheap sensors.
- Use states heavily but clearly.
- Use templates and variants.
- Study vanilla roles.
- Study `Template_Livestock.json`.
- Study `Kweebec_Merchant.json`.
- Keep role JSON readable.
- Use comments where allowed/supported.
- Test one behavior at a time.
- Build minimal role first:
  - appearance
  - health
  - idle
  - interact prompt
  - simple action
- Then add:
  - watching
  - custom UI
  - quest/shop logic
  - combat/motion
  - polish animations
- Avoid giant monolithic roles.

---

## 43. NPC JSON Debugging Checklist

When an NPC does not work:

- [ ] Is the role JSON in the correct path?
- [ ] Is `IncludesAssetPack` enabled?
- [ ] Is the role ID/path correct?
- [ ] Is `Type` correct?
- [ ] Does `Appearance` exist?
- [ ] Does `StartState` match an implemented state?
- [ ] Are instructions valid JSON?
- [ ] Are sensors valid?
- [ ] Are actions valid?
- [ ] Are states spelled consistently?
- [ ] Is the NPC stuck in a blocking action?
- [ ] Did a higher-priority instruction prevent later instructions?
- [ ] Is `Continue` missing where needed?
- [ ] Is `Any` placed too early?
- [ ] Is `CanInteract` view sector too strict?
- [ ] Is `SetInteractable` being reset to false later?
- [ ] Is `HasInteracted` nested correctly?
- [ ] Is `BusyStates` blocking multi-player interaction?
- [ ] Is `$Interaction` returned to Idle/Watching?
- [ ] Are custom actions registered?
- [ ] Are custom action names identical in Java and JSON?
- [ ] Does Hytale log JSON/asset errors?

---

## 44. Spawning NPCs

Use `NPCPlugin.get().spawnNPC(...)` where available.

Conceptual pattern:

```java
Pair<Ref<EntityStore>, INonPlayerCharacter> result =
    NPCPlugin.get().spawnNPC(store, "Kweebec_Sapling", null, position, rotation);

if (result != null) {
    Ref<EntityStore> npcRef = result.first();
    INonPlayerCharacter npc = result.second();

    setupNPCInventory(npcRef, store);
}
```

### Rules

- Always check result for null.
- Store `Ref<EntityStore>` if later updates are needed.
- Validate role/model ID.
- Spawn in valid world/store context.
- Add permission/cooldown to spawn commands.
- Avoid uncontrolled mass spawning.
- Track spawned NPCs if cleanup is required.
- Consider persistence: should the NPC respawn after restart?
- Use config for spawnable roles if admin-facing.

---

## 45. NPC Inventory and Equipment

After spawning, retrieve NPC component:

```java
NPCEntity npcComponent =
    store.getComponent(npcRef, Objects.requireNonNull(NPCEntity.getComponentType()));

if (npcComponent == null) {
    return;
}

npcComponent.setInventorySize(3, 9, 0);
Inventory inventory = npcComponent.getInventory();

inventory.getHotbar().addItemStackToSlot((short) 0, new ItemStack("Weapon_Mace_Thorium", 1));
InventoryHelper.useArmor(inventory.getArmor(), "Armor_Thorium_Head");
inventory.setActiveHotbarSlot((byte) 0);
```

### Rules

- Null-check component.
- Validate item IDs.
- Validate slots.
- Avoid invalid armor/item types.
- Keep equipment setup helper isolated.
- Do not duplicate items accidentally on repeated setup.

---

## 46. NPC + UI Integration Pattern

Best architecture for dialog/merchant NPC:

```txt
Role JSON:
  InteractionInstruction:
    HasInteracted -> Custom Action "OpenNpcDialog"

Java:
  registers "OpenNpcDialog"
  action opens InteractiveCustomUIPage

UI:
  .ui dialog layout
  event bindings for choices/buttons
  handleDataEvent validates and updates state

State:
  per-player dialog session
  quest/shop logic in service
  NPC ref/distance validation
```

### Benefits

- Role JSON handles presence/interact prompt.
- Java handles business logic.
- UI handles presentation.
- State remains server-authoritative.
- NPC behavior and UI can evolve independently.

---

# PART C — SERVER PLUGIN CORE

---

## 47. Commands

Use commands for:

- admin tools
- debug tools
- spawn commands
- teleport commands
- setup commands
- config reloads
- permissions tests
- UI preview/open commands

Choose correct base class:

- `AbstractAsyncCommand`
  - server/global operations
  - avoid direct world/store mutations
- `AbstractPlayerCommand`
  - player/world context
  - use for UI open, NPC spawn near player, teleport
- `AbstractTargetPlayerCommand`
  - target player operations
- `AbstractTargetEntityCommand`
  - entity target operations

### Command Rules

- Validate arguments.
- Use documented `ArgTypes`.
- Use permissions.
- Avoid destructive actions without confirmation.
- Return clear feedback.
- Log admin/destructive actions.
- Register in `setup()`.

Example:

```java
@Override
protected void setup() {
    this.getCommandRegistry().registerCommand(new OpenDialogCommand());
}
```

---

## 48. Permission Management

Use namespaced permission nodes.

Good:

```txt
myplugin.admin
myplugin.admin.npc.spawn
myplugin.admin.ui.preview
myplugin.user.dialog.open
myplugin.shop.buy
```

Bad:

```txt
spawn
admin
myplugin_admin
dialogOpen
```

Rules:

- Require permission for admin commands.
- Require permission for admin UI actions.
- Check permission again on UI event action, not only when opening UI.
- `OP` may have wildcard access.
- Missing permission should fail safely.
- Do not hide validation behind UI only.

---

## 49. Events

Use global events for plugin event handling.

Register in `setup()`.

Rules:

- Keep handlers small.
- Validate refs/components.
- Avoid heavy work.
- Avoid per-player expensive scans.
- Use services for logic.
- Use events to update HUDs and quests.
- Use events to clean UI sessions if player leaves/dies/changes world.

---

## 50. ECS Components and Persistent Data

Use ECS components for:

- persistent player quest state
- cooldowns that must survive restart
- custom stats
- NPC tags/state
- minigame state
- per-entity metadata

Rules:

- Use `BuilderCodec`.
- Register component type in setup.
- Use `putComponent` for persistent data.
- Use `addComponent` for temporary/session data where appropriate.
- Use `ensureAndGetComponent` for default state.
- Implement `clone()` correctly.
- Validate schema/codec carefully.

Avoid using static maps for persistent data.

Static maps are okay only for:

- transient UI sessions
- in-memory caches
- debug state
- short-lived runtime associations

And must be cleaned on disconnect/shutdown if needed.

---

## 51. Configuration

Use config for:

- feature toggles
- spawn role IDs
- UI debug flag
- shop IDs
- quest IDs
- default NPC roles
- cooldowns
- ranges
- permission nodes
- economy values

Rules:

- Define a config class with `BuilderCodec`.
- Use `withConfig(...)` in constructor if required.
- Call `config.save()` in setup.
- Do not mutate config without saving.
- Validate config values at startup.
- Log invalid config and use safe defaults.

---

## 52. Item Interactions

Use item interactions for:

- custom tools
- magic items
- UI openers
- quest items
- NPC remote interaction devices
- admin wands
- portable shop/menu items

Pattern:

- extend appropriate interaction base
- define `BuilderCodec`
- override execution method
- register with `getCodecRegistry(Interaction.CODEC).register(...)`
- link in item JSON under `Interactions`

JSON pattern:

```json
{
  "Interactions": {
    "Secondary": {
      "Interactions": [
        {
          "Type": "my_custom_interaction_id"
        }
      ]
    }
  }
}
```

Rules:

- Use cooldowns.
- Validate player context.
- Validate item state.
- Avoid duplication.
- Avoid direct packet hacks where native interactions work.

---

## 53. Player Input and Packets

Hytale servers do not receive raw keyboard input in a simple “key down” way. The client interprets input and sends interactions/packets.

Use:

- native interactions
- item interactions
- entity interactions
- UI events

Use packet filtering only when truly necessary.

### Packet Rules

- Prefer watchers for observation.
- Use filters only to block/modify.
- Filter narrowly.
- Do not block entire bundled packets if only one action should be removed.
- Preserve unrelated interaction chains.
- Deregister filters on shutdown.
- Expect client-server desync when blocking predicted actions.
- Validate performance.

---

# PART D — ASSETS, ITEMS, BLOCKS, INVENTORY

---

## 54. Asset Pack Rules

Enable asset pack in `manifest.json` for:

- UI
- NPC role JSON
- custom items
- custom blocks
- textures
- icons
- models
- language files

```json
{
  "IncludesAssetPack": true
}
```

Common resource roots:

```txt
resources/Common/UI/Custom
resources/Common/Icons
resources/Common/Items
resources/Common/Blocks
resources/Common/BlockTextures
resources/Server/NPC/Roles
resources/Server/Item/Items
resources/Server/Languages/en-US
```

---

## 55. Custom Items

Typical structure:

```txt
resources/
  Server/
    Item/
      Items/
        my_item.json
  Common/
    Icons/
      ItemsGenerated/
        my_item_icon.png
    Items/
      my_item/
        model.blockymodel
        model_texture.png
```

Item JSON can define:

- translation properties
- `Id`
- icon
- model
- texture
- quality
- max stack
- categories
- recipe
- interactions
- container

Rules:

- Keep item IDs stable.
- Use localization.
- Validate icon/model/texture paths.
- Test inventory icon.
- Test stack size.
- Test interactions.
- Avoid ID collisions.

---

## 56. Inventory

Use inventory APIs for:

- adding/removing item stacks
- opening pages
- custom item containers
- NPC equipment
- player rewards

Rules:

- Validate space before giving rewards.
- Handle full inventory.
- Avoid duplication in failure paths.
- Use transactions/sequence carefully for economy/shop logic.
- Do not trust UI-selected item IDs.

---

# PART E — SECURITY, SAFETY, PERFORMANCE

---

## 57. Server-Authoritative Validation

Always validate on the server:

- permissions
- player identity
- target entity
- target distance
- UI selection
- item ID
- inventory capacity
- currency balance
- quest state
- cooldowns
- config values
- NPC role/action IDs
- command arguments

Never trust:

- UI data
- client selection
- raw packet assumptions
- role JSON to protect economy
- hidden UI buttons
- disabled UI state
- client-side prompt visibility

---

## 58. Anti-Abuse Checklist

For every interactive feature:

- [ ] Is there a permission requirement?
- [ ] Is there a cooldown?
- [ ] Is repeated triggering safe?
- [ ] Can the player spam UI events?
- [ ] Can the player buy/gain items twice?
- [ ] Can the player trigger action after moving away?
- [ ] Can two players race on the same NPC/shop?
- [ ] Can invalid item IDs be submitted?
- [ ] Can stale UI sessions act on old state?
- [ ] Are destructive admin actions logged?
- [ ] Are error messages safe and non-leaky?

---

## 59. Performance Rules

Avoid:

- expensive sensors every tick
- huge NPC behavior trees with broad checks
- per-tick UI rebuilds
- per-tick packet parsing with heavy logic
- spawning many NPCs uncontrolled
- large static maps holding stale refs
- scanning every player/entity repeatedly
- logging hot loops

Prefer:

- event-driven updates
- cheap sensors first
- range limits
- state machines
- incremental UI updates
- cooldowns
- cached config
- explicit cleanup

---

# PART F — IMPLEMENTATION RECIPES

---

## 60. Recipe: Create a Custom HUD

1. Add `.ui` file under `resources/Common/UI/Custom/Hud/MyHud.ui`.
2. Set `IncludesAssetPack: true`.
3. Create class extending `CustomUIHud`.
4. Append `Hud/MyHud.ui` in `build`.
5. Open via `player.getHudManager().setCustomHud(...)`.
6. Add update methods using `UICommandBuilder`.
7. Rate-limit updates.
8. Test with Diagnostic Mode.

---

## 61. Recipe: Create an Interactive NPC Dialog

1. Create NPC role JSON.
2. Add `InteractionInstruction`.
3. Add `SetInteractable` prompt.
4. Add `HasInteracted`.
5. Trigger custom action such as `OpenNpcDialog`.
6. Register custom NPC action in plugin.
7. Create `.ui` dialog page.
8. Create `InteractiveCustomUIPage<Data>`.
9. Bind choice/button events.
10. Validate player/NPC/distance/session.
11. Update page or close.
12. Return NPC to idle/watching state.
13. Test with two players.

---

## 62. Recipe: Create a Merchant NPC

1. Copy/study `Kweebec_Merchant.json`.
2. Create role variant/template.
3. Configure appearance, health, invulnerability.
4. Add Idle/Watching/Interaction states.
5. Add `InteractionInstruction`.
6. For built-in shop, use `OpenBarterShop`.
7. For custom shop, use custom action + custom UI page.
8. Validate purchases server-side.
9. Handle full inventory.
10. Add cooldown/anti-spam.
11. Test single and multi-player interaction.

---

## 63. Recipe: Spawn an NPC from Command

1. Create `AbstractPlayerCommand`.
2. Add permission `myplugin.admin.npc.spawn`.
3. Get player position.
4. Use `NPCPlugin.get().spawnNPC(...)`.
5. Null-check result.
6. Optionally set inventory/equipment.
7. Send player feedback.
8. Log spawn.
9. Register command.
10. Build/test.

---

## 64. Recipe: Add Custom NPC Action

1. Decide action ID: `OpenMyDialog`.
2. Create Java action builder/class.
3. Define codec for JSON fields.
4. Register with `NPCPlugin.get().registerCoreComponentType(...)`.
5. Add action in Role JSON.
6. Validate data during execution.
7. Open UI / mutate state / trigger effect.
8. Test missing/invalid JSON fields.
9. Test multiple players.

---

## 65. Recipe: Debug Broken NPC Interaction

Check:

1. Role loads.
2. NPC spawns.
3. Appearance exists.
4. `StartState` exists.
5. Main instructions do not block forever.
6. Player enters interaction range.
7. `CanInteract` view sector is correct.
8. `SetInteractable` true is reached.
9. No later instruction immediately sets interactable false.
10. `HasInteracted` is nested correctly.
11. Custom action is registered.
12. `$Interaction` state exists.
13. `$Interaction` returns to normal state.
14. `BusyStates` behavior matches desired multi-player design.

---

## 66. Recipe: UI Event Stuck on Loading

Likely cause:

- `sendUpdate()` was not called.
- no page transition happened.
- handler threw before update.
- data codec failed.
- event binding key mismatch.
- selector missing.

Fix:

```java
@Override
public void handleDataEvent(..., Data data) {
    try {
        // handle data
    } catch (Exception ex) {
        // log and set error message
    } finally {
        sendUpdate();
    }
}
```

---

# PART G — RESPONSE FORMAT FOR THIS SKILL

---

## 67. When User Asks for Code

Respond with:

1. **Assumptions**
   - Hytale version/API uncertainty
   - plugin template layout
   - asset pack needs
2. **Files to create/edit**
3. **Implementation**
   - Java files
   - `.ui` files
   - JSON role/assets
   - manifest/config changes
4. **Registration points**
   - plugin setup
   - codec/action registry
   - command registry
5. **Validation**
   - permissions
   - UI data
   - NPC/player distance
   - inventory/economy
6. **Build/test**
   - `./gradlew build`
   - copy JAR
   - Diagnostic Mode
   - logs
7. **Known APIs to verify**

---

## 68. When User Asks for Architecture

Respond with:

- recommended structure
- data flow
- server/client responsibilities
- UI flow
- NPC Role flow
- state/session model
- safety/performance concerns
- milestones

For UI + NPC, prefer this architecture:

```txt
NPC Role JSON
  -> InteractionInstruction
  -> Custom NPC Action
  -> Java service validates
  -> InteractiveCustomUIPage opens
  -> UI event handlers call service
  -> service updates player/NPC/ECS state
  -> UI updates or closes
```

---

## 69. When User Asks to Debug

Ask for or inspect:

- logs
- file paths
- `manifest.json`
- role JSON
- `.ui` file
- Java page/action class
- plugin setup registration
- build output
- exact in-game behavior

Then provide:

- likely root cause
- minimal fix
- verification checklist
- optional refactor

---

## 70. Red Flags

Stop and verify when:

- UI modifies built-in client UI.
- API looks Minecraft/Bukkit-like but not Hytale-specific.
- Role JSON uses unknown sensors/actions.
- `.ui` elements use undocumented properties.
- Java code assumes raw keyboard input.
- Packet filters are used for ordinary gameplay.
- UI event data is trusted.
- Economy/shop logic has no atomicity.
- NPC interaction can be spammed.
- Command lacks permission.
- Persistent data is stored only in static maps.
- Code relies on stale `Ref<EntityStore>`.
- Full UI rebuild happens every tick.
- NPC role has broad expensive sensors every tick.

---

# PART H — STANDARD CHECKLISTS

---

## 71. Pre-Implementation Checklist

- [ ] Feature is classified: UI, NPC, plugin, item, block, packet, ECS.
- [ ] Asset pack needed?
- [ ] `IncludesAssetPack` needed?
- [ ] Correct resource paths known?
- [ ] Exact API known or marked `VERIFY`.
- [ ] Permission model defined.
- [ ] Server-authoritative validation defined.
- [ ] Multiplayer behavior defined.
- [ ] Persistence needs defined.
- [ ] UI event/session model defined.
- [ ] NPC state model defined.
- [ ] Build/test path defined.

---

## 72. Final Validation Checklist

- [ ] `./gradlew build` passes.
- [ ] JAR exists in `build/libs`.
- [ ] JAR copied to `UserData/Mods`.
- [ ] Mod appears in Hytale world mod list.
- [ ] Logs have no relevant errors.
- [ ] UI files are packaged.
- [ ] UI Diagnostic Mode checked.
- [ ] NPC role loads.
- [ ] NPC spawns.
- [ ] Interaction prompt appears.
- [ ] UI opens.
- [ ] UI events work.
- [ ] `sendUpdate()` happens.
- [ ] Permissions enforced.
- [ ] Invalid input rejected.
- [ ] Multi-player behavior tested.
- [ ] Restart persistence tested if relevant.

---

## 73. Source Notes

This skill is based on the HytaleModding documentation set for:

- Custom UI official documentation.
- Custom UI guide.
- Common UI styling.
- Layout.
- Markup.
- NPC introduction.
- NPC roles.
- NPC states.
- Interactable NPCs.
- Spawning NPCs.
- Plugin commands.
- Permissions.
- Persistent player data.
- Configuration.
- Item interactions.
- Packet/player input guidance.

Always re-check the live docs and current server jar when exact APIs matter.
