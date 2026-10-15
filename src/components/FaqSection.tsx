import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, MessageCircle } from 'lucide-react';
import { HOTEL_FAQS, BOSS_GREETINGS } from '../data/hotelData.ts';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-[#090d14] border-t border-stone-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>貼心問答 ‧ 明白透明</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif tracking-tight">
            董事長有交待：常見問題解惑
          </h2>
          <p className="text-stone-400 text-sm">
            任何關於《大尾鱸鰻3》免費電影票、萬秀會員 88 折與機場接駁的疑問，一次替您說清楚！
          </p>
        </div>

        <div className="space-y-4">
          {HOTEL_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl border border-stone-800 bg-[#0e131d] overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-900/60 transition-colors"
                >
                  <span className="text-base font-bold text-white flex items-center gap-3">
                    <span className="text-amber-400 font-mono text-sm">Q{index + 1}.</span>
                    <span>{faq.q}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-amber-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-stone-500 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-stone-300 leading-relaxed border-t border-stone-800/60 bg-stone-900/30">
                    <div className="flex items-start gap-2.5">
                      <MessageCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>{faq.a}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
