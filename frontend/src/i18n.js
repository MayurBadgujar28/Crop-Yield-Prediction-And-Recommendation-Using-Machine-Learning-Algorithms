import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";

import enTranslation from "./assets/i18n/translations/en.json";
import mrTranslation from "./assets/i18n/translations/mr.json";


const resources = {
    en: {translations: enTranslation},
    mr: {translations: mrTranslation}
}
i18n.use(Backend)
    .use(initReactI18next)
    .init({
            resources,
            lng: "en",
            fallbackLng: "en",
            debug: true,
            ns: ["translations"],
            defaultNS: "translations",
            keySeparator: false,
            interpolation: {
                escapeValue: false,
                formatSeparator: ",",
            },
            react: {
                wait: true
            },

    });


export default i18n;