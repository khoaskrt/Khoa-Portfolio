import { useEffect, useRef, useState } from 'react';
import { credentialsContent, type Credential } from './content';

export function CredentialsSection() {
  const reducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const featured = credentialsContent.credentials.find((c) => c.image);
  const compact = credentialsContent.credentials.filter((c) => !c.image);

  return (
    <section
      id={credentialsContent.id}
      className="relative isolate overflow-hidden border-t border-[var(--border-day-strong)] text-[var(--day-body)]"
      style={{
        background: 'var(--day-surface)',
        paddingInline: 'var(--layout-padding)',
        paddingTop: 'clamp(5rem, 9vh, 8rem)',
        paddingBottom: 'clamp(6rem, 11vh, 10rem)',
      }}
    >
      <header
        className="relative z-10 flex w-full items-center justify-between gap-4 text-[var(--text-meta)] font-light leading-none tracking-[0.24em] uppercase text-[var(--day-meta)]"
      >
        <p className="m-0">{credentialsContent.headerLabel}</p>
        <p className="m-0" />
      </header>

      <div
        className="relative z-10 flex w-full flex-wrap items-end justify-between gap-x-8 gap-y-4"
        style={{ marginTop: 'clamp(2rem, 4.5vh, 3.5rem)' }}
      >
        <h2
          className="m-0 font-display font-bold leading-[0.88] tracking-[-0.04em] text-[var(--day-heading)]"
          style={{ fontSize: 'var(--text-section)' }}
        >
          {credentialsContent.headline[0]}<br />{credentialsContent.headline[1]}
        </h2>
        <div className="flex items-center gap-[0.6rem] pb-2 text-[10px] font-light tracking-[0.2em] uppercase text-[var(--day-faint)]">
          <span className="opacity-40" aria-hidden="true">·</span>
          <span>{credentialsContent.dateRange}</span>
        </div>
      </div>

      <div
        className="relative z-10 h-px w-full bg-[var(--border-day)]"
        style={{ marginTop: 'clamp(1.5rem, 3vh, 2.5rem)' }}
        aria-hidden="true"
      />

      {featured && (
        <FeaturedCredential cred={featured} reducedMotion={reducedMotion} />
      )}

      {compact.length > 0 && (
        <div
          className="relative z-10 flex w-full flex-col"
          style={{
            marginTop: 'clamp(2.5rem, 4vh, 3.5rem)',
          }}
        >
          {compact.map((cred, index) => (
            <CompactCredentialRow
              key={cred.issuer}
              cred={cred}
              index={index}
              reducedMotion={reducedMotion}
              isLast={index === compact.length - 1}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function FeaturedCredential({ cred, reducedMotion }: { cred: Credential; reducedMotion: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reducedMotion]);

  return (
    <article
      ref={ref}
      className="relative z-10 grid w-full items-start grid-cols-1 sm:grid-cols-[1.15fr_1fr]"
      style={{
        marginTop: 'clamp(2.5rem, 4.5vh, 4rem)',
        gap: 'clamp(1.5rem, 3vw, 2.8rem)',
        opacity: reducedMotion ? 1 : isRevealed ? 1 : 0,
        transform: reducedMotion ? 'none' : isRevealed ? 'translateY(0)' : 'translateY(26px)',
        transition: 'opacity 1.05s cubic-bezier(0.16, 1, 0.3, 1), transform 1.05s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div className="creds-frame relative flex-shrink-0 border border-[var(--border-day)] bg-[var(--day-surface-warm)] p-[0.45rem] shadow-[0_4px_28px_oklch(0.12_0.01_255/0.07)]">
        <div
          className="pointer-events-none absolute inset-x-[0.45rem] top-[0.45rem] h-px bg-[oklch(0.84_0.01_255/0.65)]"
          aria-hidden="true"
        />
        <img
          src={cred.image!}
          alt={`${cred.issuer} — ${cred.title.join(' ')} certificate`}
          className="block w-full border border-[oklch(0.89_0.01_255)] object-cover object-[top_left] grayscale-[3%] contrast-[1.02] brightness-[0.99]"
          style={{ aspectRatio: '16 / 11' }}
          loading="lazy"
        />
      </div>

      <div className="flex flex-col justify-between gap-[1.2rem] py-[0.35rem]">
        <div className="flex flex-col gap-[0.75rem]">
          <div className="flex items-center gap-[0.8rem]">
            <span className="inline-flex items-center self-start border border-[var(--day-stamp-border)] bg-[var(--day-stamp-bg)] px-[0.65rem] py-[0.28rem] text-[9px] font-normal tracking-[0.2em] uppercase text-[var(--day-meta)] whitespace-nowrap">
              {cred.issuer}
            </span>
            <span className="text-[9px] font-light tracking-[0.18em] uppercase text-[var(--day-meta)] whitespace-nowrap">
              {cred.date}
            </span>
          </div>
          <h3
            className="m-0 font-display font-medium leading-[0.90] tracking-[-0.025em] text-[var(--day-heading)]"
            style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.4rem)' }}
          >
            {cred.title[0]}<br />{cred.title[1]}
          </h3>
          <p
            className="m-0 max-w-[38ch] font-normal leading-[1.5] tracking-[0.004em] text-[var(--day-muted)]"
            style={{ fontFamily: 'var(--font-quote)', fontSize: 'clamp(0.82rem, 1vw, 0.95rem)' }}
          >
            {cred.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-[0.9rem] gap-y-[0.3rem]">
          {cred.signals.map((signal) => (
            <span
              key={signal}
              className="text-[9px] font-light tracking-[0.16em] uppercase text-[var(--day-signal-text)] whitespace-nowrap"
            >
              [ {signal} ]
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function CompactCredentialRow({
  cred,
  index,
  reducedMotion,
  isLast,
}: {
  key?: string;
  cred: Credential;
  index: number;
  reducedMotion: boolean;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -30px 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reducedMotion]);

  const stagger = (index + 1) * 0.12;

  return (
    <div
      ref={ref}
      className={`flex w-full flex-wrap items-baseline justify-between gap-x-[clamp(1rem,2vw,2rem)] gap-y-[0.4rem] border-t border-[var(--border-day)] ${isLast ? 'border-b' : ''}`}
      style={{
        paddingBlock: 'clamp(1.1rem, 2vh, 1.6rem)',
        opacity: reducedMotion ? 1 : isRevealed ? 1 : 0,
        transform: reducedMotion ? 'none' : isRevealed ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${stagger}s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${stagger}s`,
      }}
    >
      <div className="flex items-baseline gap-[clamp(0.8rem,1.5vw,1.5rem)] min-w-0">
        <span className="shrink-0 text-[9px] font-normal tracking-[0.2em] uppercase text-[var(--day-meta)] whitespace-nowrap">
          {cred.issuer}
        </span>
        <h3
          className="m-0 font-display font-medium leading-[1] tracking-[-0.02em] text-[var(--day-heading)] truncate"
          style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)' }}
        >
          {cred.title.join(' ')}
        </h3>
        <span
          className="hidden font-normal leading-[1.4] text-[var(--day-signal-text)] sm:inline truncate"
          style={{ fontFamily: 'var(--font-quote)', fontSize: 'clamp(0.78rem, 0.9vw, 0.88rem)' }}
        >
          {cred.subtitle}
        </span>
      </div>

      <div className="flex shrink-0 items-baseline gap-[0.9rem]">
        <div className="hidden flex-wrap gap-x-[0.7rem] gap-y-[0.2rem] md:flex">
          {cred.signals.map((signal) => (
            <span
              key={signal}
              className="text-[8.5px] font-light tracking-[0.16em] uppercase text-[var(--day-faint)] whitespace-nowrap"
            >
              [ {signal} ]
            </span>
          ))}
        </div>
        <span className="text-[9px] font-light tracking-[0.18em] uppercase text-[var(--day-meta)] whitespace-nowrap">
          {cred.date}
        </span>
      </div>
    </div>
  );
}
