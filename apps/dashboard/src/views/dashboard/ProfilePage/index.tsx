"use client";

import { Calendar, CreditCard, Mail, User } from "lucide-react";
import { QueryState } from "@banking/shared/ui/components/QueryState";
import {
  CardTitle,
  PageStack,
  PageSubtitle,
  PageTitle,
} from "@banking/shared/ui/styles/shared";
import {
  Language,
  useLanguage,
} from "@dashboard/contexts/LanguageContext";
import { useProfileQuery } from "@dashboard/features/dashboard/hooks/useDashboard";

import type { IProfilePageProps, ProfileInfo } from "./interface";
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

const langLabels: Record<Language, string> = {
  pt: "Português",
  en: "English",
  es: "Español",
};
const languageOptions: Language[] = ["pt", "en", "es"];

const ProfilePage = ({
  "data-testid": dataTestId,
}: IProfilePageProps) => {
  const { t, lang, setLang } = useLanguage();
  const profileQuery = useProfileQuery();

  return (
    <PageStack data-testid={dataTestId}>
      <div>
        <PageTitle>{t("profile.title")}</PageTitle>
        <PageSubtitle>{t("profile.subtitle")}</PageSubtitle>
      </div>

      {profileQuery.isPending && (
        <QueryState kind="loading" message="Carregando perfil..." />
      )}
      {profileQuery.isError && (
        <QueryState
          kind="error"
          message="Não foi possível carregar o perfil."
          onRetry={() => profileQuery.refetch()}
        />
      )}
      {profileQuery.data && (
        <ProfileContent
          info={[
            {
              icon: User,
              label: t("profile.name"),
              value: profileQuery.data.name,
            },
            {
              icon: Mail,
              label: t("profile.email"),
              value: profileQuery.data.email,
            },
            {
              icon: CreditCard,
              label: t("profile.plan"),
              value: profileQuery.data.planLabel,
            },
            {
              icon: Calendar,
              label: t("profile.since"),
              value: profileQuery.data.memberSinceLabel,
            },
          ]}
          lang={lang}
          setLang={setLang}
          title={t("profile.language")}
        />
      )}
    </PageStack>
  );
};

interface IProfileContentProps {
  info: ProfileInfo[];
  lang: Language;
  setLang: (language: Language) => void;
  title: string;
}

const ProfileContent = ({
  info,
  lang,
  setLang,
  title,
}: IProfileContentProps) => (
  <>
    <InfoGrid>
      {info.map((item) => (
        <InfoCard key={item.label}>
          <ProfileIconBox aria-hidden="true">
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
        <CardTitle>{title}</CardTitle>
        <LanguageButtons aria-label={title}>
          {languageOptions.map((language) => (
            <LanguageButton
              key={language}
              type="button"
              onClick={() => setLang(language)}
              aria-pressed={lang === language}
              data-active={lang === language || undefined}
            >
              {langLabels[language]}
            </LanguageButton>
          ))}
        </LanguageButtons>
      </div>
    </SettingsPanel>
  </>
);

export default ProfilePage;
