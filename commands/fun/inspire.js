const Discord = require("discord.js");
const commandExtra = require("../../extra/command");
const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require("node-fetch");

module.exports = {
    name: "inspire",
    longDesc:
        "Thanks to the power of inspirobot.me, we can have strange pieces of advice from a robot. Just type the command and hey presto!",
    slashData: new SlashCommandBuilder()
        .setName("inspire")
        .setDescription(
            "Get pieces of advice from a strange robot on the web."
        ),
    execute: async (isSlash, context) => {
        fetch("https://inspirobot.me/api?generate=true")
            .then((response) => response.text())
            .then((text) => {
                const embed = new Discord.MessageEmbed()
                    .setColor("#9996ff")
                    .setImage(text)
                    .setTimestamp();
                commandExtra.sendMessage(isSlash, context, { embeds: [embed] });
            });
    },
};
