import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { cn } from '../lib/utils';
import { useIngestionStore } from '../store/ingestionStore';

export function ResumeModule() {
  const [isDragging, setIsDragging] = useState(false);
  const { currentUploads, addUpload, updateStatus } = useIngestionStore();

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
        <div className="lg:col-span-2 space-y-6">
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

          <div className="space-y-4">
            <h4 className="mono-label">Active Processing Queue</h4>
            {currentUploads.length === 0 ? (
                <p className="text-[10px] text-text-dim italic font-mono">Queue is empty. Awaiting payloads...</p>
            ) : (
                currentUploads.map((upload: any) => (
                    <Card key={upload.id} className="p-4 border-l-4 border-l-brand-blue bg-bg-card/50">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <FileText className="w-5 h-5 text-text-dim" />
                                <div>
                                    <p className="text-xs font-bold text-white uppercase tracking-widest">{upload.filename}</p>
                                    <p className="text-[10px] font-mono text-text-dim uppercase mt-1">{upload.message || (upload.status === 'completed' ? 'Extraction Success' : 'Analyzing Structure...')}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                {upload.status === 'completed' ? (
                                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                                ) : (
                                    <Loader2 className="w-5 h-5 text-brand-blue animate-spin" />
                                )}
                            </div>
                        </div>
                        <div className="w-full bg-[#27272a] h-1 mt-4">
                            <div 
                                className="bg-brand-blue h-full transition-all duration-500" 
                                style={{ width: `${upload.progress || 0}%` }}
                            ></div>
                        </div>
                    </Card>
                ))
            )}
          </div>
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
