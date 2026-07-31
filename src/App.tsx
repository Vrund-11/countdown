import { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  Mic, 
  User, 
  Linkedin, 
  Mail,
  Heart
} from 'lucide-react';
import gsap from 'gsap';

// Social Media Dock - LinkedIn + Email only
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

    {/* Email info@Hubbl.in */}
    <a
      href="mailto:info@Hubbl.in"
      aria-label="Email Hubbl at info@Hubbl.in"
      className="group relative p-2.5 sm:p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden transition-all duration-500 ease-in-out hover:border-purple-500/60 hover:bg-purple-500/15 hover:shadow-[0_0_20px_rgba(168,85,247,0.35)]"
    >
      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 group-hover:text-purple-300 group-hover:scale-110 transition-all duration-500 ease-in-out" />
    </a>
  </div>
);

// Vertical Sliding Digit Column for smooth After Effects style countdown reel
const DigitColumn = ({ digit }: { digit: string }) => {
  const num = parseInt(digit, 10);
  const safeNum = isNaN(num) ? 0 : num;

  return (
    <div className="relative h-[1.15em] overflow-hidden inline-block text-center w-[0.62em] [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]">
      <div
        className="transition-transform duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] flex flex-col items-center select-none"
        style={{ transform: `translateY(-${safeNum * 10}%)` }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span key={n} className="h-[1.15em] flex items-center justify-center leading-none font-mono tabular-nums">
            {n}
          </span>
        ))}
      </div>
    </div>
  );
};

const SlidingNumber = ({ value }: { value: number }) => {
  const str = value.toString().padStart(2, '0');
  const digits = str.split('');

  return (
    <div className="flex items-center justify-center">
      {digits.map((d, idx) => (
        <DigitColumn key={idx} digit={d} />
      ))}
    </div>
  );
};

function App() {
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div 
      ref={containerRef} 
      className="relative min-h-screen bg-transparent text-white flex flex-col justify-between overflow-x-hidden font-body selection:bg-purple-500/30 selection:text-purple-200 pt-24 lg:pt-28 2xl:pt-32"
    >

      {/* ========================================================================= */}
      {/* FLOATING BRAND LOGO (Top-Left, Navbar Background Removed)                */}
      {/* ========================================================================= */}
      <header className="fixed top-6 left-6 sm:left-10 lg:left-12 z-50 anim-header">
        <a
          href="/"
          className="flex items-center gap-2.5 cursor-pointer hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.35)] transition-all duration-300"
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
      </header>

      {/* ========================================================================= */}
      {/* LAUNCH TIMER HERO SECTION                                                 */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center text-center px-3 sm:px-6 lg:px-8 flex-1">

        {/* Main Heading */}
        <h1 className="anim-title text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-4 sm:mb-6 mt-4 sm:mt-8 font-heading">
          Building India's Tech{' '}
          <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-200 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(168,85,247,0.4)]">
            Future
          </span>
          <br />
          Together.
        </h1>

        {/* Purple Glowing Dot Divider */}
        <div className="anim-dot w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-400 shadow-[0_0_12px_#c084fc] mb-4 sm:mb-6" />

        {/* Subtitle */}
        <p className="anim-subtitle text-gray-300/90 text-xs sm:text-base md:text-lg max-w-xs sm:max-w-lg mb-8 sm:mb-12 leading-relaxed font-light px-2">
          Connecting communities, speakers <br className="hidden sm:inline" />
          and attendees across <span className="text-purple-400 font-normal">India's</span> tech ecosystem.
        </p>

        {/* Countdown Box with Neon Glow Ring */}
        <div className="anim-card w-full max-w-xl mb-6 sm:mb-8 relative group">
          {/* Animated Neon Glow Backdrop Ring */}
          <div className="absolute -inset-1 rounded-2xl sm:rounded-[32px] bg-gradient-to-r from-purple-600/40 via-indigo-500/30 to-purple-600/40 blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />

          <div className="relative rounded-xl sm:rounded-3xl bg-[#0b0718]/90 border border-purple-500/40 p-4 sm:p-8 backdrop-blur-xl shadow-[0_0_60px_rgba(147,51,234,0.25)]">
            <div className="flex items-center justify-between px-1 sm:px-6">
              
              {/* DAYS */}
              <div className="flex flex-col items-center flex-1">
                <span className="text-2xl sm:text-5xl md:text-6xl font-bold text-purple-400 font-heading tracking-tight drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                  <SlidingNumber value={timeLeft.days} />
                </span>
                <span className="text-[8px] sm:text-xs font-semibold tracking-wider text-purple-200/50 uppercase mt-1 sm:mt-2">
                  DAYS
                </span>
              </div>

              {/* Dot Separator */}
              <span className="text-purple-400/80 text-base sm:text-2xl font-bold select-none pb-4 sm:pb-5">•</span>

              {/* HOURS */}
              <div className="flex flex-col items-center flex-1">
                <span className="text-2xl sm:text-5xl md:text-6xl font-bold text-purple-400 font-heading tracking-tight drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                  <SlidingNumber value={timeLeft.hours} />
                </span>
                <span className="text-[8px] sm:text-xs font-semibold tracking-wider text-purple-200/50 uppercase mt-1 sm:mt-2">
                  HOURS
                </span>
              </div>

              {/* Dot Separator */}
              <span className="text-purple-400/80 text-base sm:text-2xl font-bold select-none pb-4 sm:pb-5">•</span>

              {/* MINUTES */}
              <div className="flex flex-col items-center flex-1">
                <span className="text-2xl sm:text-5xl md:text-6xl font-bold text-purple-400 font-heading tracking-tight drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                  <SlidingNumber value={timeLeft.minutes} />
                </span>
                <span className="text-[8px] sm:text-xs font-semibold tracking-wider text-purple-200/50 uppercase mt-1 sm:mt-2">
                  MINUTES
                </span>
              </div>

              {/* Dot Separator */}
              <span className="text-purple-400/80 text-base sm:text-2xl font-bold select-none pb-4 sm:pb-5">•</span>

              {/* SECONDS */}
              <div className="flex flex-col items-center flex-1">
                <span className="text-2xl sm:text-5xl md:text-6xl font-bold text-purple-400 font-heading tracking-tight drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                  <SlidingNumber value={timeLeft.seconds} />
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

        {/* Tagline Pill (Made in Bharat. Built in Bharat.) */}
        <div className="anim-tagline mb-8 sm:mb-10 px-2">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full border border-purple-500/20 bg-[#0c081a]/70 backdrop-blur-md shadow-md text-[11px] sm:text-sm font-medium flex-wrap justify-center">
            <span className="text-orange-500 text-xs sm:text-base leading-none">•</span>
            <span className="text-orange-400 font-semibold">Made in </span>
            <span className="text-white font-semibold">Bharat.</span>
            <span className="text-white font-medium ml-1 sm:ml-2">Built </span>
            <span className="text-emerald-400 font-semibold">in Bharat.</span>
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
        <div className="anim-callout flex flex-col items-center gap-2 sm:gap-3 pb-6 pt-1 z-10">
          <p className="text-gray-300 text-xs sm:text-base font-light">
            Let's build the <span className="bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent font-medium">future</span> together.{' '}
            <span className="text-purple-400 inline-block ml-0.5">♡</span>
          </p>
          <a 
            href="mailto:info@Hubbl.in" 
            className="text-purple-300/80 hover:text-purple-300 text-xs sm:text-sm font-mono hover:underline transition-all tracking-wide"
          >
            info@Hubbl.in
          </a>
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
              className="text-orange-500 fill-orange-500"
            />{" "}
            in Bharat
          </p>
        </div>
      </footer>

    </div>
  );
}

export default App;
