import Utils from "../utils/utils";
import Configuration from "./configuration/configuration";
import { MonthlyFrecuencyType, Occurs, TimeUnit } from "./enums";
import Ouput from "./ouput";

export default class OuputGenerator {
    private readonly _configuration: Configuration;

    constructor(configuration: Configuration) {
        this._configuration = configuration;
    }

    public getOuput(nextDate: Date): Ouput {
        let when = '';
        if (this._configuration.ocurrs === Occurs.Daily) {
            when = this._configuration.dailyConfiguration.frecuency === 1
                ? 'every day'
                : `each ${this._configuration.dailyConfiguration.frecuency} days`;

        }
        if (this._configuration.ocurrs == Occurs.Weekly) {
            when = `every ${this._configuration.weeklyConfiguration.numberWeeks} weeks on ${this._configuration.weeklyConfiguration.weekConfig.getDescription()}`;
        }
        if (this._configuration.ocurrs == Occurs.Monthly) {
            const { frecuencyType, day, frecuencyVariableDay, variableDayType, everyMonths } = this._configuration.monthlyConfiguration;
            when = frecuencyType === MonthlyFrecuencyType.variableDay
                ? `the ${frecuencyVariableDay} ${variableDayType}`
                : `the day ${day}`;
            when += ` of very ${everyMonths} months`;
        }
        if (this._configuration.dailyConfiguration?.occursOnceTime != null) {
            when += ` at ${Utils.formatTime(this._configuration.dailyConfiguration.occursOnceTime)}`
        }
        if (this._configuration.dailyConfiguration?.occursEveryNumber != null) {
            const dailyConf = this._configuration.dailyConfiguration;
            const startTime = Utils.formatTime(dailyConf.startTime);
            const endTime = Utils.formatTime(dailyConf.endTime);
            when += ` every ${dailyConf.occursEveryNumber} ${TimeUnit[dailyConf.timeUnit]} between ${startTime} and ${endTime}`;
        }
        const description = `Ocurrs ${when} starting on ${Utils.formatDate(this._configuration.limits.startDate)}`;
        return new Ouput(description, nextDate);
    }
}