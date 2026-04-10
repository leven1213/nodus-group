import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const payload = await getPayload({ config: await config })
  const body = await req.json()

  // Save to Payload
  await payload.create({
    collection: 'contact-submissions',
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      company: body.company,
      email: body.email,
      phone: body.phone,
      message: body.message,
    },
  })

  // Send email via Resend
  await resend.emails.send({
    from: 'noreply@nodusbuild.com.au',
    to: 'contact@nodusbuild.com.au',
    replyTo: body.email,
    subject: `New enquiry from ${body.firstName} ${body.lastName}`,
    text:
      `Name: ${body.firstName} ${body.lastName}\n` +
      `Company: ${body.company || '—'}\n` +
      `Email: ${body.email}\n` +
      `Phone: ${body.phone || '—'}\n\n` +
      `Message:\n${body.message}`,
  })

  return NextResponse.json({ ok: true })
}
