# Pátio Pet — auditoria e refinamento

Concluída em 16/10/2026. Escopo: demonstração institucional da Ghati Inovações, sem backend, e-commerce ou publicação de produção.

## 1. Diagnóstico antes das alterações

A versão pública em https://pet-shop-pied-delta.vercel.app/ foi aberta no navegador e comparada à local. As seis páginas tinham o mesmo conteúdo textual. Não faltavam rotas institucionais: Início, Banho e Tosa, Quem Somos, Loja, FAQ e Contato já estavam implementadas.

Arquitetura preservada: Astro 7.3.8 estático, TypeScript, CSS próprio, dados em `src/data/site.ts`, layout `Base.astro`, componentes compartilhados de navegação, contato, FAQ, ícones e breadcrumbs. As quatro páginas institucionais usam `[infoPage].astro`; serviços usam `[servicePage].astro`. Fontes locais Baloo 2/Nunito, hero AVIF/WebP e foto licenciada do Unsplash. Nenhuma dependência nova.

Problemas verificados:

| Prioridade | Evidência inicial | Efeito |
| --- | --- | --- |
| P1 | Botões de consulta abriam a Ghati, mas o destino comercial só era explicado em outras áreas | Podiam ser interpretados como agendamento/consulta em um pet shop real |
| P2 | A CTA comercial da faixa superior era escondida até 1100 px | A oferta da Ghati perdia visibilidade no celular |
| P2 | FAQ tinha abertura de cinco linhas a 320 px; demais páginas repetiam heros extensos | O visitante demorava a chegar à informação útil |
| P2 | Loja tinha três ícones, descrições curtas e CTAs iguais | Faltava conteúdo para entender a variedade de cada categoria |
| P2 | Serviços não reuniam os fatores de orçamento em um lugar claro | O tutor precisava deduzir quais informações influenciam o valor |
| P2 | Versão pública sem canonical, og:url e og:image; capa social ainda serifada | Compartilhamento incompleto e identidade visual inconsistente |
| P3 | Links do rodapé com aproximadamente 41 px e breadcrumb com 40 px de altura | Alvos de toque menores que a meta de conforto de 44 px adotada nesta revisão |

Pontos positivos mantidos: seis rotas funcionais, navegação atual indicada, telefone correto, FAQ nativo acessível, foco visível, ausência de informações comerciais inventadas, fontes locais, imagens modernas, `noindex` e nenhuma marcação de estabelecimento real na demonstração. A medição inicial não encontrou overflow horizontal.

## 2. Melhorias por página

| Página | Implementação |
| --- | --- |
| Início | Serviços aparecem logo após a apresentação; descrição de cada serviço ficou concreta; a proposta de cuidado ganhou fotografia ilustrativa, critérios simples e caminho para Quem Somos; categorias, dúvidas e contato encerram a jornada |
| Serviços | Abertura mais direta, imagem ilustrativa existente, descrição e preparação por serviço, explicação de porte/pelagem/necessidades no orçamento e aviso de que não há atendimento real |
| Quem Somos | Introdução mais curta, princípios de atendimento preservados e identificação da origem fictícia/ilustrativa; sem história, equipe ou qualificações inventadas |
| Loja | Catálogo institucional com exemplos de itens, orientação de consulta, composição visual por categoria e CTA contextual; sem marcas, preços, estoque ou compra online fictícios |
| FAQ | Título curto, atalhos por assunto, pergunta sobre orçamento e esclarecimento de que o negócio não existe; estado aberto com fundo e indicador distintos; preservados teclado e semântica `details`/`summary` |
| Contato | Ghati identificada no título, CTA, telefone e mensagem; painel comercial separado das informações fictícias; explicação honesta de endereço, atendimento, Maps e Instagram ausentes |

Globalmente: faixa comercial acessível no celular, bloco da Ghati separado no rodapé, aviso junto aos botões ilustrativos e mensagens sobre criação de site, não sobre agendar pets. Telefone preservado: **(13) 97814-3448**. Nenhuma mensagem é enviada automaticamente.

## 3. Decisões de design e conteúdo

Foram preservados o símbolo A, o amarelo manteiga, o azul-petróleo, o branco quente, o golden e as famílias Baloo 2/Nunito. Os arcos continuam relacionando marca, imagens e categorias. A mudança tipográfica ajusta escala e quebras, sem substituir as fontes: títulos internos menores, corpo de 18–20 px e metadados subordinados.

Não foram criados depoimentos, números, selos, equipe, endereço ou horários. Não foram adicionadas animações de entrada. As microinterações CSS existentes respeitam movimento reduzido; o deslocamento de layout no hover dos serviços foi removido. A capa social foi refeita com a identidade atual; sua fonte editável fica em `design/social-cover.html`.

## 4. Validações executadas

- `npm run check`: 21 arquivos, zero erros, avisos ou hints.
- `npm test`: seis testes aprovados.
- `npm run build`: sete páginas geradas, incluindo 404.
- `node tests/verify-build.mjs`: páginas, âncoras, imagens, mensagens/telefone, canonical, Open Graph, ausência de JSON-LD fictício, noindex e robots aprovados.
- `node tests/variants.mjs`: modos só loja e só banho/tosa aprovados em saídas isoladas.
- `git diff --check`: sem erros de whitespace. Não há comando de lint configurado.
- Detector Impeccable: nenhuma ocorrência retornada; isso não substitui a inspeção visual.
- Navegador: seis páginas × 320, 375, 390, 430, 768, 1024 e 1440 px = 42 combinações, sem overflow horizontal. Alvos visíveis medidos no celular com altura mínima de 44 px.
- Interações: menu por Enter, Escape e retorno do foco, navegação pelo menu, FAQ por Space/Enter, atalhos e links internos. WhatsApp validado pelo destino e mensagem decodificada, sem enviar mensagens.

Lighthouse 13.5.0, Edge headless, build estático local; uma execução por combinação abaixo:

| Página / perfil | Desempenho | Acessibilidade | Boas práticas | SEO | LCP | CLS |
| --- | --- | --- | --- | --- | --- | --- |
| Início / mobile | 99 | 100 | 100 | 69 | 2,1 s | 0 |
| Serviços / mobile | 99 | 100 | 100 | 69 | 2,0 s | 0 |
| Quem Somos / mobile | 100 | 100 | 100 | 69 | 1,5 s | 0 |
| Loja / mobile | 100 | 100 | 100 | 69 | 1,4 s | 0 |
| FAQ / mobile | 100 | 100 | 100 | 69 | 1,4 s | 0 |
| Contato / mobile | 100 | 100 | 100 | 69 | 1,4 s | 0 |
| Início / desktop | 100 | 100 | 100 | 69 | 0,5 s | 0 |

O único item de SEO reprovado em cada relatório foi indexabilidade, por `noindex` intencional. Canonical, URL e imagem de compartilhamento agora usam o domínio público fornecido, substituível por `SITE_URL`. O fallback desse domínio só vale para a demonstração; produção real continua exigindo origem explícita e dados validados.

## 5. Pendências e limites

Nenhuma falha bloqueante encontrada nas verificações realizadas. As alterações estão locais, sem deploy. Não houve teste em aparelho físico, Safari/iOS ou leitor de tela. Lighthouse mede laboratório: as notas não certificam WCAG integralmente nem Core Web Vitals de uso real. Desempenho pode variar na hospedagem e nos aparelhos dos visitantes.

## 6. Personalização para clientes

Antes de transformar o modelo em site de um negócio real, substituir nome/símbolo, cores quando necessário, textos, serviços, categorias, políticas, telefone, mensagens, endereço completo, horários, domínio, Maps, Instagram e fotografias próprias/licenciadas. História, equipe e avaliações só entram com informações e autorizações reais. Também atualizar a capa social.

Confirmar esses dados com o cliente e então configurar `verified: true`, `demo: false` e `SITE_URL`. Isso remove os avisos da Ghati/demonstração, usa o contato do negócio e permite os metadados de empresa real já previstos na arquitetura. O build continua rejeitando produção sem dados essenciais. A vitrine permanece por categorias; não exige manutenção contínua de produtos individuais.

## 7. Evidências locais

Em `reports/audit-2026-10-16/`: sete relatórios Lighthouse HTML/JSON, resumo de métricas, matrizes responsivas antes/depois, capturas de viewport e capturas completas `*-full.webp`. A pasta é ignorada pelo Git para não publicar diagnósticos e imagens de inspeção junto do site.
