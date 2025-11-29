import React, { useState } from 'react';

const ContactPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="w-full bg-stone-50 min-h-screen">
      <div className="relative h-[35vh] md:h-[40vh] w-full overflow-hidden">
        <img 
          src="/rsc/images/Photo-2033-d52d5fe7.jpg" 
          alt="Contact" 
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-stone-900/30 flex items-center justify-center">
           <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-serif px-6 text-center">Hi, we've finally met.</h1>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 mb-12">
          <div className="space-y-6">
            <div>
              <h3 className="text-xs md:text-sm font-bold uppercase tracking-widest text-stone-800 mb-3">Contact Us</h3>
              <div className="space-y-2 text-stone-600 text-xs md:text-sm">
                <p>WhatsApp: <a href="https://wa.me/6285693762240" className="hover:text-stone-900 transition-colors">+62 856-9376-2240</a></p>
                <p>Instagram: @venapictures</p>
              </div>
            </div>
            <div>
              <h3 className="text-xs md:text-sm font-bold uppercase tracking-widest text-stone-800 mb-3">Location</h3>
              <p className="text-stone-600 text-xs md:text-sm">Serang, Banten<br/>Indonesia</p>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xs md:text-sm font-bold uppercase tracking-widest text-stone-800">Get Our Pricelist</h3>
            <p className="text-stone-600 text-xs md:text-sm font-light">Fill out the form below to receive our complete pricelist and package details.</p>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 lg:p-12 shadow-sm border border-stone-100">
          {!formSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              <div className="space-y-2">
                <label htmlFor="name" className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-stone-800">Name *</label>
                <input type="text" id="name" required placeholder="Your Name" className="w-full border-b border-stone-300 py-2 text-stone-700 focus:outline-none focus:border-stone-800 placeholder:text-stone-300 text-xs md:text-sm bg-transparent" />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-stone-800">Email *</label>
                <input type="email" id="email" required placeholder="name@example.com" className="w-full border-b border-stone-300 py-2 text-stone-700 focus:outline-none focus:border-stone-800 placeholder:text-stone-300 text-xs md:text-sm bg-transparent" />
              </div>

              <div className="space-y-2">
                <label htmlFor="location" className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-stone-800">Event Location *</label>
                <input type="text" id="location" placeholder="Serang, Jakarta, Bali, etc." className="w-full border-b border-stone-300 py-2 text-stone-700 focus:outline-none focus:border-stone-800 placeholder:text-stone-300 text-xs md:text-sm bg-transparent" />
              </div>

              <div className="space-y-3 md:space-y-4 pt-3 md:pt-4">
                <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-stone-800 block">How do you know us?</label>
                <div className="space-y-2">
                  {['Friends/Family', 'Instagram', 'TikTok', 'Ads'].map((option) => (
                    <label key={option} className="flex items-center space-x-3 cursor-pointer group">
                      <div className="w-3.5 h-3.5 md:w-4 md:h-4 border border-stone-300 group-hover:border-stone-500 transition-colors flex items-center justify-center">
                        <input type="checkbox" className="opacity-0 absolute" />
                        <div className="w-2 h-2 bg-stone-800 opacity-0 checkbox-checked:opacity-100 transition-opacity"></div> 
                        <div className="w-2 h-2 bg-transparent group-active:bg-stone-300"></div>
                      </div>
                      <span className="text-[11px] md:text-xs text-stone-600">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-6 md:pt-8">
                <button type="submit" className="w-full md:w-auto bg-[#8c8680] text-white px-8 py-3 md:px-10 md:py-4 text-[10px] md:text-xs tracking-[0.2em] uppercase hover:bg-[#7a746e] transition-colors shadow-sm">
                  Download Now
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8 md:py-12 space-y-4 md:space-y-6 fade-in-up">
              <h3 className="text-xl md:text-2xl font-serif text-stone-800">Thank you!</h3>
              <p className="text-stone-600 text-xs md:text-sm font-light">Your information has been received. The pricelist is downloading...</p>
              <button onClick={() => setFormSubmitted(false)} className="text-[10px] md:text-xs underline uppercase tracking-widest text-stone-500">Send another inquiry</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
