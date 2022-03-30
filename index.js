const Discord = require("discord.js");
const clientExtra = require("./extra/client.js");
const stayAlive = require("./stayalive.js");
require("dotenv").config();

const testMode = false;

const client = clientExtra.initClient();

client.on("ready", async () => {
    client.user.setActivity("you scumbags", {
        type: "WATCHING",
    });

    client.textCommands = new Discord.Collection();
    client.textCommands = clientExtra.registerTextCommand(client);

    clientExtra.registerSlashCommands(client);

    console.log(`> Successfully Logged in as ${client.user.tag}\n`);
});

client.on("messageCreate", (message) => {
    clientExtra.executeTextCommand(client, message);
});

client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand())
        return clientExtra.executeSlashCommand(interaction);
});

stayAlive()
if (testMode) {
    const token = `${process.env.TEST_TOKEN}`;
    client.login(token);
} else {
    const token = `${process.env.TOKEN}`;
    client.login(token);
}

