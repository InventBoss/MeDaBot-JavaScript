const Discord = require("discord.js")
const fetch = import("node-fetch")

module.exports = {
  name: "getcat",
  aliases: ["cat"],
  execute(message) {
    const embed = new Discord.MessageEmbed()
        .setDescription("**LOADING CAT**")
        .setColor("#ffbafd")

    message.channel.send({embeds : [embed]}).then(m => {
      
      fetch("https://api.thecatapi.com/v1/images/search?api_key=5de82e74-44aa-4e27-b35a-73113343c57d").then(response => response.json()).then(json => {
        result = json[0].url
        const embed = new Discord.MessageEmbed()
          .setAuthor("Here's your floofy fella", "https://cdn.discordapp.com/avatars/763313827944202250/78dfd2ed2cfd80fb725aa10e5ddb053e.png?size=128")
          .setImage(result)
          .setColor("#ffbafd")
          
        m.edit({embeds : [embed]})
      })    
    })
  }
}
