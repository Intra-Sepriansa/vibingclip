import { PropsWithChildren } from 'react';
import { classNames } from '../../utils/classNames';

interface CardProps {
  className?: string;
}

export const Card = ({ children, className }: PropsWithChildren<CardProps>) => {
  return <div className={classNames('card-surface p-4', className)}>{children}</div>;
};
