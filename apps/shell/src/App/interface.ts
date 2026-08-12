import type { RemoteComponentLoader } from "../components/RemoteSlot/interface";

export interface IAppProps {
  pathname?: string;
  institutionalLoader?: RemoteComponentLoader;
  dashboardLoader?: RemoteComponentLoader;
  "data-testid"?: string;
}
