import { Router } from "express";
import { db, keysTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { notifyKeyUse } from "../telegram";

const router = Router();

const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function genPart(len = 4) {
  return Array.from({ length: len }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join("");
}
function genKey() {
  return `JEAN-${genPart()}-${genPart()}`;
}

// Keys fijas batch-2 (30 keys de 1 uso por cuenta)
const BATCH2_KEYS = [
  "JEAN-K7M2-QR49","JEAN-L3N8-WS61","JEAN-M9P4-XT83","JEAN-N1Q6-YU05","JEAN-O5R0-ZV27",
  "JEAN-P8S3-AB50","JEAN-Q2T7-BC72","JEAN-R6U1-CD94","JEAN-S0V5-DE16","JEAN-T4W9-EF38",
  "JEAN-U7X2-FG60","JEAN-V1Y6-GH82","JEAN-W5Z0-HI04","JEAN-X9A4-IJ26","JEAN-Y2B8-JK48",
  "JEAN-Z6C1-KL70","JEAN-AA0D-LM92","JEAN-BB4E-MN14","JEAN-CC8F-NO36","JEAN-DD2G-OP58",
  "JEAN-EE6H-PQ80","JEAN-FF0I-QR02","JEAN-GG4J-RS24","JEAN-HH8K-ST46","JEAN-II2L-TU68",
  "JEAN-JJ6M-UV90","JEAN-KK0N-VW12","JEAN-LL4O-WX34","JEAN-MM8P-XY56","JEAN-NN2Q-YZ78",
];

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

const BATCH3_KEYS = [
  "JEAN-RR4A-PL93","JEAN-SS8B-QM15","JEAN-TT2C-RN37","JEAN-UU6D-SO59","JEAN-VV0E-TP81",
  "JEAN-WW4F-UQ03","JEAN-XX8G-VR25","JEAN-YY2H-WS47","JEAN-ZZ6I-XT69","JEAN-AQ0J-YU91",
  "JEAN-BR4K-ZV13","JEAN-CS8L-AW35","JEAN-DT2M-BX57","JEAN-EU6N-CY79","JEAN-FV0O-DZ01",
  "JEAN-GW4P-EA23","JEAN-HX8Q-FB45","JEAN-IY2R-GC67","JEAN-JZ6S-HD89","JEAN-KA0T-IE01",
];

async function seedBatch2Keys() {
  try {
    const rows = BATCH2_KEYS.map(k => ({
      key: k,
      isActive: true,
      maxUses: 1,
      note: "batch2",
    }));
    await db.insert(keysTable).values(rows).onConflictDoNothing();
  } catch {}
}

async function seedBatch3Keys() {
  try {
    const rows = BATCH3_KEYS.map(k => ({
      key: k,
      isActive: true,
      maxUses: 1,
      note: "batch3",
    }));
    await db.insert(keysTable).values(rows).onConflictDoNothing();
  } catch {}
}

async function seedAdminKey() {
  try {
    await db.insert(keysTable).values({
      key: "JEAN",
      isActive: true,
      maxUses: 1,
      note: "admin key",
    }).onConflictDoNothing();
  } catch {}
}

seedInitialKeys();
seedBatch2Keys();
seedBatch3Keys();
seedAdminKey();

router.get("/validate", async (req, res) => {
  const { key, username, userid } = req.query as { key: string; username: string; userid?: string };
  if (!key || !username) return res.json({ valid: false, reason: "missing_params" });

  try {
    const [found] = await db.select().from(keysTable).where(eq(keysTable.key, key.trim().toUpperCase()));

    if (!found || !found.isActive) return res.json({ valid: false, reason: "invalid" });
    if (found.expiresAt && found.expiresAt < new Date()) return res.json({ valid: false, reason: "expired" });

    const usedBy = (found.usedBy as string[]) || [];

    const isAdmin = found.note === "admin key";
    const expiresAt = found.expiresAt ? found.expiresAt.getTime() : null;

    if (usedBy.includes(username)) {
      notifyKeyUse({ key: found.key, username, userId: userid, cached: true }).catch(() => {});
      return res.json({ valid: true, cached: true, admin: isAdmin, expiresAt });
    }

    if (found.timesUsed >= found.maxUses) return res.json({ valid: false, reason: "used" });

    await db.update(keysTable).set({
      timesUsed: found.timesUsed + 1,
      usedBy: [...usedBy, username],
    }).where(eq(keysTable.id, found.id));

    notifyKeyUse({ key: found.key, username, userId: userid, cached: false }).catch(() => {});

    return res.json({ valid: true, admin: isAdmin, expiresAt });
  } catch (err) {
    return res.status(500).json({ valid: false, reason: "server_error" });
  }
});

export default router;
