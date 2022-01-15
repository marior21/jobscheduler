import CultureManager from "../..//localization/cultureManager";
import { VariableDayNumber, MonthlyFrecuencyType, VariableDayType } from "../enums";

export default class MonthlyConfiguration {
    private readonly _frecuencyType: MonthlyFrecuencyType;
    private readonly _day: number | null;
    private readonly _everyMonths: number | null;
    private readonly _frecuencyVariableDay: VariableDayNumber | null;
    private readonly _variableDayType: VariableDayType | null;

    constructor(
        frecuencyType: MonthlyFrecuencyType,
        day: number | null,
        everyMonths: number | null,
        frecuencyVariableDay: VariableDayNumber | null,
        variableDayType: VariableDayType | null) {

        this._frecuencyType = frecuencyType;
        this._day = day;
        this._everyMonths = everyMonths;
        this._frecuencyVariableDay = frecuencyVariableDay;
        this._variableDayType = variableDayType;
        this.validateArguments();
    }

    get frecuencyType(): MonthlyFrecuencyType {
        return this._frecuencyType;
    }

    get day(): number | null {
        return this._day;
    }

    get everyMonths(): number | null {
        return this._everyMonths;
    }

    get frecuencyVariableDay(): VariableDayNumber | null {
        return this._frecuencyVariableDay;
    }

    get variableDayType(): VariableDayType | null {
        return this._variableDayType;
    }

    validateArguments(): void {
        if (this.frecuencyType === MonthlyFrecuencyType.exactDay) {
            if (this.day == null || this.day === 0) {
                throw new Error(CultureManager.getString('ExactDayMustHaveValue'));
            }

            if (this.day > 31) {
                throw new Error(CultureManager.getString('ExactDayIncorrect'));
            }
        }

        if (this.frecuencyType === MonthlyFrecuencyType.variableDay) {
            if (this.frecuencyVariableDay == null) {
                throw new Error(CultureManager.getString('FrecuencyVariableDayValidation'));
            }
            if (this.variableDayType == null) {
                throw new Error(CultureManager.getString('VariableDayTypeValidation'));
            }
        }
        if (this.everyMonths == null || this.everyMonths == 0) {
            throw new Error(CultureManager.getString('EveryMonthsValidation'));
        }
    }
}