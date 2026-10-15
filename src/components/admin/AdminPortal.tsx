import React, { useState } from 'react';
import {
  LayoutDashboard,
  CalendarCheck,
  Ticket,
  Users,
  Bed,
  Megaphone,
  ArrowLeft,
  ShieldCheck,
  Building,
  Sparkles,
} from 'lucide-react';
import { Booking, Member, Room } from '../../types.ts';
import { AdminDashboard } from './AdminDashboard.tsx';
import { AdminBookings } from './AdminBookings.tsx';
import { AdminMovieTickets } from './AdminMovieTickets.tsx';
import { AdminMembers } from './AdminMembers.tsx';
import { AdminRooms } from './AdminRooms.tsx';
import { AdminAnnouncements } from './AdminAnnouncements.tsx';
import { HOTEL_IMAGES } from '../../data/hotelData.ts';

interface AdminPortalProps {
  onBackToWebsite: () => void;
  bookings: Booking[];
  members: Member[];
  rooms: Room[];
  bossQuote: string;
  onUpdateBookingStatus: (id: string, newStatus: Booking['status']) => void;
  onToggleTicketsClaimed: (id: string) => void;
  onDeleteBooking: (id: string) => void;
  onAddManualBooking: (booking: Booking) => void;
  onAddMember: (member: Member) => void;
  onUpdateMemberPoints: (phone: string, addedPoints: number) => void;
  onUpgradeMemberTier: (phone: string, tier: Member['tier']) => void;
  onUpdateRoom: (room: Room) => void;
  onResetDefaultRooms: () => void;
  onUpdateBossQuote: (newQuote: string) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  onBackToWebsite,
  bookings,
  members,
  rooms,
  bossQuote,
  onUpdateBookingStatus,
  onToggleTicketsClaimed,
  onDeleteBooking,
  onAddManualBooking,
  onAddMember,
  onUpdateMemberPoints,
  onUpgradeMemberTier,
  onUpdateRoom,
  onResetDefaultRooms,
  onUpdateBossQuote,
}) => {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'bookings' | 'movie-tickets' | 'members' | 'rooms' | 'announcements'
  >('dashboard');

  return (
    <div className="min-h-screen bg-[#070b12] text-stone-100 flex flex-col font-sans">
      {/* Admin Top Bar */}
      <header className="sticky top-0 z-40 border-b border-amber-900/40 bg-[#0c1017]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={HOTEL_IMAGES.bossPortrait}
              alt="豬哥亮"
              className="w-10 h-10 rounded-full object-cover border border-amber-400 shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black text-amber-400 font-serif">
                  豬哥亮小港大飯店 ‧ 萬秀後台管理系統
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  管理員權限
                </span>
              </div>
              <div className="text-[11px] text-stone-400">
                高雄小港總部中心 · 即時聯網營運控管
              </div>
            </div>
          </div>

          <button
            onClick={onBackToWebsite}
            className="cursor-pointer px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-400 hover:brightness-110 active:scale-95 text-stone-950 font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <ArrowLeft className="w-4 h-4 text-stone-950" />
            <span>返回前台官網</span>
          </button>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="border-t border-stone-800/80 bg-[#0a0e16]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto py-2 scrollbar-none">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`cursor-pointer px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'dashboard'
                  ? 'bg-amber-400 text-stone-950 font-bold shadow'
                  : 'text-stone-400 hover:text-white hover:bg-stone-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>營運儀表板</span>
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`cursor-pointer px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'bookings'
                  ? 'bg-amber-400 text-stone-950 font-bold shadow'
                  : 'text-stone-400 hover:text-white hover:bg-stone-900'
              }`}
            >
              <CalendarCheck className="w-4 h-4" />
              <span>訂房訂單管理</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-stone-800 text-stone-200">
                {bookings.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('movie-tickets')}
              className={`cursor-pointer px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'movie-tickets'
                  ? 'bg-amber-400 text-stone-950 font-bold shadow'
                  : 'text-red-400 hover:text-red-300 hover:bg-stone-900'
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span>《大尾鱸鰻3》電影票核銷中心</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-red-950 text-red-300 border border-red-500/30">
                HOT
              </span>
            </button>

            <button
              onClick={() => setActiveTab('members')}
              className={`cursor-pointer px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'members'
                  ? 'bg-amber-400 text-stone-950 font-bold shadow'
                  : 'text-stone-400 hover:text-white hover:bg-stone-900'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>萬秀會員名冊</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-stone-800 text-stone-200">
                {members.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('rooms')}
              className={`cursor-pointer px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'rooms'
                  ? 'bg-amber-400 text-stone-950 font-bold shadow'
                  : 'text-stone-400 hover:text-white hover:bg-stone-900'
              }`}
            >
              <Bed className="w-4 h-4" />
              <span>客房定價與庫存</span>
            </button>

            <button
              onClick={() => setActiveTab('announcements')}
              className={`cursor-pointer px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'announcements'
                  ? 'bg-amber-400 text-stone-950 font-bold shadow'
                  : 'text-stone-400 hover:text-white hover:bg-stone-900'
              }`}
            >
              <Megaphone className="w-4 h-4" />
              <span>董事長官網廣播</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content Body */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {activeTab === 'dashboard' && (
          <AdminDashboard
            bookings={bookings}
            members={members}
            rooms={rooms}
            onOpenNewBookingModal={() => setActiveTab('bookings')}
            onNavigateTab={(tab) => setActiveTab(tab as typeof activeTab)}
            onQuickVerifyTicket={() => setActiveTab('movie-tickets')}
          />
        )}

        {activeTab === 'bookings' && (
          <AdminBookings
            bookings={bookings}
            rooms={rooms}
            onUpdateBookingStatus={onUpdateBookingStatus}
            onToggleTicketsClaimed={onToggleTicketsClaimed}
            onDeleteBooking={onDeleteBooking}
            onAddManualBooking={onAddManualBooking}
          />
        )}

        {activeTab === 'movie-tickets' && (
          <AdminMovieTickets
            bookings={bookings}
            onToggleTicketsClaimed={onToggleTicketsClaimed}
          />
        )}

        {activeTab === 'members' && (
          <AdminMembers
            members={members}
            onAddMember={onAddMember}
            onUpdatePoints={onUpdateMemberPoints}
            onUpgradeTier={onUpgradeMemberTier}
          />
        )}

        {activeTab === 'rooms' && (
          <AdminRooms
            rooms={rooms}
            onUpdateRoom={onUpdateRoom}
            onResetDefaultRooms={onResetDefaultRooms}
          />
        )}

        {activeTab === 'announcements' && (
          <AdminAnnouncements
            bossQuote={bossQuote}
            onUpdateBossQuote={onUpdateBossQuote}
          />
        )}
      </main>

      {/* Admin Footer */}
      <footer className="border-t border-stone-800 bg-[#06090f] py-4 text-center text-xs text-stone-500">
        豬哥亮小港國際大飯店 ‧ 萬秀飯店管理控制台 © {new Date().getFullYear()} CHU KE-LIANG GRAND HOTEL
      </footer>
    </div>
  );
};
