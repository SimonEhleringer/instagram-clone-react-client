// TODO: Write tests
export const calculateDisplayTime = (date: Date) => {
  const now = new Date(
    new Date().getTime() + new Date().getTimezoneOffset() * 60000
  );
  const nowAsMilliseconds = Date.parse(now.toUTCString());

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
    { diff: yearsDiff, diffType: "years" },
    { diff: monthsDiff, diffType: "months" },
    { diff: weeksDiff, diffType: "weeks" },
    { diff: daysDiff, diffType: "days" },
    { diff: hoursDiff, diffType: "hours" },
    { diff: minutesDiff, diffType: "minutes" },
  ];

  let diffToReturn = diffs.find((val) => val.diff > 0);

  if (!diffToReturn) {
    diffToReturn = { diff: 1, diffType: "minutes" };
  }

  return diffToReturn;
};

// TODO: Add tests
export const getDisplayTimeString = (date: Date) => {
  const map = new Map<diffType, { singular: string; plural: string }>();

  map.set("years", { singular: "Jahr", plural: "Jahre" });
  map.set("months", { singular: "Monat", plural: "Monate" });
  map.set("weeks", { singular: "Woche", plural: "Wochen" });
  map.set("days", { singular: "Tag", plural: "Tage" });
  map.set("hours", { singular: "Stunde", plural: "Stunden" });
  map.set("minutes", { singular: "Minute", plural: "Minuten" });

  const displayTimeObj = calculateDisplayTime(date);

  const unitStringObj = map.get(displayTimeObj.diffType);

  if (!unitStringObj) {
    throw new Error(
      `No matching unit string could be found for "${displayTimeObj.diffType}"`
    );
  }

  const unitString =
    displayTimeObj.diff !== 1 ? unitStringObj.plural : unitStringObj.singular;

  const displayString = `${displayTimeObj.diff} ${unitString}`;

  return displayString;
};

type Diff = { diff: number; diffType: diffType };

export type diffType =
  | "years"
  | "months"
  | "weeks"
  | "days"
  | "hours"
  | "minutes";
