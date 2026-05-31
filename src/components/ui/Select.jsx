import React from 'react';

const Select = React.forwardRef(({
  label,
  options = [],
  error,
  placeholder,
  className = '',
  id,
  required = false,
  ...props
}, ref) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={selectId} className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          required={required}
          className={`w-full px-4 py-3 text-sm bg-white dark:bg-zinc-800 border ${
            error 
              ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20' 
              : 'border-slate-200 focus:border-primary-500 focus:ring-primary-500/20 dark:border-zinc-700'
          } rounded-xl shadow-sm focus:outline-none focus:ring-4 transition-all duration-200 text-slate-800 dark:text-slate-100 appearance-none`}
          {...props}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      {error && (
        <span className="text-xs text-rose-500 mt-0.5 font-medium">{error}</span>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
