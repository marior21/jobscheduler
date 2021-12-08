import Limits from "../configuration/limits";
import Ouput from "../ouput";
import SchedulerBase from "./scheduler";
import Utils from "../../utils/utils";


export default class SchedulerOnce extends SchedulerBase {
    private readonly _onceDate: Date;
    constructor(enabled: boolean, onceDate: Date, limits: Limits) {
        super(enabled, limits)
        this._onceDate = onceDate;
    }

    protected override getNextDateTimeProtected(): Date {
        return this._onceDate;
    }

    protected override getOuput(date: Date): Ouput {
        const dateOnce: string = Utils.formatDate(date);
        const timeOnce: string = Utils.formatTime(date);
        const description =
            `Ocurrs once. Shedule will be used on ${dateOnce} at ${timeOnce} starting on ${Utils.formatDate(this._limits.startDate)}`;

        return new Ouput(description, date);
    }
}