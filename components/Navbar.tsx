
import React from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-cream/80 backdrop-blur-md border-b border-terracotta/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-4">
            <button 
              className="md:hidden text-coffee"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex flex-col">
              <span className="text-2xl font-serif font-bold text-terracotta leading-tight tracking-tight">Kudapan Ibu</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-coffee/60 -mt-1 font-medium">Est. 1988</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-10 text-sm font-medium text-coffee/80 tracking-wide">
            <a href="#" className="hover:text-terracotta transition-colors">Our Story</a>
            <a href="#products" className="hover:text-terracotta transition-colors">Menu</a>
            <a href="#" className="hover:text-terracotta transition-colors">Gifts</a>
            <a href="#" className="hover:text-terracotta transition-colors">Reviews</a>
          </div>

          <div className="flex items-center">
            <button 
              onClick={onCartClick}
              className="relative p-2 text-coffee hover:text-terracotta transition-all group"
            >
              <ShoppingBag size={26} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-terracotta text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-cream transition-transform group-hover:scale-110">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-cream border-b border-terracotta/10 transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pt-2 pb-6 space-y-4 text-center font-medium text-coffee">
          <a href="#" className="block py-2">Our Story</a>
          <a href="#products" className="block py-2">Menu</a>
          <a href="#" className="block py-2">Gifts</a>
          <a href="#" className="block py-2">Reviews</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// Icons mock for local usage
const ShoppingBagIcon = ({ size, strokeWidth }: { size: number, strokeWidth: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);
const MenuIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
  </svg>
);
const XIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
  </svg>
);
