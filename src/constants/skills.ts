export interface ISkills {
  id: number
  name: string
}

export const SKILLS:ISkills[] = [
  {
    id: 1,
    name: 'HTML',
  },
  {
    id: 2,
    name: 'CSS',
  },
  {
    id: 3,
    name: 'TypeScript',
  },
  {
    id: 4,
    name: 'JavaScript',
  },
  {
    id: 5,
    name: 'React',
  },
  {
    id: 6,
    name: 'Redux',
  },
  {
    id: 7,
    name: 'Node.js',
  },
  {
    id: 8,
    name: 'NextJS',
  },
  {
    id: 9,
    name: 'GraphQL',
  },
  {
    id: 10,
    name: 'Webpack',
  },
  {
    id: 11,
    name: 'Vite',
  },
  {
    id: 12,
    name: 'Tailwind CSS',
  },
  {
    id: 13,
    name: 'SASS',
  },
  {
    id: 14,
    name: 'PostCSS',
  },
  {
    id: 15,
    name: 'Git',
  },
  {
    id: 16,
    name: 'Vercel',
  },
  {
    id: 17,
    name: 'NPM',
  },
  {
    id: 18,
    name: 'Netlify',
  },
];

export const SKILLS_STRING:string = SKILLS.map((i) => i.name).toString();
