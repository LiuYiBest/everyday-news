    import { Resend } from 'resend';
    /**
     * 处理POST请求，用于订阅用户
     * @param {Request} request - 包含订阅信息的请求对象
     * @returns {Promise<Response>} - 包含订阅成功消息的响应对象
     */
    export async function POST(request: Request) {
        const { email } = await request.json();
        const resend = new Resend(process.env.RESEND_API_KEY);
        // 存储到定时任务Resend网站
        if (!email) {
            return new Response(JSON.stringify({ message: 'Email is required' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // 添加到邮件的订阅列表
        const { error: segmentError } = await resend.contacts.segments.add({
            email: email,
            segmentId: process.env.RESEND_LIST_ID!,
        });
        if (segmentError) {
            return new Response(JSON.stringify({ message: segmentError.message }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        

        return new Response(JSON.stringify({ message: `Subscribed ${email} successfully!` }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }