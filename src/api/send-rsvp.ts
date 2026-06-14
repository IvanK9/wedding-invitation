export const config = {
  runtime: 'edge', // Включаем ультрабыстрый запуск
};

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const { token, chatId, message } = await request.json();

    // Отправляем запрос в Telegram из-под серверов Vercel без блокировок
    const tgResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (!tgResponse.ok) {
      return new Response('Telegram API Error', { status: tgResponse.status });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
    console.log(error)
  }
}
