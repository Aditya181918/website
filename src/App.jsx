// App.jsx — "For Baby Boo"
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
import * as THREE from "three";

const NAME = "Baby Boo";

// Shared ref to the scroll-snap container, so whileInView viewport detection
// uses the correct scroll root (fixes blank scenes inside the snap container).
const scrollRootRef = { current: null };

/* ============================ CONTENT ============================ */

const balloonNotes = [
  "You make ordinary Tuesdays feel like plot points.",
  "You're my favourite notification.",
  "Peace, for me, is wherever you're rambling about your day.",
  "Could you BE any more amazing?",
  "I love you more than you love sleeping in. And that's saying something.",
  "You feel like the good kind of plot twist.",
  "Somehow you make silence feel like a conversation.",
  "I hope we get slow mornings, burnt toast, and all of it.",
  "You're the kind of person people build entire websites about. Clearly.",
  "I'd pick you in every timeline. Every single one.",
];

// Merged: the quick reassurance (short) + the full letter (long).
// Tap a card → short line first, then the letter beneath it.
const feelings = [
  {
    title: "when you miss me",
    short: "Good news: I'm probably missing you harder. It's not a competition, but I'm winning.",
    long: "Close your eyes. I'm right there — in the pause between your thoughts, in the warm side of the pillow. I never really leave; I just get quieter for a while. Missing me is allowed. I'm missing you right back, probably harder, definitely right now.",
    accent: "#C4B4FF",
  },
  {
    title: "when you're overthinking",
    short: "Hey. Put the thought down. Step away from the thought. We can overthink together later — it's a two-person job.",
    long: "Your brain is being loud again, isn't it? Here's the truth: none of it is as big as it feels at 1am. Whatever you said, whatever you replayed for the fourth time — it's okay. You're allowed to put the thought down. I'll hold it for a while. I have big pockets.",
    accent: "#B4DCDC",
  },
  {
    title: "when you need reassurance",
    short: "You are loved. Aggressively. Permanently. By me. There's nothing you could do about it, even if you tried.",
    long: "You are not too much. You are not too little. You are not a rough draft I'm editing. You are not at risk of being left. I'm not going anywhere — not when it's hard, not when you're quiet, not when you're convinced you're unlovable. Especially not then. That's exactly when I dig in.",
    accent: "#A8C5F0",
  },
  {
    title: "when you can't sleep",
    short: "It's late and your brain has decided to host a conference. Borrow my calm.",
    long: "Hi. It's late. Your eyes are heavy but your brain has decided to host a conference. Borrow my calm for tonight — imagine my hand on your back, slow circles, no agenda. The day is over. You did enough. You are enough. Sleep, my love.",
    accent: "#C4B4FF",
  },
  {
    title: "when life feels heavy",
    short: "Put it down. Just for a few minutes. The world can hold itself together without you supervising.",
    long: "Put it down. Whatever it is. Just for a few minutes — the world can hold itself together without you supervising. The weight you're carrying is real, but it was never meant to be carried alone. I'm here. Hand me the heavy end.",
    accent: "#E0A8B8",
  },
  {
    title: "when you need a smile",
    short: "You're cute even when you're being dramatic. Especially when you're being dramatic.",
    long: "",
    accent: "#E8C39E",
  },
  {
    title: "when you need a hug",
    short: "Consider this a hug in website form. The real one is coming. It's collecting interest.",
    long: "",
    accent: "#E0A8B8",
  },
];

const episodeCards = [
  { title: "The One Where I Realized", text: "Somewhere between your third voice note in a row and you laughing at your own joke, it hit me: oh no. It's her. It was always going to be her." },
  { title: "The One Where Life Felt Softer", text: "You showed up and suddenly my days had a soundtrack. A warm one. Slightly chaotic. Mostly you talking." },
  { title: "The One Where You Stayed In My Head", text: "I see a dog, I think of you. I eat something good, I think of you. At this point my brain is basically your fan account." },
  { title: "The One I Never Want To End", text: "If life is kind, it gives me decades more of this. If it's very kind — slow mornings too." },
];



// Merged: the small things I notice + the things I think when it's quiet.
const smallThings = [
  "The way you say 'hmm' when you're thinking — like a tiny committee is deliberating in there.",
  "How you go quiet when something actually matters to you.",
  "I wonder if you know how often you cross my mind. It's basically a commute at this point.",
  "Your dramatic retelling of events that were, objectively, not that dramatic.",
  "You made life feel less lonely without even trying.",
  "The burst-texting when you're excited. Seventeen messages. No punctuation. Pure joy.",
  "You feel familiar to my soul. Like I've known you across a few lifetimes and several questionable haircuts.",
  "Your late-night energy. Where does it come from. Science needs to know.",
  "Sometimes I catch myself smiling at nothing. It's never nothing. It's you.",
  "How you make a grocery run sound like an epic saga with three plot twists.",
  "I hope someone told you today how rare you are. If not — consider it done.",
  "The way you're a completely different person before your first coffee.",
  "Loving you doesn't feel like a decision. It feels like remembering something I always knew.",
  "How your name became my favourite word without asking my permission.",
];

// Cancer constellation — her zodiac. 5 real stars + 3 memory stars.
const stars = [
  { x: 30, y: 80, lead: true, name: "Acubens", text: "You make me want to be gentler — with the world, with myself, with everything.", connects: [1] },
  { x: 42, y: 64, lead: true, name: "Altarf", text: "Being loved by you, Baby Boo, is the rarest thing I own.", connects: [7] },
  { x: 50, y: 46, lead: true, name: "Asellus Australis", text: "The first time you laughed at something I said — that was it. Game over.", connects: [3, 4] },
  { x: 72, y: 24, lead: true, name: "Asellus Borealis", text: "Some people feel like home. You feel like home with the lights left on for me.", connects: [] },
  { x: 24, y: 20, lead: true, name: "Tegmine", text: "In every version of this life, I'd find you. I might be late sometimes. But I'd find you.", connects: [] },
  { x: 36, y: 34, name: "", text: "I could listen to you talk for hours. I have. I plan to keep doing it.", connects: [] },
  { x: 62, y: 34, name: "", text: "There's something about the way you exist that makes everything else make sense.", connects: [] },
  { x: 46, y: 55, name: "", text: "You're the reason I believe in slow, sure, stubborn love.", connects: [2] },
];



const promises = [
  "I promise to always answer when you call. Yes, even mid-meeting. Especially mid-meeting.",
  "I promise no fight ends in silence. One of us reaches out. It's usually me. I've made peace with this.",
  "I promise to notice the small things — the new earrings, the haircut, the mood you think you're hiding.",
  "I promise you'll never feel like a burden. Not on your worst day. Not ever.",
  "I promise honesty, even when a comfortable lie would be easier.",
  "I promise to choose you on the hard days. The boring days. The 2am days. All of them.",
  "I promise to remember what matters to you — including the things you forget you told me.",
  "I promise to grow with you, not away from you. Like two plants sharing a pot. But romantic.",
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

// ── TIMELINE ──────────────────────────────────────────────────────────
// Your story as a growing album. To add a new visit later, copy the first
// object, change date/place/title, and list the new photos (drop the image
// files in /public first). The "to be continued" marker renders automatically.
const timeline = [
  {
    date: "may 2026",
    place: "mumbai",
    title: "the visit that started this album",
    moments: [
      { src: "/photo-plane.jpeg", caption: "of all the places I've been, my favourite is next to you." },
      { src: "/photo-lights.jpeg", caption: "the nights got softer once they had you in them." },
      { src: "/photo-flowers.jpeg", caption: "you, casually outshining an entire wall of flowers." },
      { src: "/photo-masks.jpeg", caption: "even our ridiculous looks like love to me." },
      { src: "/photo-happy.jpeg", caption: "asked and answered." },
      { src: "/photo-hug.jpeg", caption: "and when I hold you, the whole world goes quiet.", secret: true },
    ],
  },
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
      animate={{ opacity: 1, y: 0 }}
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

/* ============================ COSMOS — Three.js living background ============================ */
// A continuous dream-cosmos the camera drifts through as she scrolls.
// Layered: deep starfield, drifting dust, soft nebula clouds, floating light motes.
// Reads a scroll-progress ref (0..1) to push the camera forward through the world.

function Cosmos({ progressRef, isMobile, rideRef }) {
  const mountRef = useRef(null);
  const rafRef = useRef(0);
  const stateRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = () => mount.clientWidth;
    const H = () => mount.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0e27, 0.0009);

    const camera = new THREE.PerspectiveCamera(62, W() / H(), 0.1, 2200);
    camera.position.set(0, 0, 600);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(W(), H());
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 2 : 2.5));
    mount.appendChild(renderer.domElement);

    // ── palette ──
    const GOLD = new THREE.Color(0xe8c39e);
    const ROSE = new THREE.Color(0xe0a8b8);
    const MOON = new THREE.Color(0xa8c5f0);
    const WHITE = new THREE.Color(0xffffff);
    const LAV = new THREE.Color(0xc4b4ff);

    // ── helper: circular sprite texture for soft points ──
    const makeDisc = () => {
      const c = document.createElement("canvas");
      c.width = c.height = 64;
      const g = c.getContext("2d");
      const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.25, "rgba(255,255,255,0.9)");
      grad.addColorStop(0.5, "rgba(255,255,255,0.35)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = grad;
      g.fillRect(0, 0, 64, 64);
      const t = new THREE.CanvasTexture(c);
      return t;
    };
    const disc = makeDisc();

    const groups = [];

    // ── deep starfield (the vast backdrop) ──
    const starCount = isMobile ? 2600 : 5200;
    {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(starCount * 3);
      const col = new Float32Array(starCount * 3);
      const sizes = new Float32Array(starCount);
      for (let i = 0; i < starCount; i++) {
        // spread through a long tunnel of space along -z
        const r = 200 + Math.random() * 900;
        const theta = Math.random() * Math.PI * 2;
        const y = (Math.random() - 0.5) * 1400;
        pos[i * 3] = Math.cos(theta) * r;
        pos[i * 3 + 1] = y;
        pos[i * 3 + 2] = -Math.random() * 2000 + 300;
        // mostly cool white-blue, occasional warm
        const pick = Math.random();
        const c = pick > 0.86 ? GOLD : pick > 0.72 ? ROSE : pick > 0.5 ? MOON : WHITE;
        col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
        sizes[i] = 1 + Math.random() * 3.5;
      }
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
      geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
      const mat = new THREE.PointsMaterial({
        size: 3.2, map: disc, vertexColors: true, transparent: true,
        opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true,
      });
      const pts = new THREE.Points(geo, mat);
      scene.add(pts);
      groups.push({ obj: pts, kind: "stars" });
    }

    // ── drifting dust motes (closer, parallax) ──
    const dustCount = isMobile ? 700 : 1400;
    {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(dustCount * 3);
      for (let i = 0; i < dustCount; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 1200;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 1000;
        pos[i * 3 + 2] = -Math.random() * 1600 + 400;
      }
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({
        size: 5, map: disc, color: GOLD, transparent: true,
        opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true,
      });
      const pts = new THREE.Points(geo, mat);
      scene.add(pts);
      groups.push({ obj: pts, kind: "dust" });
    }

    // ── soft nebula clouds (big glowing sprites) ──
    const nebula = [];
    {
      const cloudColors = [GOLD, ROSE, MOON, LAV];
      const n = isMobile ? 7 : 12;
      for (let i = 0; i < n; i++) {
        const c = cloudColors[i % cloudColors.length];
        const mat = new THREE.SpriteMaterial({
          map: disc, color: c, transparent: true, opacity: 0.10,
          depthWrite: false, blending: THREE.AdditiveBlending,
        });
        const s = new THREE.Sprite(mat);
        s.position.set((Math.random() - 0.5) * 1000, (Math.random() - 0.5) * 800, -Math.random() * 1800);
        const scl = 300 + Math.random() * 500;
        s.scale.set(scl, scl, 1);
        scene.add(s);
        nebula.push(s);
      }
    }

    // ── floating light motes (the "alive" feeling — slow bobbing orbs) ──
    const motes = [];
    {
      const n = isMobile ? 14 : 26;
      for (let i = 0; i < n; i++) {
        const c = Math.random() > 0.5 ? GOLD : MOON;
        const mat = new THREE.SpriteMaterial({
          map: disc, color: c, transparent: true, opacity: 0.7,
          depthWrite: false, blending: THREE.AdditiveBlending,
        });
        const s = new THREE.Sprite(mat);
        s.position.set((Math.random() - 0.5) * 700, (Math.random() - 0.5) * 500, -Math.random() * 1400 + 200);
        const scl = 6 + Math.random() * 16;
        s.scale.set(scl, scl, 1);
        s.userData = { baseY: s.position.y, phase: Math.random() * Math.PI * 2, amp: 10 + Math.random() * 30, spd: 0.3 + Math.random() * 0.6 };
        scene.add(s);
        motes.push(s);
      }
    }

    // ══════════ THE RIDE: track, rings, speed streaks ══════════
    const RIDE_BASE_Z = 300;
    const RD_ = { climb: 4.5, hang: 1.5, drop: 3.5, turns: 3.5, out: 3 };
    const _T1 = RD_.climb, _T2 = _T1 + RD_.hang, _T3 = _T2 + RD_.drop, _T4 = _T3 + RD_.turns, _T5 = _T4 + RD_.out;

    // one source of truth for the path — camera AND rails use this
    const ridePath = (rt) => {
      let x = 0, y = 0, z = 0, roll = 0;
      if (rt < _T1) {
        const u = rt / _T1, e = u * u;
        y = e * 300; z = RIDE_BASE_Z - u * 140; roll = 0;
      } else if (rt < _T2) {
        const u = (rt - _T1) / RD_.hang;
        y = 300 + Math.sin(u * Math.PI * 2) * 5; z = RIDE_BASE_Z - 140 - u * 25; roll = 0;
      } else if (rt < _T3) {
        const u = (rt - _T2) / RD_.drop, e = u * u * u;
        y = 300 - e * 460; z = RIDE_BASE_Z - 165 - e * 950; roll = Math.sin(u * Math.PI) * 0.16;
      } else if (rt < _T4) {
        const u = (rt - _T3) / RD_.turns;
        y = -160 + Math.sin(u * Math.PI * 2) * 70 + u * 110;
        z = RIDE_BASE_Z - 1115 - u * 760;
        x = Math.sin(u * Math.PI * 3) * 130;           // lateral swing = real turns
        roll = -Math.sin(u * Math.PI * 3) * 0.42;      // bank into them
      } else {
        const u = Math.min(1, (rt - _T4) / RD_.out), e = 1 - Math.pow(1 - u, 3);
        y = -50 * (1 - e); z = RIDE_BASE_Z - 1875 - e * 220;
        x = Math.sin(Math.PI * 3) * 130 * (1 - e);
        roll = Math.sin(u * Math.PI) * 0.06 * (1 - e);
      }
      return { x, y, z, roll };
    };

    const rideGroup = new THREE.Group();
    rideGroup.visible = false;
    scene.add(rideGroup);

    {
      // ── rails ──
      const STEPS = 260, GAUGE = 26;
      const leftPts = [], rightPts = [], tiePts = [];
      for (let i = 0; i <= STEPS; i++) {
        const rt = (i / STEPS) * _T5;
        const p = ridePath(rt);
        const px = Math.cos(p.roll) * GAUGE, py = Math.sin(p.roll) * GAUGE;
        leftPts.push(new THREE.Vector3(p.x - px, p.y - py, p.z));
        rightPts.push(new THREE.Vector3(p.x + px, p.y + py, p.z));
        if (i % 4 === 0) {
          tiePts.push(new THREE.Vector3(p.x - px, p.y - py, p.z));
          tiePts.push(new THREE.Vector3(p.x + px, p.y + py, p.z));
        }
      }
      const railMat = new THREE.LineBasicMaterial({ color: 0xe8c39e, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false });
      rideGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(leftPts), railMat));
      rideGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(rightPts), railMat));
      const tieMat = new THREE.LineBasicMaterial({ color: 0xa8c5f0, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending, depthWrite: false });
      rideGroup.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(tiePts), tieMat));

      // ── glowing rings to fly through ──
      const ringMat = new THREE.LineBasicMaterial({ color: 0xe0a8b8, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false });
      for (let i = 2; i < 26; i++) {
        const rt = (i / 26) * _T5;
        const p = ridePath(rt);
        const pts = [];
        const R = 70 + Math.sin(i) * 12;
        for (let a = 0; a <= 40; a++) {
          const ang = (a / 40) * Math.PI * 2;
          pts.push(new THREE.Vector3(p.x + Math.cos(ang) * R, p.y + Math.sin(ang) * R, p.z));
        }
        rideGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), ringMat));
      }

      // ── speed streaks: long thin lines that whip past at velocity ──
      const streakPts = [];
      const SN = isMobile ? 260 : 520;
      for (let i = 0; i < SN; i++) {
        const rt = Math.random() * _T5;
        const p = ridePath(rt);
        const ang = Math.random() * Math.PI * 2;
        const rad = 70 + Math.random() * 320;
        const sx = p.x + Math.cos(ang) * rad;
        const sy = p.y + Math.sin(ang) * rad;
        const len = 50 + Math.random() * 130;
        streakPts.push(new THREE.Vector3(sx, sy, p.z + len / 2));
        streakPts.push(new THREE.Vector3(sx, sy, p.z - len / 2));
      }
      const streakMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.28, blending: THREE.AdditiveBlending, depthWrite: false });
      const streaks = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(streakPts), streakMat);
      rideGroup.add(streaks);
    }

    stateRef.current = { scene, camera, renderer, groups, nebula, motes };

    // ── pointer parallax (subtle) ──
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointer = (e) => {
      const cx = (e.touches ? e.touches[0].clientX : e.clientX) || 0;
      const cy = (e.touches ? e.touches[0].clientY : e.clientY) || 0;
      pointer.tx = (cx / W() - 0.5) * 2;
      pointer.ty = (cy / H() - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer);
    window.addEventListener("touchmove", onPointer, { passive: true });

    // ── resize ──
    const onResize = () => {
      camera.aspect = W() / H();
      camera.updateProjectionMatrix();
      renderer.setSize(W(), H());
    };
    window.addEventListener("resize", onResize);

    // ── animation loop ──
    const clock = new THREE.Clock();
    let curZ = 600;
    // ride state that decays back to normal after the ride ends
    let rideY = 0, rideRoll = 0, rideFov = 62, rideZ = null;

    // ride timing (seconds)
    const RD = { climb: 4.5, hang: 1.5, drop: 3.5, turns: 3.5, out: 3 };
    const T1 = RD.climb, T2 = T1 + RD.hang, T3 = T2 + RD.drop, T4 = T3 + RD.turns, T5 = T4 + RD.out;

    const animate = () => {
      const t = clock.getElapsedTime();
      const p = progressRef.current || 0; // 0..1 scroll progress
      const ride = rideRef && rideRef.current;

      // pointer parallax eased (always)
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;

      if (ride && ride.active) {
        // ─── THE ROLLERCOASTER ───
        const rt = (performance.now() - ride.start) / 1000;

        if (rt >= _T5) {
          ride.active = false;
          curZ = rideZ != null ? rideZ : curZ;
          if (ride.onEnd) { ride.onEnd(); ride.onEnd = null; }
        } else {
          const p = ridePath(rt);
          rideY = p.y; rideZ = p.z; rideRoll = p.roll;

          // field of view widens with speed — this is what sells the drop
          let speedU = 0;
          if (rt >= _T2 && rt < _T3) speedU = Math.pow((rt - _T2) / RD_.drop, 3);
          else if (rt >= _T3 && rt < _T4) speedU = 1 - ((rt - _T3) / RD_.turns) * 0.3;
          else if (rt >= _T4) speedU = Math.max(0, 0.7 - ((rt - _T4) / RD_.out) * 0.7);
          rideFov = 58 + speedU * 38;

          rideGroup.visible = true;
          const shake = rt < _T1 ? Math.sin(rt * 26) * 0.8 : 0; // clack-clack on the climb

          camera.position.set(p.x + shake + pointer.x * 8, p.y + 14, p.z);
          camera.lookAt(
            ridePath(Math.min(_T5, rt + 0.55)).x,
            ridePath(Math.min(_T5, rt + 0.55)).y + 14,
            ridePath(Math.min(_T5, rt + 0.55)).z
          );
          camera.rotation.z = p.roll;
          if (Math.abs(camera.fov - rideFov) > 0.05) { camera.fov = rideFov; camera.updateProjectionMatrix(); }
        }
      } else {
        // ─── NORMAL: scroll-driven flight ───
        rideGroup.visible = false;
        const targetZ = 600 - p * 1700;
        curZ += (targetZ - curZ) * 0.05;
        // decay any leftover ride motion smoothly
        rideY *= 0.93; rideRoll *= 0.93;
        rideFov += (62 - rideFov) * 0.06;
        camera.position.z = curZ;
        camera.position.x = pointer.x * 40;
        camera.position.y = -pointer.y * 28 + rideY;
        camera.lookAt(0, 0, curZ - 400);
        camera.rotation.z = rideRoll;
        if (Math.abs(camera.fov - rideFov) > 0.05) { camera.fov = rideFov; camera.updateProjectionMatrix(); }
      }

      // gentle rotation of star/dust fields for life
      groups.forEach((g) => {
        if (g.kind === "stars") g.obj.rotation.z = t * 0.005;
        if (g.kind === "dust") { g.obj.rotation.z = -t * 0.01; }
      });

      // nebula slow drift + pulse
      nebula.forEach((s, i) => {
        s.material.opacity = 0.07 + Math.sin(t * 0.2 + i) * 0.03;
        s.position.x += Math.sin(t * 0.05 + i) * 0.05;
      });

      // motes bob
      motes.forEach((s) => {
        const u = s.userData;
        s.position.y = u.baseY + Math.sin(t * u.spd + u.phase) * u.amp;
        s.material.opacity = 0.5 + Math.sin(t * u.spd * 1.5 + u.phase) * 0.25;
      });

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    // ── cleanup ──
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("touchmove", onPointer);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      disc.dispose();
      groups.forEach((g) => { g.obj.geometry.dispose(); g.obj.material.dispose(); });
      nebula.forEach((s) => s.material.dispose());
      rideGroup.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); });
      motes.forEach((s) => s.material.dispose());
      if (renderer.domElement && renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [isMobile, progressRef, rideRef]);

  return <div ref={mountRef} className="fixed inset-0" style={{ zIndex: 0, pointerEvents: "none" }} />;
}

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

function TiltPhoto({ src, caption, deviceTilt, instant = false }) {
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
        initial={{ opacity: 0, y: 60, scale: 0.85, filter: "blur(16px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
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

function FeelingModal({ feeling, close }) {
  return (
    <Modal close={close} maxWidth="max-w-xl">
      <p className="eyebrow text-[10px] mb-4" style={{ color: "rgba(168,197,240,0.5)" }}>for right now</p>
      <h3 className="display text-2xl sm:text-3xl mb-6 leading-snug" style={{ color: "#EAE6F0" }}>{feeling.title}</h3>
      <p className="text-base sm:text-lg leading-relaxed" style={{ color: "rgba(234,230,240,0.9)" }}>{feeling.short}</p>
      {feeling.long ? (
        <>
          <div className="h-px my-6" style={{ background: "linear-gradient(to right, transparent, rgba(232,195,158,0.3), transparent)" }} />
          <p className="text-base leading-relaxed" style={{ color: "rgba(234,230,240,0.75)" }}>{feeling.long}</p>
        </>
      ) : null}
      <p className="text-sm mt-8 italic" style={{ color: "rgba(234,230,240,0.45)" }}>— yours, always.</p>
    </Modal>
  );
}

/* ============================ HUG EXPERIENCE ============================ */

function HugButton({ onTriggered }) {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 120 }}
      whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
      onClick={onTriggered}
      className="fixed left-5 z-40 rounded-full p-4 sm:p-5 select-none grain"
      style={{
        bottom: "calc(6.5rem + env(safe-area-inset-bottom, 0px))",
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(232,195,158,0.2)",
        boxShadow: "0 0 40px rgba(232,195,158,0.2)",
        touchAction: "manipulation",
      }}
      aria-label="need a hug"
    >
      <motion.span
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center gap-2"
      >
        <Hand size={20} style={{ color: "#E8C39E" }} />
        <span className="text-sm body-font hidden sm:inline" style={{ color: "rgba(234,230,240,0.85)" }}>need a hug?</span>
      </motion.span>
    </motion.button>
  );
}

/* ============================ HUG — held, not watched ============================ */

const HUG_MODES = {
  sad: {
    key: "sad",
    label: "I'm sad",
    opening: "oh, love. come here.",
    lines: [
      "you don't have to explain it. not to me.",
      "it's allowed to just be heavy today.",
      "I'm not going to try to fix it. I'm just going to stay.",
      "you are not a burden. you have never been a burden.",
      `I've got you, ${NAME}. for as long as you need.`,
    ],
    tint: "224,168,184",
  },
  overwhelmed: {
    key: "overwhelmed",
    label: "I'm overwhelmed",
    opening: "okay. everything stops for a second.",
    lines: [
      "you don't have to hold all of it at once.",
      "nothing on that list is more important than you right now.",
      "breathe out. slower than that. yes — like that.",
      "it will still be there in ten minutes. so will I.",
      `one thing at a time, ${NAME}. and not yet.`,
    ],
    tint: "180,220,220",
  },
  miss: {
    key: "miss",
    label: "I just miss you",
    opening: "I know. I miss you too — more than I let on.",
    lines: [
      "close your eyes. I'm right here.",
      "this is the part where I'd not let go first.",
      "I'm counting the days too. every single one.",
      "the distance is temporary. this isn't.",
      `soon, ${NAME}. properly. for real.`,
    ],
    tint: "232,195,158",
  },
};

function HugExperience({ close }) {
  const [mode, setMode] = useState(null);       // null = choosing
  const [holding, setHolding] = useState(false);
  const [heldSecs, setHeldSecs] = useState(0);
  const [lineIdx, setLineIdx] = useState(-1);   // -1 = opening line
  const [leaving, setLeaving] = useState(false);
  const beatRef = useRef(null);
  const tickRef = useRef(null);

  const M = mode ? HUG_MODES[mode] : null;

  // time-aware first words
  const timeLine = useRef((() => {
    const h = new Date().getHours();
    if (h >= 0 && h < 5) return `it's late, ${NAME}.`;
    if (h < 12) return `morning, ${NAME}.`;
    if (h < 18) return `hey, ${NAME}.`;
    return `long day, ${NAME}?`;
  })()).current;

  // ── heartbeat + line progression while she holds ──
  useEffect(() => {
    if (!holding || !M) return;
    // steady heartbeat: lub-dub, ~60bpm
    const beat = () => { if (navigator.vibrate) navigator.vibrate([26, 95, 42]); };
    beat();
    beatRef.current = setInterval(beat, 1150);
    tickRef.current = setInterval(() => {
      setHeldSecs((s) => {
        const n = s + 1;
        // a new line every ~5 seconds held
        setLineIdx((li) => (n % 5 === 0 && li < M.lines.length - 1 ? li + 1 : li));
        return n;
      });
    }, 1000);
    return () => { clearInterval(beatRef.current); clearInterval(tickRef.current); };
  }, [holding, M]);

  useEffect(() => () => { clearInterval(beatRef.current); clearInterval(tickRef.current); }, []);

  const startHold = () => { if (M) { setHolding(true); if (lineIdx < 0) setLineIdx(0); } };
  const endHold = () => setHolding(false);

  const chooseMode = (k) => {
    setMode(k);
    if (navigator.vibrate) navigator.vibrate(20);
  };

  const doLeave = () => {
    setLeaving(true);
    clearInterval(beatRef.current); clearInterval(tickRef.current);
    if (navigator.vibrate) navigator.vibrate(30);
    setTimeout(close, 1500);
  };

  const tint = M ? M.tint : "232,195,158";

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center px-6 overflow-hidden"
      style={{
        zIndex: 110,
        background: "radial-gradient(circle at center, rgba(30,26,46,0.97) 0%, rgba(10,14,39,0.98) 60%, rgba(5,8,22,1) 100%)",
        backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)",
        touchAction: "none",
      }}
      initial={{ opacity: 0 }} animate={{ opacity: leaving ? 0 : 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2 }}
      onPointerDown={M ? startHold : undefined}
      onPointerUp={M ? endHold : undefined}
      onPointerCancel={M ? endHold : undefined}
      onPointerLeave={M ? endHold : undefined}
    >
      {/* ── THE ARMS — two luminous arcs that close around her ── */}
      {M && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="armL" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={`rgba(${tint},0)`} />
              <stop offset="60%" stopColor={`rgba(${tint},0.55)`} />
              <stop offset="100%" stopColor={`rgba(${tint},0.8)`} />
            </linearGradient>
            <linearGradient id="armR" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0%" stopColor={`rgba(${tint},0)`} />
              <stop offset="60%" stopColor={`rgba(${tint},0.55)`} />
              <stop offset="100%" stopColor={`rgba(${tint},0.8)`} />
            </linearGradient>
          </defs>
          <motion.path
            d="M -30 40 Q 90 190 200 250"
            fill="none" stroke="url(#armL)" strokeWidth="26" strokeLinecap="round"
            animate={{ x: holding ? 55 : -40, opacity: holding ? 0.95 : 0.35 }}
            transition={{ duration: holding ? 1.6 : 2.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ filter: `blur(1px) drop-shadow(0 0 26px rgba(${tint},0.6))` }}
          />
          <motion.path
            d="M 430 40 Q 310 190 200 250"
            fill="none" stroke="url(#armR)" strokeWidth="26" strokeLinecap="round"
            animate={{ x: holding ? -55 : 40, opacity: holding ? 0.95 : 0.35 }}
            transition={{ duration: holding ? 1.6 : 2.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ filter: `blur(1px) drop-shadow(0 0 26px rgba(${tint},0.6))` }}
          />
        </svg>
      )}

      {/* warmth that swells while held, with a heartbeat pulse */}
      {M && (
        <motion.div
          className="absolute pointer-events-none rounded-full"
          animate={holding
            ? { scale: [1, 1.05, 1], opacity: 0.6 }
            : { scale: 1, opacity: 0.2 }}
          transition={holding
            ? { scale: { duration: 1.15, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 1.4 } }
            : { duration: 2 }}
          style={{
            width: "72vmin", height: "72vmin",
            background: `radial-gradient(circle, rgba(${tint},0.5) 0%, rgba(${tint},0.15) 45%, transparent 72%)`,
            filter: "blur(44px)",
          }}
        />
      )}

      {/* close */}
      {!leaving && (
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={doLeave}
          className="absolute right-6 text-white/40 hover:text-white/80 z-20"
          style={{ top: "calc(1.5rem + env(safe-area-inset-top,0px))" }}
          aria-label="close"
        >
          <X size={22} />
        </button>
      )}

      {/* ── CHOOSING ── */}
      <AnimatePresence mode="wait">
        {!mode && !leaving && (
          <motion.div key="choose" className="relative z-10 text-center max-w-md w-full"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.9 }}
          >
            <p className="display leading-snug mb-2" style={{ fontSize: "clamp(1.9rem,6vw,3rem)", color: "#EAE6F0" }}>{timeLine}</p>
            <p className="text-sm italic mb-10" style={{ color: "rgba(234,230,240,0.55)" }}>what kind of hug do you need?</p>
            <div className="flex flex-col gap-3">
              {Object.values(HUG_MODES).map((m, i) => (
                <motion.button
                  key={m.key}
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={() => chooseMode(m.key)}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.12, duration: 0.7 }}
                  whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-full grain"
                  style={{
                    background: `rgba(${m.tint},0.10)`,
                    border: `1px solid rgba(${m.tint},0.4)`,
                    color: "#EAE6F0", fontSize: "1.05rem",
                    backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
                  }}
                >
                  {m.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── BEING HELD ── */}
      <AnimatePresence>
        {mode && !leaving && (
          <motion.div key="held" className="relative z-10 text-center max-w-lg w-full flex flex-col items-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={lineIdx}
                initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                transition={{ duration: 1.3, ease: "easeOut" }}
                className="display leading-snug px-4"
                style={{ fontSize: "clamp(1.5rem,5vw,2.6rem)", color: "#EAE6F0", textShadow: `0 0 40px rgba(${tint},0.4)` }}
              >
                {lineIdx < 0 ? M.opening : M.lines[Math.min(lineIdx, M.lines.length - 1)]}
              </motion.p>
            </AnimatePresence>

            {/* hold prompt / held state */}
            <motion.div className="mt-14 flex flex-col items-center" animate={{ opacity: holding ? 0.55 : 0.9 }} transition={{ duration: 0.8 }}>
              <motion.div
                animate={holding ? { scale: [1, 1.18, 1] } : { scale: [1, 1.06, 1] }}
                transition={{ duration: holding ? 1.15 : 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-full mb-4"
                style={{
                  width: 46, height: 46,
                  border: `1.5px solid rgba(${tint},0.7)`,
                  background: holding ? `radial-gradient(circle, rgba(${tint},0.35), transparent 70%)` : "transparent",
                  boxShadow: holding ? `0 0 40px rgba(${tint},0.6)` : `0 0 14px rgba(${tint},0.25)`,
                }}
              />
              <p className="text-xs italic" style={{ color: "rgba(234,230,240,0.6)" }}>
                {holding ? "I've got you. don't let go yet." : "press and hold anywhere — I'll hold back."}
              </p>
              {holding && heldSecs > 8 && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.45 }} transition={{ duration: 1.5 }}
                  className="text-[11px] mt-2" style={{ color: "rgba(234,230,240,0.5)" }}>
                  stay as long as you need.
                </motion.p>
              )}
            </motion.div>

            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={doLeave}
              className="mt-12 px-8 py-3 rounded-full"
              style={{ border: `1px solid rgba(${tint},0.3)`, color: "rgba(234,230,240,0.7)", background: "rgba(255,255,255,0.04)" }}
            >
              <span className="text-sm">I'm okay now</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* leaving */}
      <AnimatePresence>
        {leaving && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 0.85, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}
            className="absolute bottom-20 left-0 right-0 text-center display text-xl sm:text-2xl italic px-6"
            style={{ color: `rgba(${tint},0.9)` }}>
            come back whenever you need this.
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ============================ TIMELINE — the growing album ============================ */

function TimelineView({ deviceTilt }) {
  return (
    <div className="relative">
      {/* the golden thread */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute left-[14px] top-0 bottom-0 w-px"
        style={{
          transformOrigin: "top",
          background: "linear-gradient(to bottom, rgba(232,195,158,0.7), rgba(232,195,158,0.35) 70%, transparent)",
          boxShadow: "0 0 8px rgba(232,195,158,0.4)",
        }}
      />

      {timeline.map((visit, vi) => (
        <div key={vi} className="relative">
          {/* visit node — glowing dot + date */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="flex items-center gap-4 mb-3"
          >
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.25, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-full flex-shrink-0"
              style={{
                width: 13, height: 13, marginLeft: 8,
                background: "radial-gradient(circle, #fff, #ffe5b0 55%, #e8c39e)",
                boxShadow: "0 0 18px rgba(232,195,158,0.9)",
              }}
            />
            <div>
              <p className="eyebrow text-[10px]" style={{ color: "#E8C39E" }}>{visit.date} · {visit.place}</p>
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4, delay: 0.3 }}
            className="display italic text-lg sm:text-xl mb-10 pl-10" style={{ color: "rgba(234,230,240,0.75)" }}
          >
            {visit.title}
          </motion.p>

          {/* moments hanging off the thread */}
          <div className="space-y-14 pl-10 pb-14">
            {visit.moments.map((m, mi) => {
              const card = (
                <div style={{ transform: `rotate(${mi % 2 === 0 ? -1.5 : 1.5}deg)` }}>
                  <TiltPhoto src={m.src} caption={m.caption} deviceTilt={deviceTilt} instant />
                </div>
              );
              return (
                <div key={mi} className="relative">
                  {/* small dot on the thread for each moment */}
                  <div
                    className="absolute rounded-full"
                    style={{
                      left: -29, top: 28, width: 7, height: 7,
                      background: "rgba(232,195,158,0.7)",
                      boxShadow: "0 0 8px rgba(232,195,158,0.5)",
                    }}
                  />
                  {m.secret ? <HoldSecret>{card}</HoldSecret> : card}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* to be continued — the waiting spot for the next visit */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6 }}
        className="flex items-center gap-4 pb-2"
      >
        <motion.div
          animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.18, 1] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          className="rounded-full flex-shrink-0"
          style={{
            width: 13, height: 13, marginLeft: 8,
            border: "1.5px solid rgba(232,195,158,0.8)",
            background: "transparent",
            boxShadow: "0 0 12px rgba(232,195,158,0.4)",
          }}
        />
        <div>
          <p className="display italic text-lg sm:text-xl" style={{ color: "#E8C39E" }}>to be continued…</p>
          <p className="text-xs italic mt-1" style={{ color: "rgba(234,230,240,0.45)" }}>the next chapter is waiting for us.</p>
        </div>
      </motion.div>
    </div>
  );
}

/* ============================ CONSTELLATION SCENE ============================ */

function ConstellationScene({ onSelect, onComplete }) {
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
    if (!found.includes(i)) {
      const next = [...found, i];
      setFound(next);
      if (next.length === stars.length && onComplete) onComplete();
    }
  };

  let progress = "tap the stars to find me.";
  if (found.length > 0 && found.length < 4) progress = `${found.length} of ${stars.length} found.`;
  else if (found.length >= 4 && found.length < stars.length) progress = `halfway home. ${stars.length - found.length} to go.`;
  else if (found.length === stars.length) progress = "you found me. every single one.";

  return (
    <div className="relative w-full max-w-2xl" style={{ zIndex: 2 }}>
      <ChapterLabel num="viii" title="your stars" />
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
              <motion.button key={i}
                onPointerUp={(e) => { e.stopPropagation(); tap(s, i); }}
                className="absolute flex items-center justify-center"
                style={{ left: `${s.x}%`, top: `${s.y}%`, width: 64, height: 64, transform: `translate(-50%,-50%) translateZ(${z}px)`, touchAction: "manipulation" }}
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

/* ============================ FIREFLY JAR — a jar of promises ============================ */
// A glowing glass jar full of fireflies. Each firefly is a promise.
// Tap the jar (or a firefly) → the next firefly floats up, out, and blooms
// into its promise. The jar empties as she opens them; when all are out,
// they drift above the jar as a small constellation of released promises.

const PROMISE_GLOWS = ["#E8C39E", "#A8C5F0", "#E0A8B8", "#C4B4FF", "#FFE5B0", "#B4DCDC", "#E8C39E", "#E0A8B8"];

function FireflyJar({ promises, onAllOpened }) {
  const [opened, setOpened] = useState([]);     // indices opened
  const [active, setActive] = useState(null);   // promise currently blooming
  const allDone = opened.length === promises.length;

  // stable firefly motion params per promise
  const flies = useRef(
    promises.map((_, i) => ({
      cx: 18 + (i * 9.7) % 64,        // % within jar body
      cy: 30 + (i * 13.3) % 55,
      phase: (i * 1.3) % (Math.PI * 2),
      amp: 4 + (i % 3) * 2.5,
      spd: 0.6 + (i % 4) * 0.18,
      glow: PROMISE_GLOWS[i % PROMISE_GLOWS.length],
    }))
  ).current;

  const openNext = () => {
    const next = promises.findIndex((_, i) => !opened.includes(i));
    if (next === -1) return;
    setActive(next);
  };

  const confirmOpened = () => {
    if (active === null) return;
    if (!opened.includes(active)) {
      const nextOpened = [...opened, active];
      setOpened(nextOpened);
      if (nextOpened.length === promises.length && onAllOpened) onAllOpened();
    }
    setActive(null);
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* released fireflies float above once all opened */}
      <div className="relative w-full flex justify-center" style={{ height: allDone ? 90 : 0, transition: "height 1.2s ease" }}>
        <AnimatePresence>
          {allDone && flies.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.4, 1, 0.4],
                x: Math.cos((i / flies.length) * Math.PI * 2) * 120,
                y: Math.sin((i / flies.length) * Math.PI * 2) * 32,
              }}
              transition={{
                opacity: { duration: 2.5 + (i % 3), repeat: Infinity, ease: "easeInOut" },
                x: { duration: 2, ease: "easeOut" },
                y: { duration: 2, ease: "easeOut" },
              }}
              className="absolute rounded-full"
              style={{
                top: 40, width: 9, height: 9,
                background: `radial-gradient(circle, #fff, ${f.glow})`,
                boxShadow: `0 0 16px ${f.glow}, 0 0 6px #fff`,
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* THE JAR */}
      <motion.button
        onClick={openNext}
        disabled={allDone}
        whileTap={!allDone ? { scale: 0.97 } : {}}
        className="relative"
        style={{ width: "min(74vw, 280px)", height: "min(88vw, 340px)", cursor: allDone ? "default" : "pointer" }}
        aria-label="open a promise"
      >
        {/* ambient glow under the jar */}
        <motion.div
          animate={{ opacity: allDone ? [0.15, 0.3, 0.15] : [0.3, 0.55, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
          style={{
            bottom: "6%", width: "80%", height: "40%",
            background: "radial-gradient(ellipse, rgba(232,195,158,0.5) 0%, transparent 70%)",
            filter: "blur(24px)",
          }}
        />

        <svg viewBox="0 0 200 260" className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
          <defs>
            <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.16)" />
              <stop offset="45%" stopColor="rgba(255,255,255,0.05)" />
              <stop offset="100%" stopColor="rgba(168,197,240,0.10)" />
            </linearGradient>
            <linearGradient id="corkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#caa57a" />
              <stop offset="100%" stopColor="#a07f54" />
            </linearGradient>
            <clipPath id="jarClip">
              <path d="M55 70 Q55 64 62 62 L138 62 Q145 64 145 70 L150 230 Q150 248 132 248 L68 248 Q50 248 50 230 Z" />
            </clipPath>
          </defs>

          {/* cork */}
          <rect x="74" y="40" width="52" height="26" rx="6" fill="url(#corkGrad)" />
          <rect x="70" y="56" width="60" height="12" rx="4" fill="#b8946a" />

          {/* glass body */}
          <path
            d="M55 70 Q55 64 62 62 L138 62 Q145 64 145 70 L150 230 Q150 248 132 248 L68 248 Q50 248 50 230 Z"
            fill="url(#glassGrad)" stroke="rgba(232,195,158,0.45)" strokeWidth="1.5"
          />
          {/* glass highlight */}
          <path d="M66 74 L62 232 Q62 240 70 240" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
          <path d="M134 76 L138 226" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="2" strokeLinecap="round" />

          {/* fireflies inside (only those not yet opened) */}
          <g clipPath="url(#jarClip)">
            {flies.map((f, i) => {
              if (opened.includes(i) || active === i) return null;
              const x = 50 + (f.cx / 100) * 100;
              const y = 70 + (f.cy / 100) * 170;
              return <Firefly key={i} x={x} y={y} f={f} />;
            })}
          </g>
        </svg>

        {/* count hint */}
        {!allDone && (
          <p className="absolute left-0 right-0 text-[11px] eyebrow" style={{ bottom: -28, color: "rgba(234,230,240,0.4)" }}>
            {opened.length === 0 ? "tap the jar" : `${opened.length} of ${promises.length} freed`}
          </p>
        )}
      </motion.button>

      {/* blooming promise */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center px-6"
            style={{ zIndex: 100, background: "rgba(5,8,22,0.7)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={confirmOpened}
          >
            {/* the firefly that rises */}
            <motion.div
              initial={{ y: 120, scale: 0.4, opacity: 0 }}
              animate={{ y: -10, scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute rounded-full"
              style={{
                width: 14, height: 14, top: "32%",
                background: `radial-gradient(circle, #fff, ${flies[active].glow})`,
                boxShadow: `0 0 30px ${flies[active].glow}, 0 0 12px #fff`,
              }}
            />
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-md w-full p-9 rounded-[26px] grain text-center"
              style={{
                background: `linear-gradient(150deg, ${flies[active].glow}22, rgba(20,20,54,0.95))`,
                border: `1px solid ${flies[active].glow}44`,
                boxShadow: `0 30px 90px rgba(0,0,0,0.6), 0 0 40px ${flies[active].glow}22`,
              }}
            >
              <div
                className="mx-auto mb-5 rounded-full"
                style={{ width: 12, height: 12, background: `radial-gradient(circle,#fff,${flies[active].glow})`, boxShadow: `0 0 20px ${flies[active].glow}` }}
              />
              <p className="eyebrow text-[10px] mb-4" style={{ color: "rgba(234,230,240,0.45)" }}>a promise</p>
              <p className="leading-relaxed" style={{ fontSize: "clamp(1rem, 4vw, 1.25rem)", color: "#FBF4E9" }}>
                {promises[active]}
              </p>
              <p className="text-[11px] mt-6 italic" style={{ color: "rgba(234,230,240,0.4)" }}>tap anywhere to keep it</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* finale line */}
      <AnimatePresence>
        {allDone && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1.4 }} className="text-center mt-10">
            <p className="display italic text-lg sm:text-xl" style={{ color: "#E8C39E" }}>
              every promise, set free. every single one is yours, Baby.
            </p>
            <p className="text-xs mt-2 italic" style={{ color: "rgba(234,230,240,0.5)" }}>and I intend to keep them all.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// a single drifting firefly inside the jar (SVG)
function Firefly({ x, y, f }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <motion.g
        animate={{
          x: [0, f.amp * 2, -f.amp, 0],
          y: [0, -f.amp, f.amp * 1.5, 0],
        }}
        transition={{ duration: 6 / f.spd, repeat: Infinity, ease: "easeInOut", delay: f.phase }}
      >
        <motion.circle
          animate={{ opacity: [0.4, 1, 0.4], r: [2.4, 3.4, 2.4] }}
          transition={{ duration: 1.6 + f.spd, repeat: Infinity, ease: "easeInOut", delay: f.phase }}
          cx={0} cy={0} r={3}
          fill="#fff"
          style={{ filter: `drop-shadow(0 0 5px ${f.glow}) drop-shadow(0 0 9px ${f.glow})` }}
        />
      </motion.g>
    </g>
  );
}

/* ============================ COUNTDOWN — until we meet ============================ */
// Live ticking countdown to the next time they're together.
const MEET_DATE = new Date("2026-09-02T00:00:00+05:30"); // 2 September 2026, IST

function useCountdown(target) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  return { days, hours, mins, secs, done: diff === 0 };
}

function CountdownScene() {
  const { days, hours, mins, secs, done } = useCountdown(MEET_DATE);
  const units = [
    { v: days, l: "days" },
    { v: hours, l: "hours" },
    { v: mins, l: "minutes" },
    { v: secs, l: "seconds" },
  ];
  return (
    <div className="w-full max-w-2xl flex flex-col items-center">
      <ChapterLabel num="xii" title="counting down" />
      {done ? (
        <>
          <h2 className="display text-center font-light leading-tight mb-4" style={{ fontSize: "clamp(2.2rem,8vw,4rem)", color: "#E8C39E" }}>
            It's today.
          </h2>
          <p className="text-center text-base italic" style={{ color: "rgba(234,230,240,0.7)" }}>
            Come here. I've been waiting.
          </p>
        </>
      ) : (
        <>
          <h2 className="display text-center font-light leading-tight mb-2" style={{ fontSize: "clamp(1.8rem,6vw,3rem)" }}>
            Until I get to hold you again
          </h2>
          <p className="text-center text-sm mb-10 italic" style={{ color: "rgba(234,230,240,0.5)" }}>2nd september · counting every second.</p>

          <div className="flex items-start justify-center gap-3 sm:gap-6">
            {units.map((u, i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className="rounded-2xl grain flex items-center justify-center"
                  style={{
                    minWidth: "clamp(58px, 18vw, 96px)",
                    padding: "clamp(12px,3vw,22px) clamp(6px,2vw,14px)",
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(232,195,158,0.2)",
                    boxShadow: "0 8px 32px rgba(232,195,158,0.08)",
                  }}
                >
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={u.v}
                      initial={{ y: -14, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 14, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="display tabular-nums"
                      style={{ fontSize: "clamp(1.8rem,7vw,3.4rem)", color: "#EAE6F0", lineHeight: 1 }}
                    >
                      {String(u.v).padStart(2, "0")}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="eyebrow text-[9px] mt-3" style={{ color: "rgba(232,195,158,0.6)" }}>{u.l}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-sm mt-12 italic max-w-sm" style={{ color: "rgba(234,230,240,0.6)" }}>
            every number that ticks down is one second closer to you in my arms.
          </p>
        </>
      )}
    </div>
  );
}

/* ============================ PULL THE STARS ============================ */
// An interactive field of soft stars. Press/drag and nearby stars are drawn
// toward your finger, gathering into a glow; release and they drift back home.
// Wordless, tactile — the cosmos becomes hers to touch.

function PullStars() {
  const canvasRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W, H, raf;

    const resize = () => {
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const COUNT = Math.min(140, Math.floor((W * H) / 2600));
    const palette = ["232,195,158", "168,197,240", "224,168,184", "255,255,255"];
    const stars = [...Array(COUNT)].map(() => {
      const hx = Math.random() * W, hy = Math.random() * H;
      return {
        hx, hy, x: hx, y: hy, vx: 0, vy: 0,
        r: 0.8 + Math.random() * 2.2,
        c: palette[Math.floor(Math.random() * palette.length)],
        tw: Math.random() * Math.PI * 2,
        tws: 0.5 + Math.random() * 1.5,
      };
    });

    const getXY = (e) => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      return { x: cx - rect.left, y: cy - rect.top };
    };
    const down = (e) => { const p = getXY(e); pointerRef.current = { x: p.x, y: p.y, active: true }; };
    const move = (e) => { if (!pointerRef.current.active) return; const p = getXY(e); pointerRef.current.x = p.x; pointerRef.current.y = p.y; };
    const up = () => { pointerRef.current.active = false; };

    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    canvas.addEventListener("touchstart", down, { passive: true });
    canvas.addEventListener("touchmove", move, { passive: true });
    window.addEventListener("touchend", up);

    let t = 0;
    const loop = () => {
      t += 0.016;
      ctx.clearRect(0, 0, W, H);
      const ptr = pointerRef.current;

      // draw faint connecting lines between gathered stars near the pointer
      if (ptr.active) {
        ctx.strokeStyle = "rgba(232,195,158,0.10)";
        ctx.lineWidth = 0.6;
        const near = stars.filter((s) => Math.hypot(s.x - ptr.x, s.y - ptr.y) < 90);
        for (let i = 0; i < near.length; i++) {
          for (let j = i + 1; j < near.length; j++) {
            const d = Math.hypot(near[i].x - near[j].x, near[i].y - near[j].y);
            if (d < 46) { ctx.beginPath(); ctx.moveTo(near[i].x, near[i].y); ctx.lineTo(near[j].x, near[j].y); ctx.stroke(); }
          }
        }
      }

      stars.forEach((s) => {
        if (ptr.active) {
          const dx = ptr.x - s.x, dy = ptr.y - s.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < 200) {
            const pull = (1 - dist / 200) * 0.9;
            s.vx += (dx / dist) * pull;
            s.vy += (dy / dist) * pull;
          }
        } else {
          // drift home
          s.vx += (s.hx - s.x) * 0.012;
          s.vy += (s.hy - s.y) * 0.012;
        }
        s.vx *= 0.86; s.vy *= 0.86;
        s.x += s.vx; s.y += s.vy;

        const tw = 0.55 + Math.sin(t * s.tws + s.tw) * 0.35;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.c},${tw})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = `rgba(${s.c},0.7)`;
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      // soft glow at the pointer when active
      if (ptr.active) {
        const g = ctx.createRadialGradient(ptr.x, ptr.y, 0, ptr.x, ptr.y, 70);
        g.addColorStop(0, "rgba(232,195,158,0.18)");
        g.addColorStop(1, "rgba(232,195,158,0)");
        ctx.fillStyle = g;
        ctx.fillRect(ptr.x - 70, ptr.y - 70, 140, 140);
      }

      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      canvas.removeEventListener("touchstart", down);
      canvas.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full rounded-[24px]"
      style={{ height: "min(52vh, 420px)", display: "block", touchAction: "none", cursor: "grab" }}
    />
  );
}

/* ============================ COFFEE — a glass, just for you ============================ */
// A tall iced coffee. Tap it: ice settles, condensation beads, a message rises.

function CoffeeScene() {
  const [poured, setPoured] = useState(false);

  // ice cubes inside the glass — gentle bob/rotate
  const ice = [
    { x: 86, y: 96, s: 22, rot: -12, d: 0 },
    { x: 108, y: 110, s: 18, rot: 18, d: 0.6 },
    { x: 94, y: 126, s: 20, rot: 6, d: 1.1 },
  ];

  return (
    <div className="w-full max-w-xl flex flex-col items-center">
      <ChapterLabel num="vi" title="a slow morning" />
      <h2 className="display text-center font-light leading-tight mb-3" style={{ fontSize: "clamp(2rem,7vw,3.5rem)" }}>I made you a cold coffee.</h2>
      <p className="text-center text-sm mb-10 italic" style={{ color: "rgba(234,230,240,0.5)" }}>
        {poured ? "just the way you like it. no sugar." : "tap the glass."}
      </p>

      <button onClick={() => setPoured(true)} className="relative" style={{ cursor: poured ? "default" : "pointer", touchAction: "manipulation" }} aria-label="pour the coffee" disabled={poured}>
        {/* cool glow under glass */}
        <motion.div
          animate={{ opacity: [0.25, 0.45, 0.25], scale: [1, 1.06, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
          style={{ bottom: -8, width: 150, height: 50, background: "radial-gradient(ellipse, rgba(168,197,240,0.45) 0%, transparent 70%)", filter: "blur(18px)" }}
        />

        {/* rising bubbles (cold fizz) instead of steam */}
        <div className="absolute left-0 right-0" style={{ top: 0, bottom: 0, pointerEvents: "none" }}>
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [60, 6], opacity: [0, 0.6, 0], scale: [0.6, 1] }}
              transition={{ duration: 3.5 + i * 0.6, repeat: Infinity, delay: i * 0.9, ease: "easeOut" }}
              className="absolute rounded-full"
              style={{ width: 4 + (i % 2) * 2, height: 4 + (i % 2) * 2, left: `${42 + i * 5}%`, top: "40%", background: "rgba(255,255,255,0.5)", boxShadow: "0 0 4px rgba(255,255,255,0.4)" }}
            />
          ))}
        </div>

        {/* the glass (SVG) */}
        <svg viewBox="0 0 200 220" style={{ width: "min(52vw, 210px)", height: "auto", display: "block" }}>
          <defs>
            <linearGradient id="glassBody" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
              <stop offset="20%" stopColor="rgba(255,255,255,0.18)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.06)" />
              <stop offset="100%" stopColor="rgba(168,197,240,0.10)" />
            </linearGradient>
            <linearGradient id="coldBrew" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5a3a22" />
              <stop offset="100%" stopColor="#2e1a10" />
            </linearGradient>
            <clipPath id="glassInner">
              <path d="M66 64 L134 64 L128 188 Q127 196 119 196 L81 196 Q73 196 72 188 Z" />
            </clipPath>
          </defs>

          {/* coaster */}
          <ellipse cx="100" cy="204" rx="62" ry="8" fill="rgba(168,197,240,0.10)" stroke="rgba(168,197,240,0.25)" strokeWidth="1" />

          {/* coffee fill (clipped to glass) */}
          <g clipPath="url(#glassInner)">
            <motion.rect
              x="60" width="80"
              initial={{ y: 120, height: 76 }}
              animate={{ y: poured ? 84 : 120, height: poured ? 112 : 76 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              fill="url(#coldBrew)"
            />
            {/* coffee surface line */}
            <motion.rect x="60" width="80" height="3" fill="rgba(232,195,158,0.4)"
              initial={{ y: 120 }} animate={{ y: poured ? 84 : 120 }} transition={{ duration: 1.2, ease: "easeOut" }} />

            {/* ICE CUBES — float and bob */}
            {ice.map((c, i) => (
              <motion.g key={i}
                animate={{ y: [0, -4, 0, 3, 0], rotate: [c.rot, c.rot + 6, c.rot - 4, c.rot] }}
                transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: c.d }}
                style={{ transformOrigin: `${c.x}px ${c.y}px` }}
              >
                <rect x={c.x - c.s / 2} y={c.y - c.s / 2} width={c.s} height={c.s} rx="4"
                  fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.45)" strokeWidth="1" />
                <rect x={c.x - c.s / 2 + 3} y={c.y - c.s / 2 + 3} width={c.s / 3} height={c.s / 3} rx="2" fill="rgba(255,255,255,0.4)" />
              </motion.g>
            ))}
          </g>

          {/* glass body outline */}
          <path d="M66 64 L134 64 L128 188 Q127 196 119 196 L81 196 Q73 196 72 188 Z" fill="url(#glassBody)" stroke="rgba(232,195,158,0.45)" strokeWidth="1.5" />
          {/* rim */}
          <ellipse cx="100" cy="64" rx="34" ry="6" fill="none" stroke="rgba(232,195,158,0.5)" strokeWidth="1.5" />
          {/* glass highlights */}
          <path d="M78 70 L73 184" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
          <path d="M124 72 L120 180" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeLinecap="round" />

          {/* condensation droplets on the glass (appear after pour) */}
          {poured && [
            { x: 80, y: 110 }, { x: 122, y: 130 }, { x: 76, y: 150 }, { x: 126, y: 100 }, { x: 100, y: 168 },
          ].map((d, i) => (
            <motion.circle key={i} cx={d.x} cy={d.y} r={1.6 + (i % 2)}
              initial={{ opacity: 0 }} animate={{ opacity: [0, 0.7, 0.5], y: [0, 6] }}
              transition={{ duration: 2.5, delay: 0.6 + i * 0.25, ease: "easeOut" }}
              fill="rgba(255,255,255,0.5)" />
          ))}

          {/* straw */}
          <rect x="112" y="40" width="6" height="150" rx="3" transform="rotate(8 115 110)" fill="rgba(224,168,184,0.5)" stroke="rgba(224,168,184,0.7)" strokeWidth="0.5" />
        </svg>
      </button>

      {/* the message that rises */}
      <AnimatePresence>
        {poured && (
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.5, duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mt-10 max-w-md"
          >
            <p className="leading-relaxed" style={{ fontSize: "clamp(1.05rem,3.8vw,1.3rem)", color: "#EAE6F0" }}>
              no sugar, obviously. you're sweet enough — and before you say "I'm not sweet," that grumpy little face you just made? that's the sweet part. drink up baby boo.
            </p>
            <div className="flex justify-center mt-6"><Lily size={24} opacity={0.5} /></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================ ROLLERCOASTER — the ride ============================ */
// Hijacks the cosmos camera for ~16 seconds: the climb, the hang, the drop,
// banking turns through the stars, then easing home.

const RIDE_TOTAL = 16000; // ms — must match the Cosmos ride timing

function RollercoasterScene({ rideRef, onRideChange, onCaption, registerSkip }) {
  const [state, setState] = useState("idle"); // idle | riding | done
  const [caption, setCaption] = useState("");
  const timersRef = useRef([]);

  const clearTimers = () => { timersRef.current.forEach(clearTimeout); timersRef.current = []; };
  useEffect(() => () => clearTimers(), []);

  const startRide = () => {
    if (state === "riding") return;
    setState("riding");
    onRideChange(true);

    rideRef.current = {
      active: true,
      start: performance.now(),
      baseZ: 300,
      onEnd: () => {},
    };

    // captions synced to the ride phases
    const cues = [
      [0, "up we go…"],
      [4500, "…don't look down."],
      [6000, "hold on!"],
      [9500, "hands up!"],
      [13000, "…okay. breathe."],
    ];
    cues.forEach(([ms, text]) => {
      timersRef.current.push(setTimeout(() => { setCaption(text); onCaption(text); }, ms));
    });

    // haptics: a shudder on the climb, a jolt at the drop
    if (navigator.vibrate) {
      timersRef.current.push(setTimeout(() => navigator.vibrate([12, 180, 12, 180, 12, 180, 12]), 400));
      timersRef.current.push(setTimeout(() => navigator.vibrate([60, 40, 120]), 6000));
      timersRef.current.push(setTimeout(() => navigator.vibrate(30), 9500));
    }

    timersRef.current.push(setTimeout(() => {
      setState("done");
      setCaption("");
      onCaption("");
      onRideChange(false);
    }, RIDE_TOTAL));
  };

  const skip = () => {
    clearTimers();
    if (rideRef.current) rideRef.current.active = false;
    setState("done");
    setCaption("");
    onCaption("");
    onRideChange(false);
  };

  // let App's overlay skip button trigger this
  useEffect(() => { registerSkip(() => skip); }, [registerSkip]);

  return (
    <div className="w-full max-w-xl flex flex-col items-center">
      {state !== "riding" && (
        <>
          <ChapterLabel num="vii" title="the ride" />
          <h2 className="display text-center font-light leading-tight mb-3" style={{ fontSize: "clamp(2rem,7vw,3.5rem)" }}>
            {state === "done" ? "again?" : "Want to go on a ride?"}
          </h2>
          <p className="text-center text-sm mb-9 italic" style={{ color: "rgba(234,230,240,0.5)" }}>
            {state === "done" ? "I knew you'd say yes." : "you always pick the front row. hold on."}
          </p>
        </>
      )}

      {state !== "riding" && (
        <motion.button
          onClick={startRide}
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          className="display px-12 py-4 rounded-full text-lg grain"
          style={{ color: "#0A0E27", background: "linear-gradient(135deg, #E8C39E, #f3d9bd)", boxShadow: "0 8px 40px rgba(232,195,158,0.3)" }}
        >
          {state === "done" ? "ride again" : "hold on tight"}
        </motion.button>
      )}

      {/* the message after the ride */}
      <AnimatePresence>
        {state === "done" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mt-10 max-w-md"
          >
            <p className="display italic leading-snug" style={{ fontSize: "clamp(1.3rem,4.5vw,1.9rem)", color: "#EAE6F0" }}>
              loving you is exactly this.
            </p>
            <p className="leading-relaxed mt-4" style={{ fontSize: "clamp(0.95rem,3.5vw,1.1rem)", color: "rgba(234,230,240,0.7)" }}>
              the slow climb, the stomach drop, the screaming, and the second it ends — wanting to go again. I'd get back in line with you every single time.
            </p>
            <div className="flex justify-center mt-6"><Lily size={24} opacity={0.5} /></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* overlay is rendered at App level so the content fade doesn't dim it */}
    </div>
  );
}

/* ============================ STAR MAP — navigate the journey ============================ */
// Every chapter is a star. Tap one and fly there. Visited chapters glow warm.

const CHAPTERS = [
  { id: "ch-balloons",  label: "too big for texts", x: 18, y: 78 },
  { id: "ch-feelings",  label: "however you feel",  x: 32, y: 62 },
  { id: "ch-friends",   label: "the one where",     x: 22, y: 44 },
  { id: "ch-small",     label: "the small things",  x: 40, y: 32 },
  { id: "ch-coffee",    label: "a slow morning",    x: 58, y: 22 },
  { id: "ch-ride",      label: "the ride",          x: 74, y: 34 },
  { id: "ch-you",       label: "it'd be you",       x: 62, y: 48 },
  { id: "ch-stars",     label: "your stars",        x: 78, y: 58 },
  { id: "ch-promises",  label: "my promises",       x: 60, y: 68 },
  { id: "ch-letter",    label: "a letter",          x: 44, y: 76 },
  { id: "ch-countdown", label: "counting down",     x: 30, y: 88 },
  { id: "ch-pull",      label: "reach out",         x: 52, y: 92 },
  { id: "ch-timeline",  label: "our story",         x: 72, y: 82 },
];

// the line that threads the chapters together, in order
const MAP_LINKS = CHAPTERS.map((_, i) => i).slice(0, -1).map((i) => [i, i + 1]);

function StarMap({ open, close, onJump, currentId, visited }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center px-5"
          style={{ zIndex: 120, background: "rgba(5,8,22,0.88)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
          onClick={close}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-lg"
          >
            <p className="eyebrow text-[10px] text-center mb-2" style={{ color: "#E8C39E" }}>the map</p>
            <h3 className="display text-center font-light mb-1" style={{ fontSize: "clamp(1.5rem,5vw,2.2rem)", color: "#EAE6F0" }}>
              Where do you want to go?
            </h3>
            <p className="text-center text-xs italic mb-6" style={{ color: "rgba(234,230,240,0.45)" }}>tap a star to travel there.</p>

            <div className="relative w-full" style={{ height: "min(58vh, 460px)" }}>
              {/* connecting thread */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                {MAP_LINKS.map(([a, b], i) => {
                  const A = CHAPTERS[a], B = CHAPTERS[b];
                  const lit = visited.has(A.id) && visited.has(B.id);
                  return (
                    <line key={i} x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                      stroke={lit ? "rgba(232,195,158,0.45)" : "rgba(168,197,240,0.12)"}
                      strokeWidth={lit ? 0.35 : 0.2} strokeLinecap="round" />
                  );
                })}
              </svg>

              {CHAPTERS.map((c, i) => {
                const isHere = c.id === currentId;
                const seen = visited.has(c.id);
                return (
                  <motion.button
                    key={c.id}
                    onPointerUp={(e) => { e.stopPropagation(); onJump(c.id); }}
                    className="absolute flex flex-col items-center"
                    style={{ left: `${c.x}%`, top: `${c.y}%`, transform: "translate(-50%,-50%)", width: 78, touchAction: "manipulation" }}
                    whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.94 }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.045, duration: 0.5 }}
                  >
                    <motion.span
                      animate={isHere ? { scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] } : { scale: 1, opacity: seen ? 0.95 : 0.5 }}
                      transition={isHere ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" } : { duration: 0.4 }}
                      className="rounded-full"
                      style={{
                        width: isHere ? 13 : 9, height: isHere ? 13 : 9,
                        background: seen || isHere ? "radial-gradient(circle,#fff,#ffe5b0 55%,#e8c39e)" : "radial-gradient(circle,#fff,#a8c5f0)",
                        boxShadow: seen || isHere ? "0 0 18px rgba(232,195,158,0.9)" : "0 0 8px rgba(168,197,240,0.6)",
                      }}
                    />
                    <span
                      className="text-[9px] mt-1.5 text-center leading-tight"
                      style={{ color: isHere ? "#E8C39E" : "rgba(234,230,240,0.55)" }}
                    >
                      {c.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <button onClick={close} className="block mx-auto mt-4 text-xs eyebrow" style={{ color: "rgba(234,230,240,0.45)" }}>
              close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============================ SECTIONS & NAVIGATION ============================ */

const SECTIONS = {
  us:     { label: "Us",     tag: "the story of you and me", chapters: ["ch-friends", "ch-coffee", "ch-ride", "ch-timeline"] },
  you:    { label: "You",    tag: "everything I notice",     chapters: ["ch-feelings", "ch-small", "ch-stars", "ch-you"] },
  always: { label: "Always", tag: "what I'm promising",      chapters: ["ch-promises", "ch-letter", "ch-countdown"] },
  play:   { label: "Play",   tag: "things to touch",         chapters: ["ch-balloons", "ch-pull"] },
};
const SECTION_KEYS = ["us", "you", "always", "play"];

// simple line-art icons for each section
function SectionIcon({ name, size = 20, color = "#E8C39E" }) {
  const s = { stroke: color, strokeWidth: 1.3, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: "block" }}>
      {name === "home" && <g {...s}><path d="M4 11l8-6 8 6" /><path d="M6 10v9h12v-9" /></g>}
      {name === "us" && <g {...s}><circle cx="9" cy="9" r="3.4" /><circle cx="15" cy="15" r="3.4" /><path d="M11.4 11.4l1.2 1.2" /></g>}
      {name === "you" && <g {...s}><path d="M12 4l1.9 5.1L19 11l-5.1 1.9L12 18l-1.9-5.1L5 11l5.1-1.9z" /></g>}
      {name === "always" && <g {...s}><path d="M12 20s-6.5-4.3-6.5-9A3.5 3.5 0 0112 8.5 3.5 3.5 0 0118.5 11c0 4.7-6.5 9-6.5 9z" /></g>}
      {name === "play" && <g {...s}><circle cx="12" cy="12" r="7.5" /><path d="M12 4.5v15M4.5 12h15" /></g>}
    </svg>
  );
}

function HomeHub({ onOpenSection, onJourney, greeting }) {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6 py-24" style={{ position: "relative", zIndex: 2 }}>
      <motion.p
        initial={{ opacity: 0, y: -8 }} animate={{ opacity: 0.85, y: 0 }} transition={{ duration: 1.6 }}
        className="italic text-center text-[15px] sm:text-lg mb-6" style={{ color: "#A8C5F0" }}
      >
        {greeting}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.8, delay: 0.2 }}
        className="display font-light leading-[0.95] text-center mb-4"
        style={{ fontSize: "clamp(2.6rem,10vw,5.5rem)", letterSpacing: "-0.02em" }}
      >
        For you,<br /><span className="grad-gold italic">always.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6, delay: 0.6 }}
        className="text-center text-sm mb-12 italic max-w-xs" style={{ color: "rgba(234,230,240,0.5)" }}
      >
        wander wherever you like. it's all yours.
      </motion.p>

      {/* section cards */}
      <div className="w-full max-w-md grid grid-cols-2 gap-3 sm:gap-4">
        {SECTION_KEYS.map((k, i) => (
          <motion.button
            key={k}
            onClick={() => onOpenSection(k)}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6, scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="text-left p-6 rounded-[24px] relative overflow-hidden grain"
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(232,195,158,0.18)",
              boxShadow: "0 8px 32px rgba(232,195,158,0.07)",
              minHeight: 130,
            }}
          >
            <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(232,195,158,0.22) 0%, transparent 70%)", filter: "blur(16px)" }} />
            <div className="relative z-10 flex flex-col h-full justify-between">
              <SectionIcon name={k} size={22} />
              <div className="mt-5">
                <h3 className="display text-2xl leading-none" style={{ color: "#EAE6F0" }}>{SECTIONS[k].label}</h3>
                <p className="text-[11px] mt-1.5 leading-snug" style={{ color: "rgba(234,230,240,0.45)" }}>{SECTIONS[k].tag}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* read it in order */}
      <motion.button
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4, delay: 1.5 }}
        onClick={onJourney}
        whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
        className="display mt-8 px-9 py-3.5 rounded-full text-base"
        style={{ color: "#0A0E27", background: "linear-gradient(135deg, #E8C39E, #f3d9bd)", boxShadow: "0 8px 30px rgba(232,195,158,0.25)" }}
      >
        read it in order
      </motion.button>
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4, delay: 1.8 }}
        className="text-[11px] mt-3 italic" style={{ color: "rgba(234,230,240,0.35)" }}
      >
        the whole thing, the way I wrote it.
      </motion.p>
    </div>
  );
}

function BottomBar({ view, onNav }) {
  const items = [{ key: "home", label: "Home" }, ...SECTION_KEYS.map((k) => ({ key: k, label: SECTIONS[k].label }))];
  return (
    <motion.nav
      initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 flex justify-center"
      style={{ bottom: 0, zIndex: 65, paddingBottom: "env(safe-area-inset-bottom, 0px)", pointerEvents: "none" }}
    >
      <div
        className="flex items-center gap-1 mb-3 px-2 py-2 rounded-full grain"
        style={{
          background: "rgba(12,16,42,0.72)",
          backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(232,195,158,0.18)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.45)",
          pointerEvents: "auto",
        }}
      >
        {items.map((it) => {
          const active = view === it.key;
          return (
            <button
              key={it.key}
              onClick={() => onNav(it.key)}
              className="flex flex-col items-center rounded-full px-3 sm:px-4 py-1.5"
              style={{ background: active ? "rgba(232,195,158,0.16)" : "transparent", transition: "background 0.3s ease", touchAction: "manipulation" }}
            >
              <SectionIcon name={it.key} size={18} color={active ? "#E8C39E" : "rgba(234,230,240,0.5)"} />
              <span className="text-[9px] mt-0.5" style={{ color: active ? "#E8C39E" : "rgba(234,230,240,0.45)" }}>{it.label}</span>
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}

/* ============================ SCENE WRAPPER ============================ */

function Scene({ children, className = "", tall = false, id, hidden = false }) {
  return (
    <section
      id={id}
      className={`snap-scene flex-col items-center ${tall ? "justify-start" : "justify-center"} px-5 sm:px-6 ${className}`}
      style={{ display: hidden ? "none" : "flex", scrollSnapAlign: "start", minHeight: "100dvh", boxSizing: "border-box", paddingTop: tall ? "7rem" : "5rem", paddingBottom: tall ? "7rem" : "5rem", position: "relative" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full flex flex-col items-center justify-center"
      >
        {children}
      </motion.div>
    </section>
  );
}

/* ============================ MAIN APP ============================ */

export default function App() {
  const [loading, setLoading] = useState(true);
  const [unlocked, setUnlocked] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState(false);
  const [entered, setEntered] = useState(false);

  // Password check — only a SHA-256 hash lives in the code, never the word itself.
  // Asks every time the page is opened or refreshed (no remembering).
  const PASSWORD_HASH = "d422fe501f53579955a65160df522af64fff95c1f963567a18a6f19efff31dbc";

  const tryUnlock = async () => {
    try {
      const data = new TextEncoder().encode(pwInput.trim().toLowerCase());
      const buf = await crypto.subtle.digest("SHA-256", data);
      const hash = Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
      if (hash === PASSWORD_HASH) {
        if (navigator.vibrate) navigator.vibrate(30);
        setUnlocked(true);
        return;
      }
    } catch (e) { /* crypto unavailable — fall through to error */ }
    setPwError(true);
    if (navigator.vibrate) navigator.vibrate([20, 40, 20]);
    setTimeout(() => setPwError(false), 600);
  };

  // intro veil — give the cosmos a beat to initialize, then reveal
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(t);
  }, []);
  const [zooming, setZooming] = useState(false);
  // ── surprise states ──
  const [lilyTaps, setLilyTaps] = useState(0);
  const [lilySecretOpen, setLilySecretOpen] = useState(false);
  const [petalsActive, setPetalsActive] = useState(false);
  const [skyGlow, setSkyGlow] = useState(false);
  const [promiseBurst, setPromiseBurst] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const triggerSkyGlow = () => {
    setSkyGlow(true);
    setTimeout(() => setSkyGlow(false), 6500);
  };

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
  const [selectedFeeling, setSelectedFeeling] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [hugOpen, setHugOpen] = useState(false);
  const [musicOpen, setMusicOpen] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [muted, setMuted] = useState(false);
  const [tiltEnabled, setTiltEnabled] = useState(false);
  const [tiltAsked, setTiltAsked] = useState(false);

  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const cosmosProgress = useRef(0);
  const rideRef = useRef({ active: false, start: 0, baseZ: 300 });
  const [riding, setRiding] = useState(false);
  const [rideCaption, setRideCaption] = useState("");
  const rideSkipRef = useRef(null);
  const [mapOpen, setMapOpen] = useState(false);
  const [view, setView] = useState("home"); // home | us | you | always | play | journey

  // which chapters render in the current view
  const showChapter = useCallback((id) => {
    if (view === "journey") return true;
    const s = SECTIONS[view];
    return s ? s.chapters.includes(id) : false;
  }, [view]);

  const navTo = (key) => {
    setView(key);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };
  const [currentId, setCurrentId] = useState("ch-balloons");
  const [visited, setVisited] = useState(() => new Set(["ch-balloons"]));

  // track which chapter she's on (drives the map's "you are here")
  const handleScroll = useCallback((e) => {
    const el = e.currentTarget;
    // find which visible scene is nearest the top of the viewport
    const secs = el.querySelectorAll("section[id^='ch-']");
    let best = null, bestDist = Infinity;
    secs.forEach((s) => {
      if (s.offsetParent === null) return; // hidden
      const d = Math.abs(s.getBoundingClientRect().top);
      if (d < bestDist) { bestDist = d; best = s.id; }
    });
    if (best && best !== currentId) {
      setCurrentId(best);
      setVisited((v) => (v.has(best) ? v : new Set(v).add(best)));
    }
  }, [currentId]);

  const jumpTo = (id) => {
    setMapOpen(false);
    setVisited((v) => (v.has(id) ? v : new Set(v).add(id)));
    setCurrentId(id);
    // switch to whichever section contains this chapter
    const key = SECTION_KEYS.find((k) => SECTIONS[k].chapters.includes(id));
    if (key && view !== key && view !== "journey") setView(key);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 420);
  };
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => { cosmosProgress.current = v; });
    return () => unsub();
  }, [scrollYProgress]);
  const deviceTilt = useDeviceTilt(tiltEnabled);
  const greeting = useRef(getGreeting()).current;

  // Promise jar completion → auto-clear the full-screen celebration after a few seconds
  useEffect(() => {
    if (promiseBurst) {
      const t = setTimeout(() => setPromiseBurst(false), 5000);
      return () => clearTimeout(t);
    }
  }, [promiseBurst]);

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
    setTimeout(() => { setEntered(true); setView("home"); }, 1400);
  };

  const toggleMute = () => {
    const p = playerRef.current; if (!p) return;
    if (muted) { p.unMute(); p.setVolume(55); setMuted(false); } else { p.mute(); setMuted(true); }
  };

  // browser tab: title + favicon (a small gold lily)
  useEffect(() => {
    document.title = "for you ✦";
    const svg = encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%230A0E27'/><g stroke='%23E8C39E' stroke-width='3' fill='none' stroke-linecap='round'><path d='M50 50 Q45 28 50 12 Q55 28 50 50'/><path d='M50 50 Q67 34 82 28 Q71 46 50 50'/><path d='M50 50 Q71 56 80 72 Q60 66 50 50'/><path d='M50 50 Q55 72 50 88 Q45 72 50 50'/><path d='M50 50 Q29 66 20 72 Q29 56 50 50'/><path d='M50 50 Q29 46 18 28 Q33 34 50 50'/></g></svg>`
    );
    let link = document.querySelector("link[rel~='icon']");
    if (!link) { link = document.createElement("link"); link.rel = "icon"; document.head.appendChild(link); }
    link.href = `data:image/svg+xml,${svg}`;
  }, []);

  return (
    <div className="body-font" style={{ color: "#EAE6F0", background: "transparent", minHeight: "100dvh" }}>
      <StyleTag />
      <Cosmos progressRef={cosmosProgress} isMobile={isMobile} rideRef={rideRef} />

      {/* site-wide grain + vignette — ties the whole world into one mood */}
      <div className="site-grain" aria-hidden="true" />
      <div className="site-vignette" aria-hidden="true" />

      {/* LOADING VEIL — a calm intro before the world appears */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center"
            style={{ zIndex: 200, background: "#05060E" }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.6, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={{ rotate: [0, 6, 0, -6, 0], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Lily size={64} opacity={0.9} />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 0.8, y: 0 }}
                transition={{ delay: 0.6, duration: 1.4 }}
                className="display italic mt-6"
                style={{ fontSize: "clamp(1.1rem,4vw,1.5rem)", color: "#E8C39E" }}
              >
                for you
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PASSWORD GATE — plain */}
      {!loading && !unlocked && (
        <div
          className="fixed inset-0 flex flex-col items-center justify-center px-6"
          style={{ zIndex: 150, background: "#0A0E27" }}
        >
          <p style={{ color: "#EAE6F0", marginBottom: 16, fontSize: "1rem" }}>Enter password</p>
          <input
            type="password"
            value={pwInput}
            onChange={(e) => setPwInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") tryUnlock(); }}
            autoFocus
            style={{
              padding: "10px 14px", fontSize: "1rem", borderRadius: 6,
              border: pwError ? "1px solid #e06b6b" : "1px solid #555",
              background: "#11152e", color: "#EAE6F0", outline: "none", width: 240, textAlign: "center",
            }}
          />
          <button
            onClick={tryUnlock}
            style={{ marginTop: 14, padding: "10px 24px", fontSize: "1rem", borderRadius: 6, border: "none", background: "#E8C39E", color: "#0A0E27", cursor: "pointer" }}
          >
            Enter
          </button>
          {pwError && <p style={{ color: "#e06b6b", marginTop: 12, fontSize: "0.85rem" }}>Incorrect password</p>}
        </div>
      )}

      {/* RIDE OVERLAY — app level so the content fade never dims it */}
      <AnimatePresence>
        {riding && (
          <motion.div
            className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none"
            style={{ zIndex: 70 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: [0.1, 0.1, 0.5, 0.35, 0.15] }}
              transition={{ duration: 16, times: [0, 0.28, 0.55, 0.78, 1], ease: "easeInOut" }}
              style={{ background: "radial-gradient(ellipse at center, transparent 35%, rgba(5,6,14,0.8) 100%)" }}
            />
            <AnimatePresence mode="wait">
              <motion.p
                key={rideCaption}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.6 }}
                className="display italic relative"
                style={{ fontSize: "clamp(1.6rem,6vw,3rem)", color: "#EAE6F0", textShadow: "0 0 40px rgba(232,195,158,0.5)" }}
              >
                {rideCaption}
              </motion.p>
            </AnimatePresence>
            <button
              onClick={() => { if (rideSkipRef.current) rideSkipRef.current(); }}
              className="absolute pointer-events-auto text-xs eyebrow"
              style={{ bottom: "calc(2.5rem + env(safe-area-inset-bottom,0px))", color: "rgba(234,230,240,0.45)" }}
            >
              skip
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STAR MAP */}
      <StarMap open={mapOpen} close={() => setMapOpen(false)} onJump={jumpTo} currentId={currentId} visited={visited} />

      {/* hidden youtube player */}
      <div id="yt-player" style={{ position: "fixed", bottom: 0, left: 0, width: 1, height: 1, opacity: 0.01, pointerEvents: "none" }} />


      {/* map button — top left, opens the star map */}
      {entered && (
        <button
          onClick={() => setMapOpen(true)}
          className="p-3 sm:p-4 rounded-full grain"
          aria-label="map"
          style={{
            position: "fixed",
            top: "calc(1.25rem + env(safe-area-inset-top, 0px))",
            left: "calc(1.25rem + env(safe-area-inset-left, 0px))",
            zIndex: 60,
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(232,195,158,0.18)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ display: "block" }}>
            <g stroke="#E8C39E" strokeWidth="1.2" strokeLinecap="round">
              <line x1="5" y1="17" x2="10" y2="11" opacity="0.7" />
              <line x1="10" y1="11" x2="16" y2="13" opacity="0.7" />
              <line x1="16" y1="13" x2="19" y2="6" opacity="0.7" />
            </g>
            <g fill="#E8C39E">
              <circle cx="5" cy="17" r="1.7" /><circle cx="10" cy="11" r="1.4" />
              <circle cx="16" cy="13" r="1.4" /><circle cx="19" cy="6" r="1.9" />
            </g>
          </svg>
        </button>
      )}

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
        {unlocked && !entered && (
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
              {/* SECRET: tap the lily 3 times — gentle periodic breath invites discovery */}
              <motion.div
                animate={
                  lilyTaps > 0 && lilyTaps < 3
                    ? { scale: [1, 1.06, 1], rotate: [0, 4, 0, -4, 0] }
                    : { rotate: [0, 4, 0, -4, 0], scale: [1, 1, 1.04, 1, 1] }
                }
                transition={{
                  rotate: { duration: 34, repeat: Infinity, ease: "easeInOut" },
                  scale: lilyTaps > 0 && lilyTaps < 3
                    ? { duration: 0.4 }
                    : { duration: 10, repeat: Infinity, ease: "easeInOut" },
                }}
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

            <div className="relative text-center flex flex-col items-center pointer-events-none" style={{ zIndex: 2 }}>
              <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 0.8, y: 0 }} transition={{ duration: 1.6, delay: 0.5 }}
                className="italic text-[15px] sm:text-lg mb-10" style={{ color: "#A8C5F0" }}>{greeting}</motion.p>
              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.8, delay: 0.7 }}
                className="display font-light leading-[0.95]" style={{ fontSize: "clamp(3rem,12vw,8rem)", letterSpacing: "-0.02em" }}>
                Before<br />you enter
              </motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6, delay: 1.4 }}
                className="mt-10 max-w-sm leading-relaxed text-[15px] sm:text-base" style={{ color: "rgba(234,230,240,0.55)" }}>
                I couldn't fit everything I feel for you into messages, {NAME}. So I built it a home instead.
              </motion.p>
              <motion.button initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, delay: 1.9 }}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={handleEnter}
                className="display mt-12 px-12 py-4 rounded-full text-lg relative grain"
                style={{ color: "#0A0E27", background: "linear-gradient(135deg, #E8C39E, #f3d9bd)", boxShadow: "0 8px 40px rgba(232,195,158,0.3)", pointerEvents: "auto" }}>
                Come in
              </motion.button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* HOME HUB */}
      {entered && view === "home" && (
        <motion.div
          key="home"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}
          className="no-scrollbar"
          style={{ height: "100dvh", overflowY: "auto", position: "relative", zIndex: 1 }}
        >
          <HomeHub
            greeting={greeting}
            onOpenSection={(k) => navTo(k)}
            onJourney={() => navTo("journey")}
          />
        </motion.div>
      )}

      {/* BOTTOM NAV — everywhere except home-less states */}
      <AnimatePresence>
        {entered && !riding && <BottomBar view={view} onNav={navTo} />}
      </AnimatePresence>

      {/* THE JOURNEY / SECTIONS */}
      {entered && view !== "home" && (
        <motion.div
          ref={(el) => { scrollRef.current = el; scrollRootRef.current = el; }}
          onScroll={handleScroll}
          initial={{ opacity: 0 }}
          animate={{ opacity: riding ? 0.06 : 1 }}
          transition={{ duration: riding ? 0.8 : 1.5 }}
          className="snap-container no-scrollbar"
          style={{ height: "100dvh", overflowY: riding ? "hidden" : "scroll", scrollSnapType: "y proximity", scrollBehavior: "smooth", position: "relative", zIndex: 1 }}
        >
          {/* 1 · Balloons */}
          <Scene id="ch-balloons" hidden={!showChapter("ch-balloons")}>
            <ChapterLabel num="i" title="too big for texts" />
            <h2 className="display text-center font-light leading-tight mb-3" style={{ fontSize: "clamp(2rem,7vw,3.5rem)" }}>Some feelings are too big for texts.</h2>
            <p className="text-center text-sm mb-10" style={{ color: "rgba(234,230,240,0.5)" }}>so I put them in balloons. tap them.</p>
            <div className="relative w-full max-w-3xl" style={{ height: "min(55vh, 460px)" }}>
              {balloonNotes.map((note, i) => <Balloon key={i} note={note} i={i} onPop={(n) => setSelectedNote(n)} />)}
            </div>
          </Scene>

          {/* 2 · However you feel (moods + letters merged) */}
          <Scene id="ch-feelings" hidden={!showChapter("ch-feelings")}>
            <div className="w-full max-w-5xl">
              <ChapterLabel num="ii" title="however you feel" />
              <h2 className="display text-center font-light leading-tight mb-3" style={{ fontSize: "clamp(2rem,7vw,3.5rem)" }}>What do you need right now?</h2>
              <p className="text-center text-sm mb-10 italic" style={{ color: "rgba(234,230,240,0.5)" }}>there's something here for every version of you.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {feelings.map((f, i) => (
                  <motion.button key={i} whileHover={{ y: -8, scale: 1.03 }} whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedFeeling(f)}
                    className="text-left p-7 rounded-[24px] relative overflow-hidden grain"
                    style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: `0 8px 32px ${f.accent}22` }}>
                    <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${f.accent}33 0%, transparent 70%)`, filter: "blur(20px)" }} />
                    <h3 className="display text-xl sm:text-2xl mb-2 relative z-10 leading-snug" style={{ color: "#EAE6F0" }}>{f.title}</h3>
                    <p className="text-sm relative z-10" style={{ color: "rgba(234,230,240,0.5)" }}>tap to open</p>
                  </motion.button>
                ))}
              </div>
            </div>
          </Scene>

                    {/* 3 · Friends */}
          <Scene id="ch-friends" hidden={!showChapter("ch-friends")}>
            <div className="w-full max-w-5xl">
              <ChapterLabel num="iii" title="the one where" />
              <h2 className="display text-center font-light leading-tight mb-10" style={{ fontSize: "clamp(2rem,7vw,3.5rem)" }}>The One Where…</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {episodeCards.map((c, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
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

          {/* 4 · The small things (late night + tiny things merged) */}
          <Scene id="ch-small" hidden={!showChapter("ch-small")}>
            <div className="w-full">
              <ChapterLabel num="iv" title="the small things" />
              <h2 className="display text-center font-light leading-tight mb-3" style={{ fontSize: "clamp(2rem,7vw,3.5rem)" }}>The things I notice.</h2>
              <p className="text-center text-sm mb-10 italic" style={{ color: "rgba(234,230,240,0.5)" }}>swipe — the little things no one else would clock. I clock everything.</p>
              <div className="overflow-x-auto no-scrollbar px-4" style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
                <div className="flex gap-4 pb-4 mx-auto" style={{ width: "max-content" }}>
                  {smallThings.map((t, i) => (
                    <div key={i} className="rounded-[26px] p-8 grain flex items-center" style={{ width: 270, minHeight: 210, flexShrink: 0, scrollSnapAlign: "center", background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <div>
                        <div className="mb-4"><Lily size={16} opacity={0.6} /></div>
                        <p className="display text-lg sm:text-xl italic leading-relaxed" style={{ color: "rgba(234,230,240,0.88)" }}>{t}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-center text-[11px] mt-4 eyebrow" style={{ color: "rgba(168,197,240,0.4)" }}>{smallThings.length} things · keep swiping</p>
            </div>
          </Scene>

          {/* 6 · Coffee — a slow morning */}
          <Scene id="ch-coffee" hidden={!showChapter("ch-coffee")}><CoffeeScene /></Scene>

          {/* 7 · Rollercoaster — the ride */}
          <Scene id="ch-ride" hidden={!showChapter("ch-ride")}><RollercoasterScene rideRef={rideRef} onRideChange={setRiding} onCaption={setRideCaption} registerSkip={(fn) => { rideSkipRef.current = fn(); }} /></Scene>

                    {/* 7 · "it'd be you" */}
          <Scene id="ch-you" hidden={!showChapter("ch-you")}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 2, ease: "easeOut" }} className="text-center">
              <p className="text-sm mb-6 italic" style={{ color: "rgba(234,230,240,0.4)" }}>if i could only say one thing,</p>
              <h2 className="display font-light leading-[0.95]" style={{ fontSize: "clamp(4rem,16vw,11rem)" }}>it'd be</h2>
              <h2 className="display italic font-light mt-2 grad-gold" style={{ fontSize: "clamp(5rem,20vw,14rem)", lineHeight: 1.15, paddingBottom: "0.12em" }}>you.</h2>
              <motion.div initial={{ width: 0 }} animate={{ width: "60%" }} transition={{ duration: 2, delay: 0.5 }}
                className="h-px mx-auto mt-12" style={{ background: "linear-gradient(to right, transparent, rgba(232,195,158,0.4), transparent)" }} />
            </motion.div>
          </Scene>

          {/* 7 · Constellation */}
          <Scene id="ch-stars" hidden={!showChapter("ch-stars")}><ConstellationScene onSelect={setSelectedMemory} onComplete={triggerSkyGlow} /></Scene>

          {/* 9 · Promise Jar — fireflies */}
          <Scene id="ch-promises" hidden={!showChapter("ch-promises")}>
            <div className="w-full max-w-lg flex flex-col items-center">
              <ChapterLabel num="x" title="my promises" />
              <h2 className="display text-center font-light leading-tight mb-3" style={{ fontSize: "clamp(2rem,7vw,3.5rem)" }}>A jar of promises.</h2>
              <p className="text-center text-sm mb-12 italic" style={{ color: "rgba(234,230,240,0.5)" }}>each little light is one. open them, one by one.</p>
              <FireflyJar promises={promises} onAllOpened={() => setPromiseBurst(true)} />
            </div>
          </Scene>

          {/* 10 · Final letter */}
          <Scene id="ch-letter" hidden={!showChapter("ch-letter")}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4 }}
              className="w-full max-w-2xl p-8 sm:p-12 rounded-[32px] relative grain"
              style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(232,195,158,0.2)" }}>
              <div className="absolute top-7 right-7"><Lily size={34} opacity={0.5} /></div>
              <ChapterLabel num="xi" title="a letter" />
              <h2 className="display font-light text-center mb-10" style={{ fontSize: "clamp(2.5rem,8vw,4rem)" }}>To {NAME},</h2>
              <div className="space-y-6 text-base sm:text-lg leading-relaxed" style={{ color: "rgba(234,230,240,0.8)" }}>
                {[
                  "Loving you has quietly rearranged my whole life. In the best way. Without filing any paperwork.",
                  "The world got softer after you walked into it. I checked. It's measurable.",
                  "You make ordinary days feel meaningful, silence feel comfortable, and happiness feel easy. That's three superpowers. Show-off.",
                  `I hope you always remember how deeply appreciated, admired, and loved you are, ${NAME}.`,
                  "Thank you for existing. And for choosing to do it near me.",
                ].map((para, pi) => (
                  <p key={pi}>
                    {para.split(" ").map((word, wi) => (
                      <motion.span
                        key={wi}
                        initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.5, delay: pi * 0.5 + wi * 0.05, ease: "easeOut" }}
                        style={{ display: "inline-block", marginRight: "0.28em" }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </p>
                ))}
                <motion.p
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.6, delay: 3.2 }}
                  className="display text-2xl sm:text-3xl mt-10" style={{ color: "#E8C39E" }}>
                  Always you.
                </motion.p>
              </div>
            </motion.div>
          </Scene>

          {/* 11 · COUNTDOWN — until we meet */}
          <Scene id="ch-countdown" hidden={!showChapter("ch-countdown")}><CountdownScene /></Scene>

          {/* 12 · PULL THE STARS */}
          <Scene id="ch-pull" hidden={!showChapter("ch-pull")}>
            <div className="w-full max-w-2xl flex flex-col items-center">
              <ChapterLabel num="xiii" title="reach out" />
              <h2 className="display text-center font-light leading-tight mb-3" style={{ fontSize: "clamp(2rem,7vw,3.5rem)" }}>Hold out your hand.</h2>
              <p className="text-center text-sm mb-8 italic" style={{ color: "rgba(234,230,240,0.5)" }}>press and drag — the stars come to you. they always do.</p>
              <PullStars />
              <p className="text-center text-xs mt-6 italic" style={{ color: "rgba(234,230,240,0.4)" }}>even the sky leans toward you, Baby Boo.</p>
            </div>
          </Scene>

          {/* 13 · TIMELINE — our story, so far (the growing album) */}
          <Scene id="ch-timeline" hidden={!showChapter("ch-timeline")} tall>
            <div className="w-full max-w-lg">
              <ChapterLabel num="xiv" title="our story, so far" />
              <h2 className="display text-center font-light leading-tight mb-3" style={{ fontSize: "clamp(2rem,7vw,3.5rem)" }}>Every time we meet,</h2>
              <p className="text-center text-sm mb-14 italic" style={{ color: "rgba(234,230,240,0.5)" }}>this page grows a little longer.</p>

              <TimelineView deviceTilt={deviceTilt} />

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.5, y: 0 }} transition={{ duration: 2, delay: 0.8 }}
                className="text-center text-xs mt-14 eyebrow" style={{ color: "#A8C5F0" }}>the end · and also, the beginning</motion.p>

              {/* HINTS: cryptic clues to the hidden things */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 2.5, delay: 2 }}
                className="mt-12 text-center space-y-2"
              >
                <p className="eyebrow text-[9px] mb-3" style={{ color: "rgba(232,195,158,0.5)" }}>p.s. — this place keeps secrets</p>
                <p className="text-xs italic" style={{ color: "rgba(234,230,240,0.4)" }}>the flower at the door remembers being touched three times.</p>
                <p className="text-xs italic" style={{ color: "rgba(234,230,240,0.4)" }}>the sky does something for those who find every star.</p>
                <p className="text-xs italic" style={{ color: "rgba(234,230,240,0.4)" }}>open every promise. all eight.</p>
                <p className="text-xs italic" style={{ color: "rgba(234,230,240,0.4)" }}>the last photo holds on if you do.</p>
                <p className="text-xs italic" style={{ color: "rgba(234,230,240,0.4)" }}>and sometimes, if you stay long enough, it rains petals.</p>
              </motion.div>
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
      <AnimatePresence>{selectedFeeling && <FeelingModal feeling={selectedFeeling} close={() => setSelectedFeeling(null)} />}</AnimatePresence>
      <AnimatePresence>{selectedMemory && <MemoryModal memory={selectedMemory} close={() => setSelectedMemory(null)} />}</AnimatePresence>
      <AnimatePresence>{hugOpen && <HugExperience close={() => setHugOpen(false)} />}</AnimatePresence>

      {/* SURPRISE: falling petals (once per visit, random moment) */}
      <AnimatePresence>{petalsActive && <FallingPetals count={isMobile ? 6 : 10} />}</AnimatePresence>

      {/* SURPRISE: sky warms when every star is found — root level, nothing can trap it */}
      <AnimatePresence>
        {skyGlow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0.4, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 6, times: [0, 0.25, 0.6, 1] }}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 55, background: "radial-gradient(circle at center, rgba(232,195,158,0.35) 0%, rgba(224,168,184,0.18) 40%, transparent 75%)" }}
          />
        )}
      </AnimatePresence>

      {/* SURPRISE: full-screen gold burst when every promise is opened */}
      <AnimatePresence>
        {promiseBurst && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none flex items-center justify-center"
            style={{ zIndex: 55 }}
          >
            <div className="absolute inset-0" style={{ background: "radial-gradient(circle at center, rgba(232,195,158,0.2) 0%, transparent 65%)" }} />
            {[...Array(isMobile ? 18 : 28)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                animate={{
                  x: Math.cos((i / (isMobile ? 18 : 28)) * Math.PI * 2) * (110 + (i % 5) * 55),
                  y: Math.sin((i / (isMobile ? 18 : 28)) * Math.PI * 2) * (110 + (i % 5) * 55),
                  opacity: 0, scale: 0,
                }}
                transition={{ duration: 2.2, ease: "easeOut", delay: i * 0.03 }}
                className="absolute rounded-full"
                style={{ width: 6 + (i % 3) * 3, height: 6 + (i % 3) * 3, background: "radial-gradient(circle,#fff,#ffe5b0)", boxShadow: "0 0 14px rgba(232,195,158,0.9)" }}
              />
            ))}
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1.2 }}
              className="display italic text-2xl sm:text-4xl text-center px-8 relative"
              style={{ color: "#EAE6F0", textShadow: "0 0 40px rgba(232,195,158,0.6)" }}
            >
              every single one is yours, {NAME}.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

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
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..500&family=Inter:wght@300;400;500&family=Caveat:wght@400;500;600&display=swap');
      .hand { font-family: 'Caveat', cursive; }
      .display { font-family: 'Fraunces', serif; }
      .grad-gold {
        background: linear-gradient(120deg, #f3d9bd 0%, #E8C39E 40%, #E0A8B8 100%);
        -webkit-background-clip: text; background-clip: text;
        -webkit-text-fill-color: transparent; color: transparent;
        padding-bottom: 0.08em;
      }
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
      /* site-wide film grain — subtle, over everything */
      .site-grain {
        position: fixed; inset: 0; pointer-events: none; z-index: 90; opacity: 0.05;
        background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='nn'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23nn)'/%3E%3C/svg%3E");
        mix-blend-mode: overlay;
      }
      /* site-wide vignette — darkens edges, focuses the center */
      .site-vignette {
        position: fixed; inset: 0; pointer-events: none; z-index: 89;
        background: radial-gradient(ellipse at center, transparent 45%, rgba(5,6,14,0.35) 80%, rgba(5,6,14,0.6) 100%);
      }
      @media (prefers-reduced-motion: reduce) {
        * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
      }
    `}</style>
  );
}