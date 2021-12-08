export default class Limits {
    private readonly _startDate: Date;
    private readonly _endDate: Date;


    constructor(startDate: Date, endDate: Date) {
        this._startDate = startDate;
        this._endDate = endDate;
    }

    get startDate(): Date {
        return this._startDate;
    }

    get endDate(): Date {
        return this._endDate;
    }
}