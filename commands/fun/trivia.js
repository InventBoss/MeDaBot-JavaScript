const Discord = require("discord.js");
const fetch = require("node-fetch");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    name: "trivia",
    longDesc:
        "Have you ever wanted to test your knowledge from obscure gameshows with questionable sources? Well with one command you can solve your problem!",
    slashData: new SlashCommandBuilder()
        .setName("trivia")
        .setDescription("Do you want to test your concerning knowledge"),
    execute(isSlash, context) {
        fetch(
            "https://opentdb.com/api.php?amount=4&type=multiple&encode=url3986"
        )
            .then((response) => response.json())
            .then(async (json) => {
                const buttonNameArray = new Array(
                    Math.random().toString(36).substring(10),
                    Math.random().toString(36).substring(10),
                    Math.random().toString(36).substring(10),
                    Math.random().toString(36).substring(10)
                );

                const row = new Discord.MessageActionRow().addComponents(
                    new Discord.MessageButton()
                        .setCustomId(buttonNameArray[0])
                        .setLabel("Option 1")
                        .setStyle("SUCCESS"),
                    new Discord.MessageButton()
                        .setCustomId(buttonNameArray[1])
                        .setLabel("Option 2")
                        .setStyle("SUCCESS"),
                    new Discord.MessageButton()
                        .setCustomId(buttonNameArray[2])
                        .setLabel("Option 3")
                        .setStyle("SUCCESS"),
                    new Discord.MessageButton()
                        .setCustomId(buttonNameArray[3])
                        .setLabel("Option 4")
                        .setStyle("SUCCESS")
                );

                result = json.results[0];

                let optionsArray = new Array(
                    result.incorrect_answers[0],
                    result.incorrect_answers[1],
                    result.incorrect_answers[2],
                    result.correct_answer
                );

                optionsArray.sort();

                const embed = new Discord.MessageEmbed()
                    .setTitle("**Trivia** :question:")
                    .setDescription(
                        `**${decodeURIComponent(
                            result.question
                        )}**\n\n1. ${decodeURIComponent(
                            optionsArray[0]
                        )}\n2. ${decodeURIComponent(
                            optionsArray[1]
                        )}\n3. ${decodeURIComponent(
                            optionsArray[2]
                        )}\n4. ${decodeURIComponent(optionsArray[3])}`
                    )
                    .setFooter({
                        text: `CATEGORY: ${decodeURIComponent(
                            result.category
                        )} | DIFFICULTY: ${decodeURIComponent(
                            result.difficulty
                        )}`,
                    })
                    .setColor("#e1ff00");

                let triviaMessage;
                if (isSlash) {
                    context.reply({ embeds: [embed], components: [row] });
                } else {
                    triviaMessage = await context.channel.send({
                        embeds: [embed],
                        components: [row],
                    });
                }

                const filter = (interaction) => {
                    if (
                        interaction.user.id ===
                        (context.author?.id || context.user?.id)
                    )
                        return true;
                    return false;
                };
                let collector;
                if (isSlash) {
                    const interactionMessage = await context.fetchReply();
                    collector =
                        interactionMessage.createMessageComponentCollector({
                            filter,
                            time: 10000,
                        });
                } else {
                    collector = triviaMessage.createMessageComponentCollector({
                        filter,
                        time: 10000,
                    });
                }

                collector.on("collect", async (interaction) => {
                    await interaction.deferUpdate();
                    const interactionArray = interaction.customId;
                    let description;

                    switch (interactionArray) {
                        case buttonNameArray[0]:
                            description = `**${decodeURIComponent(
                                result.question
                            )}**\n\n1. **${decodeURIComponent(
                                optionsArray[0]
                            )}**\n2. ${decodeURIComponent(
                                optionsArray[1]
                            )}\n3. ${decodeURIComponent(
                                optionsArray[2]
                            )}\n4. ${decodeURIComponent(optionsArray[3])}`;
                            break;
                        case buttonNameArray[1]:
                            description = `**${decodeURIComponent(
                                result.question
                            )}**\n\n1. ${decodeURIComponent(
                                optionsArray[0]
                            )}\n2. **${decodeURIComponent(
                                optionsArray[1]
                            )}**\n3. ${decodeURIComponent(
                                optionsArray[2]
                            )}\n4. ${decodeURIComponent(optionsArray[3])}`;
                            break;
                        case buttonNameArray[2]:
                            description = `**${decodeURIComponent(
                                result.question
                            )}**\n\n1. ${decodeURIComponent(
                                optionsArray[0]
                            )}\n2. ${decodeURIComponent(
                                optionsArray[1]
                            )}\n3. **${decodeURIComponent(
                                optionsArray[2]
                            )}**\n4. ${decodeURIComponent(optionsArray[3])}`;
                            break;
                        case buttonNameArray[3]:
                            description = `**${decodeURIComponent(
                                result.question
                            )}**\n\n1. ${decodeURIComponent(
                                optionsArray[0]
                            )}\n2. ${decodeURIComponent(
                                optionsArray[1]
                            )}\n3. ${decodeURIComponent(
                                optionsArray[2]
                            )}\n4. **${decodeURIComponent(optionsArray[3])}**`;
                            break;
                    }
                    const interactionEmbed = new Discord.MessageEmbed()
                        .setTitle("**Trivia** :question:")
                        .setDescription(description)
                        .setFooter({
                            text: `CATEGORY: ${decodeURIComponent(
                                result.category
                            )} | DIFFICULTY: ${decodeURIComponent(
                                result.difficulty
                            )}`,
                        })
                        .setColor("#e1ff00");
                    if (isSlash) {
                        context.editReply({ embeds: [interactionEmbed] });
                    } else {
                        triviaMessage.edit({
                            embeds: [interactionEmbed],
                        });
                    }
                });

                collector.on("end", (collected) => {
                    const collectedArray = Array.from(collected);
                    if (collected.size === 0) {
                        const embed = new Discord.MessageEmbed()
                            .setTitle("**Trivia** :question:")
                            .setDescription(
                                `**You ran out of time to answer the question.**\n\nThe answer is\n> **${decodeURIComponent(
                                    result.correct_answer.trim()
                                )}**`
                            )
                            .setColor("#e1ff00");

                        if (isSlash) {
                            context.editReply({ embeds: [embed] });
                        } else {
                            triviaMessage.edit({
                                embeds: [embed],
                            });
                        }
                    } else {
                        for (let i = 0; i < 4; i++) {
                            if (optionsArray[i] === result.correct_answer) {
                                const currentButton = buttonNameArray[i];
                                if (
                                    collectedArray[collected.size - 1][1]
                                        .customId !== currentButton
                                ) {
                                    let chosenButtonId =
                                        collectedArray[collected.size - 1][1]
                                            .customId;
                                    let chosenButton = 0;

                                    switch (chosenButtonId) {
                                        case buttonNameArray[0]:
                                            chosenButton = 0;
                                            break;
                                        case buttonNameArray[1]:
                                            chosenButton = 1;
                                            break;
                                        case buttonNameArray[2]:
                                            chosenButton = 2;
                                            break;
                                        case buttonNameArray[3]:
                                            chosenButton = 3;
                                            break;
                                    }
                                    const embed = new Discord.MessageEmbed()
                                        .setTitle("**Trivia** :question:")
                                        .setDescription(
                                            `**Sorry!**\n\nThe answer isn't **${decodeURIComponent(
                                                optionsArray[
                                                    chosenButton
                                                ].trim()
                                            )}** it's\n> **${decodeURIComponent(
                                                result.correct_answer.trim()
                                            )}**`
                                        )
                                        .setColor("#e1ff00");

                                    if (isSlash) {
                                        context.editReply({ embeds: [embed] });
                                    } else {
                                        triviaMessage.edit({
                                            embeds: [embed],
                                        });
                                    }
                                } else {
                                    const embed = new Discord.MessageEmbed()
                                        .setTitle("**Trivia** :question:")
                                        .setDescription(
                                            `**You are correct!**\n\nThe answer is\n> **${decodeURIComponent(
                                                result.correct_answer.trim()
                                            )}**`
                                        )
                                        .setColor("#e1ff00");

                                    if (isSlash) {
                                        context.editReply({ embeds: [embed] });
                                    } else {
                                        triviaMessage.edit({
                                            embeds: [embed],
                                        });
                                    }
                                }
                            }
                        }
                    }
                });
            });
    },
};
