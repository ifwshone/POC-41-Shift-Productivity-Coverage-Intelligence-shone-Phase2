'use client'
import React, { useState, useMemo, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ComposedChart } from 'recharts';

// Synthetic database acting as the backend response
const mockDatabase = {
  'Facility A': {
    'Morning Crew': { kpi: '142.1', overtime: [10, 12, 9, 15, 11], trend: [130, 135, 140, 142, 138], issue: "Morning crew is operating at peak efficiency with minimal overtime.", status: "Optimal" },
    'Evening Crew': { kpi: '118.4', overtime: [20, 25, 22, 30, 28], trend: [120, 115, 110, 118, 122], issue: "Evening shift shows a 15% drop in output. Recommend reviewing supervisor coverage.", status: "Warning" },
    'Night Watch':  { kpi: '95.2', overtime: [35, 40, 38, 45, 42], trend: [100, 95, 90, 85, 98], issue: "Night shift coverage is critically strained. Investigate staffing reallocation.", status: "Critical" }
  },
  'Facility B': {
    'Morning Crew': { kpi: '135.0', overtime: [5, 8, 6, 7, 5], trend: [125, 130, 135, 132, 135], issue: "Facility B Morning operations are stable. Baseline performance achieved.", status: "Optimal" },
    'Evening Crew': { kpi: '128.5', overtime: [15, 12, 18, 14, 16], trend: [125, 128, 120, 130, 129], issue: "Minor fluctuations in Evening output due to supply chain delays on line 2.", status: "Warning" },
    'Night Watch':  { kpi: '110.3', overtime: [25, 20, 22, 28, 24], trend: [115, 110, 108, 112, 110], issue: "Equipment maintenance is disrupting Night Watch productivity.", status: "Warning" }
  }
};

const dates = ['2026-10-24', '2026-10-25', '2026-10-26', '2026-10-27', '2026-10-28'];

export default function ShiftProductivityDashboard() {
    const [activeLocation, setActiveLocation] = useState('Facility A');
    const [activeTeam, setActiveTeam] = useState('Morning Crew');
    const [timeRange, setTimeRange] = useState('Last 7 Days');
    const [isClient, setIsClient] = useState(false);
  
    useEffect(() => {
      setIsClient(true);
    }, []);
  
    const activeData = useMemo(() => {
      const dataNode = mockDatabase[activeLocation as keyof typeof mockDatabase][activeTeam as 'Morning Crew' | 'Evening Crew' | 'Night Watch'];
      return {
        kpi: dataNode.kpi,
        issue: dataNode.issue,
        status: dataNode.status,
        dataset: dates.map((date, i) => ({
          date,
          output_per_hour: dataNode.trend[i],
          overtime_hours: dataNode.overtime[i]
        }))
      };
    }, [activeLocation, activeTeam]);
  
    // INSERT EXPORT FUNCTION HERE
    const triggerExport = () => {
      const headers = ["Date", "Location", "Team", "Output/Hour", "Overtime (Hrs)", "Status"];
      const csvRows = activeData.dataset.map(row => 
        [row.date, activeLocation, activeTeam, row.output_per_hour, row.overtime_hours, activeData.status].join(",")
      );
      const csvContent = [headers.join(","), ...csvRows].join("\n");
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `RealRails_ShiftTelemetry_${activeLocation.replace(' ', '')}.csv`;
      link.click();
    };
  
    if (!isClient) return null;
  
    return (
      <div className="min-h-screen bg-[#030712] text-white font-sans flex flex-col lg:flex-row tracking-tight selection:bg-[#38BDF8] selection:text-white">
        {/* ... rest of your JSX ... */}
      
      {/* MAIN STAGE (70%) */}
      <main className="w-full lg:w-[70%] p-4 lg:p-8 flex flex-col gap-6 lg:h-screen lg:overflow-y-auto custom-scrollbar">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-[#1F2937]">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#10B981] tracking-tight drop-shadow-[0_0_12px_rgba(16,185,129,0.25)] transition-all">
              Shift Productivity & Coverage
            </h1>
            <p className="text-sm text-[#818CF8] mt-1.5 font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#38BDF8] inline-block animate-pulse shadow-[0_0_8px_#38BDF8]"></span>
              Real-Time Operational Intelligence
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 md:gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest pl-1">Location</label>
              <div className="flex bg-[#0B1117] border border-[#1F2937] rounded-md overflow-hidden shadow-inner">
                {['Facility A', 'Facility B'].map(loc => (
                  <button 
                    key={loc}
                    onClick={() => setActiveLocation(loc)}
                    className={`px-4 py-2 text-xs font-bold transition-all duration-300 ease-out relative ${
                      activeLocation === loc 
                        ? 'bg-[#10B981] text-[#030712] shadow-[0_0_15px_rgba(16,185,129,0.5)] z-10' 
                        : 'text-gray-400 hover:text-white hover:bg-[#1F2937]/50'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest pl-1">Team Context</label>
              <div className="relative group">
                <select 
                  value={activeTeam} 
                  onChange={(e) => setActiveTeam(e.target.value)}
                  className="appearance-none w-36 px-4 py-2 text-xs font-bold bg-[#0B1117] border border-[#1F2937] text-white rounded-md outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] transition-all duration-300 cursor-pointer hover:border-gray-500 shadow-inner"
                >
                  <option value="Morning Crew">Morning Crew</option>
                  <option value="Evening Crew">Evening Crew</option>
                  <option value="Night Watch">Night Watch</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#38BDF8] group-hover:text-[#10B981] transition-colors">
                  <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest pl-1">Time Horizon</label>
              <div className="relative group">
                <select 
                  value={timeRange} 
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="appearance-none w-36 px-4 py-2 text-xs font-bold bg-[#0B1117] border border-[#1F2937] text-white rounded-md outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-all duration-300 cursor-pointer hover:border-gray-500 shadow-inner"
                >
                  <option value="Last 7 Days">Last 7 Days</option>
                  <option value="Last 30 Days">Last 30 Days</option>
                  <option value="YTD">Year to Date</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 group-hover:text-white transition-colors">
                  <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Live Alerts Ticker */}
        <div className="bg-[#0B1117] border border-[#1F2937] rounded-lg p-3 flex items-center gap-4 shadow-md">
           <span className="text-[10px] font-bold uppercase tracking-widest text-[#38BDF8] bg-[#38BDF8]/10 px-2 py-1 rounded">Live Exceptions</span>
           <p className="text-xs text-gray-300 truncate flex-1 animate-fade-in">
             {activeData.status === 'Critical' ? <span className="text-red-400 font-bold mr-2">CRITICAL ALERT:</span> : null}
             {activeData.status === 'Warning' ? <span className="text-yellow-400 font-bold mr-2">SYSTEM WARNING:</span> : null}
             {activeData.issue}
           </p>
        </div>

        {/* Intelligence Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          
          {/* Output-Per-Hour Trend (Full Width) */}
          <section className="md:col-span-2 bg-[#0B1117] border border-[#1F2937] rounded-xl p-5 lg:p-6 flex flex-col relative group hover:border-gray-700 transition-colors shadow-lg backdrop-blur-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm text-[#10B981] font-bold tracking-wide">Output-Per-Hour Trend</h2>
              <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider bg-[#030712] px-2 py-1 rounded border border-[#1F2937]">BLS Baseline Applied</span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activeData.dataset}>
                  <XAxis dataKey="date" stroke="#4B5563" fontSize={11} tickMargin={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#4B5563" fontSize={11} domain={['dataMin - 10', 'dataMax + 10']} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={false} 
                    contentStyle={{ backgroundColor: 'rgba(11, 17, 23, 0.95)', borderColor: '#1F2937', color: '#fff', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }} 
                    itemStyle={{ color: '#10B981', fontWeight: 'bold' }}
                    labelStyle={{ color: '#818CF8', marginBottom: '4px' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="output_per_hour" 
                    stroke="#10B981" 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: '#030712', stroke: '#10B981', strokeWidth: 2 }} 
                    activeDot={{ r: 7, fill: '#10B981', stroke: '#030712', strokeWidth: 2 }} 
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Overtime Pareto (Half Width) - Upgraded with Cumulative Line */}
          <section className="bg-[#0B1117] border border-[#1F2937] rounded-xl p-5 lg:p-6 flex flex-col hover:border-gray-700 transition-colors shadow-lg">
             <h2 className="text-sm text-[#10B981] font-bold tracking-wide mb-6 group-hover:text-[#38BDF8] transition-colors">Overtime Pareto</h2>
             <div className="h-48 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <ComposedChart data={activeData.dataset}>
                   <XAxis dataKey="date" stroke="#4B5563" fontSize={10} tickLine={false} axisLine={false} tickMargin={8} />
                   <YAxis yAxisId="left" stroke="#4B5563" fontSize={10} tickLine={false} axisLine={false} />
                   <YAxis yAxisId="right" orientation="right" stroke="#4B5563" fontSize={10} tickLine={false} axisLine={false} domain={[0, 100]} tickFormatter={(val) => `${val}%`} />
                   <Tooltip 
                     cursor={false} 
                     contentStyle={{ backgroundColor: 'rgba(11, 17, 23, 0.95)', borderColor: '#1F2937', borderRadius: '8px', transition: 'transform 0.2s ease-out' }} 
                     itemStyle={{ fontWeight: 'bold' }}
                     labelStyle={{ color: 'white', fontSize: '12px', marginBottom: '4px' }}
                   />
                   <Bar yAxisId="left" dataKey="overtime_hours" name="Hours" fill="#38BDF8" radius={[4, 4, 0, 0]} animationDuration={1000} />
                   {/* Simulated Cumulative Line for Pareto effect */}
                   <Line yAxisId="right" type="monotone" dataKey={(d) => Math.min(100, d.overtime_hours * 3)} name="Cumulative %" stroke="#818CF8" strokeWidth={2} dot={false} />
                 </ComposedChart>
               </ResponsiveContainer>
             </div>
          </section>

          {/* Coverage Heatmap (Half Width) - Newly Added */}
          <section className="bg-[#0B1117] border border-[#1F2937] rounded-xl p-5 lg:p-6 flex flex-col hover:border-gray-700 transition-colors shadow-lg group">
             <h2 className="text-sm text-[#10B981] font-bold tracking-wide mb-6 group-hover:text-[#10B981] transition-colors">Coverage Heatmap</h2>
             <div className="flex-1 grid grid-cols-5 gap-1">
                {activeData.dataset.map((d, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <span className="text-[9px] text-gray-500 text-center mb-1">{d.date.split('-')[2]}</span>
                    {/* Simulated shifts per day */}
                    {[1, 2, 3].map(shift => {
                      const coverageScore = Math.random();
                      const bgColor = coverageScore > 0.8 ? 'bg-[#10B981]' : coverageScore > 0.4 ? 'bg-yellow-500' : 'bg-red-500';
                      const opacity = coverageScore > 0.8 ? 'opacity-80' : coverageScore > 0.4 ? 'opacity-60' : 'opacity-90';
                      return (
                        <div key={shift} className={`w-full h-8 rounded-sm ${bgColor} ${opacity} hover:opacity-100 transition-opacity cursor-crosshair`} title={`Shift ${shift} Coverage`}></div>
                      );
                    })}
                  </div>
                ))}
             </div>
          </section>

          {/* Shift Matrix Context (Full Width) */}
          <section className="md:col-span-2 bg-[#0B1117] border border-[#1F2937] rounded-xl p-5 lg:p-6 flex flex-col hover:border-gray-700 transition-colors shadow-lg">
             <div className="flex justify-between items-center mb-4">
               <h2 className="text-sm text-[#10B981] font-bold tracking-wide">Shift Matrix Context</h2>
             </div>
             <div className="flex-1 flex flex-col justify-center">
                <div className="p-5 bg-[#030712] border border-[#1F2937] rounded-lg flex justify-between items-center relative overflow-hidden group hover:border-[#818CF8]/50 transition-all">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#818CF8] opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="flex flex-col gap-1 ml-4">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Active Scope</span>
                    <span className="text-xl text-white font-bold tracking-tight">{activeLocation}</span>
                  </div>
                  
                  <div className="flex flex-col gap-1 items-center">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Team</span>
                    <span className="text-[#38BDF8] font-medium flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                      {activeTeam}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 items-end">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Status</span>
                    <span className={`text-xs uppercase font-bold px-3 py-1 rounded-full ${activeData.status === 'Optimal' ? 'bg-[#10B981]/20 text-[#10B981]' : activeData.status === 'Warning' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-red-500/20 text-red-400'}`}>
                      {activeData.status}
                    </span>
                  </div>
                </div>
             </div>
          </section>

        </div>
      </main>

      {/* INTELLIGENCE SIDEBAR (30%) */}
      <aside className="w-full lg:w-[30%] bg-[#0B1117] border-t lg:border-t-0 lg:border-l border-[#1F2937] flex flex-col lg:h-screen lg:overflow-y-auto shadow-2xl custom-scrollbar relative z-20">
        
        <div className="p-6 lg:p-10 flex flex-col gap-8 flex-1">
          {/* Section A: Title & Metric */}
          <div className="transform hover:scale-[1.02] transition-transform duration-300 cursor-default">
            <h3 className="text-[10px] text-gray-500 font-extrabold uppercase tracking-[0.25em] mb-4">Rail Category: Human Utilization</h3>
            <div className="text-5xl lg:text-6xl font-black text-white tracking-tighter drop-shadow-md mb-2">
              {activeData.kpi} <span className="text-2xl text-[#818CF8] font-bold ml-1 tracking-normal cursor-help border-b border-dashed border-[#818CF8]/50 pb-0.5" title="KPI Definition: Total finalized assemblies per hour, normalized against historical BLS productivity baselines.">Units</span>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs text-[#10B981] font-bold bg-[#10B981]/10 px-2.5 py-1.5 rounded-full border border-[#10B981]/20">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
              Above Baseline Tolerance
            </div>
          </div>

          {/* Decision Support Panel */}
          <div className="bg-[#030712] border border-[#1F2937] rounded-xl p-6 relative overflow-hidden group hover:border-[#38BDF8]/50 transition-colors shadow-lg cursor-default">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#38BDF8] group-hover:shadow-[0_0_12px_#38BDF8] transition-shadow"></div>
            <h4 className="text-xs font-extrabold text-[#38BDF8] uppercase tracking-widest mb-3 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Decision Support
            </h4>
            <p className="text-sm text-gray-300 leading-relaxed font-medium transition-opacity duration-300">
              {activeData.issue}
            </p>
          </div>

          {/* Context Panels Container */}
          <div className="space-y-6 pt-4 border-t border-[#1F2937]">
            
            {/* Section B: Why This Matters */}
            <div className="group cursor-default">
              <h4 className="text-[10px] font-bold text-[#818CF8] uppercase tracking-widest mb-2 flex items-center gap-2 group-hover:text-white transition-colors">
                <svg className="w-3 h-3 text-[#818CF8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Why This Matters
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                Helps operations balance service coverage, workforce cost and output without individual surveillance.
              </p>
            </div>

            {/* Section C: Who Controls the Rail */}
            <div className="group cursor-default">
              <h4 className="text-[10px] font-bold text-[#10B981] uppercase tracking-widest mb-2 flex items-center gap-2 group-hover:text-white transition-colors">
                <svg className="w-3 h-3 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                Who Controls the Rail
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                Highlights the balance of power between management and the workforce by enabling data-driven decisions on staffing, productivity, and operational costs while ensuring employee privacy.
              </p>
            </div>

            {/* Section D: Data Quality Notes */}
            <div className="group cursor-default">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2 group-hover:text-gray-300 transition-colors">
                <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                Data Quality Notes
              </h4>
              <p className="text-[11px] text-gray-600 leading-relaxed group-hover:text-gray-400 transition-colors">
                Source: BLS productivity context; synthetic roster, shift, output and time data. Privacy protocols active.
              </p>
            </div>
          </div>
        </div>

        {/* Section E: Download Action */}
        <div className="p-6 lg:p-10 pt-0 mt-auto">
        <button onClick={triggerExport} className="w-full py-4 bg-[#030712] border border-[#1F2937] text-[#38BDF8] text-xs font-extrabold uppercase tracking-widest rounded-lg hover:border-[#38BDF8] hover:bg-[#38BDF8]/5 hover:shadow-[0_0_20px_rgba(56,189,248,0.15)] transition-all duration-300 transform active:scale-95 flex justify-center items-center gap-2 group">
            <svg className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Export Intelligence (.CSV)
          </button>
        </div>
      </aside>
    </div>
  );
}