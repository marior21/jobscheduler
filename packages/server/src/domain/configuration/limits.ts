export default class Limits {
    private readonly _startDate: Date;
    private readonly _endDate: Date | null;


    constructor(startDate: Date, endDate: Date | null) {
        this._startDate = startDate;
        this._endDate = endDate;
    }

    get startDate(): Date {
        return this._startDate;
    }

    get endDate(): Date | null {
        return this._endDate;
    }
}