import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, ArrowRight, Play } from 'lucide-react';

interface IntroVideoOverlayProps {
  onFinish?: () => void;
}

export const IntroVideoOverlay: React.FC<IntroVideoOverlayProps> = ({ onFinish }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isPlayBlocked, setIsPlayBlocked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClose = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsOpen(false);
      if (onFinish) onFinish();
    }, 600);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay with sound was blocked; mute and retry
        video.muted = true;
        setIsMuted(true);
        video.play().catch(() => {
          setIsPlayBlocked(true);
        });
      });
    }

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handleEnded = () => {
      handleClose();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-600 select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* ── Background Video Player ── */}
      <video
        ref={videoRef}
        src="/farminix_intro.mp4"
        className="w-full h-full object-cover sm:object-contain bg-black"
        autoPlay
        playsInline
        muted={isMuted}
        preload="auto"
      />

      {/* ── Top Bar Controls ── */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between z-20 pointer-events-auto">
        {/* Brand Badge */}
        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white text-xs font-bold tracking-wider uppercase">Farminix Intro</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.muted = !isMuted;
                setIsMuted(!isMuted);
              }
            }}
            className="px-3 py-1.5 bg-black/50 hover:bg-black/70 active:scale-95 text-white/90 rounded-full text-xs font-bold backdrop-blur-md border border-white/20 flex items-center gap-1.5 transition-all cursor-pointer"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-300" /> : <Volume2 className="w-4 h-4 text-emerald-300" />}
            <span className="hidden sm:inline">{isMuted ? 'Unmute' : 'Mute'}</span>
          </button>

          {/* Skip to Store */}
          <button
            onClick={handleClose}
            className="px-4 py-1.5 bg-purple-600/90 hover:bg-purple-600 active:scale-95 text-white rounded-full text-xs font-black backdrop-blur-md border border-purple-400/40 flex items-center gap-1.5 shadow-lg shadow-purple-900/50 transition-all cursor-pointer"
          >
            <span>Skip Intro</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ── Autoplay Blocked Fallback ── */}
      {isPlayBlocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-10 backdrop-blur-xs">
          <button
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.play();
                setIsPlayBlocked(false);
              }
            }}
            className="w-16 h-16 rounded-full bg-purple-600 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-2xl cursor-pointer"
          >
            <Play className="w-8 h-8 fill-white ml-1" />
          </button>
          <p className="text-white text-xs font-semibold mt-3">Click to start intro video</p>
        </div>
      )}

      {/* ── Bottom Progress Bar ── */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/15 z-20 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 via-emerald-400 to-yellow-400 transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
