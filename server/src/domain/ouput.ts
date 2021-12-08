export default class Ouput {
    private readonly _description: string;
    private readonly _nextDate: Date;

    constructor(description: string, nextDate: Date) {
        this._description = description;
        this._nextDate = nextDate;
    }

    get description(): string {
        return this._description;
    }

    get nextDate(): Date {
        return this._nextDate;
    }
}