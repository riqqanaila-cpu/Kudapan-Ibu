
import React from 'react';
import { Product } from '../types';
import { Plus } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart }) => {
  return (
    <section id="products" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl font-serif text-coffee font-bold">Our Signature Selection</h2>
        <div className="w-20 h-1 bg-terracotta mx-auto rounded-full opacity-50"></div>
        <p className="text-coffee-muted max-w-xl mx-auto italic">Each jar is filled with tradition and carefully packaged to preserve the authentic flavors of Mom's kitchen.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map((product) => (
          <div key={product.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-coffee/5">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-cream/90 backdrop-blur-sm text-terracotta text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm">
                  {product.category}
                </span>
              </div>
            </div>
            
            <div className="p-8 flex flex-col flex-grow space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-serif font-bold text-coffee group-hover:text-terracotta transition-colors">{product.name}</h3>
                <span className="text-terracotta font-semibold">
                  Rp {(product.price / 1000).toLocaleString()}k
                </span>
              </div>
              <p className="text-coffee-muted text-sm leading-relaxed flex-grow font-light">
                {product.description}
              </p>
              <button 
                onClick={() => onAddToCart(product)}
                className="w-full mt-6 py-4 border-2 border-terracotta text-terracotta font-semibold rounded-xl hover:bg-terracotta hover:text-white transition-all flex items-center justify-center space-x-2 active:scale-95"
              >
                <PlusIcon size={18} />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;

const PlusIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/><path d="M12 5v14"/>
  </svg>
);
