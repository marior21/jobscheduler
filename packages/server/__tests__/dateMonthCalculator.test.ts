import DateMonthCalculatorDay from "../src/domain/calculators/dateMonthCalculatorDay";
import DateMonthCalculatorFactory from "../src/domain/calculators/dateMonthCalculatorFactory";
import DateMonthCalculatorVariableDay from "../src/domain/calculators/dateMonthCalculatorVariableDay";
import MonthlyConfiguration from "../src/domain/configuration/monthlyConfiguration";
import { VariableDayNumber, VariableDayType } from "../src/domain/enums";

describe('date month calculador', () => {

  test('DateMonthCalculatorFactory throw is frecuency is not correct', () => {
    const configuration: MonthlyConfiguration = new MonthlyConfiguration(9, 1, 1, 1, 1);
    expect(() => DateMonthCalculatorFactory.create(configuration)).toThrow();
  });

  test('DateMonthCalculatorFactory throw if configuration is null', () => {
    expect(() => DateMonthCalculatorFactory.create(null)).toThrow();
  });

  test.each([
    [8, 3, new Date(2020, 0, 2), new Date(2020, 0, 8)],
    [8, 3, new Date(2020, 0, 20), new Date(2020, 1, 8)],
    [8, 3, new Date(2020, 0, 8, 0), new Date(2020, 3, 8, 0)],
    [30, 3, new Date(2020, 0, 30, 0), new Date(2020, 3, 30, 0)],
    [31, 3, new Date(2020, 0, 31, 0), new Date(2020, 3, 30, 0)],
    [31, 1, new Date(2020, 0, 31, 0), new Date(2020, 1, 29, 0)],
  ])('next date calculate is correct with the %p day every %p months, current date %p and result %p',
    (inputDay: number, inputEveryMonth, inputDate: Date, expectedDate: Date) => {
      const dateMonthCalculator: DateMonthCalculatorDay = new DateMonthCalculatorDay(inputDay, inputEveryMonth);
      const nextDate = dateMonthCalculator.nextDate(inputDate);
      expect(nextDate).toStrictEqual(expectedDate);
    });

  test.each([
    [VariableDayNumber.First, VariableDayType.Monday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 6, 0), new Date(2020, 3, 6, 0)],
    [VariableDayNumber.Second, VariableDayType.Monday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 13, 0), new Date(2020, 3, 13, 0)],
    [VariableDayNumber.Third, VariableDayType.Monday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 20, 0), new Date(2020, 3, 20, 0)],
    [VariableDayNumber.Fourth, VariableDayType.Monday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 27, 0), new Date(2020, 3, 27, 0)],
    [VariableDayNumber.Last, VariableDayType.Monday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 27, 0), new Date(2020, 3, 27, 0)],
    [VariableDayNumber.Fourth, VariableDayType.Monday, 3, new Date(2020, 0, 24, 0), new Date(2020, 0, 27, 0), new Date(2020, 3, 27, 0)],

    [VariableDayNumber.First, VariableDayType.Tuesday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 7, 0), new Date(2020, 3, 7, 0)],
    [VariableDayNumber.Second, VariableDayType.Tuesday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 14, 0), new Date(2020, 3, 14, 0)],
    [VariableDayNumber.Third, VariableDayType.Tuesday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 21, 0), new Date(2020, 3, 21, 0)],
    [VariableDayNumber.Fourth, VariableDayType.Tuesday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 28, 0), new Date(2020, 3, 28, 0)],
    [VariableDayNumber.Last, VariableDayType.Tuesday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 28, 0), new Date(2020, 3, 28, 0)],
    [VariableDayNumber.Fourth, VariableDayType.Tuesday, 3, new Date(2020, 0, 24, 0), new Date(2020, 0, 28, 0), new Date(2020, 3, 28, 0)],

    [VariableDayNumber.First, VariableDayType.Wednesday, 3, new Date(2020, 0, 3, 0), new Date(2020, 1, 5, 0), new Date(2020, 4, 6, 0)],
    [VariableDayNumber.Second, VariableDayType.Wednesday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 8, 0), new Date(2020, 3, 8, 0)],
    [VariableDayNumber.Third, VariableDayType.Wednesday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 15, 0), new Date(2020, 3, 15, 0)],
    [VariableDayNumber.Fourth, VariableDayType.Wednesday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 22, 0), new Date(2020, 3, 22, 0)],
    [VariableDayNumber.Last, VariableDayType.Wednesday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 29, 0), new Date(2020, 3, 29, 0)],
    [VariableDayNumber.Fourth, VariableDayType.Wednesday, 3, new Date(2020, 0, 24, 0), new Date(2020, 1, 26, 0), new Date(2020, 4, 27, 0)],

    [VariableDayNumber.First, VariableDayType.Thursday, 3, new Date(2020, 0, 3, 0), new Date(2020, 1, 6, 0), new Date(2020, 4, 7)],
    [VariableDayNumber.Second, VariableDayType.Thursday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 9, 0), new Date(2020, 3, 9)],
    [VariableDayNumber.Third, VariableDayType.Thursday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 16, 0), new Date(2020, 3, 16)],
    [VariableDayNumber.Fourth, VariableDayType.Thursday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 23, 0), new Date(2020, 3, 23)],
    [VariableDayNumber.Last, VariableDayType.Thursday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 30, 0), new Date(2020, 3, 30)],
    [VariableDayNumber.Fourth, VariableDayType.Thursday, 3, new Date(2020, 0, 24, 0), new Date(2020, 1, 27, 0), new Date(2020, 4, 28)],

    [VariableDayNumber.First, VariableDayType.Friday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 3, 0), new Date(2020, 3, 3)],
    [VariableDayNumber.Second, VariableDayType.Friday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 10, 0), new Date(2020, 3, 10)],
    [VariableDayNumber.Third, VariableDayType.Friday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 17, 0), new Date(2020, 3, 17)],
    [VariableDayNumber.Fourth, VariableDayType.Friday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 24, 0), new Date(2020, 3, 24)],
    [VariableDayNumber.Last, VariableDayType.Friday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 31, 0), new Date(2020, 3, 24)],
    [VariableDayNumber.Fourth, VariableDayType.Friday, 3, new Date(2020, 0, 24, 0), new Date(2020, 0, 24, 0), new Date(2020, 3, 24)],

    [VariableDayNumber.First, VariableDayType.Weekday, 3, new Date(2020, 0, 3, 0), new Date(2020, 1, 3, 0), new Date(2020, 4, 1)],
    [VariableDayNumber.Second, VariableDayType.Weekday, 3, new Date(2020, 0, 3, 0), new Date(2020, 1, 4, 0), new Date(2020, 4, 4)],
    [VariableDayNumber.Third, VariableDayType.Weekday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 3, 0), new Date(2020, 3, 3)],
    [VariableDayNumber.Fourth, VariableDayType.Weekday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 6, 0), new Date(2020, 3, 6)],
    [VariableDayNumber.Last, VariableDayType.Weekday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 31, 0), new Date(2020, 3, 30)],
    [VariableDayNumber.Fourth, VariableDayType.Weekday, 3, new Date(2020, 0, 24, 0), new Date(2020, 1, 6, 0), new Date(2020, 4, 6)],

    [VariableDayNumber.First, VariableDayType.Day, 3, new Date(2020, 0, 3, 0), new Date(2020, 1, 1, 0), new Date(2020, 4, 1)],
    [VariableDayNumber.Second, VariableDayType.Day, 3, new Date(2020, 0, 3, 0), new Date(2020, 1, 2, 0), new Date(2020, 4, 2)],
    [VariableDayNumber.Third, VariableDayType.Day, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 3, 0), new Date(2020, 3, 3)],
    [VariableDayNumber.Fourth, VariableDayType.Day, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 4, 0), new Date(2020, 3, 4)],
    [VariableDayNumber.Last, VariableDayType.Day, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 31, 0), new Date(2020, 3, 30)],
    [VariableDayNumber.Fourth, VariableDayType.Day, 3, new Date(2020, 0, 24, 0), new Date(2020, 1, 4, 0), new Date(2020, 4, 4)],

    [VariableDayNumber.First, VariableDayType.Weekendday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 4, 0), new Date(2020, 3, 4)],
    [VariableDayNumber.Second, VariableDayType.Weekendday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 5, 0), new Date(2020, 3, 5)],
    [VariableDayNumber.Third, VariableDayType.Weekendday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 11, 0), new Date(2020, 3, 11)],
    [VariableDayNumber.Fourth, VariableDayType.Weekendday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 12, 0), new Date(2020, 3, 12)],
    [VariableDayNumber.Last, VariableDayType.Weekendday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 26, 0), new Date(2020, 3, 26)],
    [VariableDayNumber.Fourth, VariableDayType.Weekendday, 3, new Date(2020, 0, 24, 0), new Date(2020, 1, 9, 0), new Date(2020, 4, 10)]

  ])('next date calculate is correct with the number %p of %p variable day every %p months, current date %p and result %p',
    (inputVariableDayNumber: VariableDayNumber, inputVariableDayType: VariableDayType, inputEveryMonth, inputDate: Date, expectedDate: Date, nextMonthExpectedDate: Date) => {
      const dateMonthCalculator: DateMonthCalculatorVariableDay =
        new DateMonthCalculatorVariableDay(inputVariableDayType, inputVariableDayNumber, inputEveryMonth);
      let nextDate = dateMonthCalculator.nextDate(inputDate);
      expect(nextDate).toStrictEqual(expectedDate);

      nextDate = dateMonthCalculator.nextDate(nextDate);
      expect(nextDate).toStrictEqual(nextMonthExpectedDate);
    });
});