export default function ProductsPage() {
  return (
    <div className="space-y-6 animate-rise">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-semibold">Products Management</h1>
        <button className="px-4 py-2 bg-[var(--copper)] text-[var(--ink)] font-semibold rounded-lg hover:bg-[var(--copper-soft)] transition-colors">
          Add New
        </button>
      </div>

      <div className="glass-dark rounded-[1.5rem] p-6 gradient-border">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-white/50 text-sm eyebrow">
                <th className="pb-3 pr-4 font-normal">Title/Name</th>
                <th className="pb-3 px-4 font-normal">Status</th>
                <th className="pb-3 px-4 font-normal">Date Added</th>
                <th className="pb-3 pl-4 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Placeholder rows */}
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                <td className="py-4 pr-4 text-white/90">Example Products Item</td>
                <td className="py-4 px-4"><span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded-full">Active</span></td>
                <td className="py-4 px-4 text-white/50">Today</td>
                <td className="py-4 pl-4 text-right">
                  <button className="text-white/40 hover:text-white transition-colors mr-3">Edit</button>
                  <button className="text-red-400/70 hover:text-red-400 transition-colors">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
