import React, { useState } from 'react';
import { Crown, Percent, Ticket, Car, Clock, UtensilsCrossed, Award, CheckCircle2, UserCheck, Sparkles, LogOut } from 'lucide-react';
import { Member } from '../types.ts';
import { MEMBER_BENEFITS } from '../data/hotelData.ts';

interface MemberClubSectionProps {
  member: Member | null;
  onLogin: (name: string, phone: string) => void;
  onLogout: () => void;
}

export const MemberClubSection: React.FC<MemberClubSectionProps> = ({
  member,
  onLogin,
  onLogout,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    onLogin(name.trim(), phone.trim());
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 4000);
  };

  return (
    <section id="membership" className="py-20 bg-gradient-to-b from-[#090d14] via-[#121824] to-[#090d14] border-t border-stone-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Benefits Showcase */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>萬秀俱樂部 VIP CLUB</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif tracking-tight">
              加入萬秀金牌會員 <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">
                立享全房型 88 折與極致尊榮
              </span>
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              免繳會費、無門檻立即申辦！只要輸入手機與大名，立即升級萬秀金牌會員，即刻享有訂房 88 折直折、贈送《大尾鱸鰻3》首映電影票與機場接駁禮遇。
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {MEMBER_BENEFITS.map((benefit, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-stone-900/70 border border-stone-800/80 hover:border-amber-500/30 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                        {i === 0 && <Percent className="w-3.5 h-3.5" />}
                        {i === 1 && <Ticket className="w-3.5 h-3.5" />}
                        {i === 2 && <Car className="w-3.5 h-3.5" />}
                        {i === 3 && <Clock className="w-3.5 h-3.5" />}
                        {i === 4 && <UtensilsCrossed className="w-3.5 h-3.5" />}
                        {i === 5 && <Award className="w-3.5 h-3.5" />}
                      </div>
                      <h4 className="text-sm font-bold text-white">{benefit.title}</h4>
                    </div>
                    <p className="text-xs text-stone-400 leading-normal">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Member Card or Quick Registration */}
          <div className="lg:col-span-5">
            {member ? (
              /* Already Member Card */
              <div className="relative rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-amber-900/60 via-stone-900 to-stone-950 border-2 border-amber-400/50 shadow-2xl space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Crown className="w-6 h-6 text-amber-400" />
                    <div>
                      <div className="text-xs text-amber-400 font-mono tracking-wider">
                        CHU KE-LIANG VIP CLUB
                      </div>
                      <h3 className="text-xl font-black text-white font-serif">
                        萬秀金牌尊榮會員卡
                      </h3>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-bold bg-amber-400 text-stone-950 rounded shadow">
                    88折優惠中
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-stone-800 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-400">會員姓名</span>
                    <span className="font-bold text-white text-sm">{member.name} 貴賓</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-400">綁定手機</span>
                    <span className="font-mono text-stone-200">{member.phone}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-400">萬秀點數</span>
                    <span className="font-mono font-bold text-amber-400 text-base">{member.points} 點</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-400">專屬權益</span>
                    <span className="text-emerald-400 font-medium">全館房價 88 折 + 送大尾鱸鰻3電影票</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href="#booking-engine"
                    className="w-full py-3 px-4 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:brightness-110 text-stone-950 font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <span>使用會員優惠立即訂房</span>
                    <Sparkles className="w-4 h-4" />
                  </a>

                  <button
                    onClick={onLogout}
                    className="w-full cursor-pointer py-2 text-xs text-stone-400 hover:text-stone-200 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>切換帳號 / 登出會員</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Quick Join / Login Box */
              <div className="relative rounded-2xl p-6 sm:p-8 bg-stone-900/90 border border-amber-500/40 shadow-2xl backdrop-blur-xl">
                <div className="mb-6 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400">
                    <Sparkles className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">即刻開通 3秒搞定</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-serif">
                    免費加入 / 登入會員
                  </h3>
                  <p className="text-xs text-stone-400 leading-normal">
                    填寫手機與姓名即可立刻獲得「萬秀金牌會員」資格，本官網全館訂房自動折抵 88 折！
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                      貴賓姓名 / 暱稱
                    </label>
                    <input
                      type="text"
                      placeholder="例：陳大偉、林阿妹"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                      手機號碼 (作為訂房與電影票接收依據)
                    </label>
                    <input
                      type="tel"
                      placeholder="例：0912-345-678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>

                  <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/20 text-[11px] text-stone-300 space-y-1">
                    <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>送《大尾鱸鰻3》首映電影票保證</span>
                    </div>
                    <p className="text-stone-400">
                      開通後本機將永久保存您的會員狀態，訂房自動套用 VIP 88 折優惠價。
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full cursor-pointer py-3 px-4 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:brightness-110 active:scale-[0.99] text-stone-950 font-bold text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Crown className="w-4 h-4 text-stone-950" />
                    <span>立即免費開通會員 (享88折)</span>
                  </button>
                </form>

                {showSuccessToast && (
                  <div className="mt-4 p-3 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
                    <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>恭喜您已開通萬秀金牌會員！已自動套用全館 88 折優惠！</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
