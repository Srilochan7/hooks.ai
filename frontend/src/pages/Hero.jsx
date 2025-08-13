import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentHook, setCurrentHook] = useState(0);
  
  // Sample hooks that rotate
  const sampleHooks = [
    "You won't believe what happened next...",
    "This changed everything for me:",
    "Nobody talks about this, but...",
    "The secret that influencers hide:"
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Rotate sample hooks every 3 seconds
    const interval = setInterval(() => {
      setCurrentHook((prev) => (prev + 1) % sampleHooks.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // SVG for the dotted background pattern
  const dotPattern = `data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d1d5db' fill-opacity='0.5' fill-rule='evenodd'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/svg%3E`;

  return (
    <div
      className="bg-white text-black min-h-screen flex items-center relative overflow-hidden"
      style={{ 
        backgroundImage: `url("${dotPattern}")`,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      }}
    >
      {/* Floating elements for background animation */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-slate-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gray-200 rounded-full opacity-30 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-slate-300 rounded-full opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-40 w-12 h-12 bg-gray-300 rounded-full opacity-30 animate-bounce" style={{animationDelay: '0.5s'}}></div>
      </div> */}

      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-6 gap-16 relative z-10">

        {/* Left Content Section */}
        <div className={`lg:flex-grow md:w-2/5 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-15 md:mb-0 items-center text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-slate-700 bg-slate-100 rounded-full border border-slate-200 animate-fadeInUp">
            <span className="mr-2">🪝</span>
            hook.ai - AI-Powered Hook Generator
          </div>

          {/* Main Heading with Gradient Text */}
<h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 font-black text-gray-900 leading-tight">
  Turning boring scripts intoㅤ
  <span className="relative bg-gradient-to-r from-indigo-300 via-indigo-600 to-indigo-300 bg-clip-text text-transparent animate-gradient-x">
  viral hooks
  <svg className="absolute left-[-10px] bottom-0 w-[calc(100%+20px)] h-[12px]" viewBox="0 0 170 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 5 C 30 6, 60 4, 90 5.5 C 120 7, 150 5, 170 5" stroke="#000" strokeWidth="2" fill="transparent" strokeLinecap="round"/>
  </svg>
</span>


</h1>




          {/* Subtitle with typing animation effect */}
          <p className="mb-8 leading-relaxed text-xl md:text-2xl text-gray-700 font-medium max-w-2xl">
            Paste your content. Get scroll-stopping hooks. 
            <span className="text-slate-800 font-semibold"> Powered by hooks.ai's advanced AI & social media psychology.</span>
          </p>

          {/* Stats Row */}
          {/* <div className="flex flex-wrap gap-8 mb-10 text-center md:text-left">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900">10M+</span>
              <span className="text-sm text-gray-600 font-medium">Hooks Generated</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900">95%</span>
              <span className="text-sm text-gray-600 font-medium">Engagement Boost</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900">50K+</span>
              <span className="text-sm text-gray-600 font-medium">Creators Trust Us</span>
            </div>
          </div> */}

          {/* CTA Button with enhanced animations */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <button className="group relative inline-flex items-center text-white bg-gradient-to-r from-gray-800 to-black border-0 py-4 px-10 focus:outline-none hover:from-gray-900 hover:to-gray-800 rounded-xl text-lg font-bold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <span className="relative z-10">Generate My Hook</span>
              <span className="ml-3 text-xl transition-transform group-hover:rotate-12" role="img" aria-label="fire emoji">🔥</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
            </button>
            
            {/* <button className="inline-flex items-center text-slate-800 bg-white border-2 border-slate-300 py-4 px-8 focus:outline-none hover:bg-slate-50 hover:border-slate-400 rounded-xl text-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg">
              <span className="mr-2">▶️</span>
              Watch Demo
            </button> */}
          </div>
        </div>

        {/* Right Animation Section */}
        <div className={`lg:max-w-lg lg:w-full md:w-2/5 w-5/6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
          <div className="relative">
            {/* Main Card with Enhanced Animation */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 text-center relative overflow-hidden transform hover:scale-105 transition-all duration-500">
              
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 animate-gradient-xy"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="text-6xl mb-4 animate-bounce">🪝</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">hooks.ai Generator</h3>
                
                {/* Rotating Sample Hook */}
                <div className="bg-slate-50 rounded-lg p-4 mb-6 border-l-4 border-slate-600">
                  <p className="text-gray-600 text-sm mb-2 font-medium">Sample Hook:</p>
                  <p className="text-gray-900 font-semibold transition-all duration-500 min-h-6">
                    "{sampleHooks[currentHook]}"
                  </p>
                </div>

                {/* Animated Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center animate-fadeInUp" style={{animationDelay: '0.1s'}}>
                    <div className="text-lg font-bold text-slate-700">92%</div>
                    <div className="text-xs text-gray-500">Engagement</div>
                  </div>
                  <div className="text-center animate-fadeInUp" style={{animationDelay: '0.2s'}}>
                    <div className="text-lg font-bold text-gray-700">3.2x</div>
                    <div className="text-xs text-gray-500">More Views</div>
                  </div>
                  <div className="text-center animate-fadeInUp" style={{animationDelay: '0.3s'}}>
                    <div className="text-lg font-bold text-slate-800">45%</div>
                    <div className="text-xs text-gray-500">CTR Boost</div>
                  </div>
                </div>

                {/* Animated Progress Bars */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-medium">Hook Quality</span>
                    <span className="text-slate-700 font-bold">95%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-slate-600 to-gray-800 h-2 rounded-full animate-expandWidth" style={{width: '95%'}}></div>
                  </div>
                </div>
              </div>

              {/* Floating Action Indicators */}
              <div className="absolute -top-2 -right-2 bg-slate-600 text-white rounded-full p-2 animate-ping">
                <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
              </div>
            </div>

            {/* Floating Elements around the card */}
            <div className="absolute -top-4 -left-4 bg-slate-600 text-white p-3 rounded-full shadow-lg animate-float">
              ⚡
            </div>
            <div className="absolute -bottom-4 -right-4 bg-gray-700 text-white p-3 rounded-full shadow-lg animate-float" style={{animationDelay: '1s'}}>
              📈
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        @keyframes gradient-xy {
          0%, 100% {
            background-size: 400% 400%;
            background-position: left center;
          }
          50% {
            background-size: 400% 400%;
            background-position: right center;
          }
        }

        @keyframes expandWidth {
          from {
            width: 0%;
          }
          to {
            width: 95%;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }

        .animate-gradient-xy {
          animation: gradient-xy 6s ease infinite;
        }

        .animate-expandWidth {
          animation: expandWidth 2s ease-out 1s forwards;
          width: 0%;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;
