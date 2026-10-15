import React, { useState } from 'react';
import { Bed, DollarSign, Ticket, Sparkles, Check, Edit, Save, RefreshCw } from 'lucide-react';
import { Room } from '../../types.ts';

interface AdminRoomsProps {
  rooms: Room[];
  onUpdateRoom: (updatedRoom: Room) => void;
  onResetDefaultRooms: () => void;
}

export const AdminRooms: React.FC<AdminRoomsProps> = ({
  rooms,
  onUpdateRoom,
  onResetDefaultRooms,
}) => {
  const [editingRoomId, setEditingRoomId] = useState<string | null>(null);
  const [editRegularPrice, setEditRegularPrice] = useState<number>(0);
  const [editTicketsCount, setEditTicketsCount] = useState<number>(2);

  const startEdit = (room: Room) => {
    setEditingRoomId(room.id);
    setEditRegularPrice(room.regularPrice);
    setEditTicketsCount(room.movieTickets);
  };

  const saveEdit = (room: Room) => {
    const updatedMemberPrice = Math.round(editRegularPrice * 0.88);
    onUpdateRoom({
      ...room,
      regularPrice: editRegularPrice,
      memberPrice: updatedMemberPrice,
      movieTickets: editTicketsCount,
    });
    setEditingRoomId(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0e131d] p-5 rounded-2xl border border-stone-800 shadow-xl">
        <div>
          <h3 className="text-lg font-bold text-white font-serif">
            客房定價與《大尾鱸鰻3》贈票設定
          </h3>
          <p className="text-xs text-stone-400">
            可依淡旺季調整牌價，萬秀會員價將自動計算 88 折直折，並可設定各房型贈票張數。
          </p>
        </div>

        <button
          onClick={onResetDefaultRooms}
          className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold rounded-xl border border-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>恢復系統預設牌價</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rooms.map((room) => {
          const isEditing = editingRoomId === room.id;

          return (
            <div
              key={room.id}
              className="rounded-2xl border border-stone-800 bg-[#0e131d] overflow-hidden p-5 space-y-4 shadow-xl flex flex-col justify-between"
            >
              <div className="flex gap-4">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-24 h-20 rounded-xl object-cover shrink-0 border border-stone-800"
                />
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                    {room.category.toUpperCase()}
                  </span>
                  <h4 className="text-base font-bold text-white font-serif">{room.name}</h4>
                  <div className="text-xs text-stone-400">
                    {room.size} · {room.bedType}
                  </div>
                </div>
              </div>

              {/* Price & Ticket Configuration */}
              <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 space-y-3 text-xs">
                {isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-stone-300 mb-1">一般牌價 (NT$)</label>
                      <input
                        type="number"
                        step={100}
                        value={editRegularPrice}
                        onChange={(e) => setEditRegularPrice(Number(e.target.value))}
                        className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-300 mb-1">
                        贈送《大尾鱸鰻3》首映電影票 (張)
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={editTicketsCount}
                        onChange={(e) => setEditTicketsCount(Number(e.target.value))}
                        className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2 text-white font-mono"
                      />
                    </div>
                    <div className="text-[11px] text-amber-300 font-mono">
                      萬秀會員自動 88 折價：NT$ {Math.round(editRegularPrice * 0.88).toLocaleString()}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-stone-500 block">目前一般牌價</span>
                      <span className="text-base font-bold font-mono text-white">
                        NT$ {room.regularPrice.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-500 block">萬秀會員價 (88折)</span>
                      <span className="text-base font-bold font-mono text-amber-400">
                        NT$ {room.memberPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="col-span-2 pt-2 border-t border-stone-800 flex items-center justify-between">
                      <span className="text-stone-400 flex items-center gap-1.5">
                        <Ticket className="w-3.5 h-3.5 text-red-400" />
                        <span>每房贈送大尾鱸鰻3電影票：</span>
                      </span>
                      <span className="font-bold text-red-400 font-mono text-sm">
                        {room.movieTickets} 張
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-1">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => setEditingRoomId(null)}
                      className="px-3 py-1.5 bg-stone-800 text-stone-300 rounded-lg text-xs cursor-pointer"
                    >
                      取消
                    </button>
                    <button
                      onClick={() => saveEdit(room)}
                      className="px-4 py-1.5 bg-amber-400 text-stone-950 font-bold rounded-lg text-xs cursor-pointer hover:bg-amber-300 flex items-center gap-1"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>儲存定價設定</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => startEdit(room)}
                    className="px-3.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5 text-amber-400" />
                    <span>調整價格與票數</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
