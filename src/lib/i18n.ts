
export type Language = 'en' | 'ha' | 'yo' | 'ig';

export const translations = {
  en: {
    dashboard: "Dashboard",
    welcome: "Welcome back",
    findCircle: "Find a Circle",
    createPlan: "Create Plan",
    kyc: "KYC Verification",
    history: "History",
    settings: "Settings",
    logout: "Logout",
    totalSaved: "Total Saved",
    activeCircles: "Active Circles",
    nextPayout: "Next Payout",
    home: "Home"
  },
  ha: {
    dashboard: "Shafin Farko",
    welcome: "Barka da dawowa",
    findCircle: "Nemi Rukunin Adashe",
    createPlan: "Tsara Adashe",
    kyc: "Tabbatar da Kai",
    history: "Tarihin Aiki",
    settings: "Saituna",
    logout: "Fita",
    totalSaved: "Adadin Kudi",
    activeCircles: "Rukunan da ke Aiki",
    nextPayout: "Biyan Kudi na Gaba",
    home: "Gida"
  },
  yo: {
    dashboard: "Dashboard",
    welcome: "Kaabo pada",
    findCircle: "Wa Circle",
    createPlan: "Dá Ètò",
    kyc: "Ìmúdájú Ìdánimọ̀",
    history: "Ìtàn",
    settings: "Ètò",
    logout: "Jáde",
    totalSaved: "Àpapọ̀ Owó",
    activeCircles: "Àwọn Circle Tí Ó Ń Ṣiṣẹ́",
    nextPayout: "Owó Ìsanwó Tó Kàn",
    home: "Ile"
  },
  ig: {
    dashboard: "Dashboard",
    welcome: "Nnọọ",
    findCircle: "Chọta Circle",
    createPlan: "Mepụta Atụmatụ",
    kyc: "Nkwenye KYC",
    history: "Akụkọ",
    settings: "Ntọala",
    logout: "Pụọ",
    totalSaved: "Ego Atọkọba",
    activeCircles: "Circles Na-arụ Ọrụ",
    nextPayout: "Ego Na-abịa Abịa",
    home: "Ulo"
  }
};

export type TranslationKey = keyof typeof translations['en'];

export function useTranslation(lang: Language = 'en') {
  const t = (key: TranslationKey) => translations[lang]?.[key] || translations['en'][key];
  return { t };
}
