import Utils from "../../utils/utils";
import IDateMonthCalculator from "./iDateMonthCalculator";

export default class DateMonthCalculatorDay implements IDateMonthCalculator {
    private readonly _day: number;
    private readonly _everyMonths: number;
    private _firstExecution = true;
    constructor(day: number, everyMonths: number) {
        this._day = day;
        this._everyMonths = everyMonths;
    }

    public get firstExecution(): boolean {
        return this._firstExecution;
    }

    nextDate(currentDate: Date): Date {
        const nextDate = new Date(currentDate);
        if (nextDate.getDate() == this._day) {
            const date = nextDate.getDate();
            nextDate.setDate(1);
            nextDate.setMonth(nextDate.getMonth() + this._everyMonths * 1);
            nextDate.setDate(Math.min(date, Utils.getDaysInMonth(nextDate.getFullYear(), nextDate.getMonth())));
        }
        else {
            while (nextDate.getDate() != this._day) {
                nextDate.setDate(nextDate.getDate() + 1);
            }
        }
        this._firstExecution = false;
        return nextDate;
    }

}