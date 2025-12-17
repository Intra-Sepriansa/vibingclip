import { ReactNode } from 'react';
import { Button } from './Button';
import { Icon } from './Icon';

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: ReactNode;
}

export const EmptyState = ({ title, description, actionLabel, onAction, icon }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/60 p-8 text-center">
      <div className="mb-4 text-emerald-200">
        {icon ?? <Icon name="sparkle" size={32} className="text-emerald-300" />}
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      {description ? <p className="mt-2 max-w-lg text-sm text-slate-400">{description}</p> : null}
      {actionLabel && onAction ? (
        <Button className="mt-4" size="md" variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
};
