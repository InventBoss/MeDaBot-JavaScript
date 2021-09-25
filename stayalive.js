function stayAlive() {
  setInterval(() =>
    require("node-fetch")("https://medabot-javascript.glitch.me/").then(() => {

    }),
    300000
  );
}

module.exports = stayAlive