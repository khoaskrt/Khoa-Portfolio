import workProductDevImg from '../../assets/images/work-product-dev.jpg';

export const workExperienceContent = {
  id: 'works',
  headerLabel: 'Work Experience',
  headline: ['Where', "I've", 'operated.'],
  chapters: [
    {
      num: '01',
      era: 'Q1·25',
      title: ['Operation', 'Manager'],
      company: 'Basal Pay by AlphaTrue',
      periodFrom: 'Q1/2025',
      periodTo: 'Today',
      operative: [
        'First operator on the ground — built the custody, compliance, and settlement backbone that keeps a live payment layer running 24/7.',
        'Owned the zero-to-one playbook: multi-chain treasury, partner orchestration, and the operational discipline a regulated fintech needs to scale without breaking trust.',
      ],
      shift: '',
      keyPoints: [
        'Architected multi-chain custody across BSC & Polygon — layered hot/cold wallet segregation eliminating single-point-of-failure under peak load.',
        'Standardized incident, reconciliation, and dispute playbooks; instituted SLOs that improved settlement consistency and audit readiness.',
        'Orchestrated PSP, KYC/AML, and banking partners alongside Tech, Compliance & Treasury squads across 24/7 operations.',
      ],
      visual: {
        eyebrow: 'Operating picture',
        caption: 'Treasury routes, controls, and escalation paths running as one live system.',
        metrics: ['24/7', '2 chains', 'live controls'],
        nodes: ['Treasury', 'Compliance', 'Partners'],
      },
      signals: ['Multi-chain custody', 'AML / KYC', '24/7 ops'],
      bullets: [
        'One of the first team members incubating Basal Pay — a strategic venture under AlphaTrue — contributing from zero-to-one across product, operations, and compliance foundations.',
        'Architected multi-chain custody framework across BSC and Polygon networks, implementing layered hot/cold wallet segregation and automated treasury rebalancing, eliminating single-point-of-failure under peak load.',
        'Monitored daily on-chain transaction flows via BscScan and PolygonScan; investigated and resolved stuck/pending transactions against defined resolution SLAs.',
        'Collaborated with Security and Compliance teams on high-risk transaction monitoring aligned to AML/KYC policies and FATF Travel Rule requirements.',
        'Standardized operational playbooks (incident response, reconciliation, dispute resolution) and instituted SLOs improving settlement consistency and audit readiness.',
        'Orchestrated external partners (PSPs: 9Pay, GPay, KYC/AML vendors, banking) and internal squads (Tech, Compliance, Treasury) across 24/7 operations.',
        'Built n8n automation workflows eliminating manual reconciliation — automated balance checks, transaction alerts, and dispute ticketing.',
      ],
      links: [
        { label: 'Basal Pay', href: 'https://basalpay.com' },
        { label: 'AlphaTrue', href: 'https://alphatrue.io' },
      ],
    },
    {
      num: '02',
      era: 'Q3·24',
      title: ['Product Dev', 'Executive'],
      company: 'AlphaTrue',
      periodFrom: 'Q3/2024',
      periodTo: 'Q1/2025',
      operative: [
        'Shaped the product bets that seeded AlphaTrue\'s fintech expansion — translating business ambition into scoped, sequenced delivery.',
        'Sat at the seam between business intent and engineering execution, keeping product tracks honest to scope, sequence, and the realities of a live market.',
      ],
      shift: '',
      keyPoints: [
        'Owned discovery-to-delivery workflows for selected product tracks — from problem definition through scoped release sequencing.',
        'Aligned business priorities with product scope and release sequencing across multiple cross-functional pods.',
        'Supported go-to-market coordination — sequencing launches with operations, compliance, and partner readiness.',
      ],
      image: { src: workProductDevImg, alt: 'Khoa presenting market research at Vietnam Blockchain Association' },
      visual: {
        eyebrow: 'Planning picture',
        caption: 'Business intent translated into sequence, ownership, and release readiness.',
        metrics: ['0→1 scope', 'cross-pod', 'launch prep'],
        nodes: ['Intent', 'Roadmap', 'Delivery'],
      },
      signals: ['Discovery → delivery', 'Go-to-market', 'Fintech product'],
      bullets: [
        'Owned discovery-to-delivery workflows for selected product tracks.',
        'Aligned business priorities with product scope and release sequencing.',
        'Supported go-to-market coordination across cross-functional teams.',
      ],
      links: [
        { label: 'AlphaTrue', href: 'https://alphatrue.io' },
        { label: 'Product Portfolio', href: 'https://www.linkedin.com' },
      ],
    },
    {
      num: '03',
      era: 'Q1·24',
      title: ['Web3', 'Research Lead'],
      company: 'Vietnam Blockchain Association',
      periodFrom: 'Q1/2024',
      periodTo: 'Q1/2025',
      operative: [
        'Turned Vietnam\'s fragmented Web3 signals into policy-grade intelligence that moved multi-stakeholder conversations forward.',
        'Sat between operators, regulators, and ecosystem builders — translating ground-truth into reports that practitioners and policymakers could actually act on.',
      ],
      shift: '',
      keyPoints: [
        'Built strategic reports used in multi-stakeholder working sessions across regulators, operators, and ecosystem builders.',
        'Translated fragmented ecosystem signals into actionable fintech and policy intelligence for Vietnam\'s Web3 landscape.',
        'Coordinated domain experts, operators, and policy-side partners across long-running research cycles.',
      ],
      visual: {
        eyebrow: 'Research picture',
        caption: 'Signals condensed into operator-grade narratives for policy and ecosystem dialogue.',
        metrics: ['reports', 'ecosystem map', 'working groups'],
        nodes: ['Signals', 'Synthesis', 'Stakeholders'],
      },
      signals: ['Ecosystem mapping', 'Policy research', 'Web3 Vietnam'],
      bullets: [
        'Built strategic reports used in multi-stakeholder working sessions.',
        'Translated fragmented ecosystem signals into actionable fintech insights.',
        'Coordinated domain experts, operators, and policy-side partners.',
      ],
      links: [
        { label: 'VBA', href: 'https://vba.org.vn' },
        { label: 'Research Notes', href: 'https://www.linkedin.com' },
      ],
    },
  ],
} as const;
