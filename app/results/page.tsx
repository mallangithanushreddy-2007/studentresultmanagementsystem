"use client";
import { useState, useEffect } from 'react';
import { FilePlus, Award } from 'lucide-react';
import type { Student, Subject, Result } from '@/lib/db';

export default function ResultsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [results, setResults] = useState<(Result & { studentName: string, subjectName: string })[]>([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ studentId: '', subjectId: '', marks: '', semester: 'Fall 2026' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // In a real app, subjects would also have an API route
    const resStud = await fetch('/api/students');
    const resRes = await fetch('/api/results');
    setStudents(await resStud.json());
    setResults(await resRes.json());
    
    // Mocking subjects fetch since we didn't build an API route for it yet to save time
    setSubjects([
      { id: '1', name: 'Data Structures', code: 'CS201', credits: 4 },
      { id: '2', name: 'Algorithms', code: 'CS301', credits: 4 }
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        marks: Number(formData.marks)
      }),
    });
    setIsModalOpen(false);
    setFormData({ studentId: '', subjectId: '', marks: '', semester: 'Fall 2026' });
    fetchData();
  };

  const getGradeColor = (grade: string) => {
    if (grade.includes('A')) return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    if (grade.includes('B')) return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    if (grade.includes('C')) return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
    return 'text-red-400 bg-red-400/10 border-red-400/20';
  };

  return (
    <div className="p-8 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Results</h1>
          <p className="text-slate-400">Record and view student academic performance.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-emerald-500/20"
        >
          <FilePlus size={18} />
          <span>Record Grade</span>
        </button>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-900/80 text-slate-400 text-sm border-b border-slate-800">
            <tr>
              <th className="px-6 py-4 font-medium">Student Name</th>
              <th className="px-6 py-4 font-medium">Subject</th>
              <th className="px-6 py-4 font-medium">Semester</th>
              <th className="px-6 py-4 font-medium">Marks</th>
              <th className="px-6 py-4 font-medium">Grade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
             {results.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                  No results recorded yet.
                </td>
              </tr>
            )}
            {results.map((result) => (
              <tr key={result.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-200">{result.studentName}</td>
                <td className="px-6 py-4 text-slate-300">{result.subjectName}</td>
                <td className="px-6 py-4 text-slate-400 text-sm">{result.semester}</td>
                <td className="px-6 py-4 text-slate-300 font-mono">{result.marks}/100</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getGradeColor(result.grade)}`}>
                    {result.grade}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="glass-modal w-full max-w-md p-6 animate-slide-up">
            <h2 className="text-xl font-bold mb-6 flex items-center"><Award className="mr-2 text-emerald-400" /> Record New Result</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Student</label>
                <select required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-slate-200"
                  value={formData.studentId} onChange={e => setFormData({...formData, studentId: e.target.value})}>
                  <option value="">Select a student...</option>
                  {students.map(s => <option key={s.id} value={s.id}>{s.name} ({s.rollNumber})</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Subject</label>
                <select required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-slate-200"
                  value={formData.subjectId} onChange={e => setFormData({...formData, subjectId: e.target.value})}>
                  <option value="">Select a subject...</option>
                  {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Marks (out of 100)</label>
                <input required type="number" min="0" max="100" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-slate-200" 
                  value={formData.marks} onChange={e => setFormData({...formData, marks: e.target.value})} />
              </div>
              
              <div className="flex justify-end space-x-3 mt-8">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors">
                  Cancel
                </button>
                <button type="submit" className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-6 py-2 rounded-xl text-sm font-medium transition-all">
                  Save Result
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
