import { classNames } from '../../utils/classNames';

interface SpinnerProps {
  className?: string;
}

export const Spinner = ({ className }: SpinnerProps) => {
  return <span className={classNames('animate-spin rounded-full border-2 border-slate-600 border-t-emerald-400', className)} />;
};
