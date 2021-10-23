const Discord = require("discord.js")
const fetch = require("node-fetch")
const querystring = require("querystring")

const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}` : str)

module.exports = {
  name: "wiki",
  aliases: ["wikipedia"],
  execute(message, args,  text) {
    const embed = new Discord.MessageEmbed()
        .setDescription("**LOADING WIKI**")
        .setColor("#f7f7f7")

    message.channel.send({embeds : [embed]}).then(m => {
      let query = querystring.stringify({ term: args.join(' ') })

      fetch(`http://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json`).then(response => response.json()).then(json => {
        const embed = new Discord.MessageEmbed()
          .setDescription(`**[${json.query.search[0].title.toUpperCase()}](${`https://en.wikipedia.org/?curid=${json.query.search[0].pageid}`})**`)
          .addField("Description", trim(json.query.search[0].snippet.replace(/<[^>]*>?/gm, '').replace(/&quot;/g, "\""), 150) + ` [**Read More...**](${`https://en.wikipedia.org/?curid=${json.query.search[0].pageid}`})`)
          .setThumbnail("https://cdn.discordapp.com/attachments/836672279483252847/844892015073820692/unknown.png")
          .setColor("#f7f7f7")

        m.edit({embeds : [embed]})
      })   
    })
  }
}