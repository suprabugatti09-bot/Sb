import { Router } from "express";
import { db, keysTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function genPart(len = 4) {
  return Array.from({ length: len }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join("");
}
function genKey() {
  return `JEAN-${genPart()}-${genPart()}`;
}

async function seedInitialKeys() {
  try {
    const existing = await db.select().from(keysTable).limit(1);
    if (existing.length === 0) {
      const keys = Array.from({ length: 50 }, () => ({
        key: genKey(),
        isActive: true,
        maxUses: 1,
        note: "Initial seed key",
      }));
      const uniqueKeys = [...new Map(keys.map(k => [k.key, k])).values()];
      await db.insert(keysTable).values(uniqueKeys).onConflictDoNothing();
    }
  } catch {}
}

seedInitialKeys();

router.get("/validate", async (req, res) => {
  const { key, username } = req.query as { key: string; username: string };
  if (!key || !username) return res.json({ valid: false, reason: "missing_params" });

  try {
    const [found] = await db.select().from(keysTable).where(eq(keysTable.key, key.trim().toUpperCase()));

    if (!found || !found.isActive) return res.json({ valid: false, reason: "invalid" });
    if (found.expiresAt && found.expiresAt < new Date()) return res.json({ valid: false, reason: "expired" });

    const usedBy = (found.usedBy as string[]) || [];

    if (usedBy.includes(username)) {
      return res.json({ valid: true, cached: true });
    }

    if (found.timesUsed >= found.maxUses) return res.json({ valid: false, reason: "used" });

    await db.update(keysTable).set({
      timesUsed: found.timesUsed + 1,
      usedBy: [...usedBy, username],
    }).where(eq(keysTable.id, found.id));

    return res.json({ valid: true });
  } catch (err) {
    return res.status(500).json({ valid: false, reason: "server_error" });
  }
});

export default router;
