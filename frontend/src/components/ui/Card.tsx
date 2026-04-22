import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  dark?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, dark = false, className = '', ...props }) => {
  return (
    <div className={`${dark ? 'brutal-card-dark' : 'brutal-card'} p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};
