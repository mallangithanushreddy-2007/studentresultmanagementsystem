"use client";
import { useState, useEffect } from 'react';
import { UserPlus, Search, User } from 'lucide-react';
import type { Student } from '@/lib/db';

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', rollNumber: '', department: '', email: '' });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await fetch('/api/students');
    const data = await res.json();
    setStudents(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    setIsModalOpen(false);
    setFormData({ name: '', rollNumber: '', department: '', email: '' });
    fetchStudents();
  };

  return (
    <div className="p-8 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Students</h1>
          <p className="text-slate-400">Manage student profiles and records.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-400 text-slate-950 px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-teal-500/20"
        >
          <UserPlus size={18} />
          <span>Add Student</span>
        </button>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center bg-slate-900/50">
          <Search size={18} className="text-slate-500 mr-3" />
          <input 
            type="text" 
            placeholder="Search students..." 
            className="bg-transparent border-none outline-none text-sm w-full text-slate-200 placeholder-slate-500"
          />
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-900/80 text-slate-400 text-sm border-b border-slate-800">
            <tr>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Roll Number</th>
              <th className="px-6 py-4 font-medium">Department</th>
              <th className="px-6 py-4 font-medium">Email</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {students.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                  No students found. Add one to get started.
                </td>
              </tr>
            )}
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-teal-400">
                    <User size={14} />
                  </div>
                  <span className="font-medium text-slate-200">{student.name}</span>
                </td>
                <td className="px-6 py-4 text-slate-400 font-mono text-sm">{student.rollNumber}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full bg-slate-800 text-xs text-slate-300 border border-slate-700">
                    {student.department}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-400 text-sm">{student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="glass-modal w-full max-w-md p-6 animate-slide-up">
            <h2 className="text-xl font-bold mb-6">Add New Student</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Full Name</label>
                <input required type="text" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all" 
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Roll Number</label>
                <input required type="text" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all" 
                  value={formData.rollNumber} onChange={e => setFormData({...formData, rollNumber: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Department</label>
                <input required type="text" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all" 
                  value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                <input required type="email" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all" 
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="flex justify-end space-x-3 mt-8">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors">
                  Cancel
                </button>
                <button type="submit" className="bg-teal-500 hover:bg-teal-400 text-slate-950 px-6 py-2 rounded-xl text-sm font-medium transition-all">
                  Save Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
