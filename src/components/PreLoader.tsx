import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { ease } from '../motion/easing';

type Phase = 'counting' | 'hold' | 'wipe-in' | 'wipe-out' | 'done';

const SVG_H = 180;
const WIPE_IN_MS = 680;
const WIPE_OUT_MS = 720;
const START_DELAY = 900;
const EXIT_HOLD = 380;

const STATUSES = [
  { at: 0, text: 'INITIALIZING' },
  { at: 12, text: 'LOADING FONTS' },
  { at: 30, text: 'LOADING ASSETS' },
  { at: 55, text: 'CRAFTING UI' },
  { at: 78, text: 'POLISHING' },
  { at: 94, text: 'READY' },
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
  const [fillY, setFillY] = useState(SVG_H);
  const [waveY, setWaveY] = useState(SVG_H);
  const [clock, setClock] = useState('');
  const wavePhaseRef = useRef(0);
  const progressRef = useRef(0);
  const rafRef = useRef(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const tick = () => {
      const n = new Date();
      const pad = (v: number) => String(v).padStart(2, '0');
      setClock(`${pad(n.getHours())}:${pad(n.getMinutes())}:${pad(n.getSeconds())}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const tick = () => {
      const p = progressRef.current;
      let inc: number;
      if (p < 35) inc = Math.random() * 2.4 + 0.7;
      else if (p < 68) inc = Math.random() * 1.3 + 0.3;
      else if (p < 88) inc = Math.random() * 0.65 + 0.15;
      else inc = 0.14 + Math.random() * 0.09;

      const next = Math.min(p + inc, 100);
      progressRef.current = next;

      const rectY = SVG_H * (1 - next / 100);
      wavePhaseRef.current += 0.06;
      const wobble =
        Math.sin(wavePhaseRef.current) * 4 +
        Math.cos(wavePhaseRef.current * 0.7) * 2;

      setProgress(next);
      setFillY(rectY);
      setWaveY(rectY + wobble - 1);

      if (next < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setFillY(0);
        setWaveY(0);
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
      const t = setTimeout(() => setPhase('wipe-in'), EXIT_HOLD);
      return () => clearTimeout(t);
    }
    if (phase === 'wipe-in') {
      const t = setTimeout(() => {
        onCompleteRef.current();
        setPhase('wipe-out');
      }, WIPE_IN_MS);
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
  const fillHeight = Math.max(0, SVG_H - fillY + 1);

  return (
    <div
      className="preloader"
      aria-hidden="true"
      style={phase === 'wipe-out' ? { background: 'transparent' } : undefined}
    >
      <div
        className="preloader__wipe"
        style={{
          transform:
            phase === 'wipe-in'
              ? 'translateY(0%)'
              : phase === 'wipe-out'
                ? 'translateY(-100%)'
                : 'translateY(100%)',
          transition:
            phase === 'wipe-in'
              ? `transform ${WIPE_IN_MS}ms cubic-bezier(0.76, 0, 0.24, 1)`
              : phase === 'wipe-out'
                ? `transform ${WIPE_OUT_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`
                : 'none',
        }}
      />

      <motion.div
        className="preloader__content"
        animate={{
          opacity: contentVisible ? 1 : 0,
          scale: contentVisible ? 1 : 0.96,
          filter: contentVisible ? 'blur(0px)' : 'blur(6px)',
        }}
        transition={{ duration: 0.45, ease: ease.quartOut }}
      >
        <motion.div
          className="preloader__letter-wrap"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: ease.expoOut }}
        >
          <svg
            viewBox="0 0 140 180"
            className="preloader__letter-svg"
            aria-hidden="true"
          >
            <defs>
              <clipPath id="preKClip">
                <text
                  x="70"
                  y="148"
                  textAnchor="middle"
                  fontSize="180"
                  fontWeight="700"
                  fontFamily="Arial, Helvetica, sans-serif"
                >
                  K
                </text>
              </clipPath>
            </defs>
            <g clipPath="url(#preKClip)">
              <rect
                x="0"
                y="0"
                width="140"
                height={SVG_H}
                fill="rgba(255,255,255,0.05)"
              />
              <rect
                x="0"
                y={fillY}
                width="140"
                height={fillHeight}
                fill="rgba(245,248,252,0.82)"
              />
              <rect
                x="0"
                y={waveY}
                width="140"
                height="1.5"
                fill="rgba(255,255,255,0.9)"
              />
            </g>
          </svg>
          <div className="preloader__letter-glow" />
        </motion.div>

        <motion.div
          className="preloader__status"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          {getStatus(pct)}
        </motion.div>

        <motion.div
          className="preloader__track"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: ease.expoOut }}
        >
          <div
            className="preloader__bar"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
          <div
            className="preloader__glow"
            style={{ left: `${progress}%` }}
          />
        </motion.div>

        <motion.div
          className="preloader__info-row"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65, ease: ease.quartOut }}
        >
          <span className="preloader__counter">
            <span className="preloader__number">
              {String(pct).padStart(3, '0')}
            </span>
            <span className="preloader__percent">%</span>
          </span>
          <span className="preloader__clock">{clock}</span>
        </motion.div>
      </motion.div>

      {(['tl', 'tr', 'bl', 'br'] as const).map((pos, i) => (
        <motion.div
          key={pos}
          className={`preloader__corner preloader__corner--${pos}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: contentVisible ? 0.35 : 0 }}
          transition={{ duration: 0.7, delay: 0.25 + i * 0.06 }}
        />
      ))}

      <div className="preloader__noise" />
    </div>
  );
}
