import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 },
      );
    }

    // Здесь можно интегрировать с сервисом рассылок
    // Например, Mailchimp, ConvertKit, Substack, etc.

    // Пример интеграции с Mailchimp:
    // const response = await fetch(`https://us1.api.mailchimp.com/3.0/lists/${LIST_ID}/members`, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${MAILCHIMP_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     email_address: email,
    //     status: 'subscribed',
    //   }),
    // });

    // Для демонстрации просто логируем email
    console.log('Newsletter subscription:', email);

    // В реальном проекте здесь должна быть интеграция с сервисом рассылок
    // Пока возвращаем успешный ответ
    return NextResponse.json(
      { message: 'Successfully subscribed to newsletter' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
