'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2, Send } from 'lucide-react'
import { products } from '@/lib/site'
import { getSupabaseClient } from '@/lib/supabase'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')
    const form = e.currentTarget
    const values = new FormData(form)
    const supabase = getSupabaseClient()
    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID
    if (!supabase || !tenantId) return setStatus('error')
    const product = String(values.get('product') || '')
    const country = String(values.get('country') || '')
    const { error } = await supabase.from('inquiries').insert({
      tenant_id: tenantId,
      name: String(values.get('name') || ''),
      email: String(values.get('email') || ''),
      company: String(values.get('company') || ''),
      subject: product || 'Website enquiry',
      message: [String(values.get('message') || ''), country && `Country / Region: ${country}`].filter(Boolean).join('\n\n'),
    })
    if (error) return setStatus('error')
    form.reset()
    setStatus('success')
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-[#d8e1eb] bg-[#f0f4f8] p-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e8a020]/15 text-[#8a5600]">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="mt-5 text-2xl font-bold text-[#0f1b2d]">
          Thank you for your enquiry
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#5a7085]">
          Our export team has received your message and will get back to you within one
          business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm font-semibold text-[#0d4077] hover:underline"
        >
          Send another enquiry
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-[#d8e1eb] bg-[#f0f4f8] p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="name">
          <input
            id="name"
            name="name"
            required
            className="kg-input"
            placeholder="Your name"
          />
        </Field>
        <Field label="Company" htmlFor="company">
          <input
            id="company"
            name="company"
            className="kg-input"
            placeholder="Company name"
          />
        </Field>
        <Field label="Email" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            className="kg-input"
            placeholder="you@company.com"
          />
        </Field>
        <Field label="Country / Region" htmlFor="country">
          <input
            id="country"
            name="country"
            className="kg-input"
            placeholder="e.g. Germany"
          />
        </Field>
        <Field label="Product of interest" htmlFor="product" className="sm:col-span-2">
          <select id="product" name="product" className="kg-input" defaultValue="">
            <option value="" disabled>
              Select a product
            </option>
            {products.map((p) => (
              <option key={p.slug} value={p.name}>
                {p.name}
              </option>
            ))}
            <option value="Other">Other / Not sure</option>
          </select>
        </Field>
        <Field label="Message" htmlFor="message" className="sm:col-span-2">
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="kg-input resize-none"
            placeholder="Tell us about your cargo, dimensions, destination and expected volume."
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded bg-[#0d4077] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#0b3260] disabled:opacity-70 sm:w-auto"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send enquiry
          </>
        )}
      </button>
      {status === 'error' && (
        <p role="alert" className="mt-4 text-sm font-medium text-red-700">
          We could not send your enquiry. Please try again or email kinggood66@163.com.
        </p>
      )}

      <style jsx>{`
        :global(.kg-input) {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid #d8e1eb;
          background: #ffffff;
          padding: 0.7rem 0.9rem;
          font-size: 0.9rem;
          color: #0f1b2d;
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        :global(.kg-input:focus) {
          border-color: #0d4077;
          box-shadow: 0 0 0 3px rgba(13, 64, 119, 0.12);
        }
        :global(.kg-input::placeholder) {
          color: #5a7085;
        }
      `}</style>
    </form>
  )
}

function Field({
  label,
  htmlFor,
  children,
  className = '',
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-medium text-[#0f1b2d]"
      >
        {label}
      </label>
      {children}
    </div>
  )
}
