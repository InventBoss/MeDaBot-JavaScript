const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: "getdog",
  execute(message) {
    const embed = new Discord.MessageEmbed()
        .setAuthor("Loading Doggo")
        .setColor("#34c4e0")

    message.channel.send(embed).then(m => {
      
      fetch("https://dog.ceo/api/breeds/image/random").then(response => response.json()).then(json => {
        result = json.message
        const embed = new Discord.MessageEmbed()
          .setFooter("Images supplied by: dog.ceo")
          .setImage(result)
          .setColor("#34c4e0")
          
        m.edit(embed)
      })    
    })
  }
}