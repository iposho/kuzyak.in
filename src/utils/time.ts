export function getTimeOfDay(): { icon: string; text: string } {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) {
    return { icon: '🌅', text: 'утром' };
  } else if (hour >= 12 && hour < 17) {
    return { icon: '☀️', text: 'днем' };
  } else if (hour >= 17 && hour < 21) {
    return { icon: '🌆', text: 'вечером' };
  } else {
    return { icon: '🌙', text: 'ночью' };
  }
}
