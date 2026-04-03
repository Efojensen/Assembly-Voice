import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

const Home = () => {
  const languages = ['English', 'Twi', 'Ga', 'Hausa', 'Pidgin'];

  return (
    <div className="p-5 space-y-6">
      {/* Language Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {languages.map((lang, i) => (
          <span 
            key={lang} 
            className={`text-[11px] px-3 py-1 rounded-full border border-border whitespace-nowrap cursor-pointer ${i === 0 ? 'bg-primary-pale border-primary text-primary font-medium' : 'bg-white text-text-muted'}`}
          >
            {lang}
          </span>
        ))}
      </div>

      {/* Stats Bar */}
      <div className="bg-primary-pale rounded-xl p-4 flex items-center justify-between border border-primary/10">
        <div>
          <div className="text-lg font-bold text-primary">1,204</div>
          <div className="text-[11px] text-primary-light font-medium">issues resolved this month</div>
        </div>
        <div className="text-primary/40">
          <CheckCircle size={28} />
        </div>
      </div>

      {/* Hero Section */}
      <div className="space-y-3">
        <h1 className="text-2xl font-bold text-text leading-tight">
          Report a community problem in 2 minutes.
        </h1>
        <p className="text-sm text-text-muted leading-relaxed">
          No app download. No registration. Broken roads, blocked drains, broken streetlights — report and track them all.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Link 
          to="/report" 
          className="block w-full bg-secondary text-white rounded-xl py-4 text-center font-semibold hover:bg-secondary/90 transition-colors"
        >
          Report a problem
        </Link>
        <Link 
          to="/tracking" 
          className="block w-full bg-transparent text-secondary border-2 border-secondary rounded-xl py-3 text-center font-semibold hover:bg-secondary/5 transition-colors"
        >
          Track my report
        </Link>
      </div>

      {/* How it works */}
      <div className="space-y-4">
        <h2 className="text-[11px] font-bold text-primary uppercase tracking-widest">How it works</h2>
        <div className="flex justify-between relative">
          {/* Connector Line */}
          <div className="absolute top-4 left-0 w-full h-[1.5px] bg-border -z-0" />
          
          {[
            { step: 1, label: 'Report the problem', color: 'primary' },
            { step: 2, label: 'Get a tracking code', color: 'secondary' },
            { step: 3, label: 'Assembly resolves it', color: 'primary' }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2 text-center relative z-10 bg-bg px-1">
              <div className={cn(
                "w-8 h-8 rounded-full border-2 bg-bg flex items-center justify-center font-bold text-sm",
                item.color === 'primary' ? "border-primary text-primary" : "border-secondary text-secondary"
              )}>
                {item.step}
              </div>
              <span className="text-[10px] text-text-muted leading-tight max-w-[80px]">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* District Performance Link */}
      <Link 
        to="/transparency" 
        className="flex items-center justify-center gap-2 w-full bg-transparent text-primary border-2 border-primary rounded-xl py-3 text-sm font-semibold hover:bg-primary/5 transition-colors"
      >
        See your district's performance <ArrowRight size={16} />
      </Link>
    </div>
  );
};

export default Home;
