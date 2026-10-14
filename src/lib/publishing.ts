type Publishing = {
  demo: boolean;
  verified: boolean;
  domain: string;
  address: string;
  businessPhone: string;
  hours: { days: string[]; opens: string; closes: string }[];
};

export function publishingUrl(config: Publishing): string | undefined {
  let origin: string | undefined;
  if (config.domain) {
    const url = new URL(config.domain);
    if (
      url.protocol !== "https:" ||
      url.pathname !== "/" ||
      url.search ||
      url.hash ||
      url.username ||
      url.password ||
      /^(localhost|.*\.localhost|example\.(com|org|net)|.*\.example)$/.test(
        url.hostname,
      )
    ) {
      throw new Error(
        "SITE_URL deve ser a origem HTTPS real, sem caminho ou credenciais.",
      );
    }
    origin = url.origin;
  }
  if (
    !config.demo &&
    (!config.verified ||
      !origin ||
      !config.address.trim() ||
      !/^55\d{10,11}$/.test(config.businessPhone) ||
      !config.hours.length)
  ) {
    throw new Error(
      "Produção exige domínio, dados reais validados, endereço, telefone e horários.",
    );
  }
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  if (
    !config.demo &&
    config.hours.some(
      (h) =>
        !h.days.length ||
        h.days.some((day) => !days.includes(day)) ||
        !/^([01]\d|2[0-3]):[0-5]\d$/.test(h.opens) ||
        !/^([01]\d|2[0-3]):[0-5]\d$/.test(h.closes),
    )
  ) {
    throw new Error(
      "Horários devem usar dias Schema.org e horas válidas em HH:mm.",
    );
  }
  return origin;
}

export function contactUrl(phone: string, message: string): string {
  if (!/^55\d{10,11}$/.test(phone))
    throw new Error("WhatsApp deve incluir país e DDD, somente números.");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
