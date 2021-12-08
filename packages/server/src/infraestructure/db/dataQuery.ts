import Db from './index';

export default class DataQuery {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static getConfigurations(): Promise<any> {
        return Db.query('SELECT * FROM scheduler_configurations', null);
    }
};