const Discord = require("discord.js")
const fetch = require("node-fetch")

const emojiArray = new Array("1️⃣", "2️⃣", "3️⃣", "4️⃣")

const htmlUnescapes = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'"
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

    message.channel.send(embed).then(m => {
      
      fetch("https://opentdb.com/api.php?amount=4&type=multiple").then(response => response.json()).then(async json => {
        
        await m.react("1️⃣")
        await m.react("2️⃣")
        await m.react("3️⃣")
        await m.react("4️⃣")

        result = json.results[0]

        let optionsArray = new Array(result.incorrect_answers[0], result.incorrect_answers[1],
         result.incorrect_answers[2], result.correct_answer)

        optionsArray.sort()

        const embed = new Discord.MessageEmbed()
          .setTitle("**Trivia** :question:")
          .setDescription(`**${unescape(result.question)}**\n\n1. ${unescape(optionsArray[0])}\n2. ${unescape(optionsArray[1])}\n3. ${unescape(optionsArray[2])}\n4. ${unescape(optionsArray[3])}`)
          .setFooter(`CATEGORY: ${result.category} | DIFFICULTY: ${result.difficulty}`)
          .setColor("#e1ff00")

        m.edit(embed)

        const filter = (reaction, user) => reaction.emoji.name === "1️⃣" || reaction.emoji.name === "2️⃣" || reaction.emoji.name === "3️⃣" || reaction.emoji.name === "4️⃣" && user.id === message.author.id

        m.awaitReactions(filter, { time: 15000 }).then(collected => {
          if (collected.size === 0) {
            const embed = new Discord.MessageEmbed()
              .setTitle("**Trivia** :question:")
              .setDescription(`**You ran out of time to answer the question.**\n\nThe answer is\n> *${unescape(result.correct_answer)}*`)
              .setColor("#e1ff00")

            m.edit(embed)
          } if (collected.size > 1) {
            const embed = new Discord.MessageEmbed()
              .setTitle("**Trivia** :question:")
              .setDescription(`**You chose too many answers.**\n\nThe answer is\n> *${unescape(result.correct_answer)}*`)
              .setColor("#e1ff00")

            m.edit(embed)
          } else {
            for (let i = 0; i < 4; i++) {
              if (optionsArray[i] === result.correct_answer) {
                const chosenEmoji = emojiArray[i]
                if (collected.get(chosenEmoji) == null) {
                  const embed = new Discord.MessageEmbed()
                    .setTitle("**Trivia** :question:")
                    .setDescription(`**Sorry!**\n\nThe answer is\n> *${unescape(result.correct_answer)}*`)
                    .setColor("#e1ff00")

                  m.edit(embed)
                } else {
                  const embed = new Discord.MessageEmbed()
                    .setTitle("**Trivia** :question:")
                    .setDescription(`**You are correct!**\n\nThe answer is\n> *${unescape(result.correct_answer)}*`)
                    .setColor("#e1ff00")

                  m.edit(embed)
                }
              }
            }
          }
        }).catch(console.error)
      })    
    })
  }
}