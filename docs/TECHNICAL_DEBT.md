# Conflitos e dívida técnica

Inventário levantado em 23 de julho de 2026. Prioridades indicam ordem de tratamento, não autorização para ampliar o escopo atual.

## Conflitos resolvidos na migração de transações

| ID | Status | Evidência atual | Solução aplicada |
| --- | --- | --- | --- |
| TD-01 | Resolvido | Não há consumidores nem provider de `TransactionsContext` | Queries e mutations do TanStack Query controlam o estado remoto. |
| TD-02 | Resolvido | Fixtures e handlers estão em `libs/shared/testing` | A UI acessa os mocks exclusivamente pelos contratos REST. |
| TD-03 | Resolvido | Resumo, rótulos, datas e valores formatados vêm da API | Cálculos e transformações de domínio foram removidos do frontend. |
| TD-04 | Resolvido | Filtros e limite são parâmetros de `GET /api/transactions` | As views recebem as listas prontas para exibição. |
| TD-05 | Resolvido | Hooks de domínio usam `useQuery` e `useMutation` | Query keys e invalidações estão centralizadas por domínio. |

## Qualidade e manutenção

| ID | Prioridade | Evidência atual | Tratamento recomendado |
| --- | --- | --- | --- |
| TD-06 | Alta | Há 6 suítes e 19 testes; a cobertura dos demais componentes e views ainda é limitada | Continuar ampliando testes de comportamento fora do fluxo de transações. |
| TD-07 | Média | `tsconfig.json` usa `strict: false`, `allowJs: true` e apenas `strictNullChecks: true` | Ativar regras estritas de forma incremental, com uma medição de erros antes de cada flag. |
| TD-08 | Média | 14 de 41 diretórios de component/view não possuem `interface.ts` ou `styled.ts` | Normalizar somente ao tocar cada componente, evitando uma refatoração massiva sem cobertura. |
| TD-09 | Média | `apps/banking/src/test/example.test.ts` é apenas um smoke test trivial | Substituir o teste trivial por comportamento de aplicação. |
| TD-10 | Média | `LanguageContext.tsx` concentra um dicionário extenso junto do provider | Separar catálogos de tradução do Context sem trocar a solução de estado aprovada. |
| TD-11 | Baixa | Há bibliotecas sobrepostas para gráficos e toasts, além de dependências instaladas sem uso aparente | Auditar uso e remover redundâncias em tarefa própria, validando impacto visual e de bundle. |
| TD-12 | Baixa | O nome do pacote ainda é `black-rose-banking-concept-next` | Alinhar o nome ao Tech Challenge quando o identificador definitivo for escolhido. |
| TD-13 | Baixa | Jest está na major 30 e `@types/jest` na major 29 | Verificar compatibilidade e necessidade do pacote de tipos antes de alinhar versões. O baseline atual compila e testa. |

## Resíduos locais

O diretório ignorado `dashboard-remote/` contém somente diretórios vazios e artefatos gerados (`.next`, `.swc` e `tsconfig.tsbuildinfo`) no ambiente inspecionado. Ele não faz parte do Git e não deve ser promovido a projeto, remote ou microfrontend nesta fase. A limpeza pode ser feita separadamente e de forma explícita.

## Baseline

O ESLint varria `.next` aninhado em `dashboard-remote` porque os ignores cobriam apenas nomes simples. A configuração foi corrigida para ignorar artefatos gerados em qualquer profundidade. Nenhum código gerado foi alterado e nenhuma funcionalidade foi adicionada.
