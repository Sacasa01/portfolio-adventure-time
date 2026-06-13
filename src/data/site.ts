export const SITE = {
  name: 'Santiago Castro Salt',
  email: 'santiagocsdev@gmail.com',
  phone: '+34 654 763 788',
  location: 'Valencia, Spain',
  linkedin: 'https://linkedin.com/in/santiago-castro-salt',
  github: 'https://github.com/santiagocastrosalt',
  url: 'https://santiagocastrosalt.github.io',
  description:
    'Full-stack web developer & final-year CS student specialising in AI-driven apps, backend engineering and cloud infrastructure.',
  // Get a free key at https://web3forms.com - the ONLY external config needed.
  web3formsKey: 'WEB3FORMS-ACCESS-KEY-GOES-HERE',
};

export interface Project {
  id: 'fitforge' | 'llm';
  title: string;
  tech: string[];
  links: { label: string; href: string }[];
}

export const PROJECTS: Project[] = [
  {
    id: 'fitforge',
    title: 'FitForge',
    tech: ['PHP 8.2', 'Symfony 7', 'Angular', 'MySQL', 'Docker', 'JWT'],
    links: [{ label: 'GitHub', href: 'https://github.com/santiagocastrosalt/fitforge' }],
  },
  {
    id: 'llm',
    title: 'Legacy Land Mapper',
    tech: ['Python 3', 'Pandas', 'Leaflet.js', 'GeoJSON', 'Multithreading'],
    links: [{ label: 'GitHub', href: 'https://github.com/santiagocastrosalt/legacy-land-mapper' }],
  },
];

export interface SkillGroup {
  key: 'frontend' | 'backend' | 'ai' | 'tools';
  skills: { name: string; level: number }[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    key: 'frontend',
    skills: [
      { name: 'JavaScript', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'Angular', level: 85 },
      { name: 'HTML/CSS', level: 90 },
    ],
  },
  {
    key: 'backend',
    skills: [
      { name: 'PHP / Symfony', level: 88 },
      { name: 'Python / FastAPI', level: 85 },
      { name: 'Node.js', level: 75 },
      { name: 'SQL (MySQL/PostgreSQL)', level: 85 },
      { name: 'Java', level: 70 },
    ],
  },
  {
    key: 'ai',
    skills: [
      { name: 'PyTorch', level: 80 },
      { name: 'MONAI / NVIDIA Clara', level: 75 },
      { name: 'TensorFlow', level: 70 },
      { name: 'scikit-learn', level: 75 },
    ],
  },
  {
    key: 'tools',
    skills: [
      { name: 'AWS', level: 80 },
      { name: 'Docker', level: 85 },
      { name: 'Git', level: 90 },
      { name: 'REST API Design', level: 90 },
    ],
  },
];

// Constellation graph: normalized positions (0..1) + edges between related techs.
export const CONSTELLATION = {
  nodes: [
    { id: 'ts', label: 'TypeScript', x: 0.12, y: 0.25, g: 'frontend' },
    { id: 'angular', label: 'Angular', x: 0.25, y: 0.45, g: 'frontend' },
    { id: 'js', label: 'JavaScript', x: 0.18, y: 0.72, g: 'frontend' },
    { id: 'php', label: 'PHP', x: 0.42, y: 0.18, g: 'backend' },
    { id: 'symfony', label: 'Symfony', x: 0.5, y: 0.4, g: 'backend' },
    { id: 'mysql', label: 'MySQL', x: 0.42, y: 0.68, g: 'backend' },
    { id: 'python', label: 'Python', x: 0.65, y: 0.22, g: 'ai' },
    { id: 'fastapi', label: 'FastAPI', x: 0.62, y: 0.55, g: 'backend' },
    { id: 'pytorch', label: 'PyTorch', x: 0.8, y: 0.35, g: 'ai' },
    { id: 'monai', label: 'MONAI', x: 0.9, y: 0.18, g: 'ai' },
    { id: 'tf', label: 'TensorFlow', x: 0.88, y: 0.58, g: 'ai' },
    { id: 'aws', label: 'AWS', x: 0.74, y: 0.78, g: 'tools' },
    { id: 'docker', label: 'Docker', x: 0.55, y: 0.85, g: 'tools' },
    { id: 'git', label: 'Git', x: 0.32, y: 0.88, g: 'tools' },
  ],
  edges: [
    ['ts', 'angular'], ['js', 'angular'], ['ts', 'js'], ['angular', 'symfony'],
    ['php', 'symfony'], ['symfony', 'mysql'], ['symfony', 'docker'],
    ['python', 'fastapi'], ['python', 'pytorch'], ['pytorch', 'monai'],
    ['python', 'tf'], ['tf', 'aws'], ['fastapi', 'docker'], ['docker', 'aws'],
    ['mysql', 'docker'], ['git', 'docker'], ['js', 'git'], ['fastapi', 'pytorch'],
  ] as [string, string][],
};
