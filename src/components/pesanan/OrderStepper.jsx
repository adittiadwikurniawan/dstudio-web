import React from 'react';
import { Icon } from '@iconify/react';

const OrderStepper = ({ currentStep }) => {
  const steps = [
    { number: 1, label: 'Data Diri', icon: 'solar:user-bold' },
    { number: 2, label: 'Konfirmasi', icon: 'solar:bill-list-bold' },
    { number: 3, label: 'Pembayaran', icon: 'mdi:qrcode-scan' },
    { number: 4, label: 'Selesai', icon: 'solar:check-circle-bold' },
  ];

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8">
      <div className="relative flex items-center justify-between">
        {/* Progress Line Background */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 dark:bg-zinc-800 -translate-y-1/2 -z-10" />

        {/* Active Progress Line */}
        <div
          className="absolute top-1/2 left-0 h-0.5 bg-primary-500 -translate-y-1/2 -z-10 transition-all duration-500 ease-out"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {/* Step Nodes */}
        {steps.map((step) => {
          const isCompleted = currentStep > step.number;
          const isActive = currentStep === step.number;

          return (
            <div key={step.number} className="flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isCompleted
                    ? 'bg-primary-500 border-primary-500 text-white shadow-md shadow-primary-500/20'
                    : isActive
                      ? 'bg-white dark:bg-zinc-900 border-primary-500 text-primary-500 shadow-md shadow-primary-500/10'
                      : 'bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-400'
                  }`}
              >
                {isCompleted ? (
                  <Icon icon="solar:check-circle-bold" className="w-6 h-6" />
                ) : (
                  <Icon icon={step.icon} className="w-5 h-5" />
                )}
              </div>
              <span
                className={`text-xs font-bold transition-colors ${isActive
                    ? 'text-primary-600 dark:text-primary-400'
                    : isCompleted
                      ? 'text-slate-700 dark:text-slate-350'
                      : 'text-slate-400'
                  }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderStepper;
