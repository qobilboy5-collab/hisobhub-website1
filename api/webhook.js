import TelegramBot from "node-telegram-bot-api";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const token = process.env.BOT_TOKEN;
  const bot = new TelegramBot(token, { webHook: { port: 443 } });

  // Raw body olish uchun:
  let body = "";
  req.on("data", chunk => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    const update = JSON.parse(body || "{}");

    if (update.message) {
      const chatId = update.message.chat.id;
      const text = update.message.text;

      await bot.sendMessage(chatId, "Bot ishlayapti! Siz yozdingiz: " + text);
    }

    res.status(200).send("ok");
  });
}
