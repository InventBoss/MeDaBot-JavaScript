/*     } else if (args[0] === "changenick") {
      const chosenNick = args.slice(1).join(" ")
      message.guild.me.setNickname(chosenNick)
      message.channel.send(`Changed nick to \`${chosenNick}\``)
*/

const Discord = require("discord.js")

module.exports = {
  name: "changenick",
  aliases: ["setnick"],
  execute(message, args, text) {
    if (!message.guild) return

    if (message.member.hasPermission("MANAGE_NICKNAMES", { checkAdmin: true, checkOwner: true}) || message.author.id === 617816411750006794) {
      message.guild.me.setNickname(text)
      message.channel.send(`Changed nick to \`${text}\``)
    }
  }
}