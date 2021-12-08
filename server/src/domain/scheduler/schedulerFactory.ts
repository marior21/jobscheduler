import Configuration from "../configuration/configuration";
import { SchedulerType } from "../enums";
import Scheduler from "./scheduler";
import SchedulerOnce from "./schedulerOnce";
import SchedulerRecurring from "./schedulerRecurring";

export default class SchedulerFactory {

    public static create(configuration: Configuration): Scheduler {
        switch (configuration.schedulerType) {
            case SchedulerType.Once:
                return new SchedulerOnce(configuration.enabled, configuration.oncedate, configuration.limits);
            case SchedulerType.Recurring:
                return new SchedulerRecurring(configuration);
        }
    }
}