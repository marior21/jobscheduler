import Configuration from '../../src/domain/configuration/configuration';
import ConfigurationRepository from '../../src/infraestructure/repositories/configurationsRepository';

describe('configuration', () => {
    test('connect database and get configurations', async () => {
        const configurations: Configuration[] = await new ConfigurationRepository().getConfigurations();
        const configuration: Configuration = configurations[0];
        expect(configuration.ocurrs).toStrictEqual(0);
        expect(configuration.enabled).toStrictEqual(true);
    });
});