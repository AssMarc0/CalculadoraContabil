import React, { ReactNode, CSSProperties } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
  style?: CSSProperties;
}

export const Card: React.FC<CardProps> = ({ children, className = '', animate = true, style }) => {
  return (
    <div 
      className={`
        bg-card rounded-xl border border-border shadow-soft p-6 
        ${animate ? 'animate-scale-in' : ''} 
        ${className}
      `}
      style={style}
    >
      {children}
    </div>
  );
};
