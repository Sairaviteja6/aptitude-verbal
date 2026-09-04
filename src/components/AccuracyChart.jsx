import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from 'recharts';

export default function AccuracyChart({ topicStats }) {
  // Format data for Recharts
  const data = [
    { name: 'Quantitative', key: 'aptitude', accuracy: topicStats.aptitude?.accuracy || 0, total: topicStats.aptitude?.total || 0, color: '#b86955' },
    { name: 'Verbal', key: 'verbal', accuracy: topicStats.verbal?.accuracy || 0, total: topicStats.verbal?.total || 0, color: '#5b8c71' },
    { name: 'Data Interp.', key: 'data-interpretation', accuracy: topicStats['data-interpretation']?.accuracy || 0, total: topicStats['data-interpretation']?.total || 0, color: '#d97706' },
    { name: 'Logical Reas.', key: 'logical-reasoning', accuracy: topicStats['logical-reasoning']?.accuracy || 0, total: topicStats['logical-reasoning']?.total || 0, color: '#6366f1' },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="glass-panel p-3 rounded-xl border border-slate-700 text-xs shadow-xl space-y-1">
          <p className="font-bold text-slate-100">{item.name}</p>
          <p className="text-emerald-400 font-mono">Accuracy: {item.accuracy}%</p>
          <p className="text-slate-400 font-mono">Total Attempted: {item.total}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Bar Chart: Accuracy % per topic */}
      <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-slate-800 shadow-lg">
        <h3 className="font-serif text-lg font-semibold text-slate-100 mb-1">Accuracy by Subject</h3>
        <p className="text-xs text-slate-400 mb-6">Percentage of correct answers per domain</p>
        
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={12} domain={[0, 100]} unit="%" tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="accuracy" radius={[8, 8, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart: Attempt Distribution */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 shadow-lg flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-lg font-semibold text-slate-100 mb-1">Volume Distribution</h3>
          <p className="text-xs text-slate-400 mb-4">Questions attempted across subjects</p>
        </div>

        <div className="h-48 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={4}
                dataKey="total"
              >
                {data.map((entry, index) => (
                  <Cell key={`pie-cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800/60">
          {data.map((item) => (
            <div key={item.key} className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-slate-300 truncate">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
