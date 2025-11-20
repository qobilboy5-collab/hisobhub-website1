export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const token = process.env.BOT_TOKEN;
  const chatId = process.env.CHAT_ID; // telegramga qaysi chatga yuboriladi

  const { name, phone, message } = req.body;

  const text =
    `📩 Yangi murojaat:\n\n` +
    `👤 Ism: ${name}\n` +
    `📞 Telefon: ${phone}\n` +
    `💬 Xabar: ${message}`;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
    }),
  });

  return res.status(200).json({ ok: true });
}
