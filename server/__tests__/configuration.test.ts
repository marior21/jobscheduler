import Configuration from "../src/domain/configuration/configuration";
import Limits from "../src/domain/configuration/limits";
import MonthlyConfiguration from "../src/domain/configuration/monthlyConfiguration";
import Week from "../src/domain/configuration/week";
import { MonthlyFrecuencyType, Occurs, SchedulerType, VariableDayNumber, VariableDayType } from "../src/domain/enums";


describe('configuration', () => {
  test('week throw error if day is incorrect', () => {
    const week: Week = new Week();
    expect(() => week.isDayChoosen(9)).toThrowError();
  });

  test('configuration throw error if schedulertype is null', () => {
    const startDate: Date = new Date(2020, 0, 1);
    const limits: Limits = new Limits(startDate, null);
    expect(() => new Configuration(null, true, null, new Date(4, 5, 2020), limits, null, null, null)).toThrowError();
  });

  test('configuration throw error if enabled is null', () => {
    const startDate: Date = new Date(2020, 0, 1);
    const limits: Limits = new Limits(startDate, null);
    expect(() => new Configuration(SchedulerType.Once, null, null, new Date(4, 5, 2020), limits, null, null, null)).toThrowError();
  });

  test('configuration throw error if limits is null', () => {
    expect(() => new Configuration(SchedulerType.Once, true, null, new Date(4, 5, 2020), null, null, null, null)).toThrowError();
  });

  test('configuration throw error if oncedata is null', () => {
    const startDate: Date = new Date(2020, 0, 1);
    const limits: Limits = new Limits(startDate, null);
    expect(() => new Configuration(SchedulerType.Once, true, null, null, limits, null, null, null)).toThrowError();
  });

  test('configuration throw error if occurs is null', () => {
    const startDate: Date = new Date(2020, 0, 1);
    const limits: Limits = new Limits(startDate, null);
    expect(() => new Configuration(SchedulerType.Recurring, true, null, null, limits, null, null, null)).toThrowError();
  });

  test('configuration throw error if weeklyConfiguration is null', () => {
    const startDate: Date = new Date(2020, 0, 1);
    const limits: Limits = new Limits(startDate, null);
    expect(() => new Configuration(SchedulerType.Recurring, true, Occurs.Weekly, null, limits, null, null, null)).toThrowError();
  });

  test('configuration throw error if dailyConfiguration is null', () => {
    const startDate: Date = new Date(2020, 0, 1);
    const limits: Limits = new Limits(startDate, null);
    expect(() => new Configuration(SchedulerType.Recurring, true, Occurs.Daily, null, limits, null, null, null)).toThrowError();
  });

  test('configuration throw error if monthlyConfiguration is null', () => {
    const startDate: Date = new Date(2020, 0, 1);
    const limits: Limits = new Limits(startDate, null);
    expect(() => new Configuration(SchedulerType.Recurring, true, Occurs.Monthly, null, limits, null, null, null)).toThrowError();
  });

  test('monthlyConfiguration throw error if frecuencyType is null', () => {
    expect(() => new MonthlyConfiguration(null, null, null, null, null)).toThrowError();
  });

  test('monthlyConfiguration throw error if frecuencyType is exactDay and day is null', () => {
    expect(() => new MonthlyConfiguration(MonthlyFrecuencyType.exactDay, null, null, null, null)).toThrowError();
  });

  test('monthlyConfiguration throw error if frecuencyType is exactDay and day is 0', () => {
    expect(() => new MonthlyConfiguration(MonthlyFrecuencyType.exactDay, 0, null, null, null)).toThrowError();
  });

  test('monthlyConfiguration throw error if frecuencyType is exactDay and day is more then 31', () => {
    expect(() => new MonthlyConfiguration(MonthlyFrecuencyType.exactDay, 32, 3, null, null)).toThrowError();
  });

  test('monthlyConfiguration throw error if frecuencyType is variableDay and frecuencyVariableDay is null', () => {
    expect(() => new MonthlyConfiguration(MonthlyFrecuencyType.variableDay, null, 3, null, VariableDayType.Sunday)).toThrowError();
  });

  test('monthlyConfiguration throw error if frecuencyType is variableDay and variableDayType is null', () => {
    expect(() => new MonthlyConfiguration(MonthlyFrecuencyType.variableDay, null, 3, VariableDayNumber.First, null)).toThrowError();
  });

  test('monthlyConfiguration throw error if everymonth is null', () => {
    expect(() => new MonthlyConfiguration(MonthlyFrecuencyType.variableDay, null, null, VariableDayNumber.First, VariableDayType.Sunday)).toThrowError();
  });

  test('monthlyConfiguration throw error if everymonth is 0', () => {
    expect(() => new MonthlyConfiguration(MonthlyFrecuencyType.variableDay, null, 0, VariableDayNumber.First, VariableDayType.Sunday)).toThrowError();
  });
});