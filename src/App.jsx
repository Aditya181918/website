// App.jsx
// FINAL PREMIUM VERSION
// Smooth cinematic balloons + stable positions + better spacing + blue luxury aesthetic

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Music2, X, Star } from "lucide-react";

const notes = [
  "You make ordinary moments feel important.",
  "You somehow make life softer.",
  "You are deeply loved, more than you know.",
  "You feel like peace after chaos.",
  "Could you BE any more amazing?",
  "You are my favourite part of every day.",
  "Somehow the world feels lighter with you in it.",
  "You matter to me in ways I still struggle to explain.",
  "You are my favourite plot twist.",
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

export default function App() {
  const [entered, setEntered] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [confetti, setConfetti] = useState([]);

  const youtubeLink =
    "https://www.youtube.com/embed/oafxkMv4xnc?autoplay=1&loop=1&playlist=oafxkMv4xnc&controls=0&showinfo=0&modestbranding=1";

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
    <div
      className="min-h-screen overflow-x-hidden text-white relative"
      style={{
        background:
          "radial-gradient(circle at top, #13203d 0%, #070b1a 45%, #050816 100%)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* FONTS */}
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
        `}
      </style>

      {/* MUSIC */}
      {musicPlaying && (
        <iframe
          width="0"
          height="0"
          src={youtubeLink}
          title="background-music"
          frameBorder="0"
          allow="autoplay"
        />
      )}

      {/* BACKGROUND STARS */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
            }}
            className="absolute rounded-full bg-blue-200/30"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>

      {/* MUSIC BUTTON */}
      <button
        onClick={() => setMusicPlaying(!musicPlaying)}
        className="fixed top-6 right-6 z-50 glass p-4 rounded-full hover:scale-110 transition duration-300"
      >
        <Music2 size={22} />
      </button>

      {/* ENTRY SCREEN */}
      {!entered ? (
        <section className="h-screen flex flex-col items-center justify-center text-center px-6 relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <motion.h1
              initial={{ y: 40 }}
              animate={{ y: 0 }}
              transition={{ duration: 1.5 }}
              className="heading-font text-6xl md:text-8xl font-light leading-tight"
            >
              Before you enter...
            </motion.h1>

            <p className="mt-8 text-xl text-blue-100/70 max-w-xl leading-relaxed">
              I couldn’t fit everything I feel for you into messages.
            </p>

            <p className="mt-4 text-3xl italic text-blue-200 heading-font">
              So I made this instead.
            </p>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setEntered(true);
                setMusicPlaying(true);
              }}
              className="mt-14 px-10 py-4 rounded-full glass text-lg tracking-wide"
            >
              enter
            </motion.button>
          </motion.div>
        </section>
      ) : (
        <>
          {/* BALLOONS */}
          <section className="min-h-screen relative flex flex-col items-center justify-center px-6 pt-16 pb-8">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="heading-font text-5xl md:text-7xl text-center leading-tight"
            >
              Some feelings are too big for texts.
            </motion.h1>

            <p className="mt-5 text-blue-100/70 text-xl text-center">
              Pop the balloons.
            </p>

            <div className="relative mt-10 w-full max-w-6xl h-[700px]">
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

          {/* FRIENDS SECTION */}
          <section className="py-12 px-6">
            <h2 className="heading-font text-6xl text-center mb-12">
              The One Where...
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {episodeCards.map((card, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -8 }}
                  className="glass rounded-[32px] p-10"
                >
                  <h3 className="heading-font text-4xl mb-6 text-blue-200">
                    {card.title}
                  </h3>

                  <p className="text-blue-50/75 leading-relaxed text-lg">
                    {card.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CONSTELLATION */}
          <section className="py-20 px-6 text-center relative overflow-hidden">
            <div className="absolute inset-0">
              {[...Array(70)].map((_, i) => (
                <Star
                  key={i}
                  className="absolute text-white/30"
                  size={10}
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </div>

            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="heading-font text-6xl relative z-10"
            >
              In every universe,
            </motion.h2>

            <p className="mt-6 text-2xl text-blue-100/70 relative z-10">
              I think I’d still find you.
            </p>
          </section>

          {/* FINAL LETTER */}
          <section className="py-16 px-6 flex justify-center">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="glass max-w-3xl rounded-[40px] p-12"
            >
              <h2 className="heading-font text-6xl mb-10 text-center">
                To You
              </h2>

              <div className="space-y-6 text-lg leading-relaxed text-blue-50/80">
                <p>
                  Loving you has changed the way I experience life.
                </p>

                <p>
                  Somehow, the world became softer after you entered it.
                </p>

                <p>
                  You make ordinary days feel meaningful. You make silence feel comforting. You make happiness feel easy.
                </p>

                <p>
                  I hope you always remember how deeply appreciated, admired, and loved you are.
                </p>

                <p>
                  Thank you for existing in my life.
                </p>

                <p className="text-blue-200 text-3xl mt-10 heading-font">
                  Always you.
                </p>
              </div>
            </motion.div>
          </section>
        </>
      )}

      {/* CONFETTI */}
      {confetti.map((piece, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 1,
            x: piece.x,
            y: piece.y,
            scale: 1,
          }}
          animate={{
            x: piece.x + (Math.random() - 0.5) * 500,
            y: piece.y - Math.random() * 350,
            opacity: 0,
            scale: 0,
            rotate: Math.random() * 720,
          }}
          transition={{
            duration: 1.6,
            ease: "easeOut",
          }}
          className="fixed z-[9999]"
          style={{
            width: `${4 + Math.random() * 8}px`,
            height: `${4 + Math.random() * 8}px`,
            borderRadius: "999px",
            background: [
              "#9ec5ff",
              "#ffffff",
              "#d6e7ff",
              "#7db2ff",
            ][Math.floor(Math.random() * 4)],
          }}
        />
      ))}

      {/* NOTE POPUP */}
      <AnimatePresence>
        {selectedNote && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="glass max-w-lg p-12 rounded-[35px] relative"
            >
              <button
                onClick={() => setSelectedNote(null)}
                className="absolute top-5 right-5 text-white/70 hover:text-white"
              >
                <X />
              </button>

              <Heart className="text-blue-200 mb-6" />

              <p className="heading-font text-4xl leading-relaxed text-blue-50">
                {selectedNote}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FloatingBalloon({ note, index, popBalloon }) {
  const colors = [
    "#9ec5ff",
    "#74a7ff",
    "#b7d4ff",
    "#6f9cff",
    "#89b6ff",
  ];

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

  return (
    <motion.div
      initial={{
        y: 0,
        rotate: -2,
      }}
      animate={{
        y: [-10, 10, -10],
        rotate: [-2, 2, -2],
      }}
      transition={{
        duration: 6 + index,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{
        scale: 1.06,
      }}
      whileTap={{
        scale: 1.15,
      }}
      onClick={(e) => popBalloon(note, e)}
      className="absolute cursor-pointer"
      style={{
        left: position.left,
        top: position.top,
      }}
    >
      {/* STRING */}
      <motion.div
        animate={{
          rotate: [-1, 1, -1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-[118px] w-[2px] h-24 bg-white/20 origin-top"
      />

      {/* BALLOON */}
      <motion.div
        whileHover={{
          y: -4,
        }}
        className="relative rounded-full"
        style={{
          width: "110px",
          height: "140px",
          background: `linear-gradient(145deg, ${
            colors[index % colors.length]
          }, #d9e9ff)`,
          boxShadow: "0 25px 50px rgba(100,160,255,0.25)",
        }}
      >
        {/* GLOSS */}
        <div className="absolute top-5 left-5 w-7 h-12 rounded-full bg-white/35 blur-sm" />

        {/* BOTTOM TAIL */}
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