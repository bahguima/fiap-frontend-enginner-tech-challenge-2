# Diretrizes do repositório

Estas instruções valem para todo o repositório.

## Stack aprovada

- Use React 18, Next.js 14 com App Router e TypeScript.
- Preserve Radix UI como base de componentes acessíveis.
- Faça customizações visuais com `styled-components`.
- Preserve Jest e React Testing Library para testes.
- Use TanStack Query para todo dado proveniente da API, inclusive consultas, cache, sincronização, loading, erro e mutações.
- Use uma API REST mockada com MSW durante o desenvolvimento e nos testes.
- Não adicione Angular, Redux, Recoil ou GraphQL.

## Responsabilidade de estado

- Context API é permitida somente para autenticação, tema, idioma e estado estritamente visual.
- Estado visual inclui, por exemplo, abertura de sidebar, modal, tooltip e toast.
- Dados de transações, saldos, extratos, perfis remotos e qualquer outro recurso da API são estado de servidor e devem ficar no TanStack Query.
- Não crie novos contextos ou reducers para armazenar respostas da API.
- Autenticação pode expor sessão pelo Context, mas chamadas remotas e cache da sessão devem seguir a camada de API e o TanStack Query.

## Dados e contratos

- A interface consome contratos REST por uma camada de cliente HTTP; componentes não importam fixtures como fonte de dados de servidor.
- O MSW deve interceptar os mesmos endpoints e respeitar os mesmos contratos esperados da API real.
- Handlers do MSW são infraestrutura de desenvolvimento e teste e não devem ser carregados em produção.
- Cálculos e transformações de domínio devem ser entregues pela API prontos para consumo sempre que fizerem parte do contrato.
- Chaves de query devem ser centralizadas por domínio. Mutações devem atualizar ou invalidar explicitamente o cache afetado.

## Organização e evolução

- Preserve a aplicação única atual. Não introduza Nx, Module Federation ou novos remotes sem uma decisão arquitetural posterior.
- Faça a migração do fluxo de transações de forma incremental, mantendo comportamento e cobertura.
- Não amplie `TransactionsContext`; ele é dívida técnica temporária até a adoção dos endpoints REST mockados.
- Consulte `docs/ARCHITECTURE.md` para a arquitetura alvo e `docs/TECHNICAL_DEBT.md` para o inventário de migração.

## Qualidade

- Componentes devem ser pequenos, tipados e acessíveis, priorizando primitivas do Radix UI.
- Testes de comportamento devem preferir consultas semânticas da React Testing Library.
- Toda mudança deve manter estes comandos verdes:

```bash
npm run lint
npm run typecheck
npm test -- --runInBand
npm run build
```

- Corrija falhas de baseline sem aproveitar a tarefa para refatorações ou funcionalidades fora do escopo.
