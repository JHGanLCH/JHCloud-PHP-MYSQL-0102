import React, { useState } from 'react';
import { SiteData, News, Product, Case } from '../types';
// Import RefreshCw from lucide-react
import { 
  Plus, Trash2, Edit2, Save, X, LayoutDashboard, FileText, 
  Package, Briefcase, Info, Lock, LogOut, User, MapPin, Phone, Mail, 
  Settings, Check, AlertCircle, Target, CloudUpload, RefreshCw
} from 'lucide-react';

interface AdminDashboardProps {
  data: SiteData;
  setData: (updatedData: SiteData) => void; // 修改为直接接收更新后的数据对象
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ data, setData }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [activeView, setActiveView] = useState<'news' | 'products' | 'cases' | 'basic' | 'settings'>('news');
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [authError, setAuthError] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'done'>('idle');

  // Authentication Logic
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === data.admin.username && loginForm.password === data.admin.passwordHash) {
      setIsLoggedIn(true);
      setAuthError('');
    } else {
      setAuthError('用户名或密码错误');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginForm({ username: '', password: '' });
  };

  // 统一保存入口：触发父组件的同步逻辑
  const triggerSave = (partialUpdate: Partial<SiteData>) => {
    setSaveStatus('saving');
    const nextData = { ...data, ...partialUpdate };
    setData(nextData);
    
    // 给用户一个视觉反馈
    setTimeout(() => {
      setSaveStatus('done');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 500);
  };

  const updateTechFeature = (index: number, field: 'title' | 'items', value: string) => {
    const newFeatures = [...(data.techFeatures || [])];
    if (field === 'title') {
      newFeatures[index].title = value;
    } else {
      newFeatures[index].items = value.split('\n').filter(s => s.trim());
    }
    triggerSave({ techFeatures: newFeatures });
  };

  const updateIndustryDetail = (index: number, field: 'description' | 'features' | 'name', value: string) => {
    const newDetails = [...(data.industryDetails || [])];
    if (field === 'description') {
      newDetails[index].description = value;
    } else if (field === 'name') {
      newDetails[index].name = value;
    } else {
      newDetails[index].features = value.split('\n').filter(s => s.trim());
    }
    triggerSave({ industryDetails: newDetails });
  };

  // CRUD HELPERS
  const handleEditNews = (news: News) => {
    setEditingItem(news);
    setShowEditModal(true);
  };

  const handleDeleteNews = (id: string) => {
    if (window.confirm('确认删除此新闻？')) {
      triggerSave({ news: data.news.filter(n => n.id !== id) });
    }
  };

  const handleSaveNews = (news: News) => {
    const exists = data.news.find(n => n.id === news.id);
    let newNews;
    if (exists) {
      newNews = data.news.map(n => n.id === news.id ? news : n);
    } else {
      newNews = [news, ...data.news];
    }
    triggerSave({ news: newNews });
    setShowEditModal(false);
  };

  const handleEditProduct = (p: Product) => {
    setEditingItem(p);
    setShowEditModal(true);
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('确认删除此产品？')) {
      triggerSave({ products: data.products.filter(p => p.id !== id) });
    }
  };

  const handleSaveProduct = (p: Product) => {
    const exists = data.products.find(item => item.id === p.id);
    let newProds;
    if (exists) {
      newProds = data.products.map(item => item.id === p.id ? p : item);
    } else {
      newProds = [...data.products, p];
    }
    triggerSave({ products: newProds });
    setShowEditModal(false);
  };

  const handleEditCase = (c: Case) => {
    setEditingItem(c);
    setShowEditModal(true);
  };

  const handleDeleteCase = (id: string) => {
    if (window.confirm('确认删除此案例？')) {
      triggerSave({ cases: data.cases.filter(item => item.id !== id) });
    }
  };

  const handleSaveCase = (c: Case) => {
    const exists = data.cases.find(item => item.id === c.id);
    let newCases;
    if (exists) {
      newCases = data.cases.map(item => item.id === c.id ? c : item);
    } else {
      newCases = [...data.cases, c];
    }
    triggerSave({ cases: newCases });
    setShowEditModal(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md glass p-10 rounded-[2.5rem] border border-white/10 shadow-2xl space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/20 rounded-3xl text-accent mb-6">
              <Lock size={40} />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">后台管理系统</h1>
            <p className="text-slate-500 mt-2">Jiahe Yunwang Admin Console</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">用户名</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="text"
                  required
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-accent outline-none transition-colors"
                  placeholder="请输入用户名"
                  value={loginForm.username}
                  onChange={e => setLoginForm({...loginForm, username: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">密码</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="password"
                  required
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-accent outline-none transition-colors"
                  placeholder="请输入密码"
                  value={loginForm.password}
                  onChange={e => setLoginForm({...loginForm, password: e.target.value})}
                />
              </div>
            </div>

            {authError && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-4 rounded-xl border border-red-400/20">
                <AlertCircle size={16} /> {authError}
              </div>
            )}

            <button 
              type="submit"
              className="w-full py-4 bg-accent text-primary font-black rounded-2xl hover:scale-[1.02] transition-all shadow-[0_10px_30px_rgba(16,185,129,0.3)] active:scale-95"
            >
              登录系统
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 flex flex-col lg:flex-row gap-12 items-start">
      {/* Sidebar */}
      <aside className="w-full lg:w-72 flex-shrink-0 space-y-4">
        <div className="p-6 mb-2 bg-slate-900 rounded-[2rem] border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 blur-3xl rounded-full -mr-10 -mt-10" />
          <h2 className="font-bold text-white flex items-center gap-3 relative z-10 text-lg">
            <LayoutDashboard size={20} className="text-accent" /> 管理面板
          </h2>
          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest relative z-10">Welcome, {data.admin.username}</p>
          
          {/* 保存状态反馈 */}
          <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
            {saveStatus === 'saving' && <><RefreshCw size={12} className="animate-spin text-accent"/> <span className="text-[10px] text-accent">同步中...</span></>}
            {saveStatus === 'done' && <><Check size={12} className="text-green-400"/> <span className="text-[10px] text-green-400">已保存至服务器</span></>}
            {saveStatus === 'idle' && <><CloudUpload size={12} className="text-slate-600"/> <span className="text-[10px] text-slate-600">云端已同步</span></>}
          </div>
        </div>
        
        <nav className="space-y-2">
          {[
            { id: 'news', label: '新闻动态', icon: <FileText size={18} /> },
            { id: 'products', label: '产品中心', icon: <Package size={18} /> },
            { id: 'cases', label: '行业案例', icon: <Briefcase size={18} /> },
            { id: 'basic', label: '内容维护', icon: <Info size={18} /> },
            { id: 'settings', label: '系统设置', icon: <Settings size={18} /> },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveView(item.id as any)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${activeView === item.id ? 'bg-accent text-primary shadow-lg shadow-accent/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            >
              {item.icon} {item.label}
            </button>
          ))}
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-4 rounded-2xl font-bold text-red-400 hover:bg-red-400/10 transition-all mt-8"
          >
            <LogOut size={18} /> 退出系统
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow w-full glass p-8 rounded-[3rem] border border-white/5 relative overflow-hidden min-h-[700px]">
        {activeView === 'news' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-3xl font-bold text-white">新闻管理</h3>
                <p className="text-slate-500 text-sm mt-1">管理首页与发现公司页面的新闻内容</p>
              </div>
              <button 
                onClick={() => {
                  setEditingItem({ id: Date.now().toString(), title: '', summary: '', content: '', imageUrl: 'https://picsum.photos/seed/'+Date.now()+'/800/600', date: new Date().toISOString().split('T')[0], clicks: 0, isPinned: false, createdAt: Date.now() });
                  setShowEditModal(true);
                }}
                className="flex items-center gap-2 bg-accent text-primary px-6 py-3 rounded-2xl font-black shadow-xl hover:scale-105 transition-all w-full sm:w-auto justify-center"
              >
                <Plus size={20} /> 发布新动态
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {data.news.map(n => (
                <div key={n.id} className="group flex items-center justify-between p-5 bg-slate-900/60 rounded-3xl border border-slate-800 hover:border-accent/40 transition-all">
                  <div className="flex gap-6 items-center min-w-0">
                    <img src={n.imageUrl} className="w-24 h-16 object-cover rounded-2xl shadow-lg shrink-0" alt="thumb" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {n.isPinned && <span className="bg-accent/20 text-accent text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">置顶</span>}
                        <span className="text-slate-500 text-[10px]">{n.date}</span>
                      </div>
                      <h4 className="font-bold text-white truncate text-lg">{n.title}</h4>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => handleEditNews(n)} className="p-3 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white rounded-xl transition-all"><Edit2 size={18} /></button>
                    <button onClick={() => handleDeleteNews(n.id)} className="p-3 bg-red-400/10 text-red-400 hover:bg-red-400/20 rounded-xl transition-all"><Trash2 size={18} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeView === 'products' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="text-3xl font-bold text-white">产品矩阵</h3>
              <button 
                onClick={() => {
                  setEditingItem({ id: 'p' + Date.now(), name: '', description: '', imageUrl: 'https://picsum.photos/seed/'+Date.now()+'/800/600', fullSpecs: '', features: [] });
                  setShowEditModal(true);
                }}
                className="flex items-center gap-2 bg-accent text-primary px-6 py-3 rounded-2xl font-black transition-all w-full sm:w-auto justify-center"
              >
                <Plus size={20} /> 添加产品
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.products.map(p => (
                <div key={p.id} className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
                  <div className="h-32 rounded-2xl overflow-hidden">
                    <img src={p.imageUrl} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="text-xl font-bold text-white">{p.name}</h4>
                  <div className="flex gap-2 pt-2">
                    <button onClick={() => handleEditProduct(p)} className="flex-grow py-3 bg-white/5 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all"><Edit2 size={16}/>编辑</button>
                    <button onClick={() => handleDeleteProduct(p.id)} className="px-4 py-3 bg-red-400/10 text-red-400 rounded-xl hover:bg-red-400/20 transition-all"><Trash2 size={16}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeView === 'cases' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-3xl font-bold text-white">案例管理</h3>
                <p className="text-slate-500 text-sm mt-1">维护核心行业案例</p>
              </div>
              <button 
                onClick={() => {
                  setEditingItem({ 
                    id: 'c' + Date.now(), 
                    industry: '', 
                    name: '', 
                    logoUrl: 'https://picsum.photos/seed/logo'+Date.now()+'/200/200', 
                    summary: '', 
                    content: '', 
                    imageUrl: 'https://picsum.photos/seed/full'+Date.now()+'/800/400',
                    relatedProducts: []
                  });
                  setShowEditModal(true);
                }}
                className="flex items-center gap-2 bg-accent text-primary px-6 py-3 rounded-2xl font-black transition-all w-full sm:w-auto justify-center"
              >
                <Plus size={20} /> 添加案例
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {data.cases.map(c => (
                <div key={c.id} className="flex items-center justify-between p-5 bg-slate-900 rounded-3xl border border-slate-800">
                  <div className="flex gap-6 items-center">
                    <div className="w-12 h-12 bg-white rounded-xl p-2 shrink-0 flex items-center justify-center">
                      <img src={c.logoUrl} className="w-full h-full object-contain" alt="Logo" />
                    </div>
                    <div>
                      <span className="text-accent text-[10px] font-bold uppercase">{c.industry}</span>
                      <h4 className="font-bold text-white text-lg">{c.name}</h4>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => handleEditCase(c)} className="p-3 text-slate-400 hover:text-white transition-all"><Edit2 size={20} /></button>
                    <button onClick={() => handleDeleteCase(c.id)} className="p-3 text-red-400 hover:text-red-300 transition-all"><Trash2 size={20} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeView === 'basic' && (
          <div className="space-y-12">
            <div>
              <h3 className="text-3xl font-bold text-white mb-8">全站内容板块维护</h3>
              <div className="grid grid-cols-1 gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-400 uppercase ml-1">公司简介</label>
                  <textarea 
                    className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 text-slate-300 h-64 focus:border-accent outline-none"
                    value={data.companyIntro}
                    onChange={(e) => triggerSave({ companyIntro: e.target.value })}
                  />
                </div>
                
                <div className="grid grid-cols-1 gap-8 border-t border-white/5 pt-8">
                  <h4 className="text-xl font-bold text-accent">产品页 - 技术优势</h4>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-400 uppercase ml-1">技术介绍主文</label>
                    <textarea 
                      className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 text-slate-300 h-32 focus:border-accent outline-none"
                      value={data.techContent}
                      onChange={(e) => triggerSave({ techContent: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {(data.techFeatures || []).map((feature, idx) => (
                      <div key={idx} className="space-y-4 p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
                        <h5 className="text-accent font-bold text-xs uppercase tracking-widest mb-2">技术亮点 {idx + 1}</h5>
                        <input 
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:border-accent outline-none"
                          value={feature.title}
                          onChange={e => updateTechFeature(idx, 'title', e.target.value)}
                        />
                        <textarea 
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 h-32 focus:border-accent outline-none text-sm"
                          value={feature.items.join('\n')}
                          onChange={e => updateTechFeature(idx, 'items', e.target.value)}
                          placeholder="一行一个功能点"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-8 border-t border-white/5 pt-8">
                   <h4 className="text-xl font-bold text-accent flex items-center gap-2">
                     <Target size={24}/> 产品页 - 行业深度特色
                   </h4>
                   <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-400 uppercase ml-1">行业版块引言</label>
                    <textarea 
                      className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 text-slate-300 h-32 focus:border-accent outline-none"
                      value={data.industryContent}
                      onChange={(e) => triggerSave({ industryContent: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {(data.industryDetails || []).map((ind, idx) => (
                      <div key={idx} className="space-y-4 p-8 bg-slate-900/50 rounded-3xl border border-slate-800 hover:border-accent/40 transition-all">
                        <h5 className="text-accent font-bold text-sm uppercase tracking-widest border-b border-white/5 pb-4 mb-4">
                          {ind.name} 详情维护
                        </h5>
                        <input 
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:border-accent outline-none"
                          value={ind.name}
                          onChange={e => updateIndustryDetail(idx, 'name', e.target.value)}
                        />
                        <textarea 
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 h-24 focus:border-accent outline-none text-sm"
                          value={ind.description}
                          onChange={e => updateIndustryDetail(idx, 'description', e.target.value)}
                          placeholder="行业挑战描述"
                        />
                        <textarea 
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 h-40 focus:border-accent outline-none text-sm"
                          value={ind.features.join('\n')}
                          onChange={e => updateIndustryDetail(idx, 'features', e.target.value)}
                          placeholder="核心功能列表 (一行一个)"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-white/5">
              <h3 className="text-2xl font-bold text-white mb-6">联系信息维护</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <input 
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-white focus:border-accent outline-none"
                  value={data.contact.address}
                  onChange={e => triggerSave({ contact: { ...data.contact, address: e.target.value } })}
                  placeholder="公司地址"
                />
                <input 
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-white focus:border-accent outline-none"
                  value={data.contact.phone}
                  onChange={e => triggerSave({ contact: { ...data.contact, phone: e.target.value } })}
                  placeholder="联系电话"
                />
                <input 
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-white focus:border-accent outline-none"
                  value={data.contact.email}
                  onChange={e => triggerSave({ contact: { ...data.contact, email: e.target.value } })}
                  placeholder="企业邮箱"
                />
              </div>
            </div>
          </div>
        )}

        {activeView === 'settings' && (
          <div className="max-w-2xl">
            <h3 className="text-3xl font-bold text-white mb-8">管理员设置</h3>
            <div className="space-y-8 glass p-10 rounded-[2.5rem] border border-white/5">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 uppercase">管理用户名</label>
                  <input 
                    className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white focus:border-accent outline-none"
                    value={data.admin.username}
                    onChange={e => triggerSave({ admin: { ...data.admin, username: e.target.value } })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 uppercase">修改密码</label>
                  <input 
                    type="password"
                    placeholder="输入新密码"
                    className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white focus:border-accent outline-none"
                    value={data.admin.passwordHash}
                    onChange={e => triggerSave({ admin: { ...data.admin, passwordHash: e.target.value } })}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Edit Modal (保持原有结构，仅更新保存动作调用 triggerSave) */}
      {showEditModal && editingItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-xl bg-primary/40">
          <div className="bg-slate-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.5)] p-10 space-y-8">
            <div className="flex justify-between items-center border-b border-white/5 pb-6">
              <h2 className="text-3xl font-bold text-white">正在编辑内容</h2>
              <button onClick={() => setShowEditModal(false)} className="p-3 bg-white/5 text-slate-400 hover:text-white rounded-full transition-all"><X size={24} /></button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {activeView === 'news' && (
                  <>
                    <input className="w-full bg-slate-800 border-none rounded-2xl p-4 text-white outline-none" placeholder="标题" value={editingItem.title} onChange={e => setEditingItem({...editingItem, title: e.target.value})}/>
                    <textarea className="w-full bg-slate-800 border-none rounded-2xl p-4 text-white h-24 outline-none" placeholder="摘要" value={editingItem.summary} onChange={e => setEditingItem({...editingItem, summary: e.target.value})}/>
                  </>
                )}
                {activeView === 'products' && (
                   <>
                    <input className="w-full bg-slate-800 border-none rounded-2xl p-4 text-white outline-none" placeholder="产品名" value={editingItem.name} onChange={e => setEditingItem({...editingItem, name: e.target.value})}/>
                    <textarea className="w-full bg-slate-800 border-none rounded-2xl p-4 text-white h-24 outline-none" placeholder="简介" value={editingItem.description} onChange={e => setEditingItem({...editingItem, description: e.target.value})}/>
                   </>
                )}
                {activeView === 'cases' && (
                   <>
                    <input className="w-full bg-slate-800 border-none rounded-2xl p-4 text-white outline-none" placeholder="案例名" value={editingItem.name} onChange={e => setEditingItem({...editingItem, name: e.target.value})}/>
                    <input className="w-full bg-slate-800 border-none rounded-2xl p-4 text-white outline-none" placeholder="行业领域" value={editingItem.industry} onChange={e => setEditingItem({...editingItem, industry: e.target.value})}/>
                   </>
                )}
                <input className="w-full bg-slate-800 border-none rounded-2xl p-4 text-white outline-none" placeholder="图片 URL" value={editingItem.imageUrl} onChange={e => setEditingItem({...editingItem, imageUrl: e.target.value})}/>
              </div>

              <div className="space-y-6">
                  <textarea 
                    className="w-full bg-slate-800 border-none rounded-2xl p-4 text-white h-[400px] outline-none"
                    placeholder="详细正文 / 技术规格"
                    value={activeView === 'products' ? editingItem.fullSpecs : editingItem.content}
                    onChange={e => activeView === 'products' ? setEditingItem({...editingItem, fullSpecs: e.target.value}) : setEditingItem({...editingItem, content: e.target.value})}
                  />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-8 border-t border-white/5">
              <button onClick={() => setShowEditModal(false)} className="px-8 py-3 bg-white/5 text-white font-bold rounded-2xl hover:bg-white/10 transition-all">取消</button>
              <button 
                onClick={() => {
                  if (activeView === 'news') handleSaveNews(editingItem);
                  else if (activeView === 'products') handleSaveProduct(editingItem);
                  else if (activeView === 'cases') handleSaveCase(editingItem);
                }}
                className="flex items-center gap-2 px-10 py-3 bg-accent text-primary font-black rounded-2xl shadow-xl hover:scale-105 transition-all"
              >
                <Save size={20} /> 提交并保存至服务器
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;