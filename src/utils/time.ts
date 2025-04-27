type TimeOfDay = {
  icon: string;
  text: string;
};

export const getTimeOfDay = (date: Date): TimeOfDay => {
  const hours = date.getHours();

  if (hours >= 5 && hours < 12) {
    return {
      icon: '🌅',
      text: 'утром',
    };
  }

  if (hours >= 12 && hours < 17) {
    return {
      icon: '☀️',
      text: 'днём',
    };
  }

  if (hours >= 17 && hours < 22) {
    return {
      icon: '🌆',
      text: 'вечером',
    };
  }

  return {
    icon: '🌘',
    text: 'ночью',
  };
};
