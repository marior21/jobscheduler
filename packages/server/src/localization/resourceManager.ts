import { Culture } from "./enums";
import getConfiguracion from "./localeConfigurations";

export default class ResourceManeger {
    public static getString(text: string, resourceCulture: Culture): string {
        const configuration = getConfiguracion(resourceCulture);
        if (configuration == null) {
            throw Error('configuración no encontrada')
        }
        return configuration.texts[text]?.description;
    }
}