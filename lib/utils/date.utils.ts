export const getRelativeDateLabel = (date: Date): string => {
  const now = new Date();

  const stripTime = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const today = stripTime(now);
  const target = stripTime(date);

  const diffInDays =
    Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Tomorrow";

  return date.toLocaleDateString().split('/').join('.');
};
