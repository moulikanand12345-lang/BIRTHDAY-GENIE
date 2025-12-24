
import React, { useState } from 'react';
import BirthdayForm from './components/BirthdayForm';
import CardDisplay from './components/CardDisplay';
import { BirthdayInfo, CardContent } from './types';
import { generateBirthdayCard } from './services/geminiService';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [birthdayInfo, setBirthdayInfo] = useState<BirthdayInfo | null>(null);
  const [cardContent, setCardContent] = useState<CardContent | null>(null);
  const [showDeployModal, setShowDeployModal] = useState(false);

  const handleGenerate = async (info: BirthdayInfo) => {
    setLoading(true);
    setError(null);
    try {
      const content = await generateBirthdayCard(info);
      setBirthdayInfo(info);
      setCardContent(content);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message || "The magic hit a snag. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setBirthdayInfo(null);
    setCardContent(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#fcfdff] selection:bg-indigo-100 selection:text-indigo-900 transition-colors duration-500">
      {/* Premium Navbar */}
      <nav className="sticky top-0 z-50 glass border-b border-slate-200/50 no-print">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105" onClick={handleReset}>
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
               <span className="text-white text-xl animate-float">🧞</span>
            </div>
            <span className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
              BirthdayGenie<span className="text-indigo-600">.com</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => setShowDeployModal(true)} className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95">
              Deploy Your Domain
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        {!cardContent && !loading && (
          <div className="text-center mb-20 no-print space-y-8 animate-in fade-in slide-in-from-top-4 duration-1000">
            <h1 className="text-6xl md:text-8xl font-black tracking-tight text-slate-900 max-w-4xl mx-auto leading-[0.95] lg:leading-[0.9]">
              AI That Makes Birthdays <span className="text-indigo-600">Unforgettable.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
              Create a bespoke, high-end birthday experience for your loved ones in seconds. 
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
               <button onClick={() => document.getElementById('generator-form')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-slate-800 transition-all shadow-2xl">Start Generating</button>
            </div>
          </div>
        )}

        {loading ? (
            <div className="flex flex-col items-center justify-center py-32 no-print space-y-10">
                <div className="relative">
                    <div className="w-32 h-32 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin shadow-2xl shadow-indigo-100" />
                    <div className="absolute inset-0 flex items-center justify-center text-5xl animate-bounce">🧞</div>
                </div>
                <div className="text-center">
                    <h3 className="text-3xl font-black text-slate-900">Conjuring the Magic...</h3>
                </div>
            </div>
        ) : !cardContent ? (
          <div id="generator-form" className="no-print">
            <BirthdayForm onSubmit={handleGenerate} isLoading={loading} initialData={birthdayInfo || undefined} />
          </div>
        ) : (
          birthdayInfo && (
            <CardDisplay content={cardContent} theme={birthdayInfo.theme} onReset={handleReset} onEdit={() => setCardContent(null)} />
          )
        )}
      </main>

      {/* Deployment Modal */}
      {showDeployModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-lg w-full shadow-2xl space-y-6 relative overflow-hidden">
            <button onClick={() => setShowDeployModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-3xl mb-4">🌐</div>
            <h2 className="text-3xl font-black text-slate-900">Go Live at BirthdayGenie.com</h2>
            <p className="text-slate-600 leading-relaxed">
              To host this app on your own domain, follow these simple steps:
            </p>
            <ol className="space-y-4 text-slate-700">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white text-xs font-bold rounded-full flex items-center justify-center">1</span>
                <span>Get a free account at <strong>Vercel.com</strong> or <strong>Netlify.com</strong>.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white text-xs font-bold rounded-full flex items-center justify-center">2</span>
                <span>Drag and drop your project folder into their dashboard.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white text-xs font-bold rounded-full flex items-center justify-center">3</span>
                <span>In Settings, click <strong>"Add Domain"</strong> and type <strong>BirthdayGenie.com</strong>.</span>
              </li>
            </ol>
            <button onClick={() => setShowDeployModal(false)} className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all">Got it!</button>
          </div>
        </div>
      )}

      <footer className="mt-32 border-t border-slate-100 py-12 text-center no-print">
         <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">© 2024 BirthdayGenie.com • Professional Edition</p>
      </footer>
    </div>
  );
};

export default App;
