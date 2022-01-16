import { Culture } from "./enums"

export default function getConfiguracion(culture: Culture): LocaleConfiguration {
    const configuration = configurations.find(c => c.culture === culture);
    if (configuration) {
        return configuration;
    }
    throw Error('configuración no encontrada');
}

type TextDictionary = { [code: string]: string };

type LocaleConfiguration = {
    culture: Culture,
    dateFormat: string,
    texts: TextDictionary
}

const configurationEnUS: LocaleConfiguration = {
    culture: Culture.En_US,
    dateFormat: 'MM/dd/yyyy',
    texts: {
        'every': 'every',
        'day': 'day',
        'each': 'each',
        'days': 'days',
        'weeks': 'weeks',
        'on': 'on',
        'the': 'the',
        'of': 'of',
        'at': 'at',
        'between': 'between',
        'any': 'any',
        'and': 'and',
        'Occurs': 'Occurs',
        'starting': 'starting',
        'OccursOnce': 'Occurs once',
        'months': 'months',
        'ScheduleOnce': 'Schedule will be used on',
        'monday': 'monday',
        'tuesday': 'tuesday',
        'wednesday': 'wednesday',
        'thursday': 'thursday',
        'friday': 'friday',
        'saturday': 'saturday',
        'sunday': 'sunday',
        'Hours': 'hours',
        'Minutes': 'minutes',
        'Seconds': 'seconds',
        'OncedateValidation': 'Oncedate must have a value',
        'OccursValidation': 'Occurs must have a value',
        'WeeklyConfigurationValidation': 'DailyConfiguration must have a value',
        'DailyConfigurationValidation': '',
        'MonthlyConfigurationValidation': 'MonthlyConfiguration must have a value',
        'EndTimeNotLessStartTime': 'endTime is not possible to be less than startTime',
        'ExactDayMustHaveValue': 'day must have a value in MonthlyFrecuencyType.exactDay',
        'ExactDayIncorrect': 'day value incorrect in MonthlyFrecuencyType.excatDay',
        'FrecuencyVariableDayValidation': 'frecuencyVariableDay must have a value',
        'VariableDayTypeValidation': 'variableDayType must have a value',
        'EveryMonthsValidation': 'everyMonths mut have a value',
        'DayWeekOverflow': 'Day week overflow',
        'StartDateGreaterCurrentDate': 'startDate is greater than current date. Verify the limits',
        'EndDateLessCurrentDate': 'endDate is less than startDate. Verify the limits',
        'CurrentDateValidation': 'currentDate must have a value',
        'MonthlyFrecuencyTypeValidation': 'is not a MonthlyFrecuencyType supported',
        'NextDateMustHaveValue': 'nexDate must have a value',
        'WeekConfigNotEmpty': 'weekConfig should not be empty',
        'NumberWeeksGraterZero': 'The number of weeks should be grater or igual than zero',
        'TimeUnitNotSupported': 'is not a TimeUnit supported'
    }
};

const configurationEnGb: LocaleConfiguration = {
    culture: Culture.En_GB,
    dateFormat: 'dd/MM/yyyy',
    texts: configurationEnUS.texts
}

const configurationEsEs: LocaleConfiguration = {
    culture: Culture.Es_ES,
    dateFormat: 'dd/MM/yyyy',
    texts: {
        'every': 'cada',
        'day': 'día',
        'each': 'cada',
        'days': 'días',
        'weeks': 'semanas',
        'on': 'en',
        'the': 'el',
        'of': 'de',
        'months': 'meses',
        'at': 'en',
        'between': 'entre',
        'any': 'cualquiera',
        'and': 'y',
        'Occurs': 'Ocurre',
        'starting': 'empezando',
        'OccursOnce': 'Ocurre una vez',
        'ScheduleOnce': 'el horario se usará en',
        'monday': 'lunes',
        'tuesday': 'martes',
        'wednesday': 'miércoles',
        'thursday': 'jueves',
        'friday': 'viernes',
        'saturday': 'sábado',
        'sunday': 'domingo',
        'Hours': 'horas',
        'Minutes': 'minutos',
        'Seconds': 'segundos',
        'OncedateValidation': 'Oncedate debe tener un valor',
        'OccursValidation': 'Occurs debe tener un valor',
        'WeeklyConfigurationValidation': 'DailyConfiguration debe tener un valor',
        'DailyConfigurationValidation': '',
        'MonthlyConfigurationValidation': 'MonthlyConfiguration debe tener un valor',
        'EndTimeNotLessStartTime': 'endTime no puede ser menor que startTime',
        'ExactDayMustHaveValue': 'day debe tener un valor en MonthlyFrecuencyType.exactDay',
        'ExactDayIncorrect': 'El valor de day es incorrecto en MonthlyFrecuencyType.excatDay',
        'FrecuencyVariableDayValidation': 'frecuencyVariableDay debe tener un valor',
        'VariableDayTypeValidation': 'variableDayType debe tener un valor',
        'EveryMonthsValidation': 'everyMonths debe terner un valor',
        'DayWeekOverflow': 'Day week overflow',
        'StartDateGreaterCurrentDate': 'startDate es mayor current date. Verificar los límites',
        'EndDateLessCurrentDate': 'endDate es menor que startDate.  Verificar los límites',
        'CurrentDateValidation': 'currentDate debe tener un valor',
        'MonthlyFrecuencyTypeValidation': 'iMonthlyFrecuencyType no esté soportado',
        'NextDateMustHaveValue': 'nexDate debe tener un valor',
        'WeekConfigNotEmpty': 'weekConfig debe tener un valor',
        'NumberWeeksGraterZero': 'El número de semanas debe ser mayor o igual que cero.',
        'TimeUnitNotSupported': 'TimeUnit no está soportado'
    }
}

const configurations: LocaleConfiguration[] = [
    configurationEnGb,
    configurationEnUS,
    configurationEsEs
]


