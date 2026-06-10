// App.jsx — "For Aashi"
// Chapter-based cinematic experience. React + Tailwind + Framer Motion.
//
// ── HOW TO ADD YOUR PHOTOS ───────────────────────────────────────────────
// Put these 5 files in your project's /public folder (drag & drop):
//   photo-hug.jpeg, photo-plane.jpeg, photo-flowers.jpeg,
//   photo-lights.jpeg, photo-masks.jpeg
// They're referenced below as "/photo-hug.jpeg" etc. That's all you do.
// ─────────────────────────────────────────────────────────────────────────
//
// ── HOW TO EDIT WORDS ────────────────────────────────────────────────────
// All copy lives in the data blocks just below. Change the strings, save,
// push. To change her name everywhere, edit NAME on the next line.
// ─────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { Music2, X, Hand, Volume2, VolumeX } from "lucide-react";

const NAME = "Aashi";

/* ============================ CONTENT ============================ */

const balloonNotes = [
  "You make ordinary moments feel important.",
  "You somehow make life softer.",
  "You are deeply loved, more than you know.",
  "You feel like peace after chaos.",
  "Could you BE any more amazing?",
  "You are my favourite part of every day.",
  "The world feels lighter with you in it.",
  "You are my favourite plot twist.",
  "You make silence feel comforting.",
  "I hope life gives us slow mornings together.",
];

const moods = [
  { title: "Need reassurance?", text: "You are deeply loved. Even on the days your mind tells you otherwise.", accent: "#A8C5F0" },
  { title: "Missing me?", text: "I'm probably missing you too. More than I admit sometimes.", accent: "#C4B4FF" },
  { title: "Need a smile?", text: "You're cute even when you're being dramatic.", accent: "#E8C39E" },
  { title: "Overthinking?", text: "Your heart is safe with me. You don't have to carry every thought alone.", accent: "#B4DCDC" },
  { title: "Need love?", text: "If I could, I'd wrap you in the safest hug right now.", accent: "#E0A8B8" },
];

const episodeCards = [
  { title: "The One Where I Realized", text: "Somewhere between our conversations and your smile, I realized you had quietly become very important to me." },
  { title: "The One Where Life Felt Softer", text: "You brought a warmth into my life that I didn't even know I needed." },
  { title: "The One Where You Stayed In My Head", text: "You became the person random things remind me of throughout the day." },
  { title: "The One I Never Want To End", text: "If life is kind, I hope it gives me more time with you. Lots more." },
];

const letters = [
  { title: "Open when you miss me", text: "Close your eyes. I'm right there. In the pause between your thoughts. I never actually leave — I just become quieter for a while. Missing me means I'm with you in a different way. Don't fight it. Sit with it. I'm sitting with it too." },
  { title: "Open when you're overthinking", text: "Your brain is being loud again, isn't it? None of it is as big as it feels right now. Whatever you said, whatever you didn't say, whatever you're replaying — it's okay. I promise. You are allowed to put the thought down. I've got you." },
  { title: "Open when you can't sleep", text: "Hi. It's late. Your eyes are heavy but your mind won't slow down. Here — borrow my calm for tonight. Imagine my hand resting on your back. The day is over. You did enough. You are enough. Sleep, my love." },
  { title: "Open when you need reassurance", text: "You are not too much. You are not too little. You are not a project. You are not at risk of being left. I'm not going anywhere — not when it's hard, not when you're quiet, not when you're convinced you're unlovable. Especially not then." },
  { title: "Open when life feels heavy", text: "Put it down. Whatever it is. Just for a few minutes. The weight you're carrying is real, but it's not yours alone. I'm here. We'll figure it out together. Either way, you are not alone in this. Not for one second." },
];

const lateNightThoughts = [
  "I wonder if you know how often you cross my mind.",
  "You made life feel less lonely somehow.",
  "You feel strangely familiar to my soul.",
  "Sometimes I catch myself smiling for no reason. It's always you.",
  "I hope someone has told you today how rare you are.",
  "Loving you doesn't feel like a decision. It feels like remembering.",
  "You are the softest part of my day.",
];

// Cancer constellation — Aashi's zodiac. 5 real stars + 3 memory stars.
const stars = [
  { x: 30, y: 80, lead: true, name: "Acubens", text: "You make me want to be gentler with everything.", connects: [1] },
  { x: 42, y: 64, lead: true, name: "Altarf", text: "Being loved by you, Aashi, feels like one of life's rarest things.", connects: [7] },
  { x: 50, y: 46, lead: true, name: "Asellus Australis", text: "The first time you laughed at something I said — I knew.", connects: [3, 4] },
  { x: 72, y: 24, lead: true, name: "Asellus Borealis", text: "Some people feel like home. You feel like mine.", connects: [] },
  { x: 24, y: 20, lead: true, name: "Tegmine", text: "In every version of this life, I'd still pick you.", connects: [] },
  { x: 36, y: 34, name: "", text: "I could listen to you talk for hours and still want more.", connects: [] },
  { x: 62, y: 34, name: "", text: "There's something beautiful about the way you exist.", connects: [] },
  { x: 46, y: 55, name: "", text: "You are the reason I believe in slow, real love.", connects: [2] },
];

const tinyThings = [
  "The way you say 'hmm' while thinking.",
  "How you go quiet when something matters to you.",
  "Your random expressions over the smallest things.",
  "The way you text in bursts when you're excited.",
  "Your late-night energy that I secretly love.",
  "How you make even ordinary things sound like a story.",
  "How your name has started to feel like a soft place.",
];

const promises = [
  "I promise to always answer when you call. Even when I shouldn't be on my phone.",
  "I promise to never let a fight end without one of us reaching out first.",
  "I promise to keep noticing the small things — the new earrings, the haircut, the mood you're hiding.",
  "I promise to never make you feel like a burden, especially on the days you feel like one.",
  "I promise to be honest with you, even when the easy thing is to stay quiet.",
  "I promise to choose you again on the hard days. Not just the good ones.",
  "I promise to remember what matters to you, and care about it even when you forget.",
  "I promise to grow with you. Not away from you.",
];

const songs = [
  { name: "Khat", code: "LUgpPmj6nR8" },
  { name: "I Like Me Better", code: "a7fzkqLozwA" },
  { name: "Future Looks Good", code: "KkGhYIPcAHg" },
  { name: "High On You", code: "gI1Z4UHg9o0" },
  { name: "Yellow", code: "yKNxeF4KMsY" },
  { name: "Tum Ho Toh", code: "rOUuGvJkBrQ" },
  { name: "Dhun", code: "cUmUOb7j3dc" },
  { name: "Ishq Hai", code: "BcSejVIxB0E" },
];

// Photo scenes — each woven between chapters
const photoScenes = [
  { src: "/photo-plane.jpeg", caption: "of all the places I've been, you're the one I call home.", chapter: "iii", label: "somewhere in the clouds" },
  { src: "/photo-lights.jpeg", caption: "the nights got softer once they had you in them.", chapter: "vii", label: "that evening" },
  { src: "/photo-flowers.jpeg", caption: "you, and everything in bloom around you.", chapter: "x", label: "a perfect saturday" },
  { src: "/photo-masks.jpeg", caption: "even the ordinary mornings feel like something with you.", chapter: "xii", label: "a perfect thursday" },
  { src: "/photo-hug.jpeg", caption: "and when I hold you, the whole world goes quiet.", chapter: "xv", label: "us" },
];

/* ============================ HELPERS ============================ */

function getGreeting() {
  const h = new Date().getHours();
  const d = new Date().getDay();
  const n = NAME.toLowerCase();
  if (h >= 0 && h < 5) return `you're up late again, ${n}. come here.`;
  if (h < 11) {
    if (d === 0) return `sunday morning, ${n}. i hope it's slow for you.`;
    if (d === 6) return `saturday morning, ${n}. take your time today.`;
    return `good morning, ${n}. i hope today is gentle with you.`;
  }
  if (h < 16) return `i was just thinking about you, ${n}.`;
  if (h < 20) return `hi ${n}. how was your day?`;
  return `the day's winding down. so glad you're here, ${n}.`;
}

// Device-tilt hook (gyroscope) with iOS permission handling
function useDeviceTilt(enabled) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (!enabled) return;
    const handler = (e) => {
      // gamma: left-right [-90,90], beta: front-back [-180,180]
      const g = Math.max(-25, Math.min(25, e.gamma || 0));
      const b = Math.max(-25, Math.min(25, (e.beta || 0) - 45));
      setTilt({ x: g / 25, y: b / 25 });
    };
    window.addEventListener("deviceorientation", handler);
    return () => window.removeEventListener("deviceorientation", handler);
  }, [enabled]);
  return tilt;
}

/* ============================ LILY MOTIF ============================ */

function Lily({ size = 40, opacity = 0.5, color = "#E8C39E", sw = 0.7 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{ opacity }}>
      <g stroke={color} strokeWidth={sw} strokeLinecap="round" fill="none">
        <path d="M 50 50 Q 45 28 50 12 Q 55 28 50 50" />
        <path d="M 50 50 Q 67 34 82 28 Q 71 46 50 50" />
        <path d="M 50 50 Q 71 56 80 72 Q 60 66 50 50" />
        <path d="M 50 50 Q 55 72 50 88 Q 45 72 50 50" />
        <path d="M 50 50 Q 29 66 20 72 Q 29 56 50 50" />
        <path d="M 50 50 Q 29 46 18 28 Q 33 34 50 50" />
        <circle cx="50" cy="50" r="1.6" fill={color} opacity="0.7" />
      </g>
    </svg>
  );
}

function ChapterLabel({ num, title }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="flex items-center gap-3 justify-center mb-7"
    >
      <div className="h-px w-8" style={{ background: "linear-gradient(to right, transparent, rgba(232,195,158,0.5))" }} />
      <span className="eyebrow text-[11px]" style={{ color: "#E8C39E" }}>{num} · {title}</span>
      <div className="h-px w-8" style={{ background: "linear-gradient(to left, transparent, rgba(232,195,158,0.5))" }} />
    </motion.div>
  );
}

/* ============================ FALLING PETALS (surprise) ============================ */
// A single petal shape (one lily petal)
function Petal({ delay, x, duration, size, drift }) {
  return (
    <motion.div
      initial={{ y: "-8vh", x: 0, opacity: 0, rotate: 0 }}
      animate={{
        y: "110vh",
        x: [0, drift, -drift * 0.6, drift * 0.4],
        opacity: [0, 0.7, 0.7, 0],
        rotate: [0, 120, 260, 380],
      }}
      transition={{ duration, delay, ease: "linear" }}
      className="fixed pointer-events-none"
      style={{ left: `${x}%`, top: 0, zIndex: 45 }}
    >
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <path d="M 20 4 Q 12 18 20 36 Q 28 18 20 4" fill="rgba(232,195,158,0.5)" stroke="rgba(255,229,176,0.6)" strokeWidth="0.5" />
      </svg>
    </motion.div>
  );
}

function FallingPetals({ count = 8 }) {
  const petals = [...Array(count)].map((_, i) => ({
    delay: i * 1.2 + Math.random(),
    x: 5 + (i * 89) % 90,
    duration: 9 + Math.random() * 5,
    size: 16 + (i % 3) * 6,
    drift: 30 + Math.random() * 50,
  }));
  return <>{petals.map((p, i) => <Petal key={i} {...p} />)}</>;
}

/* ============================ HOLD SECRET (final photo surprise) ============================ */
function HoldSecret({ children }) {
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const intervalRef = useRef(null);
  const HOLD = 3000, TICK = 40;

  const start = () => {
    if (revealed) return;
    setHolding(true);
    const t0 = Date.now();
    intervalRef.current = setInterval(() => {
      const pct = Math.min((Date.now() - t0) / HOLD, 1);
      setProgress(pct);
      if (pct >= 1) {
        clearInterval(intervalRef.current);
        if (navigator.vibrate) navigator.vibrate([20, 40, 20]);
        setRevealed(true);
        setHolding(false);
      }
    }, TICK);
  };
  const end = () => {
    clearInterval(intervalRef.current);
    if (!revealed) { setHolding(false); setProgress(0); }
  };
  useEffect(() => () => clearInterval(intervalRef.current), []);

  return (
    <div className="relative"
      onMouseDown={start} onMouseUp={end} onMouseLeave={end}
      onTouchStart={start} onTouchEnd={end} onTouchCancel={end}
      style={{ touchAction: "manipulation" }}
    >
      {children}

      {/* glow builds while holding */}
      <AnimatePresence>
        {holding && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: progress * 0.8 }} exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none rounded-[20px]"
            style={{ background: "radial-gradient(circle at center, rgba(232,195,158,0.3) 0%, transparent 70%)", filter: "blur(10px)" }}
          />
        )}
      </AnimatePresence>

      {/* the hidden message */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center rounded-[20px] p-8 text-center"
            style={{ background: "rgba(10,14,39,0.88)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", zIndex: 10 }}
            onClick={() => setRevealed(false)}
          >
            <div>
              <div className="flex justify-center mb-4"><Lily size={28} opacity={0.7} /></div>
              <p className="display italic text-xl sm:text-2xl leading-relaxed" style={{ color: "#EAE6F0" }}>
                You held on. That's all I'll ever ask of us — that we hold on.
              </p>
              <p className="text-[11px] mt-5 italic" style={{ color: "rgba(234,230,240,0.4)" }}>tap to return to the photo</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* subtle hint */}
      {!revealed && (
        <p className="text-center text-[10px] mt-3 eyebrow" style={{ color: "rgba(168,197,240,0.3)" }}>
          {holding ? "keep holding…" : "press & hold the photo"}
        </p>
      )}
    </div>
  );
}

/* ============================ AMBIENT (parallax) ============================ */

function Ambient({ scrollProgress }) {
  const lite = typeof window !== "undefined" && window.innerWidth < 640;
  // Different layers drift at different rates for parallax depth
  const bloomY = useTransform(scrollProgress, [0, 1], ["0%", "-30%"]);
  const starY = useTransform(scrollProgress, [0, 1], ["0%", "-60%"]);
  const lilyY = useTransform(scrollProgress, [0, 1], ["0%", "-15%"]);

  const blooms = [
    { c: "rgba(232,195,158,0.10)", s: 620, x: -8, y: -10, d: 30 },
    { c: "rgba(224,168,184,0.09)", s: 520, x: 68, y: 14, d: 34 },
    { c: "rgba(168,197,240,0.10)", s: 560, x: 26, y: 66, d: 38 },
    { c: "rgba(232,195,158,0.07)", s: 480, x: 80, y: 80, d: 28 },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Bloom layer */}
      <motion.div className="absolute inset-0" style={{ y: bloomY }}>
        {blooms.map((b, i) => (
          <motion.div
            key={i}
            animate={{ x: ["0%", "8%", "-4%", "0%"], y: ["0%", "-6%", "4%", "0%"], scale: [1, 1.12, 0.96, 1] }}
            transition={{ duration: b.d, repeat: Infinity, ease: "easeInOut" }}
            className="absolute rounded-full"
            style={{
              width: b.s, height: b.s, left: `${b.x}%`, top: `${b.y}%`,
              background: `radial-gradient(circle, ${b.c} 0%, transparent 70%)`, filter: "blur(55px)",
            }}
          />
        ))}
      </motion.div>

      {/* Star layer (faster parallax = feels closer) */}
      <motion.div className="absolute inset-0" style={{ y: starY }}>
        {[...Array(lite ? 26 : 50)].map((_, i) => {
          const x = (i * 37) % 100, y = (i * 61) % 100, s = 1 + (i * 7) % 3;
          return (
            <motion.div
              key={i}
              animate={{ opacity: [0.15, 0.6, 0.15] }}
              transition={{ duration: 4 + (i * 0.3) % 4, repeat: Infinity, delay: (i * 0.2) % 5 }}
              className="absolute rounded-full bg-white"
              style={{ width: s, height: s, left: `${x}%`, top: `${y}%`, boxShadow: "0 0 4px rgba(255,255,255,0.6)" }}
            />
          );
        })}
      </motion.div>

      {/* Faint giant lily, slowest */}
      <motion.div className="absolute inset-0 flex items-center justify-center" style={{ y: lilyY }}>
        <motion.div animate={{ rotate: [0, 4, 0, -4, 0] }} transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}>
          <Lily size={700} opacity={0.025} color="#A8C5F0" sw={0.3} />
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ============================ 3D TILT PHOTO ============================ */

function TiltPhoto({ src, caption, deviceTilt }) {
  const ref = useRef(null);
  const [hover, setHover] = useState(false);
  // Cursor-driven rotation (desktop)
  const rx = useSpring(0, { stiffness: 150, damping: 20 });
  const ry = useSpring(0, { stiffness: 150, damping: 20 });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 16);
    rx.set(-py * 16);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  // Apply device tilt on mobile
  useEffect(() => {
    if (deviceTilt && (deviceTilt.x !== 0 || deviceTilt.y !== 0)) {
      ry.set(deviceTilt.x * 14);
      rx.set(-deviceTilt.y * 14);
    }
  }, [deviceTilt, rx, ry]);

  return (
    <div style={{ perspective: "1200px" }}>
      <motion.figure
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => { setHover(false); onLeave(); }}
        initial={{ opacity: 0, y: 60, scale: 0.82, filter: "blur(14px)" }}
        whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative mx-auto"
      >
        <div
          className="relative rounded-[20px] overflow-hidden grain"
          style={{
            border: "1px solid rgba(232,195,158,0.25)",
            boxShadow: hover
              ? "0 40px 100px rgba(0,0,0,0.55), 0 0 0 8px rgba(255,255,255,0.03)"
              : "0 30px 80px rgba(0,0,0,0.5), 0 0 0 8px rgba(255,255,255,0.02)",
            transition: "box-shadow 0.4s ease",
          }}
        >
          <img src={src} alt="us" style={{ width: "100%", display: "block", filter: "saturate(1.05) contrast(1.02)" }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at center, transparent 55%, rgba(10,14,39,0.45) 100%)" }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, transparent 60%, rgba(10,14,39,0.5) 100%)" }} />
          {/* Light sheen that shifts with tilt */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.10) 50%, transparent 70%)",
              opacity: hover ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          />
        </div>
        <figcaption className="display italic text-center mt-7 text-xl sm:text-2xl px-6" style={{ color: "#EAE6F0" }}>
          {caption}
        </figcaption>
        <div className="flex justify-center mt-5"><Lily size={26} opacity={0.5} /></div>
      </motion.figure>
    </div>
  );
}

/* ============================ POPUPS ============================ */

function Modal({ children, close, maxWidth = "max-w-md" }) {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center px-5 py-8 overflow-y-auto"
      style={{ zIndex: 100, background: "rgba(5,8,22,0.7)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={close}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: "spring", damping: 24, stiffness: 220 }}
        className={`relative w-full ${maxWidth} p-9 sm:p-11 rounded-[28px] grain my-auto`}
        style={{
          background: "linear-gradient(145deg, rgba(20,20,54,0.96), rgba(10,14,39,0.96))",
          border: "1px solid rgba(232,195,158,0.2)",
          boxShadow: "0 30px 90px rgba(0,0,0,0.6)",
        }}
      >
        <button onClick={close} className="absolute top-5 right-5 text-white/50 hover:text-white/90 transition-colors" aria-label="close">
          <X size={20} />
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
}

function MemoryModal({ memory, close }) {
  return (
    <Modal close={close}>
      <motion.div
        animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="rounded-full mb-6"
        style={{ width: 14, height: 14, background: "radial-gradient(circle, #fff, #ffe5b0 60%, #e8c39e)", boxShadow: "0 0 22px rgba(232,195,158,0.9)" }}
      />
      {memory.name && <p className="eyebrow text-[10px] mb-3" style={{ color: "rgba(168,197,240,0.5)" }}>{memory.name} · cancer</p>}
      <p className="display text-2xl sm:text-3xl leading-snug" style={{ color: "#EAE6F0" }}>{memory.text}</p>
      <p className="text-xs mt-7 italic" style={{ color: "rgba(234,230,240,0.4)" }}>come back whenever you need to.</p>
    </Modal>
  );
}

function TextModal({ text, close }) {
  return (
    <Modal close={close}>
      <Lily size={30} opacity={0.6} />
      <p className="display text-2xl sm:text-3xl leading-snug mt-5" style={{ color: "#EAE6F0" }}>{text}</p>
      <p className="text-xs mt-7 italic" style={{ color: "rgba(234,230,240,0.4)" }}>come back whenever you need to.</p>
    </Modal>
  );
}

function LetterModal({ letter, close }) {
  return (
    <Modal close={close} maxWidth="max-w-xl">
      <p className="eyebrow text-[10px] mb-4" style={{ color: "rgba(168,197,240,0.5)" }}>a letter</p>
      <h3 className="display text-2xl sm:text-3xl mb-6 leading-snug" style={{ color: "#EAE6F0" }}>{letter.title}</h3>
      <p className="text-base sm:text-lg leading-relaxed" style={{ color: "rgba(234,230,240,0.85)" }}>{letter.text}</p>
      <p className="text-sm mt-8 italic" style={{ color: "rgba(234,230,240,0.45)" }}>— yours, always.</p>
    </Modal>
  );
}

/* ============================ HUG EXPERIENCE ============================ */

function HugButton({ onTriggered }) {
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const doneRef = useRef(false);
  const HOLD = 2000, TICK = 30;

  const start = () => {
    if (doneRef.current) return;
    setHolding(true);
    if (navigator.vibrate) navigator.vibrate(15);
    const t0 = Date.now();
    intervalRef.current = setInterval(() => {
      const pct = Math.min((Date.now() - t0) / HOLD, 1);
      setProgress(pct);
      if (pct >= 1 && !doneRef.current) {
        doneRef.current = true;
        clearInterval(intervalRef.current);
        if (navigator.vibrate) navigator.vibrate([30, 60, 30]);
        onTriggered();
      }
    }, TICK);
  };
  const end = () => {
    clearInterval(intervalRef.current);
    if (!doneRef.current) { setHolding(false); setProgress(0); }
  };
  useEffect(() => () => clearInterval(intervalRef.current), []);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 120 }}
      className="fixed left-5 z-40"
      style={{ bottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <AnimatePresence>
        {holding && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1 + progress * 2.5, opacity: 0.5 - progress * 0.3 }}
            exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.15 }}
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(232,195,158,0.5) 0%, transparent 70%)", filter: "blur(20px)" }}
          />
        )}
      </AnimatePresence>
      <motion.button
        onMouseDown={start} onMouseUp={end} onMouseLeave={end}
        onTouchStart={start} onTouchEnd={end} onTouchCancel={end}
        animate={{ scale: holding ? 1 + progress * 0.15 : [1, 1.04, 1] }}
        transition={holding ? { duration: 0.15 } : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative rounded-full p-4 sm:p-5 select-none grain"
        style={{
          background: "rgba(255,255,255,0.06)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(232,195,158,0.2)",
          boxShadow: `0 0 ${40 + progress * 60}px rgba(232,195,158,${0.2 + progress * 0.5})`,
          touchAction: "manipulation",
        }}
      >
        <div className="flex items-center gap-2">
          <Hand size={20} style={{ color: "#E8C39E" }} />
          <span className="text-sm body-font hidden sm:inline" style={{ color: "rgba(234,230,240,0.85)" }}>
            {holding ? "hold on..." : "need a hug?"}
          </span>
        </div>
        {holding && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none -rotate-90" viewBox="0 0 100 100" preserveAspectRatio="none">
            <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(232,195,158,0.9)" strokeWidth="2"
              strokeDasharray={`${progress * 301.6} 301.6`} />
          </svg>
        )}
      </motion.button>
    </motion.div>
  );
}

function HugExperience({ close }) {
  const [step, setStep] = useState(0);
  const [closing, setClosing] = useState(false);
  const [aftermath, setAftermath] = useState(false);
  const lines = [
    "Hey.",
    "I know some days feel heavier than others.",
    "But you never have to go through them alone.",
    "Stay here for a few seconds. Let me hold the world still for you.",
    `I've got you, ${NAME}.`,
  ];

  useEffect(() => {
    if (closing) return;
    if (step < lines.length - 1) {
      const dur = step === 3 ? 5000 : 3500;
      const t = setTimeout(() => setStep(step + 1), dur);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setClosing(true);
        setTimeout(() => {
          setAftermath(true);
          setTimeout(close, 4500);
        }, 1500);
      }, 4000);
      return () => clearTimeout(t);
    }
  }, [step, closing, lines.length, close]);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center px-6"
      style={{ zIndex: 110, background: "radial-gradient(circle at center, rgba(35,30,50,0.96) 0%, rgba(10,14,39,0.98) 60%, rgba(5,8,22,1) 100%)", backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)" }}
      initial={{ opacity: 0 }} animate={{ opacity: closing && aftermath ? 0.6 : 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2 }}
    >
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at center, rgba(232,195,158,0.16) 0%, transparent 55%)" }}
      />
      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: `${(i * 37) % 100}%`, y: "100%" }}
          animate={{ opacity: [0, 0.7, 0], y: "-10%" }}
          transition={{ duration: 8 + (i % 5) * 1.5, repeat: Infinity, delay: i * 0.4, ease: "linear" }}
          className="absolute rounded-full pointer-events-none"
          style={{ width: 2 + (i % 3), height: 2 + (i % 3), left: `${(i * 53) % 100}%`, background: "rgba(232,195,158,0.6)", boxShadow: "0 0 12px rgba(232,195,158,0.6)" }}
        />
      ))}
      {!closing && (
        <button onClick={() => { setClosing(true); setTimeout(close, 800); }} className="absolute top-6 right-6 text-white/30 hover:text-white/70 z-10" aria-label="close">
          <X size={20} />
        </button>
      )}
      {!closing && (
        <div className="relative z-10 max-w-2xl text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            >
              <motion.p
                animate={{ scale: [1, 1.015, 1, 1.015, 1] }}
                transition={{ duration: 1.2, times: [0, 0.15, 0.3, 0.45, 1], repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
                className="display text-3xl sm:text-5xl md:text-6xl leading-relaxed px-4"
                style={{ color: "#EAE6F0", textShadow: "0 0 40px rgba(232,195,158,0.3)" }}
              >
                {lines[step]}
              </motion.p>
            </motion.div>
          </AnimatePresence>
          <div className="mt-16 flex items-center justify-center gap-2">
            {lines.map((_, i) => (
              <motion.div key={i} animate={{ opacity: i <= step ? 0.6 : 0.15, scale: i === step ? 1.3 : 1 }} transition={{ duration: 0.6 }}
                className="w-1.5 h-1.5 rounded-full" style={{ background: "#E8C39E" }} />
            ))}
          </div>
        </div>
      )}
      <AnimatePresence>
        {aftermath && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 0.7, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }}
            className="absolute bottom-12 left-0 right-0 text-center display text-xl sm:text-2xl italic px-6" style={{ color: "rgba(232,195,158,0.8)" }}>
            come back whenever you need this.
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ============================ CONSTELLATION SCENE ============================ */

function ConstellationScene({ onSelect }) {
  const [found, setFound] = useState([]);
  const [shoot, setShoot] = useState(0);
  // 3D depth field: the whole constellation tilts slowly + responds to pointer
  const rx = useSpring(0, { stiffness: 60, damping: 18 });
  const ry = useSpring(0, { stiffness: 60, damping: 18 });

  useEffect(() => {
    const t = setInterval(() => setShoot((k) => k + 1), 9000);
    return () => clearInterval(t);
  }, []);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 12);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 12);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  const tap = (s, i) => {
    onSelect(s);
    if (!found.includes(i)) setFound([...found, i]);
  };

  let progress = "tap the stars to find me.";
  if (found.length > 0 && found.length < 4) progress = `${found.length} of ${stars.length} found.`;
  else if (found.length >= 4 && found.length < stars.length) progress = `halfway home. ${stars.length - found.length} to go.`;
  else if (found.length === stars.length) progress = "you found me. every single one.";

  return (
    <div className="relative w-full max-w-2xl" style={{ zIndex: 2 }}>
      {/* SURPRISE: when all stars found, the whole sky briefly warms */}
      <AnimatePresence>
        {found.length === stars.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0.35, 0] }}
            transition={{ duration: 6, times: [0, 0.25, 0.6, 1] }}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 5, background: "radial-gradient(circle at center, rgba(232,195,158,0.25) 0%, rgba(224,168,184,0.12) 40%, transparent 75%)" }}
          />
        )}
      </AnimatePresence>

      <ChapterLabel num="ix" title="your stars" />
      <h2 className="display text-center font-light leading-tight mb-3" style={{ fontSize: "clamp(2rem,7vw,3.5rem)", color: "#EAE6F0" }}>
        In every universe,
      </h2>
      <p className="text-center text-base mb-1" style={{ color: "rgba(234,230,240,0.6)" }}>I think I'd still find you.</p>
      <p className="text-center text-xs italic mb-8 h-4" style={{ color: "#E8C39E", opacity: 0.7 }}>{progress}</p>

      <div style={{ perspective: "1000px" }}>
        <motion.div
          onMouseMove={onMove} onMouseLeave={onLeave}
          style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", height: "min(56vh, 440px)", maxWidth: 460 }}
          className="relative mx-auto"
        >
          {/* connecting lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            {stars.map((s, i) => (s.connects || []).map((t) => {
              const tg = stars[t]; if (!tg) return null;
              const both = found.includes(i) && found.includes(t);
              return (
                <motion.line key={`${i}-${t}`} x1={s.x} y1={s.y} x2={tg.x} y2={tg.y}
                  stroke={both ? "rgba(232,195,158,0.6)" : "rgba(168,197,240,0.12)"} strokeWidth={both ? 0.4 : 0.18} strokeLinecap="round"
                  animate={{ opacity: both ? [0.7, 1, 0.7] : 0.4 }} transition={{ duration: both ? 3 : 1, repeat: both ? Infinity : 0 }} />
              );
            }))}
          </svg>

          <AnimatePresence>
            <motion.div key={shoot}
              initial={{ x: "-12%", y: `${10 + (shoot * 13) % 40}%`, opacity: 0 }}
              animate={{ x: "112%", y: `${45 + (shoot * 7) % 30}%`, opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              className="absolute pointer-events-none"
              style={{ width: 60, height: 1.5, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.9), rgba(232,195,158,0.6))", boxShadow: "0 0 8px rgba(232,195,158,0.8)" }}
            />
          </AnimatePresence>

          {stars.map((s, i) => {
            const isF = found.includes(i);
            const vs = s.lead ? 18 : 11;
            // Stars at different z-depths for parallax-in-3D
            const z = s.lead ? 30 : 10;
            return (
              <motion.button key={i} onClick={() => tap(s, i)}
                className="absolute flex items-center justify-center"
                style={{ left: `${s.x}%`, top: `${s.y}%`, width: 48, height: 48, transform: `translate(-50%,-50%) translateZ(${z}px)` }}
                whileHover={{ scale: 1.35 }} whileTap={{ scale: 0.9 }} aria-label={`memory ${i + 1}`}>
                <motion.div
                  animate={{ opacity: isF ? [0.5, 0.9, 0.5] : [0.15, 0.4, 0.15], scale: isF ? [1, 1.3, 1] : [1, 1.1, 1] }}
                  transition={{ duration: 3 + (i % 3), repeat: Infinity }}
                  className="absolute rounded-full pointer-events-none"
                  style={{ width: vs * 2.6, height: vs * 2.6, filter: "blur(5px)", background: isF ? "radial-gradient(circle,rgba(232,195,158,0.45),transparent 70%)" : "radial-gradient(circle,rgba(168,197,240,0.3),transparent 70%)" }} />
                <motion.div
                  animate={{ opacity: isF ? [0.7, 1, 0.7] : [0.5, 0.9, 0.5], scale: [1, 1.15, 1] }}
                  transition={{ duration: 3 + (i % 4), repeat: Infinity }}
                  className="rounded-full relative"
                  style={{ width: vs, height: vs,
                    background: isF ? "radial-gradient(circle,#fff,#ffe5b0 50%,#e8c39e)" : s.lead ? "radial-gradient(circle,#fff,#c5dcff 60%,#a8c5f0)" : "radial-gradient(circle,#fff,#a8c5f0 70%,transparent)",
                    boxShadow: isF ? "0 0 24px rgba(232,195,158,0.9),0 0 8px #fff" : s.lead ? "0 0 18px rgba(168,197,240,0.9)" : "0 0 12px rgba(168,197,240,0.7)" }} />
                {isF && <motion.span initial={{ opacity: 0, y: -4 }} animate={{ opacity: 0.5, y: 0 }} transition={{ delay: 0.3 }}
                  className="absolute text-[9px]" style={{ top: -15, color: "rgba(234,230,240,0.6)" }}>{i + 1}</motion.span>}
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      <AnimatePresence>
        {found.length === stars.length && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 1.4 }} className="text-center mt-8">
            <p className="display italic text-xl" style={{ color: "#E8C39E" }}>cancer · your stars</p>
            <p className="text-xs mt-1 italic" style={{ color: "rgba(234,230,240,0.4)" }}>written for you, always.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================ SCENE WRAPPER ============================ */

function Scene({ children, className = "" }) {
  return (
    <section
      className={`snap-scene flex flex-col items-center justify-center px-5 sm:px-6 ${className}`}
      style={{ scrollSnapAlign: "start", minHeight: "100dvh", position: "relative" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="w-full flex flex-col items-center justify-center"
      >
        {children}
      </motion.div>
    </section>
  );
}

/* ============================ MAIN APP ============================ */

export default function App() {
  const [entered, setEntered] = useState(false);
  const [zooming, setZooming] = useState(false);
  // ── surprise states ──
  const [lilyTaps, setLilyTaps] = useState(0);
  const [lilySecretOpen, setLilySecretOpen] = useState(false);
  const [petalsActive, setPetalsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Falling petals: once per visit, at a random moment 20-60s after entering
  useEffect(() => {
    if (!entered) return;
    const delay = 20000 + Math.random() * 40000;
    const t = setTimeout(() => {
      setPetalsActive(true);
      setTimeout(() => setPetalsActive(false), 14000);
    }, delay);
    return () => clearTimeout(t);
  }, [entered]);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [flipped, setFlipped] = useState([]);
  const [hugOpen, setHugOpen] = useState(false);
  const [musicOpen, setMusicOpen] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [muted, setMuted] = useState(false);
  const [tiltEnabled, setTiltEnabled] = useState(false);
  const [tiltAsked, setTiltAsked] = useState(false);

  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const deviceTilt = useDeviceTilt(tiltEnabled);
  const greeting = useRef(getGreeting()).current;

  const playerRef = useRef(null);
  const apiReadyRef = useRef(false);

  // YouTube IFrame API
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.YT && window.YT.Player) { apiReadyRef.current = true; return; }
    if (!document.getElementById("yt-iframe-api")) {
      const tag = document.createElement("script");
      tag.id = "yt-iframe-api"; tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
    window.onYouTubeIframeAPIReady = () => { apiReadyRef.current = true; };
  }, []);

  const playSong = (videoId) => {
    setCurrentSong(videoId);
    const unmuteSoon = (p) => {
      let n = 0;
      const tryIt = () => {
        n++;
        try { p.unMute(); p.setVolume(55); setMuted(false); } catch (e) {}
        if (n < 10) setTimeout(tryIt, 150);
      };
      tryIt();
    };
    const start = () => {
      if (!playerRef.current) {
        playerRef.current = new window.YT.Player("yt-player", {
          height: "1", width: "1", videoId,
          playerVars: { autoplay: 1, mute: 1, loop: 1, playlist: videoId, controls: 0, playsinline: 1 },
          events: {
            onReady: (e) => { e.target.playVideo(); unmuteSoon(e.target); },
            onStateChange: (e) => {
              if (e.data === window.YT.PlayerState.PLAYING && e.target.isMuted && e.target.isMuted()) { e.target.unMute(); e.target.setVolume(55); setMuted(false); }
              if (e.data === window.YT.PlayerState.ENDED) e.target.playVideo();
            },
          },
        });
      } else { playerRef.current.loadVideoById(videoId); playerRef.current.playVideo(); unmuteSoon(playerRef.current); }
    };
    if (apiReadyRef.current && window.YT && window.YT.Player) start();
    else { const poll = setInterval(() => { if (window.YT && window.YT.Player) { clearInterval(poll); apiReadyRef.current = true; start(); } }, 100); setTimeout(() => clearInterval(poll), 8000); }
  };

  // Entry: trigger the zoom-through, then reveal the journey.
  // Also ask for device-tilt permission here (must be inside a user gesture on iOS).
  const handleEnter = async () => {
    setZooming(true);
    // iOS 13+ requires explicit permission for device orientation
    try {
      if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
        if (!tiltAsked) {
          setTiltAsked(true);
          const res = await DeviceOrientationEvent.requestPermission();
          if (res === "granted") setTiltEnabled(true);
        }
      } else {
        // Non-iOS: enable directly (most Android browsers allow it)
        setTiltEnabled(true);
      }
    } catch (e) { /* tilt just won't activate; everything else still works */ }
    setTimeout(() => setEntered(true), 1400);
  };

  const toggleMute = () => {
    const p = playerRef.current; if (!p) return;
    if (muted) { p.unMute(); p.setVolume(55); setMuted(false); } else { p.mute(); setMuted(true); }
  };

  return (
    <div className="body-font" style={{ color: "#EAE6F0", background: "#0A0E27", minHeight: "100dvh" }}>
      <StyleTag />
      <Ambient scrollProgress={scrollYProgress} />

      {/* hidden youtube player */}
      <div id="yt-player" style={{ position: "fixed", bottom: 0, left: 0, width: 1, height: 1, opacity: 0.01, pointerEvents: "none" }} />

      {/* top controls — inline-positioned, safe-area aware, above everything except modals */}
      <button
        onClick={() => setMusicOpen(true)}
        className="p-3 sm:p-4 rounded-full grain"
        aria-label="music"
        style={{
          position: "fixed",
          top: "calc(1.25rem + env(safe-area-inset-top, 0px))",
          right: "calc(1.25rem + env(safe-area-inset-right, 0px))",
          zIndex: 60,
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(232,195,158,0.18)",
        }}
      >
        <Music2 size={20} style={{ color: "#E8C39E" }} />
      </button>
      {currentSong && (
        <button
          onClick={toggleMute}
          className="p-3 sm:p-4 rounded-full grain"
          aria-label="mute"
          style={{
            position: "fixed",
            top: "calc(1.25rem + env(safe-area-inset-top, 0px))",
            right: "calc(4.75rem + env(safe-area-inset-right, 0px))",
            zIndex: 60,
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(232,195,158,0.18)",
          }}
        >
          {muted ? <VolumeX size={20} style={{ color: "#E8C39E" }} /> : <Volume2 size={20} style={{ color: "#E8C39E" }} />}
        </button>
      )}

      {/* hug button floats once entered */}
      {entered && !hugOpen && <HugButton onTriggered={() => setHugOpen(true)} />}

      {/* ENTRY (pre-journey) */}
      <AnimatePresence>
        {!entered && (
          <motion.section
            className="fixed inset-0 flex items-center justify-center px-6"
            style={{ zIndex: 20 }}
            initial={{ opacity: 1 }}
            animate={zooming ? { scale: 8, opacity: 0, filter: "blur(20px)" } : { scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.7, 0, 0.84, 0] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: -8 }} animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 3, delay: 0.3 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              {/* SECRET: tap the lily 3 times */}
              <motion.div
                animate={lilyTaps > 0 && lilyTaps < 3 ? { scale: [1, 1.06, 1], rotate: [0, 4, 0, -4, 0] } : { rotate: [0, 4, 0, -4, 0] }}
                transition={{ rotate: { duration: 34, repeat: Infinity, ease: "easeInOut" }, scale: { duration: 0.4 } }}
                onClick={() => {
                  const n = lilyTaps + 1;
                  setLilyTaps(n);
                  if (navigator.vibrate) navigator.vibrate(10);
                  if (n >= 3) setLilySecretOpen(true);
                }}
                style={{ cursor: "pointer", pointerEvents: "auto" }}
              >
                <Lily size={520} opacity={lilyTaps > 0 ? 0.06 + lilyTaps * 0.03 : 0.06} color="#A8C5F0" sw={0.4} />
              </motion.div>
            </motion.div>

            <div className="relative text-center flex flex-col items-center" style={{ zIndex: 2 }}>
              <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 0.8, y: 0 }} transition={{ duration: 1.6, delay: 0.5 }}
                className="italic text-[15px] sm:text-lg mb-10" style={{ color: "#A8C5F0" }}>{greeting}</motion.p>
              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.8, delay: 0.7 }}
                className="display font-light leading-[0.95]" style={{ fontSize: "clamp(3rem,12vw,8rem)", letterSpacing: "-0.02em" }}>
                Before<br />you enter
              </motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6, delay: 1.4 }}
                className="mt-10 max-w-sm leading-relaxed text-[15px] sm:text-base" style={{ color: "rgba(234,230,240,0.55)" }}>
                I couldn't fit everything I feel for you into messages, {NAME}. So I made this instead.
              </motion.p>
              <motion.button initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, delay: 1.9 }}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={handleEnter}
                className="display mt-12 px-12 py-4 rounded-full text-lg relative grain"
                style={{ color: "#0A0E27", background: "linear-gradient(135deg, #E8C39E, #f3d9bd)", boxShadow: "0 8px 40px rgba(232,195,158,0.3)" }}>
                Come in
              </motion.button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* THE JOURNEY */}
      {entered && (
        <motion.div
          ref={scrollRef}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}
          className="snap-container no-scrollbar"
          style={{ height: "100dvh", overflowY: "scroll", scrollSnapType: "y mandatory", scrollBehavior: "smooth", position: "relative", zIndex: 1 }}
        >
          {/* 1 · Balloons */}
          <Scene>
            <ChapterLabel num="i" title="too big for texts" />
            <h2 className="display text-center font-light leading-tight mb-3" style={{ fontSize: "clamp(2rem,7vw,3.5rem)" }}>Some feelings are too big for texts.</h2>
            <p className="text-center text-sm mb-10" style={{ color: "rgba(234,230,240,0.5)" }}>tap the balloons.</p>
            <div className="relative w-full max-w-3xl" style={{ height: "min(55vh, 460px)" }}>
              {balloonNotes.map((note, i) => <Balloon key={i} note={note} i={i} onPop={(n) => setSelectedNote(n)} />)}
            </div>
          </Scene>

          {/* 2 · Moods */}
          <Scene>
            <div className="w-full max-w-5xl">
              <ChapterLabel num="ii" title="however you feel" />
              <h2 className="display text-center font-light leading-tight mb-3" style={{ fontSize: "clamp(2rem,7vw,3.5rem)" }}>What do you need right now?</h2>
              <p className="text-center text-sm mb-10 italic" style={{ color: "rgba(234,230,240,0.5)" }}>there's something here for every mood.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {moods.map((m, i) => (
                  <motion.button key={i} whileHover={{ y: -8, scale: 1.03 }} whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedMood(m)}
                    className="text-left p-7 rounded-[24px] relative overflow-hidden grain"
                    style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: `0 8px 32px ${m.accent}22` }}>
                    <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${m.accent}33 0%, transparent 70%)`, filter: "blur(20px)" }} />
                    <h3 className="display text-2xl mb-2 relative z-10" style={{ color: "#EAE6F0" }}>{m.title}</h3>
                    <p className="text-sm relative z-10" style={{ color: "rgba(234,230,240,0.5)" }}>tap to open</p>
                  </motion.button>
                ))}
              </div>
            </div>
          </Scene>

          {/* 3 · Photo: plane */}
          <Scene><div className="w-full max-w-md"><ChapterLabel num={photoScenes[0].chapter} title={photoScenes[0].label} /><TiltPhoto src={photoScenes[0].src} caption={photoScenes[0].caption} deviceTilt={deviceTilt} /></div></Scene>

          {/* 4 · Friends */}
          <Scene>
            <div className="w-full max-w-5xl">
              <ChapterLabel num="iv" title="the one where" />
              <h2 className="display text-center font-light leading-tight mb-10" style={{ fontSize: "clamp(2rem,7vw,3.5rem)" }}>The One Where…</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {episodeCards.map((c, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -6 }} className="p-7 sm:p-9 rounded-[26px] relative overflow-hidden grain"
                    style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 8px 32px rgba(232,195,158,0.06)" }}>
                    <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(232,195,158,0.15) 0%, transparent 70%)", filter: "blur(20px)" }} />
                    <h3 className="display text-2xl sm:text-3xl mb-4 relative z-10" style={{ color: "#E8C39E" }}>{c.title}</h3>
                    <p className="leading-relaxed relative z-10" style={{ color: "rgba(234,230,240,0.75)" }}>{c.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Scene>

          {/* 5 · Open When */}
          <Scene>
            <div className="w-full max-w-5xl">
              <ChapterLabel num="v" title="for whenever" />
              <h2 className="display text-center font-light leading-tight mb-3" style={{ fontSize: "clamp(2rem,7vw,3.5rem)" }}>Open when…</h2>
              <p className="text-center text-sm mb-10 italic" style={{ color: "rgba(234,230,240,0.5)" }}>letters for the moments you need them.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {letters.map((l, i) => (
                  <motion.button key={i} whileHover={{ y: -8, scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={() => setSelectedLetter(l)}
                    className="text-left p-6 rounded-[22px] flex flex-col gap-3 grain"
                    style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="rounded-full p-2.5 w-fit" style={{ background: "rgba(232,195,158,0.12)" }}><Lily size={18} opacity={0.7} /></div>
                    <h3 className="display text-xl sm:text-2xl leading-snug" style={{ color: "#EAE6F0" }}>{l.title}</h3>
                    <span className="text-xs" style={{ color: "rgba(234,230,240,0.35)" }}>tap to open</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </Scene>

          {/* 6 · Late Night Thoughts */}
          <Scene>
            <div className="w-full">
              <ChapterLabel num="vi" title="late night" />
              <h2 className="display text-center font-light leading-tight mb-3" style={{ fontSize: "clamp(2rem,7vw,3.5rem)" }}>Late night thoughts.</h2>
              <p className="text-center text-sm mb-10 italic" style={{ color: "rgba(234,230,240,0.5)" }}>the things I think when the world is quiet.</p>
              <div className="overflow-x-auto no-scrollbar px-4" style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
                <div className="flex gap-4 pb-4 mx-auto" style={{ width: "max-content" }}>
                  {lateNightThoughts.map((t, i) => (
                    <div key={i} className="rounded-[26px] p-8 grain" style={{ width: 270, minHeight: 200, flexShrink: 0, scrollSnapAlign: "center", background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <p className="display text-lg sm:text-xl italic leading-relaxed" style={{ color: "rgba(234,230,240,0.85)" }}>"{t}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Scene>

          {/* 7 · Photo: lights */}
          <Scene><div className="w-full max-w-md"><ChapterLabel num={photoScenes[1].chapter} title={photoScenes[1].label} /><TiltPhoto src={photoScenes[1].src} caption={photoScenes[1].caption} deviceTilt={deviceTilt} /></div></Scene>

          {/* 8 · "it'd be you" */}
          <Scene>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 2, ease: "easeOut" }} className="text-center">
              <p className="text-sm mb-6 italic" style={{ color: "rgba(234,230,240,0.4)" }}>if i could only say one thing,</p>
              <h2 className="display font-light leading-[0.95]" style={{ fontSize: "clamp(4rem,16vw,11rem)" }}>it'd be</h2>
              <h2 className="display italic font-light leading-[0.9] mt-2" style={{ fontSize: "clamp(5rem,20vw,14rem)", color: "#E8C39E" }}>you.</h2>
              <motion.div initial={{ width: 0 }} whileInView={{ width: "60%" }} viewport={{ once: true }} transition={{ duration: 2, delay: 0.5 }}
                className="h-px mx-auto mt-12" style={{ background: "linear-gradient(to right, transparent, rgba(232,195,158,0.4), transparent)" }} />
            </motion.div>
          </Scene>

          {/* 9 · Constellation */}
          <Scene><ConstellationScene onSelect={setSelectedMemory} /></Scene>

          {/* 10 · Photo: flowers */}
          <Scene><div className="w-full max-w-md"><ChapterLabel num={photoScenes[2].chapter} title={photoScenes[2].label} /><TiltPhoto src={photoScenes[2].src} caption={photoScenes[2].caption} deviceTilt={deviceTilt} /></div></Scene>

          {/* 11 · Tiny Things */}
          <Scene>
            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 lg:sticky lg:top-24 text-center lg:text-left">
                <div className="hidden lg:block mb-6"><Lily size={50} opacity={0.4} /></div>
                <ChapterLabel num="xi" title="the small things" />
                <h2 className="display font-light leading-tight mb-4" style={{ fontSize: "clamp(2rem,7vw,3.5rem)" }}>Tiny things I love about you.</h2>
                <p className="italic" style={{ color: "rgba(234,230,240,0.55)" }}>the little things no one else would notice.</p>
              </div>
              <div className="lg:col-span-7 space-y-4">
                {tinyThings.map((t, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                    className="rounded-2xl p-5 sm:p-6 flex items-start gap-4 grain"
                    style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)", marginLeft: (i % 2) * 16 }}>
                    <div className="mt-1 flex-shrink-0"><Lily size={16} opacity={0.6} /></div>
                    <p className="leading-relaxed" style={{ color: "rgba(234,230,240,0.85)" }}>{t}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Scene>

          {/* 12 · Photo: masks */}
          <Scene><div className="w-full max-w-md"><ChapterLabel num={photoScenes[3].chapter} title={photoScenes[3].label} /><TiltPhoto src={photoScenes[3].src} caption={photoScenes[3].caption} deviceTilt={deviceTilt} /></div></Scene>

          {/* 13 · Promise Jar */}
          <Scene>
            <div className="w-full max-w-5xl">
              <ChapterLabel num="xiii" title="my promises" />
              <h2 className="display text-center font-light leading-tight mb-3" style={{ fontSize: "clamp(2rem,7vw,3.5rem)" }}>A jar of promises.</h2>
              <p className="text-center text-sm mb-10 italic" style={{ color: "rgba(234,230,240,0.5)" }}>tap one whenever you need reminding.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {promises.map((p, i) => {
                  const isF = flipped.includes(i);
                  return (
                    <button key={i} onClick={() => { if (!isF) setFlipped([...flipped, i]); }} className="relative w-full" style={{ aspectRatio: "3/4", perspective: 1000 }}>
                      <motion.div animate={{ rotateY: isF ? 180 : 0 }} transition={{ duration: 0.8, ease: "easeInOut" }} className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
                        <div className="absolute inset-0 rounded-[20px] flex flex-col items-center justify-center p-4 grain" style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)" }}>
                          <Lily size={22} opacity={0.5} />
                          <p className="display italic text-base mt-3" style={{ color: "rgba(234,230,240,0.7)" }}>a promise</p>
                          <p className="text-[10px] mt-1" style={{ color: "rgba(234,230,240,0.3)" }}>tap to open</p>
                        </div>
                        <div className="absolute inset-0 rounded-[20px] flex items-center justify-center p-4 grain" style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)", background: "linear-gradient(145deg, rgba(232,195,158,0.2), rgba(255,255,255,0.05))", border: "1px solid rgba(232,195,158,0.25)" }}>
                          <p className="text-xs sm:text-sm leading-relaxed text-left" style={{ color: "#EAE6F0" }}>{p}</p>
                        </div>
                      </motion.div>
                    </button>
                  );
                })}
              </div>
              {flipped.length > 0 && flipped.length < promises.length && (
                <p className="text-center text-xs mt-8 italic" style={{ color: "rgba(234,230,240,0.4)" }}>{flipped.length} of {promises.length} opened.</p>
              )}
              {/* SURPRISE: finale when every promise is opened */}
              <AnimatePresence>
                {flipped.length === promises.length && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative text-center mt-8">
                    {/* gold particle burst */}
                    {[...Array(16)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                        animate={{
                          x: Math.cos((i / 16) * Math.PI * 2) * (60 + (i % 4) * 30),
                          y: Math.sin((i / 16) * Math.PI * 2) * (60 + (i % 4) * 30) - 30,
                          opacity: 0, scale: 0,
                        }}
                        transition={{ duration: 1.8, ease: "easeOut", delay: i * 0.04 }}
                        className="absolute left-1/2 top-0 rounded-full"
                        style={{ width: 5 + (i % 3) * 2, height: 5 + (i % 3) * 2, background: "radial-gradient(circle,#fff,#ffe5b0)", boxShadow: "0 0 10px rgba(232,195,158,0.9)" }}
                      />
                    ))}
                    <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1.4 }}
                      className="display italic text-lg sm:text-xl" style={{ color: "#E8C39E" }}>
                      every promise opened. every single one is yours, {NAME}.
                    </motion.p>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1.8, duration: 1.4 }}
                      className="text-xs mt-2 italic" style={{ color: "rgba(234,230,240,0.5)" }}>
                      and I intend to keep them all.
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Scene>

          {/* 14 · Final letter — words appear one by one, like it's being written for her */}
          <Scene>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.4 }}
              className="w-full max-w-2xl p-8 sm:p-12 rounded-[32px] relative grain"
              style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(232,195,158,0.2)" }}>
              <div className="absolute top-7 right-7"><Lily size={34} opacity={0.5} /></div>
              <ChapterLabel num="xiv" title="a letter" />
              <h2 className="display font-light text-center mb-10" style={{ fontSize: "clamp(2.5rem,8vw,4rem)" }}>To {NAME},</h2>
              <div className="space-y-6 text-base sm:text-lg leading-relaxed" style={{ color: "rgba(234,230,240,0.8)" }}>
                {[
                  "Loving you has changed the way I experience life.",
                  "Somehow, the world became softer after you entered it.",
                  "You make ordinary days feel meaningful. You make silence feel comforting. You make happiness feel easy.",
                  `I hope you always remember how deeply appreciated, admired, and loved you are, ${NAME}.`,
                  "Thank you for existing in my life.",
                ].map((para, pi) => (
                  <p key={pi}>
                    {para.split(" ").map((word, wi) => (
                      <motion.span
                        key={wi}
                        initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.5, delay: pi * 0.5 + wi * 0.05, ease: "easeOut" }}
                        style={{ display: "inline-block", marginRight: "0.28em" }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </p>
                ))}
                <motion.p
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 1.6, delay: 3.2 }}
                  className="display text-2xl sm:text-3xl mt-10" style={{ color: "#E8C39E" }}>
                  Always you.
                </motion.p>
              </div>
            </motion.div>
          </Scene>

          {/* 15 · Photo: hug (closing) */}
          <Scene>
            <div className="w-full max-w-md">
              <ChapterLabel num={photoScenes[4].chapter} title={photoScenes[4].label} />
              <HoldSecret>
                <TiltPhoto src={photoScenes[4].src} caption={photoScenes[4].caption} deviceTilt={deviceTilt} />
              </HoldSecret>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 0.5, y: 0 }} viewport={{ once: true }} transition={{ duration: 2, delay: 0.8 }}
                className="text-center text-xs mt-10 eyebrow" style={{ color: "#A8C5F0" }}>the end · and also, the beginning</motion.p>
            </div>
          </Scene>
        </motion.div>
      )}

      {/* MUSIC PICKER */}
      <AnimatePresence>
        {musicOpen && (
          <Modal close={() => setMusicOpen(false)}>
            <h2 className="display text-3xl text-center mb-7" style={{ color: "#E8C39E" }}>Choose a song</h2>
            <div className="space-y-3 max-h-[60vh] overflow-y-auto no-scrollbar">
              {songs.map((s, i) => (
                <motion.button key={i} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
                  onClick={() => { playSong(s.code); setMusicOpen(false); }}
                  className="w-full rounded-2xl p-4 text-left" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <p className="text-lg" style={{ color: "#EAE6F0" }}>{s.name}</p>
                </motion.button>
              ))}
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* POPUPS */}
      <AnimatePresence>{selectedNote && <TextModal text={selectedNote} close={() => setSelectedNote(null)} />}</AnimatePresence>
      <AnimatePresence>{selectedMood && <TextModal text={selectedMood.text} close={() => setSelectedMood(null)} />}</AnimatePresence>
      <AnimatePresence>{selectedLetter && <LetterModal letter={selectedLetter} close={() => setSelectedLetter(null)} />}</AnimatePresence>
      <AnimatePresence>{selectedMemory && <MemoryModal memory={selectedMemory} close={() => setSelectedMemory(null)} />}</AnimatePresence>
      <AnimatePresence>{hugOpen && <HugExperience close={() => setHugOpen(false)} />}</AnimatePresence>

      {/* SURPRISE: falling petals (once per visit, random moment) */}
      <AnimatePresence>{petalsActive && <FallingPetals count={isMobile ? 6 : 10} />}</AnimatePresence>

      {/* SURPRISE: lily secret (3 taps on the entry lily) */}
      <AnimatePresence>
        {lilySecretOpen && (
          <Modal close={() => setLilySecretOpen(false)}>
            <div className="flex justify-center mb-5"><Lily size={36} opacity={0.8} /></div>
            <p className="eyebrow text-[10px] mb-4 text-center" style={{ color: "rgba(168,197,240,0.5)" }}>you found the secret</p>
            <p className="display text-2xl sm:text-3xl leading-snug text-center" style={{ color: "#EAE6F0" }}>
              You're the kind of person who taps the flower three times. That curiosity, that playfulness — it's one of the thousand reasons it's you, {NAME}. It was always going to be you.
            </p>
            <p className="text-xs mt-7 italic text-center" style={{ color: "rgba(234,230,240,0.4)" }}>this note exists nowhere else on the site. it's only yours.</p>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================ BALLOON ============================ */

function Balloon({ note, i, onPop }) {
  const colors = ["#A8C5F0", "#C4B4FF", "#E0A8B8", "#E8C39E", "#B4DCDC"];
  const positions = [
    { l: "10%", t: "12%" }, { l: "58%", t: "10%" }, { l: "30%", t: "32%" }, { l: "72%", t: "34%" }, { l: "12%", t: "55%" },
    { l: "48%", t: "55%" }, { l: "80%", t: "60%" }, { l: "28%", t: "76%" }, { l: "62%", t: "80%" }, { l: "44%", t: "30%" },
  ];
  const p = positions[i % positions.length];
  const c = colors[i % colors.length];
  return (
    <motion.button
      initial={{ y: 0 }} animate={{ y: [-10, 10, -10], rotate: [-2, 2, -2] }}
      transition={{ duration: 6 + (i % 4), repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.2 }}
      onClick={() => onPop(note)}
      className="absolute" style={{ left: p.l, top: p.t }}
    >
      <div className="relative rounded-full" style={{ width: 64, height: 80, background: `linear-gradient(145deg, ${c}, #e8eeff)`, boxShadow: `0 16px 40px ${c}44` }}>
        <div className="absolute top-3 left-3 w-5 h-8 rounded-full bg-white/40 blur-sm" />
        <div className="absolute left-1/2 -translate-x-1/2 w-px h-12" style={{ top: "80px", background: "rgba(255,255,255,0.2)" }} />
      </div>
    </motion.button>
  );
}

/* ============================ STYLE TAG ============================ */

function StyleTag() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..500&family=Inter:wght@300;400;500&display=swap');
      .display { font-family: 'Fraunces', serif; }
      .body-font { font-family: 'Inter', sans-serif; }
      .eyebrow { font-family: 'Inter', sans-serif; text-transform: uppercase; letter-spacing: 0.32em; font-weight: 400; }
      html, body { -webkit-text-size-adjust: 100%; -webkit-tap-highlight-color: transparent; overscroll-behavior-y: none; background:#0A0E27; }
      * { -webkit-tap-highlight-color: transparent; }
      button { touch-action: manipulation; }
      .no-scrollbar::-webkit-scrollbar { display: none; }
      .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      .grain { position: relative; }
      .grain::after {
        content:''; position:absolute; inset:0; pointer-events:none; opacity:0.4; border-radius:inherit;
        background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.04 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        mix-blend-mode:overlay;
      }
      @media (prefers-reduced-motion: reduce) {
        * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
      }
    `}</style>
  );
}