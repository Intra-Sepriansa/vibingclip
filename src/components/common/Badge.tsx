import { PropsWithChildren } from 'react';
import { classNames } from '../../utils/classNames';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'neutral';

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
}

export const Badge = ({ children, variant = 'neutral', className }: PropsWithChildren<BadgeProps>) => {
  const base = 'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium';
  const styles: Record<BadgeVariant, string> = {
    success: 'bg-emerald-500/15 text-emerald-200 border border-emerald-400/40',
    warning: 'bg-amber-500/15 text-amber-200 border border-amber-400/40',
    danger: 'bg-rose-500/15 text-rose-200 border border-rose-400/40',
    neutral: 'bg-slate-800 text-slate-200 border border-slate-700'
  };

  return <span className={classNames(base, styles[variant], className)}>{children}</span>;
};
