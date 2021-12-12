const fs = require("fs")

module.exports = {
	name: "reload",
  aliases: ["restart"],
	execute(message, args) {
    if (message.author.id === "617816411750006794") {
      const commandName = args[0].toLowerCase()
      const command = message.client.commands.get(commandName)
        || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

      if (!command) {
        return message.channel.send(`Could not find \`>${commandName}\``)
      }

      const commandFolders = fs.readdirSync("./commands")
      const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${command.name}.js`))

      delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)]

      try {
        const newCommand = require(`../${folderName}/${command.name}.js`)
        message.client.commands.set(newCommand.name, newCommand)
        message.channel.send(`Command \`>${command.name}\` was reloaded`)
      } catch (error) {
        console.log("<Error>\n" + error)
        message.channel.send(`There was an error while reloading\`>${args[0]}\``)
      }
    } else {
      message.channel.send("You do not have permission to run that command!")
    }
	}
}