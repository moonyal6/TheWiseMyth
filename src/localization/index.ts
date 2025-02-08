import { I18nManager } from "react-native";
import ar from "./languages/ar";
import en from "./languages/en";

// Track current language
let currentLanguage = "ar";
let currentStrings = ar;

// Simple localization object with language switching
const strings = new Proxy(currentStrings, {
  get(target, prop) {
    return currentStrings[prop];
  },
});

export default strings;

// Get current language
export const getCurrentLanguage = () => currentLanguage;

// Change language
export const changeLanguage = (lang: "ar" | "en") => {
  currentLanguage = lang;
  currentStrings = lang === "ar" ? ar : en;
  
  // Handle RTL
  const isRTL = lang === "ar";
  if (I18nManager.isRTL !== isRTL) {
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);
  }
};

// Helper function to get all available languages
export const getAvailableLanguages = () => ["ar", "en"]; 