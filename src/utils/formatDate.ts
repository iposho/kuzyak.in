const months = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

export const formatDate = (date: Date): string => {
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `Обновлено ${day} ${month} ${year} года`;
};
