import Utils from "../../utils/utils";
import { VariableDayNumber, VariableDayType } from "../enums";
import IDateMonthCalculator from "./iDateMonthCalculator";

export default class DateMonthCalculatorVariableDay implements IDateMonthCalculator {
    private readonly _variableDayType: VariableDayType;
    private readonly _frecuencyVariableDay: VariableDayNumber;
    private readonly _everyMonths: number;
    private _firstExecution: boolean;

    constructor(variableDayType: VariableDayType, frecuencyVariableDay: VariableDayNumber, everyMonths: number) {
        this._everyMonths = everyMonths;
        this._frecuencyVariableDay = frecuencyVariableDay;
        this._variableDayType = variableDayType;
        this._firstExecution = true;
    }
    nextDate(currentDate: Date): Date {
        let nextDate: Date = new Date(currentDate);
        let currentDateTemp: Date = new Date(currentDate);
        if (this._everyMonths > 0 && this._firstExecution === false) {
            nextDate = new Date(
                nextDate.getFullYear(),
                nextDate.getMonth() + this._everyMonths,
                1,
                nextDate.getHours(),
                nextDate.getMinutes(),
                nextDate.getSeconds());
            currentDateTemp = new Date(nextDate);
        }
        let nextTempDate: Date = new Date(nextDate);
        nextTempDate.setDate(1);
        const daysInMonth: number = Utils.getDaysInMonth(nextDate.getFullYear(), nextDate.getMonth());

        nextDate = this.getNextDateFromSteps(nextTempDate, daysInMonth);

        if (nextDate < currentDateTemp) {
            nextTempDate = new Date(nextDate);
            nextTempDate.setDate(1);
            nextTempDate.setMonth(nextDate.getMonth() + 1);
            nextDate = this.getNextDateFromSteps(nextTempDate, daysInMonth);
        }

        this._firstExecution = false;
        return nextDate;
    }

    public get firstExecution(): boolean {
        return this._firstExecution;
    }

    private getNextDateFromSteps(nextTempDate: Date, daysInMonth: number) {
        const stepsDays: Map<number, Date> = this.getStepsDays(daysInMonth, nextTempDate);
        return this._frecuencyVariableDay > 0
            ? stepsDays.get(this._frecuencyVariableDay)
            : Array.from(stepsDays.values()).pop();
    }

    private getStepsDays(daysInMonth: number, nextTempDate: Date): Map<number, Date> {
        const dictionaryDays = new Map();
        let numberOcurrsDay = 0;
        for (let index = 1; index <= daysInMonth; index++) {
            if (DateMonthCalculatorVariableDay.isDayVariableDayType(nextTempDate, this._variableDayType)) {
                numberOcurrsDay++;
                dictionaryDays.set(numberOcurrsDay, new Date(nextTempDate));
            }
            nextTempDate.setDate(nextTempDate.getDate() + 1);
        }
        return dictionaryDays;
    }

    private static isDayVariableDayType(date: Date, dayType: VariableDayType): boolean {
        const numberDay: number = Utils.getDaySpanishFormat(date);
        switch (dayType) {
            case VariableDayType.Day:
                return true;
            case VariableDayType.Weekday:
                return numberDay !== 6 && numberDay !== 7;
            case VariableDayType.Weekendday:
                return numberDay === 6 || numberDay === 7;
            default:
                return numberDay === dayType;
        }
    }
}