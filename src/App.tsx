import { useState, useEffect, useRef } from 'react';
import { 
  Calendar, 
  Users, 
  Mic, 
  ArrowRight, 
  Linkedin, 
  Instagram,
  Sparkles, 
  Heart,
  Menu,
  X
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
  const [isNavOpen, setIsNavOpen] = useState(false);

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
      const density = Math.min(Math.floor(window.innerWidth / 15), 80);
      particles = [];
      for (let i = 0; i < density; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1,
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
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - dist / 120) * 0.08;
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
    <div ref={containerRef} className="relative min-h-screen text-white flex flex-col z-10 pt-28">
      {/* Background Interactive Network */}
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" />

      {/* Navigation Header - Matched with Community-Hub-Project Navigation.tsx & SocialMediaDock.tsx */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b anim-header ${
          scrolled
            ? 'bg-zinc-950/85 backdrop-blur-xl border-white/10 shadow-lg shadow-black/20 py-3.5'
            : 'bg-black/40 backdrop-blur-md border-white/5 py-5'
        }`}
      >
        <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 xl:px-16 flex items-center justify-between relative">
          {/* Matched Hubbl Brand Logo */}
          <a
            href="/"
            className="flex items-center gap-2.5 z-50 cursor-pointer hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.35)] transition-all duration-300 shrink-0"
            aria-label="Hubbl Home"
          >
            <img
              src="/logos/new_hubbl_logo.png"
              alt="Hubbl Logo"
              className="h-10 sm:h-11 md:h-12 w-auto object-contain shrink-0"
            />
            <span className="font-heading text-2xl font-bold text-white tracking-wide mt-1">
              Hub<span className="text-violet-500">bl</span>
            </span>
          </a>

          {/* Social Media Dock in Navbar - Matched with Community-Hub-Project SocialMediaDock */}
          <div className="hidden sm:flex items-center gap-4">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/hubblcommunity"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hubbl on LinkedIn"
              className="group relative p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden transition-all duration-500 ease-in-out hover:border-[#0A66C2]/60 hover:bg-[#0A66C2]/15 hover:shadow-[0_0_20px_rgba(10,102,194,0.35)]"
            >
              <Linkedin className="w-5 h-5 text-zinc-400 group-hover:text-[#0A66C2] group-hover:scale-110 transition-all duration-500 ease-in-out" />
            </a>

            {/* X (Formerly Twitter) */}
            <a
              href="https://x.com/hubblcommunity"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hubbl on X"
              className="group relative p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden transition-all duration-500 ease-in-out hover:border-white/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)]"
            >
              <XIcon className="w-5 h-5 text-zinc-400 group-hover:text-white group-hover:scale-110 transition-all duration-500 ease-in-out" />
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/hubblcommunity"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hubbl on Instagram"
              className="group relative p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden transition-all duration-500 ease-in-out hover:border-pink-500/60 hover:bg-gradient-to-tr hover:from-[#f09433]/20 hover:via-[#dc2743]/20 hover:to-[#bc1888]/20 hover:shadow-[0_0_20px_rgba(225,48,108,0.35)]"
            >
              <Instagram className="w-5 h-5 text-zinc-400 group-hover:text-[#E1306C] group-hover:scale-110 transition-all duration-500 ease-in-out" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="sm:hidden text-white p-2 shrink-0 z-50 focus:outline-none hover:text-fractal-orange transition-colors"
            aria-label="Toggle menu"
          >
            {isNavOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer / Overlay Navigation */}
      <div
        className={`fixed inset-0 z-40 bg-[#0B0B0F]/98 backdrop-blur-xl transition-all duration-300 sm:hidden flex flex-col items-center justify-center gap-6 ${
          isNavOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/company/hubblcommunity"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hubbl on LinkedIn"
            onClick={() => setIsNavOpen(false)}
            className="group relative p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden transition-all duration-500 ease-in-out hover:border-[#0A66C2]/60 hover:bg-[#0A66C2]/15 hover:shadow-[0_0_20px_rgba(10,102,194,0.35)]"
          >
            <Linkedin className="w-6 h-6 text-zinc-400 group-hover:text-[#0A66C2] group-hover:scale-110 transition-all duration-500 ease-in-out" />
          </a>

          <a
            href="https://x.com/hubblcommunity"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hubbl on X"
            onClick={() => setIsNavOpen(false)}
            className="group relative p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden transition-all duration-500 ease-in-out hover:border-white/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)]"
          >
            <XIcon className="w-6 h-6 text-zinc-400 group-hover:text-white group-hover:scale-110 transition-all duration-500 ease-in-out" />
          </a>

          <a
            href="https://instagram.com/hubblcommunity"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hubbl on Instagram"
            onClick={() => setIsNavOpen(false)}
            className="group relative p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden transition-all duration-500 ease-in-out hover:border-pink-500/60 hover:bg-gradient-to-tr hover:from-[#f09433]/20 hover:via-[#dc2743]/20 hover:to-[#bc1888]/20 hover:shadow-[0_0_20px_rgba(225,48,108,0.35)]"
          >
            <Instagram className="w-6 h-6 text-zinc-400 group-hover:text-[#E1306C] group-hover:scale-110 transition-all duration-500 ease-in-out" />
          </a>
        </div>
      </div>

      {/* Hero Content */}
      <main className="flex-1 relative z-10 flex flex-col items-center justify-center text-center px-4 py-8 md:py-16 max-w-5xl mx-auto w-full">
        {/* Independence Day / Launch Badge */}
        <div className="anim-badge inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/10 via-white/5 to-green-500/10 border border-white/10 rounded-full px-4 py-1.5 mb-6 shadow-xl backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-orange-400 animate-pulse" />
          <span className="text-xs font-mono font-semibold tracking-wider uppercase text-gray-200">
            Launching August 15 <span className="text-orange-400 font-bold">Midnight</span> IST
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="anim-title text-4xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl font-heading leading-tight">
          Building India's Future, <br className="hidden md:inline" />
          <span className="text-gradient font-black">Together.</span>
        </h1>

        {/* Subtitle */}
        <p className="anim-desc text-sm md:text-lg text-gray-400 max-w-2xl font-body mb-12 leading-relaxed">
          The ultimate ecosystem connecting developer communities, events, and resources. 
          Launching officially on India's Independence Day. Stay tuned!
        </p>

        {/* Countdown Timer / Launched State */}
        {isLaunched ? (
          <div className="anim-card w-full max-w-3xl mb-12 py-10 px-6 glass rounded-2xl relative overflow-hidden flex flex-col items-center justify-center border border-green-500/20 shadow-[0_0_50px_rgba(19,136,8,0.15)] z-10">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-orange-500 via-white to-green-500" />
            <h2 className="text-3xl md:text-5xl font-black font-heading mb-4 text-gradient tracking-wide">
              WE ARE LIVE!
            </h2>
            <p className="text-sm md:text-base text-gray-300 font-body mb-8 max-w-lg">
              Hubbl is officially live and open to all tech communities. Discover meetups, connect with speakers, and build the future of India's tech ecosystem.
            </p>
            <a 
              href="https://hubbl.in" 
              target="_blank" 
              rel="noreferrer"
              className="bg-gradient-to-r from-fractal-purple to-fractal-orange hover:from-fractal-purple/95 hover:to-fractal-orange/95 px-8 py-4 rounded-xl font-heading font-semibold text-base tracking-wider flex items-center gap-2 transition-all hover:shadow-[0_0_30px_rgba(110,43,136,0.5)] hover:scale-[1.02]"
            >
              <span>Explore Hubbl</span>
              <ArrowRight size={18} />
            </a>
          </div>
        ) : (
          <div className="anim-card grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-3xl mb-12 glow-container">
            {[
              { label: 'DAYS', value: timeLeft.days },
              { label: 'HOURS', value: timeLeft.hours },
              { label: 'MINUTES', value: timeLeft.minutes },
              { label: 'SECONDS', value: timeLeft.seconds }
            ].map((item, index) => (
              <div 
                key={index}
                className="glass glass-hover rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center relative overflow-hidden group"
              >
                {/* Card top gradient indicator */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-fractal-purple to-fractal-orange opacity-60" />
                
                <span className="text-4xl md:text-6xl font-black font-mono-data tracking-tight mb-2 text-white group-hover:scale-105 transition-transform duration-300">
                  {formatNumber(item.value)}
                </span>
                <span className="text-[10px] md:text-xs font-mono tracking-widest text-gray-400 uppercase font-semibold">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Feature Teasers */}
        <div className="anim-features w-full max-w-4xl border-t border-white/5 pt-16">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-8 font-heading">
            What is coming to <span className="text-gradient">Hubbl</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              {
                icon: <Users className="w-6 h-6 text-orange-400" />,
                title: "Unified Communities",
                desc: "Discover AWS, Tableau, Databricks, and Fabric groups unified under one portal."
              },
              {
                icon: <Calendar className="w-6 h-6 text-purple-400" />,
                title: "Interactive Events",
                desc: "Never miss meetups, webinars, or summits with our multi-toggle custom schedules."
              },
              {
                icon: <Mic className="w-6 h-6 text-blue-400" />,
                title: "Speaker Directory",
                desc: "Find speakers or showcase your own voice with premium profiles."
              }
            ].map((feature, index) => (
              <div key={index} className="glass p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                <div className="bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-heading font-semibold text-base text-white mb-2">{feature.title}</h3>
                <p className="font-body text-xs text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 mt-16 max-w-7xl mx-auto px-6 w-full flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 font-body gap-4">
        <div>
          © {new Date().getFullYear()} Hubbl. India's Future of Community.
        </div>
        <div className="flex items-center gap-2">
          <span>Made with</span>
          <Heart size={10} className="text-red-500 fill-red-500 animate-pulse" />
          <span>for communities in India</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
