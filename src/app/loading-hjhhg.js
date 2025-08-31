"use client";
// export default function Loading() {
//   return (
//     <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-950/95 backdrop-blur-sm">
//       {/* Main loader container */}
//       <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
//         {/* Outer glow */}
//         <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-xl animate-pulse-glow"></div>

//         {/* Concentric circles */}
//         <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 animate-spin-slow"></div>
//         <div className="absolute inset-6 rounded-full border-2 border-purple-400/30 animate-spin-reverse-slow"></div>

//         {/* Animated orb core */}
//         <div className="relative w-3/4 h-3/4 rounded-full overflow-hidden">
//           {/* Gradient background */}
//           <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>

//           {/* Particle simulation */}
//           <div className="absolute inset-0 opacity-70">
//             {[...Array(30)].map((_, i) => (
//               <div
//                 key={i}
//                 className="absolute rounded-full bg-white"
//                 style={{
//                   width: `${Math.random() * 4 + 1}px`,
//                   height: `${Math.random() * 4 + 1}px`,
//                   left: `${Math.random() * 100}%`,
//                   top: `${Math.random() * 100}%`,
//                   opacity: Math.random() * 0.5 + 0.1,
//                   animation: `float ${
//                     Math.random() * 6 + 3
//                   }s ease-in-out infinite`,
//                   animationDelay: `${Math.random() * 2}s`,
//                 }}
//               />
//             ))}
//           </div>

//           {/* Light refraction effect */}
//           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(255,255,255,0.1)_100%)]"></div>
//         </div>

//         {/* Center text with subtle shine */}
//         <div className="absolute text-center">
//           <span className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 tracking-widest">
//             WELCOME
//           </span>
//         </div>
//       </div>

//       {/* Status text with typing effect */}
//       <div className="mt-10 text-center">
//         <div className="text-sm sm:text-base text-gray-300 font-mono flex items-center justify-center">
//           <span className="mr-2 text-blue-400">$</span>
//           <span className="animate-typing overflow-hidden whitespace-nowrap border-r-2 border-r-blue-400 pr-1">
//             Loading portfolio experience...
//           </span>
//         </div>
//         <div className="mt-2 h-1 w-48 bg-gray-800 rounded-full overflow-hidden">
//           <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-progress"></div>
//         </div>
//       </div>

//       {/* Animations */}
//       <style jsx global>{`
//         @keyframes pulse-glow {
//           0%,
//           100% {
//             opacity: 0.3;
//           }
//           50% {
//             opacity: 0.6;
//           }
//         }
//         @keyframes spin-slow {
//           0% {
//             transform: rotate(0deg);
//           }
//           100% {
//             transform: rotate(360deg);
//           }
//         }
//         @keyframes spin-reverse-slow {
//           0% {
//             transform: rotate(0deg);
//           }
//           100% {
//             transform: rotate(-360deg);
//           }
//         }
//         @keyframes float {
//           0%,
//           100% {
//             transform: translate(0, 0);
//           }
//           25% {
//             transform: translate(5px, -5px);
//           }
//           50% {
//             transform: translate(0, -10px);
//           }
//           75% {
//             transform: translate(-5px, -5px);
//           }
//         }
//         @keyframes typing {
//           from {
//             width: 0;
//           }
//           to {
//             width: 100%;
//           }
//         }
//         @keyframes progress {
//           from {
//             width: 0%;
//           }
//           to {
//             width: 100%;
//           }
//         }
//         .animate-pulse-glow {
//           animation: pulse-glow 3s ease-in-out infinite;
//         }
//         .animate-spin-slow {
//           animation: spin-slow 20s linear infinite;
//         }
//         .animate-spin-reverse-slow {
//           animation: spin-reverse-slow 25s linear infinite;
//         }
//         .animate-typing {
//           animation: typing 2s steps(22) forwards;
//         }
//         .animate-progress {
//           animation: progress 3s ease-in-out forwards;
//         }

//         /* Reduced motion alternative */
//         @media (prefers-reduced-motion: reduce) {
//           .animate-pulse-glow,
//           .animate-spin-slow,
//           .animate-spin-reverse-slow,
//           .animate-typing,
//           .animate-progress {
//             animation: none;
//           }
//           .animate-typing {
//             overflow: visible;
//             white-space: normal;
//             border-right: none;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }
