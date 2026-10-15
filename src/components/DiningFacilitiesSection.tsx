import React from 'react';
import { UtensilsCrossed, Sparkles, Clock } from 'lucide-react';
import { HOTEL_FACILITIES } from '../data/hotelData.ts';

export const DiningFacilitiesSection: React.FC = () => {
  return (
    <section id="facilities" className="py-20 bg-[#090d14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>奢華享受 ‧ 港都風味</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif tracking-tight">
            五星美饌與尊榮休閒設施
          </h2>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            親自體驗豬哥亮董事長精心規劃的招牌海鮮酒樓、跑道星空酒吧與 24 小時電影懷舊放映廳，讓每一趟小港之旅都難以忘懷。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {HOTEL_FACILITIES.map((facility, index) => (
            <div
              key={index}
              className="rounded-2xl border border-stone-800/80 bg-[#0e131d] overflow-hidden hover:border-amber-500/40 transition-all duration-300 flex flex-col group shadow-xl"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-stone-950">
                <img
                  src={facility.image}
                  alt={facility.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e131d] via-transparent to-transparent opacity-70" />
                <div className="absolute top-4 left-4 bg-stone-900/90 text-amber-300 text-xs font-semibold px-3 py-1 rounded-md border border-amber-500/30 backdrop-blur-sm">
                  {facility.tag}
                </div>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white font-serif group-hover:text-amber-400 transition-colors">
                    {facility.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    {facility.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
                  <span className="flex items-center gap-1.5 text-amber-400/90">
                    <Clock className="w-3.5 h-3.5" />
                    <span>營業時間：{facility.hours}</span>
                  </span>
                  <span className="text-stone-500">房客專屬禮遇</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
