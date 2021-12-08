import TimeCalculator from "./timeCalculator";

export default class TimeCalculatorMinute extends TimeCalculator {
    private readonly _occursEveryNumber: number;

    constructor(occursEveryNumber: number, startTime: Date, endTime: Date, frecuency: number) {
        super(startTime, endTime, frecuency)
        this._occursEveryNumber = occursEveryNumber;
    }

    protected override nextTimeProtected(currentTime: Date): Date {
        const nextTime = new Date(currentTime);
        nextTime.setMinutes(currentTime.getMinutes() + this._occursEveryNumber);
        return nextTime;
    }
}