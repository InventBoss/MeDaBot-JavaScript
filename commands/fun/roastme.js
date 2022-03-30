const Discord = require("discord.js");
const commandExtra = require("../../extra/command");
const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require("node-fetch")

module.exports = {
    name: "roastme",
    longDesc:
        "Do you feel confident in yourself? Well you can lower that self esteem here. Simply run the command and feel instant sadness.",
    slashData: new SlashCommandBuilder()
        .setName("roastme")
        .setDescription("Do you feel confident in yourself? Well you can lower that self esteem here."),
    execute: async (isSlash, context) => {
        fetch("https://evilinsult.com/generate_insult.php?lang=en&type=json").then(response => response.json()).then(json => {
        result = json.insult
        const embed = new Discord.MessageEmbed()
          .setDescription(`\`\`\`${result.replace(/&quot;/g, "\"")}\`\`\``)
          .setColor("#fc4e03")
          
        commandExtra.sendMessage(isSlash, context, {embeds : [embed]})
      })   
    },
};
