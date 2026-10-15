import React from 'react';
import { HOTEL_INFO, HOTEL_IMAGES } from '../data/hotelData.ts';
import { MapPin, Phone, Mail, Award, Ticket, Crown } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenMoviePerk: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenMoviePerk, onOpenAdmin }) => {
  return (
    <footer className="border-t border-stone-800 bg-[#070a10] text-stone-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={HOTEL_IMAGES.bossPortrait}
                alt="豬哥亮"
                className="w-12 h-12 rounded-full object-cover border-2 border-amber-400"
              />
              <div>
                <h3 className="text-lg font-black text-white font-serif tracking-wide">
                  {HOTEL_INFO.name}
                </h3>
                <p className="text-[11px] text-amber-400 font-mono tracking-wider">
                  {HOTEL_INFO.englishName}
                </p>
              </div>
            </div>

            <p className="text-stone-300 leading-relaxed max-w-sm">
              台灣萬秀之王豬哥亮親自創辦坐鎮，位於高雄小港核心，俯瞰飛機起降與港都蔚藍海景。全台唯一入住贈《大尾鱸鰻3》首映電影票之旗艦五星大飯店。
            </p>

            <div className="text-[11px] text-stone-300 space-y-1">
              <div>高雄市旅館業登記證第 8888 號</div>
              <div>統一編號：88888888 ‧ 萬秀育樂投資股份有限公司</div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-serif">快速導覽</h4>
            <ul className="space-y-2 text-stone-300">
              <li>
                <a href="#hero" className="hover:text-amber-400 transition-colors">
                  飯店首頁
                </a>
              </li>
              <li>
                <a href="#rooms" className="hover:text-amber-400 transition-colors">
                  客房與套房介紹
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenMoviePerk}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  《大尾鱸鰻3》贈票專案
                </button>
              </li>
              <li>
                <a href="#facilities" className="hover:text-amber-400 transition-colors">
                  萬秀海鮮酒樓與設施
                </a>
              </li>
              <li>
                <a href="#xiaogang" className="hover:text-amber-400 transition-colors">
                  小港機場與觀光景點
                </a>
              </li>
              {onOpenAdmin && (
                <li>
                  <button
                    onClick={onOpenAdmin}
                    className="hover:text-amber-300 text-amber-400/90 font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    ★ 飯店萬秀後台管理系統
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Member & Perks */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-serif">萬秀尊榮禮遇</h4>
            <ul className="space-y-2 text-stone-300">
              <li>• 會員專屬全館 88 折優惠</li>
              <li>• 入住保證贈大尾鱸鰻3電影票</li>
              <li>• 小港國際機場 24H 免費接駁</li>
              <li>• 尊榮延遲退房至 14:00</li>
              <li>• 萬秀海鮮百匯晨光早餐</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-serif">聯絡與訂房專線</h4>
            <div className="space-y-2 text-stone-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{HOTEL_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-mono text-white font-bold">{HOTEL_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-mono">{HOTEL_INFO.email}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-2 px-3 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
              >
                線上立即預訂客房
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <div>
            © {new Date().getFullYear()} {HOTEL_INFO.name} CHU KE-LIANG GRAND HOTEL. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>隱私權保護政策</span>
            <span>·</span>
            <span>住客服務條款</span>
            <span>·</span>
            <span className="text-amber-400">萬秀之王親自坐鎮 ‧ 品質保證</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
