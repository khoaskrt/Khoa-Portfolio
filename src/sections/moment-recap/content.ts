import certVbaOutstanding from '../../assets/images/cert-vba-outstanding.jpg';
import panelDiscussImage from '../../assets/images/panel_discuss.jpeg';

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
      image: panelDiscussImage,
      alt: 'Hong Kong Trust & Crypto Gateway — Panel Discussion',
      year: '2024',
      number: 'No. 02',
      title: ['Panel', 'Discussion.'],
      subtitle: "Hong Kong Trust & Crypto Gateway — Representing Basal Pay at the Hong Kong Fiduciary Association event, exploring crypto regulatory frameworks and cross-border trust structures.",
    },

  ] satisfies MomentRecapFrame[],
} as const;
