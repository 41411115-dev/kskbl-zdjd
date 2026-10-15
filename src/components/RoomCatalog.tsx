import React, { useState } from 'react';
import { Bed, Users, Maximize2, Ticket, Check, Sparkles, Eye, ArrowRight } from 'lucide-react';
import { Room } from '../types.ts';
import { ROOMS_DATA } from '../data/hotelData.ts';

interface RoomCatalogProps {
  isMember: boolean;
  onSelectRoomForBooking: (room: Room) => void;
  onViewRoomDetails: (room: Room) => void;
  onOpenMembershipModal: () => void;
}

export const RoomCatalog: React.FC<RoomCatalogProps> = ({
  isMember,
  onSelectRoomForBooking,
  onViewRoomDetails,
  onOpenMembershipModal,
}) => {
  const [filter, setFilter] = useState<'all' | 'suite' | 'deluxe' | 'family'>('all');

  const filteredRooms = ROOMS_DATA.filter((room) => {
    if (filter === 'all') return true;
    return room.category === filter;
  });

  return (
    <section id="rooms" className="py-20 bg-[#090d14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>港都頂級住宿體驗</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif tracking-tight">
              精選客房與主題套房
            </h2>
            <p className="text-stone-400 text-sm sm:text-base max-w-xl">
              全館客房皆享開闊港都視野或飛機起降景觀，每房入住皆贈送《大尾鱸鰻3》首映電影票，加入會員再享專屬 88 折直折優惠。
            </p>
          </div>

          {/* Member Banner Callout */}
          {!isMember && (
            <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-center justify-between gap-4 max-w-md">
              <div className="text-xs text-stone-300">
                <span className="font-bold text-amber-400">登入萬秀會員：</span> 全館即享 88 折優惠，每晚最多省 NT$1,656！
              </div>
              <button
                onClick={onOpenMembershipModal}
                className="cursor-pointer px-3 py-1.5 text-xs font-bold text-stone-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors whitespace-nowrap"
              >
                免費加入
              </button>
            </div>
          )}
        </div>

        {/* Filter Tab Buttons */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 border-b border-stone-800">
          <button
            onClick={() => setFilter('all')}
            className={`cursor-pointer px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
              filter === 'all'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-stone-400 hover:text-white bg-stone-900/60 hover:bg-stone-800'
            }`}
          >
            全部房型 ({ROOMS_DATA.length})
          </button>
          <button
            onClick={() => setFilter('suite')}
            className={`cursor-pointer px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
              filter === 'suite'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-stone-400 hover:text-white bg-stone-900/60 hover:bg-stone-800'
            }`}
          >
            豪華套房系列 (2)
          </button>
          <button
            onClick={() => setFilter('deluxe')}
            className={`cursor-pointer px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
              filter === 'deluxe'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-stone-400 hover:text-white bg-stone-900/60 hover:bg-stone-800'
            }`}
          >
            海景雙人客房 (1)
          </button>
          <button
            onClick={() => setFilter('family')}
            className={`cursor-pointer px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
              filter === 'family'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-stone-400 hover:text-white bg-stone-900/60 hover:bg-stone-800'
            }`}
          >
            家庭歡聚四人房 (1)
          </button>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredRooms.map((room) => {
            const currentPrice = isMember ? room.memberPrice : room.regularPrice;
            const savings = room.regularPrice - room.memberPrice;

            return (
              <div
                key={room.id}
                className="rounded-2xl border border-stone-800/90 bg-[#0e131d] overflow-hidden hover:border-amber-500/40 transition-all duration-300 flex flex-col group shadow-xl"
              >
                {/* Room Image Frame */}
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-950">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e131d] via-transparent to-transparent opacity-80" />

                  {/* Free Movie Ticket Badge on Image */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/95 text-white text-xs font-bold shadow-lg backdrop-blur-sm">
                    <Ticket className="w-3.5 h-3.5" />
                    <span>送《大尾鱸鰻3》電影票 {room.movieTickets} 張</span>
                  </div>

                  {/* View info pill */}
                  <div className="absolute bottom-3 left-4 text-xs font-medium text-amber-200 bg-black/60 px-2.5 py-1 rounded backdrop-blur-sm">
                    {room.view}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-white font-serif group-hover:text-amber-400 transition-colors">
                          {room.name}
                        </h3>
                        <p className="text-xs text-stone-400 font-mono tracking-wide">
                          {room.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Clean unboxed metadata with typographic separators */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-stone-400 py-1">
                      <span>{room.size}</span>
                      <span aria-hidden="true" className="text-stone-600">·</span>
                      <span>{room.bedType}</span>
                      <span aria-hidden="true" className="text-stone-600">·</span>
                      <span>最多 {room.maxGuests} 人入住</span>
                    </div>

                    <p className="text-stone-300 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                      {room.description}
                    </p>

                    {/* Room key highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-2">
                      {room.highlights.slice(0, 4).map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-stone-300">
                          <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing & Actions */}
                  <div className="pt-4 border-t border-stone-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs text-stone-400">每晚</span>
                        <span className="text-2xl font-black text-amber-400 font-mono tabular-nums">
                          NT$ {currentPrice.toLocaleString()}
                        </span>
                        {isMember ? (
                          <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                            已享會員 88 折 (省 NT${savings.toLocaleString()})
                          </span>
                        ) : (
                          <span className="text-xs text-stone-500 line-through font-mono">
                            NT$ {room.regularPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      {!isMember && (
                        <div className="text-[11px] text-amber-300/90 mt-0.5">
                          萬秀會員價 NT$ {room.memberPrice.toLocaleString()} (現省 NT${savings.toLocaleString()})
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onViewRoomDetails(room)}
                        className="cursor-pointer px-3.5 py-2.5 text-xs font-medium text-stone-300 hover:text-white bg-stone-800/80 hover:bg-stone-700 rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>客房詳情</span>
                      </button>
                      <button
                        onClick={() => onSelectRoomForBooking(room)}
                        className="cursor-pointer px-4 py-2.5 text-xs sm:text-sm font-bold text-stone-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:brightness-110 active:scale-95 rounded-lg shadow-md transition-all flex items-center gap-1.5"
                      >
                        <span>立即預訂</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
