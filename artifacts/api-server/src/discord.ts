import {
  Client,
  GatewayIntentBits,
  Events,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  MessageFlags,
  SlashCommandBuilder,
  type Interaction,
} from "discord.js";
import { logger } from "./lib/logger";

const TOKEN = process.env.DISCORD_BOT_TOKEN;

const SCRIPT_HOST = "jean-cheat-hub--sadx8992.replit.app";
const LOADSTRING = `loadstring(game:HttpGet("https://${SCRIPT_HOST}/api/jios"))()`;

let started = false;

export function startDiscordBot() {
  if (!TOKEN) {
    logger.info("DISCORD_BOT_TOKEN no configurado, bot de Discord apagado");
    return;
  }
  if (started) return;
  started = true;

  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  client.once(Events.ClientReady, async (c) => {
    logger.info({ tag: c.user.tag }, "Bot de Discord iniciado");
    try {
      const panel = new SlashCommandBuilder()
        .setName("panel")
        .setDescription("Publica el panel con el botón Get Script");
      await c.application.commands.set([panel.toJSON()]);
      logger.info("Comando /panel registrado en Discord");
    } catch (err) {
      logger.error({ err }, "error registrando comandos de Discord");
    }
  });

  client.on(Events.InteractionCreate, async (interaction: Interaction) => {
    try {
      if (interaction.isChatInputCommand() && interaction.commandName === "panel") {
        const embed = new EmbedBuilder()
          .setColor(0x34c759)
          .setTitle("JEAN X JAY — SCRIPT HUB")
          .setDescription(
            "¡Bienvenido! 👋\n\nPresiona el botón de abajo para obtener el script.\n\n📜 **Get Script** — Copia el loadstring gratis.",
          )
          .setFooter({ text: "JEAN X JAY" });

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
          new ButtonBuilder()
            .setCustomId("get_script")
            .setLabel("Get Script")
            .setEmoji("📜")
            .setStyle(ButtonStyle.Success),
        );

        await interaction.reply({ embeds: [embed], components: [row] });
        return;
      }

      if (interaction.isButton() && interaction.customId === "get_script") {
        await interaction.reply({
          content:
            "📜 **Aquí está tu script:**\n" +
            "Cópialo y pégalo en tu ejecutor.\n\n" +
            "```lua\n" +
            LOADSTRING +
            "\n```",
          flags: MessageFlags.Ephemeral,
        });
        return;
      }
    } catch (err) {
      logger.error({ err }, "error manejando interacción de Discord");
    }
  });

  client.login(TOKEN).catch((err) => {
    logger.error({ err }, "no se pudo iniciar sesión en Discord");
  });
}
