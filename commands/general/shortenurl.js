const Discord = require("discord.js")
const fetch = require('node-fetch')

module.exports = {
  name: "shortenurl",
  execute(message, args, text) {
    const embed = new Discord.MessageEmbed()
        .setDescription("**LOADING URL**")
        .setColor("#636363")

    message.channel.send({embeds : [embed]}).then(m => {
      const params = new URLSearchParams()
      params.append("url", text)
      fetch(`https://cleanuri.com/api/v1/shorten`, {method: "post", body: params}).then(response => response.json()).then(json => {
        result = json.result_url
        const embed = new Discord.MessageEmbed()
          .setDescription(`> Here is your link \`${result}\``)
          .setColor("#636363")
          
        m.edit({embeds : [embed]})
      })    
    })    
  }
}