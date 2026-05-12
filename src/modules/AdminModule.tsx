// src/modules/AdminModule.tsx
import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { 
    Users, 
    Database, 
    BarChart3, 
    Cpu, 
    RefreshCcw, 
    ShieldAlert, 
    Server, 
    Terminal,
    ArrowUpRight,
    TrendingDown,
    Activity
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export function AdminModule() {
    const [isIngesting, setIsIngesting] = useState(false);
    
    const statsData = [
        { name: 'CSE', count: 145, color: '#3b82f6' },
        { name: 'ECE', count: 88, color: '#3b82f6' },
        { name: 'MECH', count: 42, color: '#3b82f6' },
        { name: 'CIVIL', count: 31, color: '#3b82f6' },
        { name: 'AI/DS', count: 112, color: '#10b981' }
    ];

    const runIngestion = () => {
        setIsIngesting(true);
        setTimeout(() => setIsIngesting(false), 3000);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsIngesting(true);
            setTimeout(() => setIsIngesting(false), 2000);
        }
    };

    return (
        <div className="space-y-8">
            <div className="border-b border-border-subtle pb-6 flex justify-between items-end">
                <div>
                    <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-none">Control</h2>
                    <p className="mono-label mt-2 text-brand-blue">Admin Systems / Placement Governance</p>
                </div>
                <div className="flex gap-4">
                    <button 
                        onClick={runIngestion}
                        disabled={isIngesting}
                        className="bg-brand-blue hover:bg-highlight px-6 py-2 text-[10px] font-black uppercase tracking-widest text-white transition-all flex items-center gap-2"
                    >
                        <RefreshCcw className={cn("w-3 h-3", isIngesting && "animate-spin")} />
                        {isIngesting ? "REBUILDING_INDEX..." : "RE-SYNC_GLOBAL_INDEX"}
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 px-6 py-2 text-[10px] font-black uppercase tracking-widest text-white transition-all flex items-center gap-2">
                        <ShieldAlert className="w-3 h-3" /> FLUSH_CACHE
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Active Profiles', val: '1,248', icon: Users, delta: '+12%', color: 'text-brand-blue' },
                    { label: 'Vector Nodes', val: '42.5K', icon: Database, delta: '+4.2%', color: 'text-brand-blue' },
                    { label: 'Predictive Load', val: '12ms', icon: Cpu, delta: 'OPT', color: 'text-emerald-500' },
                    { label: 'Crawl Error Rate', val: '0.04%', icon: Activity, delta: '-2%', color: 'text-emerald-500' }
                ].map((stat, i) => (
                    <Card key={i} className="p-4 border-l-4 border-l-brand-blue">
                        <div className="flex justify-between items-start mb-4">
                            <stat.icon className="w-5 h-5 text-text-dim" />
                            <span className={cn("text-[10px] font-mono uppercase font-bold", stat.color)}>{stat.delta}</span>
                        </div>
                        <p className="text-[10px] font-black uppercase text-text-dim tracking-widest mb-1">{stat.label}</p>
                        <p className="text-3xl font-black italic text-white tracking-tighter">{stat.val}</p>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-8">
                    <Card title="Placement Distribution" subtitle="Offers per Department (Current Cycle)" className="h-[400px]">
                        <div className="h-[300px] w-full mt-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={statsData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                                    <XAxis 
                                        dataKey="name" 
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
                                    <Bar dataKey="count" radius={[2, 2, 0, 0]}>
                                        {statsData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    <section className="space-y-4">
                        <h4 className="mono-label px-2">Live System Traces</h4>
                        <div className="bg-bg-card border border-border-subtle p-6 space-y-3 font-mono text-[10px] uppercase text-emerald-500/80">
                            <div className="flex gap-4">
                                <span className="text-text-dim">[11:58:12]</span>
                                <span className="text-white">INFO:</span>
                                <span>RAG VECTOR SYNC COMPLETED FOR 12 NEW JOB POSTINGS</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="text-text-dim">[11:58:45]</span>
                                <span className="text-white">INFO:</span>
                                <span>PREDICTION ENGINE RE-RANKED 142 COMPANIES BASED ON NYU_SURGE DATA</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="text-text-dim">[11:59:02]</span>
                                <span className="text-brand-blue">INGEST:</span>
                                <span>PARSING RESUME_HASH_8848.PDF {'->'} EXTRACTING_SKILLS [FASTAPI, DOCKER]</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="text-text-dim">[11:59:22]</span>
                                <span className="text-amber-500">WARN:</span>
                                <span>GITHUB_API_THROTTLING_NEAR_LIMIT (88%). OPTIMISTIC CACHING ACTIVE.</span>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-4 space-y-6">
                    <Card title="Bulk Data Management" className="border-dashed border-2 border-brand-blue/30 bg-brand-blue/5">
                        <div className="space-y-4">
                            <p className="text-[10px] font-mono text-text-dim uppercase leading-relaxed">
                                Upload CSV/Excel placement data to populate the historical intelligence engine.
                            </p>
                            <label className="block w-full cursor-pointer">
                                <div className="py-4 border border-dashed border-border-subtle hover:border-brand-blue transition-colors flex flex-col items-center justify-center gap-2">
                                    <Database className="w-5 h-5 text-brand-blue" />
                                    <span className="text-[9px] font-black uppercase tracking-widest text-white">Select File</span>
                                </div>
                                <input type="file" className="hidden" accept=".csv,.xlsx" onChange={handleFileUpload} />
                            </label>
                        </div>
                    </Card>

                    <Card title="System Health" className="bg-bg-card/30">
                        <div className="space-y-6">
                            {[
                                { label: 'Auth Gateway', status: 'Healthy', color: 'bg-emerald-500' },
                                { label: 'Vector Search', status: 'Healthy', color: 'bg-emerald-500' },
                                { label: 'Deep Extraction', status: 'Overloaded', color: 'bg-amber-500' },
                                { label: 'Scraper Farm', status: 'Paused', color: 'bg-red-500' }
                            ].map((sys, i) => (
                                <div key={i} className="flex justify-between items-center">
                                    <span className="text-[10px] font-mono text-text-dim uppercase">{sys.label}</span>
                                    <div className="flex items-center gap-2">
                                        <div className={cn("w-2 h-2 rounded-full", sys.color)} />
                                        <span className="text-[8px] font-bold text-white uppercase">{sys.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card title="Administrative Directives">
                        <ul className="space-y-6">
                            <li className="space-y-2">
                                <p className="text-[10px] font-black uppercase text-brand-blue">Data Retention Policy</p>
                                <p className="text-[11px] font-mono text-white/70 leading-relaxed uppercase">Profiles older than 4 cycles will be archived to cold storage.</p>
                            </li>
                            <li className="space-y-2 border-t border-border-subtle pt-4">
                                <p className="text-[10px] font-black uppercase text-brand-blue">Crawler Compliance</p>
                                <p className="text-[11px] font-mono text-white/70 leading-relaxed uppercase">All scraping operations strictly respect robots.txt and rate-limit headers.</p>
                            </li>
                        </ul>
                    </Card>

                    <Card className="bg-brand-blue/10 border-brand-blue/30 flex gap-4">
                        <Terminal className="w-6 h-6 text-brand-blue flex-shrink-0" />
                        <div>
                            <p className="text-[9px] font-black text-brand-blue uppercase tracking-widest mb-1">Architecture Node</p>
                            <p className="text-[10px] font-mono text-white uppercase leading-normal">
                                ScrewDrivr v2.4a (Stable Build). Scaled for 20K active concurrent students.
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
