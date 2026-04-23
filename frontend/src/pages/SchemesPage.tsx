import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Zap, Info, ArrowRight, CheckCircle2, AlertCircle, Sparkles, ChevronDown, Coins, Calculator } from 'lucide-react';

const mockSchemes = [
  {
    id: '1',
    name: 'Pradhan Mantri Awas Yojana (PMAY)',
    category: 'central',
    benefitAmount: '₹2.67 Lakh',
    benefitType: 'subsidy',
    eligibility: 'First-time home buyers with income up to ₹18L per annum.',
    deadline: '2026-12-31',
    status: 'active',
    description: 'Credit Linked Subsidy Scheme (CLSS) for EWS, LIG, and MIG categories.'
  },
  {
    id: '2',
    name: 'Section 80EEA Tax Deduction',
    category: 'tax',
    benefitAmount: '₹1.5 Lakh',
    benefitType: 'tax_deduction',
    eligibility: 'Affordable housing loans taken between April 2019 and March 2022.',
    deadline: 'N/A',
    status: 'active',
    description: 'Additional deduction for interest paid on home loans for first-time buyers.'
  },
  {
    id: '3',
    name: 'State Stamp Duty Rebate',
    category: 'state',
    benefitAmount: '1-2% of Value',
    benefitType: 'subsidy',
    eligibility: 'Women home buyers in specific states like Maharashtra, Delhi, and Karnataka.',
    deadline: 'Ongoing',
    status: 'active',
    description: 'Reduced stamp duty rates to encourage women ownership of property.'
  }
];

const incomeOptions = [
  { id: 'ews', label: 'Up to ₹3 Lakh (EWS)' },
  { id: 'lig', label: '₹3 Lakh - ₹6 Lakh (LIG)' },
  { id: 'mig1', label: '₹6 Lakh - ₹12 Lakh (MIG I)' },
  { id: 'mig2', label: '₹12 Lakh - ₹18 Lakh (MIG II)' },
  { id: 'general', label: 'Above ₹18 Lakh' }
];

const SchemesPage: React.FC = () => {
  const [income, setIncome] = useState('');
  const [isIncomeOpen, setIsIncomeOpen] = useState(false);
  const [isFirstBuyer, setIsFirstBuyer] = useState<boolean | null>(null);

  return (
    <div className="bg-[#0F0905] min-h-screen pt-32 pb-20 px-6 lg:px-12 selection:bg-amber-primary/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-[60vw] h-[60vw] rounded-full bg-amber-primary/5 blur-[150px]"></div>
        <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] rounded-full bg-blue-500/5 blur-[150px]"></div>
      </div>

      <div className="max-w-[1800px] mx-auto relative z-10">
        
        {/* Cinematic Header */}
        <div className="max-w-4xl mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full glass-panel border-amber-primary/20 bg-amber-primary/5 text-amber-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8"
          >
            <Coins size={12} /> Financial Empowerment
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl lg:text-8xl font-serif font-bold leading-tight mb-8"
          >
            Unlock Your <span className="text-gradient italic">Benefits.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-xl lg:text-2xl font-light max-w-2xl leading-relaxed"
          >
            Most Indian home buyers miss out on ₹2.5 Lakh+ in government benefits. Use our AI-powered engine to discover and claim your entitlements.
          </motion.p>
        </div>

        {/* Eligibility Checker - PREMIUM UI */}
        <section className="mb-24 relative z-[60]">
          <div className="glass-panel p-10 lg:p-16 rounded-[4rem] border-white/5 bg-white/[0.01] relative group !overflow-visible z-[60]">
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:rotate-12 transition-transform overflow-hidden pointer-events-none">
               <Calculator size={120} className="text-amber-primary" />
            </div>
            
            <div className="relative z-10 !overflow-visible">
              <div className="flex items-center gap-4 mb-10">
                <Sparkles size={24} className="text-amber-primary" />
                <h2 className="text-4xl font-serif font-bold">Eligibility AI Engine</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 !overflow-visible">
                
                {/* CUSTOM PREMIUM DROPDOWN */}
                <div className="relative !overflow-visible">
                  <label className="text-[10px] text-white/20 block mb-4 font-black uppercase tracking-[0.3em]">Annual Family Income</label>
                  <button 
                    onClick={() => setIsIncomeOpen(!isIncomeOpen)}
                    className={`w-full flex items-center justify-between px-8 py-6 glass-panel rounded-3xl border-white/10 transition-all duration-300 ${isIncomeOpen ? 'border-amber-primary/40 bg-amber-primary/5 shadow-amber-glow' : 'hover:border-white/30'}`}
                  >
                    <span className={`text-base font-medium ${income ? 'text-white' : 'text-white/20'}`}>
                      {income ? incomeOptions.find(o => o.id === income)?.label : 'Select Income Range'}
                    </span>
                    <motion.div animate={{ rotate: isIncomeOpen ? 180 : 0 }}>
                      <ChevronDown size={20} className="text-amber-primary" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isIncomeOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute left-0 right-0 mt-3 glass-panel border-white/10 p-3 rounded-3xl z-[50] shadow-[0_30px_100px_rgba(0,0,0,0.8)] backdrop-blur-3xl bg-black/95 max-h-[400px] overflow-y-auto custom-scrollbar"
                      >
                        {incomeOptions.map((option) => (
                          <button
                            key={option.id}
                            onClick={() => {
                              setIncome(option.id);
                              setIsIncomeOpen(false);
                            }}
                            className={`w-full text-left px-6 py-4 rounded-2xl text-sm font-bold transition-all mb-1 last:mb-0 ${
                              income === option.id 
                              ? 'bg-amber-primary/10 text-amber-primary' 
                              : 'text-white/40 hover:bg-white/5 hover:text-white'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <label className="text-[10px] text-white/20 block mb-4 font-black uppercase tracking-[0.3em]">First-Time Home Buyer?</label>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setIsFirstBuyer(true)}
                      className={`flex-1 py-6 rounded-3xl border-2 transition-all font-bold text-lg ${isFirstBuyer === true ? 'border-amber-primary bg-amber-primary/10 text-amber-primary shadow-amber-glow' : 'border-white/5 bg-white/5 text-white/40 hover:border-white/20 hover:text-white'}`}
                    >
                      Yes
                    </button>
                    <button 
                      onClick={() => setIsFirstBuyer(false)}
                      className={`flex-1 py-6 rounded-3xl border-2 transition-all font-bold text-lg ${isFirstBuyer === false ? 'border-amber-primary bg-amber-primary/10 text-amber-primary shadow-amber-glow' : 'border-white/5 bg-white/5 text-white/40 hover:border-white/20 hover:text-white'}`}
                    >
                      No
                    </button>
                  </div>
                </div>

                <div className="flex items-end">
                  <button className="btn-amber w-full py-6 text-lg font-bold shadow-amber-glow-strong flex items-center justify-center gap-3">
                    Calculate Benefits <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockSchemes.map((scheme, index) => (
            <motion.div
              key={scheme.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-[2.5rem] border-white/5 shadow-premium flex flex-col group hover:border-amber-primary/20 transition-all duration-500 h-full"
            >
              <div className="flex justify-between items-start mb-6">
                <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
                  scheme.category === 'central' ? 'bg-blue-500/5 text-blue-400 border-blue-500/20' : 
                  scheme.category === 'tax' ? 'bg-purple-500/5 text-purple-400 border-purple-500/20' : 'bg-success/5 text-success border-success/20'
                }`}>
                  {scheme.category} Authority
                </span>
                <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-white/20">
                  <AlertCircle size={12} className="text-amber-primary/40" /> {scheme.deadline}
                </div>
              </div>

              <h3 className="text-2xl font-serif font-bold mb-4 leading-tight h-16 line-clamp-2 group-hover:text-amber-primary transition-colors">{scheme.name}</h3>
              
              <div className="my-6 p-6 bg-white/[0.02] rounded-2xl border border-white/5 group-hover:bg-amber-primary/5 transition-all">
                <p className="text-[9px] text-white/20 uppercase font-black tracking-widest mb-1.5">Max Benefit</p>
                <p className="text-4xl font-mono font-bold text-white group-hover:text-amber-primary transition-colors tracking-tighter">{scheme.benefitAmount}</p>
              </div>

              <div className="space-y-4 mb-8 flex-1">
                <div className="flex items-start gap-3 text-white/50 leading-relaxed">
                  <CheckCircle2 size={16} className="text-success shrink-0 mt-1" />
                  <span className="text-[13px] font-medium line-clamp-2">{scheme.eligibility}</span>
                </div>
                <div className="flex items-start gap-3 text-white/30 leading-relaxed italic">
                  <Info size={16} className="text-amber-primary/40 shrink-0 mt-1" />
                  <span className="text-[12px] line-clamp-3">{scheme.description}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-white/5 mt-auto">
                <button className="flex-1 p-3 rounded-xl glass-panel border-white/10 text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all text-white/60">
                   Guide
                </button>
                <button className="flex-1 btn-amber !py-3 !px-0 text-[9px] font-black uppercase tracking-widest shadow-amber-glow flex items-center justify-center gap-2">
                  Apply Now <ArrowRight size={12} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Missing Money Global CTA */}
        <section className="mt-48">
          <div className="glass-panel p-20 rounded-[4rem] text-center relative overflow-hidden border-white/5 bg-amber-primary/5">
            <div className="absolute top-0 left-0 p-10 opacity-5 group-hover:rotate-12 transition-transform">
               <ShieldCheck size={160} className="text-amber-primary" />
            </div>
            <h2 className="text-5xl lg:text-7xl font-serif font-bold mb-8 italic text-amber-primary">Don't Leave Money on the Table.</h2>
            <p className="text-white/40 text-2xl max-w-3xl mx-auto mb-12 font-light leading-relaxed">
              We've helped users recover over <span className="text-white font-bold">₹150 Crores</span> in unclaimed government subsidies.
            </p>
            <button className="btn-amber !py-7 !px-16 text-xl font-bold shadow-amber-glow-strong">Unlock All My Benefits</button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default SchemesPage;
