import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

/* 🔹 IMPORT VIDEOS */
import v1 from "../assets/videos/1.mp4";
import v2 from "../assets/videos/2.mp4";
import v3 from "../assets/videos/3.mp4";
import v4 from "../assets/videos/4.mp4";
import v5 from "../assets/videos/5.mp4";
import v6 from "../assets/videos/6.mp4";
import v7 from "../assets/videos/7.mp4";
import v8 from "../assets/videos/8.mp4";
import v9 from "../assets/videos/9.mp4";
import v10 from "../assets/videos/10.mp4";
import v11 from "../assets/videos/11.mp4";
import v12 from "../assets/videos/12.mp4";
import v13 from "../assets/videos/13.mp4";
import v14 from "../assets/videos/14.mp4";
import v15 from "../assets/videos/15.mp4";
import v16 from "../assets/videos/16.mp4";
import v17 from "../assets/videos/17.mp4";
import v18 from "../assets/videos/18.mp4";
import v19 from "../assets/videos/19.mp4";
import v20 from "../assets/videos/20.mp4";

const videos = [
  v1, v2, v3, v4, v5,
  v6, v7, v8, v9, v10,
  v11, v12, v13, v14, v15,
  v16, v17, v18, v19, v20
];

interface OrganicReelsPageProps {
  onNavigate?: (page: string) => void;
}

export function OrganicReelsPage({ onNavigate }: OrganicReelsPageProps) {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const [showBranding, setShowBranding] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number | null>(null);
  const scrollLock = useRef(false);

  /* ▶️ Auto play on change */
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Handle autoplay errors
      });
      setIsPlaying(true);
    }
  }, [current]);

  /* Hide branding after 3 seconds */
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBranding(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  /* Toggle play/pause */
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  /* ⌨️ Arrow keys */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" && current < videos.length - 1) {
        setDirection(1);
        setCurrent(c => c + 1);
      }
      if (e.key === "ArrowUp" && current > 0) {
        setDirection(-1);
        setCurrent(c => c - 1);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current]);

  /* 🖱️ Mouse / Trackpad scroll */
  const handleWheel = (e: React.WheelEvent) => {
    if (scrollLock.current) return;
    scrollLock.current = true;

    if (e.deltaY > 0 && current < videos.length - 1) {
      setDirection(1);
      setCurrent(c => c + 1);
    } else if (e.deltaY < 0 && current > 0) {
      setDirection(-1);
      setCurrent(c => c - 1);
    }

    setTimeout(() => {
      scrollLock.current = false;
    }, 600);
  };

  /* 📱 Touch swipe */
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;

    const diff = touchStartY.current - e.changedTouches[0].clientY;

    if (diff > 50 && current < videos.length - 1) {
      setDirection(1);
      setCurrent(c => c + 1);
    } else if (diff < -50 && current > 0) {
      setDirection(-1);
      setCurrent(c => c - 1);
    }

    touchStartY.current = null;
  };

  return (
    <div
      className="h-screen w-full bg-black flex items-center justify-center overflow-hidden relative select-none"
      onWheel={handleWheel}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* 🔙 BACK BUTTON */}
      <button
        onClick={() => onNavigate?.("farmer-dashboard")}
        className="absolute top-6 left-6 z-50 bg-black/70 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/90 transition-all duration-300 hover:scale-110"
      >
        <ArrowLeft size={24} />
      </button>

      {/* 🎨 ORGANIC FARMING BRANDING */}
      <AnimatePresence>
        {showBranding && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="absolute top-6 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="bg-black/70 backdrop-blur-sm px-8 py-3 rounded-full shadow-2xl">
              <h1 className="text-white text-xl font-bold tracking-wide">
                ORGANIC FARMING
              </h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 📊 VIDEO COUNTER */}
      <div className="absolute top-6 right-6 z-40 bg-black/70 backdrop-blur-sm px-5 py-2 rounded-full">
        <p className="text-white text-sm font-semibold">
          {current + 1} / {videos.length}
        </p>
      </div>

      {/* 🎥 PORTRAIT VIDEO CONTAINER */}
      <motion.div
        ref={containerRef}
        className="relative h-full aspect-[9/16] bg-black overflow-hidden"
        key={current}
        initial={{
          y: direction > 0 ? "100%" : "-100%",
          opacity: 0.8,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 280,
          damping: 28,
          opacity: { duration: 0.4 },
        }}
      >
        <div
          className="relative h-full w-full"
          onClick={togglePlayPause}
        >
          <video
            ref={videoRef}
            src={videos[current]}
            className="h-full w-full object-cover"
            autoPlay
            muted
            playsInline
            loop
          />

          {/* 🎮 PLAY/PAUSE OVERLAY */}
          <AnimatePresence>
            {!isPlaying && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] z-10"
              >
                <div className="bg-white/20 backdrop-blur-md rounded-full p-6">
                  <Play size={48} className="text-white fill-white" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 📍 PROGRESS INDICATORS */}
        <div className="absolute top-4 left-0 right-0 flex gap-1 px-2 z-30">
          {videos.map((_, index) => (
            <div
              key={index}
              className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-white rounded-full"
                initial={{ width: index < current ? "100%" : "0%" }}
                animate={{
                  width: index < current ? "100%" : index === current ? "100%" : "0%",
                }}
                transition={{
                  duration: index === current ? 15 : 0.3,
                  ease: index === current ? "linear" : "easeOut",
                }}
              />
            </div>
          ))}
        </div>

        {/* 🎯 NAVIGATION HINTS */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2">
          <AnimatePresence>
            {current < videos.length - 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.7, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full"
              >
                <p className="text-white text-xs font-medium">Swipe up for more</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 🌟 DECORATIVE ELEMENTS */}
        <div className="absolute inset-0 pointer-events-none z-20">
          {/* Top gradient */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/40 to-transparent" />
          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      </motion.div>

      {/* 🎨 SIDE INTERACTION BUTTONS */}
      <div className="absolute right-4 bottom-24 z-40 flex flex-col gap-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePlayPause}
          className="bg-white/20 backdrop-blur-md p-4 rounded-full shadow-lg"
        >
          {isPlaying ? (
            <Pause size={24} className="text-white" />
          ) : (
            <Play size={24} className="text-white" />
          )}
        </motion.button>
      </div>
    </div>
  );
}