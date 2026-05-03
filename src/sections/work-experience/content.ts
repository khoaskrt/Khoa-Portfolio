import aboutImage from '../../assets/images/aboutus_image.JPG';
import heroPortraitJpg from '../../assets/images/hero-portrait.jpg';
import heroPortraitPng from '../../assets/images/hero-portrait.png';

export const workExperienceContent = {
  id: 'work-experience',
  topLabel: 'WORK EXPERIENCE',
  headline: ['Where', "I've worked."],
  summary:
    'A yearly snapshot of my operator journey across research, product, and fintech execution.',
  roles: [
    {
      years: 'Q1/2025 - Today',
      quarter: 'Q1 2025 to Present',
      title: 'BizOps Manager',
      company: 'Basal Pay by AlphaTrue',
      blurb: 'Driving business operations and scalable execution for payment growth.',
      details: [
        'One of the first team members incubating Basal Pay, a strategic venture under AlphaTrue, contributed from zero-to-one across product, operations, and compliance foundations.',
        'Architected multi-chain custody framework across BSC and Polygon networks, implementing layered hot/cold wallet segregation and automated treasury rebalancing, eliminating single-point-of-failure and improving withdrawal reliability under peak load.',
        'Monitored daily on-chain transaction flows using BscScan and PolygonScan, investigated and resolved stuck/pending transactions, ensuring timely deposit and withdrawal processing with defined resolution SLAs.',
        'Collaborated with Security and Compliance teams to monitor internal alerts for high-risk transactions, implemented reactive and preventive measures aligned with AML/KYC policies and FATF Travel Rule requirements.',
        'Standardized operational playbooks (incident response, reconciliation, dispute resolution) and instituted performance SLOs, improving on-time settlement consistency and audit readiness.',
        'Orchestrated external partners (PSPs: 9Pay, GPay, KYC/AML vendors, banking partners) and internal squads (Tech, Compliance, Treasury) to maintain service reliability across 24/7 operations.',
        'Built n8n automation workflows to eliminate manual reconciliation tasks including automated balance checks, transaction status alerts, and dispute ticketing, improving operational efficiency.',
      ],
      images: [heroPortraitPng, heroPortraitJpg],
      links: [
        { label: 'Basal Pay', href: 'https://basalpay.com' },
        { label: 'AlphaTrue', href: 'https://alphatrue.io' },
      ],
    },
    {
      years: 'Q3/2024 - Q1/2025',
      quarter: 'Q3 2024 to Q1 2025',
      title: 'Product Development Executive',
      company: 'AlphaTrue',
      blurb: 'Shaped early product bets and execution plans for fintech-related growth lanes.',
      details: [
        'Owned discovery-to-delivery workflows for selected product tracks.',
        'Aligned business priorities with product scope and release sequencing.',
        'Supported go-to-market coordination across cross-functional teams.',
      ],
      images: [heroPortraitJpg],
      links: [
        { label: 'AlphaTrue', href: 'https://alphatrue.io' },
        { label: 'Product Portfolio', href: 'https://www.linkedin.com' },
      ],
    },
    {
      years: 'Q1/2024 - Q1/2025',
      quarter: 'Q1 2024 to Q1 2025',
      title: 'Web3 Research Lead',
      company: 'Vietnam Blockchain Association',
      blurb: 'Led policy-focused market research and ecosystem mapping for Vietnam Web3 initiatives.',
      details: [
        'Built strategic reports used in multi-stakeholder working sessions.',
        'Translated fragmented ecosystem signals into actionable fintech insights.',
        'Coordinated domain experts, operators, and policy-side partners.',
      ],
      images: [aboutImage, heroPortraitJpg, heroPortraitPng],
      links: [
        { label: 'VBA', href: 'https://vba.org.vn' },
        { label: 'Research Notes', href: 'https://www.linkedin.com' },
      ],
    },
  ],
} as const;
