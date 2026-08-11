"use client";
import { useEffect, useState } from 'react';
import { Users, BookOpen, Award, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({ students: 0, subjects: 2, results: 0 });

  useEffect(() => {
    // In a real app, fetch these from an API
    Promise.all([
      fetch('/api/students').then(res => res.json()),
      fetch('/api/results').then(res => res.json())
    ]).then(([students, results]) => {
      setStats({
        students: students.length,
        subjects: 2, // Hardcoded for demo
        results: results.length
      });
    });
  }, []);

  const cards = [
    { title: 'Total Students', value: stats.students, icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { title: 'Total Subjects', value: stats.subjects, icon: BookOpen, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { title: 'Results Recorded', value: stats.results, icon: Award, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { title: 'Average Pass Rate', value: '85%', icon: TrendingUp, color: 'text-amber-400', bg: 'bg-amber-400/10' },
  ];

  return (
    <div className="p-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-slate-400">Welcome back to the Student Result Management System.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="glass-card p-6 flex items-center space-x-4 animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className={`p-4 rounded-2xl ${card.bg}`}>
                <Icon size={28} className={card.color} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400 mb-1">{card.title}</p>
                <h3 className="text-3xl font-bold">{card.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="glass-card p-8 animate-slide-up" style={{ animationDelay: '400ms' }}>
         <h2 className="text-xl font-semibold mb-6 flex items-center"><Award className="mr-3 text-teal-400" /> Recent Activity</h2>
         <div className="text-center py-12 text-slate-500">
           <div className="inline-block p-4 rounded-full bg-slate-800/50 mb-4">
             <TrendingUp size={32} className="text-slate-600" />
           </div>
           <p>System operational. Navigate to Students or Results to begin management.</p>
         </div>
      </div>
    </div>
  );
}
