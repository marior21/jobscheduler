export default abstract class TimeCalculator {

    protected readonly _startTime: Date;
    protected readonly _endTime: Date;
    protected readonly _frecuency: number;
    protected _isLastTime = false;;

    constructor(startTime: Date, endTime: Date, frecuncy: number) {
        if (endTime != null && startTime != null && endTime < startTime) {
            throw new Error('endTime is not possible to be less than startTime');
        }
        this._startTime = startTime;
        this._endTime = endTime;
        this._frecuency = frecuncy;
    }

    get isLastTime(): boolean {
        return this._isLastTime;
    }

    public nextTime(currentTime: Date): Date {
        let nextTime: Date = new Date(currentTime);
        this._isLastTime = false;
        if (this.isLessThanStarTime(nextTime)) {
            nextTime.setHours(this._startTime.getHours(), this._startTime.getMinutes(), this._startTime.getSeconds());
            return nextTime;
        }
        if (this.isGreaterThanEndTime(nextTime)) {
            this._isLastTime = true;
            nextTime.setDate(nextTime.getDate() + this._frecuency);
            nextTime.setHours(this._startTime.getHours(), this._startTime.getMinutes(), this._startTime.getSeconds());
            return nextTime;
        }

        nextTime = this.nextTimeProtected(currentTime);
        if (this.isGreaterThanEndTime(nextTime)) {
            this._isLastTime = true;
            nextTime.setDate(nextTime.getDate() + this._frecuency);
            nextTime.setHours(this._startTime.getHours(), this._startTime.getMinutes(), this._startTime.getSeconds());
        }

        return nextTime;
    }

    private isLessThanStarTime(date: Date): boolean {
        if (this._startTime == null) {
            return false;
        }
        const startTime = new Date(date);
        startTime.setHours(this._startTime.getHours(), this._startTime.getMinutes(), this._startTime.getSeconds());
        return date.getTime() < startTime.getTime();
    }

    private isGreaterThanEndTime(date: Date): boolean {
        if (this._endTime == null) {
            return false;
        }
        const endTime = new Date(date);
        endTime.setHours(this._endTime.getHours(), this._endTime.getMinutes(), this._endTime.getSeconds());
        return date.getTime() > endTime.getTime();
    }

    protected abstract nextTimeProtected(currentTime: Date): Date;
}