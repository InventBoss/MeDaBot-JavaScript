const Discord = require("discord.js")
const fetch = require("node-fetch")

const buttonArray = new Array("button1", "button2", "button3", "button4")

const htmlUnescapes = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": "\"",
  "&#39;": "'"
}

const reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g
const reHasEscapedHtml = RegExp(reEscapedHtml.source)

function unescape(string) {
  return (string && reHasEscapedHtml.test(string))
    ? string.replace(reEscapedHtml, (entity) => htmlUnescapes[entity])
    : string
}

module.exports = {
  name: "trivia",
  execute(message) {
    const embed = new Discord.MessageEmbed()
        .setDescription("**LOADING TRIVIA**")
        .setColor("#e1ff00")

    message.channel.send({embeds : [embed]}).then(m => {
      
      fetch("https://opentdb.com/api.php?amount=4&type=multiple").then(response => response.json()).then(async json => {
        
        const row = new Discord.MessageActionRow().addComponents(
          new Discord.MessageButton()
            .setCustomId("button1")
              .setLabel("1")
              .setStyle("SUCCESS"),
          new Discord.MessageButton()
            .setCustomId("button2") 
            .setLabel("2")
            .setStyle("SUCCESS"),
          new Discord.MessageButton()
            .setCustomId("button3") 
            .setLabel("3")
            .setStyle("SUCCESS"),
          new Discord.MessageButton()
            .setCustomId("button4")
            .setLabel("4")
            .setStyle("SUCCESS")
        )

        result = json.results[0]

        let optionsArray = new Array(result.incorrect_answers[0], result.incorrect_answers[1],
         result.incorrect_answers[2], result.correct_answer)

        optionsArray.sort()

        const embed = new Discord.MessageEmbed()
          .setTitle("**Trivia** :question:")
          .setDescription(`**${unescape(result.question)}**\n\n1. ${unescape(optionsArray[0])}\n2. ${unescape(optionsArray[1])}\n3. ${unescape(optionsArray[2])}\n4. ${unescape(optionsArray[3])}`)
          .setFooter(`CATEGORY: ${result.category} | DIFFICULTY: ${result.difficulty}`)
          .setColor("#e1ff00")

        m.edit({embeds : [embed], components: [row]})

        const filter = (interaction) => {
          if (interaction.user.id === message.author.id) return true
          return false
        }
  
        const collector = m.createMessageComponentCollector({filter, time: 10000})
        
        collector.on('collect', async interaction => {
          await interaction.deferUpdate()
        })
        
        collector.on("end", collected => {
          const collectedArray = Array.from(collected)
          if (collected.size === 0) {
            const embed = new Discord.MessageEmbed()
              .setTitle("**Trivia** :question:")
              .setDescription(`**You ran out of time to answer the question.**\n\nThe answer is\n> *${unescape(result.correct_answer)}*`)
              .setColor("#e1ff00")

            m.edit({embeds : [embed]})
          } else {
            for (let i = 0; i < 4; i++) {
              if (optionsArray[i] === result.correct_answer) {
                const chosenEmoji = buttonArray[i]
                if (collectedArray[collected.size - 1][1].customId !== chosenEmoji) {
                  const embed = new Discord.MessageEmbed()
                    .setTitle("**Trivia** :question:")
                    .setDescription(`**Sorry!**\n\nThe answer is\n> *${unescape(result.correct_answer)}*`)
                    .setColor("#e1ff00")

                  m.edit({embeds : [embed]})
                } else {
                  const embed = new Discord.MessageEmbed()
                    .setTitle("**Trivia** :question:")
                    .setDescription(`**You are correct!**\n\nThe answer is\n> *${unescape(result.correct_answer)}*`)
                    .setColor("#e1ff00")

                  m.edit({embeds : [embed]})
                }
              }
            }
          }
        })
      })    
    })
  }
}