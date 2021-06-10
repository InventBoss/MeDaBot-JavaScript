const Discord = require("discord.js")

module.exports = {
  name: "about",
  aliases:["aboutmedabot"],
  execute(message) {
    const embed = new Discord.MessageEmbed()
      .setColor("#008080")
      .setTitle("**About MeDaBot :scroll:**")
      .addField("Description", "This is a discord bot created by InventBoss to advance his coding skills.")
      .addField("Creator", "InventBoss, the creator of MeDaBot, is a loser who co-owns [Nexus](https://discord.gg/YCK2TZbT69).\n\nYou can support him by giving him nitro via. [Nexus](https://discord.gg/YCK2TZbT69) or by donating to him on Hypixel Skyblock while he is online.")
    message.channel.send(embed)
  }
}