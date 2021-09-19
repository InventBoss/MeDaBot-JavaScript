const Discord = require("discord.js")

module.exports = {
  name: "serverinfo",
  aliases: ["aboutserver"],
  execute(message) {
    if (!message.guild) return message.channel.send("Sorry but I can only do this command in servers.")

    var guildName = message.guild
    var totalMembers = message.guild.memberCount
    var owner = message.guild.owner.user
    
    const embed = new Discord.MessageEmbed()
      .setColor("#00d196")
      .setAuthor(`About ${guildName}`, message.guild.iconURL())
      .addField("Owner :crown:", `The owner is ${owner}`)
      .addField("Members :scroll:", `There are ${totalMembers} members`)
    
    message.channel.send({embeds : [embed]})
  }
}