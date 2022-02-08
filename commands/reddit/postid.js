const Discord = require("discord.js")
const reddit = require("../../reddit.js")

module.exports = {
  name: "postid",
  aliases: ["getpostid"],
  async execute(message, args) {
    const embed = new Discord.MessageEmbed()
      .setColor("#ff4301")
      .setAuthor({ name: "r/loading | u/loading", iconURL: "https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_reddit-256.png"})
      .setDescription("**LOADING POST**")
    message.channel.send({ embeds : [embed] }).then(async postMessage => {
      const post = await reddit.getPostFromId(args[0])
      const subreddit = await reddit.getSubreddit(post.subreddit)
      
      if (post.over_18 || subreddit.over18 && !message.channel.nsfw) {
        const embed = new Discord.MessageEmbed()
          .setColor("#ff4301")
          .setAuthor({ name: `r/${post.subreddit} | u/${post.author}`, iconURL: "https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_reddit-256.png"})
          .setTitle(post.title)
          .setURL(`https://www.reddit.com/comments/${post.id}`)
          .setDescription("**It appears that the post or the subreddit are NSFW. Please click on the post link to see this content.**")
        postMessage.edit({ embeds: [embed]})
        return
      }

      const embed = new Discord.MessageEmbed()
          .setColor("#ff4301")
          .setAuthor({ name: `r/${post.subreddit} | u/${post.author}`, iconURL: subreddit.icon_img})
          .setTitle(post.title)
          .setURL(`https://www.reddit.com/comments/${post.id}`)
          .setFooter({ text: `👍 ${post.ups} | 💬 ${post.num_comments}`})

      if (post.post_hint === "image") {
        embed.setImage(post.url)
      } else if (post.selftext !== "") {
        embed.setDescription(post.selftext)
      } else if (post.media !== null) {
        embed.setDescription("**Sorry, it seems that this post contains a video.\n The Reddit commands on MeDaBot sadly do not have video support.\n\nFormats we support include: text, image, and gif.**")
      } 

      postMessage.edit({ embeds: [embed]})
    })
  }
}