import certUdemyDex from '../../assets/images/cert-udemy-dex.jpg';

export type Credential = {
  era: string;
  image: string | null;
  issuer: string;
  date: string;
  title: string[];
  subtitle: string;
  signals: string[];
};

export const credentialsContent = {
  id: 'credentials',
  headerLabel: 'ACHIEVEMENT',
  headline: ["What I've", 'earned.'],
  dateRange: '2024 — 2025',
  credentials: [
    {
      era: '2024',
      image: certUdemyDex,
      issuer: 'Udemy',
      date: 'May 2024',
      title: ['DeFi & DEX', 'Mastery'],
      subtitle: 'Build Your Own DEX · Qite Block · 6 hrs',
      signals: ['DeFi', 'Uniswap', 'Blockchain'],
    },
    {
      era: '2025',
      image: null,
      issuer: 'Coursera · Google',
      date: '2025',
      title: ['Project', 'Management'],
      subtitle: 'Google Project Management Professional Certificate',
      signals: ['Agile', 'Scrum', 'PM'],
    },
    {
      era: '2024',
      image: null,
      issuer: 'ETS · TOEIC',
      date: '2024',
      title: ['TOEIC', 'English'],
      subtitle: 'Test of English for International Communication',
      signals: ['English', 'Language'],
    },
  ] satisfies Credential[],
} as const;
