import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, TrendingUp, ShieldCheck, Info, ArrowRight, Percent } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Link, useNavigate } from 'react-router-dom';

const mockBanks = [
  { 
    name: 'State Bank of India', 
    rate: 8.4, 
    fee: '~0.35% (min ₹2,000 approx)', 
    status: 'Best Choice', 
    url: 'https://homeloans.sbi.bank.in/',
    guide: {
      type: 'Floating',
      docs: ['Aadhaar', '3m Salary Slip', '6m Bank Statement'],
      highlights: 'Lowest interest rates for women borrowers.'
    }
  },
  { 
    name: 'HDFC Bank', 
    rate: 8.5, 
    fee: '~0.50%', 
    status: 'Fast Approval', 
    url: 'https://www.hdfc.com/home-loans',
    guide: {
      type: 'Fixed/Floating',
      docs: ['Aadhaar/PAN', 'Form 16', 'Bank Statement'],
      highlights: 'Seamless digital processing and quick sanctions.'
    }
  },
  { 
    name: 'ICICI Bank', 
    rate: 8.6, 
    fee: '~0.25% – 0.50%', 
    status: 'Low Documents', 
    url: 'https://www.icicibank.com/personal-banking/loans/home-loan',
    guide: {
      type: 'Floating',
      docs: ['KYC Docs', 'Salary Certificate', 'ITR (2 Years)'],
      highlights: 'Special pre-approved offers for existing customers.'
    }
  },
  { 
    name: 'Axis Bank', 
    rate: 8.7, 
    fee: '~0.50%', 
    status: 'Flexible', 
    url: 'https://www.axisbank.com/retail/loans/home-loan',
    guide: {
      type: 'Floating',
      docs: ['PAN Card', 'Voter ID', 'Employee ID'],
      highlights: 'Balance transfer facility with low rates.'
    }
  },
];

const LoanOptimizerPage = () => {
  const navigate = useNavigate();
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [tenure, setTenure] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [showGuide, setShowGuide] = useState(null);
  const [showEligibilityModal, setShowEligibilityModal] = useState(false);
  const [eligibilityScore, setEligibilityScore] = useState(null);

  const calculateEMI = (amount, rate, years) => {
    const monthlyRate = rate / 12 / 100;
    const numMonths = years * 12;
    return Math.round(
      (amount * monthlyRate * Math.pow(1 + monthlyRate, numMonths)) /
      (Math.pow(1 + monthlyRate, numMonths) - 1)
    );
  };

  const emi = calculateEMI(loanAmount, interestRate, tenure);
  const totalPayment = emi * (tenure * 12);
  const totalInterest = totalPayment - loanAmount;

  // PMAY Savings calculation (approx)
  const pmayEmi = calculateEMI(loanAmount - 267000, interestRate, tenure);
  const emiSavings = emi - pmayEmi;

  const chartData = [
    { name: 'Principal', value: loanAmount, color: '#F2C36B' },
    { name: 'Interest', value: totalInterest, color: '#251B12' },
  ];

  return (
    <div className="bg-[#0F0905] min-h-screen pt-32 pb-20 px-6 lg:px-12 selection:bg-amber-primary/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-[60vw] h-[60vw] rounded-full bg-amber-primary/5 blur-[150px]"></div>
        <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] rounded-full bg-blue-500/5 blur-[150px]"></div>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        <header className="mb-16 text-center max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full glass-panel border-amber-primary/20 bg-amber-primary/5 text-amber-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8"
          >
            <Percent size={12} /> Loan Marketplace
          </motion.div>
          <h1 className="text-6xl font-serif font-bold mb-6">Compare & Apply <span className="text-gradient italic">Home Loans.</span></h1>
          <p className="text-white/40 text-xl font-light">Find the best rates from top Indian banks and optimize your savings with government schemes.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Calculator & Optimization */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass-panel p-8 rounded-[2.5rem] border-white/5">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                <Calculator className="text-amber-primary" size={20} /> Parameters
              </h3>
              
              <div className="space-y-10">
                <div>
                  <div className="flex justify-between mb-4">
                    <label className="text-[10px] text-white/30 uppercase font-black tracking-widest">Loan Amount</label>
                    <span className="font-mono font-bold text-amber-primary">₹{(loanAmount / 100000).toFixed(1)}L</span>
                  </div>
                  <input 
                    type="range" min="500000" max="50000000" step="100000"
                    value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full accent-amber-primary cursor-pointer h-1.5 bg-white/5 rounded-lg appearance-none"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-4">
                    <label className="text-[10px] text-white/30 uppercase font-black tracking-widest">Tenure (Years)</label>
                    <span className="font-mono font-bold text-amber-primary">{tenure}y</span>
                  </div>
                  <input 
                    type="range" min="5" max="30" step="1"
                    value={tenure} onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-full accent-amber-primary cursor-pointer h-1.5 bg-white/5 rounded-lg appearance-none"
                  />
                </div>

                <button 
                  onClick={() => setShowEligibilityModal(true)}
                  className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                >
                  <ShieldCheck size={14} className="text-success" /> Check Loan Eligibility
                </button>
              </div>
            </div>

            {/* Killer Feature Card */}
            <div 
              onClick={() => navigate('/schemes')}
              className="glass-panel p-8 rounded-[2.5rem] border-amber-primary/20 bg-amber-primary/5 relative overflow-hidden group cursor-pointer hover:bg-amber-primary/10 transition-all duration-500"
            >
              <div className="absolute -top-10 -right-10 opacity-5 group-hover:rotate-12 transition-transform duration-700">
                <TrendingUp size={160} />
              </div>
              <h4 className="font-bold text-amber-primary mb-4 flex items-center gap-2">
                <TrendingUp size={18} /> Killer Saving Tip
              </h4>
              <p className="text-white/60 text-sm leading-relaxed mb-6 font-medium">
                You can save <span className="text-white font-bold tracking-tight text-base">₹8.4L extra</span> by optimizing your loan + using government schemes like PMAY.
              </p>
              <div className="text-[10px] font-black uppercase tracking-widest text-white group-hover:text-amber-primary transition-colors flex items-center gap-2">
                Discover Schemes <ArrowRight size={14} />
              </div>
            </div>
          </div>

          {/* Center/Right: Results & Marketplace */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Visual Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-panel p-10 rounded-[2.5rem] border-white/5 flex flex-col items-center justify-center text-center">
                <p className="text-[10px] text-white/30 uppercase font-black tracking-widest mb-4">Monthly Installment</p>
                <h2 className="text-6xl font-mono font-bold text-white mb-6 tracking-tighter">₹{emi.toLocaleString('en-IN')}</h2>
                
                <div className="flex flex-col gap-3 w-full">
                  <div className="flex justify-between items-center px-6 py-3 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-[10px] text-white/40 font-bold uppercase">Total Interest</span>
                    <span className="text-sm font-bold font-mono">₹{totalInterest.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center px-6 py-3 bg-success/5 rounded-xl border border-success/20">
                    <span className="text-[10px] text-success font-bold uppercase">PMAY Benefit EMI</span>
                    <span className="text-sm font-bold font-mono text-success">₹{pmayEmi.toLocaleString('en-IN')}</span>
                  </div>
                  {eligibilityScore && (
                    <div className="flex justify-between items-center px-6 py-3 bg-blue-500/5 rounded-xl border border-blue-500/20 mt-2">
                      <span className="text-[10px] text-blue-400 font-bold uppercase">Approval Chance</span>
                      <span className="text-sm font-bold font-mono text-blue-400">{eligibilityScore}% (High)</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-8">
                <div className="glass-panel p-6 rounded-[2.5rem] border-white/5 h-full min-h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        innerRadius="65%"
                        outerRadius="85%"
                        paddingAngle={8}
                        dataKey="value"
                        stroke="none"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1A110A', border: '1px solid rgba(242, 195, 107, 0.2)', borderRadius: '16px', color: '#fff' }}
                        itemStyle={{ color: '#F2C36B' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="glass-panel p-6 rounded-[2rem] border-white/5 bg-white/[0.01]">
                   <p className="text-[10px] text-white/20 uppercase font-black tracking-widest mb-3">Better Option Suggestion</p>
                   <p className="text-sm text-white/60 leading-relaxed italic">
                     "Increase tenure to <span className="text-white font-bold">25 years</span> to reduce EMI to <span className="text-amber-primary font-bold">₹{calculateEMI(loanAmount, interestRate, 25).toLocaleString('en-IN')}</span>"
                   </p>
                </div>
              </div>
            </div>

            {/* Bank Comparison Table */}
            <div className="glass-panel p-10 rounded-[3rem] border-white/5">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-serif font-bold">Best Bank Deals</h3>
                <span className="text-[10px] text-white/30 font-bold italic">Rates are indicative and based on market trends</span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-white/10">
                      <th className="pb-6 text-[10px] text-white/20 uppercase font-black tracking-widest">Bank</th>
                      <th className="pb-6 text-[10px] text-white/20 uppercase font-black tracking-widest">Interest Rate</th>
                      <th className="pb-6 text-[10px] text-white/20 uppercase font-black tracking-widest">Monthly EMI</th>
                      <th className="pb-6 text-[10px] text-white/20 uppercase font-black tracking-widest text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockBanks.map((bank, i) => {
                      const bankEmi = calculateEMI(loanAmount, bank.rate, tenure);
                      return (
                        <tr key={i} className="group border-b border-white/5 last:border-0">
                          <td className="py-8">
                            <div className="flex flex-col">
                              <span className="font-bold text-white text-lg group-hover:text-amber-primary transition-colors">{bank.name}</span>
                              <div className="flex gap-2 mt-1">
                                <span className="text-[8px] px-2 py-0.5 rounded bg-success/10 text-success font-bold uppercase tracking-widest border border-success/20">{bank.status}</span>
                                <button onClick={() => setShowGuide(bank.name)} className="text-[8px] text-white/30 hover:text-white uppercase font-bold tracking-widest underline decoration-white/10">Bank Guide</button>
                              </div>
                            </div>
                          </td>
                          <td className="py-8">
                            <div className="font-mono font-bold text-xl text-amber-primary">{bank.rate}%</div>
                            <span className="text-[10px] text-white/20 font-bold">Processing: {bank.fee}</span>
                          </td>
                          <td className="py-8">
                            <div className="font-mono font-bold text-lg text-white">₹{bankEmi.toLocaleString('en-IN')}</div>
                            <span className="text-[10px] text-white/20 font-bold tracking-tight">Total Int: ₹{((bankEmi * tenure * 12) - loanAmount).toLocaleString('en-IN')}</span>
                          </td>
                          <td className="py-8 text-right">
                            <button 
                              onClick={() => window.open(bank.url, '_blank')}
                              className="btn-amber px-8 py-3 text-xs font-bold shadow-amber-glow"
                            >
                              Apply Now
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Bank Guide Modal */}
        <AnimatePresence>
          {showGuide && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
              onClick={() => setShowGuide(null)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                className="glass-panel w-full max-w-lg p-10 rounded-[3rem] border-white/10 bg-[#0F0905] relative"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-3xl font-serif font-bold mb-6 text-amber-primary">{showGuide} Guide</h3>
                <div className="space-y-6">
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[10px] text-white/30 uppercase font-black tracking-widest mb-2">Interest Type</p>
                    <p className="text-sm font-bold">{mockBanks.find(b => b.name === showGuide)?.guide.type}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/30 uppercase font-black tracking-widest mb-3">Documents Needed</p>
                    <div className="flex flex-wrap gap-2">
                      {mockBanks.find(b => b.name === showGuide)?.guide.docs.map(doc => (
                        <span key={doc} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-white/60">{doc}</span>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 bg-amber-primary/5 border border-amber-primary/20 rounded-2xl">
                    <p className="text-sm text-amber-primary/80 leading-relaxed font-medium">"{mockBanks.find(b => b.name === showGuide)?.guide.highlights}"</p>
                  </div>
                </div>
                <button onClick={() => setShowGuide(null)} className="mt-8 w-full py-4 glass-panel border-white/5 text-white/40 text-xs font-bold rounded-2xl">Close</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Eligibility Check Modal */}
        <AnimatePresence>
          {showEligibilityModal && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
              onClick={() => setShowEligibilityModal(false)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                className="glass-panel w-full max-w-xl p-12 rounded-[4rem] border-white/10 bg-[#0F0905] relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                  <ShieldCheck size={200} className="text-success" />
                </div>
                
                <h3 className="text-4xl font-serif font-bold mb-4">Loan <span className="text-success">Eligibility.</span></h3>
                <p className="text-white/40 text-lg mb-10">Answer a few questions to see your approval chance across all partner banks.</p>
                
                <div className="space-y-8 relative z-10">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[10px] text-white/30 uppercase font-black tracking-widest ml-4">Monthly Income</label>
                      <input type="number" placeholder="₹50,000" className="w-full px-6 py-5 rounded-2xl glass-panel border-white/10 bg-white/5 text-sm font-bold outline-none" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] text-white/30 uppercase font-black tracking-widest ml-4">Monthly Expenses</label>
                      <input type="number" placeholder="₹20,000" className="w-full px-6 py-5 rounded-2xl glass-panel border-white/10 bg-white/5 text-sm font-bold outline-none" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] text-white/30 uppercase font-black tracking-widest ml-4">Existing EMIs</label>
                    <input type="number" placeholder="₹0" className="w-full px-6 py-5 rounded-2xl glass-panel border-white/10 bg-white/5 text-sm font-bold outline-none" />
                  </div>
                  
                  <button 
                    onClick={() => {
                      setEligibilityScore(82);
                      setShowEligibilityModal(false);
                    }}
                    className="w-full py-6 bg-success/20 text-success text-xs font-black uppercase tracking-[0.3em] rounded-3xl border border-success/30 font-bold shadow-success/10 shadow-xl hover:bg-success/30 transition-all"
                  >
                    Calculate My Score
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default LoanOptimizerPage;
