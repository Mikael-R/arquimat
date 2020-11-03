const timeSince = (date: Date) => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = 0;

  interval = Math.floor(seconds / 31536000);
  if (interval > 1) return `${interval} anos atrás`;

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return `${interval} mêses atrás`;

  interval = Math.floor(seconds / 86400);
  if (interval > 1) return `${interval} dias atrás`;

  interval = Math.floor(seconds / 3600);
  if (interval > 1) return `${interval} horas atrás`;

  interval = Math.floor(seconds / 60);
  if (interval > 1) return `${interval} minutos atrás`;

  return `${Math.floor(seconds)} segundos atrás`;
};

export default timeSince;
