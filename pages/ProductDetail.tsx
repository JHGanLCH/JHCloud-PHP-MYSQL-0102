
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../types';
import { ChevronLeft, CheckCircle2, PlayCircle, Settings } from 'lucide-react';

interface ProductDetailProps {
  products: Product[];
}

const ProductDetail: React.FC<ProductDetailProps> = ({ products }) => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) return <div className="container mx-auto p-20 text-center">产品未找到</div>;

  return (
    <div className="container mx-auto px-8 py-16">
      <Link to="/products" className="flex items-center gap-2 text-accent mb-12 hover:translate-x-[-4px] transition-transform">
        <ChevronLeft size={20} /> 返回产品矩阵
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24 animate-in fade-in duration-1000">
        <div className="space-y-8">
          <div className="flex items-center gap-2 text-accent font-bold text-sm tracking-widest uppercase">
            <Settings size={16} /> 核心产品系列
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white">{product.name}</h1>
          <p className="text-slate-400 text-xl leading-relaxed">{product.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(product.features || ['实时同步', '智能预测', '多端协同', '私有部署']).map(feature => (
              <div key={feature} className="flex items-center gap-3 text-white">
                <CheckCircle2 size={20} className="text-accent" /> {feature}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
             <a href="http://210.12.53.106:97/" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-8 py-4 bg-accent text-primary rounded-full font-bold shadow-xl hover:scale-105 transition-all">
               <PlayCircle size={20} /> 立即在线体验
             </a>
             <button className="px-8 py-4 border border-slate-700 rounded-full font-bold text-white hover:bg-white/5 transition-colors">
               咨询技术方案
             </button>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-10 bg-accent/20 blur-[100px] rounded-full opacity-30" />
          <img src={product.imageUrl} alt={product.name} className="relative z-10 rounded-3xl shadow-2xl w-full" />
        </div>
      </div>

      <div className="glass p-12 rounded-[40px] space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-white">技术规格与功能说明</h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
        </div>
        <div className="prose prose-invert prose-lg max-w-none text-slate-300 whitespace-pre-wrap leading-loose">
          {product.fullSpecs}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
