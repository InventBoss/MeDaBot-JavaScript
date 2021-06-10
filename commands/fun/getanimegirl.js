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

/* So, you may be wondering why this command exists. Well, I am not a weeb, one of my friends are. And I made this command  for them (and for a crappy hypixel skyblock reward). Now, this command was the biggest mistake of MeDaBot, simply because  of the random library I used actually displayed NSFW content, so I had to restrict it to DM's only. But my discord server members started having NSFW speedruns on the bot. And here we are. */