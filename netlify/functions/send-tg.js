const fetch = require("node-fetch");

exports.handler = async (event) => {
  // Разрешаем запросы только методом POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { name, phone } = JSON.parse(event.body);
    const TOKEN = process.env.TG_TOKEN;
    const CHAT_ID = process.env.TG_CHAT_ID;

    const message = `<b>Новая заявка!</b>\n<b>Имя:</b> ${name}\n<b>Телефон:</b> ${phone}`;

    const response = await fetch(
      `https://api.telegram.org/bot${TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          parse_mode: "HTML",
          text: message,
        }),
      },
    );

    if (response.ok) {
      return { statusCode: 200, body: JSON.stringify({ status: "success" }) };
    } else {
      return { statusCode: 500, body: JSON.stringify({ status: "error" }) };
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
