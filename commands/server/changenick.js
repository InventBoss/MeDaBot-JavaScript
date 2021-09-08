const Discord = require("discord.js")

module.exports = {
  name: "changenick",
  aliases: ["setnick"],
  execute(message, args, text) {
    if (!message.guild) return message.channel.send("Sorry but I can only do this command in servers.")

    if (message.member.hasPermission("MANAGE_NICKNAMES", { checkAdmin: true, checkOwner: true}) || message.author.id === 617816411750006794) {
      message.guild.me.setNickname(text)
      message.channel.send(`Changed nick to \`${text}\``)
    }
  }
}