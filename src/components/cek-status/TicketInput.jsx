import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import Button from '../ui/Button';

const TicketInput = ({
  initialValue = '',
  isLoading = false,
  onSearch,
}) => {
  const [ticketCode, setTicketCode] = useState(initialValue);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ticketCode.trim()) {
      setError('Kode tiket tidak boleh kosong');
      return;
    }
    setError('');
    onSearch(ticketCode.trim());
  };

  return (
    <div className="w-full max-w-xl mx-auto px-6 mb-12">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label htmlFor="ticket-search" className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center mb-1">
          Masukkan Kode Tiket Anda
        </label>
        
        <div className="relative flex items-center bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/50 rounded-full shadow-md p-1.5 focus-within:ring-4 focus-within:ring-primary-500/20 focus-within:border-primary-500 transition-all duration-300">
          <div className="pl-4 text-slate-400 flex items-center justify-center">
            <Icon icon="solar:ticket-bold" className="w-5 h-5 text-primary-500" />
          </div>
          
          <input
            id="ticket-search"
            type="text"
            placeholder="Contoh: DST1716912345089"
            value={ticketCode}
            onChange={(e) => setTicketCode(e.target.value)}
            className="w-full bg-transparent border-0 px-3 py-2 text-sm focus:outline-none focus:ring-0 text-slate-800 dark:text-slate-100 placeholder-slate-400 font-semibold tracking-wide"
          />

          <Button 
            type="submit" 
            isLoading={isLoading} 
            className="shadow-md px-6 py-2.5 rounded-full"
          >
            Cek Status
          </Button>
        </div>
        
        {error && (
          <span className="text-xs text-rose-500 text-center font-medium mt-1 animate-fade-in">
            {error}
          </span>
        )}
      </form>
      
      {/* Demo helper tags */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-[10px] font-bold text-slate-400">
        <span>Coba Demo Kode:</span>
        <button 
          onClick={() => { setTicketCode('DST-DEMO-PENDING'); onSearch('DST-DEMO-PENDING'); }}
          className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
        >
          Pending
        </button>
        <button 
          onClick={() => { setTicketCode('DST-DEMO-PROSES'); onSearch('DST-DEMO-PROSES'); }}
          className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
        >
          Proses
        </button>
        <button 
          onClick={() => { setTicketCode('DST-DEMO-SELESAI'); onSearch('DST-DEMO-SELESAI'); }}
          className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
        >
          Selesai
        </button>
      </div>
    </div>
  );
};

export default TicketInput;
