const Discord = require("discord.js");
const commandExtra = require("../../extra/command");
const { SlashCommandBuilder } = require("@discordjs/builders");
const moment = require("moment");

module.exports = {
    name: "user",
    longDesc:
        "Get info about a specific user. Put the mention or id of the user in the first argument, and hey presto!",
    slashData: new SlashCommandBuilder()
        .setName("user")
        .setDescription("Get a bunch of info on a specific person")
        .addMentionableOption((option) =>
            option
                .setName("person")
                .setDescription(
                    "Choose who to immediately violate their privacy"
                )
                .setRequired(true)
        ),
    execute: async (isSlash, context, args) => {
        if (!context.guild)
            return commandExtra.sendMessage(isSlash, context, {
                content: "Sorry, but this is only available in servers!",
            });

        let chosenUser;
        if (isSlash) {
            chosenUser = await context.guild.members.cache.get(
                await context.options.getMentionable("person").id
            );
        } else {
            chosenUser =
                context.mentions.members.first() ||
                context.guild.members.cache.get(args[0]) ||
                context.member;
        }

        const embed = new Discord.MessageEmbed()
            .setColor("#6b03fc")
            .setTitle(chosenUser.user.tag)
            .setThumbnail(chosenUser.user.displayAvatarURL())
            .setDescription(
                `Id | \`${chosenUser.id}\`\nJoined Server | **${moment(
                    chosenUser.joinedAt
                ).format("LLLL")}**\nCreated Account | **${moment(
                    chosenUser.user.createdAt
                ).format("LLLL")}**`
            );

        commandExtra.sendMessage(isSlash, context, { embeds: [embed] });
    },
};
