import React, { useState } from 'react';
import {
  Ticket,
  Search,
  CheckCircle2,
  AlertCircle,
  QrCode,
  Building2,
  Film,
  Sparkles,
  Printer,
  Plus,
} from 'lucide-react';
import { Booking } from '../../types.ts';
import { HOTEL_IMAGES } from '../../data/hotelData.ts';

interface AdminMovieTicketsProps {
  bookings: Booking[];
  onToggleTicketsClaimed: (id: string) => void;
}

export const AdminMovieTickets: React.FC<AdminMovieTicketsProps> = ({
  bookings,
  onToggleTicketsClaimed,
}) => {
  const [searchCode, setSearchCode] = useState('');
  const [lookupResult, setLookupResult] = useState<Booking | null>(null);
  const [lookupMessage, setLookupMessage] = useState<string | null>(null);
  const [totalQuota, setTotalQuota] = useState(1200); // Initial contract allocation from producer

  // Calculate ticket statistics
  const totalIssued = bookings.reduce((sum, b) => sum + (b.movieTicketsCount || 0), 0);
  const totalClaimed = bookings
    .filter((b) => b.movieTicketsClaimed)
    .reduce((sum, b) => sum + (b.movieTicketsCount || 0), 0);
  const pendingClaim = totalIssued - totalClaimed;
  const remainingStock = Math.max(0, totalQuota - totalIssued);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCode.trim()) return;

    const matched = bookings.find(
      (b) =>
        b.bookingCode.toLowerCase() === searchCode.trim().toLowerCase() ||
        b.primaryGuest.phone === searchCode.trim()
    );

    if (matched) {
      setLookupResult(matched);
      setLookupMessage(null);
    } else {
      setLookupResult(null);
      setLookupMessage('查無此訂單編號或手機號碼，請確認房客提供的確認信。');
    }
  };

  const handleClaimTickets = (bookingId: string) => {
    onToggleTicketsClaimed(bookingId);
    if (lookupResult && lookupResult.id === bookingId) {
      setLookupResult({
        ...lookupResult,
        movieTicketsClaimed: !lookupResult.movieTicketsClaimed,
      });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/60 via-stone-900 to-amber-950/40 border border-red-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-red-600/20 border border-red-500/50 flex items-center justify-center text-red-400 shrink-0">
            <Film className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                萬秀天王獨家巨作 ‧ 房客福利
              </span>
              <span className="text-[10px] bg-amber-400 text-stone-950 font-bold px-2 py-0.5 rounded">
                全台獨家
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
              《大尾鱸鰻3》首映電影票發放與核銷調度中心
            </h3>
            <p className="text-xs text-stone-300">
              由豬哥亮董事長親自與電影發行方簽約，入住全房型 100% 保證贈送，現場櫃檯即時核銷出票。
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setTotalQuota(totalQuota + 200)}
            className="px-3.5 py-2.5 bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-semibold rounded-xl border border-amber-500/30 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>追加配額 (+200張)</span>
          </button>
        </div>
      </div>

      {/* Ticket Allocation Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#0e131d] border border-stone-800 space-y-1 shadow">
          <span className="text-xs text-stone-400">片商授權總儲備量</span>
          <div className="text-2xl font-black text-white font-mono">{totalQuota} 張</div>
          <span className="text-[10px] text-stone-500">含全台特約首映席位</span>
        </div>

        <div className="p-4 rounded-xl bg-[#0e131d] border border-stone-800 space-y-1 shadow">
          <span className="text-xs text-stone-400">已隨房型贈出總數</span>
          <div className="text-2xl font-black text-amber-400 font-mono">{totalIssued} 張</div>
          <span className="text-[10px] text-amber-400/80">總市值 NT$ {(totalIssued * 350).toLocaleString()}</span>
        </div>

        <div className="p-4 rounded-xl bg-[#0e131d] border border-stone-800 space-y-1 shadow">
          <span className="text-xs text-stone-400">櫃檯已核銷實體票</span>
          <div className="text-2xl font-black text-emerald-400 font-mono">{totalClaimed} 張</div>
          <span className="text-[10px] text-emerald-400">住客已領取進場觀影</span>
        </div>

        <div className="p-4 rounded-xl bg-[#0e131d] border border-stone-800 space-y-1 shadow">
          <span className="text-xs text-stone-400">保險庫剩餘安全庫存</span>
          <div className="text-2xl font-black text-sky-400 font-mono">{remainingStock} 張</div>
          <span className="text-[10px] text-sky-300">庫存水位極度充裕</span>
        </div>
      </div>

      {/* Real-time Voucher Verification Console */}
      <div className="rounded-2xl border border-amber-500/40 bg-[#0e131d] p-6 space-y-5 shadow-xl">
        <div>
          <h4 className="text-base font-bold text-white font-serif flex items-center gap-2">
            <QrCode className="w-5 h-5 text-amber-400" />
            <span>櫃檯現場：憑券核銷出票快速窗口</span>
          </h4>
          <p className="text-xs text-stone-400">
            請輸入住客提供的訂單編號（如 CKL-2026-VIP888）或住客登記手機號碼快速核對
          </p>
        </div>

        <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="輸入訂單號 (例：CKL-2026-VIP888) 或手機號碼..."
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-xs sm:text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-400 text-stone-950 font-bold text-xs sm:text-sm rounded-xl shadow hover:brightness-110 cursor-pointer whitespace-nowrap"
          >
            查詢並核銷出票
          </button>
        </form>

        {lookupMessage && (
          <div className="p-3 bg-red-950/60 border border-red-500/40 rounded-xl text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{lookupMessage}</span>
          </div>
        )}

        {/* Verification Result Card */}
        {lookupResult && (
          <div className="p-5 rounded-xl bg-stone-900/90 border-2 border-amber-400/80 space-y-4 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-3">
              <div>
                <span className="text-[10px] text-amber-400 font-mono">VERIFIED RESERVATION</span>
                <h5 className="text-lg font-black text-white font-serif">
                  {lookupResult.primaryGuest.name} 貴賓
                </h5>
                <span className="text-xs text-stone-400 font-mono">
                  {lookupResult.primaryGuest.phone} · 房型：{lookupResult.roomName}
                </span>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs text-stone-400 block">贈送電影票數</span>
                <span className="text-2xl font-black text-red-400 font-mono">
                  {lookupResult.movieTicketsCount} 張
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-stone-300">
                目前發送狀態：
                <span
                  className={`font-bold ml-1 ${
                    lookupResult.movieTicketsClaimed ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                >
                  {lookupResult.movieTicketsClaimed ? '✓ 已完成發票' : '待領取實體票券'}
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => handleClaimTickets(lookupResult.id)}
                  className={`w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    lookupResult.movieTicketsClaimed
                      ? 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-stone-950 shadow-lg'
                  }`}
                >
                  {lookupResult.movieTicketsClaimed ? '撤銷標記 (改為未發)' : '✓ 確認出票，完成發放'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Ticket Logs Table */}
      <div className="rounded-2xl border border-stone-800 bg-[#0e131d] p-5 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white font-serif">近期電影票贈出紀錄明細</h4>
          <span className="text-xs text-stone-400">總計 {bookings.length} 筆受贈紀錄</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-300">
            <thead className="bg-stone-900/60 text-stone-400 text-[11px] uppercase tracking-wider border-b border-stone-800">
              <tr>
                <th className="py-2.5 px-3">訂單編號</th>
                <th className="py-2.5 px-3">貴賓姓名</th>
                <th className="py-2.5 px-3">入住日期</th>
                <th className="py-2.5 px-3">房型名稱</th>
                <th className="py-2.5 px-3 text-center">贈送張數</th>
                <th className="py-2.5 px-3">櫃檯領取狀態</th>
                <th className="py-2.5 px-3 text-right">快速操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/80">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-stone-900/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-amber-400">
                    {b.bookingCode}
                  </td>
                  <td className="py-2.5 px-3 font-medium text-white">{b.primaryGuest.name}</td>
                  <td className="py-2.5 px-3 text-stone-400 font-mono">{b.checkInDate}</td>
                  <td className="py-2.5 px-3 text-stone-300">{b.roomName}</td>
                  <td className="py-2.5 px-3 text-center font-bold font-mono text-red-400">
                    {b.movieTicketsCount} 張
                  </td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                        b.movieTicketsClaimed
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {b.movieTicketsClaimed ? '已領取實體票' : '尚未領取'}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => onToggleTicketsClaimed(b.id)}
                      className="text-xs text-amber-400 hover:text-amber-300 hover:underline cursor-pointer"
                    >
                      {b.movieTicketsClaimed ? '設為未領' : '標記領取'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
