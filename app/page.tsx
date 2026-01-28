'use client'; // 声明这是一个客户端组件

// 导入图标组件
import { Mail, ArrowRight } from 'lucide-react';
// 导入React钩子
import { useState } from 'react';
// 导入Next.js链接组件
import Link from 'next/link';
// 导入国际化钩子
import { useI18n } from '@/lib/i18n/context';
// 导入语言切换器组件
import { LanguageSwitcher } from './components/LanguageSwitcher';

/**
 * 首页组件
 * 应用的主页面，包含导航栏、英雄区域、订阅表单和功能亮点
 * @returns {JSX.Element} 首页UI组件
 */
export default function Home() {
  // 获取国际化翻译函数
  const { t } = useI18n();
  // 管理订阅邮箱输入状态
  const [email, setEmail] = useState('');
  // 管理订阅按钮的加载状态
  const [isLoading, setIsLoading] = useState(false);

  /**
   * 处理订阅表单提交
   * @param {React.SubmitEvent<HTMLFormElement>} e - 表单提交事件对象
   */
  const handleSubscribe = async (e: React.SubmitEvent<HTMLFormElement>) => {
    // 阻止表单默认提交行为
    e.preventDefault();
    // 设置加载状态为true
    setIsLoading(true);
    
    // 集成实际的订阅API
    fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    }).then(async (res) => {
      const data = await res.json();
      setIsLoading(false);
      if (res.status === 200) {
        // 订阅成功，显示成功消息
        alert(data.message || '订阅成功！');
        setEmail(''); // 清空输入框
      } else {
        // 订阅失败，显示错误消息
        alert(data.message || '订阅失败，请稍后重试');
      }
    }).catch(() => {
      setIsLoading(false);
      // 处理网络错误或其他异常情况
      alert('订阅失败，请检查网络连接或稍后重试');
    }).finally(() => {
      setEmail(''); // 清空输入框
      setIsLoading(false);
    });
  };

  // 渲染首页UI
  return (
    // 页面主容器，使用渐变色背景
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* 导航栏 */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform">
              <Mail className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Daily News
            </span>
          </Link>

          {/* 导航链接和语言切换器 */}
          <div className="flex items-center gap-8">
            <div className="hidden sm:flex items-center gap-8">
              <Link
                href="#about"
                className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium"
              >
                {t('nav.about')} {/* 关于我们链接 */}
              </Link>
              <Link
                href="#contact"
                className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium"
              >
                {t('nav.contact')} {/* 联系我们链接 */}
              </Link>
            </div>
            {/* 语言切换器组件 */}
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      {/* 主内容区域 */}
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* 标题部分 */}
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              {t('hero.title')}{' '}
              <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                {t('hero.titleHighlight')} {/* 标题高亮部分 */}
              </span>
            </h1>

            {/* 描述文本 */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              {t('hero.description')} {/* 页面描述 */}
            </p>
          </div>

          {/* 订阅表单 */}
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-16"
          >
            <input
              type="email"
              placeholder={t('subscribe.placeholder')} 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
              className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <button
              type="submit"
              disabled={isLoading} 
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-600/30 active:scale-95 transition-all duration-200 flex items-center youjustify-center gap-2 disabled:opacity-75 whitespace-nowrap"
            >
              {/* 根据加载状态显示不同文本 */}
              {isLoading ? t('subscribe.loading') : t('subscribe.button')}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* 功能亮点 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {/* 功能亮点数据 */}
            {[
              {
                icon: Mail,
                titleKey: 'features.rss.title',
                descKey: 'features.rss.description',
              },
              {
                icon: Mail,
                titleKey: 'features.summary.title',
                descKey: 'features.summary.description',
              },
              {
                icon: Mail,
                titleKey: 'features.push.title',
                descKey: 'features.push.description',
              },
            ].map((item, index) => (
              <div
                key={index} /* 使用索引作为键，实际应用中应使用唯一ID */
                className="p-5 sm:p-6 rounded-xl border border-slate-200 bg-white/50 backdrop-blur-sm hover:shadow-lg hover:border-slate-300 transition-all duration-300 hover:-translate-y-1"
              >
                <item.icon className="w-6 h-6 text-blue-600 mb-3" />
                <h3 className="font-semibold text-slate-900 mb-2">
                  {t(item.titleKey)} {/* 功能标题 */}
                </h3>
                <p className="text-sm text-slate-600">{t(item.descKey)}</p> {/* 功能描述 */}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="border-t border-slate-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-slate-600">
          <p>{t('footer.copyright')} {/* 版权信息 */}</p>
        </div>
      </footer>
    </div>
  );
}