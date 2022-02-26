const fetch = import("node-fetch");

// const accountData = {
//     grant_type: "password",
//     username: process.env["REDDIT_NAME"],
//     password: process.env["REDDIT_PASSWORD"],
// };

module.exports = {
    getPostFromId: async (id) => {
        const response = await fetch(
            `https://www.reddit.com/comments/${id}/.json`
        );
        const data = await response.json();
        return await data[0]["data"]["children"][0]["data"];
    },
    getSubreddit: async (name) => {
        const response = await fetch(
            `https://www.reddit.com/r/${name}/about/.json`
        );
        const data = await response.json()
        return await data["data"]
    },
};
