import { PropsWithChildren, ReactNode } from 'react';
import { Button } from './Button';
import { Icon } from './Icon';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  footer?: ReactNode;
}

export const Modal = ({ title, isOpen, onClose, children, footer }: PropsWithChildren<ModalProps>) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="card-surface w-full max-w-lg">
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close modal">
            <Icon name="close" />
          </Button>
        </div>
        <div className="py-4 text-sm text-slate-200">{children}</div>
        {footer ? <div className="mt-2 border-t border-slate-800 pt-3">{footer}</div> : null}
      </div>
    </div>
  );
};
