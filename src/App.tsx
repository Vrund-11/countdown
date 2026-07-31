import { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  Mic, 
  User, 
  Linkedin, 
  Instagram, 
  Heart
} from 'lucide-react';
import gsap from 'gsap';

// Twitter / X Icon from Hubbl SocialMediaDock
const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="currentColor"
    className={className || "w-5 h-5"}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Exact Social Media Dock Component from Hubbl Repo
const SocialMediaDock = () => (
  <div className="flex items-center gap-3 sm:gap-4">
    {/* LinkedIn */}
    <a
      href="https://www.linkedin.com/company/hubblcommunity"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hubbl on LinkedIn"
      className="group relative p-2.5 sm:p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden transition-all duration-500 ease-in-out hover:border-[#0A66C2]/60 hover:bg-[#0A66C2]/15 hover:shadow-[0_0_20px_rgba(10,102,194,0.35)]"
    >
      <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 group-hover:text-[#0A66C2] group-hover:scale-110 transition-all duration-500 ease-in-out" />
    </a>

    {/* X (Formerly Twitter) */}
    <a
      href="https://x.com/hubblcommunity"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hubbl on X"
      className="group relative p-2.5 sm:p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden transition-all duration-500 ease-in-out hover:border-white/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)]"
    >
      <XIcon className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 group-hover:text-white group-hover:scale-110 transition-all duration-500 ease-in-out" />
    </a>

    {/* Instagram */}
    <a
      href="https://instagram.com/hubblcommunity"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hubbl on Instagram"
      className="group relative p-2.5 sm:p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden transition-all duration-500 ease-in-out hover:border-pink-500/60 hover:bg-gradient-to-tr hover:from-[#f09433]/20 hover:via-[#dc2743]/20 hover:to-[#bc1888]/20 hover:shadow-[0_0_20px_rgba(225,48,108,0.35)]"
    >
      <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 group-hover:text-[#E1306C] group-hover:scale-110 transition-all duration-500 ease-in-out" />
    </a>
  </div>
);

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  // Target Launch Date: August 15, 2026 Midnight IST (00:00:00 GMT+5:30)
  const targetDate = useRef(new Date('2026-08-15T00:00:00+05:30').getTime()).current;

  const getTimeRemaining = (target: number) => {
    const difference = target - Date.now();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000)
    };
  };

  const [timeLeft, setTimeLeft] = useState(() => getTimeRemaining(targetDate));

  useEffect(() => {
    const calculateTimeLeft = () => {
      setTimeLeft(getTimeRemaining(targetDate));
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  // Scroll listener for Navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Instant non-blocking entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.anim-header, .anim-badge, .anim-title, .anim-dot, .anim-subtitle, .anim-card, .anim-tagline, .anim-divider, .anim-features, .anim-arc, .anim-callout, .anim-footer', {
        y: 12,
        opacity: 0,
        duration: 0.4,
        stagger: 0.03,
        ease: 'power2.out',
        clearProps: 'all'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div 
      ref={containerRef} 
      className="relative min-h-screen bg-[#0B0B0F] text-white flex flex-col justify-between overflow-x-hidden font-body selection:bg-purple-500/30 selection:text-purple-200 pt-24 lg:pt-28 2xl:pt-32"
    >
      {/* Background Top & Side Purple Atmospheric Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-[1000px] h-[500px] bg-gradient-to-b from-purple-900/25 via-indigo-950/15 to-transparent blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-20 left-1/4 w-[40vw] max-w-[350px] h-[350px] bg-purple-600/10 blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-20 right-1/4 w-[40vw] max-w-[350px] h-[350px] bg-indigo-600/10 blur-[100px] pointer-events-none z-0" />

      {/* ========================================================================= */}
      {/* HUBBL NAVBAR (Logo Left)                                                  */}
      {/* ========================================================================= */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b h-16 lg:h-18 xl:h-20 2xl:h-24 flex items-center anim-header ${
          scrolled
            ? "bg-[#0B0B0F]/95 backdrop-blur-2xl border-white/15 shadow-xl shadow-black/40"
            : "bg-[#0B0B0F]/90 backdrop-blur-xl border-white/10 shadow-lg shadow-black/20"
        }`}
      >
        <div className="w-full max-w-[1920px] 3xl:max-w-[2400px] mx-auto px-4 md:px-8 xl:px-16 2xl:px-24 flex items-center justify-between h-full relative">
          
          {/* Brand Logo */}
          <a
            href="/"
            className="flex items-center gap-2.5 z-50 cursor-pointer hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.35)] transition-all duration-300 shrink-0"
            aria-label="Hubbl Home"
          >
            <img
              src="/logos/new_hubbl_logo.png"
              alt="Hubbl Logo"
              decoding="async"
              loading="eager"
              className="h-9 sm:h-10 lg:h-8 xl:h-10 2xl:h-12 w-auto object-contain shrink-0"
            />
            <span className="font-heading text-xl sm:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-white tracking-wide mt-0.5">
              Hub<span className="text-violet-500">bl</span>
            </span>
          </a>

        </div>
      </nav>

      {/* ========================================================================= */}
      {/* LAUNCH TIMER HERO SECTION                                                 */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center text-center px-3 sm:px-6 lg:px-8 flex-1">

        {/* Launching Soon Pill Badge */}
        <div className="anim-badge mb-6 sm:mb-8 mt-4 sm:mt-6">
          <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-5 py-1 sm:py-1.5 rounded-full border border-purple-500/40 bg-purple-950/25 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.15)]">
            <span className="text-purple-300 text-[10px] sm:text-xs md:text-sm font-medium tracking-widest uppercase whitespace-nowrap">
              • &nbsp; WE'RE LAUNCHING SOON &nbsp; •
            </span>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="anim-title text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-4 sm:mb-6 font-heading">
          Something{' '}
          <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-200 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(168,85,247,0.4)]">
            Great
          </span>
          <br />
          is Coming
        </h1>

        {/* Purple Glowing Dot Divider */}
        <div className="anim-dot w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-400 shadow-[0_0_12px_#c084fc] mb-4 sm:mb-6" />

        {/* Subtitle */}
        <p className="anim-subtitle text-gray-300/90 text-xs sm:text-base md:text-lg max-w-xs sm:max-w-lg mb-8 sm:mb-12 leading-relaxed font-light px-2">
          Connecting communities, speakers <br className="hidden sm:inline" />
          and attendees across <span className="text-purple-400 font-normal">India's</span> tech ecosystem.
        </p>

        {/* Countdown Box */}
        <div className="anim-card w-full max-w-xl mb-6 sm:mb-8">
          <div className="relative rounded-xl sm:rounded-3xl bg-[#0b0718]/90 border border-purple-500/30 p-4 sm:p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(147,51,234,0.18)]">
            <div className="flex items-center justify-between px-1 sm:px-6">
              
              {/* DAYS */}
              <div className="flex flex-col items-center flex-1">
                <span className="text-2xl sm:text-5xl md:text-6xl font-bold text-purple-400 font-heading tracking-tight drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                  {formatNumber(timeLeft.days)}
                </span>
                <span className="text-[8px] sm:text-xs font-semibold tracking-wider text-purple-200/50 uppercase mt-1 sm:mt-2">
                  DAYS
                </span>
              </div>

              {/* Dot Separator */}
              <span className="text-purple-400/80 text-base sm:text-2xl font-bold select-none pb-4 sm:pb-5">•</span>

              {/* HOURS */}
              <div className="flex flex-col items-center flex-1">
                <span className="text-2xl sm:text-5xl md:text-6xl font-bold text-purple-400 font-heading tracking-tight drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                  {formatNumber(timeLeft.hours)}
                </span>
                <span className="text-[8px] sm:text-xs font-semibold tracking-wider text-purple-200/50 uppercase mt-1 sm:mt-2">
                  HOURS
                </span>
              </div>

              {/* Dot Separator */}
              <span className="text-purple-400/80 text-base sm:text-2xl font-bold select-none pb-4 sm:pb-5">•</span>

              {/* MINUTES */}
              <div className="flex flex-col items-center flex-1">
                <span className="text-2xl sm:text-5xl md:text-6xl font-bold text-purple-400 font-heading tracking-tight drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                  {formatNumber(timeLeft.minutes)}
                </span>
                <span className="text-[8px] sm:text-xs font-semibold tracking-wider text-purple-200/50 uppercase mt-1 sm:mt-2">
                  MINUTES
                </span>
              </div>

              {/* Dot Separator */}
              <span className="text-purple-400/80 text-base sm:text-2xl font-bold select-none pb-4 sm:pb-5">•</span>

              {/* SECONDS */}
              <div className="flex flex-col items-center flex-1">
                <span className="text-2xl sm:text-5xl md:text-6xl font-bold text-purple-400 font-heading tracking-tight drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                  {formatNumber(timeLeft.seconds)}
                </span>
                <span className="text-[8px] sm:text-xs font-semibold tracking-wider text-purple-200/50 uppercase mt-1 sm:mt-2">
                  SECONDS
                </span>
              </div>

            </div>
          </div>
        </div>

        {/* Social Media Links Dock - Positioned Directly Below Timings */}
        <div className="anim-socials mb-8 sm:mb-10 flex flex-col items-center gap-2.5">
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-purple-300/70 font-semibold">
            Connect With Us
          </span>
          <SocialMediaDock />
        </div>

        {/* Tagline Pill (Made for India. Built in India.) */}
        <div className="anim-tagline mb-8 sm:mb-10 px-2">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full border border-purple-500/20 bg-[#0c081a]/70 backdrop-blur-md shadow-md text-[11px] sm:text-sm font-medium flex-wrap justify-center">
            <span className="text-orange-500 text-xs sm:text-base leading-none">•</span>
            <span className="text-gray-300">Made for <span className="text-orange-400 font-semibold">India.</span></span>
            <span className="text-emerald-500 text-xs sm:text-base leading-none ml-1 sm:ml-2">Built in <span className="text-emerald-400 font-semibold">India.</span></span>
            <span className="text-emerald-500 text-xs sm:text-base leading-none">•</span>
          </div>
        </div>

        {/* Heart Divider */}
        <div className="anim-divider w-full max-w-[200px] sm:max-w-xs mx-auto flex items-center justify-center gap-3 mb-8 sm:mb-12">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
          <Heart className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-purple-400/80 stroke-[1.5]" />
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        </div>

        {/* 3 Pillars / Feature Columns */}
        <div className="anim-features grid grid-cols-3 gap-2 sm:gap-8 w-full max-w-lg mx-auto mb-12 sm:mb-16">
          
          {/* Pillar 1: Communities */}
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="w-11 h-11 sm:w-16 sm:h-16 rounded-full border border-orange-500/50 bg-orange-500/10 flex items-center justify-center mb-2 sm:mb-3 shadow-[0_0_20px_rgba(249,115,22,0.15)] group-hover:scale-105 group-hover:border-orange-400 transition-all duration-300">
              <Users className="w-5 h-5 sm:w-7 sm:h-7 text-orange-400 stroke-[1.5]" />
            </div>
            <span className="text-[11px] sm:text-sm font-medium text-gray-200">Communities</span>
          </div>

          {/* Pillar 2: Speakers */}
          <div className="flex flex-col items-center group cursor-pointer relative">
            <div className="absolute -left-1 sm:-left-4 top-2 bottom-2 w-[1px] bg-purple-500/15" />
            <div className="absolute -right-1 sm:-right-4 top-2 bottom-2 w-[1px] bg-purple-500/15" />
            
            <div className="w-11 h-11 sm:w-16 sm:h-16 rounded-full border border-purple-500/50 bg-purple-500/10 flex items-center justify-center mb-2 sm:mb-3 shadow-[0_0_20px_rgba(168,85,247,0.15)] group-hover:scale-105 group-hover:border-purple-400 transition-all duration-300">
              <Mic className="w-5 h-5 sm:w-7 sm:h-7 text-purple-400 stroke-[1.5]" />
            </div>
            <span className="text-[11px] sm:text-sm font-medium text-gray-200">Speakers</span>
          </div>

          {/* Pillar 3: Attendees */}
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="w-11 h-11 sm:w-16 sm:h-16 rounded-full border border-emerald-500/50 bg-emerald-500/10 flex items-center justify-center mb-2 sm:mb-3 shadow-[0_0_20px_rgba(34,197,94,0.15)] group-hover:scale-105 group-hover:border-emerald-400 transition-all duration-300">
              <User className="w-5 h-5 sm:w-7 sm:h-7 text-emerald-400 stroke-[1.5]" />
            </div>
            <span className="text-[11px] sm:text-sm font-medium text-gray-200">Attendees</span>
          </div>

        </div>

        {/* Curved Glowing Horizon Planet Line */}
        <div className="anim-arc w-full max-w-4xl relative h-12 sm:h-20 overflow-hidden flex items-center justify-center">
          <svg 
            className="w-full h-full text-purple-500/40 overflow-visible"
            viewBox="0 0 1000 100" 
            fill="none" 
            preserveAspectRatio="none"
          >
            <path 
              d="M 0,90 Q 500,-30 1000,90" 
              stroke="url(#purpleGlowGradient)" 
              strokeWidth="2"
              fill="none"
              filter="url(#glow)"
            />
            <defs>
              <linearGradient id="purpleGlowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7e22ce" stopOpacity="0.2" />
                <stop offset="30%" stopColor="#a855f7" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#c084fc" stopOpacity="1" />
                <stop offset="70%" stopColor="#a855f7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#7e22ce" stopOpacity="0.2" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
          </svg>
        </div>

        {/* Callout */}
        <div className="anim-callout flex flex-col items-center gap-4 sm:gap-6 pb-6 pt-1 z-10">
          <p className="text-gray-300 text-xs sm:text-base font-light">
            Let's build the <span className="bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent font-medium">future</span> together.{' '}
            <span className="text-purple-400 inline-block ml-0.5">♡</span>
          </p>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* CLEAN FOOTER BAR                                                          */}
      {/* ========================================================================= */}
      <footer className="relative z-10 bg-[#0B0B0F]/80 backdrop-blur-md border-t border-white/10 anim-footer">
        <div className="w-full max-w-[1920px] 3xl:max-w-[2400px] mx-auto px-6 md:px-12 xl:px-24 py-6 md:py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs md:text-sm text-white/40">
          <p>© {new Date().getFullYear()} Hubbl. All rights reserved.</p>

          <p className="flex items-center gap-1.5 text-white/30 text-xs md:text-sm">
            Made with{" "}
            <Heart
              size={12}
              className="text-fractal-orange fill-fractal-orange"
            />{" "}
            in India
          </p>
        </div>
      </footer>

    </div>
  );
}

export default App;
