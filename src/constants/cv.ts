export interface IPosition {
  id: number;
  title: string;
  company: string;
  link: string;
  image: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

interface ILanguage {
  id: number;
  lang: string;
  level: string;
  emoji: string;
}

const CV_POSITIONS: IPosition[] = [
  {
    id: 1,
    title: 'Руководитель команды Web Core',
    company: 'Еаптека',
    link: 'https://eapteka.ru',
    image: '/cv/eapteka.webp',
    startDate: '01.02.2022',
    endDate: '01.04.2024',
    responsibilities: [
      'Создал, зафиксировал и внедрил стандарты разработки',
      'Спроектировал архитектуру будущих микрофронтендов',
      'Оптимизировал процессы и найм, с уклоном в прозрачность',
    ],
  },
  {
    id: 2,
    title: 'Лидер направления фронтенд',
    company: 'Еаптека',
    link: 'https://eapteka.ru',
    image: '/cv/eapteka.webp',
    startDate: '01.04.2021',
    endDate: '01.04.2024',
    responsibilities: [
      'Запустил процессы оценки производительности внутри направления фронтенда',
      'Придумал успешные коммуникационные инструменты между отделами',
      'Создал и внедрил программы обучения для разработчиков',
      'Увеличил количество фронтенд-разработчиков в команде с 1 до 15',
    ],
  },
  {
    id: 3,
    title: 'Ведущий фронтенд-разработчик',
    company: 'Еаптека',
    link: 'https://eapteka.ru',
    image: '/cv/eapteka.webp',
    startDate: '01.09.2019',
    endDate: '27.03.2021',
    responsibilities: [
      'Поддерживал и оптимизировал текущую кодовую базу',
      'Внедрил TypeScript, React и Redux, напрограммировал программу лояльности на этом стеке',
      'Помогал формировать команду фронтенда',
    ],
  },
  {
    id: 4,
    title: 'Фронтенд-разработчик',
    company: 'Gost Group',
    link: 'https://gost-group.com',
    image: '/cv/gost.webp',
    startDate: '01.09.2016',
    endDate: '31.08.2019',
    responsibilities: [
      'Разработка модулей для АПК «Безопасный город», повышение функциональности панели оператора на 20%',
      'Участвовал в разработке цифровой платформы для Российского Футбольного Союза с нуля,'
      + ' сделал и развивал разделы профиля и поиска',
      'Создавал коммерческие веб-сайты как фуллстэк-разработчик',
    ],
  },
  {
    id: 5,
    title: 'Начальник отдела технического обеспечения',
    company: 'ФГБОУ ДО ФЦДО',
    link: 'https://fedcdo.ru/',
    image: '/cv/fdebc.webp',
    startDate: '01.12.2014',
    endDate: '31.08.2016',
    responsibilities: [
      'Разработка и поддержка сайтов для детских конкурсов, '
      + 'за счет этого сроки обработки заявок и подведения итогов сократились на 66%',
      'Собрал команду из трех человек для обслуживания и развития интернет-проектов',
    ],
  },
];

const CV_LANGUAGES:ILanguage[] = [
  {
    id: 1,
    lang: 'Русский',
    level: 'C2',
    emoji: '🇷🇺',
  },
  {
    id: 2,
    lang: 'Английский',
    level: 'B2',
    emoji: '🇺🇸',
  },
];

export { CV_POSITIONS, CV_LANGUAGES };
