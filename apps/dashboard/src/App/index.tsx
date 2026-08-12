import type { IDashboardAppProps } from "./interface";
import { LanguageProvider } from "@dashboard/contexts/LanguageContext";
import { ThemeProvider } from "@dashboard/contexts/ThemeContext";
import DashboardLayout from "@dashboard/views/dashboard/DashboardLayout";
import ExpensesPage from "@dashboard/views/dashboard/ExpensesPage";
import IncomePage from "@dashboard/views/dashboard/IncomePage";
import OverviewPage from "@dashboard/views/dashboard/OverviewPage";
import ProfilePage from "@dashboard/views/dashboard/ProfilePage";
import StatementPage from "@dashboard/views/dashboard/StatementPage";
import { GlobalStyle } from "@dashboard/styles/global";
import { DashboardRoot } from "./styled";

export const DashboardApp = ({
  pathname = window.location.pathname,
  loginUrl = "/login",
  "data-testid": dataTestId,
}: IDashboardAppProps) => {
  let page = <OverviewPage />;

  if (pathname === "/dashboard/statement") {
    page = <StatementPage />;
  } else if (pathname === "/dashboard/income") {
    page = <IncomePage />;
  } else if (pathname === "/dashboard/expenses") {
    page = <ExpensesPage />;
  } else if (pathname === "/dashboard/profile") {
    page = <ProfilePage />;
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <GlobalStyle />
        <DashboardRoot data-testid={dataTestId}>
          <DashboardLayout loginUrl={loginUrl}>{page}</DashboardLayout>
        </DashboardRoot>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default DashboardApp;
