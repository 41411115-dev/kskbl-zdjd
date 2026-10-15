import React from 'react';
import { MapPin, Plane, Navigation, Car, Train, Clock, Phone, Sparkles } from 'lucide-react';
import { XIAOGANG_ATTRACTIONS, HOTEL_INFO } from '../data/hotelData.ts';

export const XiaogangGuideSection: React.FC = () => {
  return (
    <section id="xiaogang" className="py-20 bg-gradient-to-b from-[#090d14] via-[#101520] to-[#090d14] border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
            <MapPin className="w-3.5 h-3.5" />
            <span>高雄小港核心樞紐</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif tracking-tight">
            地理位置與周邊觀光指南
          </h2>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            座落於高雄小港國際機場航線核心大道，陸海空交通極速串聯。住客享有專車直達 SKM Park 草衙道影城觀賞《大尾鱸鰻3》與機場貴賓接駁。
          </p>
        </div>

        {/* 2-Column Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Airport & Transit Highlight */}
          <div className="lg:col-span-6 rounded-2xl bg-stone-900/90 border border-stone-800 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Plane className="w-4 h-4" />
                  機場直達禮遇
                </span>
                <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                  24H 免費穿梭
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white font-serif">
                高雄國際機場 (KHH) 車程僅 3 分鐘
              </h3>

              <p className="text-stone-300 text-sm leading-relaxed">
                無論是國內線商務、澎湖金門離島旅遊，或是國際線出境返台，本飯店提供專屬賓士褓母車點對點往返接送服務，讓您無需拖著行李風吹雨淋。
              </p>

              {/* Transit Details */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-stone-950/70 border border-stone-800">
                  <Car className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5">
                    <div className="font-bold text-white">自駕或專車前來</div>
                    <div className="text-stone-400">
                      國道1號末端下高雄端交流道，沿中山四路直行 3 分鐘即可抵達，全館地下平面停車場免費停放。
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-stone-950/70 border border-stone-800">
                  <Train className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5">
                    <div className="font-bold text-white">高雄捷運紅線 (R3 小港站)</div>
                    <div className="text-stone-400">
                      搭乘捷運至小港站 2 號出口，步行 5 分鐘或隨時撥打飯店電話搭乘免費巡迴接駁專車。
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Address & Hotline */}
            <div className="pt-4 border-t border-stone-800 text-xs text-stone-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-stone-400">飯店地址：</span>
                <span className="font-medium text-white">{HOTEL_INFO.address}</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <Phone className="w-3.5 h-3.5" />
                <span>接駁專線：{HOTEL_INFO.phone}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Key Xiaogang Attractions */}
          <div className="lg:col-span-6 rounded-2xl bg-stone-900/90 border border-stone-800 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Navigation className="w-4 h-4" />
                周邊精選景點
              </span>
              <h3 className="text-2xl font-bold text-white font-serif">
                看電影、喝咖啡、賞港灣大景
              </h3>

              <div className="space-y-3">
                {XIAOGANG_ATTRACTIONS.map((spot, index) => (
                  <div
                    key={index}
                    className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80 hover:border-amber-500/30 transition-colors space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">{spot.name}</h4>
                      <span className="text-xs font-mono text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/20">
                        {spot.distance}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 leading-normal">{spot.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-stone-300 flex items-center justify-between">
              <span>★ 飯店每日提供至 SKM Park 草衙道威秀影城定時接駁專車</span>
              <span className="text-amber-400 font-semibold">免費搭乘</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
