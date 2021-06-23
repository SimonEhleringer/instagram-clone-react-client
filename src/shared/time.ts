// TODO: convert utc to my time

export const calculateDisplayTime = (date: Date) => {
  const now = new Date();
  const nowAsMilliseconds = Date.parse(now.toUTCString());
  // const nowAsMilliseconds = Date.UTC(
  //   now.getUTCFullYear(),
  //   now.getUTCMonth(),
  //   now.getUTCDate(),
  //   now.getUTCHours(),
  //   now.getUTCMinutes(),
  //   now.getUTCSeconds(),
  //   now.getUTCMilliseconds()
  // );

  const dateAsMilliseconds = new Date(date).getTime();

  const minutesDiff = Math.floor(
    (nowAsMilliseconds - dateAsMilliseconds) / 60000
  );

  const hoursDiff = Math.floor(minutesDiff / 60);

  const daysDiff = Math.floor(hoursDiff / 24);

  const weeksDiff = Math.floor(daysDiff / 7);

  const yearsDiff = now.getFullYear() - new Date(date).getFullYear();

  const monthsDiff =
    yearsDiff * 12 + (new Date(date).getMonth() - now.getMonth());

  const diffs: Diff[] = [
    { diff: yearsDiff, diffType: 'years' },
    { diff: monthsDiff, diffType: 'months' },
    { diff: weeksDiff, diffType: 'weeks' },
    { diff: daysDiff, diffType: 'days' },
    { diff: hoursDiff, diffType: 'hours' },
    { diff: minutesDiff, diffType: 'minutes' },
  ];

  let diffToReturn = diffs.find((val) => val.diff > 0);

  if (!diffToReturn) {
    diffToReturn = { diff: 1, diffType: 'minutes' };
  }

  return diffToReturn;
};

type Diff = { diff: number; diffType: diffType };

export type diffType =
  | 'years'
  | 'months'
  | 'weeks'
  | 'days'
  | 'hours'
  | 'minutes';
