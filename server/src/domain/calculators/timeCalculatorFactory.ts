import DailyConfiguration from "../configuration/dailyConfiguration";
import { TimeUnit } from "../enums";
import TimeCalculator from "./timeCalculator";
import TimeCalculatorHour from "./timeCalculatorHour";
import TimeCalculatorMinute from "./timeCalculatorMinute";
import TimeCalculatorOnce from "./timeCalculatorOnce";
import TimeCalculatorSecond from "./timeCalculatorSecond";

export default class TimeCalculatorFactory {

    public static create(dailayConfiguration: DailyConfiguration): TimeCalculator {
        const { timeUnit, occursEveryNumber, startTime, endTime, occursOnceTime, frecuency } = dailayConfiguration;
        if (timeUnit == null && occursOnceTime == null) {
            return null;
        }
        if (occursOnceTime != null) {
            return new TimeCalculatorOnce(occursOnceTime, frecuency);
        }

        switch (timeUnit) {
            case TimeUnit.Hours:
                return new TimeCalculatorHour(occursEveryNumber, startTime, endTime, frecuency);
            case TimeUnit.Minuts:
                return new TimeCalculatorMinute(occursEveryNumber, startTime, endTime, frecuency);
            case TimeUnit.Seconds:
                return new TimeCalculatorSecond(occursEveryNumber, startTime, endTime, frecuency);
            default:
                throw new Error(`${timeUnit} is not a TimeUnit supported`);
        }
    }
}