import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Info, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

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
    benefitAmount: '1-2% of Property Value',
    benefitType: 'subsidy',
    eligibility: 'Women home buyers in specific states like Maharashtra, Delhi, and Karnataka.',
    deadline: 'Ongoing',
    status: 'active',
    description: 'Reduced stamp duty rates to encourage women ownership of property.'
  }
];

const SchemesPage: React.FC = () => {
  const [income, setIncome] = useState('');
  const [isFirstBuyer, setIsFirstBuyer] = useState<boolean | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Eligibility Checker */}
      <section className="mb-16">
        <div className="glass-card p-8 bg-amber-primary/5 border-amber-primary/20">
          <h2 className="text-3xl font-serif font-bold mb-6">Check Your Eligibility</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-sm text-gray-400 block mb-2">Annual Family Income</label>
              <select 
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-4 outline-none focus:ring-2 ring-amber-primary/50"
              >
                <option value="">Select Range</option>
                <option value="ews">Up to ₹3 Lakh (EWS)</option>
                <option value="lig">₹3 Lakh - ₹6 Lakh (LIG)</option>
                <option value="mig1">₹6 Lakh - ₹12 Lakh (MIG I)</option>
                <option value="mig2">₹12 Lakh - ₹18 Lakh (MIG II)</option>
                <option value="general">Above ₹18 Lakh</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-2">First-Time Home Buyer?</label>
              <div className="flex gap-4">
                <button 
                  onClick={() => setIsFirstBuyer(true)}
                  className={`flex-1 py-4 rounded-lg border transition-all ${isFirstBuyer === true ? 'border-amber-primary bg-amber-primary/10 text-amber-primary' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
                >
                  Yes
                </button>
                <button 
                  onClick={() => setIsFirstBuyer(false)}
                  className={`flex-1 py-4 rounded-lg border transition-all ${isFirstBuyer === false ? 'border-amber-primary bg-amber-primary/10 text-amber-primary' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
                >
                  No
                </button>
              </div>
            </div>
            <div className="flex items-end">
              <button className="btn-amber w-full py-4 text-lg">Calculate My Benefits</button>
            </div>
          </div>
        </div>
      </section>

      {/* Money Missing Highlight */}
      <div className="bg-amber-primary p-6 rounded-card-lg mb-12 flex flex-col md:flex-row items-center justify-between gap-6 text-dark-bg">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-4 rounded-full">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Don't Leave Money on the Table</h3>
            <p className="font-medium opacity-80">Most Indian home buyers miss out on ₹2.5 Lakh+ in government benefits.</p>
          </div>
        </div>
        <button className="bg-dark-bg text-white px-8 py-3 rounded-btn font-bold hover:scale-105 transition-transform">
          Unlock All Benefits
        </button>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockSchemes.map((scheme) => (
          <motion.div
            key={scheme.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                scheme.category === 'central' ? 'bg-blue-500/20 text-blue-400' : 
                scheme.category === 'tax' ? 'bg-purple-500/20 text-purple-400' : 'bg-success/20 text-success'
              }`}>
                {scheme.category} Scheme
              </span>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <AlertCircle size={14} /> Deadline: {scheme.deadline}
              </div>
            </div>

            <h3 className="text-xl font-bold mb-2 h-14 line-clamp-2">{scheme.name}</h3>
            
            <div className="my-4 p-4 bg-white/5 rounded-lg border border-white/5">
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Max Benefit</p>
              <p className="text-3xl font-mono font-bold text-amber-primary">{scheme.benefitAmount}</p>
            </div>

            <div className="space-y-3 mb-8 flex-1">
              <div className="flex items-start gap-2 text-sm text-gray-400">
                <CheckCircle2 size={16} className="text-success shrink-0 mt-0.5" />
                <span>{scheme.eligibility}</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-400">
                <Info size={16} className="text-amber-primary shrink-0 mt-0.5" />
                <span>{scheme.description}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 btn-glass text-xs py-2 px-0">Step-by-Step Guide</button>
              <button className="flex-1 btn-amber text-xs py-2 px-0 flex items-center justify-center gap-1">
                Apply Now <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SchemesPage;
