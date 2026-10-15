/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { MoviePromoSection } from './components/MoviePromoSection.tsx';
import { RoomCatalog } from './components/RoomCatalog.tsx';
import { MemberClubSection } from './components/MemberClubSection.tsx';
import { DiningFacilitiesSection } from './components/DiningFacilitiesSection.tsx';
import { XiaogangGuideSection } from './components/XiaogangGuideSection.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { Footer } from './components/Footer.tsx';
import { BookingModal } from './components/BookingModal.tsx';
import { MovieTicketModal } from './components/MovieTicketModal.tsx';
import { RoomDetailModal } from './components/RoomDetailModal.tsx';
import { MyBookingsDrawer } from './components/MyBookingsDrawer.tsx';
import { MembershipModal } from './components/MembershipModal.tsx';
import { AdminPortal } from './components/admin/AdminPortal.tsx';
import { MusicPlayer } from './components/MusicPlayer.tsx';
import { showbizAudio } from './utils/audioEngine.ts';
import { Room, Booking, Member } from './types.ts';
import { ROOMS_DATA } from './data/hotelData.ts';

export default function App() {
  // Mode State: Frontend vs. Backend Admin
  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('ckl_hotel_is_admin');
      return saved === 'true';
    } catch {
      return false;
    }
  });

  // Rooms State (allows Admin to adjust prices, tickets count, etc.)
  const [rooms, setRooms] = useState<Room[]>(() => {
    try {
      const saved = localStorage.getItem('ckl_hotel_rooms');
      return saved ? JSON.parse(saved) : ROOMS_DATA;
    } catch {
      return ROOMS_DATA;
    }
  });

  // Current Logged-in Member State
  const [member, setMember] = useState<Member | null>(() => {
    try {
      const saved = localStorage.getItem('ckl_hotel_member');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // All Registered Members (for Admin Directory)
  const [membersList, setMembersList] = useState<Member[]>(() => {
    try {
      const saved = localStorage.getItem('ckl_hotel_all_members');
      if (saved) return JSON.parse(saved);
      return [
        {
          name: '林萬秀',
          phone: '0912-345-678',
          tier: '鱸鰻鑽石VIP',
          points: 1680,
          joinDate: '2026-09-15',
          totalSpent: 38400,
          bookingsCount: 3,
        },
        {
          name: '陳大偉',
          phone: '0988-888-888',
          tier: '萬秀金牌卡',
          points: 888,
          joinDate: '2026-09-28',
          totalSpent: 26058,
          bookingsCount: 1,
        },
        {
          name: '黃小港',
          phone: '0933-777-999',
          tier: '萬秀金牌卡',
          points: 666,
          joinDate: '2026-10-01',
          totalSpent: 8096,
          bookingsCount: 2,
        },
      ];
    } catch {
      return [];
    }
  });

  // Bookings State
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('ckl_hotel_bookings');
      if (saved) return JSON.parse(saved);
      const initialDemo: Booking = {
        id: 'demo-booking-01',
        bookingCode: 'CKL-2026-VIP888',
        createdAt: new Date().toISOString(),
        roomId: 'room-presidential',
        roomName: '萬秀巨星總統套房',
        roomImage: ROOMS_DATA[0].image,
        checkInDate: '2026-10-10',
        checkOutDate: '2026-10-12',
        nights: 2,
        guests: { adults: 2, children: 0 },
        primaryGuest: {
          name: '陳大偉',
          phone: '0988-888-888',
          email: 'vip@chukeliang-grandhotel.com.tw',
          arrivalEstimate: '15:00 - 17:00',
          notes: '請安排高樓層景觀房，期待觀賞大尾鱸鰻3！',
        },
        isMember: true,
        movieTicketsCount: 4,
        movieTicketsClaimed: false,
        addons: {
          airportShuttle: true,
          seafoodBreakfast: true,
          extraMovieTickets: 0,
          snackBucket: true,
        },
        pricing: {
          basePrice: 27600,
          memberDiscount: 3312,
          addonsTotal: 1770,
          totalAmount: 26058,
        },
        status: 'confirmed',
      };
      return [initialDemo];
    } catch {
      return [];
    }
  });

  // Boss Speech Quote State
  const [bossQuote, setBossQuote] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('ckl_hotel_boss_quote');
      return (
        saved ||
        '諸位鄉親大家好！我是豬哥亮！來小港住阮這間飯店，不只住好、吃霸、看飛機，我閣送你去看《大尾鱸鰻3》，祝大家健康快樂大賺錢啦！'
      );
    } catch {
      return '諸位鄉親大家好！我是豬哥亮！來小港住阮這間飯店，不只住好、吃霸、看飛機，我閣送你去看《大尾鱸鰻3》，祝大家健康快樂大賺錢啦！';
    }
  });

  // Modals Visibility
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isMoviePerkModalOpen, setIsMoviePerkModalOpen] = useState(false);
  const [isMembershipModalOpen, setIsMembershipModalOpen] = useState(false);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [isRoomDetailModalOpen, setIsRoomDetailModalOpen] = useState(false);

  // Selected Data
  const [selectedRoomForDetail, setSelectedRoomForDetail] = useState<Room | null>(null);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<Room | null>(null);
  const [activeTicketBooking, setActiveTicketBooking] = useState<Booking | null>(null);

  // Persistence
  useEffect(() => {
    localStorage.setItem('ckl_hotel_is_admin', String(isAdminMode));
  }, [isAdminMode]);

  useEffect(() => {
    localStorage.setItem('ckl_hotel_rooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    if (member) {
      localStorage.setItem('ckl_hotel_member', JSON.stringify(member));
    } else {
      localStorage.removeItem('ckl_hotel_member');
    }
  }, [member]);

  useEffect(() => {
    localStorage.setItem('ckl_hotel_all_members', JSON.stringify(membersList));
  }, [membersList]);

  useEffect(() => {
    localStorage.setItem('ckl_hotel_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('ckl_hotel_boss_quote', bossQuote);
  }, [bossQuote]);

  // Frontend Member Login / Join
  const handleLogin = (name: string, phone: string) => {
    const newMember: Member = {
      name,
      phone,
      tier: '萬秀金牌卡',
      points: 888,
      joinDate: new Date().toISOString().split('T')[0],
      totalSpent: 0,
      bookingsCount: 0,
    };
    setMember(newMember);

    // Also add to admin members list if not existing
    setMembersList((prev) => {
      const exists = prev.find((m) => m.phone === phone);
      if (exists) return prev;
      return [newMember, ...prev];
    });
  };

  const handleLogout = () => {
    setMember(null);
  };

  // Frontend Booking Handlers
  const handleSaveBooking = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' } : b))
    );
  };

  const handleOpenRoomDetail = (room: Room) => {
    setSelectedRoomForDetail(room);
    setIsRoomDetailModalOpen(true);
  };

  const handleOpenBookingWithRoom = (room: Room) => {
    setSelectedRoomForBooking(room);
    setIsBookingModalOpen(true);
  };

  const handleHeroSearch = (params: {
    checkIn: string;
    checkOut: string;
    roomId: string;
    guests: number;
    useMemberDiscount: boolean;
  }) => {
    const matchedRoom = rooms.find((r) => r.id === params.roomId) || rooms[0];
    setSelectedRoomForBooking(matchedRoom);
    setIsBookingModalOpen(true);
  };

  const handleViewTicketFromBooking = (booking: Booking) => {
    setActiveTicketBooking(booking);
    setIsMoviePerkModalOpen(true);
  };

  // Admin Specific Handlers
  const handleUpdateBookingStatus = (id: string, newStatus: Booking['status']) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
  };

  const handleToggleTicketsClaimed = (id: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, movieTicketsClaimed: !b.movieTicketsClaimed } : b
      )
    );
  };

  const handleDeleteBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const handleAddManualBooking = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleAddMember = (newMember: Member) => {
    setMembersList((prev) => [newMember, ...prev]);
  };

  const handleUpdateMemberPoints = (phone: string, addedPoints: number) => {
    setMembersList((prev) =>
      prev.map((m) =>
        m.phone === phone ? { ...m, points: m.points + addedPoints } : m
      )
    );
  };

  const handleUpgradeMemberTier = (phone: string, tier: Member['tier']) => {
    setMembersList((prev) =>
      prev.map((m) => (m.phone === phone ? { ...m, tier } : m))
    );
  };

  const handleUpdateRoom = (updatedRoom: Room) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === updatedRoom.id ? updatedRoom : r))
    );
  };

  const handleResetDefaultRooms = () => {
    setRooms(ROOMS_DATA);
  };

  const handleUpdateBossQuote = (newQuote: string) => {
    setBossQuote(newQuote);
  };

  // If in Admin Mode, render the full Admin Portal
  if (isAdminMode) {
    return (
      <>
        <AdminPortal
          onBackToWebsite={() => setIsAdminMode(false)}
          bookings={bookings}
          members={membersList}
          rooms={rooms}
          bossQuote={bossQuote}
          onUpdateBookingStatus={handleUpdateBookingStatus}
          onToggleTicketsClaimed={handleToggleTicketsClaimed}
          onDeleteBooking={handleDeleteBooking}
          onAddManualBooking={handleAddManualBooking}
          onAddMember={handleAddMember}
          onUpdateMemberPoints={handleUpdateMemberPoints}
          onUpgradeMemberTier={handleUpgradeMemberTier}
          onUpdateRoom={handleUpdateRoom}
          onResetDefaultRooms={handleResetDefaultRooms}
          onUpdateBossQuote={handleUpdateBossQuote}
        />
        <MusicPlayer />
      </>
    );
  }

  // Otherwise render Frontend Guest Website
  return (
    <div className="min-h-screen bg-[#0b0f17] text-stone-100 flex flex-col selection:bg-amber-500 selection:text-black">
      {/* Navigation */}
      <Navbar
        member={member}
        onOpenLogin={() => setIsMembershipModalOpen(true)}
        onOpenBooking={() => {
          setSelectedRoomForBooking(null);
          setIsBookingModalOpen(true);
        }}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        onOpenAdmin={() => setIsAdminMode(true)}
        bookingCount={bookings.filter((b) => b.status !== 'cancelled').length}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onSearch={handleHeroSearch}
          onOpenMoviePerk={() => setIsMoviePerkModalOpen(true)}
          isMember={Boolean(member)}
          bossQuote={bossQuote}
          onPlayMusic={() => showbizAudio.togglePlay()}
        />

        {/* Free Movie Ticket Special Feature */}
        <MoviePromoSection
          onBookNow={() => {
            setSelectedRoomForBooking(rooms[1]); // default to David Loman themed suite
            setIsBookingModalOpen(true);
          }}
          onPreviewTicket={() => setIsMoviePerkModalOpen(true)}
        />

        {/* Room Catalog & Direct Booking */}
        <RoomCatalog
          isMember={Boolean(member)}
          onSelectRoomForBooking={handleOpenBookingWithRoom}
          onViewRoomDetails={handleOpenRoomDetail}
          onOpenMembershipModal={() => setIsMembershipModalOpen(true)}
        />

        {/* Member VIP Club */}
        <MemberClubSection
          member={member}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />

        {/* Dining & Premier Facilities */}
        <DiningFacilitiesSection />

        {/* Kaohsiung Xiaogang Guide & Transport */}
        <XiaogangGuideSection />

        {/* FAQs */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => {
          setSelectedRoomForBooking(null);
          setIsBookingModalOpen(true);
        }}
        onOpenMoviePerk={() => setIsMoviePerkModalOpen(true)}
        onOpenAdmin={() => setIsAdminMode(true)}
      />

      {/* Modals & Drawers */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialRoom={selectedRoomForBooking}
        member={member}
        onSaveBooking={handleSaveBooking}
        onQuickJoinMember={handleLogin}
      />

      <MovieTicketModal
        isOpen={isMoviePerkModalOpen}
        onClose={() => {
          setIsMoviePerkModalOpen(false);
          setActiveTicketBooking(null);
        }}
        onBookNow={() => {
          setIsMoviePerkModalOpen(false);
          setIsBookingModalOpen(true);
        }}
        ticketsCount={
          activeTicketBooking ? activeTicketBooking.movieTicketsCount : 2
        }
        guestName={
          activeTicketBooking
            ? activeTicketBooking.primaryGuest.name
            : member
            ? member.name
            : '萬秀尊榮貴賓'
        }
        bookingCode={
          activeTicketBooking
            ? activeTicketBooking.bookingCode
            : 'CKL-2026-VIP888'
        }
      />

      <RoomDetailModal
        isOpen={isRoomDetailModalOpen}
        room={selectedRoomForDetail}
        onClose={() => {
          setIsRoomDetailModalOpen(false);
          setSelectedRoomForDetail(null);
        }}
        onBookRoom={(room) => {
          setIsRoomDetailModalOpen(false);
          handleOpenBookingWithRoom(room);
        }}
        isMember={Boolean(member)}
      />

      <MyBookingsDrawer
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        bookings={bookings}
        onOpenBooking={() => {
          setIsMyBookingsOpen(false);
          setIsBookingModalOpen(true);
        }}
        onViewTicket={handleViewTicketFromBooking}
        onCancelBooking={handleCancelBooking}
      />

      <MembershipModal
        isOpen={isMembershipModalOpen}
        onClose={() => setIsMembershipModalOpen(false)}
        member={member}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      {/* Chu Ke-liang Showbiz Jukebox Floating Music Player */}
      <MusicPlayer />
    </div>
  );
}
