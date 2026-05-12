import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { OverviewModule } from './modules/OverviewModule';
import { IntelligenceModule } from './modules/IntelligenceModule';
import { ResumeModule } from './modules/ResumeModule';
import { HiringTrendsModule } from './modules/HiringTrendsModule';
import { PredictionModule } from './modules/PredictionModule';
import { MatchingModule } from './modules/MatchingModule';
import { PrepModule } from './modules/PrepModule';
import { AdminModule } from './modules/AdminModule';
import { NotificationCenter } from './components/NotificationCenter';
import { Sparkles, User } from 'lucide-react';
import { useAuthStore } from './store/authStore';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const { user, login, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-bg-main">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="pl-64 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="h-24 border-b border-border-subtle bg-bg-main sticky top-0 z-10 flex items-center justify-between px-10">
          <div className="space-y-0.5">
            <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">
              {activeTab} <span className="text-brand-blue">Module</span>
            </h2>
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 bg-brand-blue text-white rounded-sm text-[9px] font-bold tracking-widest uppercase">Secured</span>
              <span className="mono-label !text-brand-blue">Live / 0.04s latency</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <NotificationCenter />
            
            <div className="hidden lg:flex gap-4">
               <div className="px-4 py-2 border border-border-subtle rounded-sm">
                <span className="block text-[10px] text-text-dim uppercase font-bold tracking-widest">System</span>
                <span className="text-xs font-mono text-emerald-400 uppercase">Operational</span>
              </div>
              <div className="px-4 py-2 border border-border-subtle rounded-sm bg-brand-blue text-white shadow-[4px_4px_0px_#1e40af]">
                <span className="block text-[10px] text-white/70 uppercase font-bold tracking-widest">Version</span>
                <span className="text-xs font-mono uppercase">V1.2.0-Alpha</span>
              </div>
            </div>

            <div className="h-10 w-px bg-border-subtle mx-2"></div>

            <button 
              onClick={() => login(user?.role === 'student' ? 'admin' : 'student')}
              className="flex items-center gap-3 p-1 rounded-sm hover:bg-bg-card transition-all group"
            >
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-black tracking-widest text-white uppercase leading-none">{user?.name}</p>
                <p className="text-[9px] text-text-dim font-mono uppercase mt-1">{user?.role}</p>
              </div>
              <div className="w-10 h-10 rounded-sm bg-white flex items-center justify-center overflow-hidden border border-border-subtle shadow-[4px_4px_0px_#3b82f6] group-hover:shadow-[2px_2px_0px_#3b82f6] transition-all">
                <User className="w-6 h-6 text-black" />
              </div>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-10 max-w-7xl mx-auto w-full flex-1">
          {activeTab === 'overview' && <OverviewModule />}
          {activeTab === 'intelligence' && <IntelligenceModule />}
          {activeTab === 'resumes' && <ResumeModule />}
          {activeTab === 'trends' && <HiringTrendsModule />}
          {activeTab === 'predictions' && <PredictionModule />}
          {activeTab === 'compatibility' && <MatchingModule />}
          {activeTab === 'prep' && <PrepModule />}
          {activeTab === 'admin' && <AdminModule />}
          
          {(activeTab !== 'overview' && activeTab !== 'intelligence' && activeTab !== 'resumes' && activeTab !== 'trends' && activeTab !== 'predictions' && activeTab !== 'compatibility' && activeTab !== 'prep' && activeTab !== 'admin') && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 border border-dashed border-border-subtle text-brand-blue rounded-full flex items-center justify-center mb-6">
                <Sparkles className="w-10 h-10" />
              </div>
              <h3 className="text-5xl font-black text-white italic tracking-tighter uppercase whitespace-pre-wrap leading-tight">
                Module Under<br/>Construction
              </h3>
              <p className="mono-label mt-4 max-w-sm">
                The {activeTab} engine is currently being indexed by our vector search background workers.
              </p>
              <button 
                onClick={() => setActiveTab('overview')}
                className="mt-10 px-8 py-4 bg-white text-black font-black uppercase text-xs tracking-tighter hover:bg-brand-blue hover:text-white transition-colors"
              >
                Return to Architect Dashboard →
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="px-10 py-8 border-t border-border-subtle bg-bg-main flex justify-between items-center overflow-hidden">
          <div className="flex gap-8 mono-label !tracking-normal">
            <span>NODE: ENCLAVE-01</span>
            <span>ENCRYPTION: SH-256</span>
            <span>STATUS: PROTECTED</span>
          </div>
          <p className="mono-label !text-white opacity-40">
            DESIGNED FOR RAPID ITERATION & SCALE
          </p>
        </footer>
      </main>
    </div>
  );
}


