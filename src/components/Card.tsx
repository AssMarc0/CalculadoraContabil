import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', animate = true }) => {
  return (
    <div 
      className={`
        bg-card rounded-xl border border-border shadow-soft p-6 
        ${animate ? 'animate-scale-in' : ''} 
        ${className}
      `}
    >
      {children}
    </div>
  );
};
