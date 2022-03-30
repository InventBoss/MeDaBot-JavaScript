const Discord = require("discord.js");
const commandExtra = require("../../extra/command");
const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require("node-fetch")

module.exports = {
    name: "about",
    longDesc:
        "Do you want to learn about me? How about my author? Well you can do that here.",
    slashData: new SlashCommandBuilder()
        .setName("about")
        .setDescription("Do you want to learn about me? How about my author? Well you can do that here."),        
    execute: async (isSlash, context) => {
        const row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
                .setLabel("Twitter")
                .setStyle("LINK")
                .setURL("https://twitter.com/Invent_Boss"),
            new Discord.MessageButton()
                .setLabel("Github")
                .setStyle("LINK")
                .setURL("https://github.com/InventBoss/MeDaBot-JavaScript")
        );

        const embed = new Discord.MessageEmbed()
          .addField("About MeDaBot", "MeDaBot is a general purpose/meme related discord bot created by InventBoss. The project started in a single python and has moved up into a mutli-file Node.js project.")
          .addField("About InventBoss", "InventBoss is a french programmer who created MeDaBot. He's created many other projects such as [Futurez.net](https://futurez.net), many private discord bots, and more.")
          .setColor("#fc4e03")
          
        commandExtra.sendMessage(isSlash, context, {embeds : [embed], components: [row]})      
    },
};
