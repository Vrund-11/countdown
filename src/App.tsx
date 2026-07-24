import { useState, useEffect, useRef } from 'react';
import { 
  Calendar, 
  Users, 
  Mic, 
  ArrowRight, 
  Linkedin, 
  Instagram,
  Sparkles, 
  Heart
} from 'lucide-react';
import gsap from 'gsap';

// Exact X (formerly Twitter) Icon from Community-Hub-Project SocialMediaDock
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

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Target Launch Date: August 15, 2026 at Midnight IST (00:00:00 GMT+5:30)
  const targetDate = new Date('2026-08-15T00:00:00+05:30').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [isLaunched, setIsLaunched] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 1. Countdown logic
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Date.now();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsLaunched(true);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
      setIsLaunched(false);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  // 2. Scroll listener for Navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3. Interactive Canvas Particles (Hubbl Network Visuals)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }> = [];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const density = Math.min(Math.floor(window.innerWidth / 15), 100);
      particles = [];
      for (let i = 0; i < density; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2.5 + 1,
          alpha: Math.random() * 0.5 + 0.1
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 118, 79, ${p.alpha})`;
        ctx.fill();

        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - dist / 130) * 0.08;
            ctx.strokeStyle = `rgba(110, 43, 136, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // 4. GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.anim-header', {
        y: -30,
        opacity: 0,
        duration: 0.8
      })
      .from('.anim-badge', {
        scale: 0.8,
        opacity: 0,
        duration: 0.6
      }, '-=0.4')
      .from('.anim-title', {
        y: 20,
        opacity: 0,
        duration: 0.8
      }, '-=0.4')
      .from('.anim-desc', {
        y: 15,
        opacity: 0,
        duration: 0.6
      }, '-=0.4')
      .from('.anim-card', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8
      }, '-=0.4')
      .from('.anim-socials', {
        scale: 0.9,
        opacity: 0,
        duration: 0.6
      }, '-=0.3')
      .from('.anim-features', {
        y: 40,
        opacity: 0,
        duration: 0.8
      }, '-=0.2');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div ref={containerRef} className="relative min-h-screen text-white flex flex-col z-10 pt-28 2xl:pt-40 3xl:pt-48 4xl:pt-56">
      {/* Background Interactive Network */}
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" />

      {/* Navigation Header - Clean Logo Only Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b anim-header ${
          scrolled
            ? 'bg-zinc-950/85 backdrop-blur-xl border-white/10 shadow-lg shadow-black/20 py-3.5 2xl:py-5 3xl:py-6'
            : 'bg-black/40 backdrop-blur-md border-white/5 py-5 2xl:py-7 3xl:py-8'
        }`}
      >
        <div className="w-full max-w-[1920px] 3xl:max-w-[2400px] mx-auto px-4 md:px-8 xl:px-16 2xl:px-24 flex items-center justify-between relative">
          {/* Matched Hubbl Brand Logo */}
          <a
            href="/"
            className="flex items-center gap-2.5 2xl:gap-4 z-50 cursor-pointer hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.35)] transition-all duration-300 shrink-0"
            aria-label="Hubbl Home"
          >
            <img
              src="/logos/new_hubbl_logo.png"
              alt="Hubbl Logo"
              className="h-10 sm:h-11 md:h-12 2xl:h-16 3xl:h-20 4xl:h-24 w-auto object-contain shrink-0"
            />
            <span className="font-heading text-2xl 2xl:text-4xl 3xl:text-5xl 4xl:text-6xl font-bold text-white tracking-wide mt-1">
              Hub<span className="text-violet-500">bl</span>
            </span>
          </a>
        </div>
      </nav>

      {/* Hero Content - Fully Responsive for Mobile, Tablet, Desktop, & 20"+ Displays */}
      <main className="flex-1 relative z-10 flex flex-col items-center justify-center text-center px-4 py-8 md:py-16 2xl:py-24 3xl:py-32 max-w-5xl 2xl:max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[2000px] mx-auto w-full">
        {/* Independence Day / Launch Badge */}
        <div className="anim-badge inline-flex items-center gap-2 2xl:gap-3 bg-gradient-to-r from-orange-500/10 via-white/5 to-green-500/10 border border-white/10 rounded-full px-4 py-1.5 2xl:px-7 2xl:py-3 3xl:px-9 3xl:py-4 mb-6 2xl:mb-10 3xl:mb-12 shadow-xl backdrop-blur-md">
          <Sparkles className="w-4 h-4 2xl:w-6 2xl:h-6 3xl:w-8 3xl:h-8 text-orange-400 animate-pulse" />
          <span className="text-xs 2xl:text-lg 3xl:text-2xl 4xl:text-3xl font-mono font-semibold tracking-wider uppercase text-gray-200">
            Launching August 15 <span className="text-orange-400 font-bold">Midnight</span> IST
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="anim-title text-4xl sm:text-6xl md:text-7xl 2xl:text-8xl 3xl:text-[105px] 4xl:text-[130px] font-bold tracking-tight mb-6 2xl:mb-10 3xl:mb-12 max-w-4xl 2xl:max-w-6xl 3xl:max-w-7xl font-heading leading-tight">
          Building India's Future, <br className="hidden md:inline" />
          <span className="text-gradient font-black">Together.</span>
        </h1>

        {/* Subtitle */}
        <p className="anim-desc text-sm md:text-lg 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl text-gray-400 max-w-2xl 2xl:max-w-4xl 3xl:max-w-5xl font-body mb-10 2xl:mb-16 3xl:mb-20 leading-relaxed">
          The ultimate ecosystem connecting developer communities, events, and resources. 
          Launching officially on India's Independence Day. Stay tuned!
        </p>

        {/* Countdown Timer / Launched State */}
        {isLaunched ? (
          <div className="anim-card w-full max-w-3xl 2xl:max-w-5xl 3xl:max-w-6xl mb-12 2xl:mb-16 py-10 2xl:py-16 px-6 2xl:px-12 glass rounded-2xl 2xl:rounded-3xl relative overflow-hidden flex flex-col items-center justify-center border border-green-500/20 shadow-[0_0_50px_rgba(19,136,8,0.15)] z-10">
            <div className="absolute top-0 left-0 w-full h-[3px] 2xl:h-[5px] bg-gradient-to-r from-orange-500 via-white to-green-500" />
            <h2 className="text-3xl md:text-5xl 2xl:text-7xl 3xl:text-8xl font-black font-heading mb-4 2xl:mb-8 text-gradient tracking-wide">
              WE ARE LIVE!
            </h2>
            <p className="text-sm md:text-base 2xl:text-2xl 3xl:text-3xl text-gray-300 font-body mb-8 2xl:mb-12 max-w-lg 2xl:max-w-2xl">
              Hubbl is officially live and open to all tech communities. Discover meetups, connect with speakers, and build the future of India's tech ecosystem.
            </p>
            <a 
              href="https://hubbl.in" 
              target="_blank" 
              rel="noreferrer"
              className="bg-gradient-to-r from-fractal-purple to-fractal-orange hover:from-fractal-purple/95 hover:to-fractal-orange/95 px-8 2xl:px-12 py-4 2xl:py-6 rounded-xl 2xl:rounded-2xl font-heading font-semibold text-base 2xl:text-2xl 3xl:text-3xl tracking-wider flex items-center gap-2 2xl:gap-4 transition-all hover:shadow-[0_0_30px_rgba(110,43,136,0.5)] hover:scale-[1.02]"
            >
              <span>Explore Hubbl</span>
              <ArrowRight className="w-5 h-5 2xl:w-8 2xl:h-8" />
            </a>
          </div>
        ) : (
          <div className="anim-card grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 2xl:gap-8 3xl:gap-12 w-full max-w-3xl 2xl:max-w-5xl 3xl:max-w-6xl 4xl:max-w-7xl mb-8 2xl:mb-12 3xl:mb-16 glow-container">
            {[
              { label: 'DAYS', value: timeLeft.days },
              { label: 'HOURS', value: timeLeft.hours },
              { label: 'MINUTES', value: timeLeft.minutes },
              { label: 'SECONDS', value: timeLeft.seconds }
            ].map((item, index) => (
              <div 
                key={index}
                className="glass glass-hover rounded-2xl 2xl:rounded-3xl p-6 md:p-8 2xl:p-12 3xl:p-16 flex flex-col items-center justify-center relative overflow-hidden group"
              >
                {/* Card top gradient indicator */}
                <div className="absolute top-0 left-0 w-full h-[3px] 2xl:h-[5px] bg-gradient-to-r from-fractal-purple to-fractal-orange opacity-60" />
                
                <span className="text-4xl md:text-6xl 2xl:text-8xl 3xl:text-[100px] 4xl:text-[120px] font-black font-mono-data tracking-tight mb-2 2xl:mb-4 text-white group-hover:scale-105 transition-transform duration-300">
                  {formatNumber(item.value)}
                </span>
                <span className="text-[10px] md:text-xs 2xl:text-base 3xl:text-xl 4xl:text-2xl font-mono tracking-widest text-gray-400 uppercase font-semibold">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Social Media Dock - Placed directly below the timer */}
        <div className="anim-socials mb-16 2xl:mb-24 3xl:mb-28 flex flex-col items-center gap-3 2xl:gap-5 3xl:gap-6">
          <span className="text-xs sm:text-sm 2xl:text-lg 3xl:text-xl font-mono uppercase tracking-widest text-gray-400 font-semibold">
            Connect With Us
          </span>
          <div className="flex items-center gap-4 sm:gap-6 2xl:gap-8 3xl:gap-10">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/hubblcommunity"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hubbl on LinkedIn"
              className="group relative p-3.5 sm:p-4 2xl:p-6 3xl:p-8 rounded-2xl 2xl:rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden transition-all duration-500 ease-in-out hover:border-[#0A66C2]/60 hover:bg-[#0A66C2]/15 hover:shadow-[0_0_30px_rgba(10,102,194,0.45)] hover:scale-105"
            >
              <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 2xl:w-9 2xl:h-9 3xl:w-11 3xl:h-11 text-zinc-400 group-hover:text-[#0A66C2] group-hover:scale-110 transition-all duration-500 ease-in-out" />
            </a>

            {/* X (Formerly Twitter) */}
            <a
              href="https://x.com/hubblcommunity"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hubbl on X"
              className="group relative p-3.5 sm:p-4 2xl:p-6 3xl:p-8 rounded-2xl 2xl:rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden transition-all duration-500 ease-in-out hover:border-white/50 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.35)] hover:scale-105"
            >
              <XIcon className="w-5 h-5 sm:w-6 sm:h-6 2xl:w-9 2xl:h-9 3xl:w-11 3xl:h-11 text-zinc-400 group-hover:text-white group-hover:scale-110 transition-all duration-500 ease-in-out" />
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/hubblcommunity"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hubbl on Instagram"
              className="group relative p-3.5 sm:p-4 2xl:p-6 3xl:p-8 rounded-2xl 2xl:rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden transition-all duration-500 ease-in-out hover:border-pink-500/60 hover:bg-gradient-to-tr hover:from-[#f09433]/20 hover:via-[#dc2743]/20 hover:to-[#bc1888]/20 hover:shadow-[0_0_30px_rgba(225,48,108,0.45)] hover:scale-105"
            >
              <Instagram className="w-5 h-5 sm:w-6 sm:h-6 2xl:w-9 2xl:h-9 3xl:w-11 3xl:h-11 text-zinc-400 group-hover:text-[#E1306C] group-hover:scale-110 transition-all duration-500 ease-in-out" />
            </a>
          </div>
        </div>

        {/* Feature Teasers */}
        <div className="anim-features w-full max-w-4xl 2xl:max-w-6xl 3xl:max-w-7xl border-t border-white/5 pt-16 2xl:pt-24 3xl:pt-28">
          <h2 className="text-xl md:text-2xl 2xl:text-4xl 3xl:text-5xl font-bold tracking-tight mb-8 2xl:mb-14 3xl:mb-16 font-heading">
            What is coming to <span className="text-gradient">Hubbl</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 2xl:gap-10 3xl:gap-12 text-left">
            {[
              {
                icon: <Users className="w-6 h-6 2xl:w-10 2xl:h-10 3xl:w-12 3xl:h-12 text-orange-400" />,
                title: "Unified Communities",
                desc: "Discover AWS, Tableau, Databricks, and Fabric groups unified under one portal."
              },
              {
                icon: <Calendar className="w-6 h-6 2xl:w-10 2xl:h-10 3xl:w-12 3xl:h-12 text-purple-400" />,
                title: "Interactive Events",
                desc: "Never miss meetups, webinars, or summits with our multi-toggle custom schedules."
              },
              {
                icon: <Mic className="w-6 h-6 2xl:w-10 2xl:h-10 3xl:w-12 3xl:h-12 text-blue-400" />,
                title: "Speaker Directory",
                desc: "Find speakers or showcase your own voice with premium profiles."
              }
            ].map((feature, index) => (
              <div key={index} className="glass p-6 2xl:p-10 3xl:p-12 rounded-2xl 2xl:rounded-3xl border border-white/5 hover:border-white/10 transition-all">
                <div className="bg-white/5 w-12 h-12 2xl:w-16 2xl:h-16 3xl:w-20 3xl:h-20 rounded-xl 2xl:rounded-2xl flex items-center justify-center mb-4 2xl:mb-6">
                  {feature.icon}
                </div>
                <h3 className="font-heading font-semibold text-base 2xl:text-2xl 3xl:text-3xl text-white mb-2 2xl:mb-4">{feature.title}</h3>
                <p className="font-body text-xs 2xl:text-base 3xl:text-xl text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 2xl:py-12 3xl:py-16 mt-16 2xl:mt-28 3xl:mt-32 max-w-7xl 2xl:max-w-[1700px] 3xl:max-w-[2200px] mx-auto px-6 2xl:px-16 w-full flex flex-col sm:flex-row items-center justify-between text-xs 2xl:text-base 3xl:text-xl text-gray-500 font-body gap-4">
        <div>
          © {new Date().getFullYear()} Hubbl. India's Future of Community.
        </div>
        <div className="flex items-center gap-2 2xl:gap-3">
          <span>Made with</span>
          <Heart size={12} className="text-red-500 fill-red-500 animate-pulse 2xl:w-5 2xl:h-5 3xl:w-6 3xl:h-6" />
          <span>for communities in India</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
