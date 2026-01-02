
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SiteData, News } from '../types';
import { Calendar, Eye, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  data: SiteData;
}

const AboutPage: React.FC<AboutPageProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'intro' | 'news'>('intro');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Changed from 5 to 10

  const totalPages = Math.ceil(data.news.length / itemsPerPage);
  const currentNews = data.news.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-slate-900 border-b border-white/5">
        <div className="container mx-auto px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">发现嘉禾云网</h1>
          <p className="text-slate-400">了解我们的使命、团队以及最新的公司动态</p>
        </div>
      </section>

      <div className="container mx-auto px-8 py-12">
        {/* Navigation Tabs */}
        <div className="flex gap-8 border-b border-slate-800 mb-12">
          <button 
            onClick={() => { setActiveTab('intro'); setCurrentPage(1); }}
            className={`pb-4 text-lg font-bold transition-all relative ${activeTab === 'intro' ? 'text-accent' : 'text-slate-500 hover:text-white'}`}
          >
            公司简介
            {activeTab === 'intro' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent rounded-full" />}
          </button>
          <button 
            onClick={() => { setActiveTab('news'); setCurrentPage(1); }}
            className={`pb-4 text-lg font-bold transition-all relative ${activeTab === 'news' ? 'text-accent' : 'text-slate-500 hover:text-white'}`}
          >
            公司新闻
            {activeTab === 'news' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent rounded-full" />}
          </button>
        </div>

        {/* Tab Content */}
        <div className="animate-in fade-in duration-500">
          {activeTab === 'intro' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed text-lg">
                  {data.companyIntro.split('\n').map((para, i) => (
                    <p key={i} className="mb-4">{para}</p>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-6 pt-8">
                  <div className="glass p-6 rounded-2xl">
                    <p className="text-accent text-3xl font-bold mb-1">10+</p>
                    <p className="text-slate-500 text-sm">制造业深耕经验</p>
                  </div>
                  <div className="glass p-6 rounded-2xl">
                    <p className="text-techBlue text-3xl font-bold mb-1">50+</p>
                    <p className="text-slate-500 text-sm">大型企业客户</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-accent/20 blur-3xl rounded-full opacity-50" />
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
                  alt="Company Office" 
                  className="rounded-3xl shadow-2xl relative z-10 w-full"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 gap-6">
                {currentNews.map((item) => (
                  <Link 
                    key={item.id} 
                    to={`/news/${item.id}`}
                    className="glass p-6 rounded-2xl hover:bg-white/10 transition-all flex flex-col md:flex-row gap-8 items-center"
                  >
                    <div className="w-full md:w-64 h-40 shrink-0 overflow-hidden rounded-xl">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="text-slate-500 text-sm flex items-center gap-1"><Calendar size={14} /> {item.date}</span>
                        <span className="text-slate-500 text-sm flex items-center gap-1"><Eye size={14} /> {item.clicks}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-accent">{item.title}</h3>
                      <p className="text-slate-400 line-clamp-2">{item.summary}</p>
                    </div>
                    <div className="p-4 rounded-full bg-accent/10 text-accent">
                      <ArrowRight />
                    </div>
                  </Link>
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-12">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setCurrentPage(i + 1);
                        window.scrollTo({ top: 300, behavior: 'smooth' });
                      }}
                      className={`w-10 h-10 rounded-lg font-bold transition-all ${currentPage === i + 1 ? 'bg-accent text-primary' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
