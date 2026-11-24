import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { CONSTANTS } from '../../../../constants';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120),
  email: z.string().trim().email('Please enter a valid email address').max(254),
  company: z.string().trim().max(120).optional().default(''),
  referralSource: z.string().trim().max(120).optional().default(''),
  message: z.string().trim().min(5, 'Please include a short message').max(5000),
  website: z.string().max(200).optional().default(''),
});

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

export async function POST(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const ip = forwardedFor?.split(',')[0]?.trim() || 'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: `Too many requests. Please wait a few minutes or email ${CONSTANTS.META.CONTACT_EMAIL} directly.` },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message || 'Please check your form fields.';
    return NextResponse.json({ error: firstIssue }, { status: 400 });
  }

  const { name, email, company, referralSource, message, website } = parsed.data;

  // Silently accept honeypot submissions from bots.
  if (website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const region = process.env.AWS_SES_REGION || process.env.AWS_REGION;
  const accessKeyId = process.env.AWS_SES_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SES_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY;

  if (!region || !accessKeyId || !secretAccessKey) {
    return NextResponse.json(
      {
        error: `Email delivery is not configured yet. Copy ${CONSTANTS.META.CONTACT_EMAIL} above to reach us directly.`,
      },
      { status: 503 }
    );
  }

  const fromEmail = process.env.SES_FROM_EMAIL || CONSTANTS.META.CONTACT_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL || CONSTANTS.META.CONTACT_EMAIL;

  const ses = new SESClient({
    region,
    credentials: { accessKeyId, secretAccessKey },
  });

  const subject = company ? `[UtahDevCo] Inquiry from ${name} (${company})` : `[UtahDevCo] Inquiry from ${name}`;
  const textBody = [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
    referralSource ? `How they heard about us: ${referralSource}` : null,
    '',
    'Message:',
    message,
  ]
    .filter((line) => line !== null)
    .join('\n');

  try {
    await ses.send(
      new SendEmailCommand({
        Source: fromEmail,
        Destination: { ToAddresses: [toEmail] },
        ReplyToAddresses: [email],
        Message: {
          Subject: { Data: subject, Charset: 'UTF-8' },
          Body: { Text: { Data: textBody, Charset: 'UTF-8' } },
        },
      })
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('SES send error:', err);
    return NextResponse.json(
      {
        error: `Could not send message right now. Please copy ${CONSTANTS.META.CONTACT_EMAIL} above and email us directly.`,
      },
      { status: 502 }
    );
  }
}
