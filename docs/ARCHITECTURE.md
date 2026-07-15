# Arquitetura do Tech Challenge

## Objetivo

Esta é a arquitetura-alvo do ByteBank para a evolução do Tech Challenge. Ela preserva a interface existente, estabelece uma única estratégia para estado de servidor e mantém os mocks atrás do mesmo contrato REST que uma API real usará.

O estado atual compila e executa, mas ainda não implementa toda esta arquitetura. As diferenças conhecidas estão registradas em `TECHNICAL_DEBT.md`.

## Decisões definitivas

| Área | Decisão |
| --- | --- |
| Runtime de UI | React 18 |
| Framework | Next.js 14, App Router |
| Componentes | Radix UI |
| Estilos | `styled-components` |
| Estado de servidor | TanStack Query |
| Estado global de cliente | Context API somente para autenticação, tema, idioma e estado visual |
| Integração | API REST |
| Mock da API | MSW |
| Testes | Jest e React Testing Library |
| Fora do escopo | Angular, Redux, Recoil, GraphQL, Nx e Module Federation |

As versões resolvidas na baseline são Next.js 14.2.35, React 18.3.1 e React DOM 18.3.1.

## Multi-Zones

O shell permanece na raiz do repositório e o `dashboard-remote` permanece uma aplicação Next.js independente. O shell encaminha `/dashboard` e `/dashboard/*` para a URL definida em `DASHBOARD_REMOTE_URL` por rewrites `beforeFiles`, sem iframe, health check de apresentação ou compartilhamento de Context.

O dashboard usa o `assetPrefix` exclusivo `/dashboard-assets`. O shell encaminha esse prefixo ao remoto para impedir colisões entre chunks dos dois builds Next.js. Cada aplicação mantém seu próprio `package.json`, lockfile, `next.config.mjs`, `tsconfig.json`, providers e configuração de testes para poder instalar, testar, compilar e executar isoladamente.

## Visão em camadas

```text
src/app (rotas, layouts e composição de providers)
        |
src/views e src/components (renderização e interação)
        |
hooks de domínio do TanStack Query
        |
cliente REST e contratos tipados
        |
API real ou handlers MSW com o mesmo contrato
```

- `src/app`: define rotas, layouts e fronteiras de renderização do App Router.
- `src/views`: compõe a tela de uma rota sem armazenar estado de servidor em Context.
- `src/components`: mantém componentes de UI e de domínio reutilizáveis.
- hooks de domínio: são a interface das telas para queries e mutations.
- cliente REST: concentra URL, serialização, tratamento de status e erros.
- `src/mocks`: concentra fixtures e handlers MSW, sem ser importado por componentes.

## Organização-alvo incremental

```text
src/
|-- app/
|-- components/
|   |-- ui/
|   `-- <dominio>/
|-- contexts/
|   |-- AuthContext.tsx
|   |-- LanguageContext.tsx
|   `-- ThemeContext.tsx
|-- features/
|   `-- transactions/
|       |-- api/
|       |-- hooks/
|       `-- interface.ts
|-- lib/
|   |-- http/
|   `-- query/
|-- mocks/
|   |-- fixtures/
|   |-- handlers/
|   |-- browser.ts
|   `-- server.ts
|-- styles/
|-- test/
`-- views/
```

Essa estrutura é um destino de migração, não uma autorização para mover todos os arquivos de uma vez. Cada alteração deve ser pequena, testada e preservar o comportamento.

## Modelo de estado

### Context API

Context pode guardar apenas:

- sessão e identidade necessárias à autenticação;
- preferência de tema;
- idioma atual;
- estado visual compartilhado, como abertura de navegação ou painéis.

O contexto de sidebar atual é compatível porque representa apenas estado visual. Dados de transações não são compatíveis, mesmo quando inicialmente mockados.

### TanStack Query

Todo dado que conceitualmente pertence ao servidor usa TanStack Query:

- listagens e detalhes;
- resumos e indicadores;
- paginação, filtros e ordenação enviados à API;
- criação, edição e exclusão;
- estados de carregamento, erro, retry e invalidação.

Query keys devem ser centralizadas por domínio. Mutations devem atualizar ou invalidar o cache de forma explícita. Componentes consomem hooks do domínio e não conhecem handlers MSW.

### Estado local

Valores temporários de input, abertura de modal de uma única tela e estado efêmero de interação permanecem locais. Formulários continuam com React Hook Form e Zod enquanto essas dependências fizerem parte da solução.

## Contrato REST e MSW

A primeira migração de domínio deve definir recursos REST para transações, por exemplo:

```text
GET    /api/transactions
GET    /api/transactions/:id
POST   /api/transactions
PUT    /api/transactions/:id
DELETE /api/transactions/:id
GET    /api/transactions/summary
```

Os endpoints finais devem ser confirmados antes da implementação. O MSW responde a esses endpoints em desenvolvimento e no Jest. A aplicação deve trocar o mock por uma API real apenas por configuração, sem alterar componentes ou hooks.

O worker do browser não deve ser incluído no bundle de produção. O servidor de testes deve iniciar no setup do Jest, rejeitar requests sem handler e ser restaurado após cada teste.

## Renderização e providers

- Server Components são o padrão.
- QueryClient, Contexts e primitives interativos ficam em uma fronteira client pequena.
- O QueryClient deve existir uma vez por sessão do browser.
- A ordem conceitual é: infraestrutura de query, preferências globais permitidas, providers visuais e conteúdo.
- O registry de `styled-components` permanece no layout raiz para SSR.

Quando houver necessidade real de prefetch no servidor, use dehydration/hydration do TanStack Query em uma decisão incremental; ela não é requisito desta baseline.

## Estratégia de testes

- componentes puros: Jest + React Testing Library;
- hooks e fluxos de servidor: QueryClient isolado por teste + MSW Node;
- handlers: cenários de sucesso, vazio, validação e erro HTTP;
- páginas: comportamento observável, evitando acoplamento à implementação interna;
- regressões: teste próximo à camada responsável.

Os testes existentes continuam em Jest. Não há migração para Vitest nesta arquitetura.

## Sequência recomendada de adoção

1. Instalar e configurar MSW para browser e Jest.
2. Definir contratos REST tipados do domínio de transações.
3. Criar cliente REST e hooks TanStack Query.
4. Cobrir o fluxo atual com testes de integração usando MSW.
5. Migrar as views de transações sem alterar o comportamento visual.
6. Remover `TransactionsContext`, reducer, dados locais e cálculos que passarem para a API.
7. Repetir o padrão apenas nos próximos domínios que realmente possuírem estado de servidor.

Nx, Module Federation e novas funcionalidades não fazem parte dessa sequência.
