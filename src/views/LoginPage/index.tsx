"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { BrandLinkText } from "@/styles/shared";

import {
  AccentGlow,
  BackArea,
  BackLink,
  DemoText,
  ErrorMessage,
  Field,
  Form,
  FormPanel,
  GlowLayer,
  LanguageActions,
  LoginCardMotion,
  LoginHeader,
  LoginRoot,
  MutedInput,
  PrimaryGlow,
  SubmitButton,
  Subtitle,
  Title,
} from "./styled";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { login } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (login(email, password)) {
      router.push("/dashboard");
    } else {
      setError(true);
    }
  };

  return (
    <LoginRoot>
      <GlowLayer aria-hidden="true">
        <PrimaryGlow />
        <AccentGlow />
      </GlowLayer>

      <LanguageActions>
        <LanguageSelector />
      </LanguageActions>

      <LoginCardMotion
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <LoginHeader>
          <Link href="/">
            <BrandLinkText>ByteBank</BrandLinkText>
          </Link>
          <Title>{t("login.title")}</Title>
          <Subtitle>{t("login.subtitle")}</Subtitle>
        </LoginHeader>

        <FormPanel>
          <Form onSubmit={handleSubmit}>
            <Field>
              <Label htmlFor="email">{t("login.email")}</Label>
              <MutedInput
                id="email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError(false);
                }}
                placeholder="email@teste.com"
              />
            </Field>
            <Field>
              <Label htmlFor="password">{t("login.password")}</Label>
              <MutedInput
                id="password"
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError(false);
                }}
                placeholder="123"
              />
            </Field>

            {error && <ErrorMessage>{t("login.error")}</ErrorMessage>}

            <SubmitButton type="submit">{t("login.button")}</SubmitButton>
          </Form>

          <DemoText>{t("login.demo")}</DemoText>
        </FormPanel>

        <BackArea>
          <BackLink href="/">{t("login.back")}</BackLink>
        </BackArea>
      </LoginCardMotion>
    </LoginRoot>
  );
}
