const Discord = require("discord.js")
const fetch = import("node-fetch")

module.exports = {
  name: "getdog",
  aliases: ["dog"],
  execute(message) {
    const embed = new Discord.MessageEmbed()
        .setDescription("**LOADING DOGGO**")
        .setColor("#34c4e0")

    message.channel.send({embeds : [embed]}).then(m => {
      
      fetch("https://dog.ceo/api/breeds/image/random").then(response => response.json()).then(json => {
        result = json.message
        const embed = new Discord.MessageEmbed()
          .setAuthor("Here's your good boi", "https://cdn.discordapp.com/avatars/763313827944202250/78dfd2ed2cfd80fb725aa10e5ddb053e.png?size=128")
          .setImage(result)
          .setColor("#34c4e0")
          
        m.edit({embeds : [embed]})
      })    
    })
  }
}