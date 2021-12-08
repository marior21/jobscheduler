import Limits from "../src/domain/configuration/limits";
import Ouput from "../src/domain/ouput";
import { Occurs, SchedulerType, TimeUnit } from "../src/domain/enums";
import Scheduler from "../src/domain/scheduler/scheduler";
import Configuration from "../src/domain/configuration/configuration";
import SchedulerFactory from "../src/domain/scheduler/schedulerFactory";
import DailyConfiguration from "../src/domain/configuration/dailyConfiguration";
import WeeklyConfiguration from "../src/domain/configuration/weeklyConfiguration";
import Week from "../src/domain/configuration/week";


const onceDate: Date = new Date(2020, 0, 8, 14);
const currentDate: Date = new Date(2020, 0, 4);

function getOnceScheduler(enabled: boolean): Scheduler {
  const startDate: Date = new Date(2020, 0, 1);
  const limits: Limits = new Limits(startDate, null);
  const configuration: Configuration = new Configuration(SchedulerType.Once, enabled, null, onceDate, limits, null, null, null);

  return SchedulerFactory.create(configuration);
};


function getRecurringScheduler(enabled: boolean, ocurrs: Occurs, limits: Limits): Scheduler {
  const startDate: Date = new Date(2020, 0, 1);
  const limitsArg: Limits = limits != null ? limits : new Limits(startDate, null);
  const dailayConfiguration: DailyConfiguration = new DailyConfiguration(1, null, null, null, null, null);
  const configuration: Configuration = new Configuration(SchedulerType.Recurring, enabled, ocurrs, currentDate, limitsArg, null, dailayConfiguration, null);

  return SchedulerFactory.create(configuration);
};

describe('scheduler once', () => {
  test('next date in once date mode in scheduler enabled return once date', () => {
    const scheduler: Scheduler = getOnceScheduler(true);
    const ouput: Ouput = scheduler.getNextDateTime(currentDate);
    expect(ouput.description).toEqual('Ocurrs once. Shedule will be used on 08/01/2020 at 14:00:00 starting on 01/01/2020');
    expect(ouput.nextDate).toBe(onceDate);
  });

  test('next date in once date mode in scheduler not enabled return null', () => {
    const scheduler: Scheduler = getOnceScheduler(false);
    const ouput: Ouput = scheduler.getNextDateTime(currentDate);

    expect(ouput).toBe(null);
  });
});


describe('scheduler recurring', () => {
  test('next date in recurring date mode in scheduler enabled and one day frecuency return correct date', () => {

    const startDate: Date = new Date(2020, 0, 1);
    const limits: Limits = new Limits(startDate, null);
    const dailayConfiguration: DailyConfiguration = new DailyConfiguration(1, null, null, null, null, null);
    const configuration: Configuration = new Configuration(SchedulerType.Recurring, true, Occurs.Daily, currentDate, limits, null, dailayConfiguration, null);

    const scheduler: Scheduler = SchedulerFactory.create(configuration);
    const ouput: Ouput = scheduler.getNextDateTime(currentDate);

    const dateExpected = new Date(2020, 0, 5);
    expect(ouput.description).toEqual('Ocurrs every day starting on 01/01/2020');
    expect(ouput.nextDate).toStrictEqual(dateExpected);
  });

  test('next date in recurring date mode in scheduler enabled with currentdate don`t in startDate limits throw', () => {
    const limits: Limits = new Limits(new Date(2022, 0, 1), null);
    const scheduler: Scheduler = getRecurringScheduler(true, Occurs.Daily, limits);

    expect(() => scheduler.getNextDateTime(currentDate)).toThrow();
  });

  test('next date in recurring date mode in scheduler enabled with currentdate don`t in endDate limits throw', () => {
    const limits: Limits = new Limits(new Date(2020, 0, 1), new Date(2020, 0, 2));
    const scheduler: Scheduler = getRecurringScheduler(true, Occurs.Daily, limits);

    expect(() => scheduler.getNextDateTime(currentDate)).toThrow();
  });

  test.each([
    [1, new Date(2020, 4, 4), new Date(null, null, null, 12, 23, 56), new Date(2020, 4, 4, 12, 23, 56)],
    [2, new Date(2020, 4, 4), new Date(null, null, null, 23, 23, 56), new Date(2020, 4, 4, 23, 23, 56)],
    [10, new Date(2020, 4, 4), new Date(null, null, null, 12, 54, 56), new Date(2020, 4, 4, 12, 54, 56)],
    [10, new Date(2020, 4, 4, 13), new Date(null, null, null, 12, 54, 56), new Date(2020, 4, 14, 12, 54, 56)]
  ])('next date calculate is correct with daily configuration and occurs once %p and %p',
    (frecuency: number, inputDate: Date, occurOnceTime: Date, expectedDate: Date) => {
      const startDate: Date = new Date(2020, 0, 1);
      const limits: Limits = new Limits(startDate, null);
      const dailayConfiguration: DailyConfiguration = new DailyConfiguration(frecuency, occurOnceTime, null, null, null, null);
      const configuration: Configuration = new Configuration(SchedulerType.Recurring, true, Occurs.Daily, currentDate, limits, null, dailayConfiguration, null);

      const scheduler: Scheduler = SchedulerFactory.create(configuration);

      const nextDate: Date = scheduler.getNextDateTime(inputDate).nextDate;

      expect(nextDate).toStrictEqual(expectedDate);
    });

  test.each([
    [1, new Date(2020, 4, 4, 10, 20, 34), 2, TimeUnit.Hours, new Date(2020, 4, 4, 12, 20, 34)],
    [1, new Date(2020, 4, 4, 10, 20, 34), 2, TimeUnit.Minuts, new Date(2020, 4, 4, 10, 22, 34)],
    [1, new Date(2020, 4, 4, 10, 20, 34), 2, TimeUnit.Seconds, new Date(2020, 4, 4, 10, 20, 36)],
    [3, new Date(2020, 4, 4, 10, 20, 34), 7, TimeUnit.Hours, new Date(2020, 4, 4, 17, 20, 34)],
    [3, new Date(2020, 4, 4, 10, 20, 34), 45, TimeUnit.Minuts, new Date(2020, 4, 4, 11, 5, 34)],
    [3, new Date(2020, 4, 4, 10, 20, 30), 34, TimeUnit.Seconds, new Date(2020, 4, 4, 10, 21, 4)],
    [1, new Date(2020, 4, 4, 18, 20, 34), 2, TimeUnit.Hours, new Date(2020, 4, 5, 4, 0, 0)]
  ])('next date calculate is correct with daily %p configuration and occurs every hour, minute or second',
    (frecuency: number, inputDate: Date, occursEveryNumber: number, timeUnit: TimeUnit, expectedDate: Date) => {
      const startDate: Date = new Date(2020, 0, 1);
      const limits: Limits = new Limits(startDate, null);
      const starTime = new Date(null, null, null, 4);
      const endTime = new Date(null, null, null, 18);
      const dailayConfiguration: DailyConfiguration = new DailyConfiguration(frecuency, null, timeUnit, occursEveryNumber, starTime, endTime);
      const configuration: Configuration = new Configuration(SchedulerType.Recurring, true, Occurs.Daily, null, limits, null, dailayConfiguration, null);

      const scheduler: Scheduler = SchedulerFactory.create(configuration);

      const nextDate: Date = scheduler.getNextDateTime(inputDate).nextDate;

      expect(nextDate).toStrictEqual(expectedDate);
    });

  test.each([
    [2, new Date(2020, 4, 4), new Date(2020, 4, 5)],
    [2, new Date(2020, 4, 5), new Date(2020, 4, 9)],
    [2, new Date(2020, 4, 6), new Date(2020, 4, 9)],
    [2, new Date(2020, 4, 7), new Date(2020, 4, 9)],
    [2, new Date(2020, 4, 8), new Date(2020, 4, 9)],
    [2, new Date(2020, 4, 9), new Date(2020, 4, 23)],
    [2, new Date(2020, 4, 10), new Date(2020, 4, 25)],
    [2, new Date(2020, 4, 11), new Date(2020, 4, 12)],
    [2, new Date(2020, 4, 12), new Date(2020, 4, 16)],
    [2, new Date(2020, 4, 13), new Date(2020, 4, 16)]
  ])('next date calculate is correct with weekly %p configuration monday, tuesday and saturday',
    (inputNumberWeeks: number, inputDate: Date, expectedDate: Date) => {
      const startDate: Date = new Date(2020, 0, 1);
      const limits: Limits = new Limits(startDate, null);
      const week: Week = new Week();
      week.monday = true;
      week.tuesday = true;
      week.saturday = true;
      const weeklyConfiguration: WeeklyConfiguration = new WeeklyConfiguration(inputNumberWeeks, week);
      const configuration: Configuration = new Configuration(SchedulerType.Recurring, true, Occurs.Weekly, null, limits, weeklyConfiguration, null, null);

      const scheduler: Scheduler = SchedulerFactory.create(configuration);

      const nextDate: Date = scheduler.getNextDateTime(inputDate).nextDate;

      expect(nextDate).toStrictEqual(expectedDate);
    });

  test.each([
    [2, new Date(2020, 4, 4), new Date(2020, 4, 5, 18, 23, 45)],
    [2, new Date(2020, 4, 5), new Date(2020, 4, 9, 18, 23, 45)],
    [2, new Date(2020, 4, 6), new Date(2020, 4, 9, 18, 23, 45)],
    [2, new Date(2020, 4, 7), new Date(2020, 4, 9, 18, 23, 45)],
    [2, new Date(2020, 4, 8), new Date(2020, 4, 9, 18, 23, 45)],
    [2, new Date(2020, 4, 9), new Date(2020, 4, 23, 18, 23, 45)],
    [2, new Date(2020, 4, 10), new Date(2020, 4, 25, 18, 23, 45)],
    [2, new Date(2020, 4, 11), new Date(2020, 4, 12, 18, 23, 45)],
    [2, new Date(2020, 4, 12), new Date(2020, 4, 16, 18, 23, 45)],
    [2, new Date(2020, 4, 13), new Date(2020, 4, 16, 18, 23, 45)]
  ])('next date calculate is correct with weekly %p configuration monday, tuesday and saturday and daily with once hour',
    (inputNumberWeeks: number, inputDate: Date, expectedDate: Date) => {
      const startDate: Date = new Date(2020, 0, 1);
      const occurOnceTime: Date = new Date(null, null, null, 18, 23, 45);
      const limits: Limits = new Limits(startDate, null);
      const week: Week = new Week();
      week.monday = true;
      week.tuesday = true;
      week.saturday = true;
      const weeklyConfiguration: WeeklyConfiguration = new WeeklyConfiguration(inputNumberWeeks, week);
      const dailayConfiguration: DailyConfiguration = new DailyConfiguration(null, occurOnceTime, null, null, null, null);
      const configuration: Configuration = new Configuration(SchedulerType.Recurring, true, Occurs.Weekly, null, limits, weeklyConfiguration, dailayConfiguration, null);

      const scheduler: Scheduler = SchedulerFactory.create(configuration);

      const nextDate: Date = scheduler.getNextDateTime(inputDate).nextDate;

      expect(nextDate).toStrictEqual(expectedDate);
    });


  test.each([
    [2, new Date(2020, 4, 4), 3, TimeUnit.Hours, new Date(2020, 4, 4, 4, 0, 0)],
    [2, new Date(2020, 4, 4, 19), 3, TimeUnit.Hours, new Date(2020, 4, 5, 4, 0, 0)],
    [2, new Date(2020, 4, 5, 5), 3, TimeUnit.Hours, new Date(2020, 4, 5, 8, 0, 0)],
    [2, new Date(2020, 4, 5, 5), 3, TimeUnit.Hours, new Date(2020, 4, 5, 8, 0, 0)],
    [2, new Date(2020, 4, 5, 17), 3, TimeUnit.Hours, new Date(2020, 4, 9, 4, 0, 0)],
    [2, new Date(2020, 4, 9, 17), 3, TimeUnit.Hours, new Date(2020, 4, 23, 4, 0, 0)]
  ])('next date calculate is correct with weekly %p configuration monday, tuesday and saturday and daily with evey %p %p unit',
    (inputNumberWeeks: number, inputDate: Date, occursEveryNumber: number, timeUnit: TimeUnit, expectedDate: Date) => {
      const startDate: Date = new Date(2020, 0, 1);
      const starTime = new Date(null, null, null, 4);
      const endTime = new Date(null, null, null, 18);
      const limits: Limits = new Limits(startDate, null);
      const week: Week = new Week();
      week.monday = true;
      week.tuesday = true;
      week.saturday = true;
      const weeklyConfiguration: WeeklyConfiguration = new WeeklyConfiguration(inputNumberWeeks, week);
      const dailayConfiguration: DailyConfiguration = new DailyConfiguration(null, null, timeUnit, occursEveryNumber, starTime, endTime);
      const configuration: Configuration = new Configuration(SchedulerType.Recurring, true, Occurs.Weekly, null, limits, weeklyConfiguration, dailayConfiguration, null);

      const scheduler: Scheduler = SchedulerFactory.create(configuration);

      const nextDate: Date = scheduler.getNextDateTime(inputDate).nextDate;

      expect(nextDate).toStrictEqual(expectedDate);
    });

});
