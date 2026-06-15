import { pgTable, serial, text, boolean, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const keysTable = pgTable("jean_keys", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  isActive: boolean("is_active").notNull().default(true),
  maxUses: integer("max_uses").notNull().default(1),
  timesUsed: integer("times_used").notNull().default(0),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  usedBy: jsonb("used_by").$type<string[]>().notNull().default([]),
  note: text("note"),
});

export const insertKeySchema = createInsertSchema(keysTable).omit({
  id: true,
  timesUsed: true,
  createdAt: true,
  usedBy: true,
});
export type InsertKey = z.infer<typeof insertKeySchema>;
export type Key = typeof keysTable.$inferSelect;
