import TelegramBot from "node-telegram-bot-api";

export default async function handler(req, res) {
  const token = process.env.BOT_TOKEN;
  const bot = new TelegramBot(token);

  if (req.method === "POST") {
    const update = req.body;

    if (update.message) {
      const chatId = update.message.chat.id;
      const text = update.message.text;

      await bot.sendMessage(chatId, "Bot ishladi! Siz yozdingiz: " + text);
    }

    return res.status(200).send("ok");
  }

  return res.status(200).json({ status: "webhook active" });
}
