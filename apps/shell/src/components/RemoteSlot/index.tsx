import { useEffect, useId, useState } from "react";
import type { ComponentType } from "react";
import type { IRemoteSlotProps } from "./interface";
import {
  FailureContainer,
  FailureMessage,
  LoadingStatus,
  RetryButton,
  SlotRoot,
} from "./styled";

export const RemoteSlot = ({
  name,
  loadComponent,
  pathname,
  "data-testid": dataTestId,
}: IRemoteSlotProps) => {
  const [RemoteComponent, setRemoteComponent] =
    useState<ComponentType<{ pathname?: string }> | null>(null);
  const [failed, setFailed] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const fallbackTitleId = useId();

  useEffect(() => {
    let active = true;

    const load = async () => {
      setRemoteComponent(null);
      setFailed(false);

      try {
        const component = await loadComponent();

        if (active) {
          setRemoteComponent(() => component);
        }
      } catch (error) {
        if (active) {
          console.error(`Falha ao carregar o remote ${name}.`, error);
          setFailed(true);
        }
      }
    };

    void load();

    return () => {
      active = false;
    };
  }, [loadComponent, name, retryCount]);

  const handleRetry = () => {
    setRetryCount((currentRetryCount) => currentRetryCount + 1);
  };

  if (failed) {
    return (
      <SlotRoot data-testid={dataTestId} aria-label={name}>
        <FailureContainer
          role="alert"
          aria-live="assertive"
          aria-labelledby={fallbackTitleId}
        >
          <h2 id={fallbackTitleId}>Não foi possível carregar {name}</h2>
          <FailureMessage>
            O conteúdo está temporariamente indisponível.
          </FailureMessage>
          <RetryButton type="button" onClick={handleRetry}>
            Tentar novamente
          </RetryButton>
        </FailureContainer>
      </SlotRoot>
    );
  }

  if (RemoteComponent === null) {
    return (
      <SlotRoot data-testid={dataTestId} aria-label={name}>
        <LoadingStatus role="status" aria-live="polite">
          Carregando {name}
        </LoadingStatus>
      </SlotRoot>
    );
  }

  return (
    <SlotRoot data-testid={dataTestId} aria-label={name}>
      <RemoteComponent pathname={pathname} />
    </SlotRoot>
  );
};
