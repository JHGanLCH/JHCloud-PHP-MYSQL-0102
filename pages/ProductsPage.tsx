
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SiteData } from '../types';
import { 
  ChevronRight, Zap, Target, Layers, FileText, Cpu, ShieldCheck, 
  Database, Cloud, Activity, Globe, Shield, Settings, Smartphone, 
  Wrench, FlaskConical, PlayCircle, CheckCircle2 
} from 'lucide-react';

interface ProductsPageProps {
  data: SiteData;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'core' | 'tech' | 'feature' | 'case'>('core');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [activeIndIndex, setActiveIndIndex] = useState(0);

  const industries = ['all', ...Array.from(new Set(data.cases.map(c => c.industry)))];
  const filteredCases = selectedIndustry === 'all' 
    ? data.cases 
    : data.cases.filter(c => c.industry === selectedIndustry);

  const getTechIcon = (index: number) => {
    const icons = [
      <Cloud size={24} className="text-accent" />,
      <Database size={24} className="text-accent" />,
      <Cpu size={24} className="text-accent" />,
      <Activity size={24} className="text-accent" />,
      <ShieldCheck size={24} className="text-accent" />,
      <Globe size={24} className="text-accent" />
    ];
    return icons[index % icons.length];
  };

  const getIndustryIcon = (name: string) => {
    switch (name) {
      case "军品总装": return <Shield size={32} />;
      case "机械制造": return <Settings size={32} />;
      case "电子装配": return <Smartphone size={32} />;
      case "装备维修": return <Wrench size={32} />;
      case "化工制药": return <FlaskConical size={32} />;
      case "智能产线": return <PlayCircle size={32} />;
      default: return <Target size={32} />;
    }
  };

  return (
    <div className="min-h-screen">
      <section className="relative py-20 bg-slate-950 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
           <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-accent/10 blur-[150px] rounded-full" />
        </div>
        <div className="container mx-auto px-8 relative z-10">
          <h1 className="text-5xl font-bold mb-6 text-white tracking-tight">科技赋能制造</h1>
          <p className="text-slate-400 text-xl max-w-3xl leading-relaxed">提供覆盖全业务链条的数字化产品矩阵，从基础连接到智能决策，全面助力企业转型升级。</p>
        </div>
      </section>

      <div className="container mx-auto px-8 py-12">
        {/* Navigation */}
        <div className="flex flex-wrap gap-4 md:gap-8 border-b border-slate-800 mb-16">
          {[
            { id: 'core', label: '核心产品', icon: <Zap size={18}/> },
            { id: 'tech', label: '技术说明', icon: <Layers size={18}/> },
            { id: 'feature', label: '行业特色', icon: <Target size={18}/> },
            { id: 'case', label: '案例介绍', icon: <FileText size={18}/> },
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 pb-6 px-2 font-bold transition-all relative ${activeTab === tab.id ? 'text-accent scale-105' : 'text-slate-500 hover:text-white'}`}
            >
              {tab.icon} {tab.label}
              {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent rounded-full" />}
            </button>
          ))}
        </div>

        <div className="animate-in fade-in duration-700">
          {activeTab === 'core' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.products.map((product) => (
                <Link 
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group glass rounded-3xl overflow-hidden hover:bg-white/10 transition-all flex flex-col border border-slate-800"
                >
                  <div className="h-48 overflow-hidden">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-8 flex-grow">
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-accent transition-colors">{product.name}</h3>
                    <p className="text-slate-400 leading-relaxed text-sm">{product.description}</p>
                  </div>
                  <div className="p-8 pt-0 flex items-center justify-between text-accent font-bold text-sm">
                    查看详情 <ChevronRight size={18} />
                  </div>
                </Link>
              ))}
            </div>
          )}

          {activeTab === 'tech' && (
            <div className="max-w-6xl mx-auto space-y-16">
              <div className="glass p-12 rounded-[2.5rem] space-y-8">
                <h2 className="text-3xl font-bold text-white flex items-center gap-4">
                  <div className="p-3 bg-accent/20 rounded-xl"><Layers className="text-accent" /></div>
                  核心技术优势
                </h2>
                <div className="prose prose-invert max-w-none text-slate-300 text-lg leading-relaxed whitespace-pre-wrap border-b border-slate-800 pb-8">
                  {data.techContent}
                </div>

                {/* 6 Content Blocks Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
                  {(data.techFeatures || []).map((feature, idx) => (
                    <div key={idx} className="glass p-8 rounded-3xl border border-white/5 hover:border-accent/30 transition-all group">
                      <div className="mb-6 p-4 bg-slate-900 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                        {getTechIcon(idx)}
                      </div>
                      <h4 className="text-white font-bold text-xl mb-4 group-hover:text-accent transition-colors">{feature.title}</h4>
                      <ul className="space-y-3">
                        {feature.items.map((item, i) => (
                          <li key={i} className="text-slate-400 text-sm flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'feature' && (
            <div className="space-y-12">
              <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <h2 className="text-4xl font-bold text-white tracking-tight">深耕垂直行业，懂制造更懂业务</h2>
                <p className="text-slate-400 text-lg">{data.industryContent}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Industry Nav */}
                <div className="lg:col-span-4 space-y-3">
                  {(data.industryDetails || []).map((ind, idx) => (
                    <button 
                      key={ind.id}
                      onClick={() => setActiveIndIndex(idx)}
                      className={`w-full flex items-center gap-4 p-6 rounded-3xl text-left transition-all border ${activeIndIndex === idx ? 'bg-accent text-primary border-accent shadow-[0_10px_30px_rgba(16,185,129,0.2)]' : 'bg-slate-900/50 text-slate-400 border-slate-800 hover:bg-slate-800'}`}
                    >
                      <div className={`shrink-0 ${activeIndIndex === idx ? 'text-primary' : 'text-accent'}`}>
                        {getIndustryIcon(ind.name)}
                      </div>
                      <span className="font-bold text-lg">{ind.name}</span>
                    </button>
                  ))}
                </div>

                {/* Detail Content */}
                <div className="lg:col-span-8 animate-in slide-in-from-right duration-500">
                  {data.industryDetails?.[activeIndIndex] && (
                    <div className="glass p-10 md:p-12 rounded-[3rem] border border-white/10 space-y-10 relative overflow-hidden min-h-[500px]">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-3xl rounded-full -mr-20 -mt-20" />
                      
                      <div className="space-y-6 relative z-10">
                        <h3 className="text-4xl font-bold text-white flex items-center gap-4">
                           <span className="text-accent">{getIndustryIcon(data.industryDetails[activeIndIndex].name)}</span>
                           {data.industryDetails[activeIndIndex].name}
                        </h3>
                        <p className="text-slate-300 text-xl leading-relaxed italic border-l-4 border-accent pl-6 py-2 bg-accent/5 rounded-r-2xl">
                          {data.industryDetails[activeIndIndex].description}
                        </p>
                      </div>

                      <div className="space-y-6 relative z-10">
                         <h4 className="text-white font-bold text-xl flex items-center gap-2">
                           <Target size={20} className="text-accent" /> 业务功能特色
                         </h4>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           {data.industryDetails[activeIndIndex].features.map((feature, fIdx) => (
                             <div key={fIdx} className="flex items-start gap-4 p-5 bg-white/5 rounded-2xl border border-white/5 group hover:border-accent/30 transition-all">
                               <CheckCircle2 className="text-accent shrink-0 mt-0.5" size={20} />
                               <span className="text-slate-200 font-medium group-hover:text-white transition-colors">{feature}</span>
                             </div>
                           ))}
                         </div>
                      </div>

                      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex gap-3">
                          {data.industryTags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-slate-800 text-slate-500 rounded-lg text-xs font-bold uppercase tracking-widest">#{tag}</span>
                          ))}
                        </div>
                        <Link to="/about" className="flex items-center gap-2 bg-white/5 px-6 py-3 rounded-xl text-white font-bold hover:bg-white/10 transition-all">
                          咨询行业专家 <ChevronRight size={18} />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'case' && (
            <div className="space-y-12">
              {/* Industry Filter */}
              <div className="flex flex-wrap gap-4 items-center bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                <span className="text-slate-500 font-medium">筛选行业：</span>
                {industries.map(ind => (
                  <button 
                    key={ind}
                    onClick={() => setSelectedIndustry(ind)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${selectedIndustry === ind ? 'bg-accent text-primary' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                  >
                    {ind === 'all' ? '全部行业' : ind}
                  </button>
                ))}
              </div>

              {/* Case Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredCases.map(c => (
                  <Link 
                    key={c.id}
                    to={`/case/${c.id}`}
                    className="group flex flex-col md:flex-row glass rounded-3xl overflow-hidden hover:bg-white/10 transition-all border border-slate-800 h-auto md:h-64"
                  >
                    <div className="w-full md:w-1/3 h-48 md:h-full overflow-hidden">
                      <img src={c.imageUrl} alt={c.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="p-8 flex flex-col justify-between w-full md:w-2/3">
                      <div>
                        <span className="text-accent text-xs font-bold uppercase tracking-widest">{c.industry}</span>
                        <h3 className="text-xl font-bold text-white mt-2 group-hover:text-accent transition-colors">{c.name}</h3>
                        <p className="text-slate-400 text-sm mt-4 line-clamp-2 leading-relaxed">{c.summary}</p>
                      </div>
                      <div className="mt-6 flex items-center text-xs text-slate-500 font-bold group-hover:text-accent">
                        查看详情 <ChevronRight size={14} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
