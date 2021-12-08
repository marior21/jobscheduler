import Week from "./week";

export default class WeeklyConfiguration{
    private readonly _numberWeeks: number;
    private readonly _weekConfig: Week;

    constructor(numberWeeks: number, weekConfig: Week) {       
        this._numberWeeks = numberWeeks;
        this._weekConfig = weekConfig;
    }

    get numberWeeks(): number {
        return this._numberWeeks;
    }

    get weekConfig(): Week {
        return this._weekConfig;
    }
}