'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2, Send } from 'lucide-react'
import { InquiryCaptchaField } from '@/components/inquiry-captcha-field'
import { products as defaultProducts, type Product } from '@/lib/site'
import type { Locale } from '@/lib/i18n/config'
import defaultDictionary from '@/lib/i18n/dictionaries/en'
import type { Dictionary } from '@/lib/i18n/types'

type ContactFormProps = {
  locale?: Locale
  dictionary?: Dictionary
  products?: Product[]
}

type FormField = 'name' | 'email' | 'message'
type ValidationErrors = Partial<Record<FormField, string>>

export function ContactForm({
  locale = 'en',
  dictionary = defaultDictionary,
  products = defaultProducts,
}: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
  const [captchaRefreshKey, setCaptchaRefreshKey] = useState(0)

  const requiredMessage = (field: string) =>
    dictionary.forms.requiredField.replace('{field}', field)

  const clearValidationError = (field: FormField) => {
    setValidationErrors((current) => {
      if (!current[field]) return current
      const next = { ...current }
      delete next[field]
      return next
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const values = new FormData(form)
    const name = String(values.get('name') || '').trim()
    const email = String(values.get('email') || '').trim()
    const message = String(values.get('message') || '').trim()
    const errors: ValidationErrors = {}

    if (!name) errors.name = requiredMessage(dictionary.forms.fullName)
    if (!email) {
      errors.email = requiredMessage(dictionary.forms.email)
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = dictionary.forms.invalidEmail
    }
    if (!message) errors.message = requiredMessage(dictionary.forms.message)

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      setStatus('idle')
      return
    }

    setValidationErrors({})
    setStatus('submitting')
    const product = String(values.get('product') || '')
    const country = String(values.get('country') || '')
    let response: Response
    try {
      response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company: String(values.get('company') || ''),
          subject: product || dictionary.forms.websiteEnquiry,
          message: [
            message,
            country && `${dictionary.forms.countryRegion}: ${country}`,
          ].filter(Boolean).join('\n\n'),
          captchaToken: String(values.get('captchaToken') || ''),
          captchaAnswer: String(values.get('captchaAnswer') || ''),
          captchaScope: String(values.get('captchaScope') || ''),
        }),
      })
    } catch {
      setCaptchaRefreshKey((current) => current + 1)
      return setStatus('error')
    }
    if (!response.ok) {
      setCaptchaRefreshKey((current) => current + 1)
      return setStatus('error')
    }
    form.reset()
    setStatus('success')
  }

  if (status === 'success') {
    return (
      <div
        lang={locale}
        className="flex flex-col items-center justify-center rounded-lg border border-[#d8e1eb] bg-[#f0f4f8] p-10 text-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e8a020]/15 text-[#8a5600]">
          <CheckCircle2 className="h-7 w-7" aria-hidden />
        </span>
        <h3 className="mt-5 text-2xl font-bold text-[#0f1b2d]">
          {dictionary.forms.enquiryReceived}
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#5a7085]">
          {dictionary.forms.enquiryReceivedDescription}
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 rounded text-sm font-semibold text-[#0d4077] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4077]"
        >
          {dictionary.actions.sendAnotherEnquiry}
        </button>
      </div>
    )
  }

  return (
    <form
      lang={locale}
      onSubmit={handleSubmit}
      noValidate
      aria-busy={status === 'submitting'}
      className="rounded-lg border border-[#d8e1eb] bg-[#f0f4f8] p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label={dictionary.forms.fullName}
          htmlFor="name"
          error={validationErrors.name}
        >
          <input
            id="name"
            name="name"
            required
            aria-invalid={Boolean(validationErrors.name)}
            aria-describedby={validationErrors.name ? 'name-error' : undefined}
            onInput={() => clearValidationError('name')}
            className="kg-input"
            placeholder={dictionary.forms.fullNamePlaceholder}
          />
        </Field>
        <Field label={dictionary.forms.company} htmlFor="company">
          <input
            id="company"
            name="company"
            className="kg-input"
            placeholder={dictionary.forms.companyPlaceholder}
          />
        </Field>
        <Field
          label={dictionary.forms.email}
          htmlFor="email"
          error={validationErrors.email}
        >
          <input
            id="email"
            name="email"
            type="email"
            required
            aria-invalid={Boolean(validationErrors.email)}
            aria-describedby={validationErrors.email ? 'email-error' : undefined}
            onInput={() => clearValidationError('email')}
            className="kg-input"
            placeholder={dictionary.forms.emailPlaceholder}
          />
        </Field>
        <Field label={dictionary.forms.countryRegion} htmlFor="country">
          <input
            id="country"
            name="country"
            className="kg-input"
            placeholder={dictionary.forms.countryRegionPlaceholder}
          />
        </Field>
        <Field
          label={dictionary.forms.productInterest}
          htmlFor="product"
          className="sm:col-span-2"
        >
          <select id="product" name="product" className="kg-input" defaultValue="">
            <option value="" disabled>
              {dictionary.forms.selectProduct}
            </option>
            {products.map((product) => (
              <option key={product.slug} value={product.name}>
                {product.name}
              </option>
            ))}
            <option value="Other">{dictionary.forms.otherProduct}</option>
          </select>
        </Field>
        <Field
          label={dictionary.forms.message}
          htmlFor="message"
          className="sm:col-span-2"
          error={validationErrors.message}
        >
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            aria-invalid={Boolean(validationErrors.message)}
            aria-describedby={validationErrors.message ? 'message-error' : undefined}
            onInput={() => clearValidationError('message')}
            className="kg-input resize-none"
            placeholder={dictionary.forms.messagePlaceholder}
          />
        </Field>
      </div>

      <InquiryCaptchaField refreshKey={captchaRefreshKey} className="mt-5 text-[#0f1b2d]" />

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded bg-[#0d4077] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#0b3260] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4077] disabled:opacity-70 sm:w-auto"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            {dictionary.actions.sending}
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden />
            {dictionary.actions.sendEnquiry}
          </>
        )}
      </button>
      {status === 'error' && (
        <p role="alert" className="mt-4 text-sm font-medium text-red-700">
          {dictionary.forms.enquiryFailed}
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
        :global(.kg-input[aria-invalid='true']) {
          border-color: #b91c1c;
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
  error,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
  className?: string
  error?: string
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
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="mt-1.5 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}
