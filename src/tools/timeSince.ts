/* eslint-disable operator-linebreak */
type TMetric = 'anos' | 'mêses' | 'dias' | 'horas' | 'minutos' | 'segundos';

interface ITimeSince {
  (time: number | Date): string;
}

const timeSince: ITimeSince = (time) => {
  let metric: TMetric = 'segundos';
  let interval = 0;

  const seconds =
    typeof time === 'number'
      ? time
      : Math.floor((new Date().getTime() - time.getTime()) / 1000);

  interval = Math.floor(seconds / 31536000);
  if (interval > 1) metric = 'anos';

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) metric = 'mêses';

  interval = Math.floor(seconds / 86400);
  if (interval > 1) metric = 'dias';

  interval = Math.floor(seconds / 3600);
  if (interval > 1) metric = 'horas';

  interval = Math.floor(seconds / 60);
  if (interval > 1) metric = 'minutos';

  return `${interval} ${metric}`;
};

export default timeSince;
