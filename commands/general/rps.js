const Discord = require("discord.js")

module.exports = {
  name: "rps",
  aliases: ["rockpaperscissors"],
  execute(message, args) {
    let playerMove = args[0]
    let moves = ["rock", "paper", "scissors"]
    let botMove = moves[Math.floor(Math.random() * moves.length)]
    let winner = []
    let result = []

    switch (playerMove) {
      case "r":
        playerMove = "rock"
        break
      case "p":
        playerMove = "paper"
        break
      case "s":
        playerMove = "scissors"
        break
    }

    if (botMove === playerMove) {
      winner = 2
    } else if (botMove === "rock" && playerMove === "paper") {
      winner = 0
    } else if (botMove === "rock" && playerMove === "scissors") {
      winner = 1
    } else if (botMove === "paper" && playerMove === "rock") {
      winner = 1
    } else if (botMove === "paper" && playerMove === "scissors") {
      winner = 0
    } else if (botMove === "scissors" && playerMove === "paper") {
      winner = 1
    } else if (botMove === "scissors" && playerMove === "rock") {
      winner = 0
    } else {
      winner = 3
    }

    switch (winner) {
      case 0:
        result = "The player!"
        break
      case 1:
        result = "The bot!"
        break
      case 2:
        result = "No one... Its a tie!"
        break
      case 3:
        result = "An error occured."
        break
    }

    const embed = new Discord.MessageEmbed()
      .setColor("#ffa047")
      .setTitle("**Rock Paper Scissors** :chess_pawn:")
      .addField("**Player Move**", `> ${playerMove}`, true)
      .addField("**Bot Move**", `> ${botMove}`, true)
      .addField("And the Winner is... ", `> **${result}**`, false)
    
    message.channel.send({embeds : [embed]})
  }
}