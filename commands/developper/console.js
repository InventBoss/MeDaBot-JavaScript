const Discord = require("discord.js")

const permissionList = new Array(
  "CREATE_INSTANT_INVITE",
  "KICK_MEMBERS",
  "BAN_MEMBERS",
  "ADMINISTRATOR",
  "MANAGE_CHANNELS",
  "MANAGE_GUILD",
  "ADD_REACTIONS",
  "VIEW_AUDIT_LOG",
  "PRIORITY_SPEAKER",
  "STREAM",
  "VIEW_CHANNEL",
  "SEND_MESSAGES",
  "SEND_TTS_MESSAGES",
  "MANAGE_MESSAGES",
  "EMBED_LINKS",
  "ATTACH_FILES",
  "READ_MESSAGE_HISTORY",
  "MENTION_EVERYONE",
  "USE_EXTERNAL_EMOJIS",
  "VIEW_GUILD_INSIGHTS",
  "CONNECT",
  "SPEAK",
  "MUTE_MEMBERS",
  "DEAFEN_MEMBERS",
  "MOVE_MEMBERS",
  "USE_VAD",
  "CHANGE_NICKNAME",
  "MANAGE_NICKNAMES",
  "MANAGE_ROLES",
  "MANAGE_WEBHOOKS",
  "MANAGE_EMOJIS_AND_STICKERS",
  "USE_APPLICATION_COMMANDS",
  "REQUEST_TO_SPEAK",
  "MANAGE_THREADS",
  "USE_PUBLIC_THREADS",
  "USE_PRIVATE_THREADS",
  "USE_EXTERNAL_STICKERS"
)

module.exports = {
  name: "console",
  execute(message, args) {

    if (!message.author.id === "617816411750006794") return

    if (args[0] === "say" || args[0] === "speak") {
      if (!message.guild) return message.channel.send("Sorry but I can only do this command in servers.")

      message.channel.bulkDelete(1).then(() => {
        var finalMessage = args.slice(1).join(" ")
        message.channel.startTyping()
        message.channel.send(finalMessage)
        message.channel.stopTyping()
      })
    
    } else if (args[0] === "permissions") {
      let obtainedPermissions = ""

      for (let i = 0; i < permissionList.length; i++) {
        if (message.guild.me.permissions.has([permissionList[i]])) {
          obtainedPermissions += permissionList[i] + "\n"
        }
      }

      const embed = new Discord.MessageEmbed()
        .setTitle("Bot Permissions")
        .setDescription(obtainedPermissions)
        .setColor("#ff8000")
      message.channel.send({embeds : [embed]})
    
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
      message.channel.send({embeds : [embed]})
    
    } else if (args[0] === "help" || args[0] === "list") {

      const embed = new Discord.MessageEmbed()
        .setTitle("**Console Commands :keyboard:**")
        .addField("Say", "> I will say whatever you specify.")
        .addField("Dmuser", "> Allows you to send whatever you want to anybody.")
        .addField("Uptime", "> You will see how long I have been up for.")
        .addField("List", "> Reminds you about the stuff you can do master.")
        .addField("Remindaboutrewind", "> Reminds a specified user about something that can help society.")
        .setColor("#68fc8a")
      message.channel.send({embeds : [embed]})
    } 
  }
}