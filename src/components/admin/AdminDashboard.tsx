import React from 'react';
import {
  DollarSign,
  CalendarCheck,
  Ticket,
  Users,
  CheckCircle2,
  Clock,
  Plus,
  FileSpreadsheet,
  TrendingUp,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { Booking, Member, Room } from '../../types.ts';
import { HOTEL_IMAGES } from '../../data/hotelData.ts';

interface AdminDashboardProps {
  bookings: Booking[];
  members: Member[];
  rooms: Room[];
  onOpenNewBookingModal: () => void;
  onNavigateTab: (tab: string) => void;
  onQuickVerifyTicket: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  bookings,
  members,
  rooms,
  onOpenNewBookingModal,
  onNavigateTab,
  onQuickVerifyTicket,
}) => {
  // Stats
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.pricing?.totalAmount || 0), 0);
  const totalMovieTicketsIssued = bookings.reduce(
    (sum, b) => sum + (b.movieTicketsCount || 0),
    0
  );
  const activeBookingsCount = bookings.filter((b) => b.status !== 'cancelled').length;
  const checkedInCount = bookings.filter((b) => b.status === 'checked_in').length;
  const confirmedCount = bookings.filter((b) => b.status === 'confirmed').length;

  // Export CSV
  const handleExportCSV = () => {
    const headers = '訂單編號,住客姓名,手機,房型,入住日期,退房日期,晚數,電影票張數,實付金額,狀態\n';
    const rows = bookings
      .map(
        (b) =>
          `"${b.bookingCode}","${b.primaryGuest.name}","${b.primaryGuest.phone}","${b.roomName}","${b.checkInDate}","${b.checkOutDate}",${b.nights},${b.movieTicketsCount},${b.pricing.totalAmount},"${b.status}"`
      )
      .join('\n');
    const blob = new Blob(['\uFEFF' + headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `小港大飯店_訂房報表_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Boss Daily Hospitality Directive */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/70 via-stone-900 to-stone-900 border border-amber-500/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <img
            src={HOTEL_IMAGES.bossPortrait}
            alt="董事長 豬哥亮"
            className="w-16 h-16 rounded-full object-cover border-2 border-amber-400 shadow-md shrink-0"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                董事長 豬哥亮 今日營運指示
              </span>
              <span className="text-[10px] bg-red-600 text-white font-bold px-2 py-0.5 rounded">
                重要督導
              </span>
            </div>
            <p className="text-sm text-stone-200 font-serif leading-snug">
              「大家辛苦了！小港這間飯店是我們高雄的光榮，服務一定要熱情，冷氣要涼、海產粥要澎湃！最要緊是客人入住辦完 Check-in，
              <strong className="text-amber-300">《大尾鱸鰻3》電影票一定要當面雙手奉上</strong>，讓全台鄉親笑嗨嗨！」
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenNewBookingModal}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-400 hover:brightness-110 text-stone-950 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4 text-stone-950" />
            <span>新增臨櫃/電話訂房</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xl border border-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>匯出訂單 CSV</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Revenue */}
        <div className="p-5 rounded-2xl bg-[#0e131d] border border-stone-800/80 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>累計訂房營業額</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono tabular-nums">
            NT$ {totalRevenue.toLocaleString()}
          </div>
          <div className="text-[11px] text-stone-400 flex items-center gap-1">
            <span className="text-emerald-400 font-medium">即時線上收款統計</span>
            <span>· 含餐飲與加值禮遇</span>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="p-5 rounded-2xl bg-[#0e131d] border border-stone-800/80 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>累計有效訂單</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono tabular-nums">
            {activeBookingsCount} <span className="text-sm font-sans font-normal text-stone-400">筆</span>
          </div>
          <div className="text-[11px] text-stone-400 flex items-center gap-1.5">
            <span className="text-amber-300 font-semibold">{confirmedCount} 筆待入住</span>
            <span>/</span>
            <span className="text-emerald-400 font-semibold">{checkedInCount} 筆入住中</span>
          </div>
        </div>

        {/* Movie Tickets Issued */}
        <div className="p-5 rounded-2xl bg-[#0e131d] border border-stone-800/80 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>《大尾鱸鰻3》已贈票數</span>
            <div className="p-2 rounded-lg bg-red-500/10 text-red-400">
              <Ticket className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-red-400 font-mono tabular-nums">
            {totalMovieTicketsIssued} <span className="text-sm font-sans font-normal text-stone-400">張</span>
          </div>
          <div className="text-[11px] text-stone-400 flex items-center justify-between">
            <span>市價總值 NT$ {(totalMovieTicketsIssued * 350).toLocaleString()}</span>
            <button
              onClick={() => onNavigateTab('movie-tickets')}
              className="text-amber-400 hover:underline cursor-pointer"
            >
              核銷管理 →
            </button>
          </div>
        </div>

        {/* Total VIP Members */}
        <div className="p-5 rounded-2xl bg-[#0e131d] border border-stone-800/80 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>萬秀俱樂部會員</span>
            <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono tabular-nums">
            {members.length} <span className="text-sm font-sans font-normal text-stone-400">位</span>
          </div>
          <div className="text-[11px] text-stone-400 flex items-center justify-between">
            <span className="text-sky-300 font-medium">享 88 折直折特惠</span>
            <button
              onClick={() => onNavigateTab('members')}
              className="text-amber-400 hover:underline cursor-pointer"
            >
              名冊管理 →
            </button>
          </div>
        </div>
      </div>

      {/* Operational Highlights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recent Reservations */}
        <div className="lg:col-span-8 rounded-2xl bg-[#0e131d] border border-stone-800/80 p-5 sm:p-6 space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white font-serif">最新訂房動態</h3>
              <p className="text-xs text-stone-400">即時同步前台官網與臨櫃預約旅客清單</p>
            </div>
            <button
              onClick={() => onNavigateTab('bookings')}
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 cursor-pointer"
            >
              查看全部訂單 ({bookings.length}) →
            </button>
          </div>

          <div className="space-y-3">
            {bookings.slice(0, 5).map((booking) => (
              <div
                key={booking.id}
                className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800 hover:border-amber-500/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-400">
                      {booking.bookingCode}
                    </span>
                    <span className="text-stone-300 font-semibold">
                      {booking.primaryGuest.name}
                    </span>
                    <span className="text-stone-400 font-mono">
                      ({booking.primaryGuest.phone})
                    </span>
                    {booking.isMember && (
                      <span className="text-[10px] bg-amber-950 text-amber-300 border border-amber-500/40 px-1.5 py-0.2 rounded font-semibold">
                        VIP 88折
                      </span>
                    )}
                  </div>
                  <div className="text-stone-400 flex items-center gap-2">
                    <span>{booking.roomName}</span>
                    <span aria-hidden="true">·</span>
                    <span>
                      {booking.checkInDate} ~ {booking.checkOutDate} ({booking.nights} 晚)
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                  <div className="flex items-center gap-1.5 text-red-400 font-bold bg-red-950/40 px-2 py-1 rounded border border-red-500/20">
                    <Ticket className="w-3.5 h-3.5" />
                    <span>送 {booking.movieTicketsCount} 張電影票</span>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold text-white text-sm">
                      NT$ {booking.pricing.totalAmount.toLocaleString()}
                    </div>
                    <span
                      className={`text-[10px] font-semibold ${
                        booking.status === 'confirmed'
                          ? 'text-amber-400'
                          : booking.status === 'checked_in'
                          ? 'text-emerald-400'
                          : 'text-stone-400'
                      }`}
                    >
                      {booking.status === 'confirmed'
                        ? '待入住'
                        : booking.status === 'checked_in'
                        ? '入住中'
                        : booking.status === 'completed'
                        ? '已結案'
                        : '已取消'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Quick Verification & Room Status */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Ticket Voucher Redemption */}
          <div className="rounded-2xl bg-gradient-to-b from-stone-900 to-[#121722] border border-amber-500/30 p-5 space-y-4 shadow-lg">
            <div className="flex items-center gap-2 text-amber-400">
              <Ticket className="w-5 h-5" />
              <h3 className="font-bold text-sm text-white font-serif">
                《大尾鱸鰻3》櫃檯核銷快速掃碼
              </h3>
            </div>
            <p className="text-xs text-stone-300 leading-normal">
              房客抵達櫃檯辦理入住手續時，請輸入訂單確認編號或掃描電子憑證 QR Code 進行現場發票登記。
            </p>
            <button
              onClick={onQuickVerifyTicket}
              className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Ticket className="w-4 h-4" />
              <span>開啟票券核銷中心</span>
            </button>
          </div>

          {/* Room Inventory Snapshot */}
          <div className="rounded-2xl bg-[#0e131d] border border-stone-800/80 p-5 space-y-3 shadow-lg">
            <div className="flex items-center justify-between text-xs">
              <h3 className="font-bold text-white font-serif">房型即時現況</h3>
              <button
                onClick={() => onNavigateTab('rooms')}
                className="text-amber-400 hover:underline cursor-pointer"
              >
                定價庫存 →
              </button>
            </div>
            <div className="space-y-2 text-xs">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-stone-900/60 border border-stone-800"
                >
                  <span className="text-stone-200 truncate max-w-[140px]">{room.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-mono">
                      NT$ {room.regularPrice.toLocaleString()}
                    </span>
                    <span className="text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded text-[10px]">
                      供應中
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
