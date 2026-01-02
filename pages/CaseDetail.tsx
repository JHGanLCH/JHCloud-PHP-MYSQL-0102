import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Case } from '../types';
import { ChevronLeft, Building2, ArrowRight, Clock, Package } from 'lucide-react';

interface CaseDetailProps {
  cases: Case[];
}

const CaseDetail: React.FC<CaseDetailProps> = ({ cases }) => {
  const { id } = useParams<{ id: string }>();
  const item = cases.find(c => c.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!item) return <div className="container mx-auto p-20 text-center text-slate-400">案例未找到</div>;

  return (
    <div className="min-h-screen pb-24 bg-primary">
      {/* 1. 顶部导航与面包屑 */}
      <section className="bg-slate-900/40 border-b border-white/5 py-6">
        <div className="container mx-auto px-6 md:px-12">
          <Link to="/products" className="inline-flex items-center gap-2 text-accent hover:text-white transition-colors group mb-2 text-sm">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            <span className="font-bold">案例中心</span>
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">{item.name}</h1>
            <div className="flex items-center gap-3">
               <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-[10px] font-bold uppercase tracking-widest border border-accent/20">
                {item.industry}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 md:px-12 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* 左侧主内容区 (8 列) */}
          <div className="lg:col-span-8 space-y-10 animate-in fade-in slide-in-from-bottom duration-700">
            
            {/* 案例大图展示 */}
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 bg-slate-800">
              <div className="h-[300px] md:h-[450px] w-full relative group">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-8 flex items-center gap-4 text-white/70 text-sm font-medium">
                  <Clock size={16} className="text-accent" /> 重点交付示范案例
                </div>
              </div>
            </div>

            {/* 案例内容正文 - 已移除多余标题，直接显示内容 */}
            <div className="bg-slate-900/30 p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-inner">
              <div className="prose prose-invert max-w-none">
                <div className="text-slate-300 leading-[2] whitespace-pre-wrap font-normal text-lg">
                  {item.content}
                </div>
              </div>
            </div>
          </div>

          {/* 右侧边栏 (4 列) */}
          <div className="lg:col-span-4 space-y-6 animate-in slide-in-from-right duration-700">
            
            {/* 案例关键信息卡片 */}
            <div className="glass p-8 rounded-[2rem] border border-white/10 space-y-8 sticky top-28 shadow-xl">
              {/* 客户Logo */}
              <div className="flex flex-col items-center gap-4 pb-6 border-b border-slate-800">
                <div className="w-24 h-24 bg-white rounded-3xl p-5 shadow-inner flex items-center justify-center shrink-0">
                  <img src={item.logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
                </div>
                <div className="text-center">
                  <h4 className="text-white font-bold text-lg">合作单位</h4>
                  <p className="text-slate-500 text-xs mt-1">智能制造战略合作伙伴</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* 行业领域 */}
                <div className="space-y-2">
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                    <Building2 size={12} /> 行业领域 (Industry)
                  </p>
                  <p className="text-white font-bold text-sm bg-slate-800/50 p-3 rounded-xl border border-white/5">
                    {item.industry}
                  </p>
                </div>

                {/* 涉及核心产品 */}
                <div className="space-y-2">
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                    <Package size={12} /> 涉及产品 (Products)
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                     {(item.relatedProducts || []).map((prod, pIdx) => (
                       <span key={pIdx} className="px-3 py-1.5 bg-accent/10 text-accent text-[10px] font-black rounded-lg border border-accent/20">
                         {prod}
                       </span>
                     ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <a 
                  href="http://210.12.53.106:97/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-full py-4 bg-accent text-primary rounded-xl font-black flex items-center justify-center gap-2 hover:translate-y-[-2px] active:translate-y-0 transition-all shadow-[0_10px_30px_rgba(16,185,129,0.2)] text-sm"
                >
                  <ArrowRight size={18} /> 体验同款数字车间
                </a>
                <Link 
                  to="/products" 
                  className="w-full py-4 bg-white/5 border border-white/5 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all text-sm"
                >
                  更多相关产品
                </Link>
              </div>
            </div>

            {/* 快速联系小卡片 */}
            <div className="p-6 bg-slate-900/20 rounded-2xl border border-white/5 text-center">
              <p className="text-slate-500 text-xs leading-relaxed">
                想要获取针对 <span className="text-accent">{item.industry}</span> 行业的深度技术白皮书？请联系我们。
              </p>
              <Link to="/about" className="mt-4 text-accent font-bold text-xs hover:underline flex items-center justify-center gap-1 mx-auto">
                联系商务经理 <ArrowRight size={14} />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetail;