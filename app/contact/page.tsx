import type { Metadata } from 'next'
import { ContactPageBody } from '@/components/localized/contact-page'
import { defaultLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with KINGGOOD for export wooden pallets and wood crates. Request a quote by phone, email or enquiry form.',
  alternates: { canonical: '/contact' },
  openGraph: { url: '/contact', type: 'website' },
}

export default async function ContactPage() {
  return <ContactPageBody locale={defaultLocale} dictionary={await getDictionary(defaultLocale)} />
}
