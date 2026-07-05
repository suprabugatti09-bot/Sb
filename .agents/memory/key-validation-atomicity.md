---
name: Key validation atomicity
description: Rule for counting key uses safely under concurrency
---

- Key-use accounting must be one conditional `UPDATE ... WHERE is_active AND times_used < max_uses AND NOT used_by @> [user] RETURNING`, then branch on affected rows (0 rows → recheck if user is already in used_by → cached, else "used").
- **Why:** the original select→check→update pattern let two simultaneous validations both pass the check, exceeding max_uses.
- **How to apply:** any future endpoint that increments a limited counter (uses, credits, slots) should follow the same single-statement conditional update pattern.
