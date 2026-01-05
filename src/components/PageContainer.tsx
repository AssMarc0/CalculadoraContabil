import React, { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children, className = '' }) => {
  return (
    <div className="min-h-screen bg-background overflow-auto">
      <div className={`container max-w-2xl mx-auto px-4 py-8 ${className}`}>
        {children}
      </div>
    </div>
  );
};
