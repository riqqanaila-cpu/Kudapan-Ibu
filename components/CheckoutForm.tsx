
import React from 'react';
import { X, CheckCircle2, MessageCircle } from 'lucide-react';
import { OrderDetails, CartItem } from '../types';

interface CheckoutFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (details: OrderDetails) => void;
  cartItems: CartItem[];
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ isOpen, onClose, onSubmit, cartItems }) => {
  const [formData, setFormData] = React.useState<OrderDetails>({
    customerName: '',
    whatsappNumber: '',
    address: '',
  });

  const total = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-coffee/40 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-cream w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        {/* Left Side - Summary */}
        <div className="hidden md:flex md:w-5/12 bg-terracotta p-10 text-white flex-col">
          <h2 className="text-3xl font-serif font-bold mb-8">Summary</h2>
          <div className="space-y-4 flex-grow overflow-y-auto pr-2 custom-scrollbar">
            {cartItems.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm border-b border-white/10 pb-2">
                <span className="font-light">{item.quantity}x {item.product.name}</span>
                <span className="font-semibold">Rp {(item.product.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t-2 border-white/20">
            <div className="flex justify-between items-baseline">
              <span className="text-lg opacity-80">Total</span>
              <span className="text-3xl font-serif font-bold">Rp {total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-grow p-10 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-coffee">Delivery Info</h2>
            <button onClick={onClose} className="p-2 hover:bg-terracotta/5 rounded-full text-coffee/40 md:hidden">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 flex-grow">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-coffee/60 font-bold">Full Name</label>
              <input 
                required
                type="text"
                placeholder="Ibu Sari"
                className="w-full bg-cream-dark border-b-2 border-terracotta/20 focus:border-terracotta outline-none py-3 px-1 transition-colors text-coffee"
                value={formData.customerName}
                onChange={(e) => setFormData({...formData, customerName: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-coffee/60 font-bold">WhatsApp Number</label>
              <div className="relative">
                <span className="absolute left-1 top-3 text-coffee/40 text-sm font-medium">+62</span>
                <input 
                  required
                  type="tel"
                  placeholder="812 3456 7890"
                  className="w-full bg-cream-dark border-b-2 border-terracotta/20 focus:border-terracotta outline-none py-3 pl-10 pr-1 transition-colors text-coffee"
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({...formData, whatsappNumber: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-coffee/60 font-bold">Delivery Address</label>
              <textarea 
                required
                rows={3}
                placeholder="Please enter your full address..."
                className="w-full bg-cream-dark border-b-2 border-terracotta/20 focus:border-terracotta outline-none py-3 px-1 transition-colors text-coffee resize-none"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
            </div>

            <div className="pt-6">
              <button 
                type="submit"
                className="w-full py-5 bg-coffee text-white rounded-2xl font-bold hover:bg-black transition-all flex items-center justify-center space-x-3 shadow-xl"
              >
                <MessageCircle size={20} className="text-green-400" />
                <span>Confirm via WhatsApp</span>
              </button>
              <p className="text-[10px] text-center mt-4 text-coffee/40 uppercase tracking-tighter">
                Clicking confirm will generate a WhatsApp order template
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;

const CheckCircle2Icon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/>
  </svg>
);
const MessageCircleIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
  </svg>
);
