import Configuration from "../configuration/configuration";
import Ouput from "../ouput";
import SchedulerBase from "./scheduler";
import TimeCalculator from "../calculators/timeCalculator";
import TimeCalculatorFactory from "../calculators/timeCalculatorFactory";
import DateWeekCalculator from "../calculators/dateWeekCalculator";
import OuputGenerator from "../ouputGenerator";
import DateMonthCalculatorFactory from "../calculators/dateMonthCalculatorFactory";
import IDateMonthCalculator from "../calculators/iDateMonthCalculator";
import Utils from "../../utils/utils";

export default class SchedulerRecurring extends SchedulerBase {
    private readonly _configuration: Configuration;
    private readonly _ouputGenerator: OuputGenerator;
    private readonly _timeCalculator: TimeCalculator;
    private readonly _dateWeekCalculator: DateWeekCalculator;
    private readonly _dateMonthCalculator: IDateMonthCalculator;

    constructor(configuration: Configuration) {
        super(configuration.enabled, configuration.limits)
        this._configuration = configuration;
        this._ouputGenerator = new OuputGenerator(configuration);
        if (this._configuration.dailyConfiguration != null) {
            this._timeCalculator = TimeCalculatorFactory.create(this._configuration.dailyConfiguration);
        }
        if (this._configuration.weeklyConfiguration != null) {
            this._dateWeekCalculator =
                new DateWeekCalculator(this._configuration.weeklyConfiguration.numberWeeks, this._configuration.weeklyConfiguration.weekConfig);
        }
        if (this._configuration.monthlyConfiguration != null) {
            this._dateMonthCalculator =
                DateMonthCalculatorFactory.create(this._configuration.monthlyConfiguration);
        }
    }

    protected override getNextDateTimeProtected(): Date {
        let nextDate: Date = new Date(this._currentDate);
        if (this._configuration.dailyConfiguration != null) {
            if (this._timeCalculator != null) {
                nextDate = this._timeCalculator.nextTime(nextDate);
                if (this._timeCalculator.isLastTime === false &&
                    (this._dateMonthCalculator == null || this._dateMonthCalculator.firstExecution == false)) {
                    return nextDate;
                }
            }
            else {
                nextDate.setDate(nextDate.getDate() + this._configuration.dailyConfiguration.frecuency);
            }
        }
        if (this._dateWeekCalculator != null) {
            nextDate = this._dateWeekCalculator.nextDate(nextDate);
        }
        const firstExecution: boolean =
            this._dateMonthCalculator != null && (this._timeCalculator?.isLastTime || this._dateMonthCalculator.firstExecution);
        if (this._dateMonthCalculator != null || firstExecution) {
            if (this._configuration.dailyConfiguration?.startTime != null) {
                const starTimeDaily = this._configuration.dailyConfiguration.startTime;
                Utils.setTime(nextDate, starTimeDaily);
            }
            nextDate = this._dateMonthCalculator.nextDate(nextDate);
        }
        return nextDate;
    }

    protected override getOuput(nextDate: Date): Ouput {
        return this._ouputGenerator.getOuput(nextDate);
    }
}