module.exports = async (client, m, chatUpdate, store) => {
  try {
    const { text, sender, chat, isGroup, pushName } = m;
    const groupName = isGroup ? (await client.groupMetadata(chat)).subject : "";
    const botNumber = await client.decodeJid(client.user.id);
    const itsMe = sender == botNumber;
    const prefix = /^[\\/!#.]/gi.test(text) ? text.match(/^[\\/!#.]/gi) : "/";

    const color = (text, color) => {
      return !color ? chalk.green(text) : chalk.keyword(color)(text);
    };

    const logCommand = (argsLog, groupName = "") => {
      const logText = isGroup ? chalk.green(groupName) : "";
      console.log(chalk.black(chalk.bgWhite("[ DREADED-AI ]")), color(argsLog, "turquoise"), chalk.magenta("From"), chalk.green(pushName), chalk.yellow(`[ ${sender.replace("@s.whatsapp.net", "")} ]`), logText);
    };

    const logError = (command) => {
      console.log(chalk.black(chalk.bgRed("[ ERROR ]")), color("command", "turquoise"), color(`${prefix}${command}`, "turquoise"), color("Dreaded", "turquoise"));
    };

    if (text && text.startsWith(prefix)) {
      const command = text.replace(prefix, "").trim().split(/ +/)[0].toLowerCase();
      const args = text.trim().split(/ +/).slice(1).join(" ");

      switch (command) {
        case "help":
        case "menu":
          m.reply(`𝘿𝙍𝙀𝘼𝘿𝙀𝘿 𝘾𝙃𝘼𝙏𝘽𝙊𝙏 𝘼𝙄\n\nHello ${pushName}, This is 𝐷𝑟𝑒𝑎𝑑𝑒𝑑 𝐴𝑖 𝐶ℎ𝑎𝑡𝑏𝑜𝑡, A WhatsApp bot that uses OpenAi API to process natural language queries and present information through a WhatsApp chat\n\nNote that information presented is not 100% accurate!\n\nIt uses 2 commands as listed below!
            
CHATBOT COMMANDS
1) ${prefix}g
This is for machine-based AI responses in form of text. 

AI-GENERATED IMAGE
2) ${prefix}img
This will produce AI-based image according to your query

To deploy this kind of bot, Use the GitHub Repository below\n\nhttps://github.com/Jerezzayigs/JR-AI\n\nAI-3000JR🤖`);
          break;

        case "g":
        case "openai":
          try {
            if (setting.keyopenai === "ISI_APIKEY_OPENAI_DISINI") return m.reply("I need an openAi API key");
            if (!args) return m.reply(`This is Dreaded AI chatbot using Chatgpt API to create almost natural language response to your queries\n\nExample:\n${prefix}${command} Write for me a poem about money`);
            // ... Rest of the code
          } catch (error) {
            m.reply(`An error has occurred: ${error.message}`);
          }
          break;

        case "img":
        case "ai-img":
        case "image":
        case "images":
          try {
            if (setting.keyopenai === "ISI_APIKEY_OPENAI_DISINI") return m.reply("I need an openAi API key");
            if (!args) return m.reply(`This will generate an AI-BASED IMAGE according to your query AI.\n\nExample:\n${prefix}${command} black mercedez car`);
            // ... Rest of the code
          } catch (error) {
            m.reply(`An error has occurred: ${error.message}`);
          }
          break;

        default: {
          if (isGroup) {
            logError(command);
          }
        }
      }
    }
  } catch (err) {
    m.reply(util.format(err));
  }
};
