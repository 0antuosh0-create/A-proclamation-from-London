import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const confetti = Array.from({ length: 24 }, (_, index) => ({
  color: ["#ef4444", "#f3c76f", "#f7eee1", "#1c6580"][index % 4],
  delay: (index % 7) * 0.035,
  drift: ((index * 47) % 640) - 320,
  fall: 180 + ((index * 29) % 280),
  rotate: 160 + ((index * 83) % 420),
}));

// رمز عبور دلخواه
const CORRECT_PASSCODE = "London";

function Autograph() {
  const reduceMotion = useReducedMotion();
  const pathMotion = { pathLength: 1, opacity: 1 };

  return (
    <motion.div
      className="autograph"
      initial={{ opacity: 0, rotate: -4, y: 12 }}
      animate={{ opacity: 1, rotate: -2, y: 0 }}
      transition={{ delay: 1.15, duration: 0.7 }}
      whileHover={reduceMotion ? {} : { rotate: 2, scale: 1.06 }}
      aria-label="A playful rendering of your autograph"
    >
      <motion.span
        className="autograph-crown"
        aria-hidden="true"
        animate={reduceMotion ? {} : { rotate: [-6, 5, -6], y: [0, -4, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 44 30" fill="none">
          <path d="M4 24 2 7l12 9L22 3l8 13 12-9-3 17H4Z" />
          <path d="M5 28h34" />
        </svg>
      </motion.span>

      <svg className="autograph-mark" viewBox="0 0 600 447" fill="none" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
          <motion.path
            d="M357 157c31-29 44-63 85-108M360 158c61-28 124-57 202-79"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={pathMotion}
            transition={{ delay: 1.35, duration: 0.8 }}
          />
          <motion.path
            d="M382 214c45-37 84-67 121-80 8 4-16 23-52 40-26 12-49 27-69 40Zm19-4c31-17 56-34 82-51m-67 86c27-14 54-34 77-55m-79 56c26-6 50-18 71-34m-17 9c17-1 33 0 49-1m-30 20c26-10 46-17 70-19"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={pathMotion}
            transition={{ delay: 1.55, duration: 1.1 }}
          />
          <motion.path
            d="M36 287c69-9 133-22 178-52 11-7-11 20-32 39L54 379"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={pathMotion}
            transition={{ delay: 1.7, duration: 0.8 }}
          />
          <motion.path
            d="M258 268c23-27 44-45 66-46v68c-14 1-34-24-46-64"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={pathMotion}
            transition={{ delay: 1.85, duration: 0.7 }}
          />
          <motion.path
            d="M174 330c22-13 46-34 69-38 8 4-14 23-29 35-14 11-28 23-38 34 21-6 39-20 57-37m-36 72c32-23 64-49 91-77m-89 76c37-15 69-44 101-73"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={pathMotion}
            transition={{ delay: 2, duration: 1 }}
          />
        </g>
      </svg>
      <span className="autograph-caption">From Antoush</span>
    </motion.div>
  );
}

export default function App() {
  const reduceMotion = useReducedMotion();
  const [celebration, setCelebration] = useState(0);

  // سیستم رمز عبور
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === CORRECT_PASSCODE) {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <main className="celebration-page">
      {/* تصویر پس‌زمینه اصلی با آدرس‌دهی هوشمند برای GitHub Pages */}
      <img
        className="london-painting"
        src={`${import.meta.env.BASE_URL}images/london-oil-painting.jpg`}
        alt="An oil painting of London glowing at sunset"
        decoding="async"
        fetchPriority="high"
      />
      <div className="painting-wash" aria-hidden="true" />
      <div className="canvas-grain" aria-hidden="true" />

      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          /* ---------------------------------------------------- */
          /* ۱. صفحه ورودی رمز عبور                              */
          /* ---------------------------------------------------- */
          <motion.div
            key="lock-screen"
            className="hero-content"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -20, filter: "blur(8px)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ maxWidth: "420px" }}
          >
            <p className="eyebrow" style={{ letterSpacing: "0.22em" }}>
              A Private Note
            </p>

            <h2
              className="well-done"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
                marginBottom: "0.2em",
                textTransform: "none",
              }}
            >
              London Awaits
            </h2>

            <p
              className="supporting-copy"
              style={{
                fontSize: "0.95rem",
                marginTop: "0",
                marginBottom: "28px",
                opacity: 0.85,
              }}
            >
              Please enter the secret passcode to unlock this special note.
            </p>

            <form
              onSubmit={handleLogin}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                padding: "24px",
                borderRadius: "4px",
                background: "rgba(10, 26, 32, 0.55)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(247, 216, 142, 0.22)",
                boxShadow: "0 16px 40px rgba(2, 16, 21, 0.45)",
              }}
            >
              <div style={{ position: "relative" }}>
                <input
                  type="password"
                  placeholder="Passcode..."
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    if (error) setError(false);
                  }}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "2px",
                    border: error
                      ? "1px solid #ef4444"
                      : "1px solid rgba(255, 248, 234, 0.3)",
                    background: "rgba(5, 17, 22, 0.6)",
                    color: "#fff8ea",
                    textAlign: "center",
                    fontSize: "1.1rem",
                    letterSpacing: "0.2em",
                    outline: "none",
                    transition: "border-color 200ms ease",
                  }}
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    color: "#f87171",
                    fontSize: "0.78rem",
                    margin: "0",
                    fontStyle: "italic",
                    fontFamily: "Georgia, serif",
                  }}
                >
                  Incorrect passcode. Give it another try!
                </motion.p>
              )}

              <motion.button
                type="submit"
                className="celebrate-button"
                style={{
                  marginTop: "6px",
                  width: "100%",
                  justifyContent: "center",
                }}
                whileHover={reduceMotion ? {} : { scale: 1.02 }}
                whileTap={reduceMotion ? {} : { scale: 0.97 }}
              >
                <span>Unlock The Note</span>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 15v2m-6 4h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2Zm10-10V7a4 4 0 0 0-8 0v4h8Z" />
                </svg>
              </motion.button>
            </form>
          </motion.div>
        ) : (
          /* ---------------------------------------------------- */
          /* ۲. صفحه اصلی تبریک                                   */
          /* ---------------------------------------------------- */
          <motion.div
            key="main-screen"
            style={{ width: "100%", height: "100%", display: "contents" }}
            initial={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {celebration > 0 && (
              <div key={celebration} className="confetti-field" aria-hidden="true">
                {confetti.map((piece, index) => (
                  <motion.span
                    key={index}
                    className="confetti-piece"
                    style={{ backgroundColor: piece.color }}
                    initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
                    animate={{
                      x: piece.drift,
                      y: piece.fall,
                      opacity: [1, 1, 0],
                      rotate: piece.rotate,
                      scale: [1, 1.1, 0.8],
                    }}
                    transition={{ duration: 1.7, delay: piece.delay, ease: "easeOut" }}
                  />
                ))}
              </div>
            )}

            <section className="hero-content" aria-labelledby="congratulations-title">
              <motion.p
                className="eyebrow"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
              >
                A proclamation from London
              </motion.p>

              <h1 id="congratulations-title" className="hero-title">
                <motion.span
                  className="well-done"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.38, duration: 0.8, ease: "easeOut" }}
                >
                You're the main character!
                </motion.span>
                <motion.span
                  className="bahar"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.58, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  BAHAR
                </motion.span>
              </h1>

              <motion.p
                className="supporting-copy"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                It has been formally decreed across all high circles that the spotlight belongs solely to your grace, for you possess a presence that outshines the entire realm.
                <br className="desktop-break" /> No one is better suited to command the grand story than you. 
                <br className="desktop-break" /> You already are the true main character.
              </motion.p>

              <motion.button
                className="celebrate-button"
                type="button"
                onClick={() => setCelebration((current) => current + 1)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.05, duration: 0.6 }}
                whileHover={reduceMotion ? {} : { y: -2, scale: 1.02 }}
                whileTap={reduceMotion ? {} : { scale: 0.96 }}
              >
                <span>{celebration ? "Ring Them Again" : "Ring The Big Ben Bells"}</span>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M18 16V10a6 6 0 1 0-12 0v6l-2 3h16l-2-3Z" />
                  <path d="M10 21a2 2 0 0 0 4 0" />
                </svg>
              </motion.button>
            </section>

            <Autograph />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.footer
        className="sunshine-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <span className="sun-mark" aria-hidden="true" />
        Long May The Sunshine
        <span className="sun-mark" aria-hidden="true" />
      </motion.footer>

      <p className="sr-only" aria-live="polite">
        {celebration ? "Confetti launched for Bahar!" : ""}
      </p>
    </main>
  );
}