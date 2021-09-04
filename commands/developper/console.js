const Discord = require("discord.js")

module.exports = {
  name: "console",
  execute(message, args) {

    if (!message.author.id === "617816411750006794") return

    if (args[0] === "say" || args[0] === "speak") {
      if (!message.guild) return

      message.channel.bulkDelete(1).then(() => {
        var finalMessage = args.slice(1).join(" ")
        message.channel.startTyping()
        message.channel.send(finalMessage)
        message.channel.stopTyping()
      })

    } else if (args[0] === "remindaboutrewind") {
      var user = message.guild.members.cache.get(args[1])
      user.send("Hey there! Just a friendly reminder to dislike youtube rewind.\n\nI got the link right here for you:\n\nhttps://www.youtube.com/watch?v=YbJOTdZBX1g")
    
    } else if (args[0] === "auditlog") {
      message.guild.fetchAuditLogs({limit: 5}).then(async logs => {
        
        const entries = logs.entries.array()


        await console.log(entries[0])
        
      })

    } else if (args[0] === "dmuser") {

      var user = message.guild.members.cache.get(args[1])
      var timesRepeated = parseInt(args[2])
      timesRepeated = timesRepeated--
      var finalMessage = args.slice(3).join(" ")

      for (i = 0; i < timesRepeated; i++) {
        user.send(finalMessage)
      }

      message.channel.send(`${user.id} is being DM'ed`)
    } else if (args[0] === "uptime") {

      var totalSeconds = (message.client.uptime / 1000)
      var days = Math.floor(totalSeconds / 86400)
      totalSeconds %= 86400
      var hours = Math.floor(totalSeconds / 3600)
      totalSeconds %= 3600
      var minutes = Math.floor(totalSeconds / 60)
      var seconds = Math.floor(totalSeconds % 60)

      const embed = new Discord.MessageEmbed()
        .setTitle("**Uptime :alarm_clock:**")
        .setDescription(`**DAYS**: ${days}\n**HOURS**: ${hours}\n**MINUTES**: ${minutes}\n**SECONDS**: ${seconds}\n`)
        .setColor("#b5005b")
      message.channel.send(embed)
    
    } else if (args[0] === "help" || args[0] === "list") {

      const embed = new Discord.MessageEmbed()
        .setTitle("**Console Commands :keyboard:**")
        .addField("Say", "> I will say whatever you specify.")
        .addField("Dmuser", "> Allows you to send whatever you want to anybody.")
        .addField("Uptime", "> You will see how long I have been up for.")
        .addField("List", "> Reminds you about the stuff you can do master.")
        .addField("Remindaboutrewind", "> Reminds a specified user about something that can help society.")
        .setColor("#68fc8a")
      message.channel.send(embed)
    } 
  }
}