import React, { useState } from 'react';
import { Crown, Search, Plus, Award, Phone, Calendar, UserPlus, Edit2 } from 'lucide-react';
import { Member } from '../../types.ts';

interface AdminMembersProps {
  members: Member[];
  onAddMember: (member: Member) => void;
  onUpdatePoints: (phone: string, addedPoints: number) => void;
  onUpgradeTier: (phone: string, tier: Member['tier']) => void;
}

export const AdminMembers: React.FC<AdminMembersProps> = ({
  members,
  onAddMember,
  onUpdatePoints,
  onUpgradeTier,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newTier, setNewTier] = useState<Member['tier']>('萬秀金牌卡');
  const [newPoints, setNewPoints] = useState(888);

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.phone.includes(searchTerm)
  );

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) return;

    onAddMember({
      name: newName.trim(),
      phone: newPhone.trim(),
      tier: newTier,
      points: Number(newPoints),
      joinDate: new Date().toISOString().split('T')[0],
      totalSpent: 0,
      bookingsCount: 0,
    });

    setIsAddModalOpen(false);
    setNewName('');
    setNewPhone('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#0e131d] p-5 rounded-2xl border border-stone-800 shadow-xl">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="搜尋萬秀會員姓名、手機號碼..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-xs sm:text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full md:w-auto px-4 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-400 hover:brightness-110 text-stone-950 font-bold text-xs sm:text-sm rounded-xl shadow transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
        >
          <UserPlus className="w-4 h-4 text-stone-950" />
          <span>手動新增 VIP 會員</span>
        </button>
      </div>

      {/* Members Table */}
      <div className="rounded-2xl border border-stone-800 bg-[#0e131d] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-300">
            <thead className="bg-stone-900/90 text-stone-400 text-[11px] uppercase tracking-wider border-b border-stone-800">
              <tr>
                <th className="py-3.5 px-4">會員姓名</th>
                <th className="py-3.5 px-4">綁定電話</th>
                <th className="py-3.5 px-4">會員等級</th>
                <th className="py-3.5 px-4">專屬權益</th>
                <th className="py-3.5 px-4 text-center">累積萬秀點數</th>
                <th className="py-3.5 px-4">加入日期</th>
                <th className="py-3.5 px-4 text-right">操作與點數發送</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/80">
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-stone-500">
                    目前查無會員資料
                  </td>
                </tr>
              ) : (
                filteredMembers.map((m, idx) => (
                  <tr key={idx} className="hover:bg-stone-900/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 text-xs">
                        {m.name.charAt(0)}
                      </div>
                      <span>{m.name}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-stone-300">{m.phone}</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-950/80 text-amber-300 border border-amber-500/40">
                        <Crown className="w-3 h-3 text-amber-400" />
                        <span>{m.tier}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-emerald-400 font-medium">
                      全館訂房享 88 折直折 + 贈電影票
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-amber-400 text-sm">
                      {m.points} 點
                    </td>
                    <td className="py-3.5 px-4 text-stone-400 font-mono">{m.joinDate}</td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => onUpdatePoints(m.phone, 100)}
                        className="px-2 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded text-[11px] font-semibold cursor-pointer"
                        title="發送獎勵 100 點"
                      >
                        +100點
                      </button>
                      <button
                        onClick={() =>
                          onUpgradeTier(
                            m.phone,
                            m.tier === '萬秀金牌卡' ? '鱸鰻鑽石VIP' : '萬秀金牌卡'
                          )
                        }
                        className="px-2 py-1 bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 border border-amber-500/30 rounded text-[11px] font-semibold cursor-pointer"
                      >
                        {m.tier === '萬秀金牌卡' ? '升級鑽石' : '調降等級'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Member Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-md bg-[#0f141f] border border-amber-500/40 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <Crown className="w-4 h-4" />
                <span>手動建立萬秀 VIP 會員</span>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-stone-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-300 mb-1">貴賓姓名 *</label>
                <input
                  type="text"
                  placeholder="例：王小美"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg p-2 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-stone-300 mb-1">手機號碼 *</label>
                <input
                  type="tel"
                  placeholder="0987-654-321"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg p-2 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-stone-300 mb-1">會員等級</label>
                <select
                  value={newTier}
                  onChange={(e) => setNewTier(e.target.value as Member['tier'])}
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg p-2 text-white"
                >
                  <option value="萬秀金牌卡">萬秀金牌卡 (享 88 折)</option>
                  <option value="鱸鰻鑽石VIP">鱸鰻鑽石VIP (享 88 折 + 贈高鐵接送)</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-300 mb-1">初始贈送萬秀點數</label>
                <input
                  type="number"
                  value={newPoints}
                  onChange={(e) => setNewPoints(Number(e.target.value))}
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg p-2 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-stone-800 text-stone-300 rounded-lg cursor-pointer"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-400 text-stone-950 font-bold rounded-lg cursor-pointer hover:bg-amber-300"
                >
                  確認建立會員
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
