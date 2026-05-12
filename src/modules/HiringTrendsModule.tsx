import React, { useEffect, useState } from 'react';
import { Card } from '../components/ui/Card';
import { TrendingUp, Activity, AlertTriangle, Zap, ExternalLink, Hash } from 'lucide-react';
import { motion } from 'motion/react';

export function HiringTrendsModule() {
  const [trends, setTrends] = useState<any[]>([]);
  const [signals, setSignals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trendsRes, signalsRes] = await Promise.all([
          fetch('/api/v1/hiring/trends'),
          fetch('/api/v1/hiring/live')
        ]);
        setTrends(await trendsRes.json());
        setSignals(await signalsRes.json());
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
          <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-none">Signals</h2>
          <p className="mono-label mt-2 text-brand-blue">Live Hiring Intelligence Stream / Global Aggregator</p>
        </div>
        <div className="text-right">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue/10 border border-brand-blue/30 rounded-full text-[10px] font-bold text-brand-blue uppercase tracking-widest">
                <Activity className="w-3 h-3 animate-pulse" /> Live Tracking Active
            </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h4 className="mono-label mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Growth Trajectories
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trends.map((trend, i) => (
                <Card key={i} className="group hover:border-brand-blue/50 transition-all cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-black italic uppercase tracking-tighter">{trend.company}</h3>
                    <span className="text-[10px] font-mono text-emerald-400">+{trend.role_growth}% VOL</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-[10px] uppercase font-bold text-text-dim">
                        <span>Signal Strength</span>
                        <span className="text-white">{trend.signal_strength}%</span>
                    </div>
                    <div className="w-full bg-border-subtle h-1">
                        <div className="bg-brand-blue h-full" style={{ width: `${trend.signal_strength}%` }}></div>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                        {trend.top_skills.map((skill: string, j: number) => (
                            <span key={j} className="px-2 py-0.5 bg-bg-card border border-border-subtle text-[8px] font-mono uppercase text-text-dim">
                                {skill}
                            </span>
                        ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h4 className="mono-label mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4" /> Real-Time Signal Stream
            </h4>
            <div className="space-y-4">
              {signals.map((signal) => (
                <Card key={signal.id} className="p-4 bg-bg-card/50 border-l-4 border-l-brand-blue flex gap-4">
                    <div className="w-10 h-10 bg-brand-blue/10 border border-brand-blue/20 rounded-sm flex items-center justify-center flex-shrink-0">
                        <Hash className="w-5 h-5 text-brand-blue" />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-brand-blue">{signal.signal_type}</span>
                            <span className="text-[8px] font-mono text-text-dim">{new Date(signal.created_at).toLocaleTimeString()}</span>
                        </div>
                        <p className="text-sm font-bold text-white uppercase tracking-tight leading-snug">
                            {signal.description}
                        </p>
                    </div>
                </Card>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
            <Card title="Crisis/Spike Alerts" className="border-red-500/30 bg-red-500/5">
                <div className="space-y-4">
                    <div className="flex gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <div>
                            <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1">High Urgency</p>
                            <p className="text-[11px] font-mono text-white leading-relaxed uppercase">
                                Sudden hiring volume detected for Amazon Backend Graduate roles. 
                                <span className="text-red-400 block mt-1">ESTIMATED WINDOW: 48 HOURS</span>
                            </p>
                        </div>
                    </div>
                </div>
            </Card>

            <Card title="Scraping Compliance" subtitle="Robots.txt Enforced">
                <ul className="space-y-3">
                    {['LinkedIn', 'Greenhouse', 'Lever', 'Workday'].map(p => (
                        <li key={p} className="flex items-center justify-between">
                            <span className="text-[10px] font-mono text-text-dim uppercase">{p}</span>
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                <span className="text-[9px] font-bold text-emerald-500 uppercase">Synced</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </Card>

            <Card title="Global Aggregate" className="bg-brand-blue/10 border-brand-blue/30">
                <p className="text-[10px] font-mono text-white leading-relaxed uppercase italic">
                    Signals are weighted by institutional importance and past placement success rates. 
                    <span className="text-brand-blue block mt-2 font-black">LAST UPDATE: JUST NOW</span>
                </p>
            </Card>
        </div>
      </div>
    </div>
  );
}
