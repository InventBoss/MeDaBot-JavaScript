const Discord = require("discord.js")
const wait = require('util').promisify(setTimeout);

module.exports = {
	name: "test",
	execute(message) {
		if (!message.author.id === "617816411750006794") return

		const emojiArray = new Array("1️⃣", "2️⃣", "3️⃣", "4️⃣")

		const row = new Discord.MessageActionRow().addComponents(
			new Discord.MessageButton()
				.setCustomId("test")
			    .setLabel("1")
			  	.setStyle("PRIMARY"),
			new Discord.MessageButton()
				.setCustomId("test2")
				.setLabel("2")
				.setStyle("PRIMARY")
		  )

		message.channel.send({content: "test", components: [row]}).then(m => {
			const filter = (interaction) => {
				if (interaction.user.id === message.author.id) return true
				return false
			}

			const collector = m.createMessageComponentCollector({filter, time: 10000})
			
			collector.on('collect', async interaction => {
				await interaction.deferUpdate()
			})

			collector.on("end", async collected => {

				if (collected.size === 0) {
					return console.log("error")
				}
				const collectedArray = Array.from(collected)

				if (collectedArray[collected.size - 1][1].customId == "test2") {
					console.log("It's not test")
				} else {
					console.log("It\'s test")
				}
				console.log(collectedArray[collected.size - 1][1].customId)
			})
		})
	}
}