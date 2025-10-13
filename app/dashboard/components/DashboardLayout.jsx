import { Cloud, Activity, Zap } from 'lucide-react';


export const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 glass-panel border-b neon-border">
        <div className="flex items-center justify-between px-6 h-20">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Cloud className="h-8 w-8 text-primary glow-emerald" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Weather Data Analyzer
              </h1>
              <p className="text-xs text-muted-foreground">Advanced Analytics Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass-panel">
                <Activity className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Live Monitoring</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass-panel">
                <Zap className="h-4 w-4 text-secondary" />
                <span className="text-sm font-medium">DSA Powered</span>
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
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
    </div>
  );
};
