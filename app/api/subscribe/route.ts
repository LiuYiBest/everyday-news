import { Resend } from 'resend';
import { NextResponse } from 'next/server';
/**
 * 处理POST请求，用于订阅用户
 * @param {Request} request - 包含订阅信息的请求对象
 * @returns {Promise<Response>} - 包含订阅成功消息的响应对象
 */
export async function POST(request: Request) {
    const { email } = await request.json();
    console.log('Subscribing email:', email);
    const resend = new Resend(process.env.RESEND_API_KEY);
    // 存储到定时任务Resend网站
    const { error:createError } = await resend.contacts.create({
        email: email,
    });
    if (createError) {
        return NextResponse.json({ message: createError.message }, {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // 添加到邮件的订阅列表
    const { error: addError } = await resend.contacts.segments.add({
        email: email,
        segmentId: process.env.RESEND_LIST_ID!,
    });
    if (addError) {
        return NextResponse.json({ message: addError.message }, {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    

    return NextResponse.json({ message: `Subscribed ${email} successfully!` }, {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}