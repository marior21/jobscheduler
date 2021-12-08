import MonthlyConfiguration from "../configuration/monthlyConfiguration";
import { MonthlyFrecuencyType } from "../enums";
import IDateMonthCalculator from "./iDateMonthCalculator";
import DateMonthCalculatorDay from "./dateMonthCalculatorDay";
import DateMonthCalculatorVariableDay from "./dateMonthCalculatorVariableDay";

export default class DateMonthCalculatorFactory {
    public static create(monthlyConfiguration: MonthlyConfiguration): IDateMonthCalculator {
        if (monthlyConfiguration == null) {
            throw Error('monthlyConfiguration argument is required');
        }
        switch (monthlyConfiguration.frecuencyType) {
            case MonthlyFrecuencyType.exactDay:
                return new DateMonthCalculatorDay(monthlyConfiguration.day, monthlyConfiguration.everyMonths);
            case MonthlyFrecuencyType.variableDay:
                return new DateMonthCalculatorVariableDay(monthlyConfiguration.variableDayType, monthlyConfiguration.frecuencyVariableDay, monthlyConfiguration.everyMonths);
            default:
                throw new Error(`${monthlyConfiguration.frecuencyType} is not a MonthlyFrecuencyType supported`);
        }
    }
}