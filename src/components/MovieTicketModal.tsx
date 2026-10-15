import React, { useState } from 'react';
import { X, Ticket, Sparkles, CheckCircle2, QrCode, Film, Printer, Download } from 'lucide-react';
import { HOTEL_IMAGES, MOVIE_PERK_DETAILS } from '../data/hotelData.ts';

interface MovieTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookNow: () => void;
  ticketsCount?: number;
  guestName?: string;
  bookingCode?: string;
}

export const MovieTicketModal: React.FC<MovieTicketModalProps> = ({
  isOpen,
  onClose,
  onBookNow,
  ticketsCount = 2,
  guestName = '萬秀尊榮貴賓',
  bookingCode = 'CKL-2026-VIP888',
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0f141f] border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-stone-800 bg-stone-900/60">
          <div className="flex items-center gap-2 text-amber-400">
            <Ticket className="w-5 h-5" />
            <h3 className="font-bold text-base sm:text-lg text-white font-serif">
              《大尾鱸鰻3》首映電影票兌換券樣張
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ticket Body */}
        <div className="p-5 sm:p-7 space-y-6">
          {/* Golden Ticket Voucher Card */}
          <div className="relative rounded-2xl bg-gradient-to-r from-amber-600/30 via-yellow-600/20 to-amber-700/30 border-2 border-dashed border-amber-400/80 p-5 sm:p-6 shadow-2xl overflow-hidden">
            {/* Watermark / decorative background */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-44 h-44 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-5 border-b border-amber-400/40 pb-5">
              <div className="flex items-center gap-4">
                <img
                  src={HOTEL_IMAGES.bossPortrait}
                  alt="豬哥亮"
                  className="w-14 h-14 rounded-full object-cover border-2 border-amber-400 shadow-md shrink-0"
                />
                <div>
                  <div className="text-[11px] font-mono tracking-widest text-amber-300 uppercase">
                    CHU KE-LIANG GRAND HOTEL KAOHSIUNG
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-white font-serif tracking-tight">
                    《大尾鱸鰻3》首映電影交換券
                  </div>
                  <div className="text-xs text-amber-200">
                    豬哥亮董事長親自簽核 ‧ 萬秀住宿貴賓特等專案
                  </div>
                </div>
              </div>

              <div className="text-center sm:text-right shrink-0">
                <div className="text-xs text-stone-300">贈送張數</div>
                <div className="text-3xl font-black text-amber-400 font-mono">
                  {ticketsCount} <span className="text-sm font-sans font-normal text-white">張</span>
                </div>
              </div>
            </div>

            {/* Ticket details grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 text-xs">
              <div>
                <span className="text-stone-400 block mb-0.5">持票貴賓</span>
                <span className="font-bold text-white text-sm">{guestName}</span>
              </div>
              <div>
                <span className="text-stone-400 block mb-0.5">飯店訂單編號</span>
                <span className="font-mono font-bold text-amber-300 text-sm">{bookingCode}</span>
              </div>
              <div>
                <span className="text-stone-400 block mb-0.5">適用影城</span>
                <span className="font-medium text-stone-200">全台威秀/國賓通用</span>
              </div>
              <div>
                <span className="text-stone-400 block mb-0.5">有效使用期限</span>
                <span className="font-mono text-emerald-400 font-medium">首映日起 180 天內</span>
              </div>
            </div>

            {/* Simulated Barcode & QR code verification */}
            <div className="pt-4 border-t border-amber-400/40 flex flex-col sm:flex-row items-center justify-between gap-4 bg-black/40 -mx-5 -mb-5 sm:-mx-6 sm:-mb-6 p-4 rounded-b-xl">
              <div className="flex items-center gap-3">
                <div className="bg-white p-1.5 rounded-lg">
                  <QrCode className="w-10 h-10 text-black" />
                </div>
                <div className="space-y-0.5">
                  <div className="font-mono text-xs text-amber-300 tracking-wider">
                    NO. 8888-2026-CKL-LOMAN3
                  </div>
                  <div className="text-[11px] text-stone-400">
                    到店辦理 Check-in 時，憑此券或訂房確認碼即可領取實體票券
                  </div>
                </div>
              </div>
              <div className="text-xs font-bold text-stone-950 bg-amber-400 px-3 py-1.5 rounded uppercase tracking-wider">
                ★ 官方認證 VIP
              </div>
            </div>
          </div>

          {/* Usage Instructions */}
          <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-2 text-xs text-stone-300">
            <h4 className="font-bold text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>觀影兌換說明</span>
            </h4>
            <ul className="list-disc list-inside space-y-1 text-stone-300 text-xs">
              <li>於入住本飯店辦理登記時，櫃檯將依房型發送實體《大尾鱸鰻3》首映電影票正本。</li>
              <li>可持票前往高雄 SKM Park 草衙道威秀影城（飯店有免費接駁專車）或全台特約影城劃位。</li>
              <li>不分平日、假日或國定連假皆可使用，亦可補差額升級 IMAX、4DX 特等廳。</li>
              <li>附贈萬秀大戲院爆米花及冬瓜檸檬冷飲折抵券。</li>
            </ul>
          </div>

          {/* Modal Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>儲存 / 列印票券樣張</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onBookNow();
              }}
              className="w-full sm:w-auto px-5 py-2.5 text-xs sm:text-sm font-bold text-stone-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:brightness-110 rounded-lg shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Ticket className="w-4 h-4" />
              <span>立即預訂客房並保留票券</span>
            </button>
          </div>

          {downloadSuccess && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-lg text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>票券樣張已準備就緒！</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
