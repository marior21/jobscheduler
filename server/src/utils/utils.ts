export default class Utils {
    public static formatDate(date: Date): string {
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }

    public static formatTime(time: Date): string {
        return time.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }

    public static getDaySpanishFormat(date: Date): number {
        return date.getDay() === 0 ? 7 : date.getDay();
    }

    public static isLeapYear(year: number): boolean {
        return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);
    }

    public static getDaysInMonth(year: number, month: number): number {
        return [31, (Utils.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    }

    public static setTime(dateChange: Date, dateTime: Date): void {
        dateChange.setHours(dateTime.getHours());
        dateChange.setMinutes(dateTime.getMinutes());
        dateChange.setSeconds(dateTime.getSeconds());
    }
}