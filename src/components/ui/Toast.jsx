import React, { useEffect } from 'react';
import { Icon } from '@iconify/react';

const Toast = ({
  message,
  type = 'success', // 'success' | 'error' | 'info'
  duration = 4000,
  onClose,
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: <Icon icon="solar:check-circle-bold" className="text-emerald-500 w-5 h-5" />,
    error: <Icon icon="solar:danger-bold" className="text-rose-500 w-5 h-5" />,
    info: <Icon icon="solar:info-circle-bold" className="text-sky-500 w-5 h-5" />,
  };

  const borderColors = {
    success: 'border-emerald-100 dark:border-emerald-950/30',
    error: 'border-rose-100 dark:border-rose-950/30',
    info: 'border-sky-100 dark:border-sky-950/30',
  };

  return (
    <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border ${borderColors[type]} rounded-2xl shadow-xl animate-slide-up max-w-sm`}>
      {icons[type]}
      <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{message}</p>
      <button 
        onClick={onClose}
        className="text-slate-400 hover:text-slate-600 transition-colors ml-2"
        aria-label="Close"
      >
        <Icon icon="solar:close-circle-linear" className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;
