import { Culture } from "./enums";
import getConfiguracion from "./localeConfigurations";

export default class CultureManager {
    private static currentCulture: Culture = Culture.En_GB;

    public static getString(text: string,): string {
        const configuration = getConfiguracion(CultureManager.getCurrentCulture());
        return configuration.texts[text];
    }

    public static getCurrentCulture(): Culture {
        return CultureManager.currentCulture;
    }

    public static setCurrentCulture(culture: Culture): void {
        CultureManager.currentCulture = culture;
    }
}