export const calculateTimeDiffFromNow = (date: Date) => {
  const now = new Date(
    new Date().getTime() + new Date().getTimezoneOffset() * 60000
  );
  const nowAsMilliseconds = now.getTime();

  const dateAsMilliseconds = new Date(date).getTime();

  const minutesDiff = Math.floor(
    (nowAsMilliseconds - dateAsMilliseconds) / 60000
  );

  const hoursDiff = Math.floor(minutesDiff / 60);

  const daysDiff = Math.floor(hoursDiff / 24);

  const weeksDiff = Math.floor(daysDiff / 7);

  const monthsDiff = Math.floor(daysDiff / 30.4167);

  const yearsDiff = Math.floor(daysDiff / 365);

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

export const getDisplayTimeDiffFromNowString = (date: Date) => {
  const displayTimeObj = calculateTimeDiffFromNow(date);

  return getDisplayTimeDiffString(displayTimeObj.diff, displayTimeObj.diffType);
};

export const getDisplayTimeDiffString = (diff: number, diffType: diffType) => {
  const map = new Map<diffType, { singular: string; plural: string }>();

  map.set('years', { singular: 'Jahr', plural: 'Jahre' });
  map.set('months', { singular: 'Monat', plural: 'Monate' });
  map.set('weeks', { singular: 'Woche', plural: 'Wochen' });
  map.set('days', { singular: 'Tag', plural: 'Tage' });
  map.set('hours', { singular: 'Stunde', plural: 'Stunden' });
  map.set('minutes', { singular: 'Minute', plural: 'Minuten' });

  const unitStringObj = map.get(diffType);

  if (!unitStringObj) {
    throw new Error(`No matching unit string could be found for "${diffType}"`);
  }

  const unitString = diff !== 1 ? unitStringObj.plural : unitStringObj.singular;

  const displayString = `${diff} ${unitString}`;

  return displayString;
};

type Diff = { diff: number; diffType: diffType };

export type diffType =
  | 'years'
  | 'months'
  | 'weeks'
  | 'days'
  | 'hours'
  | 'minutes';
