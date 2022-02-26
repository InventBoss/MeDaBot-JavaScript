const fs = require("fs");
const stayAlive = require("./stayalive.js");
const Discord = require("discord.js");
const config = require("./config.json");

const testMode = false

const reddit = "test"

async function startBot() {  
  if (testMode) {
    const token = `${process.env.TEST_TOKEN}`
    client.login(token)
  } else {
    const token = `${process.env.TOKEN}`
    client.login(token)
  }
  
}

let prefix = config.prefix;
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS,
                                              Discord.Intents.FLAGS.GUILD_MESSAGES,
                                              Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
                                              Discord.Intents.FLAGS.DIRECT_MESSAGES,
                                              Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS],
                                    partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.commands = new Discord.Collection();

const dadBotTriggerWords = ["i'm", "im", "I'm", "Im", "I'M", "IM", "i'M", "iM"];
const extension = [".jpg", ".png", ".svg", ".mp4", ".gif"];

const commandFolders = fs.readdirSync("./commands");
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./commands/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

for (const file of commandFiles) {
  const commandsName = require(`./commands/${file}`);
  client.commands.set(commandsName.name, commandsName);
}

client.on("ready", async () => {
  client.user.setActivity(">list to get started", {
    type: "WATCHING",
  });

  console.log(`Logged in as ${client.user.tag}`);
  console.log("-------------Log-------------");
});

client.on("messageCreate", message => {
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const text = args.join(" ");

  // Ignore the greatest features on earth.
  let firstWord = message.content.split(" ", 1)[0];

  if (dadBotTriggerWords.includes(firstWord)) {
    let triggerChance = Math.round(Math.random() * (8 - 1) + 1);
    if (triggerChance === 8) message.channel.send(`Hi ${text}, I\'m MeDaBot!`);
  }
  if (message.content === "summon the moth") {
    message.channel.send(
      "https://cdn.discordapp.com/attachments/836752348260466688/846496652847611914/nzrsau2h.png"
    );
  }
  if (message.content === "tonight on bottom gear") {
    async function getBottomGear() {
      const embed = new Discord.MessageEmbed()
        .setColor("#ff4301")
        .setDescription("**LOADING BOTTOM GEAR**");
      message.channel.send({embeds : [embed]}).then(async (postMessage) => {
        const post = await reddit
          .getSubreddit("bottomgear")
          .getRandomSubmission();
        
        if (post.over_18 && !message.channel.nsfw) {
          const embed = new Discord.MessageEmbed()
            .setColor("#ff4301")
            .setDescription("**SORRY THIS POST IS NSFW**")
          postMessage.edit({embeds : [embed]})
          return
        }
        
        const embed = new Discord.MessageEmbed()
          .setColor("#ff4301")
          .setDescription(
            `**[${post.title.toUpperCase()}]\(https://reddit.com/r/memes/comments/${
              post.id
            }/${post.title
              .replace(/ /g, "_")
              .replace(/"/g, "")
              .replace(/\*/g, "")})**`
          )
          .setImage(post.url)
          .setFooter(
            `By u/${post.author.name} 👑\n💾  Post id: ${post.id} | 👍  Upvotes: ${post.ups}`
          );

        if (extension.includes(post.url.slice(-4))) {
          embed.setImage(post.url);
        } else {
          embed.setDescription(
            `**[${post.title.toUpperCase()}]\(https://reddit.com/r/memes/comments/${
              post.id
            }/${post.title
              .replace(/ /g, "_")
              .replace(/"/g, "")
              .replace(/\*/g, "")})**\n\n${post.selftext}`
          );
        }

        postMessage.edit({embeds : [embed]});
      });
    }

    try {
      getBottomGear();
    } catch (error) {
      console.log("<Error>\n" + error);
    }
  }

  if (!message.content.startsWith(prefix)) return;
  if (message.author.id === client.user.id) return;
  if (message.author.bot) {
    message.channel.send("I'm sorry brethen but the humans won't allow me.");
    return;
  }

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!command) return;

  try {
    command.execute(message, args, text);
    console.log(
      `<${message.author.tag}> executed ${commandName} in <${message.guild}>`
    );
  } catch (error) {
    console.log("<Error>\n" + error);
    message.reply(`there was an error trying to execute \`>${commandName}\``);
  }
});

stayAlive()
startBot();
