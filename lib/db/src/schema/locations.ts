import { pgTable, serial, text, real, timestamp } from "drizzle-orm/pg-core";

export const locationsTable = pgTable("jean_locations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  x: real("x").notNull(),
  y: real("y").notNull(),
  z: real("z").notNull(),
  createdBy: text("created_by"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Location = typeof locationsTable.$inferSelect;

export const settingsTable = pgTable("jean_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
});
