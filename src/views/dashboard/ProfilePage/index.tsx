"use client";

import { Calendar, CreditCard, Mail, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Language, useLanguage } from "@/contexts/LanguageContext";
import { CardTitle, PageStack, PageSubtitle, PageTitle } from "@/styles/shared";

import type { ProfileInfo } from "./interface";
import {
  InfoCard,
  InfoGrid,
  InfoLabel,
  InfoValue,
  LanguageButton,
  LanguageButtons,
  ProfileIconBox,
  SettingsPanel,
} from "./styled";

const langLabels: Record<Language, string> = { pt: "Português", en: "English", es: "Español" };
const languageOptions: Language[] = ["pt", "en", "es"];

export default function ProfilePage() {
  const { user } = useAuth();
  const { t, lang, setLang } = useLanguage();

  const info: ProfileInfo[] = [
    { icon: User, label: t("profile.name"), value: user?.name ?? "Fulano" },
    { icon: Mail, label: t("profile.email"), value: user?.email ?? "email@teste.com" },
    { icon: CreditCard, label: t("profile.plan"), value: "Premium" },
    { icon: Calendar, label: t("profile.since"), value: "Jan 2025" },
  ];

  return (
    <PageStack>
      <div>
        <PageTitle>{t("profile.title")}</PageTitle>
        <PageSubtitle>{t("profile.subtitle")}</PageSubtitle>
      </div>

      <InfoGrid>
        {info.map((item) => (
          <InfoCard key={item.label}>
            <ProfileIconBox>
              <item.icon size={18} />
            </ProfileIconBox>
            <div>
              <InfoLabel>{item.label}</InfoLabel>
              <InfoValue>{item.value}</InfoValue>
            </div>
          </InfoCard>
        ))}
      </InfoGrid>

      <SettingsPanel>
        <div>
          <CardTitle>{t("profile.language")}</CardTitle>
          <LanguageButtons>
            {languageOptions.map((language) => (
              <LanguageButton
                key={language}
                type="button"
                onClick={() => setLang(language)}
                data-active={lang === language || undefined}
              >
                {langLabels[language]}
              </LanguageButton>
            ))}
          </LanguageButtons>
        </div>
      </SettingsPanel>
    </PageStack>
  );
}
