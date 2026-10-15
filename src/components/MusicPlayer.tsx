import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Music,
  Disc3,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Radio,
  Sliders,
} from 'lucide-react';
import { showbizAudio, CHU_KE_LIANG_TRACKS, TrackInfo } from '../utils/audioEngine.ts';
import { HOTEL_IMAGES } from '../data/hotelData.ts';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<TrackInfo>(showbizAudio.getCurrentTrack());
  const [volume, setVolume] = useState(0.45);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    showbizAudio.setVolume(volume);
    showbizAudio.setOnStateChange((playing, track) => {
      setIsPlaying(playing);
      setCurrentTrack(track);
    });

    return () => {
      // Clean up on unmount
      showbizAudio.stop();
    };
  }, []);

  const handleTogglePlay = () => {
    setHasInteracted(true);
    const nowPlaying = showbizAudio.togglePlay();
    setIsPlaying(nowPlaying);
  };

  const handleTrackSelect = (idx: number) => {
    setHasInteracted(true);
    showbizAudio.playTrack(idx);
    setCurrentTrack(showbizAudio.getCurrentTrack());
    setIsPlaying(true);
  };

  const handleNext = () => {
    setHasInteracted(true);
    showbizAudio.playNext();
    setCurrentTrack(showbizAudio.getCurrentTrack());
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setHasInteracted(true);
    showbizAudio.playPrev();
    setCurrentTrack(showbizAudio.getCurrentTrack());
    setIsPlaying(true);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    showbizAudio.setVolume(val);
  };

  const handleToggleMute = () => {
    if (isMuted) {
      showbizAudio.setVolume(volume || 0.4);
      setIsMuted(false);
    } else {
      showbizAudio.setVolume(0);
      setIsMuted(true);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 select-none print:hidden">
      {/* Expanded Jukebox Console */}
      {isExpanded && (
        <div className="mb-3 w-80 sm:w-96 rounded-2xl bg-[#0f141f]/95 border-2 border-amber-500/50 p-5 shadow-2xl backdrop-blur-xl animate-fade-in text-stone-200 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
              <div>
                <h4 className="text-xs font-black text-amber-400 font-serif tracking-wider">
                  萬秀天王 ‧ 秀場經典金曲點唱機
                </h4>
                <div className="text-[10px] text-stone-400">
                  豬哥亮精選背景音樂 ‧ 專屬迎賓旋律
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 cursor-pointer"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Current Playing Track Card */}
          <div className="p-3 rounded-xl bg-gradient-to-r from-amber-950/60 to-stone-900 border border-amber-500/30 flex items-center gap-3">
            <div className="relative">
              <img
                src={HOTEL_IMAGES.bossPortrait}
                alt="豬哥亮"
                className={`w-12 h-12 rounded-full object-cover border-2 border-amber-400 ${
                  isPlaying ? 'animate-spin [animation-duration:5s]' : ''
                }`}
              />
              <div className="absolute -bottom-1 -right-1 bg-amber-400 text-stone-950 rounded-full p-0.5">
                <Music className="w-2.5 h-2.5" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm truncate font-serif">
                  {currentTrack.title}
                </span>
                {isPlaying && (
                  <span className="flex items-center gap-0.5 h-3">
                    <span className="w-0.5 h-3 bg-amber-400 animate-pulse" />
                    <span className="w-0.5 h-2 bg-amber-400 animate-pulse [animation-delay:0.2s]" />
                    <span className="w-0.5 h-3.5 bg-amber-400 animate-pulse [animation-delay:0.4s]" />
                  </span>
                )}
              </div>
              <p className="text-[11px] text-stone-300 truncate">{currentTrack.subtitle}</p>
              <div className="text-[10px] text-amber-400/90 font-mono mt-0.5">
                風格：{currentTrack.mood} · {currentTrack.bpm} BPM
              </div>
            </div>
          </div>

          {/* Player Transport Controls */}
          <div className="flex items-center justify-center gap-4 py-1">
            <button
              onClick={handlePrev}
              className="p-2 text-stone-400 hover:text-amber-400 hover:bg-stone-800 rounded-lg cursor-pointer transition-colors"
              title="上一首"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={handleTogglePlay}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-stone-950 flex items-center justify-center shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              title={isPlaying ? '暫停背景音樂' : '播放背景音樂'}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-stone-950" /> : <Play className="w-5 h-5 fill-stone-950 ml-0.5" />}
            </button>

            <button
              onClick={handleNext}
              className="p-2 text-stone-400 hover:text-amber-400 hover:bg-stone-800 rounded-lg cursor-pointer transition-colors"
              title="下一首"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3 p-2 bg-stone-900/60 rounded-xl border border-stone-800 text-xs">
            <button
              onClick={handleToggleMute}
              className="text-stone-400 hover:text-amber-400 cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-full accent-amber-400 h-1.5 bg-stone-700 rounded-lg cursor-pointer"
            />
            <span className="font-mono text-[10px] text-stone-400 w-8 text-right">
              {Math.round((isMuted ? 0 : volume) * 100)}%
            </span>
          </div>

          {/* Track Selection List */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
              精選秀場金曲清單
            </span>
            <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
              {CHU_KE_LIANG_TRACKS.map((t, idx) => {
                const isSelected = currentTrack.id === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleTrackSelect(idx)}
                    className={`w-full p-2 rounded-lg text-left text-xs transition-colors flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-amber-950/70 border border-amber-500/40 text-amber-300 font-bold'
                        : 'hover:bg-stone-800/80 text-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Disc3 className={`w-3.5 h-3.5 shrink-0 ${isSelected && isPlaying ? 'text-amber-400 animate-spin' : 'text-stone-500'}`} />
                      <span className="truncate">{t.title}</span>
                    </div>
                    <span className="font-mono text-[10px] text-stone-400 shrink-0">
                      {t.durationStr}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Boss Greeting Motto */}
          <div className="pt-2 border-t border-stone-800 text-center text-[11px] text-amber-300/90 italic font-serif">
            “大家邊聽歌邊看房間，祝你來小港大發財、好運旺旺來！”
          </div>
        </div>
      )}

      {/* Floating Pill Mini Bar */}
      <div className="flex items-center gap-2 bg-[#0e131d]/90 border border-amber-500/50 p-1.5 pl-3 rounded-full shadow-2xl backdrop-blur-md">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2.5 text-xs text-stone-200 hover:text-white cursor-pointer pr-1"
        >
          <div className="relative">
            <img
              src={HOTEL_IMAGES.bossPortrait}
              alt="豬哥亮"
              className={`w-7 h-7 rounded-full object-cover border border-amber-400 ${
                isPlaying ? 'animate-spin [animation-duration:5s]' : ''
              }`}
            />
            {isPlaying && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            )}
          </div>

          <div className="text-left hidden sm:block">
            <div className="font-bold text-amber-300 text-xs flex items-center gap-1 leading-none">
              <span>{currentTrack.title}</span>
              {isPlaying && <span className="text-[10px] text-emerald-400 font-normal">播放中</span>}
            </div>
            <div className="text-[10px] text-stone-400 leading-none mt-1">
              豬哥亮經典背景音樂
            </div>
          </div>
        </button>

        <div className="flex items-center gap-1 border-l border-stone-700/80 pl-2">
          {/* Quick Play/Pause button */}
          <button
            onClick={handleTogglePlay}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isPlaying
                ? 'bg-amber-400 text-stone-950 font-bold hover:brightness-110'
                : 'bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700'
            }`}
            title={isPlaying ? '暫停音樂' : '播放背景音樂'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
          </button>

          {/* Quick Mute button */}
          <button
            onClick={handleToggleMute}
            className="p-1.5 text-stone-400 hover:text-amber-400 rounded-full cursor-pointer"
            title={isMuted ? '取消靜音' : '靜音'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-stone-300" />}
          </button>

          {/* Toggle Expand */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-stone-400 hover:text-white rounded-full cursor-pointer"
            title="開啟點唱機面板"
          >
            {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
};
