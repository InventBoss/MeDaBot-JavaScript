const Discord = require("discord.js")
const snoowrap = require("snoowrap")

const reddit = new snoowrap({
    userAgent: "Scraper",
    clientId: process.env["REDDIT_ID"],
    clientSecret: process.env["REDDIT_SECRET"],
    refreshToken: process.env["REDDIT_REFRESH_TOKEN"]
})

module.exports = {
    name: "wyr",
    aliases: ["wouldyourather"],
    execute(message, args ,text) {
        async function scrapeSubreddit() {
            const embed = new Discord.MessageEmbed()
                .setColor("#15ff00")
                .setDescription("**LOADING DECISION**")
            message.channel.send({embeds : [embed]}).then(async postMessage => {
                while (true) { 
                    try {
                        let post = await (await reddit.getSubreddit("wouldyourather").getRandomSubmission())
                        
                        if (post.over_18 && !message.channel.nsfw) {
                            continue
                        }

                        const pollOptions = await post.poll_data.options

                        let pollText = ""

                        for(let i = 0; i < pollOptions.length; i++) {
                            const percent = pollOptions[i].vote_count / post.poll_data.total_vote_count * 100
                            if (isNaN(percent)) {
                                throw "Error"
                            }
                            pollText += `> **${i + 1}. ${pollOptions[i].text}** - ${Math.round((percent + Number.EPSILON) * 100) / 100}%\n`
                        }

                        const embed = new Discord.MessageEmbed()
                            .setColor("#15ff00")
                            .setTitle(`${post.title.toUpperCase()}`)
                            .setDescription(pollText)
                        postMessage.edit({embeds : [embed]})

                        break
                    } catch (error) {
                        continue
                    }
                }
            })
        }
        scrapeSubreddit()
    }
}