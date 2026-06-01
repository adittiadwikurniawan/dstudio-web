import React from 'react';

const Input = React.forwardRef(({
  label,
  type = 'text',
  error,
  placeholder,
  className = '',
  id,
  required = false,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        id={inputId}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-3 text-sm bg-white dark:bg-zinc-800 border ${
          error 
            ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20' 
            : 'border-slate-200 focus:border-primary-500 focus:ring-primary-500/20 dark:border-zinc-700'
        } rounded-xl shadow-sm focus:outline-none focus:ring-4 transition-all duration-200 text-slate-800 dark:text-slate-100 placeholder-slate-400`}
        {...props}
      />
      {error && (
        <span className="text-xs text-rose-500 mt-0.5 font-medium">{error}</span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
