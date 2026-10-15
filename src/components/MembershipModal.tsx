import React, { useState } from 'react';
import { X, Crown, Sparkles, CheckCircle2, UserCheck } from 'lucide-react';
import { Member } from '../types.ts';

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: Member | null;
  onLogin: (name: string, phone: string) => void;
  onLogout: () => void;
}

export const MembershipModal: React.FC<MembershipModalProps> = ({
  isOpen,
  onClose,
  member,
  onLogin,
  onLogout,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    onLogin(name.trim(), phone.trim());
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-md bg-[#0f141f] border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden my-6">
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-stone-800 bg-stone-900/80">
          <div className="flex items-center gap-2 text-amber-400">
            <Crown className="w-5 h-5" />
            <h3 className="font-bold text-base sm:text-lg text-white font-serif">
              萬秀俱樂部 VIP 會員專區
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {member ? (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/60 to-stone-900 border border-amber-500/30 text-center space-y-2">
                <div className="text-xs text-amber-400 font-mono">萬秀金牌尊榮會員</div>
                <h4 className="text-xl font-bold text-white">{member.name} 貴賓</h4>
                <div className="text-xs text-stone-400 font-mono">{member.phone}</div>
                <div className="pt-2 text-xs font-semibold text-emerald-400 flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>已啟用全館房型 88 折直折特惠</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={onClose}
                  className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-yellow-400 text-stone-950 font-bold text-sm rounded-lg hover:brightness-110 cursor-pointer"
                >
                  前往選房享受 88 折
                </button>
                <button
                  onClick={onLogout}
                  className="w-full py-2 text-xs text-stone-400 hover:text-stone-200 cursor-pointer transition-colors"
                >
                  登出目前會員帳號
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-xs text-stone-300 leading-relaxed bg-stone-900/60 p-3 rounded-lg border border-stone-800">
                ★ 輸入姓名與手機即可立刻免費開通會員資格，立即享有全館 88 折優惠與免費《大尾鱸鰻3》首映電影票！
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  貴賓姓名 / 暱稱
                </label>
                <input
                  type="text"
                  placeholder="例：陳大偉"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  手機號碼 (用於識別會員與發送票券)
                </label>
                <input
                  type="tel"
                  placeholder="例：0912-345-678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer py-3 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-stone-950 font-bold text-sm rounded-xl shadow-lg transition-all hover:brightness-110"
              >
                免費開通萬秀金牌會員 (享 88 折)
              </button>

              {success && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-lg text-emerald-300 text-xs flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>開通成功！歡迎來到豬哥亮小港大飯店！</span>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
