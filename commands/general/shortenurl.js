const Discord = require("discord.js")
const fetch = require('node-fetch')

module.exports = {
  name: "shortenurl",
  execute(message, args, text) {
    const embed = new Discord.MessageEmbed()
        .setDescription("**LOADING URL**")
        .setColor("#636363")
    
    message.channel.send({embeds : [embed]}).then(m => {

      const headers = {
        'Authorization': `Bearer ${process.env["BITLY_TOKEN"]}`,
        'Content-Type': 'application/json'
      };

      let dataString = `{ "long_url": ${args}, "domain": "bit.ly", "group_guid": "Ba1bc23dE4F" }`

      fetch("https://api-ssl.bitly.com/v4/shorten", {method: "post", headers: headers,  body: dataString}).then(response => response.json()).then(json => {
        result = json.result_url
        console.log(result)
        const embed = new Discord.MessageEmbed()
          .setDescription(`> Here is your link \`${result}\``)
          .setColor("#636363")
          
        m.edit({embeds : [embed]})
      })    
    })    
  }
}