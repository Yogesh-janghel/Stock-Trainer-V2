import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'destructive' | 'secondary' | 'ghost';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'secondary', 
  isLoading, 
  className = '', 
  ...props 
}) => {
  let variantClass = '';
  switch (variant) {
    case 'primary':
      variantClass = 'brutal-btn-primary';
      break;
    case 'destructive':
      variantClass = 'brutal-btn-destructive';
      break;
    case 'ghost':
      variantClass = 'bg-transparent text-off-white border-4 border-deep-black hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-y-[3px] active:translate-x-[3px] transition-all duration-300 ease-bouncy font-display font-bold px-6 py-3 lowercase tracking-tight';
      break;
    default:
      variantClass = 'brutal-btn';
  }

  return (
    <button 
      className={`${variantClass} ${className} disabled:opacity-50 disabled:cursor-not-allowed`} 
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? 'loading...' : children}
    </button>
  );
};
