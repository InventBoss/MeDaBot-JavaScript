const Discord = require("discord.js")
const tf = require("@tensorflow/tfjs-node")
const cocoSsd = require("@tensorflow-models/coco-ssd")
const fs = require("fs").promises
const Jimp = require("jimp")

module.exports = {
	name: "chatai",
	execute(message, args) {
    if (!message.author.id === "617816411750006794") return

    var fileName = Math.random().toString(36).substring(5);
    try {
      var imageUrl = message.attachments.first().url
    } catch (error) {
      console.log("<Error>\n" + error)
      return
    }

    try {
      Jimp.read(imageUrl).then(image => {
        image.write(`./commands/fun/ImageStorage/${fileName}.png`)
      })

      // fs.unlink(path.resolve(__dirname, `./ImageStorage/${fileName}.png`), (error) => {
      //   // I'm not gonna give you your power
      // })

    } catch(error) {
      message.channel.send("There was an error while trying to save the image")
    }
	}
}