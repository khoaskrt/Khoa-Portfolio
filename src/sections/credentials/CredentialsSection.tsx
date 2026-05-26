import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { credentialsContent, type Credential } from './content';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

export function CredentialsSection() {
  const reducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const sectionRef = useRef<HTMLElement>(null);
  const blocksRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (reducedMotion) return;
    const blocks = blocksRef.current.filter(Boolean) as HTMLDivElement[];
    const triggers: ScrollTrigger[] = [];

    blocks.forEach((el, i) => {
      const isLast = i === blocks.length - 1;
      const content = el.querySelector('.creds-sticky-content');
      if (!content) return;

      gsap.set(content, { opacity: 0, yPercent: 6 });

      const enterTl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: 'top 45%',
          scrub: 1.2,
        },
      });
      enterTl.to(content, {
        opacity: 1,
        yPercent: 0,
        ease: 'none',
      });
      if (enterTl.scrollTrigger) triggers.push(enterTl.scrollTrigger);

      if (!isLast) {
        const exitTl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'bottom 85%',
            end: 'bottom 30%',
            scrub: 1.2,
          },
        });
        exitTl.to(content, {
          opacity: 0,
          yPercent: -6,
          ease: 'none',
        });
        if (exitTl.scrollTrigger) triggers.push(exitTl.scrollTrigger);
      }
    });

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id={credentialsContent.id}
      className="relative isolate border-t border-[var(--border-day-strong)] text-[var(--day-body)]"
      style={{
        background: 'var(--day-surface)',
        paddingInline: 'var(--layout-padding)',
        paddingTop: 'clamp(3rem, 9vh, 8rem)',
        paddingBottom: 'clamp(2.5rem, 8vh, 7rem)',
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
        <div className="flex items-center gap-[0.6rem] pb-2 text-[var(--text-label)] font-light tracking-[0.2em] uppercase text-[var(--day-faint)]">
          <span className="opacity-40" aria-hidden="true">·</span>
          <span>{credentialsContent.dateRange}</span>
        </div>
      </div>

      <div
        className="relative z-10 h-px w-full bg-[var(--border-day)]"
        style={{ marginTop: 'clamp(1.5rem, 3vh, 2.5rem)' }}
        aria-hidden="true"
      />

      <div style={{ marginTop: 'clamp(2rem, 4vh, 3rem)' }}>
        {credentialsContent.credentials.map((cred, i) => {
          const isFeatured = !!cred.image;
          const isLast = i === credentialsContent.credentials.length - 1;
          return (
            <div
              key={cred.issuer}
              ref={(el) => { blocksRef.current[i] = el; }}
              className={`creds-sticky-block ${isFeatured ? 'creds-sticky-block--featured' : 'creds-sticky-block--compact'} ${isLast ? 'creds-sticky-block--last' : ''}`}
            >
              <span className="creds-block-index" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className={`creds-sticky-content ${isFeatured ? 'creds-sticky-content--featured' : 'creds-sticky-content--compact'}`}>
                {isFeatured ? (
                  <FeaturedCard cred={cred} />
                ) : (
                  <CompactCard cred={cred} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function FeaturedCard({ cred }: { cred: Credential }) {
  return (
    <article
      className="relative z-10 grid w-full items-start grid-cols-1 sm:grid-cols-[1.15fr_1fr]"
      style={{ gap: 'clamp(1.5rem, 3vw, 2.8rem)' }}
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
            <span className="inline-flex items-center self-start border border-[var(--day-stamp-border)] bg-[var(--day-stamp-bg)] px-[0.65rem] py-[0.28rem] text-[var(--text-label)] font-normal tracking-[0.2em] uppercase text-[var(--day-meta)] whitespace-nowrap">
              {cred.issuer}
            </span>
            <span className="text-[var(--text-label)] font-light tracking-[0.18em] uppercase text-[var(--day-meta)] whitespace-nowrap">
              {cred.date}
            </span>
          </div>
          <h3
            className="m-0 font-display font-medium leading-[0.90] tracking-[-0.025em] text-[var(--day-heading)]"
            style={{ fontSize: 'clamp(1.5rem, calc(1.17rem + 0.88vw), 2.4rem)' }}
          >
            {cred.title[0]}<br />{cred.title[1]}
          </h3>
          <p
            className="m-0 font-normal leading-[1.5] tracking-[0.004em] text-[var(--day-muted)]"
            style={{ fontFamily: 'var(--font-quote)', fontSize: 'var(--text-meta)' }}
          >
            {cred.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-[0.9rem] gap-y-[0.3rem]">
          {cred.signals.map((signal) => (
            <span
              key={signal}
              className="text-[var(--text-label)] font-light tracking-[0.16em] uppercase text-[var(--day-signal-text)] whitespace-nowrap"
            >
              [ {signal} ]
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function CompactCard({ cred }: { cred: Credential }) {
  return (
    <article className="relative z-10 w-full">
      <div
        className="border-t border-b border-[var(--border-day)]"
        style={{ paddingBlock: 'clamp(1.4rem, 2.5vh, 2rem)' }}
      >
        <div className="flex items-center gap-[0.8rem]">
          <span className="inline-flex items-center self-start border border-[var(--day-stamp-border)] bg-[var(--day-stamp-bg)] px-[0.65rem] py-[0.28rem] text-[var(--text-label)] font-normal tracking-[0.2em] uppercase text-[var(--day-meta)] whitespace-nowrap">
            {cred.issuer}
          </span>
          <span className="text-[var(--text-label)] font-light tracking-[0.18em] uppercase text-[var(--day-meta)] whitespace-nowrap">
            {cred.date}
          </span>
        </div>

        <h3
          className="m-0 font-display font-medium leading-[1] tracking-[-0.02em] text-[var(--day-heading)]"
          style={{
            fontSize: 'clamp(1.34rem, calc(1rem + 0.72vw), 1.92rem)',
            marginTop: 'clamp(0.75rem, 1.5vh, 1.2rem)',
          }}
        >
          {cred.title.join(' ')}
        </h3>

        <p
          className="m-0 font-normal leading-[1.5] tracking-[0.004em] text-[var(--day-muted)]"
          style={{
            fontFamily: 'var(--font-quote)',
            fontSize: 'var(--text-body)',
            marginTop: '0.5rem',
            maxWidth: '50ch',
          }}
        >
          {cred.subtitle}
        </p>

        <div className="flex flex-wrap gap-x-[0.9rem] gap-y-[0.3rem]" style={{ marginTop: 'clamp(0.75rem, 1.5vh, 1.2rem)' }}>
          {cred.signals.map((signal) => (
            <span
              key={signal}
              className="text-[var(--text-label)] font-light tracking-[0.16em] uppercase text-[var(--day-signal-text)] whitespace-nowrap"
            >
              [ {signal} ]
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
