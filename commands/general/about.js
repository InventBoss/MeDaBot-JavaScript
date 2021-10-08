const Discord = require("discord.js")

module.exports = {
  name: "about",
  aliases:["aboutmedabot"],
  execute(message) {
    const row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setLabel("Top.gg")
        .setStyle("LINK")
        .setURL("https://top.gg/bot/763313827944202250"),
      new Discord.MessageButton()
        .setLabel("Twitter")
        .setStyle("LINK")
        .setURL("https://twitter.com/Invent_Boss"),
      new Discord.MessageButton()
        .setLabel("Github")
        .setStyle("LINK")
        .setURL("https://github.com/InventBoss/MeDaBot-JavaScript"),
      new Discord.MessageButton()
        .setLabel("Invite")
        .setStyle("LINK")
        .setURL("https://discord.com/api/oauth2/authorize?client_id=763313827944202250&permissions=1073866944&scope=bot%20applications.commands")
    )

    const embed = new Discord.MessageEmbed()
      .setColor("#008080")
      .setTitle("**About MeDaBot :scroll:**")
      .addField("Description", "This is a discord bot created by InventBoss to advance his coding skills.")
      .addField("Creator", "InventBoss, the creator of MeDaBot, is a loser who co-owns [Nexus](https://discord.gg/YCK2TZbT69).\n\nYou can support him by giving him nitro via. [Nexus](https://discord.gg/YCK2TZbT69) or by donating to him on Hypixel Skyblock while he is online.")
    message.channel.send({embeds : [embed], components : [row]})
  }
}