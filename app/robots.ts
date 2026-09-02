import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

/**
 * robots.txt
 *
 * A crawler that matches a named group ignores the `*` group entirely, so every
 * group below has to repeat the same Disallow list — otherwise naming a bot
 * would accidentally open /admin and /api/ to it.
 *
 * On AI visibility: `User-agent: *` already permits all of these, so the named
 * groups change nothing functionally. They are here to state the policy
 * explicitly, so a later edit to the `*` group cannot silently withdraw it.
 *
 * Appearing in Google's AI Overviews needs nothing extra — per Google, a page
 * must simply be indexed and eligible to show with a snippet. There is no
 * opt-in. What WOULD exclude the site is a `nosnippet` / `max-snippet` limit,
 * so app/layout.tsx deliberately allows unlimited snippets.
 */

/** Kept off-limits to every crawler: the admin app and the form endpoint. */
const DISALLOW = ['/admin', '/api/'];

/**
 * AI crawlers we allow, using each vendor's published token.
 *
 * Allowing these is a business choice: it is what makes the site quotable in
 * ChatGPT, Claude and Gemini answers, and the same access is used for model
 * training. For a local trade business, being findable is worth far more than
 * withholding public marketing copy.
 */
const AI_AGENTS = [
  // Google — separate from Googlebot; covers AI training and grounding in
  // Google systems other than Search. Search and AI Overviews follow Googlebot.
  'Google-Extended',
  // OpenAI
  'OAI-SearchBot',   // surfaces the site in ChatGPT search results
  'ChatGPT-User',    // fetches a page when a user asks ChatGPT to visit it
  'GPTBot',          // training crawler
  // Anthropic
  'Claude-SearchBot', // improves Claude's search results
  'Claude-User',      // fetches a page at a Claude user's request
  'ClaudeBot',        // training crawler
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: DISALLOW },
      ...AI_AGENTS.map((userAgent) => ({ userAgent, allow: '/', disallow: DISALLOW })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
