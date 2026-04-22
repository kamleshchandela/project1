import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, ShieldCheck, Info, ArrowRight, Percent } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const mockBanks = [
  { name: 'SBI', rate: 8.4, emi: 41800, fee: '0.35%', status: 'Best Choice', color: '#2c3e50' },
  { name: 'HDFC Bank', rate: 8.5, emi: 42100, fee: '0.50%', status: 'Fast Approval', color: '#1e3a8a' },
  { name: 'ICICI Bank', rate: 8.6, emi: 42400, fee: '0.40%', status: 'Low Documents', color: '#c2410c' },
  { name: 'Axis Bank', rate: 8.7, emi: 42700, fee: '0.50%', status: 'Flexible', color: '#881337' },
];

const LoanOptimizerPage: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [tenure, setTenure] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);

  const monthlyRate = interestRate / 12 / 100;
  const numMonths = tenure * 12;
  const emi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numMonths)) /
    (Math.pow(1 + monthlyRate, numMonths) - 1)
  );

  const totalPayment = emi * numMonths;
  const totalInterest = totalPayment - loanAmount;

  const chartData = [
    { name: 'Principal', value: loanAmount, color: '#F5A623' },
    { name: 'Interest', value: totalInterest, color: '#11151A' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-serif font-bold mb-8 text-center">Loan Optimizer</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Calculator className="text-amber-primary" /> Loan Calculator
            </h3>
            
            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-4">
                  <label className="text-sm text-gray-400">Loan Amount</label>
                  <span className="font-mono font-bold text-amber-primary">₹{(loanAmount / 100000).toFixed(1)}L</span>
                </div>
                <input 
                  type="range" min="1000000" max="100000000" step="100000"
                  value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-amber-primary"
                />
              </div>

              <div>
                <div className="flex justify-between mb-4">
                  <label className="text-sm text-gray-400">Tenure (Years)</label>
                  <span className="font-mono font-bold text-amber-primary">{tenure}y</span>
                </div>
                <input 
                  type="range" min="5" max="30" step="1"
                  value={tenure} onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full accent-amber-primary"
                />
              </div>

              <div>
                <div className="flex justify-between mb-4">
                  <label className="text-sm text-gray-400">Interest Rate (%)</label>
                  <span className="font-mono font-bold text-amber-primary">{interestRate}%</span>
                </div>
                <input 
                  type="range" min="6" max="15" step="0.1"
                  value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-amber-primary"
                />
              </div>
            </div>
          </div>

          <div className="glass-card p-6 bg-amber-primary/10 border-amber-primary/20">
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <TrendingUp className="text-amber-primary" /> Smart Tip
            </h4>
            <p className="text-sm text-gray-400">
              Increasing your down payment by just 5% can reduce your total interest by ₹8.4 Lakh over 20 years.
            </p>
          </div>
        </div>

        {/* Output and Comparison */}
        <div className="lg:col-span-2 space-y-8">
          {/* EMI Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-8 flex flex-col items-center justify-center text-center">
              <p className="text-sm text-gray-400 uppercase font-bold tracking-wider mb-2">Your Monthly EMI</p>
              <h2 className="text-5xl font-mono font-bold text-amber-primary mb-4">₹{emi.toLocaleString()}</h2>
              <div className="flex gap-4 text-xs text-gray-500">
                <span>Principal: ₹{loanAmount.toLocaleString()}</span>
                <span>Interest: ₹{totalInterest.toLocaleString()}</span>
              </div>
            </div>

            <div className="glass-card p-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#11151A', border: 'none', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bank Comparison */}
          <div className="glass-card p-6 overflow-x-auto">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <ShieldCheck className="text-success" /> Best Bank Deals for You
            </h3>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 text-sm">
                  <th className="pb-4 font-medium">Bank Name</th>
                  <th className="pb-4 font-medium">Interest Rate</th>
                  <th className="pb-4 font-medium">Monthly EMI</th>
                  <th className="pb-4 font-medium">Processing Fee</th>
                  <th className="pb-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {mockBanks.map((bank, i) => (
                  <tr key={i} className="group hover:bg-white/5 transition-colors">
                    <td className="py-4">
                      <div className="font-bold flex items-center gap-2">
                        {bank.name}
                        {bank.status && <span className="text-[8px] bg-success/20 text-success px-1.5 py-0.5 rounded uppercase">{bank.status}</span>}
                      </div>
                    </td>
                    <td className="py-4 font-mono font-bold text-amber-primary">{bank.rate}%</td>
                    <td className="py-4 font-mono">₹{bank.emi.toLocaleString()}</td>
                    <td className="py-4 text-gray-400">{bank.fee}</td>
                    <td className="py-4">
                      <button className="btn-amber px-4 py-1.5 text-xs">Apply Now</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanOptimizerPage;
