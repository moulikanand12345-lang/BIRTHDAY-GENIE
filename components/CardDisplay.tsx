
import React, { useEffect, useState } from 'react';
import { CardContent, CardTheme } from '../types';

interface Props {
  content: CardContent;
  theme: CardTheme;
  onReset: () => void;
  onEdit: () => void;
}

const CardDisplay: React.FC<Props> = ({ content, theme, onReset, onEdit }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (theme === 'Party' && (window as any).confetti) {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        const particleCount = 50 * (timeLeft / duration);
        (window as any).confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        (window as any).confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);
    }
  }, [theme]);

  const handleCopyLink = () => {
    const mockLink = `https://birthdaygenie.com/card/${Math.random().toString(36).substr(2, 9)}`;
    navigator.clipboard.writeText(mockLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getThemeStyles = () => {
    switch (theme) {
      case 'Futuristic':
        return {
          container: 'bg-black text-cyan-400 border-cyan-500/50 font-modern shadow-[0_0_80px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/20',
          title: 'text-cyan-300 uppercase tracking-[0.3em] mb-8 font-black text-xl flex items-center justify-center gap-4',
          wish: 'text-3xl font-black italic bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-8',
          poem: 'text-cyan-100/80 leading-relaxed italic backdrop-blur-md bg-cyan-950/20 p-6 rounded-2xl border border-cyan-500/10 mb-8',
          message: 'text-sm font-bold tracking-widest opacity-60 uppercase'
        };
      case 'Elegant':
        return {
          container: 'bg-[#fff] text-[#1a1a1a] border-[#e2e8f0] font-serif shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)]',
          title: 'text-4xl font-serif italic text-[#c5a059] mb-10',
          wish: 'text-2xl font-medium tracking-tight border-y border-slate-100 py-6 mb-10 text-slate-700',
          poem: 'text-xl leading-[1.8] font-light italic mb-10 text-slate-500 px-8',
          message: 'text-lg font-serif italic text-slate-400 uppercase tracking-widest text-xs font-bold'
        };
      case 'Party':
        return {
          container: 'bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 text-white border-white/20 shadow-[0_20px_50px_rgba(79,70,229,0.3)]',
          title: 'text-5xl font-black mb-8 drop-shadow-lg scale-110',
          wish: 'text-3xl font-black mb-10 bg-white/10 p-6 rounded-[2rem] border border-white/20 backdrop-blur-md shadow-inner rotate-1',
          poem: 'text-2xl font-bold leading-tight mb-8 drop-shadow-sm px-4',
          message: 'text-xl font-black opacity-100'
        };
      case 'Minimalist':
        return {
          container: 'bg-white text-slate-900 border-slate-100 shadow-xl font-sans max-w-lg',
          title: 'text-xs font-black tracking-[0.5em] uppercase text-slate-300 mb-12',
          wish: 'text-4xl font-black tracking-tighter mb-12 leading-none',
          poem: 'text-xl text-slate-500 font-medium leading-relaxed mb-12 border-l-4 border-slate-900 pl-8 text-left',
          message: 'text-sm font-bold text-slate-400'
        };
      default: // Classic
        return {
          container: 'bg-[#fff5f5] text-rose-950 border-rose-100 font-serif shadow-2xl border-[12px] border-double',
          title: 'text-4xl font-bold text-rose-600 font-handwriting mb-10',
          wish: 'text-3xl font-serif italic mb-10 border-b-2 border-rose-100 pb-8 text-rose-800',
          poem: 'text-2xl leading-relaxed italic text-rose-700/80 font-handwriting mb-10 px-6',
          message: 'text-xl font-handwriting font-bold text-rose-500'
        };
    }
  };

  const styles = getThemeStyles();

  return (
    <div className="flex flex-col items-center py-8 animate-in fade-in zoom-in duration-1000">
      <div id="printable-card" className={`w-full max-w-2xl p-16 rounded-[3rem] border-2 text-center relative overflow-hidden transition-all transform hover:-translate-y-2 hover:shadow-3xl ${styles.container}`}>
        <h1 className={styles.title}>
          {theme === 'Futuristic' && <span className="w-12 h-[1px] bg-cyan-500/50" />}
          {content.title}
          {theme === 'Futuristic' && <span className="w-12 h-[1px] bg-cyan-500/50" />}
        </h1>
        <div className={styles.wish}>{content.wish}</div>
        <div className={styles.poem}>
          {content.poem.split('\n').map((line, i) => (
            <p key={i} className="mb-2">{line}</p>
          ))}
        </div>
        <div className={styles.message}>{content.message}</div>
        
        {/* Subtle Branding inside the card */}
        <div className="mt-12 pt-8 border-t border-black/5 flex justify-center items-center gap-2 opacity-30 grayscale hover:grayscale-0 transition-all cursor-default select-none no-print">
            <span className="text-[10px] font-black tracking-widest uppercase">Created at BirthdayGenie.com</span>
        </div>
      </div>
      
      <div className="mt-16 flex flex-wrap justify-center gap-6 no-print">
        <button
          onClick={handleCopyLink}
          className={`group flex items-center gap-3 px-8 py-4 rounded-2xl font-black transition-all shadow-xl active:scale-95 ${
            copied ? 'bg-green-500 text-white' : 'bg-slate-900 text-white hover:bg-slate-800'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
          {copied ? 'Link Copied!' : 'Copy Magic Link'}
        </button>
        
        <button
          onClick={() => window.print()}
          className="flex items-center gap-3 px-8 py-4 bg-white border-2 border-slate-100 text-slate-700 rounded-2xl font-black hover:bg-slate-50 transition-all shadow-lg active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
          Print Physical Card
        </button>

        <button
          onClick={onEdit}
          className="px-8 py-4 text-slate-400 hover:text-indigo-600 font-bold transition-colors"
        >
          Edit Details
        </button>
        <button
          onClick={onReset}
          className="px-8 py-4 text-slate-400 hover:text-rose-500 font-bold transition-colors"
        >
          Start New
        </button>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; padding: 0 !important; }
          #printable-card { 
            border: 1px solid #eee !important; 
            box-shadow: none !important;
            max-width: 100% !important;
            margin: 0 !important;
            transform: none !important;
            border-radius: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CardDisplay;
