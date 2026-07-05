---
name: Lua script pipeline
description: How the Roblox Lua hub is served and how to safely edit/verify it
---

- The whole Lua hub lives inside a TypeScript template literal `(host) => string`. Avoid backticks and `${}` in Lua except the intentional `${host}`.
- **How to verify:** `curl localhost:80/api/jios > /tmp/jios.lua`, then parse with luaparse (`/tmp/luachk`, luaVersion 5.1). Do this after every Lua edit.
- **Why:** a single syntax slip breaks the loader for every customer instantly.
- After server edits: restart the API Server workflow, curl-verify, and remind the user to Republish (he publishes manually).
- Any user-visible Lua text added after the language picker must use the `T()`/`TR` bilingual mechanism; text created before language pick is handled by the `ApplyLang` sweep.
- A full copy of the script is kept in `exports/` for user download — refresh it after changes.
