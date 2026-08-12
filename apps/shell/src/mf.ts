import type { ComponentType } from "react";
import { loadRemote } from "@module-federation/enhanced/runtime";
import type { IRemoteAppProps } from "./components/RemoteSlot/interface";

interface IRemoteModule {
  default: ComponentType<IRemoteAppProps>;
}

export const loadRemoteComponent = async (
  alias: "institutional" | "dashboard",
  exposeName: string,
) => {
  const remoteModule = await loadRemote<IRemoteModule>(
    `${alias}/${exposeName}`,
  );

  if (remoteModule === null || remoteModule === undefined) {
    throw new Error(`O remote ${alias}/${exposeName} não foi encontrado.`);
  }

  return remoteModule.default;
};
