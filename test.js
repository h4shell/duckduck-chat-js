/* model:
    0:"gpt-4o-mini",
    1:"claude-3-haiku-20240307",
    2:"meta-llama/Llama-3-70b-chat-hf",
    3:"mistralai/Mixtral-8x7B-Instruct-v0.1"
*/

const {DuckChat, dataset, model} = require("./src/index.js");

(async () => {
    const chat = new DuckChat(model[0], dataset);
    const Token = await chat.initialize();
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log(await chat.sendMessage("chi sono io?", Token));
})();