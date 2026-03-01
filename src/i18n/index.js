import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// English namespaces
import enCommon from "./locales/en/common.json";
import enLogin from "./locales/en/login.json";
import enDashboard from "./locales/en/dashboard.json";
import enVehicle from "./locales/en/vehicle.json";
import enTelemetry from "./locales/en/telemetry.json";
import enAbout from "./locales/en/about.json";

// Vietnamese namespaces
import viCommon from "./locales/vi/common.json";
import viLogin from "./locales/vi/login.json";
import viDashboard from "./locales/vi/dashboard.json";
import viVehicle from "./locales/vi/vehicle.json";
import viTelemetry from "./locales/vi/telemetry.json";
import viAbout from "./locales/vi/about.json";

// ── Detect initial language (same logic as Layout.astro inline script) ──
const LANG_KEY = "vf_language";

function getInitialLanguage() {
  if (typeof window === "undefined") return "en";
  try {
    const stored = localStorage.getItem(LANG_KEY);
    if (stored === "vi" || stored === "en") return stored;
  } catch {}
  const browser = (navigator.language || "").toLowerCase();
  return browser.startsWith("vi") ? "vi" : "en";
}

// ── Init i18next as single source of truth ──
i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
      login: enLogin,
      dashboard: enDashboard,
      vehicle: enVehicle,
      telemetry: enTelemetry,
      about: enAbout,
    },
    vi: {
      common: viCommon,
      login: viLogin,
      dashboard: viDashboard,
      vehicle: viVehicle,
      telemetry: viTelemetry,
      about: viAbout,
    },
  },
  lng: getInitialLanguage(),
  fallbackLng: "en",
  defaultNS: "common",
  ns: ["common", "login", "dashboard", "vehicle", "telemetry", "about"],
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

// ── Sync side-effects on every language change ──
i18n.on("languageChanged", (lng) => {
  if (typeof window === "undefined") return;
  document.documentElement.lang = lng;
  try {
    localStorage.setItem(LANG_KEY, lng);
  } catch {}
});

export default i18n;
