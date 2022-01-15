import CultureManager from "../src/localization/cultureManager";
import { Culture } from "../src/localization/enums";
import Configuration from "../src/domain/configuration/configuration";
import DailyConfiguration from "../src/domain/configuration/dailyConfiguration";
import Limits from "../src/domain/configuration/limits";
import MonthlyConfiguration from "../src/domain/configuration/monthlyConfiguration";
import Week from "../src/domain/configuration/week";
import WeeklyConfiguration from "../src/domain/configuration/weeklyConfiguration";
import { MonthlyFrecuencyType, Occurs, SchedulerType, TimeUnit } from "../src/domain/enums";
import OuputGenerator from "../src/domain/ouputGenerator";


describe('ouput generator en-gb', () => {
  test('ouput generator generate correct description with the week and day configuration', () => {
    const startDate: Date = new Date(2020, 0, 23);
    const starTime = new Date(0, 0, 0, 4);
    const endTime = new Date(0, 0, 0, 18);
    const limits: Limits = new Limits(startDate, null);
    const week: Week = new Week();
    week.monday = true;
    week.tuesday = true;
    week.saturday = true;
    const weeklyConfiguration: WeeklyConfiguration = new WeeklyConfiguration(3, week);
    const dailayConfiguration: DailyConfiguration = new DailyConfiguration(null, null, TimeUnit.Hours, 2, starTime, endTime);
    const configuration: Configuration = new Configuration('', SchedulerType.Recurring, true, Occurs.Weekly, null, limits, weeklyConfiguration, dailayConfiguration, null);
    const ouputGenerator: OuputGenerator = new OuputGenerator(configuration);
    expect(ouputGenerator.getOuput(new Date(2020, 4, 16)).description).toStrictEqual(
      'Occurs every 3 weeks on monday, tuesday and saturday every 2 Hours between 04:00:00 and 18:00:00 starting on 23/01/2020'
    );
  });


  test('ouput generator generate correct description with the week and day configuration with once time', () => {
    const startDate: Date = new Date(2020, 0, 1);
    const limits: Limits = new Limits(startDate, null);
    const week: Week = new Week();
    week.monday = true;
    week.tuesday = true;
    week.saturday = true;
    week.sunday = true;
    const weeklyConfiguration: WeeklyConfiguration = new WeeklyConfiguration(3, week);
    const dailayConfiguration: DailyConfiguration = new DailyConfiguration(null, new Date(0, 0, 0, 14, 45, 12), null, null, null, null);
    const configuration: Configuration = new Configuration('', SchedulerType.Recurring, true, Occurs.Weekly, null, limits, weeklyConfiguration, dailayConfiguration, null);
    const ouputGenerator: OuputGenerator = new OuputGenerator(configuration);
    expect(ouputGenerator.getOuput(new Date(2020, 4, 16)).description).toStrictEqual(
      'Occurs every 3 weeks on monday, tuesday, saturday and sunday at 14:45:12 starting on 01/01/2020'
    );
  });

  test('ouput generator generate correct description with the day configuration with frecuency 1', () => {
    const startDate: Date = new Date(2020, 0, 1);
    const limits: Limits = new Limits(startDate, null);
    const dailayConfiguration: DailyConfiguration = new DailyConfiguration(1, null, null, null, null, null);
    const configuration: Configuration = new Configuration('', SchedulerType.Recurring, true, Occurs.Daily, null, limits, null, dailayConfiguration, null);
    const ouputGenerator: OuputGenerator = new OuputGenerator(configuration);
    expect(ouputGenerator.getOuput(new Date(2020, 4, 16)).description).toStrictEqual(
      'Occurs every day starting on 01/01/2020'
    );
  });

  test('ouput generator generate correct description with the day configuration with frecuency more than 1', () => {
    const startDate: Date = new Date(2020, 0, 1);
    const limits: Limits = new Limits(startDate, null);
    const dailayConfiguration: DailyConfiguration = new DailyConfiguration(4, null, null, null, null, null);
    const configuration: Configuration = new Configuration('', SchedulerType.Recurring, true, Occurs.Daily, null, limits, null, dailayConfiguration, null);
    const ouputGenerator: OuputGenerator = new OuputGenerator(configuration);
    expect(ouputGenerator.getOuput(new Date(2020, 4, 16)).description).toStrictEqual(
      'Occurs each 4 days starting on 01/01/2020'
    );
  });

  test('ouput generator generate correct description with the month exactDay', () => {
    const startDate: Date = new Date(2020, 0, 1);
    const limits: Limits = new Limits(startDate, null);
    const monthlyConfiguration: MonthlyConfiguration = new MonthlyConfiguration(MonthlyFrecuencyType.exactDay, 5, 3, null, null);
    const configuration: Configuration = new Configuration('', SchedulerType.Recurring, true, Occurs.Monthly, null, limits, null, null, monthlyConfiguration);
    const ouputGenerator: OuputGenerator = new OuputGenerator(configuration);
    expect(ouputGenerator.getOuput(new Date(2020, 4, 16)).description).toStrictEqual(
      'Occurs the day 5 of every 3 months starting on 01/01/2020'
    );
  });
});

describe('ouput generator en-us', () => {
  test('ouput generator generate correct description with the week and day configuration', () => {
    CultureManager.setCurrentCulture(Culture.En_US);
    const startDate: Date = new Date(2020, 0, 23);
    const starTime = new Date(0, 0, 0, 4);
    const endTime = new Date(0, 0, 0, 18);
    const limits: Limits = new Limits(startDate, null);
    const week: Week = new Week();
    week.monday = true;
    week.tuesday = true;
    week.saturday = true;
    const weeklyConfiguration: WeeklyConfiguration = new WeeklyConfiguration(3, week);
    const dailayConfiguration: DailyConfiguration = new DailyConfiguration(null, null, TimeUnit.Hours, 2, starTime, endTime);
    const configuration: Configuration = new Configuration('', SchedulerType.Recurring, true, Occurs.Weekly, null, limits, weeklyConfiguration, dailayConfiguration, null);
    const ouputGenerator: OuputGenerator = new OuputGenerator(configuration);

    expect(ouputGenerator.getOuput(new Date(2020, 4, 16)).description).toStrictEqual(
      'Occurs every 3 weeks on monday, tuesday and saturday every 2 Hours between 04:00:00 and 18:00:00 starting on 01/23/2020'
    );
    CultureManager.setCurrentCulture(Culture.En_GB);
  });
});

describe('ouput generator es-es', () => {
  test('ouput generator generate correct description with the week and day configuration', () => {
    CultureManager.setCurrentCulture(Culture.Es_ES);
    const startDate: Date = new Date(2020, 0, 23);
    const starTime = new Date(0, 0, 0, 4);
    const endTime = new Date(0, 0, 0, 18);
    const limits: Limits = new Limits(startDate, null);
    const week: Week = new Week();
    week.monday = true;
    week.tuesday = true;
    week.saturday = true;
    const weeklyConfiguration: WeeklyConfiguration = new WeeklyConfiguration(3, week);
    const dailayConfiguration: DailyConfiguration = new DailyConfiguration(null, null, TimeUnit.Hours, 2, starTime, endTime);
    const configuration: Configuration = new Configuration('', SchedulerType.Recurring, true, Occurs.Weekly, null, limits, weeklyConfiguration, dailayConfiguration, null);
    const ouputGenerator: OuputGenerator = new OuputGenerator(configuration);

    expect(ouputGenerator.getOuput(new Date(2020, 4, 16)).description).toStrictEqual(
      'Occurs every 3 weeks on monday, tuesday and saturday every 2 Hours between 04:00:00 and 18:00:00 starting on 23/01/2020'
    );
    CultureManager.setCurrentCulture(Culture.En_GB);
  });
});