const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "inspireme",
  execute(message) {
    const embed = new Discord.MessageEmbed()
        .setDescription("**LOADING QUOTE**")
        .setColor("#8945ff")

    message.channel.send(embed).then(m => {
      
      fetch("https://zenquotes.io/api/random").then(response => response.json()).then(json => {
        const embed = new Discord.MessageEmbed()
          .setDescription(`> ${json[0].q}\n\n - ${json[0].a}`)
          .setColor("#8945ff")
        
        m.edit(embed)
      })
    })
  }
}