export default function Dashboard() {
  return (
    <div className="space-y-8 animate-rise">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-display font-semibold mb-2">Welcome Back</h1>
          <p className="text-white/50 text-lg">Here's what's happening today.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-dark p-8 rounded-[1.5rem] card-lift cursor-pointer gradient-border flex flex-col justify-between h-48 relative overflow-hidden group">
          <div className="absolute inset-0 hero-glow opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          <h3 className="eyebrow text-white/50 mb-2 relative z-10">Total Inquiries</h3>
          <p className="text-5xl font-light text-copper-gradient relative z-10">24</p>
        </div>
        <div className="glass-dark p-8 rounded-[1.5rem] card-lift cursor-pointer gradient-border flex flex-col justify-between h-48 relative overflow-hidden group">
          <div className="absolute inset-0 hero-glow opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          <h3 className="eyebrow text-white/50 mb-2 relative z-10">Active Job Postings</h3>
          <p className="text-5xl font-light text-copper-gradient relative z-10">3</p>
        </div>
        <div className="glass-dark p-8 rounded-[1.5rem] card-lift cursor-pointer gradient-border flex flex-col justify-between h-48 relative overflow-hidden group">
          <div className="absolute inset-0 hero-glow opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          <h3 className="eyebrow text-white/50 mb-2 relative z-10">Pending Invoices</h3>
          <p className="text-5xl font-light text-copper-gradient relative z-10">$12,450</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="glass-dark p-8 rounded-[1.5rem] gradient-border">
          <h3 className="text-xl font-display font-medium mb-6 text-white/90">Recent Activity</h3>
          <div className="space-y-4">
            {[1,2,3,4].map((i) => (
              <div key={i} className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                  <span className="text-copper-soft">✦</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white/80">New Inquiry received from John Doe</p>
                  <p className="text-xs text-white/40">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
