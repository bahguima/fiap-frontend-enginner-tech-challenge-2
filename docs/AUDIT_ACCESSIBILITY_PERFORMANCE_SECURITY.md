# Auditoria de acessibilidade, performance e segurança

Data: 27/07/2026

## Resultado

A revisão cobriu navegação por teclado, foco, leitores de tela, contraste, nomes acessíveis, gráficos, lazy loading dos remotes, bundle, sessão, tokens, upload, variáveis públicas, erros HTTP e regressões funcionais.

Um achado de segurança médio (`C-AUTH-001`, CWE-602) foi confirmado e corrigido. Também foram corrigidas falhas comprovadas de acessibilidade, inicialização da sessão, tratamento HTTP, composição HTML, roteamento do shell e carregamento de fontes.

## Correções implementadas

### Acessibilidade

- Corrigidos dez CTAs com controles interativos aninhados (`a > button`) usando `Button asChild`. A árvore acessível passou a expor um único link por ação, e a inspeção no navegador encontrou zero controles interativos aninhados.
- Formulários de login agora expõem `aria-invalid`, `aria-describedby`, erro com `role="alert"`, `aria-busy` e bloqueio de reenvio.
- O contraste do token destrutivo claro mudou de `hsl(0 78% 68%)`, razão 2,98:1 contra branco, para `hsl(0 72% 42%)`, razão 6,47:1.
- Gráficos Chart.js de entradas e saídas agora ocultam o canvas decorativo de tecnologias assistivas e oferecem tabela equivalente com seis períodos, valores formatados e caption. O contrato REST fornece os dados prontos.
- Os gráficos customizados de fluxo financeiro e distribuição por categoria já possuíam tabelas acessíveis e permaneceram cobertos por testes semânticos.

### Sessão, tokens e HTTP

- O `AuthContext` deixou de comparar credenciais públicas no navegador e passou a usar `authApi.getSession/login/logout` com TanStack Query.
- Shell e layouts aguardam a consulta de sessão e não carregam o dashboard para usuário não autenticado.
- O contrato de login deixou de devolver `accessToken` ao JavaScript; o teste garante sua ausência.
- Requests JSON e multipart usam `credentials: "include"`.
- Respostas de erro vazias, não JSON ou fora do contrato são normalizadas como `RestClientError`/`INTERNAL_ERROR`.
- O app Next só monta o `AuthProvider` depois de o MSW estar pronto em desenvolvimento, eliminando a corrida que deixava a sessão pendente.

### Performance e carregamento

- O shell continua carregando apenas o remote correspondente à rota ativa; o teste de regressão confirma que o dashboard não é carregado sem sessão.
- O `@import` de Google Fonts foi removido de `createGlobalStyle` e substituído por `preconnect` e stylesheet no `<head>`, eliminando o aviso de CSSOM observado no navegador.
- O alias ausente de `@banking/shared/api-client` no remote institucional foi incluído após o primeiro build revelar a falha.
- O acréscimo das tabelas acessíveis aumentou cada rota de entradas/saídas em aproximadamente 0,24 kB, sem alterar o First Load JS de 220 kB.

## Evidência de bundle

| Rota Next | First Load JS |
| --- | ---: |
| Compartilhado | 87,3 kB |
| `/` | 188 kB |
| `/login` | 194 kB |
| `/dashboard` | 258 kB |
| `/dashboard/income` | 220 kB |
| `/dashboard/expenses` | 220 kB |
| `/dashboard/statement` | 187 kB |
| `/dashboard/profile` | 118 kB |

Os quatro builds de produção concluíram: `institutional`, `dashboard`, `banking` e `shell`.

## Upload, variáveis e controles já adequados

- Upload: máximo de cinco arquivos, 5 MB por arquivo e MIME restrito a PDF/JPEG/PNG, aplicado no formulário e no handler REST mockado.
- Variáveis expostas: apenas URLs de API/remotes, flag de mocking e atraso de mock. Nenhum segredo foi encontrado em `NEXT_PUBLIC_*`, `DefinePlugin`, storage ou fonte.
- MSW: ativação condicionada a `NODE_ENV=development` e `NEXT_PUBLIC_API_MOCKING=enabled`.
- Renderização: nenhuma ocorrência de `dangerouslySetInnerHTML`.
- Tema: o único uso de `localStorage` guarda preferência visual, não identidade ou token.

## Riscos que dependem do backend/deploy

- O backend real deve validar assinatura/conteúdo dos arquivos, aplicar antivírus quando apropriado, gerar nomes opacos, impor quotas e autorização por objeto e servir downloads com headers seguros. MIME e tamanho no cliente/MSW não substituem esses controles.
- Sessão por cookie exige `HttpOnly`, `Secure`, `SameSite`, expiração/rotação e proteção CSRF nas operações mutáveis. Esses controles não podem ser comprovados sem o backend.
- Remotes de Module Federation executam como código first-party. Produção deve limitar origens HTTPS, proteger o pipeline/hosting e aplicar CSP compatível.

Esses itens foram mantidos como requisitos de produção, não como vulnerabilidades confirmadas no código disponível.

## Gates finais

Executados no estado final:

- `npm run lint`: 10/10 projetos, zero warnings/erros.
- `npm run typecheck`: 10/10 projetos, zero erros TypeScript.
- `npm test -- --runInBand`: 24 suítes, 72 testes, todos aprovados.
- `npm run build`: 4/4 projetos, todos aprovados.

O primeiro build detectou a ausência do alias do cliente de API no remote institucional. Após a correção, o build completo foi repetido sem cache e passou.
