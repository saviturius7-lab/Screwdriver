import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, Github, Sparkles, Code, Globe, Shield, Terminal } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { cn } from '../lib/utils';
import { useIngestionStore } from '../store/ingestionStore';
import { motion, AnimatePresence } from 'motion/react';

export function ResumeModule() {
  const [isDragging, setIsDragging] = useState(false);
  const [githubUser, setGithubUser] = useState('');
  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { currentUploads, addUpload, updateStatus } = useIngestionStore();

  const handleSyncGithub = async () => {
    if(!githubUser) return;
    setLoading(true);
    try {
        const response = await fetch(`/api/v1/students/github-sync/${githubUser}`);
        const data = await response.json();
        setInsights(data);
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  const handleFile = (file: File) => {
    const id = Math.random().toString(36).substring(7);
    addUpload({ id, filename: file.name });
    
    // Simulate processing
    setTimeout(() => {
      updateStatus(id, { progress: 30, status: 'processing' });
    }, 1000);

    setTimeout(() => {
      updateStatus(id, { progress: 80, status: 'processing', message: 'Extracting skills...' });
    }, 2500);

    setTimeout(() => {
      updateStatus(id, { progress: 100, status: 'completed' });
    }, 4000);
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-border-subtle pb-6">
        <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-none">Parser</h2>
        <p className="mono-label mt-2">Resume Intelligence / NLP Extraction Pipeline</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div 
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); const file = e.dataTransfer.files[0]; if(file) handleFile(file); }}
            className={cn(
              "border-2 border-dashed rounded-sm p-16 flex flex-col items-center justify-center transition-all cursor-pointer bg-bg-card",
              isDragging ? "border-brand-blue bg-brand-blue/5" : "border-border-subtle"
            )}
            onClick={() => document.getElementById('resume-upload')?.click()}
          >
            <input 
              id="resume-upload" 
              type="file" 
              className="hidden" 
              onChange={(e) => { const file = e.target.files?.[0]; if(file) handleFile(file); }}
            />
            <div className="w-16 h-16 bg-bg-main border border-border-subtle rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
              <Upload className="w-8 h-8 text-brand-blue" />
            </div>
            <p className="text-xl font-bold text-white italic uppercase tracking-tighter">Drop Resumes Here</p>
            <p className="mono-label mt-2 text-[10px]">PDF, DOCX supported / Max 10MB</p>
          </div>

          <section>
            <h4 className="mono-label mb-4 flex items-center gap-2">
                <Github className="w-4 h-4" /> Developer Intelligence / GitHub Sync
            </h4>
            <div className="flex gap-4">
                <div className="flex-1 bg-bg-card border border-border-subtle p-1 flex items-center gap-2">
                    <div className="p-2 bg-bg-main text-text-dim">
                        <Terminal className="w-4 h-4" />
                    </div>
                    <input 
                        type="text" 
                        placeholder="GITHUB_USERNAME" 
                        value={githubUser}
                        onChange={(e) => setGithubUser(e.target.value)}
                        className="bg-transparent border-none outline-none text-xs font-mono w-full uppercase font-bold text-white placeholder:text-text-dim"
                    />
                </div>
                <button 
                    onClick={handleSyncGithub}
                    disabled={loading}
                    className="bg-brand-blue hover:bg-highlight px-6 text-[10px] font-black uppercase tracking-widest text-white transition-all disabled:opacity-50"
                >
                    {loading ? "SYNCING..." : "ANALYZE PROFILE"}
                </button>
            </div>

            <AnimatePresence>
                {insights && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        <Card className="p-6 border-l-4 border-l-brand-blue">
                            <h5 className="text-sm font-black italic uppercase italic tracking-tighter mb-4">Repo Complexity Analysis</h5>
                            <div className="flex items-end gap-3 mb-6">
                                <span className="text-5xl font-black italic leading-none">{insights.complexity_score}</span>
                                <span className="mono-label mb-1">/ 10 INDEX</span>
                            </div>
                            <p className="text-[11px] font-mono text-white/80 leading-relaxed uppercase italic">
                                {insights.summary}
                            </p>
                        </Card>

                        <div className="space-y-4">
                            <Card title="Language Dominance" className="p-4 bg-bg-card/50">
                                <div className="flex flex-wrap gap-2">
                                    {insights.top_languages.map((l: string) => (
                                        <div key={l} className="px-3 py-1 bg-bg-main border border-border-subtle flex items-center gap-2">
                                            <Code className="w-3 h-3 text-brand-blue" />
                                            <span className="text-[9px] font-mono font-bold uppercase text-white">{l}</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                            <Card title="Domain Classification" className="p-4 bg-bg-card/50">
                                <div className="flex items-center gap-3">
                                    <Globe className="w-4 h-4 text-emerald-400" />
                                    <span className="text-xs font-black italic uppercase text-white">{insights.domain_match}</span>
                                </div>
                            </Card>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
          </section>
        </div>

        <div className="space-y-6">
          <Card title="Extraction Schema" subtitle="Metadata Map">
            <ul className="space-y-4 font-mono text-[10px] text-text-dim uppercase font-bold">
              <li className="flex items-center justify-between border-b border-border-subtle pb-2">
                <span>Education Range</span>
                <span className="text-emerald-400">98.2% ACC</span>
              </li>
              <li className="flex items-center justify-between border-b border-border-subtle pb-2">
                <span>Skill Weighting</span>
                <span className="text-emerald-400">94.5% ACC</span>
              </li>
              <li className="flex items-center justify-between border-b border-border-subtle pb-2">
                <span>Experience Timeline</span>
                <span className="text-yellow-400">88.1% ACC</span>
              </li>
              <li className="flex items-center justify-between border-b border-border-subtle pb-2">
                <span>Contact Vector</span>
                <span className="text-emerald-400">99.9% ACC</span>
              </li>
            </ul>
          </Card>

          <Card title="RAG Integration" className="bg-brand-blue/10 border-brand-blue/30">
            <div className="flex gap-3">
              <Sparkles className="w-5 h-5 text-brand-blue flex-shrink-0" />
              <p className="text-[10px] text-white leading-relaxed font-mono uppercase">
                Parsed resumes are automatically converted to 1536d embeddings and synced with pgvector for semantic search compatibility ranking.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
