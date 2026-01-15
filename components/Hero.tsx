
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-[85vh] flex items-center overflow-hidden bg-cream-dark">
      {/* Background visual elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-terracotta mix-blend-multiply blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-terracotta/30 mix-blend-multiply blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <span className="text-terracotta uppercase tracking-[0.3em] text-xs font-semibold">The Taste of Heritage</span>
              <h1 className="text-5xl md:text-7xl font-serif text-coffee leading-[1.1] font-bold">
                Memories of <br />
                <span className="italic text-terracotta">Home, Baked.</span>
              </h1>
              <p className="text-coffee-muted text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed font-light">
                Indulge in our premium selection of handcrafted pastries, made with heirloom recipes and the finest global ingredients. No shortcuts, just pure nostalgic love.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
              <a 
                href="#products" 
                className="w-full sm:w-auto px-10 py-4 bg-terracotta text-white rounded-full font-medium hover:bg-terracotta-dark transition-all transform hover:-translate-y-1 shadow-lg shadow-terracotta/20 text-center"
              >
                Order Now
              </a>
              <a 
                href="#" 
                className="text-coffee font-medium border-b border-coffee/20 hover:border-terracotta hover:text-terracotta transition-all py-1"
              >
                Explore the Heritage
              </a>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl rotate-2">
              <img 
                src="https://picsum.photos/seed/pastry-hero/1000/1200" 
                alt="Premium Pastry" 
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl"></div>
            </div>
            {/* Artistic decoration */}
            <div className="absolute -top-6 -right-6 w-32 h-32 border-4 border-terracotta/20 rounded-full z-0"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 border-2 border-coffee/10 rounded-full z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
