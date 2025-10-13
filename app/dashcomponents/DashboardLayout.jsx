import { Cloud, Activity, Zap, TrendingUp } from 'lucide-react';

export const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-black">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/30 shadow-lg">
        <div className="flex items-center justify-between px-6 h-20">
          <div className="flex items-center gap-4">
            <div className="relative">
          
             <TrendingUp className='text-emerald-500'/>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-green-400 to-green-600 bg-clip-text text-transparent drop-shadow-md">
                Weather Data Analyzer
              </h1>
              <p className="text-xs text-gray-400">Advanced Analytics Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-sm">
                <Activity className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-medium text-gray-100">Live Monitoring</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-sm">
                <Zap className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium text-gray-100">DSA Powered</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 max-w-[1800px] mx-auto">
        {children}
      </main>

      {/* Background Grid Effect */}
      <div className="fixed inset-0 -z-10 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>
    </div>
  );
};
