
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Calendar, ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';
import { SiteData } from '../types';

interface HomePageProps {
  data: SiteData;
}

const HomePage: React.FC<HomePageProps> = ({ data }) => {
  // Row 2: Hero Carousel State
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = useMemo(() => [
    { image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000', title: '助力智能制造', subtitle: 'Empowering Smart Manufacturing' },
    { image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=2000', title: '塑造智慧企业', subtitle: 'Shaping Smart Enterprise' },
    { image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000', title: '数据驱动决策', subtitle: 'Data-Driven Decision Making' },
  ], []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Row 3: News Sorting
  const sortedNews = useMemo(() => [...data.news].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return b.createdAt - a.createdAt;
  }).slice(0, 5), [data.news]);

  // Row 4: Industry Cases Carousel Logic
  const industryCases = useMemo(() => {
    const industries = Array.from(new Set(data.cases.map(c => c.industry)));
    return industries.map(ind => data.cases.find(c => c.industry === ind)).filter(Boolean);
  }, [data.cases]);

  const [caseIndex, setCaseIndex] = useState(0);
  const itemsVisible = 3; // Number of items visible on desktop
  const maxIndex = Math.max(0, industryCases.length - itemsVisible);

  const nextCase = () => {
    setCaseIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevCase = () => {
    setCaseIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Auto-play for cases
  useEffect(() => {
    const timer = setInterval(nextCase, 5000);
    return () => clearInterval(timer);
  }, [maxIndex, industryCases.length]);

  return (
    <div className="space-y-0">
      {/* Row 2: Hero Carousel - Height set to 85vh */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        {slides.map((slide, idx) => (
          <div 
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${idx === activeSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/40 to-transparent z-10" />
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 z-20 flex items-center container mx-auto px-8">
              <div className="max-w-2xl space-y-6 animate-in slide-in-from-left duration-1000">
                <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                  {slide.title}
                </h2>
                <p className="text-accent text-xl font-medium tracking-widest uppercase">{slide.subtitle}</p>
                <div className="flex gap-4 pt-4">
                  <Link to="/products" className="bg-accent text-primary px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                    查看产品
                  </Link>
                  <a href="http://210.12.53.106:97/" target="_blank" rel="noreferrer" className="glass text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-colors">
                    在线体验
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-10 right-10 z-30 flex gap-2">
          {slides.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setActiveSlide(i)}
              className={`w-3 h-3 rounded-full transition-all ${i === activeSlide ? 'bg-accent w-10' : 'bg-white/30'}`}
            />
          ))}
        </div>
      </section>

      {/* Row 3: Company News - Further reduced pb-8 for tighter layout */}
      <section className="pt-12 pb-8 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-techBlue/10 blur-[120px] rounded-full" />
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-1 bg-accent inline-block"></span>
                公司新闻 <span className="text-slate-500 font-normal text-xl">/ NEWS</span>
              </h2>
            </div>
            <Link to="/about" className="text-accent hover:underline flex items-center gap-1 text-sm font-medium">
              查看更多 <ArrowRight size={16} />
            </Link>
          </div>

          <div className="space-y-6">
            {sortedNews.map((item) => (
              <Link 
                key={item.id} 
                to={`/news/${item.id}`}
                className="group block glass rounded-3xl overflow-hidden hover:bg-white/10 transition-all border-l-4 border-l-transparent hover:border-l-accent"
              >
                <div className="flex flex-col md:flex-row h-auto md:h-48">
                  <div className="w-full md:w-80 overflow-hidden h-48 shrink-0">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-8 flex-grow flex flex-col justify-center min-w-0">
                    <div className="flex items-center gap-4 mb-3">
                      {item.isPinned && <span className="bg-accent/20 text-accent text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider shrink-0 border border-accent/20">置顶推荐</span>}
                      <span className="text-slate-500 text-sm flex items-center gap-1.5 shrink-0"><Calendar size={14}/> {item.date}</span>
                      <span className="text-slate-500 text-sm flex items-center gap-1.5 shrink-0"><Eye size={14}/> {item.clicks} 次浏览</span>
                    </div>
                    <h3 className="text-white font-bold text-xl md:text-2xl line-clamp-1 group-hover:text-accent transition-colors mb-4">{item.title}</h3>
                    <p className="text-slate-400 text-sm md:text-base line-clamp-2 leading-relaxed">{item.summary}</p>
                  </div>
                  <div className="hidden md:flex items-center px-12 text-slate-700 group-hover:text-accent transition-colors">
                    <ChevronRight size={32} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Row 4: Industry Cases Carousel - Further reduced pt to 12 for professional proximity */}
      <section className="pt-12 pb-32 bg-slate-900/30 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full -z-10" />
        
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16 space-y-4">
             <div className="inline-block px-4 py-1 bg-accent/10 rounded-full text-accent text-xs font-bold uppercase tracking-widest mb-2 border border-accent/20">
               Success Stories
             </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">行业经典案例</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-accent to-techBlue mx-auto rounded-full mt-4" />
          </div>
          
          <div className="relative group">
            {/* Carousel Container */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${caseIndex * (100 / itemsVisible)}%)` }}
              >
                {industryCases.map((item, idx) => item && (
                  <div key={item.id} className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-3">
                    <Link 
                      to={`/case/${item.id}`}
                      className="block relative h-full bg-slate-800/40 backdrop-blur-md rounded-[2.5rem] p-8 border border-slate-700 hover:border-accent/40 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(16,185,129,0.08)] group/card"
                    >
                      <div className="flex flex-col items-center text-center space-y-6">
                        {/* Centered Large Logo */}
                        <div className="relative">
                          <div className="absolute -inset-6 bg-accent/15 blur-2xl rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity" />
                          <div className="relative w-32 h-32 rounded-3xl bg-slate-900 p-6 shadow-xl border border-slate-700 group-hover/card:border-accent/50 transition-all duration-500 transform group-hover/card:scale-105">
                            <img src={item.logoUrl} alt={item.industry} className="w-full h-full object-contain grayscale group-hover/card:grayscale-0 transition-all duration-500" />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="inline-block px-3 py-1 bg-white/5 rounded-full text-accent text-[10px] font-bold tracking-widest uppercase">
                            {item.industry}
                          </div>
                          <h3 className="text-xl md:text-2xl font-bold text-white group-hover/card:text-accent transition-colors leading-tight line-clamp-1">
                            {item.name}
                          </h3>
                          <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
                            {item.summary}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-slate-700/50 w-full">
                           <span className="inline-flex items-center gap-2 text-accent text-xs font-bold hover:gap-3 transition-all">
                             了解方案详情 <ArrowRight size={14} />
                           </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            {industryCases.length > itemsVisible && (
              <>
                <button 
                  onClick={prevCase}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-800/90 border border-slate-700 text-white flex items-center justify-center hover:bg-accent hover:text-primary transition-all z-20 shadow-xl opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={nextCase}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-800/90 border border-slate-700 text-white flex items-center justify-center hover:bg-accent hover:text-primary transition-all z-20 shadow-xl opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Pagination Indicators */}
            <div className="flex justify-center gap-2 mt-10">
              {Array.from({ length: Math.max(1, industryCases.length - itemsVisible + 1) }).map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setCaseIndex(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${i === caseIndex ? 'w-8 bg-accent' : 'w-2 bg-slate-700 hover:bg-slate-600'}`}
                />
              ))}
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Link to="/products" className="inline-flex items-center gap-2 text-slate-500 hover:text-accent transition-all text-xs font-bold uppercase tracking-widest">
              查看全部行业业绩 <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
