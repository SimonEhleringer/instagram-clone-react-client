import faker from 'faker';
import MockDate from 'mockdate';
import {
  calculateTimeDiffFromNow,
  diffType,
  getDisplayTimeDiffFromNowString,
  getDisplayTimeDiffString,
} from './time';

const mockedNowForSettingMockDate = faker.date.recent();

MockDate.set(mockedNowForSettingMockDate);

const mockedNow = new Date(
  mockedNowForSettingMockDate.getTime() +
    mockedNowForSettingMockDate.getTimezoneOffset() * 60000
);

describe('calculateTimeDiffFromNow', () => {
  it.each([
    [faker.datatype.number({ min: 1, max: 59 }), 'minutes', 60000],
    [faker.datatype.number({ min: 1, max: 23 }), 'hours', 60000 * 60],
    [faker.datatype.number({ min: 1, max: 6 }), 'days', 60000 * 60 * 24],
    [faker.datatype.number({ min: 1, max: 4 }), 'weeks', 60000 * 60 * 24 * 7],
    [
      faker.datatype.number({ min: 1, max: 11 }),
      'months',
      60000 * 60 * 24 * 31,
    ],
    [
      faker.datatype.number({ min: 1, max: 10 }),
      'years',
      60000 * 60 * 24 * 365,
    ],
  ])(
    'should return %s %s',
    (expectedDiff: number, unit: string, multiplier: number) => {
      const date = new Date(mockedNow.getTime() - expectedDiff * multiplier);

      const diff = calculateTimeDiffFromNow(date);

      expect(diff.diff).toBe(expectedDiff);
      expect(diff.diffType).toBe(unit);
    }
  );

  it('should return 1 minute when time difference is smaller than 1 minute', () => {
    const date = new Date(mockedNow.getTime() - 0.9 * 60000);

    const diff = calculateTimeDiffFromNow(date);

    expect(diff.diff).toBe(1);
    expect(diff.diffType).toBe('minutes');
  });
});

describe('getDisplayTimeDiffString', () => {
  it.each([
    ['0 Minuten', 0, 'minutes'],
    ['1 Minute', 1, 'minutes'],
    ['2 Minuten', 2, 'minutes'],
    ['0 Stunden', 0, 'hours'],
    ['1 Stunde', 1, 'hours'],
    ['2 Stunden', 2, 'hours'],
    ['0 Tagen', 0, 'days'],
    ['1 Tag', 1, 'days'],
    ['2 Tagen', 2, 'days'],
    ['0 Wochen', 0, 'weeks'],
    ['1 Woche', 1, 'weeks'],
    ['2 Wochen', 2, 'weeks'],
    ['0 Monaten', 0, 'months'],
    ['1 Monat', 1, 'months'],
    ['2 Monaten', 2, 'months'],
    ['0 Jahren', 0, 'years'],
    ['1 Jahr', 1, 'years'],
    ['2 Jahren', 2, 'years'],
  ])(
    'should return "%s" when %s %s are given',
    (expectedDisplayString: string, diff: number, diffType: string) => {
      const displayString = getDisplayTimeDiffString(
        diff,
        diffType as diffType
      );

      expect(displayString).toBe(expectedDisplayString);
    }
  );
});

describe('getDisplayTimeDiffFromNowString', () => {
  it('should return some minutes', () => {
    const minutes = faker.datatype.number({ min: 1, max: 10 });

    const date = new Date(mockedNow.getTime() - minutes * 60000);

    const displayString = getDisplayTimeDiffFromNowString(date);

    const expectedUnitString = minutes === 1 ? 'Minute' : 'Minuten';

    expect(displayString).toBe(`${minutes} ${expectedUnitString}`);
  });
});
