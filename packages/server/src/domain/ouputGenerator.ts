/* eslint-disable @typescript-eslint/no-non-null-assertion */
import CultureManager from "../localization/cultureManager";
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
        const getString = (text: string) => CultureManager.getString(text);
        if (this._configuration.occurs === Occurs.Daily) {
            when = this._configuration.dailyConfiguration?.frecuency === 1
                ? `${getString('every')} ${getString('day')}`
                : `${getString('each')} ${this._configuration.dailyConfiguration?.frecuency} ${getString('days')}`;

        }
        if (this._configuration.occurs == Occurs.Weekly) {
            when = `${getString('every')} ${this._configuration.weeklyConfiguration?.numberWeeks} ${getString('weeks')} ${getString('on')} ${this._configuration.weeklyConfiguration?.weekConfig.getDescription()}`;
        }
        if (this._configuration.occurs == Occurs.Monthly) {
            const { frecuencyType, day, frecuencyVariableDay, variableDayType, everyMonths } = this._configuration.monthlyConfiguration!;
            when = frecuencyType === MonthlyFrecuencyType.variableDay
                ? `${getString('the')} ${frecuencyVariableDay} ${variableDayType}`
                : `${getString('the')} ${getString('day')} ${day}`;
            when += ` ${getString('of')} ${getString('every')} ${everyMonths} ${getString('months')}`;
        }
        if (this._configuration.dailyConfiguration?.occursOnceTime != null) {
            when += ` ${getString('at')} ${Utils.formatTime(this._configuration.dailyConfiguration.occursOnceTime)}`
        }
        if (this._configuration.dailyConfiguration?.occursEveryNumber != null) {
            const dailyConf = this._configuration.dailyConfiguration;
            const startTime = Utils.formatTime(dailyConf.startTime!);
            const endTime = Utils.formatTime(dailyConf.endTime!);
            when += ` ${getString('every')} ${dailyConf.occursEveryNumber} ${TimeUnit[dailyConf.timeUnit!]} between ${startTime} and ${endTime}`;
        }
        const description = `${getString('Occurs')} ${when} ${getString('starting')} ${getString('on')} ${Utils.formatDate(this._configuration.limits.startDate)}`;
        return new Ouput(description, nextDate);
    }
}