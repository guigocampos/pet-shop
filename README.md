# Pátio Pet

Demonstração comercial Ghati de um pet shop fictício em Praia Grande/SP. Site estático em Astro + TypeScript; não há backend, compra online ou agenda automática. WhatsApp abre uma conversa, sem enviar a mensagem sozinho.

Site institucional com seis páginas: Início, Serviços (`/banho-e-tosa/`), Quem somos, Loja, Perguntas frequentes e Contato. A home segue apresentação → serviços → proposta de cuidado → categorias → dúvidas/contato. Encaminha para o conteúdo próprio de cada área. Menu com página atual indicada, breadcrumbs nas páginas internas e FAQ organizado por assunto. As rotas institucionais e seus textos de abertura ficam em `infoPages`, em `src/data/site.ts`.

## Executar

Requer Node >= 22.12.0 e npm >= 9.6.5.

```sh
npm ci
npm run dev
```

Preview local: http://localhost:4321. Para conferir a saída final:

```sh
npm run check
npm test
npm run build
node tests/verify-build.mjs
npm run preview
```

`check` valida TypeScript e templates Astro. Não foi adicionada uma dependência de lint separada. Hospede o conteúdo de `dist/` em um servidor estático que preserve os status 404; não configure fallback universal para `index.html`.

## Personalizar para um cliente

`src/data/site.ts` concentra nome, cores, conteúdo, contato, imagens, serviços, categorias e seções. `sections.products` e `sections.about` ativam/desativam as páginas, os blocos da home e os links correspondentes. A demonstração combina banho e tosa com categorias de loja. Para loja sem serviços, use `services: []`: a seção, os links e a URL `/banho-e-tosa/` deixam de ser gerados. Para banho e tosa sem loja, use `sections.products: false`: a URL `/loja/` também sai. As perguntas de cada assunto acompanham a oferta habilitada. Em ambos os casos adapte os textos centrais (hero, sobre, passos e aberturas das páginas) à oferta real do cliente. Os metadados da home acompanham os serviços e produtos habilitados.

Todos os serviços e categorias atuais são exemplos fictícios. Não há endereço, horário, equipe, avaliações, certificações ou estatísticas inventadas. O único telefone real é o contato comercial autorizado da Ghati: **(13) 97814-3448**. Toda mensagem de demonstração menciona Ghati, Pátio Pet e a criação de um site para o pet shop. Botões ilustrativos mostram “Demo · WhatsApp da Ghati”; a faixa comercial continua visível no celular. Nenhum botão envia mensagem ou confirma atendimento automaticamente.

A demonstração usa a origem pública fornecida, `https://pet-shop-pied-delta.vercel.app`, como padrão para canonical, Open Graph e sitemap. `SITE_URL` substitui esse valor ao mudar de hospedagem. O padrão vale apenas com `demo: true`: um cliente real continua exigindo domínio próprio explícito. A página 404 não entra no sitemap nem recebe canonical. `robots.txt` permite rastreamento para reconhecimento de `noindex`.

Para um cliente real, substitua o conteúdo e as fotografias, preencha endereço, CEP, bairro, telefone, horários (`hours`, dias Schema.org e hora `HH:mm`), `hoursLabel`, links reais de Maps/Perfil da Empresa/redes sociais e domínio. Revise as informações com o cliente; só então altere `verified: true` e `demo: false`. O build rejeita produção sem informações essenciais. Essa confirmação é editorial: o código não verifica a existência de uma empresa.

Em produção, os títulos/descrições mudam, a identificação fictícia sai, as mensagens usam o telefone do negócio e o JSON-LD usa PetStore (com produtos) ou LocalBusiness, Service e breadcrumbs correspondentes. Sem avaliações ou preços fictícios. Troque também o texto da imagem social por uma versão apropriada ao cliente. O nome Pátio Pet é de trabalho; não houve pesquisa de registro de marca.

### Checklist de SEO local antes da publicação

- Confirmar nome, endereço, bairro, telefone e horários com o cliente e manter consistência com o Perfil da Empresa no Google.
- Revisar serviços, textos e imagens para refletir o atendimento real; validar links de contato, Maps e redes sociais.
- Configurar a origem HTTPS definitiva em `SITE_URL`; conferir canonical, Open Graph e sitemap no build publicado.
- Revisar JSON-LD com dados reais e remover `noindex` somente após a confirmação editorial (`verified: true`, `demo: false`).
- Repetir a verificação de links, status 404, responsividade e Lighthouse no domínio final; cadastrar o sitemap no Search Console.

## Direção e assets

Amarelo manteiga, azul-petróleo e branco quente. Baloo 2 nos títulos e na assinatura: formas arredondadas e cheias para uma personalidade divertida. Nunito no corpo e nos controles, também arredondada, com leitura confortável. Corpo de 18 px, aberturas de 19–21 px e navegação desktop de 16 px; legendas/identificação demo ficam em 12–14 px. Nenhuma fonte serifada na interface.

Fontes WOFF2 Latin locais, com acentos em português e `font-display: swap`; licença SIL OFL incluída em `public/fonts`. Eixo `wght` confirmado nas fontes oficiais: [Baloo 2](https://raw.githubusercontent.com/google/fonts/main/ofl/baloo2/METADATA.pb), 400–800, arquivo carregado de 600–800; [Nunito](https://raw.githubusercontent.com/google/fonts/main/ofl/nunito/METADATA.pb), 200–1000, arquivo carregado de 400–800. Não carregamos itálicos ou subconjuntos que o site não usa.

- `src/assets/golden-source.png`: imagem original gerada por IA, ilustrativa. Não representa um pet atendido pelo negócio. AVIF e WebP responsivos em três tamanhos em `public/images/`.
- `public/images/dogs-walking.webp`: foto de dois cães correndo, por Alvan Nee no Unsplash, obtida do asset `photo-1548199973-03cce0bbc87b`. [Fotografia](https://unsplash.com/photos/two-dogs-running-on-road-9M0tSjb-cpA), [licença](https://unsplash.com/license). Ilustra a rotina do pet; não é foto da loja.
- `public/images/social-cover.jpg`: arte demonstrativa de compartilhamento, atualizada com Baloo 2, Nunito e o símbolo aprovado. Fonte editável em `design/social-cover.html`; renderizar em 1200 × 630, com os assets de `public/` acessíveis na raiz. A capa anterior usava uma fonte serifada.
- Símbolo escolhido: **A — Pátio amigo**, um cachorro sob o arco do pátio, desenhado em SVG. `public/images/patio-amigo.svg` no cabeçalho e rodapé; caminho configurável em `site.images.logo`. Favicon em `public/favicon-patio-amigo.svg`, com fundo amarelo para preservar leitura na barra do navegador. Conceitos e testes em `design/logo/`; não inclui um kit de marca completo.

As fotos devem ser substituídas por material próprio/licenciado do cliente; não representam equipe ou instalações. Preserve autorização de pessoas e origem dos assets ao personalizar.

Referências de conteúdo e composição: [Petz](https://landingpage.petz.com.br/banho-e-tosa/), [Cobasi](https://www.cobasi.com.br/lojas), [SoulDePet](https://souldepet.com.br/). Princípios aproveitados: explicação do atendimento, informação local e categorias de loja; sem copiar seus assets ou textos.

## Validação

Testes de política de publicação e codificação de WhatsApp em `tests/publishing.test.ts`; conferência de saída estática em `tests/verify-build.mjs`. `node tests/variants.mjs` compila e verifica os modos só loja e só banho e tosa em diretórios isolados, preservando a configuração e o preview padrão.

Auditoria e refinamento em **16/10/2026**, com comparação da versão publicada e local antes das alterações. Diagnóstico, decisões por página e personalização em `design/AUDITORIA-2026-10-16.md`.

Validados build estático, TypeScript (0 erros/avisos), 6 testes de publicação/WhatsApp, links/âncoras/assets/metadados e variantes de oferta. Não existe comando de lint no projeto; `astro check` valida os templates e tipos, e `git diff --check` confere whitespace. Sem dependências novas.

No navegador: seis páginas nas larguras 320, 375, 390, 430, 768, 1024 e 1440 px (42 combinações, sem overflow horizontal). Os controles e links visíveis medidos nas larguras de celular têm altura mínima de 44 px. Menu por Enter, fechamento por Escape com retorno do foco, navegação pelo menu e FAQ por Space/Enter conferidos. O acordeão continua usando `details`/`summary`, sem biblioteca.

Lighthouse **13.5.0**, Edge headless, uma execução por página/perfil no build estático local:

| Página / perfil | Performance | Acessibilidade | Boas práticas | SEO | LCP | CLS |
| --- | --- | --- | --- | --- | --- | --- |
| Início / mobile | 99 | 100 | 100 | 69 | 2,1 s | 0 |
| Serviços / mobile | 99 | 100 | 100 | 69 | 2,0 s | 0 |
| Quem somos / mobile | 100 | 100 | 100 | 69 | 1,5 s | 0 |
| Loja / mobile | 100 | 100 | 100 | 69 | 1,4 s | 0 |
| FAQ / mobile | 100 | 100 | 100 | 69 | 1,4 s | 0 |
| Contato / mobile | 100 | 100 | 100 | 69 | 1,4 s | 0 |
| Início / desktop | 100 | 100 | 100 | 69 | 0,5 s | 0 |

Em todas as páginas, o único item de SEO reprovado é indexabilidade: `noindex` é intencional para a marca fictícia. Não há JSON-LD de estabelecimento na demonstração. As fontes locais com `swap`, as versões AVIF/WebP, a prioridade da imagem do hero e o lazy loading abaixo da dobra foram mantidos.

Relatórios HTML/JSON, matriz responsiva e capturas completas ficam em `reports/audit-2026-10-16/` (ignorados pelo Git). Essas métricas são de laboratório, não dados reais de Core Web Vitals. Não houve teste em aparelho físico ou leitor de tela. A auditoria não publicou alterações em produção.
