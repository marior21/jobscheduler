import Limits from "../configuration/limits";
import Ouput from "../ouput";
import SchedulerBase from "./scheduler";
import Utils from "../../utils/utils";
import CultureManager from "../..//localization/cultureManager";


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
            `${CultureManager.getString('OccursOnce')}. ${CultureManager.getString('ScheduleOnce')} ${dateOnce} ${CultureManager.getString('at')} ${timeOnce} ${CultureManager.getString('starting')} ${CultureManager.getString('on')} ${Utils.formatDate(this._limits.startDate)}`;

        return new Ouput(description, date);
    }
}