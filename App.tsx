import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  Info, 
  Box, 
  PlayCircle, 
  MapPin,
  Phone,
  Mail,
  Menu,
  X,
  Settings as AdminIcon,
  RefreshCw
} from 'lucide-react';

import { News, Product, Case, SiteData } from './types';
import { 
  INITIAL_NEWS, 
  INITIAL_PRODUCTS, 
  INITIAL_CASES, 
  INITIAL_COMPANY_INTRO, 
  TECH_SPECS_DEFAULT, 
  TECH_FEATURES_DEFAULT,
  INDUSTRY_FEATURES_DEFAULT,
  INDUSTRY_DETAILS_DEFAULT,
  INDUSTRY_TAGS_DEFAULT,
  INDUSTRY_STAT_VALUE_DEFAULT,
  INDUSTRY_STAT_LABEL_DEFAULT,
  INDUSTRY_IMAGE_URL_DEFAULT,
  DEFAULT_ADMIN,
  DEFAULT_CONTACT
} from './constants';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import NewsDetail from './pages/NewsDetail';
import CaseDetail from './pages/CaseDetail';
import ProductDetail from './pages/ProductDetail';
import AdminDashboard from './pages/AdminDashboard';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<SiteData>({
    news: INITIAL_NEWS,
    products: INITIAL_PRODUCTS,
    cases: INITIAL_CASES,
    companyIntro: INITIAL_COMPANY_INTRO,
    techContent: TECH_SPECS_DEFAULT,
    techFeatures: TECH_FEATURES_DEFAULT,
    industryContent: INDUSTRY_FEATURES_DEFAULT,
    industryDetails: INDUSTRY_DETAILS_DEFAULT,
    industryTags: INDUSTRY_TAGS_DEFAULT,
    industryStatValue: INDUSTRY_STAT_VALUE_DEFAULT,
    industryStatLabel: INDUSTRY_STAT_LABEL_DEFAULT,
    industryImageUrl: INDUSTRY_IMAGE_URL_DEFAULT,
    admin: DEFAULT_ADMIN,
    contact: DEFAULT_CONTACT
  });

  useEffect(() => {
    const loadServerData = async () => {
      try {
        const response = await fetch('api.php');
        // 先检查响应状态，防止解析 HTML 错误页面为 JSON
        if (response.ok) {
          const serverData = await response.json();
          if (serverData && !serverData.error && serverData.news) {
            setData(serverData);
            console.log("已成功加载服务器最新配置");
          }
        }
      } catch (err) {
        console.warn("未能从 api.php 加载数据，系统将使用代码预设值运行。", err);
      } finally {
        // 延迟一小会儿关闭加载动画，体验更平滑
        setTimeout(() => setLoading(false), 800);
      }
    };

    loadServerData();
  }, []);

  const syncWithServer = async (updatedData: SiteData) => {
    setData(updatedData);
    try {
      const response = await fetch('api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      const result = await response.json();
      if (!result.success) {
        alert("服务器保存失败: " + result.message);
      }
    } catch (err) {
      console.error("保存请求失败:", err);
      alert("无法保存。请确认 api.php 存在于服务器根目录，且文件夹具有写入权限（755/777）。");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex flex-col items-center justify-center text-white gap-6">
        <div className="relative">
          <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full animate-pulse" />
          <RefreshCw className="animate-spin text-accent relative z-10" size={56} />
        </div>
        <div className="text-center space-y-2">
          <p className="font-bold tracking-[0.3em] text-sm uppercase text-accent">JIAHE CLOUD NET</p>
          <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">初始化云端引擎...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-primary text-slate-200">
        <Header />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<HomePage data={data} />} />
            <Route path="/about" element={<AboutPage data={data} />} />
            <Route path="/products" element={<ProductsPage data={data} />} />
            <Route path="/news/:id" element={<NewsDetail news={data.news} />} />
            <Route path="/case/:id" element={<CaseDetail cases={data.cases} />} />
            <Route path="/product/:id" element={<ProductDetail products={data.products} />} />
            <Route path="/admin" element={<AdminDashboard data={data} setData={syncWithServer as any} />} />
          </Routes>
        </main>
        <Footer data={data} />
      </div>
    </Router>
  );
};

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '首页', path: '/', icon: <HomeIcon size={18} /> },
    { name: '发现公司', path: '/about', icon: <Info size={18} /> },
    { name: '产品介绍', path: '/products', icon: <Box size={18} /> },
    { name: '在线体验', path: 'http://210.12.53.106:97/', isExternal: true, icon: <PlayCircle size={18} /> },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-primary/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-primary font-bold text-xl shadow-[0_0_15px_rgba(16,185,129,0.5)] group-hover:scale-110 transition-transform">
            JH
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white leading-none">嘉禾云网</h1>
            <p className="text-[10px] text-accent uppercase tracking-[0.2em]">Jiahe Yunwang Tech</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.isExternal ? (
              <a 
                key={link.name} 
                href={link.path} 
                target="_blank" 
                rel="noreferrer"
                className="text-sm font-medium hover:text-accent transition-colors flex items-center gap-1"
              >
                {link.icon} {link.name}
              </a>
            ) : (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-sm font-medium transition-colors flex items-center gap-1 ${location.pathname === link.path ? 'text-accent' : 'text-slate-300 hover:text-white'}`}
              >
                {link.icon} {link.name}
              </Link>
            )
          ))}
          <Link to="/admin" className="p-2 text-slate-500 hover:text-accent transition-colors"><AdminIcon size={18}/></Link>
        </nav>

        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 top-[70px] bg-primary z-40 md:hidden flex flex-col p-8 gap-6 animate-in slide-in-from-right duration-300">
          {navLinks.map((link) => (
            <div key={link.name} onClick={() => setIsMenuOpen(false)}>
              {link.isExternal ? (
                <a href={link.path} target="_blank" rel="noreferrer" className="text-2xl font-bold flex items-center gap-3">
                  {link.icon} {link.name}
                </a>
              ) : (
                <Link to={link.path} className="text-2xl font-bold flex items-center gap-3">
                  {link.icon} {link.name}
                </Link>
              )}
            </div>
          ))}
          <Link to="/admin" className="text-2xl font-bold flex items-center gap-3 text-slate-600" onClick={() => setIsMenuOpen(false)}>
            <AdminIcon size={24} /> 系统管理
          </Link>
        </div>
      )}
    </header>
  );
};

const Footer: React.FC<{data: SiteData}> = ({ data }) => {
  return (
    <footer id="footer" className="bg-slate-950 border-t border-slate-900 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent rounded flex items-center justify-center text-primary font-bold text-sm">JH</div>
              <h2 className="text-lg font-bold text-white">嘉禾云网</h2>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              助力智能制造，塑造智慧企业。我们致力于为制造业提供一流的智能制造平台与数字化转型服务。
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-white font-semibold">快速链接</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-slate-400">
              <Link to="/" className="hover:text-accent transition-colors">首页</Link>
              <Link to="/about" className="hover:text-accent transition-colors">公司介绍</Link>
              <Link to="/products" className="hover:text-accent transition-colors">核心产品</Link>
              <a href="http://210.12.53.106:97/" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">在线体验</a>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-white font-semibold">联系我们</h3>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-accent shrink-0" />
                <span>{data.contact.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-accent shrink-0" />
                <span>{data.contact.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-accent shrink-0" />
                <span>{data.contact.email}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2024 北京嘉禾云网科技有限公司. 版权所有.</p>
          <div className="flex gap-6">
            <span className="cursor-pointer hover:text-accent">隐私政策</span>
            <span className="cursor-pointer hover:text-accent">服务条款</span>
            <span className="cursor-pointer hover:text-accent">京ICP备16060152号-1</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default App;