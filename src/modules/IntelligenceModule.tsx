import React, { useState } from 'react';
import { Search, Sparkles, Send, FileText, Database, Shield } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { aiService } from '../services/aiService';
import { motion, AnimatePresence } from 'framer-motion';

export function IntelligenceModule() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{retrieved: any[], intelligence: string} | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await aiService.semanticSearch(query);
      setResult(res as any);
    } catch (err) {
      console.error(err);
      setResult({ retrieved: [], intelligence: "Error retrieving institutional intelligence." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end border-b-4 border-white pb-6">
        <div>
          <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-none">Intelligence</h2>
          <p className="mono-label mt-2">pgvector RAG / Semantic institutional lookup</p>
        </div>
        <div className="flex gap-4 hidden md:flex">
          <div className="px-3 py-1 border border-border-subtle rounded-sm text-[9px] font-mono uppercase text-brand-blue font-bold">
            0.08s Search Time
          </div>
          <div className="px-3 py-1 border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 rounded-sm text-[9px] font-mono uppercase font-bold">
             Indexing: Current
          </div>
        </div>
      </div>

      <form onSubmit={handleSearch} className="relative group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="SECURE_QUERY_PROMPT: 'Average CTC for Fintech 2024?'"
          className="w-full bg-bg-card border-2 border-border-subtle rounded-sm px-8 py-6 pl-16 shadow-[8px_8px_0px_#18181b] focus:outline-none focus:border-brand-blue focus:shadow-[8px_8px_0px_#3b82f6] transition-all text-xl font-bold placeholder:text-text-dim/30 italic text-white"
        />
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-text-dim w-7 h-7 group-focus-within:text-brand-blue transition-colors" />
        <button 
          type="submit"
          disabled={loading}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-black px-6 py-3 rounded-sm font-black uppercase text-xs tracking-tighter hover:bg-brand-blue hover:text-white transition-all disabled:opacity-50"
        >
          {loading ? "SEARCHING..." : "EXECUTE_SEARCH →"}
        </button>
      </form>

      <AnimatePresence mode="wait">
        {result ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2">
                <Card className="border-brand-blue/30 bg-brand-blue/5 border-l-8 border-l-brand-blue h-full">
                <div className="flex items-start gap-6">
                    <div className="mt-1 bg-brand-blue p-3 rounded-sm shadow-[4px_4px_0px_#1e40af]">
                    <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div className="space-y-6 flex-1">
                    <div className="prose prose-invert max-w-none">
                        <h4 className="text-sm font-black uppercase tracking-[0.2em] text-brand-blue mb-4">RAG Core Synthesis</h4>
                        <div className="text-white text-lg leading-relaxed whitespace-pre-wrap font-bold font-mono uppercase bg-black/20 p-6 border border-white/5">
                            {result.intelligence}
                        </div>
                    </div>
                    
                    <div className="pt-6 border-t border-border-subtle flex justify-between items-center">
                        <div className="flex gap-6">
                        <button className="text-[10px] font-black uppercase tracking-widest text-brand-blue hover:underline flex items-center gap-2 transition-all">
                            <FileText className="w-4 h-4" /> Export Report
                        </button>
                        <button className="text-[10px] font-black uppercase tracking-widest text-text-dim hover:text-white transition-all">
                            Crawl Source
                        </button>
                        </div>
                        <span className="mono-label !text-[8px]">TIMESTAMP: {new Date().toLocaleTimeString()}</span>
                    </div>
                    </div>
                </div>
                </Card>
            </div>

            <div className="space-y-6">
                <h4 className="mono-label">Retrieved Samples (pgvector)</h4>
                {result.retrieved.map((item, idx) => (
                    <Card key={idx} className="p-4 bg-bg-card/50 border-l-2 border-l-brand-blue hover:bg-bg-card transition-colors cursor-pointer group">
                        <p className="text-[9px] font-black text-brand-blue uppercase mb-2">SOURCE_{item.company.toUpperCase()}</p>
                        <p className="text-[10px] font-mono text-white leading-relaxed line-clamp-3 mb-3 italic">
                            "{item.content}"
                        </p>
                        <div className="flex justify-between items-center">
                            <div className="flex gap-1">
                                {[...Array(item.difficulty)].map((_, i) => (
                                    <div key={i} className="w-2 h-2 bg-brand-blue" />
                                ))}
                            </div>
                            <span className="text-[8px] font-mono text-text-dim uppercase">Rank: #0{idx+1}</span>
                        </div>
                    </Card>
                ))}
                
                <Card className="bg-emerald-500/10 border-emerald-500/20">
                    <div className="flex gap-3">
                        <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <p className="text-[9px] font-mono text-emerald-400 uppercase leading-normal">
                            All samples are anonymized and differential privacy was applied during retrieval.
                        </p>
                    </div>
                </Card>
            </div>
          </motion.div>
        ) : (
          !loading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SearchSuggestion 
                title="Trend Matrix" 
                desc="Hiring delta: 2023 vs 2024" 
                onClick={() => setQuery("Show hiring delta between 2023 and 2024 across all sectors")}
              />
              <SearchSuggestion 
                title="Company Profile" 
                desc="Deep dive into Nvidia requirements" 
                onClick={() => setQuery("Analyze NVIDIA software engineering requirements for the current cycle")}
              />
              <SearchSuggestion 
                title="Skillset Audit" 
                desc="Missing niche skills in fintech" 
                onClick={() => setQuery("Identify missing technical skills in Fintech applicants based on feedback")}
              />
            </div>
          )
        )}
      </AnimatePresence>
    </div>
  );
}

function SearchSuggestion({ title, desc, onClick }: { title: string, desc: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="p-6 brutalist-card hover:border-brand-blue hover:translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_#3b82f6] transition-all text-left group"
    >
      <h4 className="text-xs font-black uppercase tracking-widest text-white mb-2 group-hover:text-brand-blue transition-colors">{title}</h4>
      <p className="text-[10px] font-mono text-text-dim uppercase leading-relaxed">{desc}</p>
    </button>
  );
}

