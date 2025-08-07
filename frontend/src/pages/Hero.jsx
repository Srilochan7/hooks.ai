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
        <div className={`lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-slate-700 bg-slate-100 rounded-full border border-slate-200 animate-fadeInUp">
            <span className="mr-2">🪝</span>
            hook.ai - AI-Powered Hook Generator
          </div>

          {/* Main Heading with Gradient Text */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 font-black text-gray-900 leading-tight">
            Turning boring scripts into
            <span className="bg-gradient-to-r from-slate-800 via-gray-900 to-black bg-clip-text text-transparent animate-gradient-x"> viral hooks</span>
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
        <div className={`lg:max-w-lg lg:w-full md:w-1/2 w-5/6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
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

// import React, { useState, useEffect } from 'react';
// import { motion, useAnimate } from 'framer-motion';

// // ✅ FIXED: Reusable component for animating numbers using the useAnimate hook
// const AnimatedStat = ({ finalValue, suffix, text }) => {
//   const [ref, animate] = useAnimate();

//   useEffect(() => {
//     // Animate the element when it's ready
//     const animation = animate(
//       ref.current,
//       { opacity: [0, 1] }, // A simple fade-in effect for the container
//       { duration: 0.5 }
//     );

//     // Animate the number count-up by updating the span's text content on each frame
//     animate(
//       (progress) => {
//         const value = Math.round(progress * finalValue);
//         // Safely find the span and update its content
//         const spanElement = ref.current?.querySelector('span.stat-value');
//         if (spanElement) {
//           spanElement.textContent = `${value}${suffix}`;
//         }
//       },
//       { duration: 2, ease: "easeOut", delay: 0.2 }
//     );

//     return () => animation.stop();
//   }, [finalValue, suffix, animate]);

//   return (
//     <div ref={ref} className="flex flex-col opacity-0">
//       {/* Add a class to the span for a more specific selector */}
//       <span className="stat-value text-3xl md:text-4xl font-bold text-slate-900">
//         0{suffix}
//       </span>
//       <span className="text-sm text-slate-500 font-medium">{text}</span>
//     </div>
//   );
// };


// const Hero = () => {
//   const [currentHook, setCurrentHook] = useState(0);

//   const sampleHooks = [
//     "You won't believe what happened next...",
//     "This one secret changed everything:",
//     "Almost nobody knows this, but...",
//     "The truth influencers refuse to share:"
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentHook((prev) => (prev + 1) % sampleHooks.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [sampleHooks.length]);

//   const dotPattern = `data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a8b2c5' fill-opacity='0.15'%3E%3Ccircle cx='16' cy='16' r='2'/%3E%3C/g%3E%3C/svg%3E`;

//   // Animation variants for Framer Motion
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.2, delayChildren: 0.1 }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } }
//   };

//   return (
//     <div
//       className="bg-slate-50 text-slate-800 min-h-screen flex items-center relative overflow-hidden"
//       style={{ backgroundImage: `url("${dotPattern}")` }}
//     >
//       {/* Background decorative shapes with improved styling */}
//       <div className="absolute -top-16 -left-16 w-48 h-48 bg-sky-100 rounded-full opacity-50 blur-2xl animate-pulse" />
//       <div className="absolute -bottom-24 -right-10 w-64 h-64 bg-sky-200 rounded-full opacity-50 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

//       <motion.div
//         className="container mx-auto flex px-6 py-24 md:flex-row flex-col items-center relative z-10"
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//       >
//         {/* Left Content Section */}
//         <motion.div
//           className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center"
//           variants={containerVariants}
//         >
//           <motion.div variants={itemVariants} className="inline-flex items-center px-4 py-2 mb-6 text-sm font-semibold text-sky-800 bg-sky-100/80 rounded-full border border-sky-200/80">
//             <span className="mr-2">⚡</span>
//             AI-Powered Hook Generator
//           </motion.div>

//           <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl mb-6 font-black text-slate-900 leading-tight">
//             Your Script Deserves to
//             <span className="bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 bg-clip-text text-transparent animate-gradient-x"> Go Viral</span>
//           </motion.h1>

//           <motion.p variants={itemVariants} className="mb-10 leading-relaxed text-lg md:text-xl text-slate-600 max-w-2xl">
//             Paste your content. Get scroll-stopping hooks.
//             <span className="font-semibold text-slate-700"> Powered by advanced AI & social media psychology.</span>
//           </motion.p>

//           <motion.div variants={itemVariants} className="flex flex-wrap gap-8 md:gap-12 mb-12">
//             <AnimatedStat finalValue={10} suffix="M+" text="Hooks Generated" />
//             <AnimatedStat finalValue={95} suffix="%" text="Engagement Boost" />
//             <AnimatedStat finalValue={50} suffix="K+" text="Creators Trust Us" />
//           </motion.div>

//           <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 items-center w-full md:w-auto">
//             <button className="cta-button group w-full sm:w-auto">
//               <span>Generate My Hook</span>
//               <span className="ml-3 text-xl transition-transform group-hover:rotate-12" role="img" aria-label="fire emoji">🔥</span>
//             </button>
//             <button className="inline-flex items-center justify-center w-full sm:w-auto text-slate-700 bg-transparent border-2 border-slate-300 py-3 px-8 focus:outline-none hover:bg-slate-100 hover:border-slate-400 rounded-xl text-lg font-semibold transition-all duration-300">
//               <span className="mr-2">▶️</span>
//               Watch Demo
//             </button>
//           </motion.div>
//         </motion.div>

//         {/* Right Animation Section */}
//         <motion.div
//           className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6"
//           variants={itemVariants}
//         >
//           <div className="relative">
//             {/* Main Card with Glassmorphism */}
//             <div className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-2xl p-8 text-center relative overflow-hidden ring-1 ring-black/5">
//               <div className="relative z-10">
//                 <div className="text-6xl mb-4 animate-bounce">🪝</div>
//                 <h3 className="text-2xl font-bold text-slate-900 mb-4">Hook Generator</h3>

//                 <div className="bg-slate-50/70 rounded-lg p-4 mb-6 border-l-4 border-sky-500 min-h-[100px] flex flex-col justify-center">
//                   <p className="text-slate-500 text-sm mb-2 font-medium">Sample Hook:</p>
//                   <p className="text-slate-900 text-lg font-semibold transition-all duration-500">
//                     "{sampleHooks[currentHook]}"
//                   </p>
//                 </div>

//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between text-sm">
//                     <span className="text-slate-600 font-medium">Virality Score</span>
//                     <span className="text-sky-600 font-bold">95%</span>
//                   </div>
//                   <div className="w-full bg-slate-200 rounded-full h-2.5">
//                     <div className="bg-gradient-to-r from-sky-400 to-blue-600 h-2.5 rounded-full animate-expandWidth" style={{ width: '95%' }}></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>

//       <style jsx global>{`
//         @keyframes gradient-x {
//           0%, 100% { background-position: left center; }
//           50% { background-position: right center; }
//         }
//         .animate-gradient-x {
//           background-size: 200% 200%;
//           animation: gradient-x 4s ease infinite;
//         }

//         @keyframes expandWidth {
//           from { width: 0%; }
//           to { width: 95%; } /* Hardcoded to match the text */
//         }
//         .animate-expandWidth {
//           animation: expandWidth 2s ease-out 1s forwards;
//         }
        
//         /* Enhanced CTA Button with Shimmer Effect */
//         .cta-button {
//           position: relative;
//           display: inline-flex;
//           align-items: center;
//           justify-content: center;
//           padding: 0.75rem 2rem;
//           font-weight: 700;
//           font-size: 1.125rem;
//           line-height: 1.75rem;
//           color: white;
//           background: linear-gradient(to right, #1e293b, #0f172a);
//           border-radius: 0.75rem;
//           border: 0;
//           overflow: hidden;
//           transform: translateZ(0);
//           transition: all 0.3s ease-out;
//           box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
//         }
//         .cta-button:hover {
//           transform: scale(1.05);
//           box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
//         }
//         .cta-button::before {
//           content: '';
//           position: absolute;
//           top: -50%;
//           left: -50%;
//           width: 200%;
//           height: 200%;
//           background: linear-gradient(
//             to right,
//             transparent,
//             rgba(255, 255, 255, 0.3),
//             transparent
//           );
//           transform: rotate(45deg);
//           transition: all 0.5s ease;
//           opacity: 0;
//         }
//         .cta-button:hover::before {
//           transform: translate(25%, 25%) rotate(45deg);
//           opacity: 1;
//         }
//         .cta-button span {
//           position: relative;
//           z-index: 10;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Hero;