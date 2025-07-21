# Codex Task: Fix and finalize Prezenta 3-scene greeting template

## Context

This is a greeting template for the PREZENTA platform.  
It consists of **three scenes**, each located in its own folder:

1. `scene1/` — opening animation
2. `scene2/` — main greeting screen
3. `scene3/` — final screen with gift or certificate

Scene transitions are managed via `scene-manager.js`.  
The main HTML file is `index.html` in the root of the repository.

---

## ⚠️ Instructions for Codex

Please address the following tasks **one at a time**.  
**Start with Task 1 only**. When finished, commit changes and stop.

---

## Problems to solve

- ❌ **Scene 2 is not scrollable on mobile devices** — likely due to CSS overscroll prevention
- ❌ **No transition from Scene 2 to Scene 3** — currently only Scene 1 → Scene 2 is implemented
- ❌ **White flash between scenes** — visually unpleasant during scene transitions
- ❌ **Only Scene 3 has a config.json** — Scenes 1 and 2 are missing config files for customization

---

## Tasks

### 1. Fix scroll behavior on mobile for `scene2/`
- Ensure the content can scroll on small screens
- Investigate any `overflow`, `position: fixed`, or `overscroll` issues

### 2. Implement the transition from Scene 2 to Scene 3 in `scene-manager.js`
- Use the same mechanism as Scene 1 → Scene 2
- Ensure it is triggered naturally or by user interaction (e.g. button)

### 3. Remove or visually mask white flashes during scene transitions
- Apply seamless fade, background animation, or a placeholder color between scenes

### 4. Create and connect `config.json` files for `scene1/` and `scene2/`
- Structure should follow `scene3/config.json`
- Move all customizable values into JSON

### 5. Ensure all three scenes correctly read their config values on load

---

## Expectations

After completing all tasks (one-by-one), the template should:

- Behave as one seamless 3-scene experience
- Load each scene smoothly, without flashes
- Be fully customizable via `config.json` files
