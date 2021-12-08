export default class Week {
    public monday = false;
    public tuesday = false;
    public wednesday = false;
    public thursday = false;
    public friday = false;
    public saturday = false;
    public sunday = false;

    public isDayChoosen(day: number): boolean {
        switch (day) {
            case Week.MONDAY: return this.monday;
            case Week.TUESDAY: return this.tuesday;
            case Week.WEDNESDAY: return this.wednesday;
            case Week.THURSDAY: return this.thursday;
            case Week.FRIDAY: return this.friday;
            case Week.SATURDAY: return this.saturday;
            case Week.SUNDAY: return this.sunday;
            default: throw new Error("Day week overflow");
        }
    }

    public isEmpty(): boolean {
        return this.sunday === false &&
            this.monday === false &&
            this.tuesday === false &&
            this.wednesday === false &&
            this.thursday === false &&
            this.friday === false &&
            this.saturday === false;
    }

    public getDescription(): string {
        const arrayKeys = Object.keys(this).filter(day => this[day]);
        const lastKey = arrayKeys.pop();
        return `${arrayKeys.join(', ')} and ${lastKey}`;
    }

    public static readonly MONDAY = 1;
    public static readonly TUESDAY = 2;
    public static readonly WEDNESDAY = 3;
    public static readonly THURSDAY = 4;
    public static readonly FRIDAY = 5;
    public static readonly SATURDAY = 6;
    public static readonly SUNDAY = 7;
}