import { inngest } from "./client";
import { fetchAllNews } from "../lib/rss_utils";
import { formatNewsSummary } from "../lib/rss_utils";
import { Resend } from "resend";
export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

export const sendNewsletter = inngest.createFunction(
  { id: "send-newsletter" },
  { event: "newsletter/send" },
  async ({ event, step }) => {
    // 1.从rss源获取新闻
    const newsItems = await step.run("fetch-news", async () => {
      return await fetchAllNews();
    });

    // 2.整理新闻为每日摘要格式
    const newsSummary = await step.run("format-news", async () => {
      return formatNewsSummary(newsItems);
    });

    // 3.创建邮件内容
    const resend = new Resend(process.env.RESEND_API_KEY);
    const {data, error} = await step.run("create-email", async () => {
      const result = await resend.broadcasts.create({
        from: "Daily News <onboarding@resend.dev>",
        segmentId: process.env.RESEND_LIST_ID!,
        subject: `Your Daily News Summary ${new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' } )}`,
        html: newsSummary.html,
      });   
      return result;
    })
    
    // 4.发送邮件
    const {error:sendError} = await step.run("send-email", async () => {
        // const result = await resend.broadcasts.send(data?.id!);
        return result;
    });
  },
);