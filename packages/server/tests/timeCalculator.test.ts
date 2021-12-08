import { TimeUnit } from "../src/domain/enums";
import TimeCalculator from "../src/domain/calculators/timeCalculator";
import TimeCalculatorFactory from "../src/domain/calculators/timeCalculatorFactory";
import DailyConfiguration from "../src/domain/configuration/dailyConfiguration";
import TimeCalculatorHour from "../src/domain/calculators/timeCalculatorHour";


describe('time calculador', () => {
  test.each([
    [2, TimeUnit.Hours, new Date(null, null, null, 12, 0, 0), new Date(null, null, null, 14, 0, 0)],
    [2, TimeUnit.Hours, new Date(null, null, null, 3, 0, 0), new Date(null, null, null, 4, 0, 0)],
    [2, TimeUnit.Hours, new Date(null, null, null, 19, 0, 0), new Date(null, null, null, 4, 0, 0)],
    [2, TimeUnit.Minuts, new Date(null, null, null, 12, 5, 0), new Date(null, null, null, 12, 7, 0)],
    [2, TimeUnit.Minuts, new Date(null, null, null, 3, 54, 0), new Date(null, null, null, 4, 0, 0)],
    [2, TimeUnit.Minuts, new Date(null, null, null, 19, 4, 0), new Date(null, null, null, 4, 0, 0)],
    [34, TimeUnit.Seconds, new Date(null, null, null, 12, 5, 20), new Date(null, null, null, 12, 5, 54)],
    [34, TimeUnit.Seconds, new Date(null, null, null, 17, 59, 30), new Date(null, null, null, 4, 0, 0)],
    [34, TimeUnit.Seconds, new Date(null, null, null, 3, 54, 45), new Date(null, null, null, 4, 0, 0)],
    [34, TimeUnit.Seconds, new Date(null, null, null, 19, 4, 34), new Date(null, null, null, 4, 0, 0)]
  ])('next time calculate is correct with every %p %p inside 04:00 - 18:00 %p %p', (inputOccursEvery: number, inputUnit: TimeUnit, inputDate: Date, expectedDate: Date) => {
    const starTime = new Date(new Date(null, null, null, 4));
    const endTime = new Date(new Date(null, null, null, 18));
    const dailayConfiguration: DailyConfiguration = new DailyConfiguration(0, null, inputUnit, inputOccursEvery, starTime, endTime);
    const timealculator: TimeCalculator = TimeCalculatorFactory.create(dailayConfiguration);

    const nextDate = timealculator.nextTime(inputDate);

    expect(nextDate).toStrictEqual(expectedDate);
  });

  test('timeCalculator throw error if TimeUnit is not supported', () => {
    const starTime = new Date(new Date(null, null, null, 4));
    const endTime = new Date(new Date(null, null, null, 18));
    const dailayConfiguration: DailyConfiguration = new DailyConfiguration(0, null, 7, 2, starTime, endTime);
    expect(() => TimeCalculatorFactory.create(dailayConfiguration)).toThrowError();
  });

  test('timeCalculator throw error if starttime is greater than endtime', () => {
    const starTime = new Date(new Date(null, null, null, 20));
    const endTime = new Date(new Date(null, null, null, 18));

    expect(() => new TimeCalculatorHour(1, starTime, endTime, 1)).toThrowError();
  });

  test('dailyConfiguration throw error if endTime is less then starTime', () => {
    const starTime = new Date(new Date(null, null, null, 14));
    const endTime = new Date(new Date(null, null, null, 12));
    expect(() => new DailyConfiguration(0, null, TimeUnit.Hours, 2, starTime, endTime)).toThrowError();
  });
});