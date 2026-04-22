import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && <label className="font-display font-bold lowercase tracking-tight">{label}</label>}
        <input 
          ref={ref}
          className={`brutal-input ${error ? 'border-hot-pink' : ''} ${className}`} 
          {...props} 
        />
        {error && <span className="text-hot-pink font-display font-bold lowercase text-sm">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
