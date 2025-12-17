import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/common/Sidebar';

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 lg:ml-0">
          <div className="sticky top-0 z-20 border-b border-slate-800/80 bg-slate-950/80 px-4 py-4 backdrop-blur lg:px-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Workspace</p>
                <p className="text-lg font-semibold text-white">Welcome back, creator</p>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <span className="hidden sm:inline">AI mode: On</span>
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
              </div>
            </div>
          </div>
          <div className="px-4 py-6 lg:px-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
