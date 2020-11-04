/* eslint-disable operator-linebreak */
interface ITimeSince {
  (time: number | Date): string;
}

const timeSince: ITimeSince = (time) => {
  const seconds =
    typeof time === 'number'
      ? time
      : Math.floor((new Date().getTime() - time.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) return `${interval} anos`;

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return `${interval} mêses`;

  interval = Math.floor(seconds / 86400);
  if (interval > 1) return `${interval} dias`;

  interval = Math.floor(seconds / 3600);
  if (interval > 1) return `${interval} horas`;

  interval = Math.floor(seconds / 60);
  if (interval > 1) return `${interval} minutos`;

  return `${seconds} segundos`;
};

export default timeSince;
