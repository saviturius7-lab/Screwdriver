import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import { StatCard, Card } from '../components/ui/Card';
import { cn } from '../lib/utils';

const placementData = [
  { name: '2020', rate: 78, avg: 6.5 },
  { name: '2021', rate: 82, avg: 7.2 },
  { name: '2022', rate: 89, avg: 8.8 },
  { name: '2023', rate: 85, avg: 9.4 },
  { name: '2024', rate: 92, avg: 11.2 },
];

const sectorData = [
  { name: 'Fintech', count: 45 },
  { name: 'SaaS', count: 32 },
  { name: 'AI/ML', count: 28 },
  { name: 'Consulting', count: 22 },
  { name: 'Cloud', count: 18 },
];

export function OverviewModule() {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Total Placed" 
          value="842" 
          trend="+12%" 
          trendType="up"
        />
         <StatCard 
          label="Avg. Package" 
          value="11.2 LPA" 
          trend="+22%" 
          trendType="up"
        />
         <StatCard 
          label="Active Recruiters" 
          value="148" 
          trend="+5%" 
          trendType="up"
        />
         <StatCard 
          label="Placement Rate" 
          value="92.4%" 
          trend="+2.4%" 
          trendType="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Hiring Trends" subtitle="Institutional Data / 2020-2024" className="lg:col-span-2">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={placementData}>
                <defs>
                  <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 10, fontFamily: 'monospace'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 10, fontFamily: 'monospace'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '4px', fontSize: '10px', fontFamily: 'monospace' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="stepAfter" dataKey="avg" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorAvg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Recruitment Sectors" subtitle="Market Density Analysis">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorData} layout="vertical">
                <CartesianGrid strokeDasharray="2 2" vertical={false} horizontal={false} stroke="#27272a" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 10, fontFamily: 'monospace'}} width={80} />
                <Tooltip cursor={{fill: 'rgba(59, 130, 246, 0.1)'}} contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '4px', fontSize: '10px' }} />
                <Bar dataKey="count" fill="#fff" radius={[0, 2, 2, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <Card title="Live Activity Feed" subtitle="System Logs / Auth: Admin-Level">
          <div className="space-y-4">
            <ActivityItem 
              company="Stripe" 
              action="Final Results Out" 
              time="2h ago" 
              type="placed"
              message="12 students selected for Early Career Software Engineering."
            />
            <ActivityItem 
              company="NVIDIA" 
              action="Shortlist Released" 
              time="4h ago" 
              type="info"
              message="28 students move to Round 2 (Technical Interview)."
            />
            <ActivityItem 
              company="Zomato" 
              action="New Opening" 
              time="1d ago" 
              type="new"
              message="Associate Product Manager - Strategy & Operations."
            />
          </div>
        </Card>

        <Card 
          title="Intelligence Matching" 
          subtitle="Compatibility Engine Preview"
          className="bg-white !text-black"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-slate-100 p-5 rounded-sm border-l-4 border-black">
              <div className="w-12 h-12 bg-black rounded-sm flex items-center justify-center shadow-lg text-white font-black italic">
                S
              </div>
              <div className="flex-1">
                <h4 className="font-black uppercase tracking-tighter text-xl leading-none italic">Stripe</h4>
                <p className="text-[10px] font-mono text-slate-500 uppercase mt-1 italic font-bold tracking-widest">Back-End Arch</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black italic">94%</div>
                <div className="text-[9px] text-slate-400 font-mono font-bold">MATCH</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-slate-100 p-5 rounded-sm border-l-4 border-slate-300 opacity-60">
              <div className="w-12 h-12 bg-slate-400 rounded-sm flex items-center justify-center text-white font-black italic text-2xl">
                G
              </div>
              <div className="flex-1">
                <h4 className="font-black uppercase tracking-tighter text-xl leading-none italic">Google</h4>
                <p className="text-[10px] font-mono text-slate-500 uppercase mt-1 italic font-bold tracking-widest">L3 Specialist</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black italic">88%</div>
                <div className="text-[9px] text-slate-400 font-mono font-bold">MATCH</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function ActivityItem({ company, action, time, message, type }: any) {
  return (
    <div className="flex gap-4 p-4 brutalist-card hover:border-brand-blue/50 transition-colors cursor-default">
      <div className={cn("w-1 flex-shrink-0", 
        type === 'placed' ? 'bg-emerald-500' : 
        type === 'new' ? 'bg-brand-blue' : 'bg-text-dim'
      )} />
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h5 className="text-[11px] font-black uppercase tracking-widest text-white leading-none">
            {company} <span className="text-text-dim font-bold tracking-normal italic ml-2">/ {action}</span>
          </h5>
          <span className="mono-label !text-[8px]">{time}</span>
        </div>
        <p className="text-[10px] text-text-dim mt-2 font-mono leading-relaxed">{message}</p>
      </div>
    </div>
  );
}

