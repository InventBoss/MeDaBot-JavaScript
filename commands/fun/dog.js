const Discord = require("discord.js");
const commandExtra = require("../../extra/command");
const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require("node-fetch")

module.exports = {
    name: "dog",
    longDesc:
        "Like the cat command, but for dogs...",
    slashData: new SlashCommandBuilder()
        .setName("dog")
        .setDescription("Like the cat command, but for dogs..."),
    execute: async (isSlash, context) => {
        fetch("https://dog.ceo/api/breeds/image/random").then(response => response.json()).then(json => {
        result = json.message
        const embed = new Discord.MessageEmbed()
          .setImage(result)
          .setColor("#34c4e0")
          .setTimestamp()
          
        commandExtra.sendMessage(isSlash, context, {embeds : [embed]})
      })   
    },
};