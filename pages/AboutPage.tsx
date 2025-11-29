import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="w-full bg-stone-50">
      <div className="w-full h-[50vh] md:h-[60vh] lg:h-[70vh] bg-stone-900 relative overflow-hidden">
         <img 
           src="/rsc/images/Foto-95_copy-c2243c57.jpg" 
           alt="The Team" 
           className="w-full h-full object-cover opacity-80 grayscale hover:grayscale-0 transition-all duration-700"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
         <div className="absolute bottom-8 md:bottom-12 left-6 md:left-12 text-white">
           <h1 className="text-2xl md:text-4xl lg:text-6xl font-serif mb-2 md:mb-4">The Storytellers</h1>
           <p className="text-xs md:text-sm font-light max-w-md">Capturing beauty in authentic moments, with a touch of cinematic flair.</p>
         </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 py-16 md:py-24">
         <div className="max-w-3xl mx-auto text-center space-y-6 md:space-y-8">
            <h2 className="text-xl md:text-3xl lg:text-4xl font-serif text-stone-800">
              <span className="text-[#c9bba6]">VenaPictures</span> was born out of our love for capturing beauty in authentic moments.
            </h2>
            <p className="text-stone-600 text-xs md:text-sm lg:text-base font-light leading-loose">
              We are driven by the desire to encapsulate the essence of love, weaving it into timeless visual tales that reflect the magic and awe of each unique love story.
            </p>
         </div>
      </div>
    </div>
  );
};

export default AboutPage;
