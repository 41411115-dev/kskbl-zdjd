import React, { useState } from 'react';
import { User, Ticket, Calendar, Menu, X, Sparkles, ShieldCheck } from 'lucide-react';
import { Member } from '../types.ts';

interface NavbarProps {
  member: Member | null;
  onOpenLogin: () => void;
  onOpenBooking: () => void;
  onOpenMyBookings: () => void;
  onOpenAdmin: () => void;
  bookingCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  member,
  onOpenLogin,
  onOpenBooking,
  onOpenMyBookings,
  onOpenAdmin,
  bookingCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-900/30 bg-[#0c1017]/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-xl sm:text-2xl font-black tracking-wider text-amber-400 hover:text-amber-300 transition-colors uppercase font-serif"
        >
          豬哥亮小港國際大飯店
        </a>

        {/* Zone 2: 4-6 text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-300">
          <button
            onClick={() => scrollTo('hero')}
            className="cursor-pointer hover:text-amber-400 transition-colors whitespace-nowrap"
          >
            飯店首頁
          </button>
          <button
            onClick={() => scrollTo('movie-perk')}
            className="cursor-pointer hover:text-amber-400 transition-colors whitespace-nowrap flex items-center gap-1.5 text-amber-300"
          >
            <Ticket className="w-3.5 h-3.5 text-amber-400" />
            贈大尾鱸鰻3電影票
          </button>
          <button
            onClick={() => scrollTo('rooms')}
            className="cursor-pointer hover:text-amber-400 transition-colors whitespace-nowrap"
          >
            客房與套房
          </button>
          <button
            onClick={() => scrollTo('membership')}
            className="cursor-pointer hover:text-amber-400 transition-colors whitespace-nowrap"
          >
            萬秀會員禮遇
          </button>
          <button
            onClick={() => scrollTo('facilities')}
            className="cursor-pointer hover:text-amber-400 transition-colors whitespace-nowrap"
          >
            特色設施與美饌
          </button>
          <button
            onClick={() => scrollTo('xiaogang')}
            className="cursor-pointer hover:text-amber-400 transition-colors whitespace-nowrap"
          >
            小港機場與周邊
          </button>
        </nav>

        {/* Zone 3: Primary action & Member status */}
        <div className="flex items-center gap-3">
          {/* Admin Portal Button */}
          <button
            onClick={onOpenAdmin}
            className="cursor-pointer hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-amber-300 border border-amber-500/40 rounded-lg hover:bg-amber-500/10 transition-all bg-[#121722]/80"
            title="進入飯店後台管理系統"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span className="whitespace-nowrap">後台管理</span>
          </button>

          {/* My Tickets / Bookings button */}
          <button
            onClick={onOpenMyBookings}
            className="relative cursor-pointer hidden sm:flex items-center gap-2 px-3 py-2 text-xs font-medium text-stone-200 border border-stone-700/80 rounded-lg hover:border-amber-500/50 hover:text-white transition-all bg-stone-900/60"
            title="查看已訂客房與電影票兌換券"
          >
            <Ticket className="w-3.5 h-3.5 text-amber-400" />
            <span className="whitespace-nowrap">我的票匣與訂房</span>
            {bookingCount > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-black">
                {bookingCount}
              </span>
            )}
          </button>

          {/* Member Login / Status button */}
          <button
            onClick={onOpenLogin}
            className={`cursor-pointer flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-all border whitespace-nowrap ${
              member
                ? 'bg-amber-950/40 text-amber-300 border-amber-500/50'
                : 'text-stone-300 border-stone-800 hover:text-white hover:border-stone-700 bg-stone-900/40'
            }`}
          >
            <User className="w-3.5 h-3.5 text-amber-400" />
            {member ? (
              <span className="truncate max-w-[100px]">{member.name} (VIP)</span>
            ) : (
              <span>會員登入 / 88折</span>
            )}
          </button>

          {/* Primary Book Now CTA */}
          <button
            onClick={onOpenBooking}
            className="cursor-pointer flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-bold text-stone-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 rounded-lg shadow-lg shadow-amber-500/10 hover:brightness-110 active:scale-95 transition-all whitespace-nowrap"
          >
            <Calendar className="w-4 h-4 text-stone-950" />
            <span>立即線上預訂</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-400 hover:text-white cursor-pointer"
            aria-label="開啟選單"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-amber-950 bg-[#0d121c] px-4 py-5 shadow-2xl">
          <div className="flex flex-col gap-3">
            <button
              onClick={() => scrollTo('hero')}
              className="text-left py-2 text-sm text-stone-200 hover:text-amber-400"
            >
              飯店首頁
            </button>
            <button
              onClick={() => scrollTo('movie-perk')}
              className="text-left py-2 text-sm text-amber-300 hover:text-amber-400 flex items-center gap-2"
            >
              <Ticket className="w-4 h-4 text-amber-400" />
              贈《大尾鱸鰻3》電影票專案
            </button>
            <button
              onClick={() => scrollTo('rooms')}
              className="text-left py-2 text-sm text-stone-200 hover:text-amber-400"
            >
              精選客房與套房
            </button>
            <button
              onClick={() => scrollTo('membership')}
              className="text-left py-2 text-sm text-stone-200 hover:text-amber-400"
            >
              萬秀VIP會員禮遇 (88折)
            </button>
            <button
              onClick={() => scrollTo('facilities')}
              className="text-left py-2 text-sm text-stone-200 hover:text-amber-400"
            >
              特色設施與美饌
            </button>
            <button
              onClick={() => scrollTo('xiaogang')}
              className="text-left py-2 text-sm text-stone-200 hover:text-amber-400"
            >
              小港機場與觀光導覽
            </button>
            <div className="pt-3 border-t border-stone-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-amber-300 bg-[#121722] border border-amber-500/40 rounded-lg cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                進入飯店萬秀後台管理系統
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMyBookings();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-stone-200 bg-stone-900 border border-stone-700 rounded-lg"
              >
                <Ticket className="w-4 h-4 text-amber-400" />
                我的票匣與訂房紀錄 ({bookingCount})
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-stone-950 bg-amber-400 rounded-lg"
              >
                <Calendar className="w-4 h-4" />
                立即線上預訂客房
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
