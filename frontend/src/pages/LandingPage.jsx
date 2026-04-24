import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Shield, Map, Box, Settings, ArrowRight, Play, CheckCircle2, Search, Star, Zap, Users, Sparkles, Eye, ShieldCheck } from 'lucide-react';

const LandingPage = () => {
  const statsRef = useRef(null);
  const [statsAnimated, setStatsAnimated] = useState(false);
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  
  // Smooth Parallax
  const springConfig = { damping: 30, stiffness: 100 };
  const yParallax = useSpring(useTransform(scrollY, [0, 1000], [0, 200]), springConfig);
  const opacityFade = useTransform(scrollY, [0, 600], [1, 0.9]);

  // Counter logic
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const targets = [12450, 98, 4.2, 8900];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !statsAnimated) {
          setStatsAnimated(true);
          startCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [statsAnimated]);

  const startCounters = () => {
    const duration = 3000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const easeOutExpo = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      
      setCounts(targets.map((target) => target * easeOutExpo(progress)));

      if (frame === totalFrames) {
        setCounts(targets);
        clearInterval(timer);
      }
    }, frameDuration);
  };

  const formatStat = (index, val) => {
    if (index === 0) return Math.floor(val).toLocaleString('en-IN') + '+';
    if (index === 1) return Math.floor(val) + '%';
    if (index === 2) return '₹' + val.toFixed(1) + ' Cr';
    if (index === 3) return Math.floor(val).toLocaleString('en-IN') + '+';
    return val.toString();
  };

  return (
    <div className="bg-[#0F0905] min-h-screen text-white selection:bg-amber-primary/30 overflow-x-hidden font-outfit">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[100vw] h-[100vw] rounded-full bg-amber-primary/5 blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vw] rounded-full bg-amber-secondary/5 blur-[150px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.015]"></div>
      </div>

      {/* Hero Section - Stats Removed */}
      <section className="relative z-10 h-screen min-h-[600px] flex items-center justify-center px-6 lg:px-12 xl:px-24 overflow-hidden pt-12">
        <div className="max-w-[1800px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 space-y-8 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-panel border-amber-primary/20 bg-amber-primary/5 text-amber-primary text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-primary animate-ping"></span>
              Prop-Tech Innovation 2026
            </div>
            
            <h1 className="text-6xl sm:text-7xl xl:text-8xl 2xl:text-9xl font-serif font-bold leading-[0.95] tracking-tighter text-white">
              Know the <span className="text-gradient">Truth</span><br />
              Before You <span className="italic">Lease.</span>
            </h1>
            
            <p className="text-lg sm:text-xl xl:text-2xl text-white/40 max-w-2xl leading-relaxed font-light mx-auto lg:mx-0">
              India's first AI-powered property platform that reveals hidden risks, legal status, and real-time community insights.
            </p>
            
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
              <Link to="/explore" className="btn-amber group !py-5 !px-10 text-xl shadow-amber-glow w-full sm:w-auto">
                Start Exploring
                <ArrowRight className="group-hover:translate-x-3 transition-transform" size={24} />
              </Link>
              <Link to="/virtual-tours" className="btn-glass !py-5 !px-10 text-xl flex items-center justify-center gap-4 w-full sm:w-auto backdrop-blur-3xl">
                <Play size={20} fill="currentColor" />
                Live 3D Tours
              </Link>
            </div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="lg:col-span-5 relative group flex items-center justify-center"
          >
            <div className="relative aspect-square w-full max-w-[600px] rounded-[3rem] overflow-hidden shadow-premium border border-white/10 group-hover:shadow-amber-glow transition-all duration-700">
              <img 
                src="/assets/images/hero_villa.png" 
                alt="Luxury Home" 
                className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0905] via-transparent to-transparent"></div>
              
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-12 -left-8 p-6 glass-panel rounded-2xl border-white/10 shadow-premium backdrop-blur-2xl z-20"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center border border-success/30">
                    <Shield className="text-success" size={24} />
                  </div>
                  <div>
                    <p className="text-[9px] text-white/40 uppercase font-black tracking-widest">Safety Status</p>
                    <p className="text-lg font-bold text-success">Verified A+</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-12 -right-8 p-6 glass-panel rounded-2xl border-white/10 shadow-premium backdrop-blur-2xl z-20"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-primary/20 flex items-center justify-center border border-amber-primary/30">
                    <Map className="text-amber-primary" size={24} />
                  </div>
                  <div>
                    <p className="text-[9px] text-white/40 uppercase font-black tracking-widest">Neighborhood</p>
                    <p className="text-lg font-bold">Satellite, AHMD</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20">
           <div className="w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
           <span className="text-[9px] uppercase font-black tracking-widest text-white/50">Scroll Down</span>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-24 border-y border-white/5 bg-white/[0.01]" ref={statsRef}>
        <div className="max-w-[1800px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">
          {[
            { label: 'Properties Analyzed', icon: <Box className="text-amber-primary" /> },
            { label: 'Risk Accuracy', icon: <Shield className="text-success" /> },
            { label: 'Monthly Volume', icon: <ArrowRight className="text-amber-secondary" /> },
            { label: 'Community Trust', icon: <Users className="text-blue-400" /> }
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <h3 className="text-5xl lg:text-7xl font-bold font-mono tracking-tighter mb-2">
                {formatStat(i, counts[i])}
              </h3>
              <p className="text-[10px] text-white/20 uppercase font-black tracking-[0.4em] group-hover:text-amber-primary transition-colors text-center">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NEW: THE PROCESS SECTION (How it Works) */}
      <section className="py-48 px-6 lg:px-12 xl:px-24 bg-dark-bg relative overflow-hidden">
        <div className="max-w-[1800px] mx-auto">
          <div className="text-center mb-32 space-y-6">
            <span className="text-amber-primary text-xs font-black uppercase tracking-[0.4em]">The HomeTruth Method</span>
            <h2 className="text-5xl lg:text-7xl font-serif font-bold">How We Reveal the <span className="text-gradient italic">Truth</span></h2>
            <p className="text-white/30 text-xl max-w-2xl mx-auto font-light">A multi-layered verification process that ensures you never regret a home decision again.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connection Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-white/5 -z-10"></div>
            
            {[
              { icon: <Sparkles size={32} />, title: "AI Scan", desc: "Our proprietary AI scans legal databases and structural blueprints for hidden flaws.", step: "01" },
              { icon: <Eye size={32} />, title: "Ground Truth", desc: "Local community insights provide real data on water, noise, and neighborhood behavior.", step: "02" },
              { icon: <ShieldCheck size={32} />, title: "Final Rating", desc: "You receive a comprehensive Truth Report with a transparent AI Health Score.", step: "03" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -15 }}
                className="glass-card p-12 rounded-[3rem] border-white/5 hover:border-amber-primary/20 transition-all text-center relative group"
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0F0905] border border-white/10 flex items-center justify-center text-xs font-black text-amber-primary">
                  {item.step}
                </div>
                <div className="w-20 h-20 rounded-[2rem] bg-white/5 flex items-center justify-center mb-10 mx-auto group-hover:scale-110 transition-transform duration-500 border border-white/10 text-amber-primary">
                  {item.icon}
                </div>
                <h3 className="text-3xl font-bold mb-6">{item.title}</h3>
                <p className="text-white/30 text-lg leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="py-48 px-6 lg:px-12 xl:px-24 bg-gradient-to-b from-transparent via-amber-primary/[0.01] to-transparent">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <div className="max-w-4xl">
              <h2 className="text-6xl xl:text-8xl font-serif font-bold mb-8 leading-tight">Spatial <span className="text-gradient italic">Intelligence.</span></h2>
              <p className="text-white/30 text-xl xl:text-3xl leading-relaxed font-light">Advanced AI algorithms revealing the truth brokers won't tell you.</p>
            </div>
            <Link to="/explore" className="text-amber-primary flex items-center gap-4 font-black uppercase tracking-[0.4em] text-xs hover:gap-8 transition-all mb-4">
              Browse All Features <ArrowRight size={24} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <motion.div 
              whileHover={{ y: -10 }}
              className="md:col-span-8 h-[500px] glass-card rounded-[3rem] overflow-hidden relative group cursor-pointer border-white/5 shadow-premium"
              onClick={() => navigate('/map')}
            >
              <img src="/assets/images/map_ui.png" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-[3s]" alt="Map UI" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0905] via-transparent to-transparent"></div>
              <div className="absolute bottom-12 left-12 right-12">
                <span className="inline-block px-5 py-2 bg-amber-primary/10 border border-amber-primary/30 rounded-full text-amber-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6 backdrop-blur-xl">Neighborhood Intelligence</span>
                <h3 className="text-4xl xl:text-5xl font-bold mb-6 text-white">Interactive Spatial Analysis</h3>
                <p className="text-white/40 max-w-xl text-lg leading-relaxed">Visualize water logging, noise pollution, and crime rates with our proprietary map layers.</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="md:col-span-4 h-[500px] glass-card rounded-[3rem] overflow-hidden relative group cursor-pointer border-white/5 shadow-premium"
              onClick={() => navigate('/virtual-tours')}
            >
              <img src="/assets/images/apartment.png" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-[3s]" alt="3D Tour" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0905] via-transparent to-transparent"></div>
              <div className="absolute bottom-12 left-12">
                <h3 className="text-3xl font-bold mb-4">Immersive 3D Tours</h3>
                <p className="text-white/40 text-lg leading-relaxed">Explore every corner before you visit.</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="md:col-span-5 h-[380px] glass-card rounded-[3rem] overflow-hidden relative group cursor-pointer border-white/5 shadow-premium"
              onClick={() => navigate('/services')}
            >
              <img src="/assets/images/service.png" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-[3s]" alt="Services" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0905] via-transparent to-transparent"></div>
              <div className="absolute bottom-12 left-12">
                <h3 className="text-3xl font-bold mb-4">Verified Services</h3>
                <p className="text-white/40 text-lg leading-relaxed">Maintenance & Legal experts.</p>
              </div>
            </motion.div>

            <div className="md:col-span-7 p-12 glass-panel rounded-[3rem] flex flex-col justify-center items-center text-center relative overflow-hidden border-white/5 h-[380px]">
              <div className="absolute inset-0 bg-amber-primary/[0.02] pointer-events-none"></div>
              <div className="w-20 h-20 rounded-[2rem] bg-amber-primary/10 border border-amber-primary/30 flex items-center justify-center mb-8 shadow-amber-glow">
                <CheckCircle2 size={40} className="text-amber-primary" />
              </div>
              <h3 className="text-4xl font-bold mb-4">Zero Information Gap</h3>
              <p className="text-white/30 max-w-xl mb-8 text-lg leading-relaxed font-light">Eliminating bad property decisions using data science and community truth.</p>
              <Link to="/explore" className="btn-amber !py-5 !px-12 text-lg shadow-amber-glow">Join the Revolution</Link>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating */}
      <motion.a 
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        href="https://wa.me/919979265140"
        className="fixed bottom-12 right-12 z-50 w-24 h-24 bg-success rounded-[2.5rem] flex items-center justify-center shadow-[0_20px_60px_rgba(16,185,129,0.5)] group transition-all"
      >
        <div className="absolute inset-0 bg-success rounded-[2.5rem] animate-ping opacity-20"></div>
        <svg className="w-12 h-12 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </motion.a>

    </div>
  );
};

export default LandingPage;
