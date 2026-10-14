import { publishingUrl, contactUrl } from "../lib/publishing.ts";

export const site = {
  name: "Pátio Pet",
  tagline: "Um lugar para cuidar.",
  city: "Praia Grande",
  state: "SP",
  neighborhood: "",
  demo: true as boolean,
  verified: false,
  domain: import.meta.env.SITE_URL || "",
  address: "",
  postalCode: "",
  businessPhone: "",
  hours: [] as { days: string[]; opens: string; closes: string }[],
  hoursLabel: "",
  mapsUrl: "",
  googleBusinessUrl: "",
  socialUrl: "",
  demoPhone: "5513978143448",
  demoPhoneLabel: "(13) 97814-3448",
  colors: {
    yellow: "#F3D879",
    teal: "#164D56",
    paper: "#FAF8F2",
    muted: "#52615D",
  },
  sections: { products: true, about: true },
  images: {
    logo: "/images/patio-amigo.svg",
    hero: "/images/golden-hero.webp",
    heroWebp:
      "/images/golden-hero-small.webp 640w, /images/golden-hero-medium.webp 800w, /images/golden-hero.webp 1000w",
    heroAvif:
      "/images/golden-hero-640.avif 640w, /images/golden-hero-800.avif 800w, /images/golden-hero-1000.avif 1000w",
    companion: "/images/dogs-walking.webp",
    companionSmall: "/images/dogs-walking-small.webp",
  },
  hero: {
    title: "Cuidado que faz parte da vida.",
    description:
      "Banho, tosa e os essenciais para a rotina do seu pet. Um jeito próximo de cuidar, aqui em Praia Grande.",
  },
  about: {
    title: "O cuidado começa na conversa.",
    description:
      "Cada pet tem seu jeito. Entender a rotina, a pelagem e o que deixa seu companheiro confortável é o primeiro passo para combinar o atendimento.",
    introduction:
      "O Pátio Pet foi pensado para fazer parte da rotina de quem divide a vida com um pet. Um lugar para conversar sobre cuidados, conhecer opções de banho e tosa e encontrar os essenciais para o dia a dia.",
    principles: [
      {
        title: "Cada pet tem seu jeito",
        text: "Porte, pelagem, rotina e comportamento entram na conversa antes de escolher os cuidados.",
      },
      {
        title: "Tudo bem combinado",
        text: "O tutor consulta o que está incluído, o valor e a disponibilidade antes de confirmar a visita.",
      },
      {
        title: "Cuidado que acompanha",
        text: "As dúvidas da rotina também têm espaço: da preparação para o banho aos cuidados em casa.",
      },
    ],
  },
  services: [
    {
      id: "banho",
      name: "Banho",
      short: "Um respiro na rotina. E um pelo bem cuidado.",
      description:
        "Limpeza da pelagem, secagem e escovação. Conte sobre a rotina e as necessidades do seu pet para combinar os cuidados antes do atendimento.",
      detail:
        "Informe o porte, o tipo de pelagem e se há algum produto recomendado pelo veterinário. Os cuidados incluídos e o valor são confirmados na conversa.",
      icon: "bath",
    },
    {
      id: "tosa",
      name: "Tosa",
      short: "Um corte pensado para o seu companheiro.",
      description:
        "Ajuste do comprimento da pelagem de acordo com o tipo de pelo e o corte combinado com o tutor.",
      detail:
        "Uma foto do corte desejado ajuda na conversa. A possibilidade de realizá-lo depende da pelagem e de sua condição no dia do atendimento.",
      icon: "scissors",
    },
    {
      id: "tosa-higienica",
      name: "Tosa higiênica",
      short: "Pequenos cuidados que facilitam o dia a dia.",
      description:
        "Aparo em regiões que precisam de mais atenção à higiene, conforme as necessidades do animal.",
      detail:
        "Consulte as áreas incluídas e a possibilidade de combinar o serviço com o banho. A indicação é avaliada antes de começar.",
      icon: "comb",
    },
  ],
  products: [
    {
      name: "Alimentação",
      description: "Rações e petiscos para diferentes fases da vida.",
      icon: "bowl",
    },
    {
      name: "Acessórios",
      description: "Guias, brinquedos e companhia para os passeios.",
      icon: "ball",
    },
    {
      name: "Higiene",
      description: "Os essenciais para os cuidados entre um banho e outro.",
      icon: "bottle",
    },
  ],
  steps: [
    {
      title: "Conte sobre seu pet",
      text: "Informe o porte, a pelagem e o cuidado que procura.",
    },
    {
      title: "Combine os detalhes",
      text: "Consulte o valor, tire suas dúvidas e confirme um horário.",
    },
    {
      title: "Prepare a visita",
      text: "Traga seu companheiro com guia ou transporte adequado.",
    },
  ],
  faq: [
    {
      question: "Como consultar valores e horários?",
      category: "services",
      answer:
        "Pelo WhatsApp. Informe o serviço, o porte e o tipo de pelagem do pet. O valor e a disponibilidade precisam ser confirmados antes da visita.",
    },
    {
      question: "O que preciso informar antes do banho?",
      category: "services",
      answer:
        "Conte sobre sensibilidades, comportamento, condição da pelagem e orientações recebidas do veterinário. Isso ajuda a conversar sobre os cuidados adequados.",
    },
    {
      question: "Posso escolher o tipo de tosa?",
      category: "services",
      answer:
        "Você pode enviar uma referência. O corte deve ser combinado considerando o tipo e a condição da pelagem do seu pet.",
    },
    {
      question: "Vocês vendem produtos pelo site?",
      category: "products",
      answer:
        "O site apresenta categorias de produtos. A consulta sobre marcas, itens e disponibilidade acontece diretamente pelo WhatsApp, sem compra online.",
    },
    {
      question: "O agendamento é confirmado pelo site?",
      category: "services",
      answer:
        "O botão de contato abre uma conversa. O atendimento só fica combinado depois da confirmação do serviço, do valor e do horário pelo estabelecimento. Não há agenda automática no site.",
    },
    {
      question: "Como preparar meu pet para a visita?",
      category: "services",
      answer:
        "Use guia ou transporte adequado e informe sensibilidades, comportamento e orientações veterinárias. Confirme antes se há alguma recomendação específica para o seu pet.",
    },
    {
      question: "Como consultar uma marca ou um produto específico?",
      category: "products",
      answer:
        "Envie pelo WhatsApp o nome ou uma foto do item que procura. Marcas, tamanhos, preços e disponibilidade precisam ser confirmados na conversa.",
    },
    {
      question: "Como entro em contato?",
      category: "general",
      answer:
        "A página Contato reúne o telefone e o acesso ao WhatsApp. Nesta demonstração, eles direcionam ao contato comercial da Ghati; o Pátio Pet é um negócio fictício.",
    },
  ],
};

export const siteUrl = publishingUrl(site);
export const hasServices = site.services.length > 0;
export const hasProducts = site.sections.products && site.products.length > 0;
export const infoPages = [
  ...(site.sections.about
    ? [
        {
          slug: "quem-somos",
          label: "Quem somos",
          title: "Um lugar para o seu pet. E para você.",
          intro: site.about.introduction,
        },
      ]
    : []),
  ...(hasProducts
    ? [
        {
          slug: "loja",
          label: "Loja",
          title: "Os favoritos da rotina do seu pet.",
          intro:
            "Alimentação, acessórios e higiene para acompanhar os cuidados em casa. Conheça as categorias e consulte os itens que procura.",
        },
      ]
    : []),
  {
    slug: "perguntas-frequentes",
    label: "Perguntas frequentes",
    title: "Dúvidas pequenas também merecem atenção.",
    intro:
      "Encontre as respostas antes da visita ou da consulta sobre produtos. Se precisar, a conversa continua pelo WhatsApp.",
  },
  {
    slug: "contato",
    label: "Contato",
    title: "Pode chegar. A conversa começa aqui.",
    intro: `Quer combinar um cuidado ou consultar os essenciais para seu pet? Veja como falar com a gente em ${site.city}.`,
  },
];
export const navigation = [
  { label: "Início", href: "/" },
  ...(hasServices ? [{ label: "Serviços", href: "/banho-e-tosa/" }] : []),
  ...infoPages.map((page) => ({ label: page.label, href: `/${page.slug}/` })),
];
export const pagePaths = navigation.map((link) => link.href);
export const visibleFaq = site.faq.filter(
  (item) =>
    item.category === "general" ||
    (item.category === "services" && hasServices) ||
    (item.category === "products" && hasProducts),
);

export function whatsappUrl(subject = "") {
  const message = site.demo
    ? `Olá, Ghati! Estou conhecendo a demonstração do ${site.name}${subject ? ` e quero consultar sobre ${subject}` : " e quero saber mais sobre o site"}.`
    : `Olá! Vim pelo site do ${site.name}${subject ? ` e quero consultar sobre ${subject}` : " e gostaria de falar com vocês"}.`;
  return contactUrl(site.demo ? site.demoPhone : site.businessPhone, message);
}
