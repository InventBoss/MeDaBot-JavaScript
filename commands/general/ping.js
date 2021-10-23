const Discord = require("discord.js")

module.exports = {
  name: "ping",
  execute(message) {
    const embed = new Discord.MessageEmbed()
      .setDescription("**PINGING...**", message.author.displayAvatarURL)
      .setColor("#6b03fc")

    message.channel.send({embeds : [embed]}).then(m =>{
      let ping = m.createdTimestamp - message.createdTimestamp
      const embed = new Discord.MessageEmbed()
        .setAuthor(`Your ping is ${message.client.ws.ping}ms`, message.author.displayAvatarURL())
        .setColor("#6b03fc")
        
      m.edit({embeds : [embed]})
    })
  }
}