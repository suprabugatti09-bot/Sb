import { db, keysTable, settingsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { logger } from "./lib/logger";

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "jean010912@$";
const API = TOKEN ? `https://api.telegram.org/bot${TOKEN}` : null;

async function tg(method: string, body: Record<string, unknown>): Promise<any> {
  if (!API) return null;
  try {
    const r = await fetch(`${API}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return await r.json();
  } catch (err) {
    logger.error({ err, method }, "telegram api error");
    return null;
  }
}

async function getChatId(): Promise<string | null> {
  try {
    const [row] = await db.select().from(settingsTable).where(eq(settingsTable.key, "telegram_chat_id"));
    return row?.value ?? null;
  } catch {
    return null;
  }
}

async function saveChatId(chatId: string) {
  await db
    .insert(settingsTable)
    .values({ key: "telegram_chat_id", value: chatId })
    .onConflictDoUpdate({ target: settingsTable.key, set: { value: chatId } });
}

export async function notifyKeyUse(opts: {
  key: string;
  username: string;
  userId?: string;
  cached: boolean;
}) {
  if (!API) return;
  const chatId = await getChatId();
  if (!chatId) return;
  const title = opts.cached ? "🔁 ENTRADA REPETIDA" : "🔑 KEY USADA (primera vez)";
  const text =
    `${title}\n\n` +
    `🗝️ Key: ${opts.key}\n` +
    `👤 User de Roblox: ${opts.username}\n` +
    `🆔 ID de Roblox: ${opts.userId || "desconocido"}\n` +
    `🕒 ${new Date().toLocaleString("es-DO", { timeZone: "America/Santo_Domingo" })}`;
  await tg("sendMessage", {
    chat_id: chatId,
    text,
    reply_markup: {
      inline_keyboard: [[{ text: "🚫 Desactivar esta key", callback_data: `deact:${opts.key}` }]],
    },
  });
}

let polling = false;

export function startTelegramBot() {
  if (!TOKEN) {
    logger.info("TELEGRAM_BOT_TOKEN no configurado, bot de Telegram apagado");
    return;
  }
  if (polling) return;
  polling = true;
  let offset = 0;

  const loop = async () => {
    while (polling) {
      try {
        const res = await tg("getUpdates", {
          offset,
          timeout: 25,
          allowed_updates: ["message", "callback_query"],
        });
        if (!res || !res.ok) {
          await new Promise(r => setTimeout(r, 5000));
          continue;
        }
        if (Array.isArray(res.result)) {
          for (const upd of res.result) {
            offset = upd.update_id + 1;
            if (upd.message && upd.message.chat) {
              const chatId = String(upd.message.chat.id);
              const text = String(upd.message.text || "").trim();
              const savedChatId = await getChatId();
              if (text.startsWith("/link ")) {
                const pass = text.slice(6).trim();
                if (pass === ADMIN_PASSWORD) {
                  await saveChatId(chatId);
                  await tg("sendMessage", {
                    chat_id: chatId,
                    text: "✅ Bot conectado. Aquí te llegarán las notificaciones cada vez que alguien use una de tus keys.",
                  });
                } else {
                  await tg("sendMessage", {
                    chat_id: chatId,
                    text: "❌ Contraseña incorrecta.",
                  });
                }
              } else if (savedChatId && chatId === savedChatId) {
                await tg("sendMessage", {
                  chat_id: chatId,
                  text: "✅ Ya estás conectado. Te aviso cuando alguien use una key.",
                });
              } else {
                await tg("sendMessage", {
                  chat_id: chatId,
                  text: "🔒 Para conectar el bot escribe:\n/link TU_CONTRASEÑA_DE_ADMIN",
                });
              }
            } else if (upd.callback_query) {
              const cq = upd.callback_query;
              const cqChatId = cq.message ? String(cq.message.chat.id) : null;
              const savedChatId = await getChatId();
              if (!savedChatId || cqChatId !== savedChatId) {
                await tg("answerCallbackQuery", {
                  callback_query_id: cq.id,
                  text: "No autorizado ❌",
                });
                continue;
              }
              const data = String(cq.data || "");
              if (data.startsWith("deact:")) {
                const keyToDeact = data.slice(6).trim().toUpperCase();
                let done = false;
                try {
                  const result = await db
                    .update(keysTable)
                    .set({ isActive: false })
                    .where(eq(keysTable.key, keyToDeact))
                    .returning();
                  done = result.length > 0;
                } catch (err) {
                  logger.error({ err }, "error desactivando key");
                }
                await tg("answerCallbackQuery", {
                  callback_query_id: cq.id,
                  text: done ? `Key ${keyToDeact} desactivada ✅` : "No se pudo desactivar ❌",
                });
                if (cq.message) {
                  await tg("sendMessage", {
                    chat_id: cq.message.chat.id,
                    text: done
                      ? `🚫 Key ${keyToDeact} DESACTIVADA. Ya nadie puede usarla.`
                      : `❌ No pude desactivar la key ${keyToDeact}.`,
                  });
                }
              }
            }
          }
        }
      } catch (err) {
        logger.error({ err }, "telegram poll error");
        await new Promise(r => setTimeout(r, 5000));
      }
    }
  };
  loop();
  logger.info("Bot de Telegram iniciado (polling)");
}
