import { PropsWithChildren } from 'react';
import { classNames } from '../../utils/classNames';

interface TagProps {
  className?: string;
}

export const Tag = ({ children, className }: PropsWithChildren<TagProps>) => (
  <span
    className={classNames(
      'inline-flex items-center rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-200 border border-slate-700',
      className
    )}
  >
    {children}
  </span>
);
