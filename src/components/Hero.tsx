import React, { useState } from 'react';
import { Calendar, Users, Ticket, ArrowRight, ShieldCheck, Plane, Sparkles, Star, Music, Disc3 } from 'lucide-react';
import { HOTEL_IMAGES, BOSS_GREETINGS, ROOMS_DATA } from '../data/hotelData.ts';

interface HeroProps {
  onSearch: (params: {
    checkIn: string;
    checkOut: string;
    roomId: string;
    guests: number;
    useMemberDiscount: boolean;
  }) => void;
  onOpenMoviePerk: () => void;
  isMember: boolean;
  bossQuote?: string;
  onPlayMusic?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSearch,
  onOpenMoviePerk,
  isMember,
  bossQuote,
  onPlayMusic,
}) => {
  // Default dates: tomorrow and day after tomorrow
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 2);

  const [checkIn, setCheckIn] = useState(tomorrow.toISOString().split('T')[0]);
  const [checkOut, setCheckOut] = useState(dayAfter.toISOString().split('T')[0]);
  const [selectedRoomId, setSelectedRoomId] = useState('all');
  const [guests, setGuests] = useState(2);
  const [useMemberDiscount, setUseMemberDiscount] = useState(isMember);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      checkIn,
      checkOut,
      roomId: selectedRoomId,
      guests,
      useMemberDiscount,
    });
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#090d14]">
      {/* Background with measured contrast scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={HOTEL_IMAGES.heroExterior}
          alt="豬哥亮小港國際大飯店外觀與夜景"
          className="w-full h-full object-cover object-center filter brightness-[0.45] saturate-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-[#0b0f17]/70 to-[#0b0f17]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Hero content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-12 w-full flex-1 flex flex-col justify-center">
        {/* Top Announcement Bar */}
        <div className="inline-flex items-center gap-2 mb-6 self-start px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-medium backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="font-semibold tracking-wide">高雄小港全新地標盛大開幕</span>
          <span className="text-amber-500/50">|</span>
          <span className="text-stone-300">入住無條件贈送《大尾鱸鰻3》首映電影票</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headlines & Welcome */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] font-serif text-balance">
              萬秀之王親自坐鎮 <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">
                住五星級飯店，免費看大尾鱸鰻3！
              </span>
            </h1>

            <p className="text-base sm:text-lg text-stone-300 font-normal leading-relaxed max-w-2xl">
              台灣娛樂傳奇豬哥亮於高雄小港國際航線旁斥資打造！客房盡覽飛機起降與海港夕陽，每房贈送《大尾鱸鰻3》電影雙人票，會員即享專屬
              88 折優惠與免費機場商務接駁。
            </p>

            {/* Boss Chu Ke-liang speech card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-stone-900/90 to-amber-950/40 border border-amber-500/30 backdrop-blur-md shadow-2xl flex flex-col sm:flex-row items-center gap-4">
              <div className="relative shrink-0">
                <img
                  src={HOTEL_IMAGES.bossPortrait}
                  alt="飯店董事長 豬哥亮"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover object-top border-2 border-amber-400 shadow-lg shadow-amber-500/20"
                />
                <div className="absolute -bottom-1 -right-1 bg-amber-500 text-stone-950 rounded-full px-2 py-0.5 text-[10px] font-black uppercase">
                  董事長
                </div>
              </div>
              <div className="space-y-1.5 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-base font-bold text-amber-300">
                    董事長 豬哥亮 歡迎詞
                  </span>
                  <div className="flex text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-stone-200 leading-normal italic">
                  “{bossQuote || "諸位鄉親大家好！我是豬哥亮！來小港住阮這間飯店，不只住好、吃霸、看飛機，我閣送你去看《大尾鱸鰻3》，祝大家健康快樂大賺錢啦！"}”
                </p>
                <div className="text-[11px] text-amber-400/90 font-medium">
                  ★ 萬秀之王親自監工 ‧ 港都最澎湃熱情款待
                </div>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#booking-engine"
                className="px-6 py-3.5 text-sm font-bold text-stone-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 rounded-xl shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>立即探索客房並預訂</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={onOpenMoviePerk}
                className="cursor-pointer px-5 py-3.5 text-sm font-semibold text-amber-300 hover:text-white border border-amber-500/40 hover:border-amber-400 rounded-xl bg-amber-950/20 hover:bg-amber-950/40 transition-all flex items-center gap-2"
              >
                <Ticket className="w-4 h-4 text-amber-400" />
                <span>查看《大尾鱸鰻3》贈票詳情</span>
              </button>
              {onPlayMusic && (
                <button
                  onClick={onPlayMusic}
                  className="cursor-pointer px-4 py-3.5 text-sm font-semibold text-stone-200 hover:text-amber-300 border border-stone-700 hover:border-amber-500/50 rounded-xl bg-stone-900/80 transition-all flex items-center gap-2"
                  title="點擊播放豬哥亮經典秀場背景音樂"
                >
                  <Music className="w-4 h-4 text-amber-400 animate-bounce" />
                  <span>播放秀場音樂</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Special Feature Spotlight */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-amber-500/40 bg-gradient-to-b from-stone-900/95 to-[#131924] p-5 shadow-2xl">
              <div className="relative aspect-video rounded-xl overflow-hidden mb-4 border border-stone-800">
                <img
                  src={HOTEL_IMAGES.moviePromo}
                  alt="大尾鱸鰻3電影票特惠"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded shadow-md tracking-wider">
                  ★ 訂房必送
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 flex justify-between items-end">
                  <div>
                    <div className="text-xs text-amber-400 font-semibold">首映貴賓兌換聯</div>
                    <div className="text-white font-bold text-sm">《大尾鱸鰻3》全台通用電影票</div>
                  </div>
                  <span className="text-xs text-stone-300">每房 2~4 張</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-amber-300">萬秀之王獨家三大保證</span>
                  <span className="text-xs text-stone-400">免抽獎 ‧ 隨房附贈</span>
                </div>
                <div className="grid grid-cols-1 gap-2 text-xs text-stone-300">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-stone-900/80 border border-stone-800/80">
                    <Ticket className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>全台各大威秀/國賓/喜樂時代影城通用，不限平假日</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-stone-900/80 border border-stone-800/80">
                    <Plane className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>高雄小港國際機場 / 高鐵左營站 專屬商務專車免費接送</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-stone-900/80 border border-stone-800/80">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>官網直訂保證最優惠！萬秀會員全館直接 88 折優惠</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Booking Engine Bar */}
      <div id="booking-engine" className="relative z-20 border-t border-amber-900/40 bg-[#0e1420]/95 backdrop-blur-xl py-6 px-4 sm:px-6 lg:px-8 shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            {/* Check-in Date */}
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                入住日期 (Check-in)
              </label>
              <input
                type="date"
                value={checkIn}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-stone-900 border border-stone-700/80 rounded-lg px-3 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                required
              />
            </div>

            {/* Check-out Date */}
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                退房日期 (Check-out)
              </label>
              <input
                type="date"
                value={checkOut}
                min={checkIn}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-stone-900 border border-stone-700/80 rounded-lg px-3 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                required
              />
            </div>

            {/* Room Selection */}
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5">房型偏好</label>
              <select
                value={selectedRoomId}
                onChange={(e) => setSelectedRoomId(e.target.value)}
                className="w-full bg-stone-900 border border-stone-700/80 rounded-lg px-3 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-400"
              >
                <option value="all">全部精選房型</option>
                {ROOMS_DATA.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.name} (送{room.movieTickets}張電影票)
                  </option>
                ))}
              </select>
            </div>

            {/* Guests & Member discount toggle */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-stone-300 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  人數
                </label>
                <label className="flex items-center gap-1.5 text-xs text-amber-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useMemberDiscount}
                    onChange={(e) => setUseMemberDiscount(e.target.checked)}
                    className="accent-amber-400 rounded cursor-pointer"
                  />
                  <span>會員 88 折</span>
                </label>
              </div>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full bg-stone-900 border border-stone-700/80 rounded-lg px-3 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-400"
              >
                <option value={1}>1 位成人</option>
                <option value={2}>2 位貴賓 (最推薦)</option>
                <option value={3}>3 位貴賓</option>
                <option value={4}>4 位家庭同行</option>
              </select>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full cursor-pointer py-2.5 px-4 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:brightness-110 active:scale-[0.98] text-stone-950 font-bold text-sm rounded-lg shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 h-[42px]"
              >
                <span>立即預訂 / 查空房</span>
                <ArrowRight className="w-4 h-4 text-stone-950" />
              </button>
            </div>
          </form>

          {/* Quiet Trust Separators */}
          <div className="mt-4 pt-3 border-t border-stone-800/80 flex flex-wrap items-center justify-between text-xs text-stone-400 gap-y-2">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>小港國際機場 3 分鐘車程</span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span className="text-amber-300/90">每房免費贈送《大尾鱸鰻3》首映電影票</span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span>萬秀會員保證 88 折直抵</span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span>24 小時小港機場免費穿梭接駁</span>
            </div>
            <div className="text-amber-400/90 font-medium">
              ★ 官網預訂享免 10% 服務費特惠
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
