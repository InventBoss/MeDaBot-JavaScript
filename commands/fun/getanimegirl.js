const Discord = require("discord.js")
const randomanime = require("random-anime")

module.exports = {
  name: "getanimegirl",
  execute(message) {
    if (message.guild) return

    var bonkChance = Math.round(Math.random() * (25 - 1) + 1)
    if (bonkChance === 12) {
      message.channel.send("https://cdn.discordapp.com/attachments/763337340226895874/837081115369537576/unknown.png")
      return
    }
    const anime = randomanime.anime()
    message.channel.send(anime)
  }
}