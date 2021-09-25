const Jimp = require("jimp")
const fs = require("fs")
const path = require("path")
const { promisify } = require("util")

const sleep = promisify(setTimeout)

module.exports = {
  name: "togray",
  aliases: ["togrey"],
  execute(message) {
    var fileName = Math.random().toString(36).substring(5);
    try {
      var imageUrl = message.attachments.first().url
    } catch (error) {
      console.log("<Error>\n" + error)
      return
    }

    async function toGray() {
      try {
        Jimp.read(imageUrl)
        .then(image => {
          image
          .greyscale()
          .write(`./commands/fun/ImageStorage/${fileName}.png`)
          message.channel.send({
            files: [
              `./commands/fun/ImageStorage/${fileName}.png`
            ]
          })
        })
        await sleep(10000)
        fs.unlink(path.resolve(__dirname, `./ImageStorage/${fileName}.png`), (error) => {
          // I'm not gonna give you your power
        })
      } catch(error) {
        message.channel.send("There was an error while trying to convert the image")
      }
    }
    toGray()
  }
}