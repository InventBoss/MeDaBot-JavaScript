const Discord = require("discord.js")

module.exports = {
  name: "addemoji",
  execute(message, args) {
    if (!message.guild) return message.channel.send("Sorry but I can only do this command in servers.")

    if (message.member.permissions.has("MANAGE_EMOJIS", { checkAdmin: true, checkOwner: true}) || message.author.id === 617816411750006794) {
      if (typeof args[0] === "undefined")  {
        args[0] = "emoji"
      }
      try {
        const embed = new Discord.MessageEmbed()
          .setAuthor("ADDING EMOJI")
          .setColor("#fff700")

        message.channel.send({embeds : [embed]}).then(m => {
          const imageUrl = message.attachments.first().url
          const currentGuild = message.guild
        
          currentGuild.emojis.create(imageUrl, args[0])

          const embed = new Discord.MessageEmbed()
            .setTitle(`Added ${args[0]} to ${currentGuild}`)
            .setImage(imageUrl)
            .setColor("#fff700")
          m.edit({embeds : [embed]})

        })
      } catch (error) {
        console.log("<Error>\n" + error)
      }
    }
  }
}