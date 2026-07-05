---
name: Telegram bot binding
description: Security rule for binding the notification bot to the owner
---

- The Telegram bot must only save the owner's chat_id when the user sends `/link <admin password>`; any other message gets instructions, never a binding.
- Callback actions (like deactivating a key) must verify the callback comes from the saved chat_id.
- **Why:** the first version saved chat_id from ANY incoming message — a random stranger messaging the bot could hijack all notifications and deactivate keys.
- **How to apply:** any future bot command or admin action must check the sender's chat against the stored `telegram_chat_id` in jean_settings.
- Long-poll loop must back off (sleep) when Telegram returns `ok:false`, not just on thrown errors, to avoid hammering the API.
