const Discord = require("discord.js")

const reddit = "test"
const extension = [".jpg", ".png", ".svg", ".mp4", ".gif"];

module.exports = {
  name: "meme",
  aliases: ["memes"],
  execute(message) {

    async function scrapeSubreddit() {
      const embed = new Discord.MessageEmbed()
          .setColor("#ff4301")
          .setDescription("**LOADING MEME**")
      message.channel.send({embeds : [embed]}).then(async memeMessage => {

        const post = await reddit.getSubreddit("memes").getRandomSubmission()
        if (post.over_18 && !message.channel.nsfw) {
          const embed = new Discord.MessageEmbed()
            .setColor("#ff4301")
            .setDescription("**SORRY THIS POST IS NSFW**")
          memeMessage.edit({embeds : [embed]})
          return
        }

        const embed = new Discord.MessageEmbed()
          .setColor("#ff4301")
          .setDescription(`**[${post.title.toUpperCase()}]\(https://reddit.com/r/memes/comments/${post.id}/${post.title.replace(/ /g, "_").replace(/"/g, "").replace(/\*/g, "")})**`)
          .setFooter(`By u/${post.author.name} 👑\n💾  Post id: ${post.id} | 👍  Upvotes: ${post.ups}`)

        if (extension.includes(post.url.slice(-4))) {
          embed.setImage(post.url)
        } else {
          embed.setDescription(`**[${post.title.toUpperCase()}]\(https://reddit.com/r/memes/comments/${post.id}/${post.title.replace(/ /g, "_").replace(/"/g, "").replace(/\*/g, "")})**\n\n${post.selftext}`)
        }
        memeMessage.edit({embeds : [embed]})
      })
    }

    try {
      scrapeSubreddit()
    } catch (error) {
      console.log("<Error>\n" + error)
    }
  }
}