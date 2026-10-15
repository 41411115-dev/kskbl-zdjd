import React from 'react';
import { X, Ticket, Calendar, MapPin, QrCode, Printer, Trash2, ArrowRight } from 'lucide-react';
import { Booking } from '../types.ts';

interface MyBookingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  onOpenBooking: () => void;
  onViewTicket: (booking: Booking) => void;
  onCancelBooking: (id: string) => void;
}

export const MyBookingsDrawer: React.FC<MyBookingsDrawerProps> = ({
  isOpen,
  onClose,
  bookings,
  onOpenBooking,
  onViewTicket,
  onCancelBooking,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0f141f] border border-stone-700 rounded-2xl shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-stone-800 bg-stone-900/80">
          <div className="flex items-center gap-2 text-amber-400">
            <Ticket className="w-5 h-5" />
            <h3 className="font-bold text-base sm:text-lg text-white font-serif">
              我的訂房紀錄與《大尾鱸鰻3》電影票匣
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 max-h-[75vh] overflow-y-auto space-y-4">
          {bookings.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center mx-auto text-stone-600">
                <Ticket className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white">您目前尚無預訂紀錄</h4>
                <p className="text-xs text-stone-400 max-w-sm mx-auto">
                  立即預訂小港大飯店任一客房，即可免費獲得《大尾鱸鰻3》首映電影票與會員專屬 88 折優惠！
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-400 text-stone-950 font-bold text-xs sm:text-sm rounded-lg hover:brightness-110 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>立即探索客房並預訂</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            bookings.map((b) => (
              <div
                key={b.id}
                className="rounded-xl border border-stone-800 bg-stone-900/90 p-4 sm:p-5 space-y-4 shadow-lg hover:border-amber-500/40 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 tracking-wider">
                      RESERVATION NO.
                    </span>
                    <div className="text-lg font-black text-white font-mono">{b.bookingCode}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                      預訂已確認
                    </span>
                    {b.isMember && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-950 text-amber-300 border border-amber-500/30">
                        萬秀會員 88 折
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-stone-400 block mb-0.5">預訂房型</span>
                    <span className="font-bold text-white text-sm">{b.roomName}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block mb-0.5">入住日期</span>
                    <span className="font-semibold text-stone-200">
                      {b.checkInDate} ~ {b.checkOutDate} ({b.nights} 晚)
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-400 block mb-0.5">入住代表</span>
                    <span className="font-semibold text-stone-200">
                      {b.primaryGuest.name} ({b.primaryGuest.phone})
                    </span>
                  </div>
                </div>

                {/* Free Movie Tickets perk highlight */}
                <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/30 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs">
                    <Ticket className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <span className="font-bold text-amber-300">
                        贈送《大尾鱸鰻3》首映通用電影票：
                      </span>
                      <span className="font-mono font-bold text-white ml-1">
                        {b.movieTicketsCount} 張
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onViewTicket(b)}
                    className="px-3 py-1 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded transition-colors whitespace-nowrap cursor-pointer"
                  >
                    出示電影憑證
                  </button>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-stone-800 text-xs text-stone-400">
                  <div className="font-mono">
                    實付總額：<span className="text-amber-400 font-bold">NT$ {b.pricing.totalAmount.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => onCancelBooking(b.id)}
                    className="text-stone-500 hover:text-red-400 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>取消此筆預訂</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
