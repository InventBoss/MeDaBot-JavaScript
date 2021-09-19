function stayAlive() {
  setInterval(
    () =>
      require("node-fetch")("https://medabot-javascript.glitch.me/").then(
        () => {}
      ),

    240000
  );
}

module.exports = stayAlive