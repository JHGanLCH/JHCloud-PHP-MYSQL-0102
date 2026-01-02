
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { News } from '../types';
import { Calendar, Eye, ChevronLeft, Share2 } from 'lucide-react';

interface NewsDetailProps {
  news: News[];
}

const NewsDetail: React.FC<NewsDetailProps> = ({ news }) => {
  const { id } = useParams<{ id: string }>();
  const item = news.find(n => n.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!item) return <div className="container mx-auto p-20 text-center">新闻未找到</div>;

  return (
    <div className="max-w-4xl mx-auto px-8 py-16">
      <Link to="/about" className="flex items-center gap-2 text-accent mb-8 hover:translate-x-[-4px] transition-transform">
        <ChevronLeft size={20} /> 返回新闻列表
      </Link>
      
      <article className="space-y-8 animate-in slide-in-from-bottom duration-700">
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-6 text-slate-500 text-sm">
            <span className="flex items-center gap-1"><Calendar size={16}/> {item.date}</span>
            <span className="flex items-center gap-1"><Eye size={16}/> {item.clicks} 次点击</span>
            {item.isPinned && <span className="bg-accent/20 text-accent px-2 py-0.5 rounded text-[10px] font-bold">置顶内容</span>}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">{item.title}</h1>
        </header>

        <div className="rounded-3xl overflow-hidden aspect-video shadow-2xl">
          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
        </div>

        <div className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap">
          {item.content}
        </div>

        <footer className="pt-12 border-t border-slate-800 flex justify-between items-center">
          <div className="flex gap-4">
            <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <Share2 size={18} /> 分享到社交媒体
            </button>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default NewsDetail;
