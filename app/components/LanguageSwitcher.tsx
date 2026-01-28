'use client'; // 声明这是一个客户端组件

// 导入国际化上下文钩子
import { useI18n } from '@/lib/i18n/context';
// 导入React钩子
import { useState, useRef, useEffect } from 'react';
// 导入Globe图标组件
import { Globe } from 'lucide-react';

/**
 * 语言类型定义
 * @interface Language
 * @property {string} code - 语言代码（'en' 或 'zh'）
 * @property {string} name - 语言名称（英文）
 * @property {string} nativeName - 语言本地名称
 */
interface Language {
  code: 'en' | 'zh';
  name: string;
  nativeName: string;
}

/**
 * 支持的语言列表
 * @constant
 * @type {Language[]}
 */
const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'zh', name: 'Chinese Simplified', nativeName: '简体中文' },
];

/**
 * 语言切换器组件
 * 提供语言选择下拉菜单，支持英文和简体中文切换
 * @returns {JSX.Element} 语言切换器UI组件
 */
export function LanguageSwitcher() {
  // 从国际化上下文获取当前语言和语言设置函数
  const { locale, setLocale } = useI18n();
  // 控制下拉菜单的显示/隐藏状态
  const [isOpen, setIsOpen] = useState(false);
  // 下拉菜单DOM元素的引用，用于检测点击外部事件
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 点击下拉菜单外部时关闭菜单的副作用
  useEffect(() => {
    /**
     * 点击下拉菜单外部时关闭菜单的事件处理函数
     * @param {MouseEvent} event - 鼠标点击事件对象
     */
    function handleClickOutside(event: MouseEvent) {
      // 检查下拉菜单DOM元素是否存在，以及点击目标是否在下拉菜单外部
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        // 如果点击在外部，则关闭下拉菜单
        setIsOpen(false);
      }
    }

    // 为整个文档添加mousedown事件监听器
    document.addEventListener('mousedown', handleClickOutside);
    // 组件卸载时移除事件监听器，避免内存泄漏
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /**
   * 处理语言切换的函数
   * @param {string} newLocale - 新选择的语言代码
   */
  const handleLanguageChange = (newLocale: 'en' | 'zh') => {
    // 设置新的语言
    setLocale(newLocale);
    // 切换后关闭下拉菜单
    setIsOpen(false);
  };

  // 根据当前语言代码查找对应的语言对象
  const currentLanguage = languages.find((lang) => lang.code === locale);

  // 渲染语言切换器UI
  return (
    <div className="relative" ref={dropdownRef}>
      {/* 语言切换按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)} // 点击切换下拉菜单的显示状态
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
        aria-label="Switch language"
      >
        {/* Globe图标 */}
        <Globe className="w-5 h-5 text-slate-600" />
        {/* 当前语言名称 */}
        <span className="text-sm font-medium text-slate-600">
          {currentLanguage?.nativeName}
        </span>
      </button>

      {/* 条件渲染下拉菜单 */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-24 bg-slate-900 rounded-lg shadow-xl border border-slate-800 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* 遍历语言列表生成语言选项按钮 */}
          {languages.map((lang) => (
            <button
              key={lang.code} // 使用语言代码作为唯一键
              onClick={() => handleLanguageChange(lang.code)} // 点击切换语言
              className={`block w-full px-4 py-2 text-left text-sm transition-colors duration-150 ${
                locale === lang.code
                  ? 'bg-blue-600 text-white' // 当前选中语言的样式
                  : 'text-slate-200 hover:bg-slate-800' // 其他语言的样式
              }`}
            >
              {lang.nativeName} {/* 显示语言本地名称 */}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}