import React, { useEffect, useState } from 'react';
import { Card } from '../components/ui/Card';
import { 
  BookOpen, 
  Target, 
  Calendar, 
  Map as MapIcon, 
  Terminal, 
  Lightbulb, 
  ChevronRight, 
  CheckCircle,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function PrepModule() {
  const [roadmap, setRoadmap] = useState<any>(null);
  const [questions, setQuestions] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState('Google');

  const generateStrategy = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/v1/prep/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company })
      });
      const data = await res.json();
      setRoadmap(data);
      
      const qRes = await fetch(`/api/v1/prep/questions/${company}`);
      setQuestions(await qRes.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-border-subtle pb-6 flex justify-between items-end">
        <div>
          <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-none">STRATEGY</h2>
          <p className="mono-label mt-2 text-brand-blue">AI-Powered Preparation Roadmaps / Placement Mentor</p>
        </div>
        <div className="flex gap-4">
            <select 
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="bg-bg-card border border-border-subtle text-[10px] font-black uppercase tracking-widest px-4 py-2 outline-none text-white appearance-none cursor-pointer hover:border-brand-blue"
            >
                {['Google', 'Goldman Sachs', 'Amazon', 'Stripe', 'NVIDIA'].map(c => (
                    <option key={c} value={c}>{c}</option>
                ))}
            </select>
            <button 
                onClick={generateStrategy}
                disabled={loading}
                className="bg-brand-blue hover:bg-highlight px-6 py-2 text-[10px] font-black uppercase tracking-widest text-white transition-all disabled:opacity-50"
            >
                {loading ? "GENERATING..." : "BUILD ROADMAP"}
            </button>
        </div>
      </div>

      {!roadmap && !loading && (
        <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-brand-blue/5 border border-dashed border-brand-blue/30 rounded-full flex items-center justify-center mb-6">
                <Target className="w-10 h-10 text-brand-blue" />
            </div>
            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-2">Awaiting Objective</h3>
            <p className="text-[10px] font-mono text-text-dim uppercase max-w-xs mx-auto">
                Select a target company and initiate the AI synthesis to generate your personalized 4-week preparation strategy.
            </p>
        </div>
      )}

      {loading && (
        <div className="py-20 flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-2 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
            <p className="mono-label text-brand-blue animate-pulse">Retrieving RAG Context & Synthesizing Gaps...</p>
        </div>
      )}

      <AnimatePresence>
        {roadmap && !loading && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Left Column: Roadmap */}
            <div className="lg:col-span-8 space-y-8">
                <Card className="border-l-8 border-l-brand-blue">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Lightbulb className="w-4 h-4 text-brand-blue" />
                            <h4 className="mono-label">Gap Analysis & Synthesis</h4>
                        </div>
                        <p className="text-sm font-bold text-white uppercase italic leading-relaxed tracking-tight">
                            "{roadmap.gap_analysis}"
                        </p>
                    </div>
                </Card>

                <div className="space-y-6">
                    <h4 className="mono-label px-2">Four-Week Intensive Roadmap</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map(num => (
                            <Card key={num} className="group relative overflow-hidden h-full">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Clock className="w-16 h-16 text-white" />
                                </div>
                                <div className="relative z-10">
                                    <p className="text-[9px] font-black text-brand-blue uppercase tracking-widest mb-2">Phase_0{num}</p>
                                    <h5 className="text-xs font-black uppercase text-text-dim mb-4">Week {num} Roadmap</h5>
                                    <p className="text-sm font-bold text-white uppercase tracking-tight leading-snug">
                                        {roadmap[`week_${num}`]}
                                    </p>
                                </div>
                                <div className="mt-6 flex justify-end">
                                    <button className="text-[8px] font-black uppercase tracking-widest text-brand-blue hover:underline">
                                        View Resources
                                    </button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                <Card title="High-Priority DSA Clusters" className="bg-bg-card/50">
                    <div className="flex flex-wrap gap-3">
                        {roadmap.priority_topics.map((topic: string) => (
                            <div key={topic} className="flex-1 min-w-[200px] bg-bg-main p-4 border border-border-subtle flex items-center justify-between group hover:border-brand-blue/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                                    <span className="text-[10px] font-mono font-bold uppercase text-white">{topic}</span>
                                </div>
                                <ChevronRight className="w-3 h-3 text-text-dim group-hover:translate-x-1 transition-transform" />
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Right Column: Questions & Projects */}
            <div className="lg:col-span-4 space-y-6">
                <Card title="AI-Scored Project Recommendation" className="bg-brand-blue border-none text-white shadow-[8px_8px_0px_#1e40af]">
                    <div className="flex items-start gap-4 mb-6">
                        <Terminal className="w-6 h-6 text-white/50" />
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-widest text-white/70 mb-1">Complexity Anchor</p>
                            <h3 className="text-lg font-black italic uppercase italic tracking-tighter">{roadmap.recommended_project}</h3>
                        </div>
                    </div>
                    <p className="text-[10px] font-mono leading-relaxed uppercase">
                        This project is specifically selected to demonstrate competency in the domains {company} prioritizes during technical vetting.
                    </p>
                </Card>

                <div className="space-y-4">
                    <h4 className="mono-label flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-brand-blue" /> Source Intelligence
                    </h4>
                    {questions?.categories.map((cat: any, i: number) => (
                        <Card key={i} title={cat.type}>
                            <ul className="space-y-4">
                                {cat.questions.map((q: string, j: number) => (
                                    <li key={j} className="text-[10px] font-mono text-white/80 leading-relaxed italic border-l-2 border-l-brand-blue/30 pl-3">
                                        "{q}"
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    ))}
                </div>

                <Card className="bg-emerald-500/10 border-emerald-500/20">
                    <div className="flex gap-3">
                        <MapIcon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                        <p className="text-[10px] font-mono text-emerald-400 uppercase leading-normal italic">
                            This strategy is dynamically adjusted based on the latest crawl of {company}'s career portal and LinkedIn hiring signals.
                        </p>
                    </div>
                </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
