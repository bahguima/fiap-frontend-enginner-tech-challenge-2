import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { useAuth } from "@banking/shared/auth";
import { RemoteSlot } from "../components/RemoteSlot";
import { loadRemoteComponent } from "../mf";
import type { IAppProps } from "./interface";
import { ShellMain } from "./styled";

const loadInstitutional = () =>
  loadRemoteComponent("institutional", "App");

const loadDashboard = () => loadRemoteComponent("dashboard", "App");

export const App = ({
  pathname,
  institutionalLoader = loadInstitutional,
  dashboardLoader = loadDashboard,
  "data-testid": dataTestId,
}: IAppProps) => {
  const initialPathname = useRef(
    pathname ?? window.location.pathname,
  );
  const [activePathname, setActivePathname] = useState(
    initialPathname.current,
  );
  const { user, isLoading } = useAuth();
  const isDashboardRoute = activePathname.startsWith("/dashboard");
  const canLoadDashboard = isDashboardRoute && user !== null;

  useEffect(() => {
    if (pathname !== undefined) {
      setActivePathname(pathname);
      return;
    }

    const handleLocationChange = () => {
      setActivePathname(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, [pathname]);

  useEffect(() => {
    if (
      pathname !== undefined ||
      isLoading ||
      user !== null ||
      !initialPathname.current.startsWith("/dashboard") ||
      !activePathname.startsWith("/dashboard")
    ) {
      return;
    }

    window.history.replaceState({}, "", "/login");
    setActivePathname("/login");
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, [activePathname, isLoading, pathname, user]);

  const handleNavigation = (event: MouseEvent<HTMLElement>) => {
    if (!(event.target instanceof Element)) return;

    const anchor = event.target.closest("a");

    if (
      anchor === null ||
      anchor.target === "_blank" ||
      anchor.origin !== window.location.origin
    ) {
      return;
    }

    event.preventDefault();
    window.history.pushState({}, "", anchor.href);
    setActivePathname(anchor.pathname);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <ShellMain data-testid={dataTestId} onClick={handleNavigation}>
      {isDashboardRoute && isLoading ? (
        <p role="status">Verificando sessão...</p>
      ) : canLoadDashboard ? (
        <RemoteSlot
          name="Dashboard"
          loadComponent={dashboardLoader}
          pathname={activePathname}
        />
      ) : (
        <RemoteSlot
          name="Institucional"
          loadComponent={institutionalLoader}
          pathname={isDashboardRoute ? "/login" : activePathname}
        />
      )}
    </ShellMain>
  );
};

export default App;
