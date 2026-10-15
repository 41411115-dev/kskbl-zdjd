import React, { useState } from 'react';
import { Megaphone, Sparkles, CheckCircle2, Save, MessageSquare } from 'lucide-react';
import { HOTEL_IMAGES } from '../../data/hotelData.ts';

interface AdminAnnouncementsProps {
  bossQuote: string;
  onUpdateBossQuote: (newQuote: string) => void;
}

export const AdminAnnouncements: React.FC<AdminAnnouncementsProps> = ({
  bossQuote,
  onUpdateBossQuote,
}) => {
  const [quoteInput, setQuoteInput] = useState(bossQuote);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateBossQuote(quoteInput.trim());
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div className="bg-[#0e131d] p-6 rounded-2xl border border-stone-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
            <Megaphone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-serif">
              董事長 豬哥亮 官網廣播歡迎詞設定
            </h3>
            <p className="text-xs text-stone-400">
              前台官網首頁主要醒目迎賓泡泡語錄，即時更新全站旅客可見。
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-2 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <span>董事長親自獻聲台詞內容</span>
            </label>
            <textarea
              rows={4}
              value={quoteInput}
              onChange={(e) => setQuoteInput(e.target.value)}
              className="w-full bg-stone-900 border border-stone-700 rounded-xl p-3.5 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 leading-relaxed font-serif"
              placeholder="輸入豬哥亮董事長對旅客說的話..."
              required
            />
          </div>

          <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-2">
            <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>前台首頁即時預覽效果</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-stone-900 rounded-lg border border-stone-800">
              <img
                src={HOTEL_IMAGES.bossPortrait}
                alt="豬哥亮"
                className="w-12 h-12 rounded-full object-cover border border-amber-400 shrink-0"
              />
              <p className="text-xs text-stone-200 italic font-serif leading-snug">
                “{quoteInput}”
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              {savedSuccess && (
                <div className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>已成功更新前台官網董事長歡迎語錄！</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-400 hover:brightness-110 text-stone-950 font-bold text-xs sm:text-sm rounded-xl shadow transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>確認儲存並發布至官網</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
