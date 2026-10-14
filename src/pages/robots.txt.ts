import { siteUrl } from '../data/site';
export function GET() {
  return new Response(`User-agent: *\nAllow: /\n${siteUrl ? `Sitemap: ${siteUrl}/sitemap.xml\n` : ''}`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
