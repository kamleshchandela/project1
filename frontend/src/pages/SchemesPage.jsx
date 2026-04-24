import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Zap, Info, ArrowRight, CheckCircle2, AlertCircle, Sparkles, ChevronDown, Coins, Calculator, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

const mockSchemes = [
  {
    id: 'pmay',
    name: 'Pradhan Mantri Awas Yojana (PMAY)',
    category: 'central',
    benefitAmount: '₹2.67 Lakh',
    benefitType: 'subsidy',
    eligibility: 'First-time home buyer, Income ≤ ₹9L (latest phase), No pucca house in India',
    deadline: '2026-12-31',
    status: 'active',
    description: 'PMAY 2.0 offers up to ₹1.8 lakh subsidy for EWS/LIG families.',
    applyUrl: 'https://pmaymis.gov.in/',
    applyLabel: 'Apply for Subsidy',
    guide: {
      officialInfo: 'https://pmay-urban.gov.in/',
      launch: '2015',
      purpose: 'Housing for all (Urban poor)',
      subsidyType: 'Credit Linked Subsidy Scheme (CLSS)',
      incomeEligibility: [
        { level: 'EWS', limit: '≤ ₹3L' },
        { level: 'LIG', limit: '₹3–6L' },
        { level: 'MIG', limit: 'Up to ₹9L (new phase)' }
      ],
      documents: ['Aadhaar Card', 'Income Proof', 'Property Papers'],
      process: 'Apply → Fill form → Bank verification → Subsidy credited to loan'
    }
  },
  {
    id: '80eea',
    name: 'Section 80EEA Tax Deduction',
    category: 'tax',
    benefitAmount: '₹1.5 Lakh',
    benefitType: 'tax_deduction',
    eligibility: 'First-time home buyer, Property value ≤ ₹45 lakh, Loan sanctioned between April 2019 - March 2022',
    deadline: 'N/A',
    status: 'expired',
    description: 'Additional deduction for interest paid on home loans for first-time buyers.',
    applyUrl: 'https://www.incometax.gov.in',
    applyLabel: 'Claim in ITR',
    guide: {
      introduced: 'Budget 2019',
      validity: 'Loan sanctioned April 2019 – March 2022',
      rules: 'Claim while filing ITR, Property value must be ≤ ₹45L',
      example: 'Interest ₹2L (Standard) + Extra ₹1.5L (80EEA)',
      note: 'New loans after 2022 are not eligible for this specific section.'
    }
  },
  {
    id: 'stamp-duty',
    name: 'State Stamp Duty Rebate',
    category: 'state',
    benefitAmount: '1-2% of Value',
    benefitType: 'subsidy',
    eligibility: 'Mostly property in female name, Depends on state rules (Maharashtra, Delhi, Karnataka)',
    deadline: 'Ongoing',
    status: 'active',
    description: 'Reduced stamp duty rates to encourage women ownership of property.',
    applyUrl: 'https://igrmaharashtra.gov.in/',
    applyLabel: 'Check State Portal',
    guide: {
      states: [
        { name: 'Maharashtra', portal: 'igrmaharashtra.gov.in' },
        { name: 'Delhi', portal: 'delhi.gov.in' }
      ],
      savingExample: 'For property ₹50L, saving could be ₹50k – ₹1L',
      qualifier: 'Female ownership is the primary qualifier in most states.'
    }
  },
  {
    id: 'section-24b',
    name: 'Section 24(b) Interest Deduction',
    category: 'tax',
    benefitAmount: '₹2 Lakh / year',
    benefitType: 'tax_deduction',
    eligibility: 'Home loan for purchase/construction, Property completed within 5 years, Self-occupied',
    deadline: 'N/A',
    status: 'active',
    description: 'Deduct up to ₹2 Lakh interest paid on your home loan annually.',
    applyUrl: 'https://www.incometax.gov.in',
    applyLabel: 'Claim in ITR',
    guide: {
      details: 'Interest deduction on home loan interest.',
      maxBenefit: '₹2,00,000 per financial year.',
      requirements: ['Self-occupied property', 'Construction must be completed within 5 years of loan'],
      example: 'Interest paid ₹3L → Claim ₹2L under 24(b)'
    }
  },
  {
    id: 'section-80c',
    name: 'Section 80C Home Loan Benefit',
    category: 'tax',
    benefitAmount: '₹1.5 Lakh',
    benefitType: 'tax_deduction',
    eligibility: 'Home loan EMI (principal part), Property not sold within 5 years',
    deadline: 'N/A',
    status: 'active',
    description: 'Covers loan principal repayment and stamp duty charges.',
    applyUrl: 'https://www.incometax.gov.in',
    applyLabel: 'Claim in ITR',
    guide: {
      details: 'Deduction for principal repayment of home loan.',
      maxBenefit: '₹1,50,000 (combined with other 80C investments).',
      lockIn: 'Property must not be sold within 5 years of possession.',
      components: ['Principal Repayment', 'Stamp Duty', 'Registration Fees']
    }
  },
  {
    id: 'gst-benefit',
    name: 'Affordable Housing GST Benefit',
    category: 'tax',
    benefitAmount: '4-7% Savings',
    benefitType: 'tax_deduction',
    eligibility: 'Under-construction property, Affordable housing category',
    deadline: 'Ongoing',
    status: 'active',
    description: 'Reduced GST rates for affordable and regular housing.',
    applyUrl: '#',
    applyLabel: 'Auto-applied by Builder',
    guide: {
      rates: '1% for Affordable Housing, 5% for Regular Housing.',
      definition: 'Carpet area up to 60/90 sqm and value up to ₹45L.',
      benefit: 'Saves 4-7% compared to old GST rates.'
    }
  },
  {
    id: 'pmay-gramin',
    name: 'PMAY Gramin (Rural)',
    category: 'central',
    benefitAmount: '₹1.2 Lakh',
    benefitType: 'subsidy',
    eligibility: 'Rural households, No permanent house, SECC 2011 list',
    deadline: 'Ongoing',
    status: 'active',
    description: 'Rural version of PMAY providing financial assistance for house construction.',
    applyUrl: 'https://pmayg.nic.in/',
    applyLabel: 'Rural Portal',
    guide: {
      assistance: '₹1.2 Lakh (Plains) / ₹1.3 Lakh (Hilly areas).',
      verification: 'Gram Panchayat verification of SECC data.',
      purpose: 'Construction of pucca house with basic amenities.'
    }
  },
  {
    id: 'state-subsidy',
    name: 'State First-Time Buyer Subsidy',
    category: 'state',
    benefitAmount: '₹50K - ₹2 Lakh',
    benefitType: 'subsidy',
    eligibility: 'First-time buyer, State-specific rules (Maharashtra, Gujarat, etc.)',
    deadline: 'Varies by State',
    status: 'active',
    description: 'Additional state-level subsidies for first-time home buyers.',
    applyUrl: 'https://mhada.gov.in/',
    applyLabel: 'State Portal',
    guide: {
      states: ['Maharashtra (MHADA)', 'Gujarat (GUJHUD)', 'Karnataka (KHB)'],
      comparison: 'Often combined with PMAY for maximum benefit.',
      rules: 'Varies by state; usually requires domicile certificate.'
    }
  }
];

const incomeOptions = [
  { id: 'ews', label: 'Up to ₹3 Lakh (EWS)' },
  { id: 'lig', label: '₹3 Lakh - ₹6 Lakh (LIG)' },
  { id: 'mig1', label: '₹6 Lakh - ₹12 Lakh (MIG I)' },
  { id: 'mig2', label: '₹12 Lakh - ₹18 Lakh (MIG II)' },
  { id: 'general', label: 'Above ₹18 Lakh' }
];

const SchemesPage = () => {
  const [income, setIncome] = useState('');
  const [isIncomeOpen, setIsIncomeOpen] = useState(false);
  const [isFirstBuyer, setIsFirstBuyer] = useState(null);
  const [propertyValue, setPropertyValue] = useState('');
  const [calculationResult, setCalculationResult] = useState(null);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [refinementMode, setRefinementMode] = useState(false);

  const formatCurrency = (amount) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} Lakh`;
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const calculateBenefits = () => {
    if (!income || isFirstBuyer === null || !propertyValue) {
      return toast.error('Please fill all fields to calculate benefits');
    }

    const price = Number(propertyValue);
    let totalMin = 0;
    let totalMax = 0;
    const qualified = [];

    // 1. PMAY Subsidy Logic
    const isIncomeEligible = ['ews', 'lig', 'mig1'].includes(income);
    const isPriceEligible = price <= 4500000;

    if (isFirstBuyer && isIncomeEligible && isPriceEligible) {
      const min = 230000;
      const max = 267000;
      totalMin += min;
      totalMax += max;
      qualified.push({ 
        name: 'PMAY Subsidy', 
        amount: `${formatCurrency(min)} - ${formatCurrency(max)}`, 
        status: 'Eligible',
        reason: 'Qualified under CLSS criteria'
      });
    } else {
      let reason = '';
      if (!isFirstBuyer) reason = 'Only for first-time home buyers';
      else if (!isPriceEligible) reason = 'Property value exceeds ₹45L limit';
      else if (!isIncomeEligible) reason = 'Income exceeds scheme limits';

      qualified.push({ 
        name: 'PMAY Subsidy', 
        amount: '₹0', 
        status: 'Not Eligible',
        reason: reason
      });
    }

    // 2. Stamp Duty Rebate Logic (Dynamic %)
    if (isFirstBuyer) {
      const min = price * 0.01;
      const max = price * 0.02;
      totalMin += min;
      totalMax += max;
      qualified.push({ 
        name: 'Stamp Duty Rebate', 
        amount: `${formatCurrency(min)} - ${formatCurrency(max)}`, 
        status: 'Eligible',
        reason: 'Women/First-time buyer benefit'
      });
    } else {
      qualified.push({ 
        name: 'Stamp Duty Rebate', 
        amount: '₹0', 
        status: 'Check State Rules',
        reason: 'Usually requires first-time/female ownership'
      });
    }

    // 3. Tax Benefit (80EEA)
    qualified.push({ 
      name: 'Tax Benefit (80EEA)', 
      amount: 'N/A', 
      status: 'Need More Info', 
      reason: 'Add loan sanction year to check eligibility',
      note: 'Only valid for loans taken between 2019-2022' 
    });

    setCalculationResult({
      totalMin,
      totalMax,
      qualifiedCount: qualified.filter(q => q.status === 'Eligible').length,
      isHighValue: price > 50000000,
      schemes: qualified
    });
  };

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
        <section id="eligibility-engine" className="mb-24 relative z-[60] scroll-mt-32">
          <AnimatePresence>
            {refinementMode && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center mb-8"
              >
                <div className="px-6 py-3 rounded-2xl glass-panel border-amber-primary/30 bg-amber-primary/10 flex items-center gap-4 shadow-amber-glow">
                  <Sparkles size={16} className="text-amber-primary animate-pulse" />
                  <p className="text-xs font-bold text-amber-primary">Add a few more details to get more accurate results</p>
                  <button 
                    onClick={() => setRefinementMode(false)}
                    className="ml-4 text-[10px] font-black uppercase text-white/30 hover:text-white transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="glass-panel p-10 lg:p-16 rounded-[4rem] border-white/5 bg-white/[0.01] relative group !overflow-visible z-[60]">
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:rotate-12 transition-transform overflow-hidden pointer-events-none">
               <Calculator size={120} className="text-amber-primary" />
            </div>
            
            <div className="relative z-10 !overflow-visible">
              <div className="flex items-center gap-4 mb-10">
                <Sparkles size={24} className="text-amber-primary" />
                <h2 className="text-4xl font-serif font-bold">Eligibility AI Engine</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 !overflow-visible items-end">
                
                {/* CUSTOM PREMIUM DROPDOWN */}
                <div className="relative !overflow-visible">
                  <label className="text-[10px] text-white/20 block mb-4 font-black uppercase tracking-[0.3em]">Annual Family Income</label>
                  <button 
                    onClick={() => setIsIncomeOpen(!isIncomeOpen)}
                    className={`w-full flex items-center justify-between px-6 py-5 glass-panel rounded-2xl border-white/10 transition-all duration-300 ${isIncomeOpen ? 'border-amber-primary/40 bg-amber-primary/5 shadow-amber-glow' : 'hover:border-white/30'}`}
                  >
                    <span className={`text-sm font-medium ${income ? 'text-white' : 'text-white/20'}`}>
                      {income ? incomeOptions.find(o => o.id === income)?.label.split(' (')[0] : 'Select Income'}
                    </span>
                    <motion.div animate={{ rotate: isIncomeOpen ? 180 : 0 }}>
                      <ChevronDown size={18} className="text-amber-primary" />
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
                  <label className="text-[10px] text-white/20 block mb-4 font-black uppercase tracking-[0.3em]">First-Time Buyer?</label>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setIsFirstBuyer(true)}
                      className={`flex-1 py-5 rounded-2xl border-2 transition-all font-bold text-sm ${isFirstBuyer === true ? 'border-amber-primary bg-amber-primary/10 text-amber-primary shadow-amber-glow' : 'border-white/5 bg-white/5 text-white/40 hover:border-white/20'}`}
                    >
                      Yes
                    </button>
                    <button 
                      onClick={() => setIsFirstBuyer(false)}
                      className={`flex-1 py-5 rounded-2xl border-2 transition-all font-bold text-sm ${isFirstBuyer === false ? 'border-amber-primary bg-amber-primary/10 text-amber-primary shadow-amber-glow' : 'border-white/5 bg-white/5 text-white/40 hover:border-white/20'}`}
                    >
                      No
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-white/20 block mb-4 font-black uppercase tracking-[0.3em]">Property Value (₹)</label>
                  <input 
                    type="number"
                    placeholder="e.g. 4500000"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(e.target.value)}
                    className="w-full px-6 py-5 glass-panel rounded-2xl border-white/10 bg-white/5 text-sm font-bold text-white placeholder:text-white/20 outline-none focus:border-amber-primary/40 focus:bg-amber-primary/5 transition-all"
                  />
                  {calculationResult && Number(propertyValue) > 4500000 && (
                    <p className="mt-2 text-[10px] text-amber-primary/60 font-bold italic">Tip: PMAY requires property below ₹45L</p>
                  )}
                </div>

                <div className="flex items-end">
                  <button 
                    onClick={calculateBenefits}
                    className="btn-amber w-full py-5 text-sm font-bold shadow-amber-glow-strong flex items-center justify-center gap-3 transition-transform active:scale-95"
                  >
                    Calculate Benefits <ArrowRight size={18} />
                  </button>
                </div>
              </div>

              {/* RESULT UI - ANIMATED */}
              <AnimatePresence>
                {calculationResult && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 48 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-12 border-t border-white/10">
                      <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                          <p className="text-[10px] text-amber-primary font-black uppercase tracking-[0.4em] mb-4">Your Personalized Result</p>
                          <h3 className="text-5xl font-serif font-bold mb-4">You can save up to <span className="text-gradient italic">{formatCurrency(calculationResult.totalMin)} – {formatCurrency(calculationResult.totalMax)}</span></h3>
                          <p className="text-white/40 text-lg">
                            {calculationResult.isHighValue 
                              ? "High-value property limits eligibility for most government subsidy schemes."
                              : `Based on your inputs, you qualify for ${calculationResult.qualifiedCount} major benefits.`
                            }
                          </p>
                        </div>
                        
                        <div className="space-y-4">
                          {calculationResult.schemes.map((s, i) => (
                            <div key={i} className="flex items-center justify-between p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all">
                              <div>
                                <h4 className="text-sm font-bold flex items-center gap-2">
                                  {s.status === 'Eligible' ? <CheckCircle2 size={16} className="text-success" /> : s.status === 'Not Eligible' ? <AlertCircle size={16} className="text-critical" /> : <Info size={16} className="text-amber-primary/40" />}
                                  {s.name}
                                </h4>
                                <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest mt-1">
                                  {s.status} {s.reason && `• ${s.reason}`}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className={`text-xl font-mono font-bold ${s.amount === '₹0' ? 'text-white/20' : 'text-amber-primary'}`}>{s.amount}</p>
                                {s.note && <p className="text-[9px] text-white/20 italic">{s.note}</p>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => {
                          const el = document.getElementById('schemes-grid');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="mt-10 w-full py-5 rounded-2xl border border-white/10 text-white/40 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 hover:text-white hover:border-white/20 transition-all flex items-center justify-center gap-3 group"
                      >
                        Scroll to View Details & Apply <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Schemes Grid */}
        <div id="schemes-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 scroll-mt-32">
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
                  {scheme.status === 'expired' ? (
                    <span className="text-critical flex items-center gap-1">
                      <AlertCircle size={12} /> EXPIRED
                    </span>
                  ) : (
                    <>
                      <Clock size={12} className="text-amber-primary/40" /> {scheme.deadline}
                    </>
                  )}
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
                <button 
                  onClick={() => setSelectedScheme(scheme)}
                  className="flex-1 p-3 rounded-xl glass-panel border-white/10 text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all text-white/60"
                >
                   Guide
                </button>
                <button 
                  onClick={() => window.open(scheme.applyUrl, '_blank')}
                  className="flex-1 btn-amber !py-3 !px-0 text-[9px] font-black uppercase tracking-widest shadow-amber-glow flex items-center justify-center gap-2"
                >
                  {scheme.applyLabel} <ArrowRight size={12} />
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
            <button 
              onClick={() => {
                setRefinementMode(true);
                document.getElementById('eligibility-engine')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-amber !py-7 !px-16 text-xl font-bold shadow-amber-glow-strong"
            >
              {calculationResult ? 'Improve My Results' : 'Check Full Eligibility'}
            </button>
          </div>
        </section>

        {/* Scheme Detail Modal */}
        <AnimatePresence>
          {selectedScheme && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
              onClick={() => setSelectedScheme(null)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="glass-panel w-full max-w-3xl max-h-[85vh] overflow-y-auto custom-scrollbar p-10 lg:p-16 rounded-[4rem] border-white/10 bg-[#0F0905] relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setSelectedScheme(null)}
                  className="absolute top-10 right-10 p-4 rounded-2xl glass-panel border-white/5 text-white/40 hover:text-white transition-all"
                >
                  Close
                </button>

                <div className="flex items-center gap-4 mb-8">
                  <Sparkles size={24} className="text-amber-primary" />
                  <span className="text-[10px] text-amber-primary font-black uppercase tracking-[0.4em]">Detailed Guide</span>
                </div>

                <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-10 leading-tight">{selectedScheme.name}</h2>

                <div className="space-y-12">
                  {/* PMAY Specific Guide */}
                  {selectedScheme.id === 'pmay' && (
                    <>
                      <div className="grid grid-cols-2 gap-8">
                        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5">
                          <p className="text-[10px] text-white/20 font-black uppercase tracking-widest mb-3">Launch Year</p>
                          <p className="text-2xl font-bold text-white">{selectedScheme.guide.launch}</p>
                        </div>
                        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5">
                          <p className="text-[10px] text-white/20 font-black uppercase tracking-widest mb-3">Subsidy Type</p>
                          <p className="text-2xl font-bold text-white">CLSS</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                          <CheckCircle2 size={20} className="text-success" /> Income Eligibility
                        </h4>
                        <div className="grid grid-cols-3 gap-4">
                          {selectedScheme.guide.incomeEligibility.map((item) => (
                            <div key={item.level} className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center">
                              <p className="text-[10px] font-black text-amber-primary mb-2 uppercase">{item.level}</p>
                              <p className="text-sm font-bold">{item.limit}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xl font-bold mb-6">Required Documents</h4>
                        <div className="flex flex-wrap gap-3">
                          {selectedScheme.guide.documents.map((doc) => (
                            <span key={doc} className="px-5 py-2.5 rounded-full glass-panel border-white/10 text-xs font-bold text-white/60">{doc}</span>
                          ))}
                        </div>
                      </div>

                      <div className="p-10 rounded-[2.5rem] bg-amber-primary/5 border border-amber-primary/20">
                        <h4 className="text-xl font-bold mb-4 text-amber-primary">Real Application Flow</h4>
                        <div className="space-y-4">
                          <p className="text-white/60 leading-relaxed font-medium tracking-wide">
                            <span className="text-white font-bold block mb-1">PMAY 2.0 Update:</span> 
                            Now offers up to <span className="text-amber-primary font-bold">₹1.8 Lakh</span> subsidy with simplified Aadhaar-based login.
                          </p>
                          <p className="text-white/40 text-sm italic">
                            {selectedScheme.guide.process}
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  {/* 80EEA Specific Guide */}
                  {selectedScheme.id === '80eea' && (
                    <>
                      <div className="p-10 rounded-[2.5rem] bg-critical/5 border border-critical/20">
                        <h4 className="text-xl font-bold mb-4 text-critical flex items-center gap-3">
                          <AlertCircle size={20} /> Important Validity Notice
                        </h4>
                        <p className="text-white/60 leading-relaxed font-medium">{selectedScheme.guide.note}</p>
                      </div>

                      <div className="grid grid-cols-1 gap-6">
                        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5">
                          <h4 className="text-lg font-bold mb-4">How to Claim?</h4>
                          <p className="text-white/40 text-sm leading-relaxed">{selectedScheme.guide.rules}</p>
                        </div>
                        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5">
                          <h4 className="text-lg font-bold mb-4">Calculation Example</h4>
                          <p className="text-white/40 text-sm leading-relaxed font-mono">{selectedScheme.guide.example}</p>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Stamp Duty Specific Guide */}
                  {selectedScheme.id === 'stamp-duty' && (
                    <>
                      <div className="grid grid-cols-2 gap-8">
                        {selectedScheme.guide.states.map((state) => (
                          <div key={state.name} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5">
                            <h4 className="text-lg font-bold mb-2 text-amber-primary">{state.name}</h4>
                            <p className="text-white/30 text-xs font-mono">{state.portal}</p>
                          </div>
                        ))}
                      </div>

                      <div className="p-10 rounded-[2.5rem] bg-success/5 border border-success/20">
                        <h4 className="text-xl font-bold mb-4 text-success">Potential Savings</h4>
                        <p className="text-white/60 leading-relaxed font-medium">{selectedScheme.guide.savingExample}</p>
                        <p className="mt-4 text-white/30 text-xs italic">{selectedScheme.guide.qualifier}</p>
                      </div>
                    </>
                  )}

                  {/* Section 24(b) Specific Guide */}
                  {selectedScheme.id === 'section-24b' && (
                    <>
                      <div className="p-10 rounded-[2.5rem] bg-blue-500/5 border border-blue-500/20">
                        <h4 className="text-xl font-bold mb-4 text-blue-400">Interest Deduction Rules</h4>
                        <p className="text-white/60 leading-relaxed font-medium">{selectedScheme.guide.details}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-8">
                        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5">
                          <h4 className="text-sm font-bold text-white/40 mb-2 uppercase">Max Deduction</h4>
                          <p className="text-2xl font-bold">{selectedScheme.guide.maxBenefit}</p>
                        </div>
                        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5">
                          <h4 className="text-sm font-bold text-white/40 mb-2 uppercase">Example</h4>
                          <p className="text-lg font-mono">{selectedScheme.guide.example}</p>
                        </div>
                      </div>
                      <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5">
                        <h4 className="text-lg font-bold mb-4">Mandatory Requirements</h4>
                        <ul className="list-disc list-inside space-y-2 text-white/40 text-sm">
                          {selectedScheme.guide.requirements.map((req) => (
                            <li key={req}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}

                  {/* Section 80C Specific Guide */}
                  {selectedScheme.id === 'section-80c' && (
                    <>
                      <div className="p-10 rounded-[2.5rem] bg-purple-500/5 border border-purple-500/20">
                        <h4 className="text-xl font-bold mb-4 text-purple-400">Principal Repayment Benefit</h4>
                        <p className="text-white/60 leading-relaxed font-medium">{selectedScheme.guide.details}</p>
                      </div>
                      <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5">
                        <h4 className="text-lg font-bold mb-4 text-amber-primary">Eligible Components</h4>
                        <div className="flex flex-wrap gap-3">
                          {selectedScheme.guide.components.map((comp) => (
                            <span key={comp} className="px-5 py-2.5 rounded-full glass-panel border-white/10 text-xs font-bold text-white/60">{comp}</span>
                          ))}
                        </div>
                      </div>
                      <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5">
                        <h4 className="text-sm font-bold text-white/40 mb-2 uppercase">Lock-in Period</h4>
                        <p className="text-white/60">{selectedScheme.guide.lockIn}</p>
                      </div>
                    </>
                  )}

                  {/* GST Benefit Specific Guide */}
                  {selectedScheme.id === 'gst-benefit' && (
                    <>
                      <div className="p-10 rounded-[2.5rem] bg-success/5 border border-success/20">
                        <h4 className="text-xl font-bold mb-4 text-success">GST Rate Breakdown</h4>
                        <p className="text-white/60 leading-relaxed font-medium">{selectedScheme.guide.rates}</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5">
                          <h4 className="text-lg font-bold mb-2">Affordable Definition</h4>
                          <p className="text-white/40 text-sm">{selectedScheme.guide.definition}</p>
                        </div>
                        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5">
                          <h4 className="text-lg font-bold mb-2">Benefit</h4>
                          <p className="text-white/40 text-sm">{selectedScheme.guide.benefit}</p>
                        </div>
                      </div>
                    </>
                  )}

                  {/* PMAY Gramin Specific Guide */}
                  {selectedScheme.id === 'pmay-gramin' && (
                    <>
                      <div className="p-10 rounded-[2.5rem] bg-amber-primary/5 border border-amber-primary/20">
                        <h4 className="text-xl font-bold mb-4 text-amber-primary">Rural Housing Assistance</h4>
                        <p className="text-white/60 leading-relaxed font-medium">{selectedScheme.guide.assistance}</p>
                      </div>
                      <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5">
                        <h4 className="text-lg font-bold mb-2">Verification Process</h4>
                        <p className="text-white/40 text-sm leading-relaxed">{selectedScheme.guide.verification}</p>
                      </div>
                      <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5">
                        <h4 className="text-lg font-bold mb-2">Purpose</h4>
                        <p className="text-white/40 text-sm leading-relaxed">{selectedScheme.guide.purpose}</p>
                      </div>
                    </>
                  )}

                  {/* State Subsidy Specific Guide */}
                  {selectedScheme.id === 'state-subsidy' && (
                    <>
                      <div className="p-10 rounded-[2.5rem] bg-blue-500/5 border border-blue-500/20">
                        <h4 className="text-xl font-bold mb-4 text-blue-400">State-wise Subsidy Portals</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {selectedScheme.guide.states.map((state) => (
                            <div key={state} className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                              <p className="text-xs font-bold">{state}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5">
                        <h4 className="text-lg font-bold mb-2 text-amber-primary">Smart Tip</h4>
                        <p className="text-white/40 text-sm">{selectedScheme.guide.comparison}</p>
                        <p className="mt-4 text-white/40 text-sm italic">{selectedScheme.guide.rules}</p>
                      </div>
                    </>
                  )}

                  <div className="pt-8 flex gap-4">
                     <button 
                       onClick={() => window.open(selectedScheme.applyUrl, '_blank')}
                       className="btn-amber flex-1 py-6 text-sm font-bold shadow-amber-glow flex items-center justify-center gap-3"
                     >
                       Proceed to Official Portal <ArrowRight size={18} />
                     </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default SchemesPage;
