export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-950 text-white">
      <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
        Student Result Management System
      </h1>
      <p className="text-slate-400 mb-8">
        Welcome to the automated dashboard.
      </p>
      <div className="glass-card p-8 text-center max-w-md w-full">
         <h2 className="text-xl font-semibold mb-2">System Status</h2>
         <p className="text-emerald-400">Online & Ready</p>
      </div>
    </div>
  );
}
