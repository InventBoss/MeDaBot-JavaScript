const Discord = require("discord.js")
const fetch = require("node-fetch")
const querystring = require("querystring")

const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str)

module.exports = {
  name: "urban",
  execute(message, args, text) {
    const embed = new Discord.MessageEmbed()
        .setDescription("**LOADING DESCRIPTION**")
        .setColor("#002a61")

    message.channel.send(embed).then(m => {
      var query = querystring.stringify({ term: args.join(' ') })

      fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json()).then(json => {

          if (!json.list.length) {
            const embed = new Discord.MessageEmbed()
              .setAuthor(`No results found for "${text}"`)
              .setColor("#002a61")
            
            m.edit(embed)
          } else {
            try {
              const embed = new Discord.MessageEmbed()
                .setDescription(`**[${json.list[0].word.toUpperCase()}](${json.list[0].permalink})**`)
                .addField("Description", trim(json.list[0].definition.replace(/\[/g, "").replace(/\]/g, ""), 1024))
                .addField("Example", trim(json.list[0].example.replace(/\[/g, "").replace(/\]/g, ""), 1024))
                .setThumbnail(url="https://cdn.discordapp.com/attachments/836672279483252847/844867533290471424/unknown.png")
                .setColor("#002a61")

              m.edit(embed)
            } catch(error) {
              if (error instanceof RangeError) {
                const embed = new Discord.MessageEmbed()
                .setDescription(`**[${json.list[0].word.toUpperCase()}](${json.list[0].permalink})**`)
                .addField("Description", trim(json.list[0].definition.replace(/\[/g, "").replace(/\]/g, ""), 1024))
                .setThumbnail(url="https://cdn.discordapp.com/attachments/836672279483252847/844867533290471424/unknown.png")
                .setColor("#002a61")

                m.edit(embed)
              } else {
                const embed = new Discord.MessageEmbed()
                  .setAuthor(`An error occured while searching "${text}"`)
                  .setColor("#002a61")
                
                m.edit(embed)
                console.log("<Error>\n" + error)
              }
            }
          }
      })
    })
  }
}