const work02AlphatruePresenting = '/assets/images/work-02-alphatrue-presenting.jpg';
const basalPayImage = '/assets/images/basalpay.JPG';
const researchVbaImage = '/assets/images/research_VBA.jpeg';

export const workExperienceContent = {
  id: 'works',
  headerLabel: 'Work Experience',
  headline: ['Where', "I've", 'operated.'],
  chapters: [
    {
      num: '01',
      era: 'Q1·24',
      title: ['Web3', 'Research Lead'],
      company: 'Vietnam Blockchain Association',
      periodFrom: 'Q1/2024',
      periodTo: 'Q1/2025',
      operative: [
        'My first real step into the ecosystem came through VBA. As Web3 Research Lead, I led a team of 6 R&D interns, producing up to 30 articles a day on blockchain market trends, on-chain analytics, and industry deep dives.',
        'I wasn\'t just writing reports & articles — I was learning how to think in Web3. I had opportunity to work with Chaintracer to track cryptocurrency theft using on-chain data and developed the research frameworks that would later shape how I approach product and operations work.',
        'This is where I learned that in Web3, context is everything — and the people who understand the market deeply are the ones who build better products.',
      ],
      shift: '',
      keyPoints: [],
      image: { src: researchVbaImage, alt: 'VBA Research' },
      visual: {
        eyebrow: 'Research picture',
        caption: 'Signals condensed into operator-grade narratives for policy and ecosystem dialogue.',
        metrics: ['reports', 'ecosystem map', 'working groups'],
        nodes: ['Signals', 'Synthesis', 'Stakeholders'],
        showStage: false,
      },
      signals: [],
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
    {
      num: '02',
      era: 'Q3·24',
      title: ['Product Management', 'Specialist'],
      company: 'AlphaTrue',
      periodFrom: 'Q3/2024',
      periodTo: 'Q1/2025',
      operative: [
        'At AlphaTrue, I got my first real taste of what it means to own a product — not just contribute to it.',
        'I led the development of an NFT-based educational certificate platform, constantly bridging the gap between developers, designers, and stakeholders to ship something that actually worked. Beyond that, I supported over 5 blockchain projects that raised more than $12M USD, and grew communities on Telegram and Discord to over 10,000 members.',
        'But the biggest lesson wasn\'t in the numbers. It was the moment "Product-Market Fit" stopped being a term I\'d read about and became something I could feel — how the absence of it quietly kills momentum, and how chasing it reshapes everything. Shipping things that work, on time, with everyone aligned? That\'s the hard part.',
      ],
      shift: '',
      keyPoints: [],
      image: { src: work02AlphatruePresenting, alt: 'Khoa presenting market research at Vietnam Blockchain Association' },
      visual: {
        eyebrow: 'Planning picture',
        caption: 'Business intent translated into sequence, ownership, and release readiness.',
        metrics: ['0→1 scope', 'cross-pod', 'launch prep'],
        nodes: ['Intent', 'Roadmap', 'Delivery'],
      },
      signals: [],
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
      era: 'Q1·25',
      title: ['Operation', 'Manager'],
      company: 'Basal Pay by AlphaTrue',
      periodFrom: 'Q1/2025',
      periodTo: 'Today',
      operative: [
        'Basal Pay is the chapter I\'m most proud of.',
        'I joined alongside the CEO as one of the founding members — when it was still just a vision. We built from scratch, gained real traction, and hit milestones that put us on the international map. But moving fast taught us something uncomfortable: speed doesn\'t always mean direction.',
        'So we made a hard call — rebuild, the right way. We pivoted back to Vietnam and became the first to propose a licensed, regulated crypto model in the country. What followed were some of the most intense months of my career, pushing through every obstacle to secure Vietnam\'s first crypto sandbox license.',
        'Since then, I\'ve been working at the intersection of Product, Operations, Compliance, and Growth — wherever the bottleneck is. Basal Pay is where theory became practice, and where I learned what it truly means to build something that lasts.',
      ],
      shift: '',
      keyPoints: [],
      image: { src: basalPayImage, alt: 'Basal Pay operations' },
      visual: {
        eyebrow: 'Operating picture',
        caption: 'Treasury routes, controls, and escalation paths running as one live system.',
        metrics: ['24/7', '2 chains', 'live controls'],
        nodes: ['Treasury', 'Compliance', 'Partners'],
      },
      signals: [],
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
  ],
} as const;
