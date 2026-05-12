// App.jsx
// ULTRA PREMIUM ROMANTIC WEBSITE
// Smooth balloons + mood section + dynamic backgrounds + cinematic experience

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

export default function App() {
  const [entered, setEntered] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [confetti, setConfetti] = useState([]);

  const [background, setBackground] = useState(
    "radial-gradient(circle at top, #13203d 0%, #070b1a 45%, #050816 100%)"
  );

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
    <motion.div
      animate={{
        background,
      }}
      transition={{
        duration: 1.2,
      }}
      className="min-h-screen overflow-x-hidden text-white relative"
      style={{
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

      {/* FLOATING STARS */}
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
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>

      {/* MUSIC BUTTON */}
      <button
        onClick={() => setMusicPlaying(!musicPlaying)}
        className="fixed top-6 right-6 z-50 glass p-4 rounded-full hover:scale-110 transition"
      >
        <Music2 size={22} />
      </button>

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
              className="heading-font text-[5rem] md:text-[8rem] font-light leading-none text-center"
            >
              Before you enter...
            </motion.h1>

            <p className="mt-8 text-xl text-blue-100/70 max-w-xl leading-relaxed">
              I couldn’t fit everything I feel for you into messages.
            </p>

            <p className="mt-5 text-3xl italic text-blue-200 heading-font">
              So I made this instead.
            </p>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setEntered(true);
                setMusicPlaying(true);
              }}
              className="mt-14 px-12 py-4 rounded-full glass text-xl"
            >
              Enter
            </motion.button>
          </motion.div>
        </section>
      ) : (
        <>
          {/* BALLOONS */}
          <section className="min-h-screen relative flex flex-col items-center justify-center px-6 pt-10 pb-4">
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

            <div className="relative mt-8 w-full max-w-6xl h-[700px]">
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

          {/* MOOD SECTION */}
          <section className="py-10 px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="heading-font text-6xl text-center mb-5">
                What Do You Need Right Now?
              </h2>

              <p className="text-center text-blue-100/60 mb-12 text-lg">
                There’s something here for every mood.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {moods.map((mood, index) => (
                  <motion.button
                    key={index}
                    whileHover={{
                      y: -6,
                      scale: 1.03,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    onClick={() => {
                      setSelectedMood(mood);
                      setBackground(mood.bg);
                    }}
                    className="glass rounded-[30px] p-8 text-left"
                  >
                    <h3 className="heading-font text-3xl text-blue-200 mb-3">
                      {mood.title}
                    </h3>

                    <p className="text-blue-50/65">
                      click to open
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>
          </section>

          {/* FRIENDS SECTION */}
          <section className="py-14 px-6">
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
    </motion.div>
  );
}

function Popup({ text, close }) {
  return (
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
          onClick={close}
          className="absolute top-5 right-5 text-white/70 hover:text-white"
        >
          <X />
        </button>

        <Heart className="text-blue-200 mb-6" />

        <p className="heading-font text-4xl leading-relaxed text-blue-50">
          {text}
        </p>

        <p className="mt-8 text-sm text-blue-100/50">
          Come back whenever you need to.
        </p>
      </motion.div>
    </motion.div>
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
        x: [-2, 2, -2],
      }}
      transition={{
        duration: 7 + index,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{
        scale: 1.08,
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
          duration: 4,
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

        {/* TAIL */}
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