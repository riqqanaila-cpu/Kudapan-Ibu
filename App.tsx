
import React, { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CartSidebar from './components/CartSidebar';
import CheckoutForm from './components/CheckoutForm';
import { PRODUCTS } from './constants';
import { Product, CartItem, OrderDetails } from './types';
import { Heart, Instagram, Facebook, Mail } from 'lucide-react';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleAddToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const handleUpdateQuantity = useCallback((id: string, delta: number) => {
    setCart(prev => {
      const item = prev.find(i => i.product.id === id);
      if (!item) return prev;
      
      const newQty = item.quantity + delta;
      if (newQty <= 0) {
        return prev.filter(i => i.product.id !== id);
      }
      return prev.map(i => i.product.id === id ? { ...i, quantity: newQty } : i);
    });
  }, []);

  const handleCheckoutSubmit = (details: OrderDetails) => {
    // Generate WhatsApp Message
    const orderList = cart.map(item => `- ${item.quantity}x ${item.product.name}`).join('%0A');
    const total = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const message = `Halo Kudapan Ibu!%0A%0ASaya ingin memesan:%0A${orderList}%0A%0ATotal: Rp ${total.toLocaleString()}%0A%0AData Pemesan:%0ANama: ${details.customerName}%0AAlamat: ${details.address}%0AWA: ${details.whatsappNumber}%0A%0ATerima kasih!`;
    
    const whatsappUrl = `https://wa.me/6281234567890?text=${message}`;
    window.open(whatsappUrl, '_blank');
    
    // Reset Cart
    setCart([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    alert('Thank you for your order! Redirecting to WhatsApp...');
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-terracotta/10 selection:text-terracotta">
      <Navbar 
        cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)} 
      />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Heritage Section */}
        <section className="py-20 bg-cream relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
            <h2 className="text-3xl font-serif italic text-terracotta">"The heart of the home is the kitchen, and the soul of the kitchen is Mom's cooking."</h2>
            <p className="text-coffee-muted leading-loose text-lg font-light">
              Since 1988, Ibu Sari has been perfecting the art of the perfect crumb. What started in a small home kitchen in Bandung has grown into a legacy of taste. We believe that premium pastries shouldn't just taste good—they should feel like home.
            </p>
            <div className="flex justify-center space-x-12 pt-4">
              <div className="text-center">
                <span className="block text-2xl font-serif text-coffee font-bold">100%</span>
                <span className="text-[10px] uppercase tracking-widest text-coffee/40 font-bold">Pure Butter</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-serif text-coffee font-bold">No</span>
                <span className="text-[10px] uppercase tracking-widest text-coffee/40 font-bold">Preservatives</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-serif text-coffee font-bold">Hand</span>
                <span className="text-[10px] uppercase tracking-widest text-coffee/40 font-bold">Crafted</span>
              </div>
            </div>
          </div>
        </section>

        <ProductGrid 
          products={PRODUCTS} 
          onAddToCart={handleAddToCart} 
        />
      </main>

      <footer className="bg-coffee text-cream py-20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-3xl font-serif font-bold text-terracotta">Kudapan Ibu</h3>
            <p className="text-cream/60 max-w-sm font-light leading-relaxed">
              Preserving Indonesian pastry heritage, one jar at a time. Crafted with love, delivered with care.
            </p>
            <div className="flex space-x-5">
              <Instagram size={20} className="hover:text-terracotta transition-colors cursor-pointer" />
              <Facebook size={20} className="hover:text-terracotta transition-colors cursor-pointer" />
              <Mail size={20} className="hover:text-terracotta transition-colors cursor-pointer" />
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-terracotta">Navigation</h4>
            <ul className="space-y-3 text-sm font-light text-cream/70">
              <li><a href="#" className="hover:text-cream transition-colors">Our Story</a></li>
              <li><a href="#products" className="hover:text-cream transition-colors">Menu</a></li>
              <li><a href="#" className="hover:text-cream transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-cream transition-colors">FAQs</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-terracotta">Contact</h4>
            <ul className="space-y-3 text-sm font-light text-cream/70">
              <li>Jakarta & Bandung, Indonesia</li>
              <li>hello@kudapanibu.com</li>
              <li>+62 812 3456 7890</li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-8 border-t border-white/5 flex flex-col md:row justify-between items-center text-[10px] uppercase tracking-widest text-cream/30">
          <p>© 2024 Kudapan Ibu. All Rights Reserved.</p>
          <div className="flex space-x-2 mt-4 md:mt-0 items-center">
            <span>Made with</span>
            <Heart size={10} className="text-terracotta fill-terracotta" />
            <span>by Mom's Kitchen</span>
          </div>
        </div>
      </footer>

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutForm 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSubmit={handleCheckoutSubmit}
        cartItems={cart}
      />
    </div>
  );
};

export default App;

// Simple Icon Mocks
const HeartIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
  </svg>
);
const InstagramIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);
const FacebookIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const MailIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);
