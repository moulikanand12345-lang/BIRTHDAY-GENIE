
import React, { useState, useEffect } from 'react';
import { CardTheme, BirthdayInfo } from '../types';

interface Props {
  onSubmit: (info: BirthdayInfo) => void;
  isLoading: boolean;
  initialData?: BirthdayInfo;
}

const THEMES: { name: CardTheme; label: string; color: string; desc: string }[] = [
  { name: 'Classic', label: '🌹 Classic', color: 'bg-rose-500', desc: 'Warm & Timeless' },
  { name: 'Elegant', label: '✨ Elegant', color: 'bg-amber-400', desc: 'Classy & Refined' },
  { name: 'Party', label: '🎉 Party', color: 'bg-purple-500', desc: 'Fun & High Energy' },
  { name: 'Futuristic', label: '🚀 Future', color: 'bg-cyan-500', desc: 'Modern & Bold' },
  { name: 'Minimalist', label: '⚪ Minimal', color: 'bg-slate-300', desc: 'Clean & Simple' },
];

const BirthdayForm: React.FC<Props> = ({ onSubmit, isLoading, initialData }) => {
  const [formData, setFormData] = useState<BirthdayInfo>({
    name: '',
    age: 25,
    theme: 'Classic',
    hobbies: '',
    relationship: ''
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  return (
    <form 
      onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} 
      className="space-y-8 max-w-2xl mx-auto p-10 bg-white rounded-[2rem] shadow-2xl border border-slate-100"
    >
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Personalize Your Wish</h2>
        <p className="text-slate-500">The Genie will craft a perfect message based on these details.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Recipient's Name</label>
          <input
            required
            className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all text-lg"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Alexander"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Age</label>
          <input
            required
            type="number"
            className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all text-lg text-center"
            value={formData.age}
            onChange={e => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Your Relationship</label>
          <select 
            className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
            value={formData.relationship}
            onChange={e => setFormData({ ...formData, relationship: e.target.value })}
            required
          >
            <option value="">Select...</option>
            <option value="Best Friend">Best Friend</option>
            <option value="Parent">Parent</option>
            <option value="Sibling">Sibling</option>
            <option value="Partner">Partner</option>
            <option value="Colleague">Colleague</option>
            <option value="Mentor">Mentor</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Tone Preference</label>
          <div className="flex gap-2">
            {['Funny', 'Heartfelt', 'Inspiring'].map(tone => (
               <button 
                key={tone}
                type="button"
                className="flex-1 py-2 px-3 border rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors"
               >
                {tone}
               </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Hobbies & Unique Traits</label>
        <textarea
          required
          className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all h-28 resize-none"
          value={formData.hobbies}
          onChange={e => setFormData({ ...formData, hobbies: e.target.value })}
          placeholder="What makes them special? (e.g. Loves jazz piano, expert at chess, always drinks double espresso)"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">Choose Design Style</label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {THEMES.map(t => (
            <button
              key={t.name}
              type="button"
              onClick={() => setFormData({ ...formData, theme: t.name })}
              className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all group ${
                formData.theme === t.name 
                ? 'border-indigo-600 bg-indigo-50 shadow-md ring-4 ring-indigo-50' 
                : 'border-slate-100 bg-slate-50 hover:border-slate-200'
              }`}
            >
              <div className={`w-10 h-10 rounded-full mb-2 ${t.color} group-hover:scale-110 transition-transform shadow-inner`} />
              <span className="text-xs font-black mb-1">{t.name}</span>
              <span className="text-[10px] text-slate-400 text-center leading-tight">{t.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <button
        disabled={isLoading}
        type="submit"
        className="w-full group relative py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all disabled:opacity-50 shadow-xl overflow-hidden"
      >
        <span className="relative z-10 flex items-center justify-center gap-2 text-xl tracking-tight">
          {isLoading ? (
            <>
              <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Summoning the Genie...
            </>
          ) : (
            <>
              Generate My Card
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </>
          )}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
    </form>
  );
};

export default BirthdayForm;
