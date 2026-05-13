// App.jsx
// FINAL PREMIUM VERSION — with Open When Letters, Late Night Thoughts,
// Memory Constellation, Tiny Things, Emergency Hug Button

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Music2, X, Mail, Hand } from "lucide-react";

const notes = [
  "You make ordinary moments feel important.",
  "You somehow make life softer.",
  "You are deeply loved, more than you know.",
  "You feel like peace after chaos.",
  "Could you BE any more amazing?",
  "You are my favourite part of every day.",
  "Somehow the world feels lighter with you in it.",
  "You matter to me in ways I still struggle to explain.",
  "You are my first and the last thought of every day.",
  "You make silence feel comforting.",
  "I hope life gives us slow mornings together.",
  "You are the kind of person people write about.",
];

const episodeCards = [
  {
    title: "The One Where I Realized",
    text: "Somewhere between our conversations and your smile, I realized you had quietly become very important to me.",
  },
  {
    title: "The One Where Life Felt Softer",
    text: "You brought a warmth into my life that I didn’t even know I needed.",
  },
  {
    title: "The One Where You Stayed In My Head",
    text: "You became the person random things remind me of throughout the day.",
  },
  {
    title: "The One I Never Want To End",
    text: "If life is kind, I hope it gives me more time with you. Lots more.",
  },
];

const moods = [
  {
    title: "Need reassurance?",
    text: "You are deeply loved. Even on the days your mind tells you otherwise.",
    bg: "radial-gradient(circle at top, #23395d 0%, #10192d 50%, #050816 100%)",
  },
  {
    title: "Missing me?",
    text: "I’m probably missing you too. More than I admit sometimes.",
    bg: "radial-gradient(circle at top, #294d6b 0%, #122235 50%, #050816 100%)",
  },
  {
    title: "Need a smile?",
    text: "You’re cute even when you’re being dramatic.",
    bg: "radial-gradient(circle at top, #355c7d 0%, #16263a 50%, #050816 100%)",
  },
  {
    title: "Overthinking?",
    text: "Your heart is safe with me. You don’t have to carry every thought alone.",
    bg: "radial-gradient(circle at top, #1d3557 0%, #10192d 50%, #050816 100%)",
  },
  {
    title: "Need love?",
    text: "If I could, I’d wrap you in the safest hug right now.",
    bg: "radial-gradient(circle at top, #27496d 0%, #142033 50%, #050816 100%)",
  },
];

const songs = [
  { name: "Khat", code: "LUgpPmj6nR8" },
  { name: "I Like Me Better", code: "a7fzkqLozwA" },
  { name: "Future Looks Good", code: "KkGhYIPcAHg" },
  { name: "High On You", code: "gI1Z4UHg9o0" },
  { name: "Yellow", code: "yKNxeF4KMsY" },
  { name: "Tum Ho Toh", code: "rOUuGvJkBrQ" },
];

// ============ NEW: OPEN WHEN LETTERS ============
const letters = [
  {
    title: "Open when you miss me",
    text: "Close your eyes. I'm right there. In the pause between your thoughts. In the warmth on the side of your neck. I never actually leave — I just become quieter for a while. Missing me means I'm with you in a different way. Don't fight it. Sit with it. I'm sitting with it too.",
  },
  {
    title: "Open when you're overthinking",
    text: "Your brain is being loud again, isn't it? Listen — none of it is as big as it feels right now. Not even close. Whatever you said, whatever you didn't say, whatever you're replaying — it's okay. I promise. You are allowed to put the thought down. I've got you.",
  },
  {
    title: "Open when you can't sleep",
    text: "Hi. Hello. It's late. Your eyes are heavy but your mind won't slow down. I know that feeling. Here — borrow my calm for tonight. Imagine my hand resting on your back. Imagine my voice saying nothing in particular. The day is over. You did enough. You are enough. Sleep, my love.",
  },
  {
    title: "Open when you need reassurance",
    text: "You are not too much. You are not too little. You are not a project. You are not on trial. You are not at risk of being left. I'm not going anywhere — not when it's hard, not when you're quiet, not when you're convinced you're unlovable. Especially not then. You are loved. Past tense, present tense, future tense.",
  },
  {
    title: "Open when life feels heavy",
    text: "Put it down. Whatever it is. Just for a few minutes. Read this slowly. Breathe. The weight you're carrying is real, but it's not yours alone. I'm here. We'll figure it out — or we won't, and we'll figure out how to live with it together. Either way, you are not alone in this. Not for one second.",
  },
];

// ============ NEW: LATE NIGHT THOUGHTS ============
const lateNightThoughts = [
  "I wonder if you know how often you cross my mind.",
  "You made life feel less lonely somehow.",
  "You feel strangely familiar to my soul.",
  "Sometimes I catch myself smiling for no reason. It's always you.",
  "I hope someone has told you today how rare you are.",
  "Loving you doesn't feel like a decision. It feels like remembering.",
  "You are the softest part of my day.",
  "If overthinking is a love language, I speak it fluently — and it's always about you.",
];

// ============ NEW: MEMORY CONSTELLATION ============
const constellationMemories = [
  { x: 12, y: 25, text: "Being loved by you feels like one of life’s rarest things." },
  { x: 28, y: 60, text: "I could listen to you talk for hours and still want more." },
  { x: 45, y: 18, text: "The first time you laughed at something I said — I knew." },
  { x: 62, y: 70, text: "You are the reason I believe in slow, real love." },
  { x: 78, y: 35, text: "Some people feel like home. You feel like mine." },
  { x: 88, y: 75, text: "In every version of this life, I'd still pick you." },
  { x: 35, y: 85, text: "You make me want to be gentler with everything." },
  { x: 55, y: 45, text: "There’s something incredibly beautiful about the way you exist." },
];

// ============ NEW: TINY THINGS ============
const tinyThings = [
  "The way you say 'Come here' and 'Nothing, I Love You' when you don't want to tell me something.",
  "How you take care of me when I am stressed because of work.",
  "Your 'OMG Aditya' expressions when I say silly things",
  "The way you text in bursts when you're excited.",
  "Our late night instagram scrolling and QnA sessions.",
  "How you make sure you involve me in the smallest of things.",
  "The uncontrollable laughter on your own jokes. ",
  "How your name has started to feel like a soft place.",
];

export default function App() {
  const [entered, setEntered] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [hugOpen, setHugOpen] = useState(false);
  const [musicOpen, setMusicOpen] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [confetti, setConfetti] = useState([]);

  const [background, setBackground] = useState(
    "radial-gradient(circle at top, #13203d 0%, #070b1a 45%, #050816 100%)"
  );

  const popBalloon = (note, event) => {
    const burst = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: event.clientX,
      y: event.clientY,
    }));

    setConfetti(burst);

    setTimeout(() => {
      setSelectedNote(note);
    }, 180);

    setTimeout(() => {
      setConfetti([]);
    }, 1400);
  };

  return (
    <motion.div
      animate={{ background }}
      transition={{ duration: 1.2 }}
      className="min-h-screen overflow-x-hidden text-white relative"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* YOUTUBE PLAYER */}
      {currentSong && (
        <iframe
          width="0"
          height="0"
          allow="autoplay"
          src={`https://www.youtube.com/embed/${currentSong}?autoplay=1&loop=1&playlist=${currentSong}&controls=0`}
          title="music-player"
        />
      )}

      {/* FONTS + GLASS */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Inter:wght@300;400;500;600&display=swap');

          .heading-font {
            font-family: 'Cormorant Garamond', serif;
          }

          .glass {
            background: rgba(255,255,255,0.08);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255,255,255,0.1);
          }

          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>

      {/* STARS BACKGROUND */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -25, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
            }}
            className="absolute rounded-full bg-blue-200/30"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* MUSIC BUTTON */}
      <button
        onClick={() => setMusicOpen(true)}
        className="fixed top-5 right-5 z-50 glass p-3 sm:p-4 rounded-full hover:scale-110 transition"
      >
        <Music2 size={20} />
      </button>

      {/* ============ EMERGENCY HUG BUTTON (hold-to-hug, after entry) ============ */}
      {entered && !hugOpen && (
        <HugButton onTriggered={() => setHugOpen(true)} />
      )}

      {/* ENTRY */}
      {!entered ? (
        <section className="h-screen flex items-center justify-center px-6 relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="w-full max-w-5xl mx-auto text-center flex flex-col items-center"
          >
            <motion.h1
              initial={{ y: 40 }}
              animate={{ y: 0 }}
              transition={{ duration: 1.5 }}
              className="heading-font text-[3.5rem] sm:text-[5rem] md:text-[8rem] font-light leading-none text-center px-2"
            >
              Before you enter...
            </motion.h1>

            <p className="mt-8 text-lg sm:text-xl text-blue-100/70 max-w-xl leading-relaxed px-2">
              I couldn’t fit everything I feel for you into messages.
            </p>

            <p className="mt-5 text-2xl sm:text-3xl italic text-blue-200 heading-font">
              So I made this instead.
            </p>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setEntered(true)}
              className="mt-14 px-10 py-4 rounded-full glass text-lg sm:text-xl"
            >
              Enter
            </motion.button>
          </motion.div>
        </section>
      ) : (
        <>
          {/* BALLOONS */}
          <section className="min-h-screen relative flex flex-col items-center justify-center px-4 sm:px-6 pt-10 pb-4">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="heading-font text-4xl sm:text-5xl md:text-7xl text-center leading-tight px-4"
            >
              Some feelings are too big for texts.
            </motion.h1>

            <p className="mt-5 text-blue-100/70 text-lg sm:text-xl text-center">
              Pop the balloons.
            </p>

            <div className="relative mt-8 w-full max-w-6xl h-[520px] sm:h-[700px]">
              {notes.map((note, index) => (
                <FloatingBalloon
                  key={index}
                  note={note}
                  index={index}
                  popBalloon={popBalloon}
                />
              ))}
            </div>
          </section>

          {/* MOODS */}
          <section className="py-10 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="heading-font text-4xl sm:text-5xl md:text-6xl text-center mb-5 px-4">
                What Do You Need Right Now?
              </h2>

              <p className="text-center text-blue-100/60 mb-12 text-base sm:text-lg px-4">
                There’s something here for every mood.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {moods.map((mood, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ y: -6, scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedMood(mood);
                      setBackground(mood.bg);
                    }}
                    className="glass rounded-[30px] p-8 text-left"
                  >
                    <h3 className="heading-font text-3xl text-blue-200 mb-3">
                      {mood.title}
                    </h3>
                    <p className="text-blue-50/65">click to open</p>
                  </motion.button>
                ))}
              </div>
            </div>
          </section>

          {/* FRIENDS SECTION */}
          <section className="py-14 px-4 sm:px-6">
            <h2 className="heading-font text-4xl sm:text-5xl md:text-6xl text-center mb-12 px-4">
              The One Where...
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {episodeCards.map((card, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -8 }}
                  className="glass rounded-[32px] p-8 sm:p-10"
                >
                  <h3 className="heading-font text-3xl sm:text-4xl mb-6 text-blue-200">
                    {card.title}
                  </h3>
                  <p className="text-blue-50/75 leading-relaxed text-base sm:text-lg">
                    {card.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ============ NEW: OPEN WHEN LETTERS ============ */}
          <section className="py-16 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="heading-font text-4xl sm:text-5xl md:text-6xl text-center mb-5 px-4">
                Open When...
              </h2>
              <p className="text-center text-blue-100/60 mb-12 text-base sm:text-lg px-4">
                Letters for whenever you need them.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {letters.map((letter, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedLetter(letter)}
                    className="glass rounded-[28px] p-7 text-left flex flex-col items-start gap-4"
                  >
                    <div
                      className="rounded-full p-3"
                      style={{ background: "rgba(158,197,255,0.12)" }}
                    >
                      <Mail size={20} className="text-blue-200" />
                    </div>
                    <h3 className="heading-font text-2xl sm:text-3xl text-blue-100 leading-snug">
                      {letter.title}
                    </h3>
                    <p className="text-blue-100/40 text-sm">tap to open</p>
                  </motion.button>
                ))}
              </div>
            </div>
          </section>

          {/* ============ NEW: LATE NIGHT THOUGHTS ============ */}
          <section className="py-16 overflow-hidden">
            <h2 className="heading-font text-4xl sm:text-5xl md:text-6xl text-center mb-5 px-4">
              Late Night Thoughts
            </h2>
            <p className="text-center text-blue-100/60 mb-12 text-base sm:text-lg px-4">
              The things I think about when the world is quiet.
            </p>

            <div className="overflow-x-auto no-scrollbar px-4 sm:px-6">
              <div className="flex gap-5 pb-4" style={{ width: "max-content" }}>
                {lateNightThoughts.map((thought, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="glass rounded-[28px] p-8 sm:p-10"
                    style={{
                      width: "280px",
                      minHeight: "200px",
                      flexShrink: 0,
                    }}
                  >
                    <p className="heading-font text-xl sm:text-2xl text-blue-50/85 leading-relaxed italic">
                      “{thought}”
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <p className="text-center text-blue-100/30 text-xs mt-6 px-4">
              ← swipe →
            </p>
          </section>

          {/* ============ NEW: MEMORY CONSTELLATION ============ */}
          <section className="py-20 px-4 sm:px-6 relative overflow-hidden">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="heading-font text-4xl sm:text-5xl md:text-6xl text-center mb-5 px-4 relative z-10"
            >
              In every universe,
            </motion.h2>
            <p className="text-center text-blue-100/60 mb-10 text-base sm:text-lg px-4 relative z-10">
              I think I’d still find you. Tap the stars.
            </p>

            <div
              className="relative max-w-5xl mx-auto"
              style={{ height: "440px" }}
            >
              {constellationMemories.map((memory, i) => (
                <motion.button
                  key={i}
                  onClick={() => setSelectedMemory(memory)}
                  className="absolute"
                  style={{
                    left: `${memory.x}%`,
                    top: `${memory.y}%`,
                  }}
                  whileHover={{ scale: 1.4 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    animate={{
                      opacity: [0.4, 1, 0.4],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3 + (i % 4),
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="rounded-full"
                    style={{
                      width: "14px",
                      height: "14px",
                      background:
                        "radial-gradient(circle, #ffffff 0%, #9ec5ff 60%, transparent 100%)",
                      boxShadow: "0 0 20px rgba(158,197,255,0.8)",
                    }}
                  />
                </motion.button>
              ))}
            </div>
          </section>

          {/* ============ NEW: TINY THINGS I LOVE ABOUT YOU ============ */}
          <section className="py-16 px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="heading-font text-4xl sm:text-5xl md:text-6xl text-center mb-5 px-4">
                Tiny Things I Love About You
              </h2>
              <p className="text-center text-blue-100/60 mb-12 text-base sm:text-lg px-4">
                The little things no one else would notice.
              </p>

              <div className="space-y-4">
                {tinyThings.map((thing, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06 }}
                    className="glass rounded-2xl p-5 sm:p-6 flex items-start gap-4"
                  >
                    <Heart
                      size={18}
                      className="text-blue-200 flex-shrink-0 mt-1"
                    />
                    <p className="text-blue-50/85 text-base sm:text-lg leading-relaxed">
                      {thing}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* LETTER */}
          <section className="py-16 px-4 sm:px-6 flex justify-center">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="glass max-w-3xl rounded-[40px] p-8 sm:p-12"
            >
              <h2 className="heading-font text-4xl sm:text-5xl md:text-6xl mb-10 text-center">
                To You
              </h2>

              <div className="space-y-6 text-base sm:text-lg leading-relaxed text-blue-50/80">
                <p>Loving you has changed the way I experience life.</p>
                <p>Somehow, the world became softer after you entered it.</p>
                <p>
                  You make ordinary days feel meaningful. You make silence feel
                  comforting. You make happiness feel easy.
                </p>
                <p>
                  I hope you always remember how deeply appreciated, admired,
                  and loved you are.
                </p>
                <p>Thank you for existing in my life.</p>
                <p className="text-blue-200 text-2xl sm:text-3xl mt-10 heading-font">
                  Always you.
                </p>
              </div>
            </motion.div>
          </section>
        </>
      )}

      {/* MUSIC POPUP */}
      <AnimatePresence>
        {musicOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="glass w-full max-w-md p-8 rounded-[35px] relative"
            >
              <button
                onClick={() => setMusicOpen(false)}
                className="absolute top-5 right-5 text-white/70 hover:text-white"
              >
                <X />
              </button>

              <h2 className="heading-font text-4xl text-center mb-8 text-blue-200">
                Choose A Song
              </h2>

              <div className="space-y-4">
                {songs.map((song, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setCurrentSong(song.code);
                      setMusicOpen(false);
                    }}
                    className="w-full glass rounded-2xl p-5 text-left"
                  >
                    <p className="text-xl text-blue-50">{song.name}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONFETTI */}
      {confetti.map((piece, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 1, x: piece.x, y: piece.y, scale: 1 }}
          animate={{
            x: piece.x + (Math.random() - 0.5) * 500,
            y: piece.y - Math.random() * 350,
            opacity: 0,
            scale: 0,
            rotate: Math.random() * 720,
          }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="fixed z-[9999]"
          style={{
            width: `${4 + Math.random() * 8}px`,
            height: `${4 + Math.random() * 8}px`,
            borderRadius: "999px",
            background: ["#9ec5ff", "#ffffff", "#d6e7ff", "#7db2ff"][
              Math.floor(Math.random() * 4)
            ],
          }}
        />
      ))}

      {/* NOTE POPUP */}
      <AnimatePresence>
        {selectedNote && (
          <Popup
            text={selectedNote}
            close={() => setSelectedNote(null)}
          />
        )}
      </AnimatePresence>

      {/* MOOD POPUP */}
      <AnimatePresence>
        {selectedMood && (
          <Popup
            text={selectedMood.text}
            close={() => setSelectedMood(null)}
          />
        )}
      </AnimatePresence>

      {/* LETTER POPUP */}
      <AnimatePresence>
        {selectedLetter && (
          <LetterPopup
            letter={selectedLetter}
            close={() => setSelectedLetter(null)}
          />
        )}
      </AnimatePresence>

      {/* MEMORY POPUP */}
      <AnimatePresence>
        {selectedMemory && (
          <Popup
            text={selectedMemory.text}
            close={() => setSelectedMemory(null)}
          />
        )}
      </AnimatePresence>

      {/* HUG POPUP */}
      <AnimatePresence>
        {hugOpen && <HugPopup close={() => setHugOpen(false)} />}
      </AnimatePresence>
    </motion.div>
  );
}

/* ============ EXISTING POPUP ============ */
function Popup({ text, close }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center px-4 sm:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="glass w-full max-w-lg p-8 sm:p-12 rounded-[35px] relative"
      >
        <button
          onClick={close}
          className="absolute top-5 right-5 text-white/70 hover:text-white"
        >
          <X />
        </button>

        <Heart className="text-blue-200 mb-6" />

        <p className="heading-font text-3xl sm:text-4xl leading-relaxed text-blue-50">
          {text}
        </p>

        <p className="mt-8 text-sm text-blue-100/50">
          Come back whenever you need to.
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ============ NEW: LETTER POPUP ============ */
function LetterPopup({ letter, close }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center px-4 sm:px-6 py-8 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.7, opacity: 0, y: 30 }}
        transition={{ duration: 0.5 }}
        className="glass w-full max-w-xl p-8 sm:p-12 rounded-[35px] relative my-auto"
      >
        <button
          onClick={close}
          className="absolute top-5 right-5 text-white/70 hover:text-white"
        >
          <X />
        </button>

        <Mail className="text-blue-200 mb-6" size={22} />

        <h3 className="heading-font text-2xl sm:text-3xl text-blue-100 mb-6 leading-snug">
          {letter.title}
        </h3>

        <p className="text-blue-50/85 text-base sm:text-lg leading-relaxed">
          {letter.text}
        </p>

        <p className="mt-8 text-sm text-blue-100/50 italic">
          — yours, always.
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ============ NEW: HOLD-TO-HUG BUTTON ============ */
function HugButton({ onTriggered }) {
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const triggeredRef = useRef(false);

  const HOLD_DURATION = 2000; // ms
  const TICK = 30;

  const startHold = () => {
    if (triggeredRef.current) return;
    triggeredRef.current = false;
    setHolding(true);

    // Subtle haptic on devices that support it (Android; iOS silently no-ops)
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(15);
    }

    const start = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(elapsed / HOLD_DURATION, 1);
      setProgress(pct);

      if (pct >= 1 && !triggeredRef.current) {
        triggeredRef.current = true;
        clearInterval(intervalRef.current);
        if (typeof navigator !== "undefined" && navigator.vibrate) {
          navigator.vibrate([30, 60, 30]);
        }
        onTriggered();
      }
    }, TICK);
  };

  const endHold = () => {
    clearInterval(intervalRef.current);
    if (!triggeredRef.current) {
      setHolding(false);
      setProgress(0);
    }
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 120 }}
      className="fixed bottom-5 left-5 z-50"
    >
      {/* Expanding glow while holding */}
      <AnimatePresence>
        {holding && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1 + progress * 2.5,
              opacity: 0.5 - progress * 0.3,
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(158,197,255,0.5) 0%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Floating particles while holding */}
      <AnimatePresence>
        {holding &&
          [...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 0, x: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
                y: -60 - Math.random() * 40,
                x: (Math.random() - 0.5) * 50,
              }}
              transition={{
                duration: 1.5 + Math.random(),
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full bg-blue-200/80 pointer-events-none"
              style={{ boxShadow: "0 0 8px rgba(158,197,255,0.9)" }}
            />
          ))}
      </AnimatePresence>

      <motion.button
        onMouseDown={startHold}
        onMouseUp={endHold}
        onMouseLeave={endHold}
        onTouchStart={startHold}
        onTouchEnd={endHold}
        onTouchCancel={endHold}
        animate={{
          scale: holding ? 1 + progress * 0.15 : [1, 1.04, 1],
        }}
        transition={
          holding
            ? { duration: 0.15 }
            : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
        }
        className="relative glass rounded-full p-4 sm:p-5 select-none"
        style={{
          boxShadow: `0 0 ${40 + progress * 60}px rgba(158,197,255,${
            0.25 + progress * 0.5
          })`,
          touchAction: "manipulation",
        }}
      >
        <div className="flex items-center gap-2">
          <motion.div
            animate={
              holding
                ? { scale: [1, 1.3, 1] }
                : { scale: 1 }
            }
            transition={
              holding
                ? { duration: 0.7, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.3 }
            }
          >
            <Hand size={20} className="text-blue-200" />
          </motion.div>
          <span className="text-sm sm:text-base text-blue-100 hidden sm:inline">
            {holding ? "hold on..." : "need a hug?"}
          </span>
        </div>

        {/* Progress ring */}
        {holding && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none -rotate-90"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="rgba(158,197,255,0.9)"
              strokeWidth="2"
              strokeDasharray={`${progress * 301.6} 301.6`}
              style={{ transition: "stroke-dasharray 0.05s linear" }}
            />
          </svg>
        )}
      </motion.button>

      {/* Mobile-only tiny instruction the first time */}
      {!holding && (
        <p className="absolute -top-6 left-2 text-[10px] text-blue-100/40 whitespace-nowrap sm:hidden">
          hold me
        </p>
      )}
    </motion.div>
  );
}

/* ============ NEW: HUG EXPERIENCE (full-screen, sequenced) ============ */
function HugPopup({ close }) {
  const [step, setStep] = useState(0);
  const [closing, setClosing] = useState(false);
  const [showAftermath, setShowAftermath] = useState(false);

  const lines = [
    "Hey Babyyy.",
    "I know some days feel heavier than others.",
    "But you never have to go through them alone.",
    "Stay here for a few seconds. Let me hold the world still for you.",
    "I've got you my baby girl!",
  ];


// Step timing — each line gets ~3.5s, except the "hold the world still" line which lingers for 5s
  useEffect(() => {
  if (closing) return;
  if (step < lines.length - 1) {
    const duration = step === 3 ? 6000 : 3500;
    const t = setTimeout(() => setStep(step + 1), duration);
    return () => clearTimeout(t);
  } else {
      // After the last line, hold for 4s, then begin closing
      const t = setTimeout(() => {
        setClosing(true);
        setTimeout(() => {
          setShowAftermath(true);
          // Show the aftermath line for 4s, then fully close
          setTimeout(() => {
            close();
          }, 4500);
        }, 1500);
      }, 4000);
      return () => clearTimeout(t);
    }
  }, [step, closing, lines.length, close]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: closing && showAftermath ? 0.6 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      style={{
        background:
          "radial-gradient(circle at center, rgba(35,57,93,0.95) 0%, rgba(8,12,28,0.98) 60%, rgba(5,8,22,1) 100%)",
        backdropFilter: "blur(40px)",
      }}
    >
      {/* Breathing ambient bloom */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(158,197,255,0.18) 0%, transparent 55%)",
        }}
      />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            x: `${Math.random() * 100}%`,
            y: "100%",
          }}
          animate={{
            opacity: [0, 0.7, 0],
            y: "-10%",
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "linear",
          }}
          className="absolute rounded-full bg-blue-200/60 pointer-events-none"
          style={{
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
            left: `${Math.random() * 100}%`,
            boxShadow: "0 0 12px rgba(158,197,255,0.6)",
          }}
        />
      ))}

      {/* Close (X) — discreet, top-right */}
      {!closing && (
        <button
          onClick={() => {
            setClosing(true);
            setTimeout(() => close(), 800);
          }}
          className="absolute top-6 right-6 text-white/30 hover:text-white/70 transition-colors z-10"
          aria-label="close"
        >
          <X size={20} />
        </button>
      )}

      {/* The sequenced text */}
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
                animate={{
                  // Subtle heartbeat on every line
                  scale: [1, 1.015, 1, 1.015, 1],
                }}
                transition={{
                  duration: 1.2,
                  times: [0, 0.15, 0.3, 0.45, 1],
                  repeat: Infinity,
                  repeatDelay: 1.2,
                  ease: "easeInOut",
                }}
                className="heading-font text-3xl sm:text-5xl md:text-6xl text-blue-50 leading-relaxed px-4"
                style={{
                  textShadow: "0 0 40px rgba(158,197,255,0.3)",
                }}
              >
                {lines[step]}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Tiny step indicator dots */}
          <div className="mt-16 flex items-center justify-center gap-2">
            {lines.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: i <= step ? 0.6 : 0.15,
                  scale: i === step ? 1.3 : 1,
                }}
                transition={{ duration: 0.6 }}
                className="w-1.5 h-1.5 rounded-full bg-blue-200"
              />
            ))}
          </div>
        </div>
      )}

      {/* Aftermath line */}
      <AnimatePresence>
        {showAftermath && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.7, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute bottom-12 left-0 right-0 text-center text-blue-100/70 heading-font text-xl sm:text-2xl italic px-6"
          >
            Come back whenever you need this.
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ============ EXISTING BALLOON ============ */
function FloatingBalloon({ note, index, popBalloon }) {
  const colors = ["#9ec5ff", "#74a7ff", "#b7d4ff", "#6f9cff", "#89b6ff"];

  const positions = [
    { left: "8%", top: "20%" },
    { left: "22%", top: "55%" },
    { left: "38%", top: "25%" },
    { left: "52%", top: "60%" },
    { left: "68%", top: "18%" },
    { left: "82%", top: "45%" },
    { left: "14%", top: "78%" },
    { left: "34%", top: "82%" },
    { left: "58%", top: "80%" },
    { left: "74%", top: "72%" },
    { left: "48%", top: "42%" },
    { left: "88%", top: "22%" },
  ];

  const position = positions[index % positions.length];

  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  return (
    <motion.div
      initial={{ y: 0, rotate: -2 }}
      animate={{
        y: [-10, 10, -10],
        rotate: [-2, 2, -2],
        x: [-2, 2, -2],
      }}
      transition={{
        duration: 7 + index,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 1.15 }}
      onClick={(e) => popBalloon(note, e)}
      className="absolute cursor-pointer"
      style={{ left: position.left, top: position.top }}
    >
      <motion.div
        animate={{ rotate: [-1, 1, -1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-[90px] sm:top-[118px] w-[2px] h-16 sm:h-24 bg-white/20 origin-top"
      />

      <motion.div
        whileHover={{ y: -4 }}
        className="relative rounded-full"
        style={{
          width: isMobile ? "78px" : "110px",
          height: isMobile ? "98px" : "140px",
          background: `linear-gradient(145deg, ${
            colors[index % colors.length]
          }, #d9e9ff)`,
          boxShadow: "0 25px 50px rgba(100,160,255,0.25)",
        }}
      >
        <div className="absolute top-5 left-5 w-7 h-12 rounded-full bg-white/35 blur-sm" />

        <div
          className="absolute -bottom-3 left-1/2 -translate-x-1/2"
          style={{
            width: 0,
            height: 0,
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderTop: `16px solid ${colors[index % colors.length]}`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}