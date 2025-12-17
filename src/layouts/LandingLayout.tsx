import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';

export const LandingLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="absolute inset-0 -z-10 bg-vibe-radial" aria-hidden />
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <Outlet />
      </main>
    </div>
  );
};
