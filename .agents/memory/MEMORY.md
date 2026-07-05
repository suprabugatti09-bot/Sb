# Memory Index

- [Lua script pipeline](lua-script-pipeline.md) — the Lua hub is a TS template literal; syntax-check via luaparse 5.1 after every edit; user republishes manually.
- [Telegram bot binding](telegram-bot-binding.md) — bot chat_id must be claimed with /link + admin password; never save chat_id from arbitrary messages.
- [Key validation atomicity](key-validation-atomicity.md) — key use counting must be a single conditional UPDATE, not select-then-update, or concurrent joins overshoot max_uses.
