const Discord = require("discord.js");
const commandExtra = require("../../extra/command");
const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require("node-fetch")

module.exports = {
    name: "cat",
    longDesc:
        "Do you love cats? Well I have good news for you buddy. Just run the command once and you'll have yourself a fluffy companion to look at.",
    slashData: new SlashCommandBuilder()
        .setName("cat")
        .setDescription("Command made for cat lovers."),
    execute: async (isSlash, context) => {
        fetch("https://api.thecatapi.com/v1/images/search?api_key=5de82e74-44aa-4e27-b35a-73113343c57d").then(response => response.json()).then(json => {
        result = json[0].url
        const embed = new Discord.MessageEmbed()
          .setImage(result)
          .setColor("#ffbafd")
          .setTimestamp()
          
        commandExtra.sendMessage(isSlash, context, {embeds : [embed]})
      })   
    },
};
