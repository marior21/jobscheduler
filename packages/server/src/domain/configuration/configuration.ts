/* eslint-disable @typescript-eslint/no-explicit-any */
import CultureManager from "../..//localization/cultureManager";
import { Occurs, SchedulerType } from "../enums";
import DailyConfiguration from "./dailyConfiguration";
import Limits from "./limits";
import MonthlyConfiguration from "./monthlyConfiguration";
import WeeklyConfiguration from "./weeklyConfiguration";

export default class Configuration {
    private readonly _user: string;
    private readonly _schedulerType: SchedulerType;
    private readonly _occurs: Occurs | null;
    private readonly _enabled: boolean;
    private readonly _limits: Limits;
    private readonly _onceDate: Date | null;
    private readonly _weeklyConfiguration: WeeklyConfiguration | null;
    private readonly _dailyConfiguration: DailyConfiguration | null;
    private readonly _monthlyConfiguration: MonthlyConfiguration | null;

    constructor(
        user: string,
        schedulerType: SchedulerType,
        enabled: boolean,
        occurs: Occurs | null,
        onceDate: Date | null,
        limits: Limits,
        weeklyConfiguration: WeeklyConfiguration | null,
        dailyConfiguration: DailyConfiguration | null,
        monthlyConfiguration: MonthlyConfiguration | null
    ) {
        this._user = user;
        this._schedulerType = schedulerType;
        this._occurs = occurs;
        this._limits = limits;
        this._enabled = enabled;
        this._onceDate = onceDate;
        this._weeklyConfiguration = weeklyConfiguration;
        this._dailyConfiguration = dailyConfiguration;
        this._monthlyConfiguration = monthlyConfiguration;

        this.validateArguments();
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    static create(props: any): Configuration {
        const { user, schedulerType, occurs, enabled, onceDate, startLimitDate } = props;
        return new Configuration(user, schedulerType, enabled, occurs, onceDate, new Limits(startLimitDate, null), null, null, null);
    }

    public get user(): string {
        return this._user;
    }

    public get schedulerType(): SchedulerType {
        return this._schedulerType;
    }

    public get occurs(): Occurs | null {
        return this._occurs;
    }

    public get limits(): Limits {
        return this._limits;
    }

    public get enabled(): boolean {
        return this._enabled;
    }

    public get oncedate(): Date | null {
        return this._onceDate;
    }

    public get weeklyConfiguration(): WeeklyConfiguration | null {
        return this._weeklyConfiguration;
    }

    public get dailyConfiguration(): DailyConfiguration | null {
        return this._dailyConfiguration;
    }

    public get monthlyConfiguration(): MonthlyConfiguration | null {
        return this._monthlyConfiguration;
    }

    validateArguments(): void {
        if (this.schedulerType === SchedulerType.Once && this.oncedate == null) {
            throw new Error(CultureManager.getString('OncedateValidation'));
        }
        if (this.schedulerType === SchedulerType.Recurring) {
            if (this._occurs === null) {
                throw new Error(CultureManager.getString('OccursValidation'));
            }
            if (this.occurs === Occurs.Weekly && this.weeklyConfiguration == null) {
                throw new Error(CultureManager.getString('WeeklyConfigurationValidation'));
            }
            if (this.occurs === Occurs.Daily && this.dailyConfiguration == null) {
                throw new Error(CultureManager.getString('DailyConfigurationValidation'));
            }
            if (this.occurs === Occurs.Monthly && this.monthlyConfiguration == null) {
                throw new Error(CultureManager.getString('MonthlyConfigurationValidation'));
            }
        }
    }
}