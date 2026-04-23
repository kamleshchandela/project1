import { motion } from 'framer-motion';
import Badge from '../ui/Badge';
import Button from '../common/Button';
import SearchBar from '../ui/SearchBar';
import Container from '../common/Container';
import { useState } from 'react';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0A0A0F]">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <Container className="relative z-10 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-6 flex justify-center">
            <Badge glow>✨ AI-POWERED REAL ESTATE INTELLIGENCE</Badge>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 bg-gradient-to-r from-white to-amber-400 bg-clip-text text-transparent"
          >
            Find the Truth.<br />
            Before You Move In.
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
          >
            AI-powered home intelligence revealing hidden costs, risks, 
            and government benefits for every property
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button variant="primary" size="lg" icon="🔍" onClick={() => window.location.href = '/explore'}>
              Explore Homes →
            </Button>
            <Button variant="secondary" size="lg" icon="🎮" onClick={() => window.location.href = '/3dtours'}>
              View 3D Tours →
            </Button>
          </motion.div>

          <motion.div variants={itemVariants} className="max-w-2xl mx-auto mb-6">
            <SearchBar 
              placeholder="Search by city, locality, property name..."
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={() => window.location.href = `/explore?q=${searchQuery}`}
            />
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              <span className="text-gray-500 text-sm">Popular:</span>
              {['Mumbai', 'Bangalore', 'Delhi NCR', 'Pune', 'Hyderabad'].map(city => (
                <button 
                  key={city}
                  onClick={() => setSearchQuery(city)}
                  className="px-3 py-1 rounded-full border border-white/5 bg-white/5 text-sm text-gray-300 hover:border-amber-500/50 hover:text-amber-500 transition-all"
                >
                  {city}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-6 justify-center text-sm text-gray-500">
            <span className="flex items-center gap-1">⭐ 4.9 Rating (2,500+ reviews)</span>
            <span className="flex items-center gap-1">✅ Trusted by 50,000+ users</span>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Hero;
