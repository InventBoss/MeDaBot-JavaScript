const Discord = require("discord.js");
const commandExtra = require("../../extra/command");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    name: "8ball",
    longDesc:
        "Let a png of an 8ball on Google decide your simple questions. Put your entire question after the command.",
    slashData: new SlashCommandBuilder()
        .setName("8ball")
        .setDescription("Let a fictional orb control your simple questions")
        .addStringOption((option) =>
            option
                .setName("question")
                .setDescription("Insert dumb question here")
                .setRequired(true)
        ),
    execute(isSlash, context, text) {
        let choiceType = Math.floor(Math.random() * 3);

        let answers;
        if (choiceType === 1) {
            answers = [
                "As I see it, yes",
                "It is certain",
                "It is decidedly so",
                "Most likely",
                "Outlook good",
                "Signs point to yes",
                "Without a doubt",
                "Yes",
                "Yes – definitely",
            ];
        } else if (choiceType === 2) {
            answers = [
                "Don’t count on it",
                "My reply is no",
                "My sources say no",
                "Outlook not so good",
                "Very doubtful",
            ];
        } else {
            answers = [
                "Ask again later",
                "Better not tell you now",
                "Cannot predict now",
                "Concentrate and ask again",
                "Reply hazy, try again",
            ];
        }
        let chosenAnswer = answers[Math.floor(Math.random() * answers.length)];

        let question = text;
        if (isSlash) {
            question = context.options.getString("question");
        }

        const embed = new Discord.MessageEmbed()
            .setColor("#2e2a9c")
            .setThumbnail(
                "https://cdn.discordapp.com/attachments/763337340226895874/954952357458874438/8ball.png"
            )
            .addField(
                "**Question**",
                `${question.toString().replace(/,/g, " ")}`
            )
            .addField("**Answer**", `**${chosenAnswer}**`)
            .setTimestamp()
            .setFooter({
                text: `${context.author?.tag || context.user.tag}`,
                iconURL: `${
                    context.author?.displayAvatarURL() ||
                    context.user.displayAvatarURL()
                }`,
            });

        commandExtra.sendMessage(isSlash, context, { embeds: [embed] });
    },
};
