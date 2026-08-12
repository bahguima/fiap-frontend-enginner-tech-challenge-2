# FIAP Front-End Engineering Tech Challenge 1

Aplicacao web de banking digital desenvolvida em um monorepo Nx com Next.js, React e TypeScript. A composicao incremental usa Module Federation exclusivamente entre aplicacoes React: `shell` como host e `institutional` e `dashboard` como remotes.

## Sumario

- [Sobre o projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Arquitetura](#arquitetura)
- [Requisitos](#requisitos)
- [Como rodar o projeto](#como-rodar-o-projeto)
- [Credenciais de demonstracao](#credenciais-de-demonstracao)
- [Rotas da aplicacao](#rotas-da-aplicacao)
- [Storybook](#storybook)
- [Testes e qualidade](#testes-e-qualidade)
- [Scripts disponiveis](#scripts-disponiveis)
- [Build de producao](#build-de-producao)
- [Observacoes tecnicas](#observacoes-tecnicas)

## Sobre o projeto

O ByteBank simula uma plataforma de controle financeiro pessoal. A aplicação consome contratos REST mockados por MSW e usa TanStack Query para demonstrar autenticação, indicadores, listagem de transações e operações de criação, edição e exclusão de movimentações.

O objetivo do projeto e demonstrar uma arquitetura front-end moderna, componentizada, testavel e preparada para evolucao.

## Funcionalidades

- Landing page responsiva com secoes institucionais.
- Login demonstrativo com validacao simples.
- Dashboard autenticado com resumo financeiro.
- Listagem de transacoes recentes.
- Paginas separadas para extrato, entradas, saidas e perfil.
- Cadastro, edicao, visualizacao e exclusao de transacoes.
- Tema claro e escuro com persistencia em `localStorage`.
- Textos com suporte local a portugues, ingles e espanhol.
- Componentes reutilizaveis baseados em Radix UI e `styled-components`.
- Graficos e indicadores financeiros.
- Storybook configurado para consulta visual dos componentes.

## Tecnologias

### Base da aplicacao

- **Next.js 14**: framework do app legado `banking`, preservado durante a migracao.
- **React 18**: biblioteca principal para construcao da interface.
- **Nx**: grafo de projetos, limites de dependencia, cache e orquestracao.
- **Module Federation + Rspack**: composicao dinamica dos apps React standalone.
- **React DOM**: renderizacao da aplicacao no navegador.
- **TypeScript**: tipagem estatica do codigo.
- **styled-components**: estilizacao por componentes e SSR via registry customizado.
- **next-themes**: dependencia disponivel para suporte de temas em ambientes Next.js.

### Estado, formularios e validacao

- **React Context API**: restrita a autenticacao, tema, idioma e estado visual.
- **@tanstack/react-query**: solucao aprovada para todo estado de servidor.
- **MSW**: API REST mockada em desenvolvimento e testes.
- **react-hook-form**: construcao de formularios.
- **zod**: validacao de schemas.
- **@hookform/resolvers**: integracao entre `react-hook-form` e `zod`.

### UI e experiencia

- **Radix UI**: componentes acessiveis de baixo nivel.
- **Primitivos Radix instalados**: accordion, alert dialog, aspect ratio, avatar, checkbox, collapsible, context menu, dialog, dropdown menu, hover card, label, menubar, navigation menu, popover, progress, radio group, scroll area, select, separator, slider, slot, switch, tabs, toast, toggle, toggle group e tooltip.
- **lucide-react**: biblioteca de icones.
- **framer-motion**: animacoes.
- **sonner**: notificacoes/toasts.
- **cmdk**: componentes de comando e busca.
- **vaul**: drawers e interacoes de painel.
- **input-otp**: campos de codigo/OTP.
- **embla-carousel-react**: carrosseis.
- **react-day-picker**: selecao de datas.
- **react-resizable-panels**: paineis redimensionaveis.

### Dados e visualizacao

- **recharts**: graficos declarativos em React.
- **chart.js**: motor de graficos.
- **react-chartjs-2**: integracao entre React e Chart.js.
- **date-fns**: utilitarios para datas.

### Qualidade e documentacao visual

- **Jest**: testes automatizados.
- **Testing Library React**: testes de componentes e comportamento.
- **Testing Library Jest DOM**: matchers para DOM.
- **ESLint 9**: analise estatica.
- **@eslint/js**: regras base do ESLint.
- **typescript-eslint**: regras de lint para TypeScript.
- **eslint-plugin-react-hooks**: regras para hooks.
- **globals**: definicoes de ambientes globais usadas pelo ESLint.
- **Storybook 8**: documentacao visual e ambiente isolado para componentes.
- **@storybook/react-webpack5**: framework Storybook usado no projeto.
- **@storybook/addon-essentials**: controles, docs e ferramentas essenciais.
- **@storybook/addon-interactions**: suporte a interacoes.
- **@storybook/addon-webpack5-compiler-swc**: compilacao TS/TSX via SWC.
- **Webpack 5**: empacotamento do Storybook.
- **@types/node, @types/react, @types/react-dom e @types/jest**: pacotes de tipagem para desenvolvimento.

## Estrutura do projeto

```text
.
|-- .storybook/                 # Configuracao do Storybook
|-- apps/
|   |-- banking/                # Aplicacao Next.js atual
|   |   |-- public/             # Arquivos publicos
|   |   |-- src/
|   |   |   |-- app/            # Rotas do App Router
|   |   |   |-- components/     # Componentes especificos do app
|   |   |   |-- contexts/       # Tema, idioma e estado visual
|   |   |   |-- features/       # Hooks e query keys por dominio
|   |   |   `-- views/          # Views por pagina/fluxo
|   |   |-- next.config.mjs
|   |   `-- project.json
|   |-- shell/                  # Host/consumer React, porta 4200
|   |-- institutional/          # Remote/provider React, porta 8101
|   `-- dashboard/              # Remote/provider React, porta 8102
|-- docs/                       # Arquitetura e inventario de divida tecnica
|-- libs/shared/
|   |-- api-client/             # Cliente REST tipado
|   |-- auth/                   # Autenticacao global
|   |-- query/                  # Configuracao TanStack Query
|   |-- testing/                # MSW, fixtures e setup Jest
|   |-- types/                  # Contratos compartilhados
|   `-- ui/                     # Radix UI e styled-components
|-- eslint.config.js            # Configuracao do ESLint
|-- jest.config.mjs             # Configuracao do Jest
|-- nx.json                     # Cache e plugins do Nx
|-- package.json                # Scripts e dependencias
`-- tsconfig.base.json          # Aliases compartilhados
```

## Arquitetura

As decisoes definitivas e os limites entre Context API, TanStack Query e MSW estao em [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

O fluxo de transacoes usa TanStack Query e contratos REST mockados por MSW. O Module Federation conecta somente os tres apps React standalone. React, React DOM, styled-components e TanStack Query sao singletons; o `QueryClient` e a autenticacao da composicao existem somente no shell.

O app Next.js `banking` permanece independente como compatibilidade durante a migração. A aplicação federada completa é composta pelo shell: landing e login vêm de `institutional`; dashboard, rotas e análises financeiras vêm de `dashboard`.

## Requisitos

- **Node.js 20.19+** ou **Node.js 22.13+** recomendado.
- **npm** instalado.

> Observacao: algumas dependencias de desenvolvimento emitem alerta de engine em versoes antigas do Node 22. Use Node 20.19+ ou 22.13+ para evitar warnings.

## Como rodar o projeto

Clone o repositorio e acesse a pasta:

```bash
git clone <url-do-repositorio>
cd fiap-frontend-enginner-tech-challenge-1
```

Instale as dependencias:

```bash
npm install
```

Copie `.env.example` para `.env.local` e ajuste a infraestrutura REST do app Next.js:

```text
NEXT_PUBLIC_API_BASE_URL=
NEXT_PUBLIC_API_MOCKING=enabled
NEXT_PUBLIC_API_MOCK_DELAY_MS=150
```

Para builds federados em outros ambientes, forneca as URLs no processo de build:

```text
INSTITUTIONAL_REMOTE_URL=https://institucional.exemplo/remoteEntry.js
DASHBOARD_REMOTE_URL=https://dashboard.exemplo/remoteEntry.js
```

`NEXT_PUBLIC_API_MOCKING=enabled` inicia o MSW somente em desenvolvimento. Use
`disabled` ou remova a variavel para consumir a API configurada. Nos testes, o
MSW e iniciado pelo Jest e requests sem handler provocam falha.

Os handlers aceitam `x-mock-error: true` (ou `?mockError=true`) para simular erro
e `x-mock-delay-ms` para sobrescrever a latencia de uma requisicao.

Inicie shell e remotes. O Nx limita o startup a uma compilacao por vez para reduzir o pico de memoria, mantendo os tres servidores ativos:

```bash
npm run dev
```

Acesse o shell:

```text
http://localhost:4200
```

Os remotes standalone ficam em `http://localhost:8101` e `http://localhost:8102`.

O app Next.js atual continua disponivel separadamente:

```bash
npm run dev:banking
```

## Credenciais de demonstracao

Use as credenciais abaixo para acessar o dashboard:

```text
E-mail: email@teste.com
Senha: 123
```

## Rotas da aplicacao

| Rota                   | Descricao              |
| ---------------------- | ---------------------- |
| `/`                    | Landing page           |
| `/login`               | Tela de login          |
| `/dashboard`           | Visao geral financeira |
| `/dashboard/statement` | Extrato de transacoes  |
| `/dashboard/income`    | Entradas               |
| `/dashboard/expenses`  | Saidas                 |
| `/dashboard/profile`   | Perfil do usuario      |

## Storybook

O Storybook esta configurado para documentar e testar visualmente componentes isolados.

Para iniciar:

```bash
npm run storybook
```

Acesse:

```text
http://localhost:6006
```

````

Para gerar a versao estatica:

```bash
npm run build-storybook
````

A saida sera criada em:

```text
storybook-static/
```

## Testes e qualidade

Executar testes:

```bash
npm test
```

Executar testes em modo watch:

```bash
npm run test:watch
```

Executar typecheck:

```bash
npm run typecheck
```

Executar lint:

```bash
npm run lint
```

## Scripts disponiveis

| Script                    | Descricao                                |
| ------------------------- | ---------------------------------------- |
| `npm run dev`             | Inicia shell e os dois remotes React     |
| `npm run dev:banking`     | Inicia o app Next.js atual               |
| `npm run dev:shell`       | Inicia somente o shell                   |
| `npm run dev:institutional` | Inicia somente o remote institucional  |
| `npm run dev:dashboard`   | Inicia somente o remote de dashboard     |
| `npm run build`           | Gera todos os builds do workspace        |
| `npm run build:federation` | Gera shell e remotes                    |
| `npm run build:shell`     | Gera somente o shell                     |
| `npm run build:institutional` | Gera somente o remote institucional |
| `npm run build:dashboard` | Gera somente o remote de dashboard       |
| `npm run start`           | Inicia a aplicacao a partir do build     |
| `npm run lint`            | Executa o ESLint                         |
| `npm run typecheck`       | Executa o TypeScript sem emitir arquivos |
| `npm test`                | Executa os testes com Jest               |
| `npm run test:watch`      | Executa testes em modo observacao        |
| `npm run storybook`       | Inicia o Storybook                       |
| `npm run build-storybook` | Gera o build estatico do Storybook       |
| `npm run graph`           | Abre o grafo de projetos do Nx           |

## Build de producao

As imagens Docker, o Compose de produção, o ambiente de desenvolvimento com
mocks REST e todos os comandos estão documentados em
[`docs/CONTAINERS.md`](docs/CONTAINERS.md).

Gere todos os builds:

```bash
npm run build
```

Os builds federados tambem podem ser gerados separadamente:

```bash
npm run build:shell
npm run build:institutional
npm run build:dashboard
```

Cada app grava seu artefato em `apps/<nome>/dist`. Os remotes geram `remoteEntry.js`; a hospedagem de cada diretorio pode ser feita de forma independente.

## Observacoes tecnicas

- O projeto usa Next.js App Router em `apps/banking/src/app`.
- O shell e os remotes sao aplicacoes React standalone empacotadas com Rspack.
- O shell carrega apenas o remote da rota atual e isola falhas por remote.
- Os providers de TanStack Query e autenticacao da federacao existem somente no shell.
- Os estilos globais ficam em `apps/banking/src/styles/global.ts`.
- O SSR do `styled-components` e tratado por `apps/banking/src/lib/styled-components-registry.tsx`.
- O alias `@/` aponta para `apps/banking/src/`; bibliotecas usam `@banking/shared/*`.
- O fluxo de transacoes consome uma API REST mockada com MSW por TanStack Query.
- Contextos globais ficam restritos a autenticacao, tema, idioma e estado visual.
- Os targets `lint`, `typecheck`, `test` e `build` sao orquestrados e armazenados em cache pelo Nx.
- Componentes interativos devem declarar `"use client"` no proprio arquivo de entrada quando forem boundaries reutilizaveis do App Router.
- O Storybook usa React/Webpack 5 com SWC e runtime automatico do React.
- O diretorio `storybook-static/` e um artefato gerado e fica ignorado no Git e no ESLint.
