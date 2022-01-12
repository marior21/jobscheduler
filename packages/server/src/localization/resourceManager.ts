import { Culture } from "./enums";
import getConfiguracion from "./localeConfigurations";

export default class ResourceManeger {
    public static getString(text: string, resourceCulture: Culture): string {
        const configuration = getConfiguracion(resourceCulture);
        return configuration.texts[text]?.description;
    }
}