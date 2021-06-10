const Discord = require("discord.js")

module.exports = {
  name: "rps",
  aliases: ["rockpaperscissors"],
  execute(message, args) {
    var playerMove = args[0]
    var moves = ["rock", "paper", "scissors"]
    var botMove = moves[Math.floor(Math.random() * moves.length)]
    var winner = []
    var result = []

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
        result = "Player wins!"
        break
      case 1:
        result = "Bot wins!"
        break
      case 2:
        result = "Its a tie!"
        break
      case 3:
        result = "An error occured."
        break
    }

    const embed = new Discord.MessageEmbed()
      .setColor("#ffa047")
      .setTitle("**Rock Paper Scissors** :fist::raised_hand::v:")
      .addField("Moves :chess_pawn:", `:robot: Bot: ${botMove}\n:face_with_monocle: Player: ${playerMove}`, true)
      .addField("Winner :tada:", `**${result}**`, true)
    
    message.channel.send(embed)
  }
}