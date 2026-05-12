import React, { useEffect, useState } from 'react';
import { Card } from '../components/ui/Card';
import { Brain, TrendingUp, Calendar, Info, Target, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function PredictionModule() {
  const [predictions, setPredictions] = useState<any[]>([]);
  const [packageTrends, setPackageTrends] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [predRes, trendRes] = await Promise.all([
          fetch('/api/v1/analytics/company-predictions'),
          fetch('/api/v1/analytics/package-trends')
        ]);
        setPredictions(await predRes.json());
        setPackageTrends(await trendRes.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <div className="border-b border-border-subtle pb-6 flex justify-between items-end">
        <div>
          <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-none">Forecast</h2>
          <p className="mono-label mt-2 text-emerald-400">Heuristic Prediction Engine / Recurrence Analysis</p>
        </div>
        <div className="text-right">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                <Brain className="w-3 h-3" /> ML Engine Online
            </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h4 className="mono-label mb-4 flex items-center gap-2">
                <Target className="w-4 h-4" /> Predicted Campus Visits (2024-25)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {predictions.map((pred, i) => (
                <Card key={i} className="hover:border-emerald-500/50 transition-all cursor-pointer">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-xl font-black italic uppercase tracking-tighter mb-1">{pred.company}</h3>
                        <div className="flex gap-2">
                            {pred.predicted_roles.map((role: string, j: number) => (
                                <span key={j} className="text-[8px] font-mono bg-bg-card px-1 border border-border-subtle text-text-dim uppercase">
                                    {role}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Prob.</p>
                        <p className="text-2xl font-black italic">{(pred.visit_probability * 100).toFixed(0)}%</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-text-dim">Confidence Reasoning</p>
                    <ul className="space-y-1">
                        {pred.confidence_reason.map((reason: string, j: number) => (
                            <li key={j} className="text-[10px] font-mono text-white flex items-center gap-2 uppercase">
                                <Info className="w-3 h-3 text-emerald-500" /> {reason}
                            </li>
                        ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <Card title="Institutional Package Trajectory" subtitle="Avg. CTC Growth (LPA)" className="h-[350px]">
                {packageTrends && (
                    <div className="h-[250px] w-full mt-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={packageTrends.data}>
                                <defs>
                                    <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#1e40af" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#1e40af" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                                <XAxis 
                                    dataKey="year" 
                                    stroke="#52525b" 
                                    fontSize={10} 
                                    tickLine={false} 
                                    axisLine={false}
                                    tick={{ fontFamily: 'monospace', fontWeight: 'bold' }}
                                />
                                <YAxis 
                                    stroke="#52525b" 
                                    fontSize={10} 
                                    tickLine={false} 
                                    axisLine={false}
                                    tick={{ fontFamily: 'monospace', fontWeight: 'bold' }}
                                />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '0px' }}
                                    itemStyle={{ fontSize: '10px', fontFamily: 'monospace', textTransform: 'uppercase' }}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="avg" 
                                    stroke="#3b82f6" 
                                    fillOpacity={1} 
                                    fill="url(#colorAvg)" 
                                    strokeWidth={3}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </Card>
          </section>
        </div>

        <div className="space-y-6">
            <Card title="Macro Trends" className="bg-emerald-500/10 border-emerald-500/20">
                <div className="space-y-6">
                    <div>
                        <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Growth Leader</p>
                        <p className="text-2xl font-black italic uppercase tracking-tighter text-white">AI & Compiler Design</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 border-t border-emerald-500/10 pt-4">
                        <div>
                            <p className="text-[8px] font-mono text-emerald-400/70 uppercase">YoY Vol. Change</p>
                            <p className="text-lg font-black text-white">+24.5%</p>
                        </div>
                        <div>
                            <p className="text-[8px] font-mono text-emerald-400/70 uppercase">Package Delta</p>
                            <p className="text-lg font-black text-white">+18.2%</p>
                        </div>
                    </div>
                </div>
            </Card>

            <Card title="Prediction Parameters" subtitle="Weightage Map">
                <ul className="space-y-4">
                    <li className="flex justify-between items-center text-[10px] font-mono uppercase font-bold">
                        <span className="text-text-dim">Historical Recurrence</span>
                        <span className="text-white">60%</span>
                    </li>
                    <div className="w-full bg-border-subtle h-0.5">
                        <div className="bg-brand-blue h-full w-[60%]"></div>
                    </div>
                    
                    <li className="flex justify-between items-center text-[10px] font-mono uppercase font-bold">
                        <span className="text-text-dim">Hiring Signals (Live)</span>
                        <span className="text-white">40%</span>
                    </li>
                    <div className="w-full bg-border-subtle h-0.5">
                        <div className="bg-brand-blue h-full w-[40%]"></div>
                    </div>
                </ul>
            </Card>

            <Card title="Preparation Strategy" className="bg-brand-blue/10 border-brand-blue/30">
                <div className="flex gap-3">
                    <Calendar className="w-5 h-5 text-brand-blue flex-shrink-0" />
                    <p className="text-[10px] font-mono text-white leading-relaxed uppercase">
                        Predicted "Crunch-Time" window for Tier-1 visits: <span className="text-brand-blue font-black">AUG 15 - SEP 30</span>. 
                        Optimize mock interview schedules before the predicted spike.
                    </p>
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
}
