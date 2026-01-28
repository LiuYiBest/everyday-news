// 导入Next.js元数据类型定义
import type { Metadata } from "next";
// 从Google Fonts导入Geist字体族（无衬线和等宽字体）
import { Geist, Geist_Mono } from "next/font/google";
// 导入国际化上下文提供器
import { I18nProvider } from "@/lib/i18n/context";
// 导入全局样式文件
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"

/**
 * 配置Geist无衬线字体
 * - 设置CSS变量名以便在全局样式中使用
 * - 仅加载latin字符子集以优化性能
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/**
 * 配置Geist等宽字体
 * - 设置CSS变量名以便在全局样式中使用
 * - 仅加载latin字符子集以优化性能
 */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * 网站全局元数据配置
 * - title: 网站标题，显示在浏览器标签页
 * - description: 网站描述，用于搜索引擎和社交媒体预览
 */
export const metadata: Metadata = {
  title: "Everyday News",
  description: "AI-powered daily news summaries delivered to your inbox",
};

/**
 * 应用程序根布局组件
 * 所有页面都会嵌套在此布局中
 * 
 * @param {Object} props - 组件属性
 * @param {React.ReactNode} props.children - 子组件，代表页面内容
 * @returns {JSX.Element} 根布局组件
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // HTML根元素配置
    <html 
      lang="en" // 设置默认语言为英文
      suppressHydrationWarning // 抑制 hydration 警告，解决国际化场景下的语言不一致问题
    >
      {/* 页面主体配置 */}
      <body
        className={`
          ${geistSans.variable} // 应用Geist无衬线字体
          ${geistMono.variable} // 应用Geist等宽字体
          antialiased // 启用抗锯齿，提升文本渲染质量
        `}
      >
        {/* 国际化上下文提供器 */}
        {/* 为整个应用提供语言切换和翻译功能 */}
        <I18nProvider>
          {/* 渲染子组件（页面内容） */}
          {children}
        </I18nProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}