import Configuration from "../../domain/configuration/configuration";
import DataQuery from "../db/dataQuery";

export default class ConfigurationRepository {
    private readonly configurations: Array<Configuration>;

    constructor() {
        this.configurations = new Array<Configuration>();
    }

    public async getConfigurations(): Promise<Configuration[]> {
        if (this.configurations.length > 0) {
            return this.configurations;
        }
        const result = await DataQuery.getConfigurations();
        for (const row of result.rows) {
            this.configurations.push(Configuration.create(row));
        }
        return this.configurations;
    }
}