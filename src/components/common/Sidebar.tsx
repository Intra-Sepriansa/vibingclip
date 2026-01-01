import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { classNames } from '../../utils/classNames';
import { Icon, IconName } from './Icon';

const navItems: Array<{ label: string; to: string; icon: IconName; disabled: boolean }> = [
  { label: 'Dashboard', to: '/app/dashboard', icon: 'dashboard', disabled: false },
  { label: 'Analytics', to: '/app/analytics', icon: 'sparkle', disabled: false },
  { label: 'Templates', to: '#', icon: 'templates', disabled: true },
  { label: 'Settings', to: '#', icon: 'settings', disabled: true }
];

export const Sidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const content = (
    <aside className="flex h-full flex-col justify-between border-r border-slate-800 bg-slate-950/70 p-4 backdrop-blur">
      <div>
        <div className="mb-6 flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-violet-500 to-emerald-400 p-[2px]">
            <div className="h-full w-full rounded-2xl bg-slate-950" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Vibing Clip</p>
            <p className="text-lg font-semibold text-white">Dashboard</p>
          </div>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => {
            const active =
              location.pathname.startsWith(item.to) ||
              (item.to === '/app/dashboard' && location.pathname.startsWith('/app/projects'));
            const baseClasses =
              'flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-all';
            if (item.disabled) {
              return (
                <div
                  key={item.label}
                  className={classNames(baseClasses, 'cursor-not-allowed border border-slate-800/80 bg-slate-900/60 text-slate-600')}
                >
                  <Icon name={item.icon} size={18} className="text-slate-600" />
                  <span>{item.label} (soon)</span>
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                to={item.to}
                className={classNames(
                  baseClasses,
                  active
                    ? 'border border-emerald-400/50 bg-emerald-400/10 text-white shadow-emerald-400/10'
                    : 'border border-transparent text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                )}
                onClick={() => setOpen(false)}
              >
                <Icon name={item.icon} size={18} className="text-emerald-200" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900/70 p-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-violet-500 to-emerald-400 text-center text-base font-semibold text-slate-900">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-950">VC</div>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-white">Creator</p>
          <p className="text-xs text-slate-400">Welcome</p>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      <button
        type="button"
        className="fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-white shadow-lg lg:hidden"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle sidebar"
      >
        <Icon name="menu" />
      </button>
      <div className="hidden lg:flex lg:w-72 lg:shrink-0">{content}</div>
      {open ? (
        <div className="fixed inset-0 z-30 flex lg:hidden">
          <div className="w-72">{content}</div>
          <div className="flex-1 bg-black/50" onClick={() => setOpen(false)} />
        </div>
      ) : null}
    </>
  );
};
