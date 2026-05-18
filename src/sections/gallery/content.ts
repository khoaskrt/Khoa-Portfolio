import heroPortrait from '../../assets/images/hero-portrait.jpg';
import aboutImage from '../../assets/images/aboutus_image.JPG';
import certUdemyDex from '../../assets/images/cert-udemy-dex.jpg';

export type GalleryFrame = {
  stamp: string;
  image: string | null;
  alt: string;
  year: string;
  number: string;
  title: string[];
  subtitle: string;
  meta: { label: string; value: string; stamps?: string[]; tags?: string[] }[];
};

export const galleryContent = {
  id: 'gallery',
  headerLabel: 'GALLERY',
  headline: ['In', 'frame.'],
  leadMeta: {
    count: '4 FRAMES',
    range: 'Case · No. 01 – No. 04',
  },
  frames: [
    {
      stamp: 'Frame · 01',
      image: heroPortrait,
      alt: 'Khoa — professional portrait',
      year: '2026',
      number: 'No. 01',
      title: ['The', 'Operator.'],
      subtitle: 'Identity, fixed at first frame — the brief, before the work.',
      meta: [
        { label: 'Overview', value: 'A portrait taken for the record. Black-and-white, fixed eye-line, no props — the operator stamp before the dossier opens.' },
        { label: 'Tags', value: '', tags: ['Portrait', 'Identity', 'Black & White'] },
        { label: 'Frame', value: 'Editorial portrait · 35mm' },
        { label: 'Location', value: '', stamps: ['Ho Chi Minh City'] },
      ],
    },
    {
      stamp: 'Frame · 02',
      image: aboutImage,
      alt: 'Khoa at his desk overlooking the city skyline',
      year: '2025',
      number: 'No. 02',
      title: ['Command', 'Desk.'],
      subtitle: "Where the day's calls get made — quiet floor, fast clock, view of the river.",
      meta: [
        { label: 'Overview', value: 'Standard working setup, photographed mid-afternoon. The desk is where custody decisions, settlement checks, and partner calls happen — the live wire of the operation.' },
        { label: 'Tags', value: '', tags: ['Operations', 'Daily', 'Workspace'] },
        { label: 'Frame', value: 'Documentary · ambient light' },
        { label: 'Location', value: '', stamps: ['D1 Financial Quarter'] },
      ],
    },
    {
      stamp: 'Frame · 03',
      image: certUdemyDex,
      alt: 'DeFi and DEX Mastery certificate — Udemy 2024',
      year: 'May 2024',
      number: 'No. 03',
      title: ['DeFi', 'Mastery.'],
      subtitle: 'Late-night syllabus — the credential that closed the gap between operator and protocol.',
      meta: [
        { label: 'Overview', value: 'Completed certificate covering DEX architecture, AMM mechanics, liquidity routing, and on-chain settlement. Filed as part of the working knowledge needed to run a custody-grade payment layer.' },
        { label: 'Tags', value: '', tags: ['Blockchain', 'Certificate', 'Self-study'] },
        { label: 'Frame', value: 'Document · scan' },
        { label: 'Issuer', value: '', stamps: ['Udemy'] },
      ],
    },
    {
      stamp: 'Frame · 04 — pending',
      image: null,
      alt: 'Pending gallery slot',
      year: '—',
      number: 'No. 04',
      title: ['Next', 'Frame.'],
      subtitle: 'Reserved for the next milestone — a frame not yet earned.',
      meta: [
        { label: 'Overview', value: 'A placeholder for the next chapter. When the work is done, the frame fills itself.' },
        { label: 'Tags', value: '', tags: ['Upcoming', 'Reserved'] },
        { label: 'Frame', value: 'Pending · TBD' },
        { label: 'Status', value: '', stamps: ['Coming soon'] },
      ],
    },
  ] satisfies GalleryFrame[],
} as const;
