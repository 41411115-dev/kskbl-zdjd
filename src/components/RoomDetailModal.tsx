import React from 'react';
import { X, Bed, Users, Maximize2, Ticket, Check, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { Room } from '../types.ts';

interface RoomDetailModalProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
  onBookRoom: (room: Room) => void;
  isMember: boolean;
}

export const RoomDetailModal: React.FC<RoomDetailModalProps> = ({
  room,
  isOpen,
  onClose,
  onBookRoom,
  isMember,
}) => {
  if (!isOpen || !room) return null;

  const currentPrice = isMember ? room.memberPrice : room.regularPrice;
  const savings = room.regularPrice - room.memberPrice;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#0f141f] border border-stone-700/80 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-950">
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f141f] via-transparent to-transparent opacity-90" />
          <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-red-600 text-white text-xs font-bold mb-2">
                <Ticket className="w-3.5 h-3.5" />
                <span>免費贈送《大尾鱸鰻3》電影票 {room.movieTickets} 張</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-serif">{room.name}</h2>
              <p className="text-xs text-stone-300 font-mono">{room.subtitle}</p>
            </div>

            <div className="text-right">
              <span className="text-xs text-stone-400 block">每晚優惠房價</span>
              <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono tabular-nums">
                NT$ {currentPrice.toLocaleString()}
              </span>
              {isMember && (
                <span className="block text-xs text-emerald-400 font-medium">
                  已享萬秀會員 88 折 (省 NT${savings.toLocaleString()})
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Metadata Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-stone-900/80 border border-stone-800 text-xs">
            <div>
              <span className="text-stone-400 block mb-0.5">客房面積</span>
              <span className="font-bold text-white text-sm">{room.size}</span>
            </div>
            <div>
              <span className="text-stone-400 block mb-0.5">床型配置</span>
              <span className="font-bold text-white text-sm">{room.bedType}</span>
            </div>
            <div>
              <span className="text-stone-400 block mb-0.5">可住人數</span>
              <span className="font-bold text-white text-sm">最多 {room.maxGuests} 位貴賓</span>
            </div>
            <div>
              <span className="text-stone-400 block mb-0.5">窗外景觀</span>
              <span className="font-bold text-amber-300 text-sm truncate">{room.view}</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-stone-200">客房介紹</h4>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">{room.description}</p>
          </div>

          {/* Highlights */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>房型專屬特惠禮遇</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {room.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-stone-200 p-2.5 rounded-lg bg-stone-900/60 border border-stone-800">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities Grid */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-stone-200">客房配備與貼心備品</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-stone-300">
              {room.amenities.map((amenity, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Notice */}
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs text-stone-300 space-y-1">
            <div className="flex items-center gap-2 text-amber-300 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>入住與取消政策</span>
            </div>
            <p className="text-stone-400">
              • 入住時間：15:00 以後（會員可延遲退房至 14:00）<br />
              • 免費提供小港機場與左營高鐵商務專車預約接送<br />
              • 入住日前 3 天可免費取消或更改日期
            </p>
          </div>

          {/* Action footer */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-800">
            <div>
              <span className="text-xs text-stone-400">總計房價 (含稅與服務費)</span>
              <div className="text-2xl font-black text-amber-400 font-mono">
                NT$ {currentPrice.toLocaleString()} / 晚
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-stone-300 hover:text-white bg-stone-800 rounded-lg cursor-pointer"
              >
                返回選房
              </button>
              <button
                onClick={() => {
                  onClose();
                  onBookRoom(room);
                }}
                className="w-full sm:w-auto px-6 py-2.5 text-xs sm:text-sm font-bold text-stone-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:brightness-110 active:scale-95 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>立即確認預訂</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
