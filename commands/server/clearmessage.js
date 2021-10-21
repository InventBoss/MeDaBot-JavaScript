const Discord = require("discord.js")

module.exports = {
  name: "clearmessage",
  execute(message, args) {
    if (!message.guild) return message.channel.send("Sorry but I can only do this command in servers.")

    if (message.member.permissions.has("MANAGE_MESSAGES", { checkAdmin: true, checkOwner: true}) || message.author.id === 617816411750006794) {
      if (typeof args[0] === "undefined")  {
        args[0] = 10
      }
      try {
        var convertedResult = parseInt(args[0])
        message.channel.bulkDelete(++convertedResult)
      } catch (error) {
        console.log("<Error>\n" + error)
      }
    }
  }
}