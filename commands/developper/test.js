module.exports = {
	name: "test",
	execute(message) {
    if (!message.author.id === "617816411750006794") return

		extra.callError(message, "Test")

	}
}