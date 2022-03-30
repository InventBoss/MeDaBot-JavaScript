const Discord = require("discord.js");
const commandExtra = require("../../extra/command");
const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs");

module.exports = {
    name: "help",
    longDesc:
        "Are you dumb? Do you not understand intuitive features of me? Introducing the help command! Just type the help command, and everything else will be explained.",
    slashData: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Answer your dumb questions here!")
        .addSubcommand((subcommand) =>
            subcommand.setName("homepage").setDescription("Where it all starts")
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("command")
                .setDescription("See info on a specific command")
                .addStringOption((option) =>
                    option
                        .setName("name")
                        .setDescription("Chosen command")
                        .setRequired(true)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("category")
                .setDescription(
                    "Choose a section of commands to see info about"
                )
                .addStringOption((option) =>
                    option
                        .setName("category")
                        .setDescription("Choose you category")
                        .setRequired(true)
                        .addChoice("General", "general")
                        .addChoice("Fun", "fun")
                        .addChoice("Reddit", "reddit")
                        .addChoice("Server", "server")
                )
        ),
    execute(isSlash, context, args) {
        // 0 is category, 1 is command, and 2 is main
        let subcommand;
        if (isSlash) {
            if (context.options.getSubcommand() == "category") {
                subcommand = 0;
            } else if (context.options.getSubcommand() == "command") {
                subcommand = 1;
            } else if (context.options.getSubcommand() == "homepage") {
                subcommand = 2;
            }
        } else {
            if (args[0] === "category") {
                subcommand = 0;
            } else if (args[0] === "command") {
                subcommand = 1;
            } else if (!args.length) {
                subcommand = 2;
            }
        }

        // Where all the actual code is remember Invent!
        if (subcommand === 0) {
            let inputName = context.options?.getString("category") || args[1];
            if (!isSlash && typeof args[1] === "undefined") {
                const embed = new Discord.MessageEmbed()
                    .setColor("#399305")
                    .setTitle("**I'm so sorry**")
                    .setDescription(
                        "I don't know what fictional category you think exists."
                    );

                return commandExtra.sendMessage(isSlash, context, {
                    embeds: [embed],
                });
            }

            let fileNames = "";

            try {
                const commandFiles = fs
                    .readdirSync(`./commands/${inputName}`)
                    .filter((file) => file.endsWith(".js"));
                for (const file of commandFiles) {
                    const command = file.replace(".js", "");
                    fileNames += `> \`${command}\`\n`;
                }
            } catch (error) {
                const embed = new Discord.MessageEmbed()
                    .setColor("#399305")
                    .setTitle("**I'm so sorry**")
                    .setDescription(
                        "I don't know what fictional category you think exists."
                    );

                return commandExtra.sendMessage(isSlash, context, {
                    embeds: [embed],
                });
            }
            const embed = new Discord.MessageEmbed()
                .setColor("#399305")
                .setTitle(
                    `**${inputName[0].toUpperCase() + inputName.slice(1)} Commands**`
                )
                .setDescription(fileNames);

            commandExtra.sendMessage(isSlash, context, { embeds: [embed] });
        } else if (subcommand === 1) {
            let inputName = context.options?.getString("name") || args[1];
            if (!isSlash && typeof args[1] === "undefined") {
                const embed = new Discord.MessageEmbed()
                    .setColor("#399305")
                    .setTitle("**I'm so sorry**")
                    .setDescription(
                        "I don't know what fictional category you think exists."
                    );

                return commandExtra.sendMessage(isSlash, context, {
                    embeds: [embed],
                });
            }

            const commandFolders = fs.readdirSync("./commands");
            let description;

            for (const folder of commandFolders) {
                const commandFiles = fs
                    .readdirSync(`./commands/${folder}`)
                    .filter((file) => file.endsWith(".js"));
                for (const file of commandFiles) {
                    const command = require(`../../commands/${folder}/${file}`);
                    if (command.name === inputName) {
                        description = command["longDesc"];
                    }
                }
            }
            if (typeof description === "undefined") {
                description =
                    "I don't know what fictional command you think exists.";
            }

            const embed = new Discord.MessageEmbed()
                .setColor("#399305")
                .setTitle(
                    `**${inputName[0].toUpperCase() + inputName.slice(1)}**`
                )
                .setDescription(description);

            commandExtra.sendMessage(isSlash, context, { embeds: [embed] });
        } else if (subcommand === 2) {
            const embed = new Discord.MessageEmbed()
                .setColor("#399305")
                .addField(
                    "**Category**",
                    "> `>help category general` Get info on generic commands found everywhere.\n> `>help category fun` Instead of generic commands, we have more fun ones!"
                )
                .addField(
                    "**Other**",
                    "> `>help command <command>` Get info on a specific command"
                );

            commandExtra.sendMessage(isSlash, context, { embeds: [embed] });
        } else {
            const embed = new Discord.MessageEmbed()
                .setColor("#399305")
                .setTitle("**I'm so sorry**")
                .setDescription(
                    "I don't know what fictional command you think exists."
                );

            commandExtra.sendMessage(isSlash, context, { embeds: [embed] });
        }
    },
};
