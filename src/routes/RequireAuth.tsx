import { PropsWithChildren } from 'react';
// Auth temporarily disabled; always allow access

export const RequireAuth = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};
