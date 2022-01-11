import { Culture } from "./enums"

export default function getConfiguracion(culture: Culture): LocaleConfiguration {
    return configurations.find(c => c.culture = culture);
}

type Text = { [code: string]: string };

type LocaleConfiguration = {
    culture: Culture,
    dateFormat: string,
    texts: Text[]
}

const configurationEnUS: LocaleConfiguration = {
    culture: Culture.En_US,
    dateFormat: 'MM/dd/yyyy',
    texts: [
        {
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
            'and': 'any',
            'Occurrs': 'Occurrs',
            'starting': 'starting',
            'OccurrsOnce': 'Ocurrs once',
            'ScheduleOnce': 'Schedule will be used on'
        }
    ]
};

const configurationEnGb: LocaleConfiguration = {
    culture: Culture.En_GB,
    dateFormat: 'dd/MM/yyyy',
    texts: configurationEnUS.texts
}

const configurationEsEs: LocaleConfiguration = {
    culture: Culture.Es_ES,
    dateFormat: 'dd/MM/yyyy',
    texts: [
        {
            'every': 'cada',
            'day': 'día',
            'each': 'cada',
            'days': 'días',
            'weeks': 'semanas',
            'on': 'sobre',
            'the': 'el',
            'of': 'de',
            'months': 'meses',
            'at': 'en',
            'between': 'entre',
            'and': 'y',
            'Occurrs': 'Ocurre',
            'starting': 'a partir de',
            'OccurrsOnce': 'Ocurre una vez',
            'ScheduleOnce': 'el horario se usará en'
        }
    ]
}

const configurations: LocaleConfiguration[] = [
    configurationEnGb,
    configurationEnUS,
    configurationEsEs
]


