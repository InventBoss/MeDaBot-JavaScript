const Discord = require("discord.js");
const commandExtra = require("../../extra/command");
const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require("node-fetch");
const { is } = require("express/lib/request");

module.exports = {
    name: "console",
    longDesc: "A developer command for InventBoss",
    slashData: new SlashCommandBuilder()
        .setName("console")
        .setDescription("A developer command for InventBoss")
        .addSubcommand((subcommand) =>
            subcommand
                .setName("say")
                .setDescription("Violate my free speech")
                .addStringOption((option) =>
                    option
                        .setName("input")
                        .setDescription("Insert Violation")
                        .setRequired(true)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand.setName("uptime").setDescription("Get the bot uptime")
        ),
    execute: async (isSlash, context, args) => {
        if ((context.author?.id || context.user?.id) !== "617816411750006794")
            return commandExtra.sendMessage(isSlash, context, {
                content: "You're not my father!",
            });

        let subcommand = args?.[0] || context.options?.getSubcommand();
        if (subcommand === "say") {
            if (!isSlash) {
                await context.channel.bulkDelete(1)
            }
            commandExtra.sendMessage(isSlash, context, {
                content:
                    args?.slice(1).join(" ") ||
                    context.options.getString("input"),
            });
        } else if (subcommand === "uptime") {
            const totalSeconds = context.client.uptime / 1000;

            const embed = new Discord.MessageEmbed()
                .setDescription(
                    `${Math.floor(totalSeconds / 86400)}d : ${Math.floor(totalSeconds / 3600)}h : ${Math.floor(totalSeconds / 60)}m : ${Math.floor(totalSeconds % 60)}s`
                )
                .setColor("#b5005b");
            commandExtra.sendMessage(isSlash, context, { embeds: [embed] });
        }
    },
};
