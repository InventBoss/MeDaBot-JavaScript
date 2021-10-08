const Discord = require("discord.js")

module.exports = {
  name: "8ball",
  execute(message, text) {
    var choiceType = Math.floor(Math.random() * (3 - 1)) + 1
    if (choiceType === 1) {
      var answers = ["As I see it, yes",
                      "It is certain",
                      "It is decidedly so",
                      "Most likely",
                      "Outlook good",
                      "Signs point to yes",
                      "Without a doubt",
                      "Yes",
                      "Yes – definitely"]
    } else if (choiceType === 2) {
      var answers = ["Don’t count on it",
                    "My reply is no",
                    "My sources say no",
                    "Outlook not so good",
                    "Very doubtful"]
    } else {
      var answers = ["Ask again later",
                    "Better not tell you now",
                    "Cannot predict now",
                    "Concentrate and ask again",
                    "Reply hazy, try again"]
    }
    var chosenAnswer = answers[Math.floor(Math.random() * answers.length)]

    const embed = new Discord.MessageEmbed()
      .setColor("#2e2a9c")
      .setTitle("**8ball :8ball:**")
    embed.addField("**Question**", `> _${text.toString().replace(/,/g, " ")}_`)
    embed.addField("**Answer**", `> **${chosenAnswer}**`)

    message.channel.send({embeds : [embed]})
  }
}