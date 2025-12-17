import { ComponentProps } from 'react';

export type IconName =
  | 'dashboard'
  | 'templates'
  | 'settings'
  | 'lightning'
  | 'scissors'
  | 'mobile'
  | 'sparkle'
  | 'close'
  | 'menu';

interface IconProps extends ComponentProps<'svg'> {
  name: IconName;
  size?: number;
}

const iconPaths: Record<IconName, JSX.Element> = {
  dashboard: (
    <>
      <rect x="3" y="4" width="8" height="6" rx="1.5" />
      <rect x="13" y="4" width="8" height="6" rx="1.5" />
      <rect x="3" y="12" width="18" height="8" rx="1.5" />
    </>
  ),
  templates: (
    <>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M7 9h10" />
      <path d="M7 13h6" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 5v-2" />
      <path d="M12 21v-2" />
      <path d="M5 12H3" />
      <path d="M21 12h-2" />
      <path d="M6.5 6.5 5 5" />
      <path d="M18.5 18.5 17 17" />
      <path d="M6.5 17 5 18.5" />
      <path d="M18.5 6.5 17 5" />
    </>
  ),
  lightning: (
    <>
      <path d="M13 2 6 14h6l-2 8 7-12h-6l2-8Z" />
    </>
  ),
  scissors: (
    <>
      <circle cx="7" cy="7" r="2.5" />
      <circle cx="7" cy="17" r="2.5" />
      <path d="M20 4 9 13" />
      <path d="M20 20 9 11" />
      <path d="M14 12h2" />
    </>
  ),
  mobile: (
    <>
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <circle cx="12" cy="17" r="1" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3 13.8 8.2 19 10 13.8 11.8 12 17 10.2 11.8 5 10 10.2 8.2 12 3Z" />
      <path d="M5 5l1 2" />
      <path d="M19 19l-1-2" />
    </>
  ),
  close: (
    <>
      <path d="m8 8 8 8" />
      <path d="m16 8-8 8" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  )
};

export const Icon = ({ name, size = 20, className, ...rest }: IconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...rest}
    >
      {iconPaths[name]}
    </svg>
  );
};
