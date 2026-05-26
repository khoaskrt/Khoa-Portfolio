import certVbaOutstanding from '../../assets/images/cert-vba-outstanding.jpg';
import panelDiscussImage from '../../assets/images/panel_discuss.jpeg';
import money2020Image from '../../assets/images/money2020.JPG';
import saoKhueImage from '../../assets/images/ThuyetMinh_SaoKhue.jpg';

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
      title: ['Outstanding', 'Contribution'],
      subtitle: "VBA Ecosystem 2025 — Recognized for exceptional performance and meaningful contributions to the growth of the Vietnam Blockchain Association's ecosystem.",
    },
    {
      stamp: 'Frame · 02',
      image: panelDiscussImage,
      alt: 'Hong Kong Trust & Crypto Gateway — Panel Discussion',
      year: '2025',
      number: 'No. 02',
      title: ['Panel', 'Discussion'],
      subtitle: "Hong Kong Trust & Crypto Gateway — Representing Basal Pay at the Hong Kong Fiduciary Association event, exploring crypto regulatory frameworks and cross-border trust structures.",
    },
    {
      stamp: 'Frame · 03',
      image: money2020Image,
      alt: 'Money 20/20 Thailand — Fintech & Payments Summit',
      year: '2025',
      number: 'No. 03',
      title: ['Money 20/20', 'Thailand'],
      subtitle: "Money 20/20 Thailand — Fintech & Payments Summit — Attending Money 20/20 in Bangkok to build strategic partnerships and join private panel discussions on cross-border payment infrastructure and the role of stablecoin policy in global finance.",
    },
    {
      stamp: 'Frame · 04',
      image: saoKhueImage,
      alt: 'Sao Khuê 2026',
      year: '2026',
      number: 'No. 04',
      title: ['Sao Khuê', '2026'],
      subtitle: "Pitching Innovation, Winning Recognition — Presenting Basal Pay's crypto payment solution at Sao Khuê 2026 to the judging panel. Proud to announce that this pitch contributed to Basal Pay's achievement as one of the Top 5 Most Innovative Enterprises 2026, recognized by the prestigious Sao Khuê Award.",
    },
  ] satisfies MomentRecapFrame[],
} as const;
