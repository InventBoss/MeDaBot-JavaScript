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
  name: "postid",
  aliases: ["getpostid"],
  execute(message, args) {

    async function scrapeSubreddit() {
      const embed = new Discord.MessageEmbed()
          .setColor("#ff4301")
          .setDescription("**LOADING POST**")
      message.channel.send({embeds : [embed]}).then(async postMessage => {
        
        let post = await reddit.getSubmission(args[0])
        if (await post.over_18 && !message.channel.nsfw) {
          const embed = new Discord.MessageEmbed()
            .setColor("#ff4301")
            .setDescription("**SORRY THIS POST IS NSFW**")
          postMessage.edit({embeds : [embed]})
          return
        }

        let postTitle = `${await post.title}`

        const embed = new Discord.MessageEmbed()
          .setColor("#ff4301")
          .setDescription(`**[${postTitle.toUpperCase()}]\(https://reddit.com/r/memes/comments/${await post.id}/${await postTitle.replace(/ /g, "_").replace(/"/g, "").replace(/\*/g, "")})**`)
          .setFooter(`By u/${await post.author.name} 👑\n💾  Post id: ${await post.id} | 👍  Upvotes: ${await post.ups}`)

        if (extension.includes(await post.url.slice(-4))) {
          embed.setImage(await post.url)
        } else {
          embed.setDescription(`**[${await postTitle.toUpperCase()}]\(https://reddit.com/r/memes/comments/${await post.id}/${await postTitle.replace(/ /g, "_").replace(/"/g, "").replace(/\*/g, "")})**\n\n${await post.selftext}`)
        }

        postMessage.edit({embeds : [embed]})
      })
    }

    try {
      scrapeSubreddit()
    } catch (error) {
      console.log("<Error>\n" + error)
    }
  }
}