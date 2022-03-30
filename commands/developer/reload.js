const commandExtra = require("../../extra/command");
const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs");

module.exports = {
    name: "reload",
    longDesc:
        "This command will reload any command specified in the second argument. Used to apply any changes in code.",
    slashData: new SlashCommandBuilder()
        .setName("reload")
        .setDescription("Reload a specific command")
        .addStringOption((option) =>
            option
                .setName("command")
                .setDescription("The command to reload")
                .setRequired(true)
        ),
    execute: async (isSlash, context, args) => {
        if (
            context.author?.id === "617816411750006794" ||
            context.user?.id === "617816411750006794"
        ) {
            let commandName;
            if (isSlash) {
                commandName = context.options.getString("command");
            } else {
                commandName = args[0].toLowerCase();
            }
            const command = context.client.textCommands.get(commandName);

            if (!command) {
                return commandExtra.sendMessage(
                    isSlash,
                    context,
                    `Could not find \`>${commandName}\``
                );
            }

            const commandFolders = fs.readdirSync("./commands");
            const folderName = commandFolders.find((folder) =>
                fs
                    .readdirSync(`./commands/${folder}`)
                    .includes(`${command.name}.js`)
            );

            delete require.cache[
                require.resolve(`../${folderName}/${command.name}.js`)
            ];

            try {
                const newCommand = require(`../${folderName}/${command.name}.js`);
                context.client.textCommands.set(newCommand.name, newCommand);
                commandExtra.sendMessage(isSlash, context, {
                    content: `Command \`${command.name}\` was reloaded`,
                });
            } catch (error) {
                console.log("(err) " + error);
                commandExtra.sendMessage(isSlash, context, {
                    content: `There was an error while reloading\`>${commandName}\``,
                });
            }
        } else {
            commandExtra.sendMessage(isSlash, context, {
                content: "You do not have permission to run that command!",
            });
        }
    },
};
