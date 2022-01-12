import { TimeUnit } from "../enums";

export default class DailyConfiguration {
    private readonly _occursEveryNumber: number | null;
    private readonly _startTime: Date | null;
    private readonly _endTime: Date | null;
    private readonly _timeUnit: TimeUnit | null;
    private readonly _occurOnceTime: Date | null;
    private readonly _frecuency: number | null

    constructor(frecuency: number | null, occurOnceTime: Date | null, timeUnit: TimeUnit | null, occursEveryNumber: number | null, startTime: Date | null, endTime: Date | null) {
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

    get startTime(): Date | null {
        return this._startTime;
    }

    get endTime(): Date | null {
        return this._endTime;
    }

    get occursEveryNumber(): number | null {
        return this._occursEveryNumber;
    }

    get timeUnit(): TimeUnit | null {
        return this._timeUnit;
    }

    get occursOnceTime(): Date | null {
        return this._occurOnceTime;
    }

    get frecuency(): number | null {
        return this._frecuency;
    }
}