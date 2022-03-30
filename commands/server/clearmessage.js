const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    name: "clearmessage",
    longDesc: "Bulk delete a certain number messages. Put amount of messages to delete in first argument. Default is 10",
    slashData: new SlashCommandBuilder()
        .setName("clearmessage")
        .setDescription("Bulk delete a certain number messages.")
        .addIntegerOption((option) =>
            option
                .setName("amount")
                .setDescription("How many messages to delete. Default is 10")
                .setRequired(false)
        ),
    execute(isSlash, context, args) {
      if (!context.guild) return context.channel.send("Sorry but I can only do this command in servers.")
    
      let messageNumber = 10
      if (context.member.permissions.has("MANAGE_MESSAGES", { checkAdmin: true, checkOwner: true}) || (context?.author.id || context?.user.id) === 617816411750006794)
        if (!isSlash) {
            if (typeof args[0] !== "undefined")  {
                messageNumber = args[0]
            }
        } else {
            if (context.options.getInteger("amount") !== null)  {
                messageNumber = context.options.getInteger("amount")
            }
        }
        try {
          let convertedResult = parseInt(messageNumber)
          context.channel.bulkDelete(++convertedResult)
          if (isSlash) {
              context.reply({ content: `Deleted ${--convertedResult} messages`, ephemeral: "true"})
          }
        } catch (error) {
          console.log("<Error>\n" + error)
        }
    }
  }