/* eslint-disable @typescript-eslint/no-non-null-assertion */
import MonthlyConfiguration from "../configuration/monthlyConfiguration";
import { MonthlyFrecuencyType } from "../enums";
import IDateMonthCalculator from "./iDateMonthCalculator";
import DateMonthCalculatorDay from "./dateMonthCalculatorDay";
import DateMonthCalculatorVariableDay from "./dateMonthCalculatorVariableDay";
import CultureManager from "../../localization/cultureManager";

export default class DateMonthCalculatorFactory {
    public static create(monthlyConfiguration: MonthlyConfiguration): IDateMonthCalculator {
        switch (monthlyConfiguration.frecuencyType) {
            case MonthlyFrecuencyType.exactDay:
                return new DateMonthCalculatorDay(monthlyConfiguration.day!, monthlyConfiguration.everyMonths!);
            case MonthlyFrecuencyType.variableDay:
                return new DateMonthCalculatorVariableDay(monthlyConfiguration.variableDayType!, monthlyConfiguration.frecuencyVariableDay!, monthlyConfiguration.everyMonths!);
            default:
                throw new Error(`${monthlyConfiguration.frecuencyType} ${CultureManager.getString('MonthlyFrecuencyTypeValidation')}`);
        }
    }
}