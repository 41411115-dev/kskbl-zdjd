import React, { useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  Ticket,
  Calendar,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Printer,
  Trash2,
  Edit3,
  User,
  Phone,
  Mail,
  Car,
  UtensilsCrossed,
  Sparkles,
} from 'lucide-react';
import { Booking, Room } from '../../types.ts';

interface AdminBookingsProps {
  bookings: Booking[];
  rooms: Room[];
  onUpdateBookingStatus: (id: string, newStatus: Booking['status']) => void;
  onToggleTicketsClaimed: (id: string) => void;
  onDeleteBooking: (id: string) => void;
  onAddManualBooking: (booking: Booking) => void;
}

export const AdminBookings: React.FC<AdminBookingsProps> = ({
  bookings,
  rooms,
  onUpdateBookingStatus,
  onToggleTicketsClaimed,
  onDeleteBooking,
  onAddManualBooking,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Booking['status']>('all');
  const [selectedBookingForDetail, setSelectedBookingForDetail] = useState<Booking | null>(null);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);

  // Manual modal state
  const [manualName, setManualName] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [manualEmail, setManualEmail] = useState('');
  const [manualRoomId, setManualRoomId] = useState(rooms[0]?.id || 'room-presidential');
  const [manualCheckIn, setManualCheckIn] = useState(
    new Date().toISOString().split('T')[0]
  );
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [manualCheckOut, setManualCheckOut] = useState(
    tomorrow.toISOString().split('T')[0]
  );
  const [manualNights, setManualNights] = useState(1);
  const [manualAdults, setManualAdults] = useState(2);
  const [manualIsMember, setManualIsMember] = useState(true);
  const [manualNotes, setManualNotes] = useState('');

  // Filter bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.bookingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.primaryGuest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.primaryGuest.phone.includes(searchTerm) ||
      b.roomName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateManualBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName.trim() || !manualPhone.trim()) return;

    const matchedRoom = rooms.find((r) => r.id === manualRoomId) || rooms[0];
    const rawPrice = matchedRoom.regularPrice * manualNights;
    const memberDiscount = manualIsMember ? Math.round(rawPrice * 0.12) : 0;
    const finalAmount = rawPrice - memberDiscount;

    const newBooking: Booking = {
      id: `manual-${Date.now()}`,
      bookingCode: `CKL-2026-M${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      roomId: matchedRoom.id,
      roomName: matchedRoom.name,
      roomImage: matchedRoom.image,
      checkInDate: manualCheckIn,
      checkOutDate: manualCheckOut,
      nights: manualNights,
      guests: { adults: manualAdults, children: 0 },
      primaryGuest: {
        name: manualName.trim(),
        phone: manualPhone.trim(),
        email: manualEmail.trim() || 'frontdesk@chukeliang-grandhotel.com.tw',
        arrivalEstimate: '臨櫃辦理 (Walk-in)',
        notes: manualNotes.trim(),
      },
      isMember: manualIsMember,
      movieTicketsCount: matchedRoom.movieTickets,
      movieTicketsClaimed: false,
      addons: {
        airportShuttle: manualIsMember,
        seafoodBreakfast: true,
        extraMovieTickets: 0,
        snackBucket: false,
      },
      pricing: {
        basePrice: rawPrice,
        memberDiscount,
        addonsTotal: 0,
        totalAmount: finalAmount,
      },
      status: 'confirmed',
    };

    onAddManualBooking(newBooking);
    setIsManualModalOpen(false);
    // Reset
    setManualName('');
    setManualPhone('');
    setManualNotes('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Controls: Search, Filter, Add button */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#0e131d] p-4 sm:p-5 rounded-2xl border border-stone-800">
        <div className="flex flex-1 items-center gap-3 w-full">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="搜尋訂單編號 (CKL-...)、住客姓名、手機號碼..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-xs sm:text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Status Filter Tab Buttons */}
          <div className="hidden sm:flex items-center gap-1 p-1 bg-stone-900 rounded-xl border border-stone-800 shrink-0">
            {(
              [
                ['all', '全部'],
                ['confirmed', '待入住'],
                ['checked_in', '入住中'],
                ['completed', '已退房'],
                ['cancelled', '已取消'],
              ] as const
            ).map(([val, label]) => (
              <button
                key={val}
                onClick={() => setStatusFilter(val)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  statusFilter === val
                    ? 'bg-amber-400 text-stone-950 shadow'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setIsManualModalOpen(true)}
          className="w-full md:w-auto px-4 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-400 hover:brightness-110 text-stone-950 font-bold text-xs sm:text-sm rounded-xl shadow transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-4 h-4 text-stone-950" />
          <span>現場臨櫃 / 電話代訂</span>
        </button>
      </div>

      {/* Bookings Table */}
      <div className="rounded-2xl border border-stone-800 bg-[#0e131d] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-300">
            <thead className="bg-stone-900/90 text-stone-400 text-[11px] uppercase tracking-wider border-b border-stone-800">
              <tr>
                <th className="py-3.5 px-4">訂單編號</th>
                <th className="py-3.5 px-4">住客代表</th>
                <th className="py-3.5 px-4">預訂房型</th>
                <th className="py-3.5 px-4">入住日期 / 晚數</th>
                <th className="py-3.5 px-4 text-center">大尾鱸鰻3電影票</th>
                <th className="py-3.5 px-4 text-right">實付總額</th>
                <th className="py-3.5 px-4">訂單狀態</th>
                <th className="py-3.5 px-4 text-right">管理操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/80">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-stone-500">
                    查無符合條件的訂單紀錄
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-stone-900/40 transition-colors">
                    {/* Booking Code */}
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-400">
                      {b.bookingCode}
                    </td>

                    {/* Guest */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">{b.primaryGuest.name}</div>
                      <div className="font-mono text-stone-400 text-[11px]">
                        {b.primaryGuest.phone}
                      </div>
                      {b.isMember && (
                        <span className="text-[10px] text-amber-300 font-semibold bg-amber-950/60 border border-amber-500/30 px-1 rounded">
                          VIP 88折
                        </span>
                      )}
                    </td>

                    {/* Room Name */}
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-stone-200">{b.roomName}</div>
                      <div className="text-[11px] text-stone-500">
                        {b.guests.adults} 成人 {b.guests.children > 0 && `· ${b.guests.children} 孩童`}
                      </div>
                    </td>

                    {/* Dates */}
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-stone-200">{b.checkInDate}</div>
                      <div className="text-[11px] text-stone-400">
                        至 {b.checkOutDate} ({b.nights} 晚)
                      </div>
                    </td>

                    {/* Movie Tickets Status */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="inline-flex flex-col items-center gap-1">
                        <span className="font-bold text-red-400 bg-red-950/50 border border-red-500/30 px-2 py-0.5 rounded text-[11px]">
                          {b.movieTicketsCount} 張電影票
                        </span>
                        <button
                          onClick={() => onToggleTicketsClaimed(b.id)}
                          className={`text-[10px] font-semibold px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
                            b.movieTicketsClaimed
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                              : 'bg-stone-800 text-stone-400 hover:text-white'
                          }`}
                          title="點擊切換是否已發送實體票券"
                        >
                          {b.movieTicketsClaimed ? '✓ 櫃檯已發實體票' : '待現場發票 (點擊標記)'}
                        </button>
                      </div>
                    </td>

                    {/* Total Amount */}
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-white text-sm">
                      NT$ {b.pricing.totalAmount.toLocaleString()}
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-3.5 px-4">
                      <select
                        value={b.status}
                        onChange={(e) =>
                          onUpdateBookingStatus(b.id, e.target.value as Booking['status'])
                        }
                        className={`text-xs font-semibold rounded-lg px-2 py-1 border focus:outline-none cursor-pointer ${
                          b.status === 'confirmed'
                            ? 'bg-amber-950/60 text-amber-300 border-amber-500/50'
                            : b.status === 'checked_in'
                            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/50'
                            : b.status === 'completed'
                            ? 'bg-blue-950/60 text-blue-300 border-blue-500/50'
                            : 'bg-stone-800 text-stone-400 border-stone-700'
                        }`}
                      >
                        <option value="confirmed">待入住 (Confirmed)</option>
                        <option value="checked_in">入住中 (Checked-in)</option>
                        <option value="completed">已結案 (Completed)</option>
                        <option value="cancelled">已取消 (Cancelled)</option>
                      </select>
                    </td>

                    {/* Action buttons */}
                    <td className="py-3.5 px-4 text-right space-x-1.5">
                      <button
                        onClick={() => setSelectedBookingForDetail(b)}
                        className="p-1.5 text-stone-400 hover:text-amber-400 hover:bg-stone-800 rounded cursor-pointer transition-colors"
                        title="查看訂單完整詳情"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteBooking(b.id)}
                        className="p-1.5 text-stone-500 hover:text-red-400 hover:bg-stone-800 rounded cursor-pointer transition-colors"
                        title="刪除此筆記錄"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Modal */}
      {selectedBookingForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-xl bg-[#0f141f] border border-amber-500/40 rounded-2xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <div>
                <span className="text-xs font-mono text-amber-400">BOOKING DOSSIER</span>
                <h3 className="text-xl font-bold text-white font-serif">
                  訂單明細 #{selectedBookingForDetail.bookingCode}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBookingForDetail(null)}
                className="text-stone-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-stone-900 rounded-xl border border-stone-800">
                <div>
                  <span className="text-stone-400 block">住客姓名</span>
                  <span className="font-bold text-white text-sm">
                    {selectedBookingForDetail.primaryGuest.name}
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 block">聯絡電話</span>
                  <span className="font-mono font-bold text-white text-sm">
                    {selectedBookingForDetail.primaryGuest.phone}
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 block">電子信箱</span>
                  <span className="text-stone-200">
                    {selectedBookingForDetail.primaryGuest.email}
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 block">預計抵達</span>
                  <span className="text-amber-300 font-medium">
                    {selectedBookingForDetail.primaryGuest.arrivalEstimate || '未填寫'}
                  </span>
                </div>
              </div>

              {/* Movie Tickets Special Perk */}
              <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-red-400" />
                  <div>
                    <span className="font-bold text-white block">
                      《大尾鱸鰻3》首映電影票：{selectedBookingForDetail.movieTicketsCount} 張
                    </span>
                    <span className="text-[11px] text-stone-300">
                      全台威秀/國賓通用 ‧ 包含萬秀爆米花券
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onToggleTicketsClaimed(selectedBookingForDetail.id)}
                  className="px-3 py-1.5 text-xs font-bold bg-amber-400 text-stone-950 rounded-lg cursor-pointer"
                >
                  {selectedBookingForDetail.movieTicketsClaimed ? '已完成實體發票' : '登記發送實體票'}
                </button>
              </div>

              {/* Addons & Notes */}
              <div className="space-y-2 p-3 bg-stone-900/60 rounded-xl border border-stone-800">
                <div className="font-bold text-stone-200">加選服務項目</div>
                <div className="grid grid-cols-2 gap-2 text-stone-300">
                  <div>
                    機場接駁：
                    {selectedBookingForDetail.addons.airportShuttle ? '✓ 已預約' : '無'}
                  </div>
                  <div>
                    海鮮百匯早餐：
                    {selectedBookingForDetail.addons.seafoodBreakfast ? '✓ 已含' : '無'}
                  </div>
                  <div>
                    加購電影票：
                    {selectedBookingForDetail.addons.extraMovieTickets} 張
                  </div>
                  <div>
                    宵夜鹽酥雞桶：
                    {selectedBookingForDetail.addons.snackBucket ? '✓ 已預約' : '無'}
                  </div>
                </div>
                {selectedBookingForDetail.primaryGuest.notes && (
                  <div className="pt-2 border-t border-stone-800 text-stone-400">
                    備註需求：{selectedBookingForDetail.primaryGuest.notes}
                  </div>
                )}
              </div>

              {/* Pricing breakdown */}
              <div className="p-3 bg-black/40 rounded-xl space-y-1.5 font-mono">
                <div className="flex justify-between text-stone-400">
                  <span>客房基本房價</span>
                  <span>NT$ {selectedBookingForDetail.pricing.basePrice.toLocaleString()}</span>
                </div>
                {selectedBookingForDetail.pricing.memberDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>萬秀會員 88 折直折</span>
                    <span>- NT$ {selectedBookingForDetail.pricing.memberDiscount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-400">
                  <span>加值服務與餐飲</span>
                  <span>+ NT$ {selectedBookingForDetail.pricing.addonsTotal.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-stone-800 flex justify-between font-bold text-base text-amber-400">
                  <span>實收總額</span>
                  <span>NT$ {selectedBookingForDetail.pricing.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>列印住客登記表</span>
              </button>
              <button
                onClick={() => setSelectedBookingForDetail(null)}
                className="px-5 py-2 bg-amber-400 text-stone-950 font-bold rounded-lg text-xs cursor-pointer"
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual New Booking Modal */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-lg bg-[#0f141f] border border-amber-500/40 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <Plus className="w-4 h-4" />
                <span>現場臨櫃 / 電話代訂房登記</span>
              </div>
              <button
                onClick={() => setIsManualModalOpen(false)}
                className="text-stone-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateManualBooking} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-stone-300 mb-1">住客姓名 *</label>
                  <input
                    type="text"
                    placeholder="例：郭大富"
                    value={manualName}
                    onChange={(e) => setManualName(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg p-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-stone-300 mb-1">聯絡電話 *</label>
                  <input
                    type="tel"
                    placeholder="0912-345-678"
                    value={manualPhone}
                    onChange={(e) => setManualPhone(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg p-2 text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-300 mb-1">預訂房型</label>
                <select
                  value={manualRoomId}
                  onChange={(e) => setManualRoomId(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg p-2 text-white"
                >
                  {rooms.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} (送{r.movieTickets}張電影票 · NT${r.regularPrice.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-stone-300 mb-1">入住日期</label>
                  <input
                    type="date"
                    value={manualCheckIn}
                    onChange={(e) => setManualCheckIn(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg p-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-stone-300 mb-1">退房日期</label>
                  <input
                    type="date"
                    value={manualCheckOut}
                    onChange={(e) => setManualCheckOut(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg p-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-stone-300 mb-1">夜數</label>
                  <input
                    type="number"
                    min={1}
                    value={manualNights}
                    onChange={(e) => setManualNights(Number(e.target.value))}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg p-2 text-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 bg-amber-950/30 border border-amber-500/30 rounded-lg">
                <input
                  type="checkbox"
                  id="manualMember"
                  checked={manualIsMember}
                  onChange={(e) => setManualIsMember(e.target.checked)}
                  className="accent-amber-400"
                />
                <label htmlFor="manualMember" className="text-amber-300 font-semibold cursor-pointer">
                  套用萬秀會員 88 折直折優惠 (臨櫃直接享有)
                </label>
              </div>

              <div>
                <label className="block text-stone-300 mb-1">備註說明</label>
                <input
                  type="text"
                  placeholder="例：臨櫃現金結清、需要小港機場接駁"
                  value={manualNotes}
                  onChange={(e) => setManualNotes(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg p-2 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsManualModalOpen(false)}
                  className="px-4 py-2 bg-stone-800 text-stone-300 rounded-lg cursor-pointer"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-400 text-stone-950 font-bold rounded-lg cursor-pointer hover:bg-amber-300"
                >
                  確認建立訂單並開出電影票
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
