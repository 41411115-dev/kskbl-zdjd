import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Users,
  Ticket,
  Car,
  UtensilsCrossed,
  Sparkles,
  CheckCircle2,
  Crown,
  CreditCard,
  QrCode,
  Printer,
  ChevronRight,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { Room, Booking, Member } from '../types.ts';
import { ROOMS_DATA, HOTEL_IMAGES } from '../data/hotelData.ts';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoom?: Room | null;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
  member: Member | null;
  onSaveBooking: (booking: Booking) => void;
  onQuickJoinMember: (name: string, phone: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialRoom,
  initialCheckIn,
  initialCheckOut,
  initialGuests,
  member,
  onSaveBooking,
  onQuickJoinMember,
}) => {
  // Dates
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 2);
  const dayAfterStr = dayAfter.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(initialCheckIn || tomorrowStr);
  const [checkOut, setCheckOut] = useState(initialCheckOut || dayAfterStr);

  // Room
  const [selectedRoomId, setSelectedRoomId] = useState<string>(
    initialRoom ? initialRoom.id : ROOMS_DATA[0].id
  );

  // Guests
  const [adults, setAdults] = useState(initialGuests || 2);
  const [children, setChildren] = useState(0);

  // Member toggle
  const [joinMemberNow, setJoinMemberNow] = useState(false);

  // Add-ons
  const [addonShuttle, setAddonShuttle] = useState(true);
  const [addonBreakfast, setAddonBreakfast] = useState(true);
  const [addonExtraTickets, setAddonExtraTickets] = useState(0);
  const [addonSnack, setAddonSnack] = useState(false);

  // Guest details
  const [guestName, setGuestName] = useState(member ? member.name : '');
  const [guestPhone, setGuestPhone] = useState(member ? member.phone : '');
  const [guestEmail, setGuestEmail] = useState('');
  const [arrivalTime, setArrivalTime] = useState('15:00 - 17:00');
  const [notes, setNotes] = useState('');

  // Step state: 1 = Details/Customization, 2 = Success Confirmation
  const [step, setStep] = useState<1 | 2>(1);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (initialRoom) {
      setSelectedRoomId(initialRoom.id);
    }
  }, [initialRoom]);

  useEffect(() => {
    if (member) {
      setGuestName(member.name);
      setGuestPhone(member.phone);
    }
  }, [member]);

  if (!isOpen) return null;

  const currentRoom = ROOMS_DATA.find((r) => r.id === selectedRoomId) || ROOMS_DATA[0];

  // Calculate nights
  const dIn = new Date(checkIn);
  const dOut = new Date(checkOut);
  const diffTime = Math.max(dOut.getTime() - dIn.getTime(), 1000 * 60 * 60 * 24);
  const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

  const isEligibleMember = Boolean(member || joinMemberNow);

  // Price calculations
  const rawBasePrice = currentRoom.regularPrice * nights;
  const memberDiscount = isEligibleMember ? Math.round(rawBasePrice * 0.12) : 0;
  const discountedBasePrice = rawBasePrice - memberDiscount;

  // Add-ons cost
  const shuttleCost = addonShuttle ? (isEligibleMember ? 0 : 500) : 0;
  const breakfastCost = addonBreakfast ? 380 * (adults + children) * nights : 0;
  const extraTicketsCost = addonExtraTickets * 280;
  const snackCost = addonSnack ? 250 : 0;
  const totalAddons = shuttleCost + breakfastCost + extraTicketsCost + snackCost;

  const grandTotal = discountedBasePrice + totalAddons;
  const totalFreeTickets = currentRoom.movieTickets + addonExtraTickets;

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestPhone.trim() || !guestEmail.trim()) return;

    if (joinMemberNow && !member) {
      onQuickJoinMember(guestName.trim(), guestPhone.trim());
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingCode = `CKL-2026-X${randomSuffix}`;

    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      bookingCode,
      createdAt: new Date().toISOString(),
      roomId: currentRoom.id,
      roomName: currentRoom.name,
      roomImage: currentRoom.image,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      nights,
      guests: { adults, children },
      primaryGuest: {
        name: guestName.trim(),
        phone: guestPhone.trim(),
        email: guestEmail.trim(),
        arrivalEstimate: arrivalTime,
        notes: notes.trim(),
      },
      isMember: isEligibleMember,
      movieTicketsCount: totalFreeTickets,
      addons: {
        airportShuttle: addonShuttle,
        seafoodBreakfast: addonBreakfast,
        extraMovieTickets: addonExtraTickets,
        snackBucket: addonSnack,
      },
      pricing: {
        basePrice: rawBasePrice,
        memberDiscount,
        addonsTotal: totalAddons,
        totalAmount: grandTotal,
      },
      status: 'confirmed',
    };

    onSaveBooking(newBooking);
    setConfirmedBooking(newBooking);
    setStep(2);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#0f141f] border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-stone-800 bg-stone-900/80">
          <div className="flex items-center gap-2 text-amber-400">
            <Calendar className="w-5 h-5" />
            <h3 className="font-bold text-base sm:text-lg text-white font-serif">
              {step === 1 ? '線上即時預訂客房 ‧ 入住即贈大尾鱸鰻3電影票' : '預訂成功確認函 & 電子電影票'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Booking Form */}
        {step === 1 && (
          <form onSubmit={handleConfirmReservation} className="p-4 sm:p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Room & Dates & Addons */}
              <div className="lg:col-span-7 space-y-5">
                {/* Select Room */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    選擇入住房型
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {ROOMS_DATA.map((r) => (
                      <div
                        key={r.id}
                        onClick={() => setSelectedRoomId(r.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                          selectedRoomId === r.id
                            ? 'bg-amber-950/40 border-amber-500 text-white shadow-md'
                            : 'bg-stone-900/60 border-stone-800 text-stone-300 hover:border-stone-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={r.image}
                            alt={r.name}
                            className="w-14 h-12 rounded-lg object-cover shrink-0"
                          />
                          <div>
                            <div className="text-sm font-bold">{r.name}</div>
                            <div className="text-[11px] text-amber-300 flex items-center gap-1.5">
                              <Ticket className="w-3 h-3" />
                              <span>送《大尾鱸鰻3》電影票 {r.movieTickets} 張</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="text-sm font-bold font-mono text-amber-400">
                            NT$ {(isEligibleMember ? r.memberPrice : r.regularPrice).toLocaleString()}
                          </div>
                          <div className="text-[10px] text-stone-500">每晚</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dates & Guests */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">入住日期</label>
                    <input
                      type="date"
                      value={checkIn}
                      min={todayStr}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-700 rounded-lg p-2 text-xs text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">退房日期</label>
                    <input
                      type="date"
                      value={checkOut}
                      min={checkIn}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-700 rounded-lg p-2 text-xs text-white"
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-semibold text-stone-300 mb-1">成人貴賓</label>
                    <select
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      className="w-full bg-stone-900 border border-stone-700 rounded-lg p-2 text-xs text-white"
                    >
                      <option value={1}>1 位</option>
                      <option value={2}>2 位</option>
                      <option value={3}>3 位</option>
                      <option value={4}>4 位</option>
                    </select>
                  </div>
                </div>

                {/* Exclusive Add-ons */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                    客房加值禮遇升級
                  </span>
                  <div className="space-y-2 text-xs">
                    {/* Airport shuttle */}
                    <label className="flex items-center justify-between p-3 rounded-lg bg-stone-900/60 border border-stone-800 cursor-pointer hover:border-amber-500/30">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={addonShuttle}
                          onChange={(e) => setAddonShuttle(e.target.checked)}
                          className="accent-amber-400"
                        />
                        <div>
                          <div className="font-semibold text-white flex items-center gap-1.5">
                            <Car className="w-3.5 h-3.5 text-amber-400" />
                            <span>小港國際機場 / 左營高鐵 豪華商務接駁</span>
                          </div>
                          <div className="text-[11px] text-stone-400">專人於航廈/月台舉牌專車迎接</div>
                        </div>
                      </div>
                      <span className="font-bold text-emerald-400">
                        {isEligibleMember ? '會員免費招待' : '+NT$ 500'}
                      </span>
                    </label>

                    {/* Breakfast */}
                    <label className="flex items-center justify-between p-3 rounded-lg bg-stone-900/60 border border-stone-800 cursor-pointer hover:border-amber-500/30">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={addonBreakfast}
                          onChange={(e) => setAddonBreakfast(e.target.checked)}
                          className="accent-amber-400"
                        />
                        <div>
                          <div className="font-semibold text-white flex items-center gap-1.5">
                            <UtensilsCrossed className="w-3.5 h-3.5 text-amber-400" />
                            <span>萬秀傳奇海鮮百匯活力早餐 ({adults} 人份)</span>
                          </div>
                          <div className="text-[11px] text-stone-400">現煮高雄海產小卷米粉、台式美饌</div>
                        </div>
                      </div>
                      <span className="font-bold text-amber-400">
                        +NT$ {(380 * adults * nights).toLocaleString()}
                      </span>
                    </label>

                    {/* Extra Movie Tickets */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-stone-900/60 border border-stone-800">
                      <div className="flex items-center gap-2">
                        <Ticket className="w-4 h-4 text-amber-400 shrink-0" />
                        <div>
                          <div className="font-semibold text-white">
                            加購《大尾鱸鰻3》首映電影票
                          </div>
                          <div className="text-[11px] text-stone-400">
                            已免費贈送 {currentRoom.movieTickets} 張，加購享特惠 NT$280/張
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setAddonExtraTickets(Math.max(0, addonExtraTickets - 1))}
                          className="w-6 h-6 rounded bg-stone-800 text-stone-300 font-bold flex items-center justify-center hover:bg-stone-700 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="font-mono text-sm font-bold text-white w-4 text-center">
                          {addonExtraTickets}
                        </span>
                        <button
                          type="button"
                          onClick={() => setAddonExtraTickets(addonExtraTickets + 1)}
                          className="w-6 h-6 rounded bg-stone-800 text-stone-300 font-bold flex items-center justify-center hover:bg-stone-700 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Guest Info & Price Summary */}
              <div className="lg:col-span-5 space-y-5">
                {/* Guest Contact Form */}
                <div className="p-4 rounded-xl bg-stone-900/90 border border-stone-800 space-y-3">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    入住代表貴賓資料
                  </h4>

                  <div>
                    <label className="block text-[11px] text-stone-300 mb-1">姓名 *</label>
                    <input
                      type="text"
                      placeholder="請填寫證件真實姓名"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-stone-300 mb-1">手機號碼 *</label>
                      <input
                        type="tel"
                        placeholder="0912-345-678"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-stone-300 mb-1">預計抵達時間</label>
                      <select
                        value={arrivalTime}
                        onChange={(e) => setArrivalTime(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2 text-xs text-white"
                      >
                        <option value="15:00 - 17:00">15:00 - 17:00</option>
                        <option value="17:00 - 19:00">17:00 - 19:00</option>
                        <option value="19:00 - 21:00">19:00 - 21:00</option>
                        <option value="21:00 以後">21:00 以後（夜間）</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-stone-300 mb-1">電子信箱 *</label>
                    <input
                      type="email"
                      placeholder="接收訂房確認函與電子票券"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-stone-300 mb-1">特殊需求備註</label>
                    <input
                      type="text"
                      placeholder="例：航班班次、嬰兒床需求、高樓層偏好"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Member 88% Discount Promo Box */}
                {!member ? (
                  <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40 space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={joinMemberNow}
                        onChange={(e) => setJoinMemberNow(e.target.checked)}
                        className="accent-amber-400 w-4 h-4 cursor-pointer"
                      />
                      <span className="text-xs font-bold text-amber-300">
                        一鍵免費加入萬秀會員（現省 NT$ {Math.round(rawBasePrice * 0.12).toLocaleString()}！）
                      </span>
                    </label>
                    <p className="text-[11px] text-stone-400 pl-6 leading-tight">
                      勾選即享全房型牌價 88 折直抵，免收會費，並享機場商務接駁免費升級。
                    </p>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-amber-300 font-bold">
                      <Crown className="w-4 h-4 text-amber-400" />
                      <span>萬秀金牌尊榮會員 ({member.name})</span>
                    </div>
                    <span className="text-emerald-400 font-bold font-mono">已套用 88 折</span>
                  </div>
                )}

                {/* Price Summary Breakdown */}
                <div className="p-4 rounded-xl bg-black/50 border border-stone-800 space-y-2.5 text-xs">
                  <div className="flex justify-between text-stone-400">
                    <span>
                      {currentRoom.name} ({nights} 晚)
                    </span>
                    <span className="font-mono text-stone-200">
                      NT$ {rawBasePrice.toLocaleString()}
                    </span>
                  </div>

                  {memberDiscount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span className="flex items-center gap-1">
                        <Crown className="w-3.5 h-3.5" />
                        萬秀會員專屬 88 折優惠
                      </span>
                      <span className="font-mono font-bold">- NT$ {memberDiscount.toLocaleString()}</span>
                    </div>
                  )}

                  {totalAddons > 0 && (
                    <div className="flex justify-between text-stone-400">
                      <span>加值服務與餐飲費用</span>
                      <span className="font-mono text-stone-200">
                        + NT$ {totalAddons.toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-stone-800 flex justify-between items-baseline">
                    <div className="space-y-0.5">
                      <span className="text-sm font-bold text-white block">應付總計 (含稅)</span>
                      <span className="text-[11px] text-amber-400">
                        ★ 贈送《大尾鱸鰻3》電影票 {totalFreeTickets} 張
                      </span>
                    </div>
                    <div className="text-2xl font-black text-amber-400 font-mono">
                      NT$ {grandTotal.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full cursor-pointer py-3.5 px-4 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:brightness-110 active:scale-[0.98] text-stone-950 font-black text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>立即送出預訂 ‧ 領取電影票</span>
                  <ChevronRight className="w-4 h-4 text-stone-950" />
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Step 2: Confirmation & Digital Movie Ticket Voucher */}
        {step === 2 && confirmedBooking && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-400 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-extrabold text-white font-serif">
                恭喜您！訂房成功！
              </h3>
              <p className="text-xs sm:text-sm text-stone-300">
                感謝您預訂豬哥亮小港國際大飯店，確認函已寄發至您的信箱，現場櫃檯憑訂單編號辦理入住！
              </p>
            </div>

            {/* Boarding pass style confirmation */}
            <div className="rounded-2xl bg-gradient-to-r from-amber-950/60 to-stone-900 border-2 border-amber-400/60 p-5 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-amber-500/30 pb-4">
                <div>
                  <span className="text-[11px] text-amber-400 font-mono tracking-wider">
                    RESERVATION CODE
                  </span>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-white">
                    {confirmedBooking.bookingCode}
                  </div>
                </div>
                <div className="text-center sm:text-right">
                  <span className="text-xs text-stone-400 block">入住日期區間</span>
                  <span className="font-bold text-amber-300 text-sm">
                    {confirmedBooking.checkInDate} ~ {confirmedBooking.checkOutDate} ({confirmedBooking.nights} 晚)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-stone-400 block mb-0.5">預訂房型</span>
                  <span className="font-bold text-white">{confirmedBooking.roomName}</span>
                </div>
                <div>
                  <span className="text-stone-400 block mb-0.5">入住貴賓</span>
                  <span className="font-bold text-white">{confirmedBooking.primaryGuest.name}</span>
                </div>
                <div>
                  <span className="text-stone-400 block mb-0.5">贈送大尾鱸鰻3票券</span>
                  <span className="font-bold text-amber-400 font-mono text-sm">
                    {confirmedBooking.movieTicketsCount} 張
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 block mb-0.5">實付總額</span>
                  <span className="font-bold text-white font-mono text-sm">
                    NT$ {confirmedBooking.pricing.totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Digital Movie Ticket Pass & QR code */}
              <div className="pt-4 border-t border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 bg-black/40 p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-lg shrink-0">
                    <QrCode className="w-12 h-12 text-black" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-amber-300">
                      ★ 《大尾鱸鰻3》首映電影票兌換電子憑證
                    </div>
                    <div className="text-[11px] text-stone-400">
                      入住登記時請出示此 QR Code，飯店櫃檯將奉上實體電影票及迎賓爆米花！
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 text-xs font-bold text-stone-950 bg-amber-400 rounded-lg hover:bg-amber-300 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>列印或儲存憑證</span>
                </button>
              </div>
            </div>

            {/* Close / Return Button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={onClose}
                className="px-6 py-2.5 text-xs font-bold text-white bg-stone-800 hover:bg-stone-700 rounded-lg cursor-pointer"
              >
                關閉並返回官網
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
