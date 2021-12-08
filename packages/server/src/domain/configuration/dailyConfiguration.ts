import { TimeUnit } from "../enums";

export default class DailyConfiguration {
    private readonly _occursEveryNumber: number;
    private readonly _startTime: Date;
    private readonly _endTime: Date;
    private readonly _timeUnit: TimeUnit;
    private readonly _occurOnceTime: Date;
    private readonly _frecuency:number

    constructor(frecuency:number, occurOnceTime:Date, timeUnit: TimeUnit, occursEveryNumber: number, startTime: Date, endTime: Date) {      
        if (endTime != null && startTime != null && endTime < startTime) {
            throw new Error('endTime is not possible to be less than startTime');
        }
        this._frecuency = frecuency;
        this._occurOnceTime = occurOnceTime;
        this._startTime = startTime;
        this._endTime = endTime;
        this._occursEveryNumber = occursEveryNumber;
        this._timeUnit = timeUnit;
    }

    get startTime(): Date {
        return this._startTime;
    }

    get endTime(): Date {
        return this._endTime;
    }

    get occursEveryNumber(): number {
        return this._occursEveryNumber;
    }

    get timeUnit(): TimeUnit {
        return this._timeUnit;
    }

    get occursOnceTime(): Date {
        return this._occurOnceTime;
    } 

    get frecuency(): number {
        return this._frecuency;
    }
}