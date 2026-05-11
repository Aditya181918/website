// App.jsx
// Premium Romantic Website — "The One Made Just For You"
// React + Tailwind + Framer Motion

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Music2, X, Star } from "lucide-react";

const notes = [
  "You make ordinary moments feel important.",
  "Being loved by you feels warm.",
  "You somehow make life quieter and brighter at the same time.",
  "You are my favourite part of every day.",
  "Could you BE any more amazing?",
  "You matter to me in ways I still struggle to explain.",
  "You feel like peace after chaos.",
  "You’re probably my favourite plot twist.",
  "I think part of me was waiting for you.",
  "You make life softer.",
  "You are deeply loved.",
  "I hope life gives us slow mornings together.",
  "You’re my favourite notification.",
  "You have the kindest soul.",
  "You make the world feel less heavy.",
];

const episodeCards = [
  {
    title: "The One Where I Realized",
    text: "Somewhere between our conversations, your smile, and the way you exist so effortlessly... I realized you had quietly become very important to me.",
  },
  {
    title: "The One Where You Stayed In My Head",
    text: "You became the person I randomly think about during the day. The person small things remind me of.",
  },
  {
    title: "The One Where Life Felt Softer",
    text: "You brought a kind of warmth into my life that I didn’t know I needed.",
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

  // REPLACE THIS WITH YOUR YOUTUBE VIDEO ID
  const youtubeLink =
    "https://www.youtube.com/embed/oafxkMv4xnc?autoplay=1&loop=1&playlist=oafxkMv4xnc&controls=0&showinfo=0&modestbranding=1";

  return (
    <div className="bg-[#0d0d16] text-white min-h-screen overflow-x-hidden font-sans relative">
      
      {/* Hidden YouTube Music */}
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

      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-pink-400/20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-400/20 blur-3xl rounded-full" />
      </div>

      {/* Music Button */}
      <button
        onClick={() => setMusicPlaying(!musicPlaying)}
        className="fixed top-6 right-6 z-50 backdrop-blur-xl bg-white/10 border border-white/20 p-3 rounded-full hover:scale-110 transition"
      >
        <Music2 size={20} />
      </button>

      {!entered ? (
        <section className="h-screen flex flex-col items-center justify-center text-center px-6 relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <h1 className="text-5xl md:text-7xl font-light leading-tight">
              Before you enter...
            </h1>

            <p className="mt-8 text-xl text-white/70 max-w-xl leading-relaxed">
              I couldn’t fit everything I feel for you into messages.
            </p>

            <p className="mt-3 text-2xl italic text-pink-200">
              So I made this instead.
            </p>

            <button
              onClick={() => {
                setEntered(true);
                setMusicPlaying(true);
              }}
              className="mt-12 px-8 py-4 rounded-full bg-white text-black hover:scale-105 transition text-lg"
            >
              enter
            </button>
          </motion.div>
        </section>
      ) : (
        <>
          {/* Balloon Section */}
          <section className="min-h-screen relative flex flex-col items-center justify-center px-6 py-32">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl text-center font-light leading-tight"
            >
              Some feelings are too big for texts.
            </motion.h1>

            <p className="mt-6 text-white/70 text-xl text-center">
              Pop the balloons.
            </p>

            <div className="relative mt-24 w-full max-w-6xl h-[700px]">
              {notes.map((note, index) => (
                <FloatingBalloon
                  key={index}
                  note={note}
                  setSelectedNote={setSelectedNote}
                  index={index}
                />
              ))}
            </div>
          </section>

          {/* Episode Section */}
          <section className="py-32 px-6">
            <h2 className="text-5xl text-center mb-20">
              The One Where...
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {episodeCards.map((card, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -10 }}
                  className="backdrop-blur-xl bg-white/10 border border-white/10 p-8 rounded-[30px]"
                >
                  <h3 className="text-3xl mb-6 text-pink-200">
                    {card.title}
                  </h3>

                  <p className="text-white/75 leading-relaxed text-lg">
                    {card.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Hidden Lily Section */}
          <section className="py-40 text-center relative">
            <h2 className="text-5xl mb-6">Find The Hidden Lilies</h2>

            <p className="text-white/60 mb-16">
              Some secrets are hidden across this page.
            </p>

            <div className="flex justify-center gap-10 flex-wrap">
              {[
                "You are my favourite notification.",
                "You feel like home.",
                "I still smile at our conversations.",
              ].map((text, i) => (
                <Lily key={i} text={text} />
              ))}
            </div>
          </section>

          {/* Constellation Section */}
          <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
            <div className="absolute inset-0">
              {[...Array(70)].map((_, i) => (
                <Star
                  key={i}
                  className="absolute text-white/40"
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
              className="text-6xl relative z-10"
            >
              In every universe,
            </motion.h2>

            <p className="mt-6 text-2xl text-white/70 relative z-10">
              I think I’d still find you.
            </p>
          </section>

          {/* Final Letter */}
          <section className="py-40 px-6 flex justify-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="max-w-3xl backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[40px] p-12"
            >
              <h2 className="text-5xl mb-10 text-center">
                To You
              </h2>

              <div className="space-y-6 text-lg leading-relaxed text-white/80">
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

                <p className="text-pink-200 text-2xl mt-10">
                  Always you.
                </p>
              </div>
            </motion.div>
          </section>
        </>
      )}

      {/* Note Modal */}
      <AnimatePresence>
        {selectedNote && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-[#1b1b2c] border border-white/10 max-w-lg p-10 rounded-[30px] relative"
            >
              <button
                onClick={() => setSelectedNote(null)}
                className="absolute top-5 right-5"
              >
                <X />
              </button>

              <Heart className="text-pink-300 mb-6" />

              <p className="text-2xl leading-relaxed text-white/85">
                {selectedNote}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FloatingBalloon({ note, setSelectedNote, index }) {
  const colors = [
    "bg-pink-300",
    "bg-yellow-300",
    "bg-purple-300",
    "bg-blue-300",
    "bg-red-300",
  ];

  return (
    <motion.div
      animate={{
        y: [0, -25, 0],
      }}
      transition={{
        duration: 4 + Math.random() * 2,
        repeat: Infinity,
      }}
      onClick={() => setSelectedNote(note)}
      className={`absolute cursor-pointer rounded-full shadow-2xl ${colors[index % colors.length]}`}
      style={{
        width: `${90 + Math.random() * 40}px`,
        height: `${120 + Math.random() * 40}px`,
        left: `${Math.random() * 90}%`,
        top: `${Math.random() * 90}%`,
      }}
    >
      <div className="absolute left-1/2 top-full w-[2px] h-24 bg-white/40" />
    </motion.div>
  );
}

function Lily({ text }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(true)}
        className="cursor-pointer text-7xl"
      >
        🤍
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-[#1c1c2c] p-10 rounded-[30px] max-w-md text-center"
            >
              <p className="text-2xl leading-relaxed text-white/85">
                {text}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}