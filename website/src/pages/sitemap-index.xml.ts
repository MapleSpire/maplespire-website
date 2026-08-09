import type { APIRoute } from 'astro';
import { renderSitemapIndex } from '../lib/sitemap';

export const prerender = true;

export const GET: APIRoute = () => new Response(renderSitemapIndex(), {
  headers: { 'Content-Type': 'application/xml; charset=utf-8' },
});
