const Discord = require("discord.js")
const snoowrap = require("snoowrap")

const reddit = new snoowrap({
    userAgent: "Scraper",
    clientId: process.env["REDDIT_ID"],
    clientSecret: process.env["REDDIT_SECRET"],
    refreshToken: process.env["REDDIT_REFRESH_TOKEN"]
  })
const extension = [".jpg", ".png", ".svg", ".mp4", ".gif"];

module.exports = {
  name: "subsearch",
  execute(message, args, text) {

    async function scrapeSubreddit() {
      const embed = new Discord.MessageEmbed()
          .setColor("#ff4301")
          .setDescription("**LOADING POST**")
      message.channel.send({embeds : [embed]}).then(async postMessage => {

        var query = args.slice(1).join(" ")

        const posts = await reddit.getSubreddit(args[0]).search({query: query, time: "all", limit: 0, sort: "top"})
        if (post.over_18) {
          const embed = new Discord.MessageEmbed()
            .setColor("#ff4301")
            .setDescription("**SORRY THIS POST IS NSFW**")
          postMessage.edit({embeds : [embed]})
          return
        }

        posts.forEach((post) => {
          const embed = new Discord.MessageEmbed()
            .setColor("#ff4301")
            .setDescription(`**[${post.title.toUpperCase()}]\(https://reddit.com/r/memes/comments/${post.id}/${post.title.replace(/ /g, "_").replace(/"/g, "").replace(/\*/g, "")})**`)
            .setImage(post.url)
            .setFooter(`By u/${post.author.name} 👑\n💾  Post id: ${post.id} | 👍  Upvotes: ${post.ups}`)

          if (extension.includes(post.url.slice(-4))) {
            embed.setImage(post.url)
          } else {
            embed.setDescription(`**[${post.title.toUpperCase()}]\(https://reddit.com/r/memes/comments/${post.id}/${post.title.replace(/ /g, "_").replace(/"/g, "").replace(/\*/g, "")})**\n\n${post.selftext}`)
          }
          
          postMessage.edit({embeds : [embed]})
        })
      })
    }

    try {
      scrapeSubreddit()
    } catch (error) {
      console.log("<Error>\n" + error)
    }
  }
}