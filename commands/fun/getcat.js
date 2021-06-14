const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: "getcat",
  aliases: ["cat"],
  execute(message) {
    const embed = new Discord.MessageEmbed()
        .setAuthor("**LOADING CAT**")
        .setColor("#ffbafd")

    message.channel.send(embed).then(m => {
      
      fetch("https://aws.random.cat/meow").then(response => response.json()).then(json => {
        result = json.file
        const embed = new Discord.MessageEmbed()
          .setAuthor("Here's your floofy fella", "https://cdn.discordapp.com/avatars/763313827944202250/78dfd2ed2cfd80fb725aa10e5ddb053e.png?size=128")
          .setImage(result)
          .setColor("#ffbafd")
          
        m.edit(embed)
      })    
    })
  }
}
