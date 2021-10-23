const Discord = require("discord.js")

module.exports = {
  name: "math",
  aliases: ["calculate"],
  execute(message, args) {
    let regEx = /([-+]?[0-9]*\.?[0-9]+[\/\+\-\*])+([-+]?[0-9]*\.?[0-9]+)/g;

    try {
      let input = args[0]
      if (regEx.test(input)) {
        result = eval(input)
        const embed = new Discord.MessageEmbed()
          .setColor("#9c2c00")
          .setTitle("**Math :pencil2:**")
          .addField("Equation", input)
          .addField("Result", `**${result}**`)

        message.channel.send({embeds : [embed]})
      } else {
        const embed = new Discord.MessageEmbed()
          .setColor("#9c2c00")
          .setTitle("**Math :pencil2:**")
          .setDescription(`An error occured while calculating \`${input}\``)

        message.channel.send({embeds : [embed]})
      }
    } catch (error) {
      console.log(error)
      const embed = new Discord.MessageEmbed()
        .setColor("#9c2c00")
        .setTitle("**Math :pencil2:**")
        .setDescription(`An error occured while calculating \`${input}\``)

      message.channel.send({embeds : [embed]})
      return
    }
  }
}