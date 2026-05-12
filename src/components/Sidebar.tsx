import React from 'react';
import { 
  LayoutDashboard, 
  Search, 
  Users, 
  Briefcase, 
  Settings, 
  LogOut,
  Zap,
  Activity,
  FileText,
  Brain,
  Target,
  ShieldCheck
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuthStore } from '../store/authStore';

const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'intelligence', label: 'Intelligence', icon: Search },
  { id: 'compatibility', icon: Zap, label: 'Matching' },
  { id: 'prep', label: 'Strategy', icon: Target },
  { id: 'trends', label: 'Signals', icon: Activity },
  { id: 'predictions', label: 'Forecast', icon: Brain },
  { id: 'resumes', label: 'Parser', icon: FileText },
];

export function Sidebar({ activeTab, onTabChange }: { activeTab: string, onTabChange: (id: string) => void }) {
  const { user } = useAuthStore();
  
  return (
    <div className="w-64 bg-bg-main text-text-dim flex flex-col h-screen fixed left-0 top-0 border-r border-border-subtle">
      <div className="p-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic leading-none">
            ARCHITECT <span className="text-brand-blue">V1</span>
          </h1>
          <p className="font-mono text-[8px] tracking-[0.2em] uppercase">Campus Placement Intel</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-2.5 rounded-sm text-[11px] font-bold uppercase tracking-widest transition-all",
              activeTab === item.id 
                ? "bg-brand-blue text-white shadow-[4px_4px_0px_#1e40af]" 
                : "hover:bg-bg-card hover:text-white"
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        ))}

        {user?.role === 'admin' && (
          <button
            onClick={() => onTabChange('admin')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-2.5 rounded-sm text-[11px] font-bold uppercase tracking-widest transition-all",
              activeTab === 'admin' 
                ? "bg-brand-blue text-white shadow-[4px_4px_0px_#1e40af]" 
                : "text-brand-blue hover:bg-brand-blue/10 border border-brand-blue/20"
            )}
          >
            <ShieldCheck className="w-4 h-4" />
            Control Center
          </button>
        )}
      </nav>

      <div className="p-4 border-t border-border-subtle space-y-1">
        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-sm text-[11px] font-bold uppercase tracking-widest hover:bg-bg-card hover:text-white transition-all">
          <Settings className="w-4 h-4" />
          Settings
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-sm text-[11px] font-bold uppercase tracking-widest text-rose-500 hover:bg-rose-500/10 transition-all border border-transparent hover:border-rose-500/30">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>

      <div className="p-6">
        <div className="bg-bg-card border border-border-subtle p-4 rounded-sm">
          <p className="mono-label mb-2">Vector Quota</p>
          <div className="w-full bg-[#27272a] h-1 mb-2">
            <div className="bg-brand-blue h-full" style={{ width: '65%' }}></div>
          </div>
          <p className="font-mono text-[9px] text-[#52525b]">65% INDEX CAPACITY USED</p>
        </div>
      </div>
    </div>
  );
}

