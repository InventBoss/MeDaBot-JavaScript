const Discord = require("discord.js")

module.exports = {
  name: "coinflip",
  aliases: ["flipacoin"],
  execute(message) {
    var faces = [" heads", " tails"]
    var chosenFace = faces[Math.floor(Math.random() * faces.length)]
    var sideChance = Math.round(Math.random() * (69 - 1) + 1)

    if (sideChance === 42)
      chosenFace = "... its side?!"
    
    const embed = new Discord.MessageEmbed()
      .setColor("#0c8514")
      .setTitle("**Coin Flip** :coin:")
      .setDescription(`It landed on${chosenFace}`)
    message.channel.send({embeds : [embed]})     
  }
}