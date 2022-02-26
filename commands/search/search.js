const Discord = require("discord.js")
const fetch = import("node-fetch")

const searchEngineId =  process.env["SEARCH_ENGINE_ID"]
const apiKey =  process.env["API_KEY"]

module.exports = {
  name: "search",
  execute(message, args, text) {

    fetch(`https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${text}`).then(response => response.json()).then(json => {
      message.channel.send(json.items[0].link)
    })  
  }
}
