const Discord = require("discord.js")

module.exports = {
  name: "tools",
  execute(message) {
    const embed = new Discord.MessageEmbed()
      .setColor("#03fccf")
      .setTitle("**Exernal Tools :wrench:**")
      .addField("**LIBRARIES**", "Discord.js Library - [Github Page](https://github.com/discordjs/discord.js/)\nFs Library - [Github Page](https://github.com/nodejs/node/blob/master/doc/api/fs.md)\n Snoowrap Library - [Github Page](https://github.com/not-an-aardvark/snoowrap)\n Random-Anime Library - [Github Page](https://github.com/amistaa/random-anime#readme)\n Node-Fetch Library - [Github Page](https://github.com/node-fetch/node-fetch)\n Jimp Library - [Github Page](https://github.com/oliver-moran/jimp)\n Util Library - [Github Page](https://github.com/browserify/node-util)\n Querystring Library - [Github Page](https://github.com/Gozala/querystring)")
      .addField("**APIS**", "Random Cat Api - [Api Website](https://aws.random.cat)\n Dog Api - [Api Website](https://dog.ceo/dog-api/)\n Zen Quotes Api - [Api Website](https://zenquotes.io/api)\n Evil Insult Generator Api - [Api Website](https://evilinsult.com)\n Url Shortener Api - [Api Website](https://cleanuri.com/)\n Trivia Api - [Api Website](https://opentdb.com/)")
      .addField("LANGUAGE", "Node.js Language - [Language Website](https://nodejs.org/)")
    message.channel.send(embed)
  }
}