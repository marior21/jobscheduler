import Limits from "./../configuration/limits";
import Ouput from "./../ouput";

export default abstract class Scheduler {
    protected readonly _limits: Limits;
    protected _currentDate: Date;
    private readonly _enabled: boolean;
    constructor(enabled: boolean, limits: Limits) {
        this._enabled = enabled;
        this._limits = limits;
    }

    getNextDateTime(currentDate: Date): Ouput {
        if (this._enabled === false) {
            return null;
        }
        this._currentDate = currentDate;
        if (this._limits.startDate != null && this._limits.startDate > currentDate) {
            throw new Error('currentDate is greater than than startDate. Verify the limits');
        }
        if (this._limits.endDate != null && this._limits.endDate < currentDate) {
            throw new Error('currentDate is less than than startDate. Verify the limits');
        }
        const nextDate = this.getNextDateTimeProtected();
        this._currentDate = null;
        return this.getOuput(nextDate);
    }

    protected abstract getNextDateTimeProtected(): Date

    protected abstract getOuput(date: Date): Ouput
}
