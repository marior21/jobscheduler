import Limits from "../src/domain/configuration/limits";
import { MonthlyFrecuencyType, Occurs, SchedulerType, TimeUnit, VariableDayNumber, VariableDayType } from "../src/domain/enums";
import Scheduler from "../src/domain/scheduler/scheduler";
import Configuration from "../src/domain/configuration/configuration";
import SchedulerFactory from "../src/domain/scheduler/schedulerFactory";
import DailyConfiguration from "../src/domain/configuration/dailyConfiguration";
import MonthlyConfiguration from "../src/domain/configuration/monthlyConfiguration";

describe('scheduler monthly', () => {
  test.each([
    [new Date(2020, 4, 4), 9, TimeUnit.Hours, new Date(2020, 4, 7, 4, 0, 0), new Date(2020, 4, 7, 13, 0, 0), new Date(2020, 7, 7, 4, 0, 0)],
    [new Date(2020, 4, 4, 19), 3, TimeUnit.Hours, new Date(2020, 4, 7, 4, 0, 0), new Date(2020, 4, 7, 7, 0, 0), new Date(2020, 4, 7, 10, 0, 0)],
    [new Date(2020, 4, 5, 5), 3, TimeUnit.Hours, new Date(2020, 4, 7, 4, 0, 0), new Date(2020, 4, 7, 7, 0, 0), new Date(2020, 4, 7, 10, 0, 0)]
  ])('next date calculate is correct with monthly configuration the day 7 each 3 months start %p with evey %p %p unit and between 04:00 and 18:00 hour',
    (inputDate: Date, occursEveryNumber: number, timeUnit: TimeUnit, expectedDate: Date, nextMonthsExpectedDate: Date, nextMonthsExpectedDate2: Date) => {
      const startDate: Date = new Date(2020, 0, 1);
      const starTime = new Date(null, null, null, 4);
      const endTime = new Date(null, null, null, 18);
      const limits: Limits = new Limits(startDate, null);

      const dailayConfiguration: DailyConfiguration =
        new DailyConfiguration(null, null, timeUnit, occursEveryNumber, starTime, endTime);
      const monthlyConfiguration: MonthlyConfiguration =
        new MonthlyConfiguration(MonthlyFrecuencyType.exactDay, 7, 3, null, null);
      const configuration: Configuration =
        new Configuration(SchedulerType.Recurring, true, Occurs.Monthly, null, limits, null, dailayConfiguration, monthlyConfiguration);

      const scheduler: Scheduler = SchedulerFactory.create(configuration);

      let nextDate: Date = scheduler.getNextDateTime(inputDate).nextDate;
      expect(nextDate).toStrictEqual(expectedDate);

      nextDate = scheduler.getNextDateTime(nextDate).nextDate;
      expect(nextDate).toStrictEqual(nextMonthsExpectedDate);

      nextDate = scheduler.getNextDateTime(nextDate).nextDate;
      expect(nextDate).toStrictEqual(nextMonthsExpectedDate2);
    });

  test.each([
    [new Date(2020, 4, 4), 9, TimeUnit.Hours, new Date(2020, 5, 1, 4, 0, 0), new Date(2020, 5, 1, 13, 0, 0), new Date(2020, 8, 1, 4, 0, 0)],
  ])('next date calculate is correct with monthly configuration the first day each 3 months start %p with evey %p %p unit and between 04:00 and 18:00 hour',
    (inputDate: Date, occursEveryNumber: number, timeUnit: TimeUnit, expectedDate: Date, nextMonthsExpectedDate: Date, nextMonthsExpectedDate2: Date) => {
      const startDate: Date = new Date(2020, 0, 1);
      const starTime = new Date(null, null, null, 4);
      const endTime = new Date(null, null, null, 18);
      const limits: Limits = new Limits(startDate, null);

      const dailayConfiguration: DailyConfiguration =
        new DailyConfiguration(null, null, timeUnit, occursEveryNumber, starTime, endTime);
      const monthlyConfiguration: MonthlyConfiguration =
        new MonthlyConfiguration(MonthlyFrecuencyType.variableDay, null, 3, VariableDayNumber.First, VariableDayType.Day);
      const configuration: Configuration =
        new Configuration(SchedulerType.Recurring, true, Occurs.Monthly, null, limits, null, dailayConfiguration, monthlyConfiguration);

      const scheduler: Scheduler = SchedulerFactory.create(configuration);

      let nextDate: Date = scheduler.getNextDateTime(inputDate).nextDate;
      expect(nextDate).toStrictEqual(expectedDate);

      nextDate = scheduler.getNextDateTime(nextDate).nextDate;
      expect(nextDate).toStrictEqual(nextMonthsExpectedDate);

      nextDate = scheduler.getNextDateTime(nextDate).nextDate;
      expect(nextDate).toStrictEqual(nextMonthsExpectedDate2);
    });

  test.each([
    [new Date(2020, 4, 4), new Date(2020, 5, 1), new Date(2020, 8, 1), new Date(2020, 11, 1)],
    [new Date(2020, 0, 1), new Date(2020, 0, 1), new Date(2020, 3, 1), new Date(2020, 6, 1)]
  ])('next date calculate is correct with monthly configuration the first day each 3 months start %p',
    (inputDate: Date, expectedDate: Date, nextMonthsExpectedDate: Date, nextMonthsExpectedDate2: Date) => {
      const startDate: Date = new Date(2020, 0, 1);

      const limits: Limits = new Limits(startDate, null);

      const monthlyConfiguration: MonthlyConfiguration =
        new MonthlyConfiguration(MonthlyFrecuencyType.variableDay, null, 3, VariableDayNumber.First, VariableDayType.Day);
      const configuration: Configuration =
        new Configuration(SchedulerType.Recurring, true, Occurs.Monthly, null, limits, null, null, monthlyConfiguration);

      const scheduler: Scheduler = SchedulerFactory.create(configuration);

      let nextDate: Date = scheduler.getNextDateTime(inputDate).nextDate;
      expect(nextDate).toStrictEqual(expectedDate);

      nextDate = scheduler.getNextDateTime(nextDate).nextDate;
      expect(nextDate).toStrictEqual(nextMonthsExpectedDate);

      nextDate = scheduler.getNextDateTime(nextDate).nextDate;
      expect(nextDate).toStrictEqual(nextMonthsExpectedDate2);
    });

});
