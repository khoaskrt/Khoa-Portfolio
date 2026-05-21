import certVbaOutstanding from '../../assets/images/cert-vba-outstanding.jpg';
import heroPortrait from '../../assets/images/hero-portrait.jpg';
import aboutImage from '../../assets/images/aboutus_image.JPG';
import certUdemyDex from '../../assets/images/cert-udemy-dex.jpg';

export type MomentRecapFrame = {
  stamp: string;
  image: string | null;
  alt: string;
  year: string;
  number: string;
  title: string[];
  subtitle: string;
};

export const momentRecapContent = {
  id: 'moment-recap',
  headerLabel: 'MOMENT RECAP',
  headline: 'In frame.',
  frames: [
    {
      stamp: 'Frame · 01',
      image: certVbaOutstanding,
      alt: 'Outstanding Contribution Award — VBA Ecosystem 2025',
      year: '2025',
      number: 'No. 01',
      title: ['Outstanding', 'Contribution.'],
      subtitle: "VBA Ecosystem 2025 — Recognized for exceptional performance and meaningful contributions to the growth of the Vietnam Blockchain Association's ecosystem.",
    },
    {
      stamp: 'Frame · 02',
      image: aboutImage,
      alt: 'Khoa at his desk overlooking the city skyline',
      year: '2025',
      number: 'No. 02',
      title: ['Command', 'Desk.'],
      subtitle: "Where the day's calls get made — quiet floor, fast clock, view of the river.",
    },
    {
      stamp: 'Frame · 03',
      image: certUdemyDex,
      alt: 'DeFi and DEX Mastery certificate — Udemy 2024',
      year: 'May 2024',
      number: 'No. 03',
      title: ['DeFi', 'Mastery.'],
      subtitle: 'Late-night syllabus — the credential that closed the gap between operator and protocol.',
    },
    {
      stamp: 'Frame · 04 — pending',
      image: null,
      alt: 'Pending slot',
      year: '—',
      number: 'No. 04',
      title: ['Next', 'Frame.'],
      subtitle: 'Reserved for the next milestone — a frame not yet earned.',
    },
  ] satisfies MomentRecapFrame[],
} as const;
