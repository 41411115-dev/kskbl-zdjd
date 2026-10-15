import React from 'react';
import { Ticket, Film, Popcorn, Sparkles, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { HOTEL_IMAGES, MOVIE_PERK_DETAILS } from '../data/hotelData.ts';

interface MoviePromoSectionProps {
  onBookNow: () => void;
  onPreviewTicket: () => void;
}

export const MoviePromoSection: React.FC<MoviePromoSectionProps> = ({
  onBookNow,
  onPreviewTicket,
}) => {
  return (
    <section id="movie-perk" className="py-20 bg-gradient-to-b from-[#0b0f17] via-[#101622] to-[#0b0f17] border-y border-amber-950/60 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-wider">
            <Film className="w-3.5 h-3.5" />
            <span>萬秀董事長 豬哥亮 獨家獻禮</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-serif tracking-tight">
            來小港住飯店，免費送你看
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-300">
              《大尾鱸鰻3》
            </span>
          </h2>

          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            為感謝全台鄉親熱情支持，凡於本官網預訂任一房型入住，每房直接免費贈送《大尾鱸鰻3》首映電影票，無使用門檻、全台威秀國賓特約影城不限平假日皆可兌換觀影！
          </p>
        </div>

        {/* Feature Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Visual Movie Poster & Gold Ticket */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-2xl bg-stone-900 group">
              <img
                src={HOTEL_IMAGES.moviePromo}
                alt="大尾鱸鰻3 電影票贈送"
                className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

              {/* Ticket overlay badge */}
              <div className="absolute bottom-5 inset-x-5 p-4 rounded-xl bg-stone-950/90 border border-amber-400/40 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400 shrink-0">
                      <Ticket className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs text-amber-400 font-semibold tracking-wide">
                        ★ 住宿專屬特等禮遇
                      </div>
                      <div className="text-white font-bold text-base">
                        《大尾鱸鰻3》首映電影雙人聯名交換券
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={onPreviewTicket}
                    className="cursor-pointer px-3.5 py-1.5 text-xs font-semibold text-amber-300 border border-amber-500/50 hover:bg-amber-400 hover:text-black rounded-lg transition-colors whitespace-nowrap"
                  >
                    預覽票券
                  </button>
                </div>
              </div>
            </div>

            {/* Quiet metadata line */}
            <div className="flex flex-wrap items-center justify-between text-xs text-stone-400 px-2">
              <span>雙人房型贈 2 張</span>
              <span aria-hidden="true">·</span>
              <span>四人房與總統套房贈 4 張</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-300 font-medium">總價值 NT$700 ~ NT$1,400</span>
            </div>
          </div>

          {/* Right Column: Perks Breakdown & Cinema Info */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-amber-300 font-serif">
                豪華四重觀影專屬禮遇
              </h3>
              <p className="text-sm text-stone-300 leading-relaxed">
                豬哥亮董事長交代：「來看我的電影，一定要坐最好的位子、吃最甜的爆米花！」入住旅客享有一條龍 VIP 觀影禮遇：
              </p>
            </div>

            <div className="space-y-3">
              {MOVIE_PERK_DETAILS.includedPerks.map((perk, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-900/60 border border-stone-800/80 hover:border-amber-500/30 transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-stone-200">{perk}</span>
                </div>
              ))}
            </div>

            {/* Participating Cinemas in Kaohsiung & Taiwan */}
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>高雄推薦特約合作影城（飯店專車直達接駁）</span>
              </div>
              <div className="text-xs text-stone-300 leading-relaxed space-y-1">
                <p>• <strong>SKM Park Outlets 草衙道威秀影城</strong>（小港出發捷運 1 站 / 車程 8 分鐘）</p>
                <p>• <strong>高雄大遠百威秀影城</strong>（三多商圈直達）</p>
                <p>• <strong>全台各大特約影城通用</strong>（亦可在退房後攜回全台其他威秀/國賓使用）</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onBookNow}
                className="cursor-pointer px-6 py-3.5 text-sm font-bold text-stone-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 rounded-xl shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>立即預訂客房並領取電影票</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onPreviewTicket}
                className="cursor-pointer px-4 py-3.5 text-sm font-semibold text-stone-300 hover:text-white border border-stone-700 hover:border-amber-400/50 rounded-xl bg-stone-900/60 transition-colors flex items-center gap-2"
              >
                <Ticket className="w-4 h-4 text-amber-400" />
                <span>預覽電子電影票樣張</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
