export default async function handler(req, res) {
  if (req.method === "POST") {
    const token = process.env.BOT_TOKEN;
    const chatId = process.env.CHAT_ID;

    const message = req.body?.message?.text || "Xabar olinmadi";

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: `Yangi xabar: ${message}`
      }),
    });

    return res.status(200).json({ ok: true });
  }

  res.status(200).send("Bot ishlayapti");
}
