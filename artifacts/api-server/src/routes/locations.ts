import { Router } from "express";
import { db, keysTable, locationsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

async function isAdminKey(key: string | undefined): Promise<boolean> {
  if (!key) return false;
  try {
    const [found] = await db.select().from(keysTable).where(eq(keysTable.key, key.trim().toUpperCase()));
    return !!found && found.isActive && found.note === "admin key";
  } catch {
    return false;
  }
}

router.get("/locations", async (_req, res) => {
  try {
    const rows = await db.select().from(locationsTable);
    return res.json({
      locations: rows.map(r => ({ id: r.id, name: r.name, x: r.x, y: r.y, z: r.z })),
    });
  } catch {
    return res.status(500).json({ locations: [] });
  }
});

router.get("/locations/save", async (req, res) => {
  const { key, name, x, y, z, username } = req.query as Record<string, string>;
  if (!(await isAdminKey(key))) return res.json({ ok: false, reason: "not_admin" });
  const nx = Number(x), ny = Number(y), nz = Number(z);
  const cleanName = (name || "").trim().slice(0, 40);
  if (!cleanName || !Number.isFinite(nx) || !Number.isFinite(ny) || !Number.isFinite(nz)) {
    return res.json({ ok: false, reason: "bad_params" });
  }
  try {
    await db.insert(locationsTable).values({
      name: cleanName,
      x: nx,
      y: ny,
      z: nz,
      createdBy: username || null,
    });
    return res.json({ ok: true });
  } catch {
    return res.status(500).json({ ok: false, reason: "server_error" });
  }
});

router.get("/locations/delete", async (req, res) => {
  const { key, id } = req.query as Record<string, string>;
  if (!(await isAdminKey(key))) return res.json({ ok: false, reason: "not_admin" });
  const nid = Number(id);
  if (!Number.isInteger(nid)) return res.json({ ok: false, reason: "bad_params" });
  try {
    await db.delete(locationsTable).where(eq(locationsTable.id, nid));
    return res.json({ ok: true });
  } catch {
    return res.status(500).json({ ok: false, reason: "server_error" });
  }
});

export default router;
