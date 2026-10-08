"use client";
import { useState, useRef, useEffect } from "react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  const skip = (amount) => {
    if (audioRef.current) {
      audioRef.current.currentTime += amount;
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const currentTime = audioRef.current ? audioRef.current.currentTime : 0;
  const remainingTime = audioRef.current ? audioRef.current.duration - audioRef.current.currentTime : 30;

  return (
    <div className="rounded-2xl border border-white/45 bg-white/30 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-2xl backdrop-saturate-150 h-[150px] w-[320px] !p-4">
      <audio 
        ref={audioRef}
        src="https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/77/3d/5c/773d5c07-9fc9-72aa-1a6d-54bd7d37fadb/mzaf_6074514444011910273.plus.aac.p.m4a" 
        preload="none" 
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
      <div className="flex gap-3.5">
        <img src="images/album-psycho.jpg" alt="Psycho Killer album cover" draggable="false" className="h-[72px] w-[72px] shrink-0 rounded-lg object-cover shadow-inner" />
        <div className="min-w-0 flex-1 pt-1">
          <p className="truncate text-[13px] font-semibold text-black/85">Psycho Killer</p>
          <p className="truncate text-[11px] text-black/45">Talking Heads — Talking Heads: 77</p>
          <div className="mt-2.5 flex items-center gap-5 text-black/70">
            <button onClick={() => skip(-10)} aria-label="Back 10 seconds" className="hover:text-black">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M6 6h2v12H6zM20 6l-10 6 10 6z" /></svg>
            </button>
            <button onClick={togglePlay} aria-label="Play" className="hover:text-black">
              {isPlaying ? (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
              )}
            </button>
            <button onClick={() => skip(10)} aria-label="Forward 10 seconds" className="hover:text-black">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M16 6h2v12h-2zM4 6l10 6-10 6z" /></svg>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <div className="h-[3px] w-full rounded-full bg-black/10 overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full rounded-full bg-black/55" style={{width: `${progress}%`}} />
        </div>
        <div className="mt-1 flex justify-between text-[9px] tabular-nums text-black/35">
          <span>{formatTime(currentTime)}</span>
          <span>-{formatTime(remainingTime)}</span>
        </div>
      </div>
    </div>
  );
}
