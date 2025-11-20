export default async function handler(req, res) {
  const token = process.env.BOT_TOKEN;

  if (req.method === "POST") {
    const update = req.body;

    if (update?.message) {
      const chatId = update.message.chat.id;
      const text = update.message.text;

      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: "Bot ishladi! Siz yozdingiz: " + text,
        })
      });
    }

    return res.status(200).send("ok");
  }

  return res.status(200).json({ status: "webhook active" });
}
