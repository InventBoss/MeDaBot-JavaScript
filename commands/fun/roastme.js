const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "roastme",
  execute(message) {
    const embed = new Discord.MessageEmbed()
        .setDescription("**LOADING SADNESS**")
        .setColor("#fc4e03")

    message.channel.send({embeds : [embed]}).then(m => {
      
      fetch("https://evilinsult.com/generate_insult.php?lang=en&type=json").then(response => response.json()).then(json => {
        result = json.insult
        const embed = new Discord.MessageEmbed()
          .setDescription(`\`\`\`${result.replace(/&quot;/g, "\"")}\`\`\``)
          .setColor("#fc4e03")
          
        m.edit({embeds : [embed]})
      })    
    })
  }
}