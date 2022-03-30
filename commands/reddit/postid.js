const Discord = require("discord.js");
const commandExtra = require("../../extra/command");
const { SlashCommandBuilder } = require("@discordjs/builders");
const reddit = require("../../reddit.js");
const fetch = require("node-fetch");

module.exports = {
    name: "postid",
    longDesc:
        "Have you wanted to share a post with your friends, but the default reddit embed is garbage? Well just grab the post id from the post url and put it in the command as the first argument. Embed designed by yours truly.",
    slashData: new SlashCommandBuilder()
        .setName("postid")
        .setDescription("Show a post from a postid found in the url")
        .addStringOption((option) =>
            option
                .setName("id")
                .setDescription("The id of said post.")
                .setRequired(true)
        ),
    execute: async (isSlash, context, args) => {
        const post = await reddit.getPostFromId(
            context.options?.getString("id") || args[0]
        );
        if (typeof post === "undefined")
            return commandExtra.sendMessage(isSlash, context, {
                content:
                    "Sorry, but there was an error while getting the post.",
            });
        const subreddit = await reddit.getSubreddit(post.subreddit);

        if (post.over_18 || (subreddit.over18 && !context.channel.nsfw)) {
            const embed = new Discord.MessageEmbed()
                .setColor("#ff4301")
                .setAuthor({
                    name: `r/${post.subreddit} | u/${post.author}`,
                    iconURL:
                        "https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_reddit-256.png",
                })
                .setTitle(post.title)
                .setURL(`https://www.reddit.com/comments/${post.id}`)
                .setDescription(
                    "**It appears that the post or the subreddit are NSFW. Please click on the post link to see this content.**"
                );
            postMessage.edit({ embeds: [embed] });
            return;
        }

        const embed = new Discord.MessageEmbed()
            .setColor("#ff4301")
            .setAuthor({
                name: `r/${post.subreddit} | u/${post.author}`,
                iconURL: subreddit.icon_img,
            })
            .setTitle(post.title)
            .setURL(`https://www.reddit.com/comments/${post.id}`)
            .setFooter({ text: `👍 ${post.ups} | 💬 ${post.num_comments}` });

        if (post.post_hint === "image") {
            embed.setImage(post.url);
        } else if (post.selftext !== "") {
            embed.setDescription(post.selftext);
        } else if (post.media !== null) {
            embed.setDescription(
                "**Sorry, it seems that this post contains a video.\n The Reddit commands on MeDaBot sadly do not have video support.\n\nFormats we support include: text, image, and gif.**"
            );
        }

        commandExtra.sendMessage(isSlash, context, { embeds: [embed] });
    },
};
