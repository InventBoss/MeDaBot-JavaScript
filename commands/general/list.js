const Discord = require("discord.js")

module.exports = {
  name: "list",
  aliases: ["help", "commands"],
  execute(message, args) {
    const embed = new Discord.MessageEmbed()
      .setColor("#ffd000")
      .setTitle("**Command Guide :book:**")

    if (!args.length) {
      embed.addField("General Commands", "> `>list general` to see all the general commands.")
      embed.addField("Fun Commands", "> `>list fun` to play with some unique commands I made.")
      embed.addField("Search Commands", "> `>list search` to starting searching things... within discord.")
      embed.addField("Reddit Commands", "> `>list reddit` to see what discord and reddit can do together.")
      embed.addField("Server Commands", "> `>list server` to see some useful tools for your moderators and admins.")
      
    } else if (args[0] === "general") {
      embed.addField("Ping", "> Shows you your ping...\n pretty self explanatory.")
      embed.addField("List\\Help", "> Shows you this window...\nyou probably know that.")
      embed.addField("8ball", "> The mysterious forces of the universe\n will answer your stupid question.")
      embed.addField("Rps", "> Play rock paper scissors with a bot!")
      embed.addField("Math", "> Allows you to do arithmetic operations... NERD!")
      embed.addField("Coinflip", "> Flip a coin and see what side it lands on.")
      embed.addField("Serverinfo", "> Get info about the server you're in.")
      embed.addField("About", "> Wanna learn about me? Great! Type this command.")
      embed.addField("Tools", "> Wanna learn about what I used? Great! Type this command.")

    } else if (args[0] === "fun") {
      embed.addField("Getcat", "> Shows you a precious little angel.")
      embed.addField("Getdog", "> Shows you a very good boi.")
      embed.addField("Roastme", "> Make YOU depressed.")
      embed.addField("Togray", "> Make your images depressed.")
      embed.addField("Tofry", "> Adds a little something to your images.")
      embed.addField("Toinvert", "> Turn any image you have into an alien artifact.")
      embed.addField("Getanimegirl", "> Fulfil a weebs dream with this. (DM only)")
      embed.addField("Inspireme", "> Get inspired... that's it.")
    
    } else if (args[0] === "search") {
      embed.addField("Urban", "> Finds the definition on the urban dictionary. (Answers are not always serious)")
      embed.addField("Wiki", "> Search for pages on wikipedia.")
      embed.addField("Search", "> Search for stuff on google.")

    } else if (args[0] === "server") {
      embed.addField("Clearmessage", "> Clear a specified amount of messages, default is 10.")
      embed.addField("Addemoji", "> Adds an emoji to the server more quickly?")

    } else if (args[0] === "reddit") {
      embed.addField("Meme", "> I will get a random dank meme from r/memes.")
      embed.addField("Postid", "> I will get the post from the specified id. (obtained from the post url)")
      embed.addField("Subrandom", "> I will get a random post from the specified subreddit.")
      embed.addField("Subtop", "> I will get the top post of the day from the specified subreddit.")
      embed.addField("Subhot", "> I will get the hotest post from the specified subreddit.")
      embed.addField("Sublatest", "> I will get the latest post from the specified subreddit.")
      embed.addField("Subcontroversial", "> I will get the most controversial post of the day from the                      specified subreddit.")
      embed.addField("Subsearch", "> I will search the specified subreddit for what you entered")

    } else {
      embed.addField("What Commands? :thinking:", "We don't know what commands you think exist. Read all the existant commands using `>list` or `>help`.")
    }
    
    message.channel.send(embed)
  }
}