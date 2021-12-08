import DateWeekCalculator from "../src/domain/calculators/dateWeekCalculator";
import Week from "../src/domain/configuration/week";


describe('date week calculador', () => {
  test.each([
    [0, new Date(2020, 0, 2), new Date(2020, 0, 3)],
    [0, new Date(2020, 4, 5), new Date(2020, 4, 7)],
    [0, new Date(2020, 4, 9), new Date(2020, 4, 11)],
    [0, new Date(2020, 4, 10), new Date(2020, 4, 11)],
    [0, new Date(2020, 4, 11), new Date(2020, 4, 14)],
    [0, new Date(2020, 4, 12), new Date(2020, 4, 14)],
    [0, new Date(2020, 4, 13), new Date(2020, 4, 14)],
    [0, new Date(2020, 4, 14), new Date(2020, 4, 15)],
    [0, new Date(2020, 4, 15), new Date(2020, 4, 18)],
    [0, new Date(2020, 4, 16), new Date(2020, 4, 18)],

    [1, new Date(2020, 0, 2), new Date(2020, 0, 3)],
    [1, new Date(2020, 4, 5), new Date(2020, 4, 7)],
    [1, new Date(2020, 4, 9), new Date(2020, 4, 18)],
    [1, new Date(2020, 4, 10), new Date(2020, 4, 18)],
    [1, new Date(2020, 4, 11), new Date(2020, 4, 14)],
    [1, new Date(2020, 4, 12), new Date(2020, 4, 14)],
    [1, new Date(2020, 4, 13), new Date(2020, 4, 14)],
    [1, new Date(2020, 4, 14), new Date(2020, 4, 15)],
    [1, new Date(2020, 4, 15), new Date(2020, 4, 22)],
    [1, new Date(2020, 4, 16), new Date(2020, 4, 25)],

    [2, new Date(2020, 0, 2), new Date(2020, 0, 3)],
    [2, new Date(2020, 4, 5), new Date(2020, 4, 7)],
    [2, new Date(2020, 4, 9), new Date(2020, 4, 25)],
    [2, new Date(2020, 4, 10), new Date(2020, 4, 25)],
    [2, new Date(2020, 4, 11), new Date(2020, 4, 14)],
    [2, new Date(2020, 4, 12), new Date(2020, 4, 14)],
    [2, new Date(2020, 4, 13), new Date(2020, 4, 14)],
    [2, new Date(2020, 4, 14), new Date(2020, 4, 15)],
    [2, new Date(2020, 4, 15), new Date(2020, 4, 29)],
    [2, new Date(2020, 4, 16), new Date(2020, 5, 1)]
  ])('next date calculate is correct with %p weeks and monday, thursday and friday, for date input %p', (inputNumberWeeks: number, inputDate: Date, expectedDate: Date) => {
    const week: Week = new Week();
    week.monday = true;
    week.thursday = true;
    week.friday = true;

    const dateCalculator: DateWeekCalculator = new DateWeekCalculator(inputNumberWeeks, week);

    const nextDate = dateCalculator.nextDate(inputDate);

    expect(nextDate).toStrictEqual(expectedDate);
  });

  test.each([
    [0, new Date(2020, 4, 4), new Date(2020, 4, 5)],
    [0, new Date(2020, 4, 5), new Date(2020, 4, 6)],
    [0, new Date(2020, 4, 6), new Date(2020, 4, 10)],
    [0, new Date(2020, 4, 7), new Date(2020, 4, 10)],
    [0, new Date(2020, 4, 8), new Date(2020, 4, 10)],
    [0, new Date(2020, 4, 9), new Date(2020, 4, 10)],
    [0, new Date(2020, 4, 10), new Date(2020, 4, 12)],

    [1, new Date(2020, 4, 4), new Date(2020, 4, 5)],
    [1, new Date(2020, 4, 5), new Date(2020, 4, 6)],
    [1, new Date(2020, 4, 6), new Date(2020, 4, 10)],
    [1, new Date(2020, 4, 7), new Date(2020, 4, 10)],
    [1, new Date(2020, 4, 8), new Date(2020, 4, 10)],
    [1, new Date(2020, 4, 9), new Date(2020, 4, 10)],
    [1, new Date(2020, 4, 10), new Date(2020, 4, 17)],

    [2, new Date(2020, 4, 4), new Date(2020, 4, 5)],
    [2, new Date(2020, 4, 5), new Date(2020, 4, 6)],
    [2, new Date(2020, 4, 6), new Date(2020, 4, 10)],
    [2, new Date(2020, 4, 7), new Date(2020, 4, 10)],
    [2, new Date(2020, 4, 8), new Date(2020, 4, 10)],
    [2, new Date(2020, 4, 9), new Date(2020, 4, 10)],
    [2, new Date(2020, 4, 10), new Date(2020, 4, 24)]
  ])('next date calculate is correct with %p weeks and tuesday, wednesday and sunday, for date input %p', (inputNumberWeeks: number, inputDate: Date, expectedDate: Date) => {
    const week: Week = new Week();
    week.tuesday = true;
    week.wednesday = true;
    week.sunday = true;

    const dateCalculator: DateWeekCalculator = new DateWeekCalculator(inputNumberWeeks, week);

    const nextDate = dateCalculator.nextDate(inputDate);

    expect(nextDate).toStrictEqual(expectedDate);
  });

  test.each([
    [0, new Date(2020, 4, 4), new Date(2020, 4, 5)],
    [0, new Date(2020, 4, 5), new Date(2020, 4, 6)],
    [0, new Date(2020, 4, 6), new Date(2020, 4, 7)],
    [0, new Date(2020, 4, 7), new Date(2020, 4, 8)],
    [0, new Date(2020, 4, 8), new Date(2020, 4, 9)],
    [0, new Date(2020, 4, 9), new Date(2020, 4, 10)],
    [0, new Date(2020, 4, 10), new Date(2020, 4, 11)],

    [1, new Date(2020, 4, 4), new Date(2020, 4, 5)],
    [1, new Date(2020, 4, 5), new Date(2020, 4, 6)],
    [1, new Date(2020, 4, 6), new Date(2020, 4, 7)],
    [1, new Date(2020, 4, 7), new Date(2020, 4, 8)],
    [1, new Date(2020, 4, 8), new Date(2020, 4, 9)],
    [1, new Date(2020, 4, 9), new Date(2020, 4, 10)],
    [1, new Date(2020, 4, 10), new Date(2020, 4, 17)],

    [2, new Date(2020, 4, 4), new Date(2020, 4, 5)],
    [2, new Date(2020, 4, 5), new Date(2020, 4, 6)],
    [2, new Date(2020, 4, 6), new Date(2020, 4, 7)],
    [2, new Date(2020, 4, 7), new Date(2020, 4, 8)],
    [2, new Date(2020, 4, 8), new Date(2020, 4, 9)],
    [2, new Date(2020, 4, 9), new Date(2020, 4, 10)],
    [2, new Date(2020, 4, 10), new Date(2020, 4, 24)]
  ])('next date calculate is correct with %p weeks and monday, tuesday, wednesday, thursday, friday, saturday and sunday, for date input %p', (inputNumberWeeks: number, inputDate: Date, expectedDate: Date) => {
    const week: Week = new Week();
    week.monday = true;
    week.tuesday = true;
    week.wednesday = true;
    week.thursday = true;
    week.friday = true;
    week.saturday = true;
    week.sunday = true;

    const dateCalculator: DateWeekCalculator = new DateWeekCalculator(inputNumberWeeks, week);

    const nextDate = dateCalculator.nextDate(inputDate);

    expect(nextDate).toStrictEqual(expectedDate);
  });

  test('dateCalculator throw error if number of weeks is less than zero', () => {
    const week: Week = new Week();
    week.monday = true;
    expect(() => new DateWeekCalculator(-4, week)).toThrowError();

  });

  test('dateCalculator throw error if week is null', () => {
    const week: Week = new Week();
    week.monday = true;
    expect(() => new DateWeekCalculator(2, null)).toThrowError();

  });

  test('dateCalculator throw error if week is empty', () => {
    const week: Week = new Week();
    expect(() => new DateWeekCalculator(2, week)).toThrowError();

  });
});