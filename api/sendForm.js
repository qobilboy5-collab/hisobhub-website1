export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Only POST allowed" });
  }

  const { name, phone, message } = req.body;

  if (!name || !phone || !message) {
    return res.status(400).json({ ok: false, message: "Missing fields" });
  }

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;

  const text =
    `📩 *Yangi murojaat*\n\n` +
    `👤 *Ism:* ${name}\n` +
    `📞 *Telefon:* ${phone}\n` +
    `💬 *Xabar:* ${message}`;

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    const tgRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: "Markdown",
      }),
    });

    const data = await tgRes.json();

    if (!data.ok) {
      return res.status(500).json({ ok: false, message: "Telegram error", data });
    }

    return res.status(200).json({ ok: true, message: "Sent to Telegram" });

  } catch (err) {
    return res.status(500).json({ ok: false, message: "Server error", error: err });
  }
}
