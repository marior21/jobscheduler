export default interface IDateMonthCalculator {
    get firstExecution(): boolean;
    nextDate(currentDate: Date): Date;
}