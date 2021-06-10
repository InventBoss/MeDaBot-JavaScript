const Discord = require("discord.js")

module.exports = {
  name: "tictactoe",
  execute(message) {

    //declaring some variables
    var gameWindow = (["", "", "", "", "", "", "", "", ""])
    var running = true
    const settingUpBoardEmbed = new Discord.MessageEmbed()
        .setTitle("Setting up the board")
        .setColor("#6331a8")

    var gameMessage = message.channel.send(settingUpBoardEmbed).then( async gameMessage => {
      // setting up reactions and stuff
      const mainEmbed = new Discord.MessageEmbed()
        .setTitle("Tic Tac Toe :ping_pong:")
        .setColor("#6331a8")
      await gameMessage.edit(mainEmbed)
    })

    async function createMessageCollector() {
      const filter = m => m.content.includes('discord');
      const collector = message.channel.createMessageCollector(filter, { time: 15000 });

      collector.on('collect', m => {
        if (m.author.id !== message.author.id) {
          console.log("test")
        } else {
          console.log("badtest")
        }
      })
    }

    while (running) {
      createMessageCollector()
      running = false
    }
  }
}