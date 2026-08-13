import type { ComponentType } from "react";

export interface IRemoteAppProps {
  pathname?: string;
}

export type RemoteComponentLoader = () => Promise<
  ComponentType<IRemoteAppProps>
>;

export interface IRemoteSlotProps {
  name: string;
  loadComponent: RemoteComponentLoader;
  pathname?: string;
  "data-testid"?: string;
}
