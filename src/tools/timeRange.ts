const timeRange = (seconds: number) => {
  let interval = 0;

  interval = Math.floor(seconds / 31536000);
  if (interval > 1) return `${interval} anos`;

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return `${interval} mêses`;

  interval = Math.floor(seconds / 86400);
  if (interval > 1) return `${interval} dias`;

  interval = Math.floor(seconds / 3600);
  if (interval > 1) return `${interval} horas`;

  interval = Math.floor(seconds / 60);
  if (interval > 1) return `${interval} minutos`;

  return `${Math.floor(seconds)} segundos`;
};

export default timeRange;
