import Utils from "../../utils/utils";
import Week from "../configuration/week";

export default class DateWeekCalculator {
    private static readonly daysOfWeek: number = 7;

    private readonly _numberWeeks: number;
    private readonly _weekConfig: Week;
    constructor(numberWeeks: number, weekConfig: Week) {
        this.validateArguments(numberWeeks, weekConfig);
        this._numberWeeks = numberWeeks;
        this._weekConfig = weekConfig;
    }
    private validateArguments(numberWeeks: number, weekConfig: Week) {
        if (numberWeeks < 0) {
            throw new Error("The number of weeks should be grater or igual than zero");
        }
        if (weekConfig == null) {
            throw new Error("weekConfig is required");
        }
        if (weekConfig.isEmpty()) {
            throw new Error("weekConfig should not be empty");
        }
    }

    public nextDate(currentDate: Date): Date {
        const nextDate: Date = new Date(currentDate);
        let currentWeekDay: number = Utils.getDaySpanishFormat(currentDate);
        const isCurrentWeekDayChoosen: boolean = this._weekConfig.isDayChoosen(currentWeekDay);
        let numberDaysToSum = this.getNumberDays(
            isCurrentWeekDayChoosen ? currentWeekDay + 1 : currentWeekDay, isCurrentWeekDayChoosen ? 1 : 0);
        if (numberDaysToSum > 0) {
            //the next date is inside the actual week
            nextDate.setDate(nextDate.getDate() + numberDaysToSum);
        }
        else {
            //the next date is in de next (numberWeeks) weeks
            nextDate.setDate(nextDate.getDate() + (this._numberWeeks * DateWeekCalculator.daysOfWeek));
            if (this._weekConfig.isDayChoosen(Utils.getDaySpanishFormat(nextDate)) && nextDate.getTime() !== currentDate.getTime()) {
                return nextDate;
            }
            //the next date is not inside the week and is necessary to position in next week
            nextDate.setDate(
                nextDate.getDate() + ((DateWeekCalculator.daysOfWeek + 1) - Utils.getDaySpanishFormat(nextDate)));
            currentWeekDay = Utils.getDaySpanishFormat(nextDate);
            numberDaysToSum = this.getNumberDays(currentWeekDay, 0);
            if (numberDaysToSum > 0) {
                nextDate.setDate(nextDate.getDate() + numberDaysToSum);
            }

        }
        return nextDate;
    }

    private getNumberDays(startDay: number, startNumber: number): number {
        let numberDaysToSum = startNumber;
        let dayChoosen = false;
        for (let day = startDay; day <= DateWeekCalculator.daysOfWeek; day++) {
            if (this._weekConfig.isDayChoosen(day)) {
                dayChoosen = true;
                break;
            }
            numberDaysToSum++;
        }
        return dayChoosen ? numberDaysToSum : 0;
    }
}