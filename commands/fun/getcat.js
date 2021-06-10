const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: "getcat",
  execute(message) {
    const embed = new Discord.MessageEmbed()
        .setAuthor("Loading Cat")
        .setColor("#ffbafd")

    message.channel.Typing()
    message.channel.send(embed).then(m => {
      message.channel.Typing()
      
      fetch("https://aws.random.cat/meow").then(response => response.json()).then(json => {
        result = json.file
        const embed = new Discord.MessageEmbed()
          .setFooter("Images supplied by: aws.random.cat")
          .setImage(result)
          .setColor("#ffbafd")
          
        m.edit(embed)
      })    
    })
  }
}
