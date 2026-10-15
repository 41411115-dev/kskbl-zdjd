/**
 * Chu Ke-liang Showbiz Synthesizer & Melody Player
 * Generates iconic 80s/90s Taiwanese variety show brass, synth trot, and big-band comedy tunes
 * using the Web Audio API. 100% resilient, zero external asset dependency.
 */

export interface TrackInfo {
  id: string;
  title: string;
  subtitle: string;
  durationStr: string;
  bpm: number;
  mood: string;
  notes: Array<{ pitch: number; dur: number; type?: 'melody' | 'bass' | 'chord' }>;
}

// Frequency helpers (Standard equal temperament)
const C3 = 130.81, D3 = 146.83, E3 = 164.81, F3 = 174.61, G3 = 196.00, A3 = 220.00, B3 = 246.94;
const C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23, G4 = 392.00, A4 = 440.00, B4 = 493.88;
const C5 = 523.25, D5 = 587.33, E5 = 659.25, F5 = 698.46, G5 = 783.99, A5 = 880.00;

export const CHU_KE_LIANG_TRACKS: TrackInfo[] = [
  {
    id: 'track-dong-shan',
    title: '《東山再起》',
    subtitle: '豬哥亮經典傳奇復出主題曲 ‧ 豪氣台語經典',
    durationStr: '0:48 (循環樂章)',
    bpm: 118,
    mood: '豪邁熱血 ‧ 台式演歌交響',
    notes: [
      // Intro fanfare (Brass stabs)
      { pitch: G4, dur: 0.25 }, { pitch: C5, dur: 0.25 }, { pitch: E5, dur: 0.5 },
      { pitch: D5, dur: 0.25 }, { pitch: C5, dur: 0.25 }, { pitch: D5, dur: 0.75 },
      { pitch: E5, dur: 0.25 }, { pitch: G5, dur: 0.5 }, { pitch: E5, dur: 0.25 },
      { pitch: D5, dur: 0.25 }, { pitch: C5, dur: 1.0 },

      // Main verse (Iconic pentatonic melody: 走過人生風風雨雨...)
      { pitch: G4, dur: 0.5 }, { pitch: A4, dur: 0.5 }, { pitch: C5, dur: 0.75 }, { pitch: D5, dur: 0.25 },
      { pitch: E5, dur: 0.5 }, { pitch: G5, dur: 0.5 }, { pitch: E5, dur: 1.0 },
      { pitch: D5, dur: 0.5 }, { pitch: C5, dur: 0.5 }, { pitch: A4, dur: 0.5 }, { pitch: G4, dur: 0.5 },
      { pitch: A4, dur: 0.5 }, { pitch: C5, dur: 1.0 },

      // Chorus hook (東山再起，笑看人生！)
      { pitch: E5, dur: 0.5 }, { pitch: G5, dur: 0.5 }, { pitch: A5, dur: 0.75 }, { pitch: G5, dur: 0.25 },
      { pitch: E5, dur: 0.5 }, { pitch: D5, dur: 0.5 }, { pitch: C5, dur: 1.0 },
      { pitch: D5, dur: 0.5 }, { pitch: E5, dur: 0.5 }, { pitch: D5, dur: 0.5 }, { pitch: C5, dur: 0.5 },
      { pitch: A4, dur: 0.5 }, { pitch: G4, dur: 0.5 }, { pitch: C5, dur: 1.5 },
    ],
  },
  {
    id: 'track-wan-xiu',
    title: '《萬秀之王》',
    subtitle: '豬哥亮秀場熱鬧迎賓組曲 ‧ 經典大樂隊大開場',
    durationStr: '0:36 (循環樂章)',
    bpm: 132,
    mood: '歡樂熱鬧 ‧ 秀場澎湃管樂',
    notes: [
      // Iconic Brass fanfare: "咚～咚～咚～萬秀之王！"
      { pitch: C4, dur: 0.2 }, { pitch: E4, dur: 0.2 }, { pitch: G4, dur: 0.2 }, { pitch: C5, dur: 0.6 },
      { pitch: B4, dur: 0.2 }, { pitch: A4, dur: 0.2 }, { pitch: G4, dur: 0.6 },
      { pitch: A4, dur: 0.2 }, { pitch: C5, dur: 0.2 }, { pitch: D5, dur: 0.2 }, { pitch: E5, dur: 0.6 },
      { pitch: D5, dur: 0.2 }, { pitch: C5, dur: 0.2 }, { pitch: G4, dur: 0.8 },

      // Upbeat swing groove
      { pitch: C5, dur: 0.3 }, { pitch: C5, dur: 0.3 }, { pitch: E5, dur: 0.3 }, { pitch: G5, dur: 0.5 },
      { pitch: F5, dur: 0.3 }, { pitch: E5, dur: 0.3 }, { pitch: D5, dur: 0.6 },
      { pitch: D5, dur: 0.3 }, { pitch: D5, dur: 0.3 }, { pitch: F5, dur: 0.3 }, { pitch: A5, dur: 0.5 },
      { pitch: G5, dur: 0.3 }, { pitch: F5, dur: 0.3 }, { pitch: E5, dur: 0.6 },

      // Climax stabs
      { pitch: G5, dur: 0.25 }, { pitch: E5, dur: 0.25 }, { pitch: C5, dur: 0.25 }, { pitch: G4, dur: 0.25 },
      { pitch: C5, dur: 1.2 },
    ],
  },
  {
    id: 'track-david-loman',
    title: '《大尾鱸鰻》',
    subtitle: '電影同名主題神曲 ‧ 鱸鰻出巡台客搖滾',
    durationStr: '0:42 (循環樂章)',
    bpm: 124,
    mood: '台味爆笑 ‧ 鱸鰻霸氣節奏',
    notes: [
      // Funky brass riff (Ice cream truck / Taiwanese disco trot)
      { pitch: A4, dur: 0.25 }, { pitch: A4, dur: 0.25 }, { pitch: C5, dur: 0.5 },
      { pitch: D5, dur: 0.25 }, { pitch: C5, dur: 0.25 }, { pitch: A4, dur: 0.5 },
      { pitch: G4, dur: 0.25 }, { pitch: A4, dur: 0.25 }, { pitch: C5, dur: 0.5 },
      { pitch: D5, dur: 0.5 }, { pitch: E5, dur: 1.0 },

      // Bouncy bass & melody line
      { pitch: E5, dur: 0.25 }, { pitch: G5, dur: 0.25 }, { pitch: A5, dur: 0.5 },
      { pitch: G5, dur: 0.25 }, { pitch: E5, dur: 0.25 }, { pitch: D5, dur: 0.5 },
      { pitch: C5, dur: 0.25 }, { pitch: D5, dur: 0.25 }, { pitch: E5, dur: 0.5 },
      { pitch: C5, dur: 0.5 }, { pitch: A4, dur: 1.0 },

      // Comedy punchline cadence
      { pitch: C5, dur: 0.2 }, { pitch: D5, dur: 0.2 }, { pitch: E5, dur: 0.4 },
      { pitch: G5, dur: 0.4 }, { pitch: E5, dur: 0.4 }, { pitch: D5, dur: 0.4 },
      { pitch: C5, dur: 1.4 },
    ],
  },
];

class ShowbizAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentTrackIdx: number = 0;
  private volume: number = 0.5;
  private masterGain: GainNode | null = null;
  private loopTimer: number | null = null;
  private activeOscillators: OscillatorNode[] = [];
  private onStateChangeCallback: ((isPlaying: boolean, track: TrackInfo) => void) | null = null;

  constructor() {
    // AudioContext will be initialized on first user interaction to comply with browser policy
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setOnStateChange(cb: (isPlaying: boolean, track: TrackInfo) => void) {
    this.onStateChangeCallback = cb;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentTrack(): TrackInfo {
    return CHU_KE_LIANG_TRACKS[this.currentTrackIdx];
  }

  public playTrack(index: number) {
    this.stop();
    this.currentTrackIdx = (index + CHU_KE_LIANG_TRACKS.length) % CHU_KE_LIANG_TRACKS.length;
    this.play();
  }

  public playNext() {
    this.playTrack(this.currentTrackIdx + 1);
  }

  public playPrev() {
    this.playTrack(this.currentTrackIdx - 1);
  }

  public togglePlay(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public play() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.isPlaying = true;
    this.activeOscillators = [];
    const track = CHU_KE_LIANG_TRACKS[this.currentTrackIdx];

    if (this.onStateChangeCallback) {
      this.onStateChangeCallback(true, track);
    }

    const scheduleSequence = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;

      const startTime = this.ctx.currentTime + 0.05;
      let noteTime = startTime;
      const beatSec = 60 / track.bpm;

      // Play notes with rich brass/synth harmonics
      track.notes.forEach((note) => {
        const noteDuration = note.dur * beatSec;

        // 1. Lead Brass / Synth Sawtooth Wave
        const oscLead = this.ctx!.createOscillator();
        const gainLead = this.ctx!.createGain();

        // 2. Warm sub-oscillator for fat vintage theater sound
        const oscSub = this.ctx!.createOscillator();
        const gainSub = this.ctx!.createGain();

        // Filter for warm brass envelope
        const filter = this.ctx!.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, noteTime);
        filter.frequency.exponentialRampToValueAtTime(600, noteTime + noteDuration);

        oscLead.type = 'sawtooth';
        oscLead.frequency.setValueAtTime(note.pitch, noteTime);

        // Sub octaves
        oscSub.type = 'triangle';
        oscSub.frequency.setValueAtTime(note.pitch * 0.5, noteTime);

        // Envelopes
        gainLead.gain.setValueAtTime(0.001, noteTime);
        gainLead.gain.linearRampToValueAtTime(0.25, noteTime + 0.04);
        gainLead.gain.exponentialRampToValueAtTime(0.001, noteTime + noteDuration * 0.95);

        gainSub.gain.setValueAtTime(0.001, noteTime);
        gainSub.gain.linearRampToValueAtTime(0.18, noteTime + 0.03);
        gainSub.gain.exponentialRampToValueAtTime(0.001, noteTime + noteDuration * 0.9);

        oscLead.connect(filter);
        oscSub.connect(filter);
        filter.connect(this.masterGain!);

        oscLead.start(noteTime);
        oscLead.stop(noteTime + noteDuration);
        oscSub.start(noteTime);
        oscSub.stop(noteTime + noteDuration);

        this.activeOscillators.push(oscLead, oscSub);

        // Add periodic drum/bass kicks for that signature Taiwanese tempo
        if (note.dur >= 0.5) {
          const oscKick = this.ctx!.createOscillator();
          const gainKick = this.ctx!.createGain();
          oscKick.type = 'sine';
          oscKick.frequency.setValueAtTime(110, noteTime);
          oscKick.frequency.exponentialRampToValueAtTime(45, noteTime + 0.15);
          gainKick.gain.setValueAtTime(0.3, noteTime);
          gainKick.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.15);
          oscKick.connect(this.masterGain!);
          oscKick.start(noteTime);
          oscKick.stop(noteTime + 0.16);
          this.activeOscillators.push(oscKick);
        }

        noteTime += noteDuration;
      });

      // Schedule next seamless loop
      const totalDurationSec = (noteTime - startTime);
      this.loopTimer = window.setTimeout(() => {
        if (this.isPlaying) {
          scheduleSequence();
        }
      }, totalDurationSec * 1000);
    };

    scheduleSequence();
  }

  public stop() {
    this.isPlaying = false;
    if (this.loopTimer) {
      clearTimeout(this.loopTimer);
      this.loopTimer = null;
    }
    this.activeOscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // Already stopped
      }
    });
    this.activeOscillators = [];

    if (this.onStateChangeCallback) {
      this.onStateChangeCallback(false, CHU_KE_LIANG_TRACKS[this.currentTrackIdx]);
    }
  }
}

// Global Singleton Instance
export const showbizAudio = new ShowbizAudioEngine();
