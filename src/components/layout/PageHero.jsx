import React from 'react';

const PageHero = ({
  badge,
  title,
  subtitle,
  children,
}) => {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-slate-50 dark:bg-zinc-950">
      {/* Decorative gradient backgrounds */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-100/50 rounded-full blur-3xl -z-10 dark:bg-primary-900/10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl -z-10 dark:bg-indigo-900/10" />

      <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        {badge && (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-semibold bg-primary-50 text-primary-600 rounded-full border border-primary-200/50 mb-6 animate-fade-in dark:bg-primary-950/20 dark:text-primary-400 dark:border-primary-800/30">
            {badge}
          </span>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-tight mb-6 animate-slide-up">
          {title}
        </h1>
        {subtitle && (
          <p className="text-base md:text-lg text-slate-500 max-w-2xl leading-relaxed mb-8 animate-slide-up">
            {subtitle}
          </p>
        )}
        {children && <div className="animate-slide-up w-full flex justify-center">{children}</div>}
      </div>
    </section>
  );
};

export default PageHero;
