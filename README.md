# FIAP Front-End Engineering Tech Challenge 1

Aplicação web de banking digital desenvolvida com Next.js, React e TypeScript. O shell e o dashboard são aplicações Next.js independentes, integradas por rotas com Multi-Zones e apoiadas por contratos REST mockados com MSW.

## Sumario

- [Sobre o projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Estrutura do projeto](#estrutura-do-projeto)
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

O ByteBank simula uma plataforma de controle financeiro pessoal. A aplicação usa TanStack Query e a mesma interface REST nos clientes e handlers MSW para demonstrar autenticação, indicadores e operações com transações.

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

- **Next.js 14**: framework React com App Router.
- **React 18**: biblioteca principal para construcao da interface.
- **React DOM**: renderizacao da aplicacao no navegador.
- **TypeScript**: tipagem estatica do codigo.
- **styled-components**: estilizacao por componentes e SSR via registry customizado.
- **next-themes**: dependencia disponivel para suporte de temas em ambientes Next.js.

### Estado, formularios e validacao

- **React Context API**: controle local de autenticação, tema e idioma.
- **@tanstack/react-query**: estado de servidor, cache de API, queries e mutations.
- **react-hook-form**: construcao de formularios.
- **zod**: validacao de schemas.
- **@hookform/resolvers**: integracao entre `react-hook-form` e `zod`.

### UI e experiencia

- **Radix UI**: componentes acessiveis de baixo nivel.
- **Primitivos Radix instalados**: aspect ratio, collapsible, dialog, dropdown menu, label, select, separator, slot, toast e tooltip.
- **lucide-react**: biblioteca de icones.
- **framer-motion**: animacoes.
- **sonner**: notificacoes/toasts.

### Dados e visualizacao

- **chart.js**: motor de graficos.
- **react-chartjs-2**: integracao entre React e Chart.js.

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
|-- dashboard-remote/           # Zona Next.js independente do dashboard
|-- public/                     # Arquivos publicos
|-- src/
|   |-- app/                    # Rotas do Next.js App Router
|   |-- components/             # Componentes reutilizaveis
|   |   |-- dashboard/          # Componentes do dashboard
|   |   |-- form/               # Formularios
|   |   |-- landing/            # Secoes da landing page
|   |   `-- ui/                 # Componentes de UI base
|   |-- contexts/               # Contextos globais
|   |-- data/                   # Dados mockados
|   |-- hooks/                  # Hooks customizados
|   |-- lib/                    # Regras e utilitarios de negocio
|   |-- styles/                 # Estilos globais e compartilhados
|   |-- test/                   # Configuracao de testes
|   `-- views/                  # Views por pagina/fluxo
|-- eslint.config.js            # Configuracao do ESLint
|-- jest.config.mjs             # Configuracao do Jest
|-- next.config.mjs             # Configuracao do Next.js
|-- package.json                # Scripts e dependencias
`-- tsconfig.json               # Configuracao do TypeScript
```

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

Instale também as dependências independentes do dashboard:

```bash
cd dashboard-remote
npm install
cd ..
```

Inicie o dashboard remoto em um terminal:

```bash
cd dashboard-remote
npm run dev
```

Inicie o shell em outro terminal. `DASHBOARD_REMOTE_URL` usa `http://localhost:3001` por padrão e pode ser sobrescrita no ambiente:

```bash
npm run dev
```

Acesse no navegador:

```text
http://localhost:3000
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
| `/dashboard`           | Zona independente do dashboard |
| `/dashboard/*`         | Subrotas encaminhadas ao dashboard remoto |

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
| `npm run dev`             | Inicia o Next.js em modo desenvolvimento |
| `npm run build`           | Gera o build de producao                 |
| `npm run start`           | Inicia a aplicacao a partir do build     |
| `npm run lint`            | Executa o ESLint                         |
| `npm run typecheck`       | Executa o TypeScript sem emitir arquivos |
| `npm test`                | Executa os testes com Jest               |
| `npm run test:watch`      | Executa testes em modo observacao        |
| `npm run storybook`       | Inicia o Storybook                       |
| `npm run build-storybook` | Gera o build estatico do Storybook       |

## Build de producao

Gere o build:

```bash
npm run build
```

Inicie a aplicacao compilada:

```bash
npm run start
```

Acesse:

```text
http://localhost:3000
```

## Observacoes tecnicas

- O projeto usa Next.js App Router em `src/app`.
- Os estilos globais ficam em `src/styles/global.ts`.
- O SSR do `styled-components` e tratado por `src/lib/styled-components-registry.tsx`.
- O alias `@/` aponta para `src/`.
- Contratos REST, clientes e mocks do shell ficam em `src/api`, `src/lib/http` e `src/mocks`.
- O dashboard mantém configuração, providers, contrato REST, mocks e testes próprios em `dashboard-remote`.
- `/dashboard`, `/dashboard/*` e `/dashboard-assets/*` são encaminhados pelo shell com rewrites definidos em `next.config.mjs`.
- Contextos globais ficam em `src/contexts`.
- Componentes interativos devem declarar `"use client"` no proprio arquivo de entrada quando forem boundaries reutilizaveis do App Router.
- O Storybook usa React/Webpack 5 com SWC e runtime automatico do React.
- O diretorio `storybook-static/` e um artefato gerado e fica ignorado no Git e no ESLint.

## Execução com Docker

Os dois serviços usam builds multi-stage e imagens de produção `standalone`. O shell publica a porta 3000 e encaminha `/dashboard`, `/dashboard/*` e `/dashboard-assets/*` para o serviço `dashboard-remote` na porta 3001.

As variáveis possuem valores padrão seguros no `compose.yaml`. Para inspecionar ou alterar os valores sem adicionar credenciais ao código, use `.env.docker.example` como arquivo de ambiente.

Valide a configuração:

```powershell
docker compose --env-file .env.docker.example config
```

Construa cada imagem de forma independente:

```powershell
docker build --file Dockerfile --tag bytebank-shell:local .
docker build --file dashboard-remote/Dockerfile --tag bytebank-dashboard-remote:local .
```

Construa e inicie os dois serviços pelo Compose:

```powershell
docker compose --env-file .env.docker.example build
docker compose --env-file .env.docker.example up --detach
docker compose --env-file .env.docker.example ps
```

Verifique o shell, o dashboard direto e o dashboard pelo shell:

```powershell
Invoke-WebRequest http://localhost:3000
Invoke-WebRequest http://localhost:3001
Invoke-WebRequest http://localhost:3000/dashboard
```

A validação visual de `http://localhost:3000/dashboard` também confirma o carregamento dos assets em `/dashboard-assets/*` e das respostas REST interceptadas pelo MSW.

Consulte os logs e encerre os serviços com:

```powershell
docker compose --env-file .env.docker.example logs --follow
docker compose --env-file .env.docker.example down
```
