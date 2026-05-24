import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { selectedProjectsContent } from './content';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

export function SelectedProjectsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const titlesContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const leftColRef = useRef<HTMLDivElement>(null);
  const detailsRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [isMobile, setIsMobile] = useState(false);
  const liveDate = useLiveDate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    
    const ctx = gsap.context(() => {
      const titles = gsap.utils.toArray<HTMLElement>('.kinetic-title-wrapper');
      
      titles.forEach((title, i) => {
        gsap.timeline({
          scrollTrigger: {
            trigger: title,
            start: "top 55%",
            end: "bottom 45%",
            scrub: true,
            onEnter: () => setActiveIndex(i),
            onEnterBack: () => setActiveIndex(i),
          }
        })
        .fromTo(title, { scale: 0.95, opacity: 0.25 }, { scale: 1, opacity: 1, duration: 1, ease: 'power1.inOut' })
        .to(title, { scale: 0.95, opacity: 0.25, duration: 1, ease: 'power1.inOut' });
      });
      
    }, containerRef);
    
    return () => ctx.revert();
  }, [isMobile, selectedProjectsContent.projects.length]);

  useEffect(() => {
    if (isMobile) return;
    
    const ctx = gsap.context(() => {
      detailsRefs.current.forEach((el, i) => {
        if (!el) return;
        if (i === activeIndex) {
          gsap.to(el, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', zIndex: 10, pointerEvents: 'auto' });
        } else {
          gsap.to(el, { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out', zIndex: 0, pointerEvents: 'none' });
        }
      });
    }, leftColRef);
    
    return () => ctx.revert();
  }, [activeIndex, isMobile, selectedProjectsContent.projects.length]);

  return (
    <section
      ref={containerRef}
      id={selectedProjectsContent.id}
      className="selected-projects-section relative w-full flex flex-col text-[var(--frost-text)]"
      style={{ background: 'var(--night-base)' }}
    >
      {/* Section Header */}
      <header
        className="relative z-10 flex w-full items-center justify-between gap-4 text-[length:var(--text-meta)] font-light leading-none tracking-[0.24em] uppercase text-[var(--frost-dim)] px-[var(--layout-padding)]"
        style={{ paddingTop: 'clamp(7rem, 12vh, 10rem)' }}
      >
        <p className="m-0">{selectedProjectsContent.headerLabel}</p>
        <p className="m-0">{liveDate}</p>
      </header>

      <div
        className="relative z-10 flex w-full flex-wrap items-end justify-between gap-x-8 gap-y-4 px-[var(--layout-padding)]"
        style={{ marginTop: 'clamp(2rem, 4.5vh, 3.5rem)' }}
      >
        <h2
          className="m-0 font-display font-bold leading-[0.88] tracking-[-0.04em] text-[var(--frost-text)]"
          style={{ fontSize: 'var(--text-display)' }}
        >
          {selectedProjectsContent.headline.map((line, idx, arr) => (
            <React.Fragment key={idx}>
              {line}
              {idx < arr.length - 1 && <br />}
            </React.Fragment>
          ))}
        </h2>
        <div className="flex items-center gap-[0.6rem] pb-2 text-[length:var(--text-label)] font-light tracking-[0.2em] uppercase text-[var(--frost-dim)]">
          <span>{selectedProjectsContent.projects.length} PROJECTS</span>
          <span className="opacity-40" aria-hidden="true">·</span>
          <span>2023 — 2025</span>
        </div>
      </div>

      <div className="w-full px-[var(--layout-padding)]">
        <div
          className="relative z-10 h-px w-full bg-[var(--border-frost-soft)]"
          style={{ marginTop: 'clamp(1.5rem, 3vh, 2.5rem)', marginBottom: 'clamp(3rem, 6vh, 6rem)' }}
          aria-hidden="true"
        />
      </div>

      {/* Desktop Layout */}
      {!isMobile && (
        <div className="flex w-full items-start relative mt-[15vh]">
          {/* Left Column (Sticky Details) */}
          <div className="w-[60%] sticky top-[10vh] h-[70vh] flex flex-col pl-[var(--layout-padding)] pr-12 md:pr-24" ref={leftColRef}>
            <div className="relative w-full h-full max-h-[800px]">
              {/* Smooth fading year numbers independent of the card's jump animation */}
              {selectedProjectsContent.projects.map((project, i) => (
                <span 
                  key={`year-${i}`}
                  className={`absolute -right-8 md:-right-16 top-1/2 -translate-y-1/2 text-sm font-mono tracking-widest text-[var(--frost-dim)] z-20 tabular-nums transition-opacity duration-700 ease-out ${i === activeIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                  {project.year}
                </span>
              ))}

              {selectedProjectsContent.projects.map((project, i) => (
                <div 
                  key={i} 
                  ref={el => detailsRefs.current[i] = el}
                  className="absolute inset-0 flex flex-col opacity-0 pointer-events-none"
                  style={{ transform: 'translateY(20px)' }}
                >
                  <div className="relative bg-[var(--night-deep)]" style={{ height: 'clamp(300px, 50vh, 550px)', aspectRatio: '2/3' }}>
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.alt} 
                        className="absolute inset-0 block h-full w-full object-cover grayscale-[5%] contrast-[1.05]"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center border border-[var(--border-frost-soft)]">
                        <span className="font-sans font-light leading-[1.2] tracking-[0.2em] text-[length:var(--text-label)] uppercase text-[var(--frost-dim)]">Image Placeholder</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-0 mt-8">
                    <div className="flex border-t border-[var(--border-frost-soft)] pt-4 pb-4">
                      <div className="w-[30%] font-sans font-light leading-[1.2] tracking-[0.2em] text-[length:var(--text-label)] uppercase text-[var(--frost-dim)] mt-1">Overview</div>
                      <div className="w-[70%] font-sans font-normal text-[length:var(--text-body)] leading-[1.5] text-[var(--frost-text)] pr-4">
                        {project.overview}
                      </div>
                    </div>
                    <div className="flex border-t border-[var(--border-frost-soft)] pt-4 pb-4">
                      <div className="w-[30%] font-sans font-light leading-[1.2] tracking-[0.2em] text-[length:var(--text-label)] uppercase text-[var(--frost-dim)] mt-1">Tags</div>
                      <div className="w-[70%] flex flex-wrap gap-x-4 gap-y-2 pr-4">
                        {project.tags.map(tag => (
                          <span key={tag} className="font-sans font-normal text-[length:var(--text-body)] leading-[1.5] text-[var(--frost-text)]">{tag}</span>
                        ))}
                        {project.industry.map(ind => (
                          <span key={ind} className="font-sans font-normal text-[length:var(--text-body)] leading-[1.5] text-[var(--frost-text)]">{ind}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column (Scrolling Titles) */}
          <div className="w-[40%] flex flex-col items-start gap-[15vh] pt-[35vh] pb-[50vh]" ref={titlesContainerRef}>
            {selectedProjectsContent.projects.map((project, i) => (
              <div 
                key={i} 
                className="kinetic-title-wrapper w-full flex items-center pr-[var(--layout-padding)] cursor-pointer origin-left py-8 md:py-12"
              >
                <h2 className="m-0 font-display font-medium leading-[0.88] tracking-[-0.02em] flex flex-col" style={{ fontSize: 'clamp(3rem, 5.8vw, 6rem)' }}>
                  {project.title}
                  <span className="block font-medium mt-4 tracking-[-0.02em] leading-[1.1] text-[length:var(--text-quote)] opacity-70">
                    {project.subtitle}
                  </span>
                </h2>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Layout (Fallback) */}
      {isMobile && (
        <div className="flex flex-col gap-[clamp(8rem,15vh,12rem)] px-[var(--layout-padding)] pb-[clamp(8rem,15vh,12rem)]">
          {selectedProjectsContent.projects.map((project, i) => (
            <MobileProjectCard key={i} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}

function MobileProjectCard({ project }: { project: typeof selectedProjectsContent.projects[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const els = [mediaRef.current, titleRef.current, tableRef.current].filter(Boolean) as HTMLElement[];
    gsap.set(els, { opacity: 0, y: 30 });

    const st = ScrollTrigger.create({
      trigger: card,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
        });
      },
      once: true,
    });

    return () => { st.kill(); };
  }, []);

  return (
    <div ref={cardRef} className="flex flex-col gap-8">
      <div className="flex flex-col justify-center">
        <div className="mb-4 font-sans font-light leading-[1.2] tracking-[0.2em] text-[length:var(--text-label)] uppercase text-[var(--frost-dim)] tabular-nums">
          {project.year}
        </div>
        <h2 
          ref={titleRef}
          className="m-0 font-display font-medium leading-[0.88] tracking-[-0.02em] text-balance"
          style={{ fontSize: 'clamp(3rem, 5.8vw, 6rem)' }}
        >
          {project.title}
          <span className="block font-medium mt-3 tracking-[-0.02em] leading-[1.1] text-[length:var(--text-quote)] opacity-70">
            {project.subtitle}
          </span>
        </h2>
      </div>

      <div 
        ref={mediaRef}
        className="w-[85%] sm:w-[60%] max-w-[400px] mx-auto relative bg-[var(--night-deep)]"
        style={{ aspectRatio: '2/3' }}
      >
        {project.image ? (
          <img 
            src={project.image} 
            alt={project.alt} 
            className="absolute inset-0 block h-full w-full object-cover grayscale-[5%] contrast-[1.05]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center border border-[var(--border-frost-soft)]">
            <span className="font-sans font-light leading-[1.2] tracking-[0.2em] text-[length:var(--text-label)] uppercase text-[var(--frost-dim)]">Image Placeholder</span>
          </div>
        )}
      </div>

      <div ref={tableRef} className="flex flex-col gap-0 mt-2">
        <div className="flex flex-col border-t border-[var(--border-frost-soft)] pt-4 pb-4">
          <div className="font-sans font-light leading-[1.2] tracking-[0.2em] text-[length:var(--text-label)] uppercase text-[var(--frost-dim)] mb-2">Overview</div>
          <div className="font-sans font-normal text-[length:var(--text-body)] leading-[1.5] text-[var(--frost-text)]">
            {project.overview}
          </div>
        </div>
        <div className="flex flex-col border-t border-[var(--border-frost-soft)] pt-4 pb-4">
          <div className="font-sans font-light leading-[1.2] tracking-[0.2em] text-[length:var(--text-label)] uppercase text-[var(--frost-dim)] mb-2">Tags</div>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {project.tags.map(tag => (
              <span key={tag} className="font-sans font-normal text-[length:var(--text-body)] leading-[1.5] text-[var(--frost-text)]">{tag}</span>
            ))}
            {project.industry.map(ind => (
              <span key={ind} className="font-sans font-normal text-[length:var(--text-body)] leading-[1.5] text-[var(--frost-text)]">{ind}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function useLiveDate(): string {
  const [date, setDate] = useState('');
  useEffect(() => {
    try {
      const language = document.documentElement.lang || undefined;
      const fmt = new Intl.DateTimeFormat(language, { month: 'short', year: 'numeric' });
      const parts = fmt.formatToParts(new Date());
      const month = parts.find((p) => p.type === 'month')?.value ?? '';
      const year = parts.find((p) => p.type === 'year')?.value ?? '';
      setDate(month && year ? `${month}/${year}` : fmt.format(new Date()));
    } catch {
      setDate('');
    }
  }, []);
  return date;
}
