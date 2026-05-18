import { useEffect, useRef, useState } from 'react';
import { galleryContent } from './content';

export function GallerySection() {
  const reducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  return (
    <section
      id={galleryContent.id}
      className="relative isolate overflow-hidden border-t border-[oklch(0.85_0.01_255)] text-[oklch(0.19_0.01_255)]"
      style={{
        background: 'var(--day-surface)',
        paddingInline: 'var(--layout-padding)',
        paddingTop: 'clamp(5rem, 9vh, 8rem)',
        paddingBottom: 'clamp(6rem, 11vh, 10rem)',
        display: 'grid',
        gridTemplateColumns: 'var(--layout-cols)',
        columnGap: 'var(--layout-gap)',
        alignContent: 'start',
      }}
    >
      <header
        className="relative z-10 flex w-full items-center justify-between gap-4 text-[var(--text-meta)] font-light leading-none tracking-[0.24em] uppercase text-[oklch(0.48_0.01_255)]"
        style={{ gridColumn: 'var(--content-span)' }}
      >
        <p className="m-0">{galleryContent.headerLabel}</p>
        <p className="m-0" />
      </header>

      <div
        className="relative z-10 flex w-full flex-wrap items-end justify-between gap-x-8 gap-y-4"
        style={{ gridColumn: 'var(--content-span)', marginTop: 'clamp(2rem, 4.5vh, 3.5rem)' }}
      >
        <h2
          className="m-0 font-display font-bold leading-[0.88] tracking-[-0.04em] text-[oklch(0.11_0.01_255)]"
          style={{ fontSize: 'clamp(24px, 3vw, 44px)' }}
        >
          {galleryContent.headline[0]}<br />{galleryContent.headline[1]}
        </h2>
        <div className="flex items-center gap-[0.6rem] pb-2 text-[10px] font-light tracking-[0.2em] uppercase text-[oklch(0.5_0.01_255)]">
          <span>{galleryContent.leadMeta.count}</span>
          <span className="opacity-40" aria-hidden="true">·</span>
          <span>{galleryContent.leadMeta.range}</span>
        </div>
      </div>

      <div
        className="relative z-10 h-px w-full bg-[oklch(0.82_0.01_255)]"
        style={{ gridColumn: 'var(--content-span)', marginTop: 'clamp(1.5rem, 3vh, 2.5rem)' }}
        aria-hidden="true"
      />

      <div
        className="relative z-10 flex w-full flex-col"
        style={{
          gridColumn: 'var(--content-span)',
          marginTop: 'clamp(3rem, 6vh, 5rem)',
          gap: 'clamp(4.5rem, 11vh, 9.5rem)',
        }}
      >
        {galleryContent.frames.map((frame, index) => (
          <GalleryFrame
            key={frame.number}
            frame={frame}
            index={index}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>
    </section>
  );
}

type GalleryFrameProps = {
  key?: string;
  frame: (typeof galleryContent.frames)[number];
  index: number;
  reducedMotion: boolean;
};

function GalleryFrame({ frame, index, reducedMotion }: GalleryFrameProps) {
  const frameRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) return;
    const el = frameRef.current;
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
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reducedMotion]);

  return (
    <article
      ref={frameRef}
      className="gallery-frame group"
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
        gridTemplateRows: 'auto auto',
        columnGap: 'clamp(1.5rem, 4vw, 5.5rem)',
        rowGap: 0,
        opacity: reducedMotion ? 1 : isRevealed ? 1 : 0,
        transform: reducedMotion ? 'none' : isRevealed ? 'translateY(0)' : 'translateY(36px)',
        transition: `opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.06}s, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.06}s`,
      }}
    >
      {/* Media */}
      <div
        className="relative isolate overflow-hidden bg-[oklch(0.86_0.005_255)]"
        style={{ gridColumn: 1, gridRow: 1, aspectRatio: '1 / 1' }}
      >
        <div className="pointer-events-none absolute inset-0 z-2 border border-[oklch(0.06_0.012_253/0.05)]" />
        <span
          className="absolute z-3 font-sans text-[9px] font-normal tracking-[0.22em] uppercase text-[rgba(245,248,252,0.78)] mix-blend-difference whitespace-nowrap"
          style={{ top: 'clamp(0.7rem, 1.2vw, 1rem)', left: 'clamp(0.7rem, 1.2vw, 1rem)' }}
        >
          {frame.stamp}
        </span>
        {frame.image ? (
          <img
            src={frame.image}
            alt={frame.alt}
            className="gallery-frame-img absolute inset-0 block h-full w-full object-cover grayscale-[0.55] contrast-[1.04] brightness-[0.97]"
            style={{
              transform: 'scale(1.035)',
              transformOrigin: 'center center',
              transition: 'transform 1000ms cubic-bezier(0.16, 1, 0.3, 1), filter 600ms cubic-bezier(0.25, 1, 0.5, 1)',
              willChange: 'transform, filter',
            }}
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[var(--text-meta)] font-light tracking-[0.2em] uppercase text-[oklch(0.55_0.01_255)]">
            Open slot
          </div>
        )}
      </div>

      {/* Content */}
      <div
        className="flex flex-col self-end"
        style={{
          gridColumn: 2,
          gridRow: 1,
          gap: 'clamp(0.9rem, 2vh, 1.6rem)',
          paddingBottom: 'clamp(0.25rem, 0.8vh, 0.6rem)',
        }}
      >
        <p className="m-0 flex items-center gap-[0.6rem] font-sans text-[var(--text-meta)] font-light tracking-[0.26em] uppercase text-[oklch(0.48_0.01_255)]">
          <span>{frame.year}</span>
          <span className="h-px flex-1 bg-[oklch(0.82_0.01_255)]" style={{ maxWidth: 'clamp(40px, 6vw, 96px)' }} aria-hidden="true" />
          <span>{frame.number}</span>
        </p>
        <h3
          className="m-0 font-display font-bold leading-[0.88] tracking-[-0.035em] text-[oklch(0.12_0.01_255)]"
          style={{ fontSize: 'clamp(44px, 6.5vw, 104px)' }}
        >
          {frame.title[0]}<br />{frame.title[1]}
        </h3>
        <p
          className="m-0 max-w-[38ch] font-serif italic leading-[1.45] tracking-[0.004em] text-[oklch(0.34_0.01_255)]"
          style={{ fontSize: 'clamp(16px, 1.4vw, 20px)' }}
        >
          {frame.subtitle}
        </p>
      </div>

      {/* Meta table */}
      <dl
        className="grid border-t border-[oklch(0.82_0.01_255)]"
        style={{
          gridColumn: 1,
          gridRow: 2,
          marginTop: 'clamp(1.5rem, 3vh, 2.5rem)',
          gridTemplateColumns: 'minmax(110px, 1fr) minmax(0, 3fr)',
          columnGap: 'clamp(1rem, 2vw, 2rem)',
        }}
      >
        {frame.meta.map((item) => (
          <MetaRow key={item.label} item={item} />
        ))}
      </dl>
    </article>
  );
}

type MetaRowProps = {
  key?: string;
  item: { label: string; value: string; stamps?: string[]; tags?: string[] };
};

function MetaRow({ item }: MetaRowProps) {
  const cellStyle = {
    margin: 0,
    padding: 'clamp(0.85rem, 1.6vh, 1.1rem) 0',
    borderBottom: '1px solid oklch(0.82 0.01 255)',
    fontFamily: 'var(--font-sans)',
    fontWeight: 300,
    fontSize: 'clamp(11px, 0.9vw, 12.5px)',
    lineHeight: 1.45,
  };

  return (
    <>
      <dt style={{ ...cellStyle, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: 'oklch(0.5 0.01 255)' }}>
        {item.label}
      </dt>
      <dd style={{ ...cellStyle, color: 'oklch(0.22 0.01 255)', letterSpacing: '0.04em', display: 'flex', flexWrap: 'wrap' as const, gap: '0.3rem 1rem' }}>
        {item.tags?.map((tag) => (
          <span key={tag} className="text-[10px] font-light tracking-[0.16em] uppercase text-[oklch(0.42_0.01_255)] whitespace-nowrap">
            [ {tag} ]
          </span>
        ))}
        {item.stamps?.map((stamp) => (
          <span
            key={stamp}
            className="inline-flex items-center border border-[oklch(0.83_0.01_255)] bg-[oklch(0.91_0.005_255)] px-2 py-[0.18rem] text-[9px] font-normal tracking-[0.20em] uppercase text-[oklch(0.28_0.01_255)] whitespace-nowrap"
          >
            {stamp}
          </span>
        ))}
        {!item.tags && !item.stamps && item.value}
      </dd>
    </>
  );
}
