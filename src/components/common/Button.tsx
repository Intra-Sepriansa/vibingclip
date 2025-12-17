import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { classNames } from '../../utils/classNames';
import { Spinner } from './Spinner';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'contrast';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

export const Button = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  ...rest
}: PropsWithChildren<ButtonProps>) => {
  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      'bg-gradient-to-r from-violet-500 to-emerald-400 text-slate-900 font-semibold shadow-lg shadow-violet-500/20 hover:shadow-emerald-400/25',
    secondary:
      'bg-slate-800 text-slate-50 border border-slate-700 hover:border-emerald-400/60 hover:text-white',
    ghost:
      'text-slate-200 hover:bg-slate-800 border border-transparent hover:border-slate-800',
    contrast:
      'bg-white text-slate-900 font-semibold shadow-[0_16px_70px_rgba(0,0,0,0.35)] hover:-translate-y-[1px]'
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-3 text-base'
  };

  return (
    <button
      className={classNames(
        'inline-flex items-center justify-center rounded-xl transition-all duration-150 gap-2 disabled:opacity-50 disabled:cursor-not-allowed',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && <Spinner className="h-4 w-4" />}
      <span>{children}</span>
    </button>
  );
};
