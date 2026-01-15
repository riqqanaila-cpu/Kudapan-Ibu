
import React from 'react';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onCheckout: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, items, onUpdateQuantity, onCheckout }) => {
  const subtotal = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-50 bg-coffee/20 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-cream z-[60] shadow-2xl cart-transition transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        <div className="p-6 border-b border-terracotta/10 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <ShoppingBag size={24} className="text-terracotta" />
            <h2 className="text-2xl font-serif font-bold text-coffee">Your Basket</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-terracotta/5 rounded-full transition-colors text-coffee/60">
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-60">
              <div className="w-20 h-20 bg-terracotta/5 rounded-full flex items-center justify-center">
                <ShoppingBag size={40} className="text-terracotta/40" />
              </div>
              <div className="space-y-2">
                <p className="text-xl font-serif">Your basket is empty</p>
                <p className="text-sm">Why not treat yourself to something sweet?</p>
              </div>
              <button 
                onClick={onClose}
                className="text-terracotta font-medium hover:underline"
              >
                Go browse menu
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex space-x-4 group">
                <div className="w-24 h-24 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                  <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow flex flex-col justify-between py-1">
                  <div>
                    <h3 className="font-serif font-bold text-coffee leading-tight">{item.product.name}</h3>
                    <p className="text-terracotta text-sm font-semibold mt-1">Rp {item.product.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center bg-cream-dark rounded-lg p-1 border border-terracotta/10">
                      <button 
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="p-1 hover:text-terracotta transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-coffee">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="p-1 hover:text-terracotta transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button 
                      onClick={() => onUpdateQuantity(item.product.id, -item.quantity)}
                      className="text-xs text-coffee/40 hover:text-red-500 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-8 bg-cream-dark border-t border-terracotta/10 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-coffee/60">
                <span>Subtotal</span>
                <span>Rp {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-coffee/60">
                <span>Delivery</span>
                <span className="italic">Calculated at next step</span>
              </div>
              <div className="flex justify-between text-xl font-serif font-bold text-coffee pt-2 border-t border-coffee/5">
                <span>Total</span>
                <span className="text-terracotta">Rp {subtotal.toLocaleString()}</span>
              </div>
            </div>
            
            <button 
              onClick={onCheckout}
              className="w-full py-4 bg-terracotta text-white rounded-2xl font-bold flex items-center justify-center space-x-3 hover:bg-terracotta-dark transition-all shadow-lg shadow-terracotta/20 group"
            >
              <span>Secure Checkout</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;

// Simple Icon Mocks
const XIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
  </svg>
);
const MinusIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/>
  </svg>
);
const PlusIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/><path d="M12 5v14"/>
  </svg>
);
const ArrowRightIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
);
