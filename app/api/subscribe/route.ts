    /**
     * 处理POST请求，用于订阅用户
     * @param {Request} request - 包含订阅信息的请求对象
     * @returns {Promise<Response>} - 包含订阅成功消息的响应对象
     */
    export async function POST(request: Request) {
        const { email } = await request.json();
        console.log('Received email:', email);
        return new Response(JSON.stringify({ message: `Subscribed ${email} successfully!` }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }