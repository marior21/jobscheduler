import Utils from "../src/utils/utils";


describe('utils', () => {
  test('getDaysInMonth is correct with no leap year', () => {
    expect(Utils.getDaysInMonth(2021, 0)).toStrictEqual(31);
    expect(Utils.getDaysInMonth(2021, 1)).toStrictEqual(28);
    expect(Utils.getDaysInMonth(2021, 2)).toStrictEqual(31);
    expect(Utils.getDaysInMonth(2021, 3)).toStrictEqual(30);
    expect(Utils.getDaysInMonth(2021, 4)).toStrictEqual(31);
    expect(Utils.getDaysInMonth(2021, 5)).toStrictEqual(30);
    expect(Utils.getDaysInMonth(2021, 6)).toStrictEqual(31);
    expect(Utils.getDaysInMonth(2021, 7)).toStrictEqual(31);
    expect(Utils.getDaysInMonth(2021, 8)).toStrictEqual(30);
    expect(Utils.getDaysInMonth(2021, 9)).toStrictEqual(31);
    expect(Utils.getDaysInMonth(2021, 10)).toStrictEqual(30);
    expect(Utils.getDaysInMonth(2021, 11)).toStrictEqual(31);
  });

  test('getDaysInMonth is correct with leap year', () => {
    expect(Utils.getDaysInMonth(2020, 1)).toStrictEqual(29);
  });
});