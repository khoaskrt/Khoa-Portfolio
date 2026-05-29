import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { ease } from '../motion/shared-easing';

type Phase = 'counting' | 'hold' | 'wipe-in' | 'wipe-out' | 'done';

const WIPE_OUT_MS = 850;
const START_DELAY = 300;
const EXIT_HOLD = 350;

const STATUSES = [
  { at: 0, text: 'SYSTEM START' },
  { at: 20, text: 'LOADING ASSETS' },
  { at: 60, text: 'COMPUTING LAYOUT' },
  { at: 85, text: 'POLISHING' },
  { at: 100, text: 'READY' },
];

function getStatus(p: number): string {
  let s = STATUSES[0].text;
  for (const x of STATUSES) {
    if (p >= x.at) s = x.text;
  }
  return s;
}

interface PreLoaderProps {
  onComplete: () => void;
}

export function PreLoader({ onComplete }: PreLoaderProps) {
  const [phase, setPhase] = useState<Phase>('counting');
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const rafRef = useRef(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const tick = () => {
      const p = progressRef.current;
      let inc: number;
      if (p < 35) inc = Math.random() * 3.5 + 0.5;
      else if (p < 70) inc = Math.random() * 2.0 + 0.3;
      else if (p < 90) inc = Math.random() * 1.2 + 0.1;
      else inc = 0.3 + Math.random() * 0.1;

      const next = Math.min(p + inc, 100);
      progressRef.current = next;
      setProgress(next);

      if (next < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setPhase('hold');
      }
    };

    const delay = setTimeout(() => {
      rafRef.current = requestAnimationFrame(tick);
    }, START_DELAY);

    return () => {
      clearTimeout(delay);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (phase === 'hold') {
      const t = setTimeout(() => {
        onCompleteRef.current();
        setPhase('wipe-out');
      }, EXIT_HOLD);
      return () => clearTimeout(t);
    }
    if (phase === 'wipe-out') {
      const t = setTimeout(() => setPhase('done'), WIPE_OUT_MS + 50);
      return () => clearTimeout(t);
    }
  }, [phase]);

  if (phase === 'done') return null;

  const contentVisible = phase === 'counting' || phase === 'hold';
  const pct = Math.floor(progress);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      {/* Sirnik-style Split Screen Wipe */}
      <div
        className="absolute inset-x-0 top-0 z-0 bg-[var(--night-base)]"
        style={{
          height: '50vh',
          transform: phase === 'wipe-out' ? 'translateY(-100%)' : 'translateY(0)',
          transition: `transform ${WIPE_OUT_MS}ms cubic-bezier(0.76, 0, 0.24, 1)`,
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 z-0 bg-[var(--night-base)]"
        style={{
          height: '50vh',
          transform: phase === 'wipe-out' ? 'translateY(100%)' : 'translateY(0)',
          transition: `transform ${WIPE_OUT_MS}ms cubic-bezier(0.76, 0, 0.24, 1)`,
        }}
      />

      <motion.div
        className="relative z-10 flex h-full w-full flex-col items-center justify-center"
        animate={{
          opacity: contentVisible ? 1 : 0,
          scale: contentVisible ? 1 : 0.85,
          filter: contentVisible ? 'blur(0px)' : 'blur(12px)',
        }}
        transition={{ duration: 0.65, ease: ease.expoOut }}
      >
        {/* Subtle framework/grid */}
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-[0.12]">
          <div className="absolute inset-y-0 left-1/3 w-px bg-white" />
          <div className="absolute inset-y-0 right-1/3 w-px bg-white" />
          <div className="absolute inset-x-0 top-1/3 h-px bg-white" />
          <div className="absolute inset-x-0 bottom-1/3 h-px bg-white" />
          
          {/* Crosshairs at intersections */}
          <div className="absolute h-3 w-3 border-l border-t border-white left-1/3 top-1/3 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute h-3 w-3 border-r border-t border-white right-1/3 top-1/3 translate-x-1/2 -translate-y-1/2" />
          <div className="absolute h-3 w-3 border-l border-b border-white left-1/3 bottom-1/3 -translate-x-1/2 translate-y-1/2" />
          <div className="absolute h-3 w-3 border-r border-b border-white right-1/3 bottom-1/3 translate-x-1/2 translate-y-1/2" />
        </div>

        {/* Massive Ticker */}
        <div className="z-10 overflow-hidden px-4">
          <motion.div
            initial={{ y: '100%', rotateX: 45 }}
            animate={{ y: 0, rotateX: 0 }}
            transition={{ duration: 1.4, ease: ease.expoOut }}
            className="flex items-baseline font-display font-medium text-white leading-[0.8] tracking-[-0.05em]"
            style={{ fontSize: 'clamp(8rem, 24vw, 20rem)', transformPerspective: 1000 }}
          >
            {pct}
            <span className="text-[clamp(3rem,8vw,6rem)] font-light opacity-40 ml-2 tracking-normal">%</span>
          </motion.div>
        </div>

        {/* Status Line */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: ease.expoOut }}
          className="absolute bottom-[15vh] z-10 flex w-full max-w-sm flex-col items-center gap-4 px-6"
        >
          <div className="h-px w-full bg-white/10 overflow-hidden relative">
            <div
              className="absolute left-0 top-0 h-full bg-white/90"
              style={{
                width: `${progress}%`,
                transition: 'width 0.1s linear',
              }}
            />
          </div>
          <div className="flex w-full justify-between text-[length:var(--text-label)] font-light tracking-[0.25em] uppercase text-white/50">
            <span>{getStatus(pct)}</span>
            <span>ENG / OS</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
