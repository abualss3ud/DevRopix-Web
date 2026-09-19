import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Cpu, 
  Layers, 
  Terminal, 
  Zap, 
  Cloud, 
  Database,
  Lock,
  GitBranch,
  Radio,
  Server
} from 'lucide-react';

interface HeroIllustrationProps {
  language?: 'en' | 'ar';
}

export const HeroIllustration: React.FC<HeroIllustrationProps> = ({ language = 'en' }) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'telemetry' | 'deploy'>('architecture');
  const [pulseCount, setPulseCount] = useState(14820);
  const [latency, setLatency] = useState(18);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseCount((prev) => prev + Math.floor(Math.random() * 5) + 1);
      setLatency(17 + Math.floor(Math.random() * 3));
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      id="interactive-tech-cockpit"
      className="relative w-full max-w-[500px] max-h-[380px] lg:max-h-[420px] rounded-2xl border border-[#E2E8F0] bg-white p-4 sm:p-5 shadow-xl shadow-indigo-950/5 select-none transition-all flex flex-col justify-between"
      aria-label="Interactive Architecture and Telemetry Simulator"
    >
      {/* Cockpit Window Header */}
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <span className="text-[11px] font-mono font-medium text-[#475569] ps-2 border-l border-[#E2E8F0]">
            cluster.devropix.internal
          </span>
        </div>

        {/* Live status badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-mono text-emerald-700">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>99.99% {language === 'ar' ? 'جاهزية' : 'UP'}</span>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center gap-1 p-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] mb-3">
        <button
          onClick={() => setActiveTab('architecture')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-xs font-semibold transition-all ${
            activeTab === 'architecture'
              ? 'bg-white text-[#0B1220] shadow-xs'
              : 'text-[#475569] hover:text-[#0B1220]'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-[#6366F1]" />
          <span>{language === 'ar' ? 'المعمارية' : 'Architecture'}</span>
        </button>
        <button
          onClick={() => setActiveTab('telemetry')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-xs font-semibold transition-all ${
            activeTab === 'telemetry'
              ? 'bg-white text-[#0B1220] shadow-xs'
              : 'text-[#475569] hover:text-[#0B1220]'
          }`}
        >
          <Activity className="w-3.5 h-3.5 text-emerald-600" />
          <span>{language === 'ar' ? 'المقاييس الحية' : 'Telemetry'}</span>
        </button>
        <button
          onClick={() => setActiveTab('deploy')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-xs font-semibold transition-all ${
            activeTab === 'deploy'
              ? 'bg-white text-[#0B1220] shadow-xs'
              : 'text-[#475569] hover:text-[#0B1220]'
          }`}
        >
          <GitBranch className="w-3.5 h-3.5 text-[#7C3AED]" />
          <span>{language === 'ar' ? 'النشر المؤتمت' : 'CI/CD'}</span>
        </button>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-3 text-start min-h-[175px] max-h-[195px] overflow-hidden flex flex-col justify-center">
        {activeTab === 'architecture' && (
          <div className="space-y-2.5 animate-in fade-in duration-200">
            {/* Layer 1: Edge & Gateway */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-[#6366F1]/10 text-[#6366F1] flex items-center justify-center">
                  <Cloud className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0B1220]">Global Edge CDN & WAF</div>
                  <div className="text-[10px] text-[#475569]">Anycast DNS • TLS 1.3 Termination</div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-emerald-600 font-semibold">{latency}ms avg</span>
            </div>

            {/* Layer 2: Core Microservices */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded-lg bg-white border border-[#E2E8F0]">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Cpu className="w-3.5 h-3.5 text-[#6366F1]" />
                  <span className="text-xs font-bold text-[#0B1220]">Compute Pods</span>
                </div>
                <div className="text-[10px] text-[#475569] font-mono">Go & Node / k8s Auto</div>
              </div>

              <div className="p-2 rounded-lg bg-white border border-[#E2E8F0]">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Database className="w-3.5 h-3.5 text-[#7C3AED]" />
                  <span className="text-xs font-bold text-[#0B1220]">Distributed DB</span>
                </div>
                <div className="text-[10px] text-[#475569] font-mono">Postgres + Redis</div>
              </div>
            </div>

            {/* Layer 3: Security & Observability */}
            <div className="flex items-center justify-between p-1.5 rounded-lg bg-white/70 border border-[#E2E8F0] text-[10px] font-mono text-[#475569]">
              <span className="flex items-center gap-1 text-[#0B1220] font-medium">
                <Lock className="w-3 h-3 text-emerald-600" />
                Zero-Trust mTLS
              </span>
              <span className="flex items-center gap-1 text-[#0B1220] font-medium">
                <Radio className="w-3 h-3 text-[#6366F1]" />
                OpenTelemetry Traced
              </span>
            </div>
          </div>
        )}

        {activeTab === 'telemetry' && (
          <div className="space-y-2 animate-in fade-in duration-200">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-lg bg-white border border-[#E2E8F0]">
                <div className="text-[10px] text-[#475569]">{language === 'ar' ? 'الطلبات' : 'Req/sec'}</div>
                <div className="text-sm font-bold font-mono text-[#0B1220]">{pulseCount.toLocaleString()}</div>
              </div>
              <div className="p-2 rounded-lg bg-white border border-[#E2E8F0]">
                <div className="text-[10px] text-[#475569]">{language === 'ar' ? 'زمن الاستجابة' : 'p99 Latency'}</div>
                <div className="text-sm font-bold font-mono text-emerald-600">{latency} ms</div>
              </div>
              <div className="p-2 rounded-lg bg-white border border-[#E2E8F0]">
                <div className="text-[10px] text-[#475569]">{language === 'ar' ? 'نسبة الأخطاء' : 'Error Rate'}</div>
                <div className="text-sm font-bold font-mono text-emerald-600">0.001%</div>
              </div>
            </div>

            {/* Simulated Live Stream Bars */}
            <div className="p-2 rounded-lg bg-white border border-[#E2E8F0] space-y-1">
              <div className="flex justify-between text-[10px] text-[#475569]">
                <span>Pipeline Throughput</span>
                <span className="font-mono text-[#0B1220] font-semibold">1.4 GB/s</span>
              </div>
              <div className="w-full bg-[#F1F5F9] rounded-full h-1.5 overflow-hidden">
                <div className="bg-[#6366F1] h-1.5 rounded-full w-[84%] animate-pulse" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'deploy' && (
          <div className="space-y-1.5 font-mono text-[10.5px] animate-in fade-in duration-200">
            <div className="flex items-center gap-1.5 text-emerald-600">
              <Terminal className="w-3.5 h-3.5" />
              <span>✔ git commit -m "feat(api): optimize cache"</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#475569]">
              <span className="text-[#6366F1]">➜</span>
              <span>Running 482 unit & integration tests... PASSED</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#475569]">
              <span className="text-[#6366F1]">➜</span>
              <span>Building OCI artifact & security vulnerability audit... CLEAR</span>
            </div>
            <div className="flex items-center justify-between p-1.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px]">
              <span>Status: DEPLOYED TO PRODUCTION</span>
              <span>v2.8.4-stable</span>
            </div>
          </div>
        )}
      </div>

      {/* Cockpit Footer Controls */}
      <div className="flex items-center justify-between pt-2.5 border-t border-[#E2E8F0] text-[11px] text-[#475569]">
        <div className="flex items-center gap-1.5">
          <Server className="w-3 h-3 text-[#6366F1]" />
          <span>Region: <strong className="text-[#0B1220]">GCC-Central / Europe-West</strong></span>
        </div>
        <div className="flex items-center gap-1">
          <Zap className="w-3 h-3 text-amber-500" />
          <span className="text-[#0B1220] font-mono font-medium">Enterprise Tier</span>
        </div>
      </div>
    </div>
  );
};
