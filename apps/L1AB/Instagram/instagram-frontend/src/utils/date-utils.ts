export const timeAgoCompact = (date: Date) => {
  const now = new Date();
  const diffInMilliseconds = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

  if (diffInDays > 0) {
    return `${diffInDays}d`;
  }
  if (diffInHours > 0) {
    return `${diffInHours}h`;
  }
  if (diffInMinutes > 0) {
    return `${diffInMinutes}m`;
  }
  return 'just now';
};
