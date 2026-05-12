import React, { useEffect, useState } from 'react';
import { Card } from '../components/ui/Card';
import { Zap, CheckCircle2, AlertCircle, TrendingUp, Target, Search, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function MatchingModule() {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/v1/matching/student/current');
        const data = await res.json();
        setMatches(data);
        if (data.length > 0) setSelectedMatch(data[0]);
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
          <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-none">Matching</h2>
          <p className="mono-label mt-2 text-brand-blue">Cross-Vector Compatibility Engine / Placement Recruiter</p>
        </div>
        <div className="text-right flex items-center gap-3">
          <div className="text-right">
              <p className="text-[8px] font-mono text-text-dim uppercase">Active Context</p>
              <p className="text-[10px] font-black uppercase text-white tracking-widest">Student_ARYA_STARK</p>
          </div>
          <div className="w-10 h-10 bg-brand-blue/10 border border-brand-blue/30 rounded-full flex items-center justify-center">
              <Zap className="w-5 h-5 text-brand-blue" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-4">
            <h4 className="mono-label px-2">Recruit Score Ranker</h4>
            <div className="space-y-3">
                {matches.map((match, idx) => (
                    <motion.div
                        key={match.company}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <Card 
                            className={cn(
                                "cursor-pointer transition-all hover:translate-x-1 group",
                                selectedMatch?.company === match.company 
                                    ? "border-brand-blue bg-brand-blue/5 border-l-8" 
                                    : "border-l-4 border-l-border-subtle hover:border-l-brand-blue/50"
                            )}
                            onClick={() => setSelectedMatch(match)}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-[9px] font-black uppercase text-brand-blue tracking-widest mb-1">Rank #{idx+1}</p>
                                    <h3 className="text-lg font-black italic uppercase tracking-tighter text-white">{match.company}</h3>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-mono text-text-dim uppercase">Match</p>
                                    <p className={cn(
                                        "text-xl font-black italic",
                                        match.compatibility_score > 90 ? "text-emerald-400" : "text-white"
                                    )}>
                                        {match.compatibility_score}%
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <Card className="bg-bg-card/30 border-dashed border-border-subtle p-6 flex flex-col items-center justify-center text-center opacity-70">
                <Search className="w-6 h-6 text-text-dim mb-4" />
                <p className="text-[10px] font-mono uppercase text-text-dim">Crawl more companies to expand matching grid</p>
            </Card>
        </div>

        <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
                {selectedMatch ? (
                    <motion.div
                        key={selectedMatch.company}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="space-y-8"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="bg-brand-blue/5 border-brand-blue/20">
                                <h5 className="mono-label mb-6 flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Key Strengths
                                </h5>
                                <ul className="space-y-4">
                                    {selectedMatch.strengths.map((str: string, i: number) => (
                                        <li key={i} className="flex gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                                            <p className="text-xs font-bold text-white uppercase tracking-tight leading-snug">{str}</p>
                                        </li>
                                    ))}
                                </ul>
                            </Card>

                            <Card className="bg-red-500/5 border-red-500/20">
                                <h5 className="mono-label mb-6 flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 text-red-500" /> Optimization Path
                                </h5>
                                <ul className="space-y-4">
                                    {selectedMatch.skill_gaps.map((gap: string, i: number) => (
                                        <li key={i} className="flex gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                                            <p className="text-xs font-mono text-white/80 leading-relaxed uppercase">{gap}</p>
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        </div>

                        <Card className="border-t-4 border-t-brand-blue overflow-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-3 divide-x divide-border-subtle">
                                <div className="p-8">
                                    <p className="mono-label mb-2">Hiring Probability</p>
                                    <p className="text-4xl font-black italic tracking-tighter">{(selectedMatch.compatibility_score * 0.92).toFixed(0)}%</p>
                                    <p className="text-[10px] font-mono text-text-dim mt-2 uppercase">Adjusted for context</p>
                                </div>
                                <div className="p-8">
                                    <p className="mono-label mb-2">Placement Index</p>
                                    <p className="text-4xl font-black italic tracking-tighter">TIER-1</p>
                                    <p className="text-[10px] font-mono text-emerald-400 mt-2 uppercase">Highly Compatible</p>
                                </div>
                                <div className="p-8 bg-brand-blue text-white group cursor-pointer hover:bg-highlight transition-all">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4">Start Preparation</p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-xl font-bold uppercase tracking-tighter leading-tight italic">Generate AI Strategy</p>
                                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <section>
                                <h4 className="mono-label mb-4">Market Readiness Analysis</h4>
                                <Card className="p-0 bg-transparent border-none">
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-text-dim">
                                                <span>Technical Rigor</span>
                                                <span className="text-white">92%</span>
                                            </div>
                                            <div className="w-full bg-border-subtle h-1.5">
                                                <div className="bg-brand-blue h-full w-[92%]"></div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-text-dim">
                                                <span>System Design</span>
                                                <span className="text-white">65%</span>
                                            </div>
                                            <div className="w-full bg-border-subtle h-1.5">
                                                <div className="bg-brand-blue h-full w-[65%]"></div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </section>

                            <section>
                                <h4 className="mono-label mb-4">Recruiter Verdict</h4>
                                <div className="bg-white p-6 border-l-8 border-l-brand-blue shadow-[8px_8px_0px_#1e40af]">
                                    <p className="text-black text-sm font-bold uppercase tracking-tight leading-snug">
                                        "Arya exhibits exceptional systems-level thinking. Her focus on Go and distributed processing aligns perfectly with {selectedMatch.company}'s 2024 infrastructure roadmaps. Recommended for immediate fast-track."
                                    </p>
                                    <div className="mt-4 pt-4 border-t border-black/10 flex items-center gap-3">
                                        <div className="w-8 h-8 bg-brand-blue rounded-full flex items-center justify-center">
                                            <ShieldCheck className="w-4 h-4 text-white" />
                                        </div>
                                        <p className="text-[10px] font-black uppercase text-black">AI RECRUITER_ID: 8848</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </motion.div>
                ) : (
                    <div className="h-full flex items-center justify-center">
                        <div className="text-center space-y-4">
                            <TrendingUp className="w-12 h-12 text-border-subtle mx-auto animate-pulse" />
                            <p className="mono-label text-text-dim">Computing Student-Company Vector Parity...</p>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
