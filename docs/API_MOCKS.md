# Contratos REST e MSW

A aplicação possui um cliente REST centralizado em `src/lib/http`, contratos em `src/api/contracts` e clientes por domínio em `src/api`. Os mesmos endpoints são interceptados pelo MSW no navegador e no Jest; trocar o mock por uma API real exige apenas configuração.

## Configuração

Copie `.env.example` para `.env.local` durante o desenvolvimento.

| Variável | Valor padrão | Finalidade |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | `/api` | URL base consumida pelo cliente REST. |
| `NEXT_PUBLIC_API_MOCKING` | desabilitado | Use `enabled` para iniciar o worker no navegador em desenvolvimento. |
| `NEXT_PUBLIC_MSW_SCENARIO` | `success` | Use `error` para todas as rotas responderem com HTTP 503. |
| `NEXT_PUBLIC_MSW_DELAY_MS` | `300` no navegador e `0` no Jest | Latência artificial aplicada pelos handlers. |
| `MSW_ENABLED` | habilitado | Use `false` para não iniciar o servidor MSW no Jest. |

As variáveis públicas são incorporadas pelo Next.js no build. Reinicie o servidor de desenvolvimento depois de alterá-las.

Em testes e depuração, uma requisição pode sobrescrever o cenário global com os headers `x-mock-scenario: success|error` e `x-mock-delay: <milissegundos>`.

## Autenticação mockada

- E-mail: `email@teste.com`
- Senha: `123`
- Token emitido: `mock-access-token`

Exceto o login, todos os recursos exigem `Authorization: Bearer mock-access-token`.

## Endpoints

| Método | Endpoint | Resposta principal |
| --- | --- | --- |
| `POST` | `/api/auth/login` | Sessão, token e usuário. |
| `GET` | `/api/auth/session` | Sessão atual. |
| `POST` | `/api/auth/logout` | HTTP 204. |
| `GET` | `/api/dashboard` | Resumo, série mensal e transações recentes. |
| `GET` | `/api/transactions` | Lista paginada; aceita `page`, `pageSize`, `type`, `status` e `categoryId`. |
| `POST` | `/api/transactions` | Criação de transação. |
| `GET` | `/api/transactions/:id` | Detalhe de transação. |
| `PUT` | `/api/transactions/:id` | Atualização de transação. |
| `DELETE` | `/api/transactions/:id` | Exclusão com HTTP 204. |
| `GET` | `/api/categories` | Categorias de transação. |
| `GET` | `/api/transactions/:id/attachments` | Anexos da transação. |
| `POST` | `/api/transactions/:id/attachments` | Upload multipart no campo `file`. |
| `GET` | `/api/attachments/:id` | Metadados do anexo. |
| `GET` | `/api/attachments/:id/content` | Conteúdo simulado do anexo. |
| `DELETE` | `/api/attachments/:id` | Exclusão com HTTP 204. |

Os uploads aceitam PDF, JPEG e PNG de até 5 MB. Erros seguem o contrato `{ code, message, details? }` e representam autenticação, validação, conflito, recurso ausente e indisponibilidade.

## Fronteiras atuais

O shell consome seus contratos REST por clientes de domínio e hooks do TanStack Query. O `dashboard-remote` mantém contrato e fixture próprios para `GET /api/dashboard/overview`; essa duplicação de infraestrutura é intencional para preservar a instalação, os testes e o build independentes entre as zonas.
