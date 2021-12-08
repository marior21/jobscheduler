import TimeCalculator from "./timeCalculator";
export default class TimeCalculatorOnce extends TimeCalculator {
    private readonly _occursOnceTime: Date;
    constructor(occursOnceTime: Date, frecuency: number) {
        super(null, null, frecuency)
        this._occursOnceTime = occursOnceTime;
    }

    protected override nextTimeProtected(currentTime: Date): Date {
        this._isLastTime = true;
        const nextTime = new Date(currentTime);
        const occursOnceTime = new Date(nextTime);
        occursOnceTime.setHours(this._occursOnceTime.getHours(), this._occursOnceTime.getMinutes(), this._occursOnceTime.getSeconds());
        if (nextTime.getTime() > occursOnceTime.getTime()) {
            nextTime.setDate(nextTime.getDate() + this._frecuency);
        }
        nextTime.setHours(this._occursOnceTime.getHours(), this._occursOnceTime.getMinutes(), this._occursOnceTime.getSeconds());
        return nextTime;
    }
}