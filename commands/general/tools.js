const Discord = require("discord.js");
const commandExtra = require("../../extra/command");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    name: "tools",
    longDesc:
        "Do you want to know the tools I used for this project? Well you can find them here.",
    slashData: new SlashCommandBuilder()
        .setName("tools")
        .setDescription(
            "Do you want to know the tools I used for this project? Well you can find them here."
        ),
    execute: async (isSlash, context) => {
        const embed = new Discord.MessageEmbed()
            .setColor("#03fccf")
            .setTitle("**Exernal Tools :wrench:**")
            .addField("**LIBRARIES**", "Discord.js Library - [Github Page](https://github.com/discordjs/discord.js/)\nFs Library - [Github Page](https://github.com/nodejs/node/blob/master/doc/api/fs.md)\n Node-Fetch Library - [Github Page](https://github.com/node-fetch/node-fetch)")
            .addField("**APIS**", "The Cat Api - [Api Website](https://thecatapi.com/)\n Dog Api - [Api Website](https://dog.ceo/dog-api/)\n Inpsirobot - [Api Website](https://inspirobot.me/)\n Evil Insult Generator Api - [Api Website](https://evilinsult.com)\n Trivia Api - [Api Website](https://opentdb.com/)")
            .addField("LANGUAGE", "Node.js Language - [Language Website](https://nodejs.org/)")
        commandExtra.sendMessage(isSlash, context, {embeds : [embed]})
    },
};
