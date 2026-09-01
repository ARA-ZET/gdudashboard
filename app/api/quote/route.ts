import { NextResponse } from 'next/server';

/**
 * Quote-request endpoint.
 *
 * Emails each submission to the business via Resend when RESEND_API_KEY and
 * CONTACT_TO are set (see README "Contact form"); always logs to the server
 * console (visible in Firebase App Hosting logs) as a fallback. The front-end
 * also shows direct phone / WhatsApp / email options on success, so no lead is
 * ever lost — even before the email key is configured.
 */
export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const name = String(data.name ?? '').trim();
  const email = String(data.email ?? '').trim();
  const phone = String(data.phone ?? '').trim();

  if (!name || (!email && !phone)) {
    return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 422 });
  }

  const submission = {
    name,
    email,
    phone,
    service: String(data.service ?? ''),
    property: String(data.property ?? ''),
    message: String(data.message ?? ''),
    receivedAt: new Date().toISOString(),
  };

  // Always logged so leads are recoverable from App Hosting logs.
  console.log('[quote-request]', JSON.stringify(submission));

  // Email the lead to the business via Resend when configured.
  const apiKey = process.env.RESEND_API_KEY;
  // CONTACT_TO accepts a comma-separated list, so a lead can land in several
  // inboxes at once (e.g. sales@ and info@) without needing a mailing list.
  const to = (process.env.CONTACT_TO ?? '')
    .split(',')
    .map((addr) => addr.trim())
    .filter(Boolean);
  const from = process.env.CONTACT_FROM || 'Golden Diamond Website <onboarding@resend.dev>';
  if (apiKey && to.length > 0) {
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from,
        to,
        replyTo: submission.email || undefined,
        subject: `New quote request from ${submission.name} — ${submission.service || 'Upholstery'} (${submission.property})`,
        text: Object.entries(submission).map(([k, v]) => `${k}: ${v}`).join('\n'),
      });
      return NextResponse.json({ ok: true, delivered: true });
    } catch (err) {
      // Don't fail the user's request if email delivery hiccups — it's still logged.
      console.error('[quote-request] email failed', err);
    }
  }

  return NextResponse.json({ ok: true, delivered: false });
}
