import type { IInstitutionalAppProps } from "./interface";
import { BenefitsSection } from "@institutional/components/landing/BenefitsSection";
import { CTASection } from "@institutional/components/landing/CTASection";
import { FeaturesSection } from "@institutional/components/landing/FeaturesSection";
import { Footer } from "@institutional/components/landing/Footer";
import { HeroSection } from "@institutional/components/landing/HeroSection";
import { Navbar } from "@institutional/components/landing/Navbar";
import { TestimonialsSection } from "@institutional/components/landing/TestimonialsSection";
import { LanguageProvider } from "@institutional/contexts/LanguageContext";
import { ThemeProvider } from "@institutional/contexts/ThemeContext";
import LoginPage from "@institutional/views/LoginPage";
import { GlobalStyle } from "@institutional/styles/global";
import { InstitutionalRoot } from "./styled";

export const InstitutionalApp = ({
  pathname = window.location.pathname,
  "data-testid": dataTestId,
}: IInstitutionalAppProps) => {
  const isLoginRoute = pathname === "/login";

  return (
    <ThemeProvider>
      <LanguageProvider>
        <GlobalStyle />
        <InstitutionalRoot data-testid={dataTestId}>
          {isLoginRoute ? (
            <LoginPage />
          ) : (
            <>
              <Navbar />
              <HeroSection />
              <FeaturesSection />
              <BenefitsSection />
              <TestimonialsSection />
              <CTASection />
              <Footer />
            </>
          )}
        </InstitutionalRoot>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default InstitutionalApp;
