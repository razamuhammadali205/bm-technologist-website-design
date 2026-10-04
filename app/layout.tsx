import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://bm-technologist.com'),
  title: 'BM-Technologist | Online Quran Classes for Kids & Adults',
  description: 'Learn Quran online with BM-Technologist. Join one-to-one Quran reading, Tajweed, Hifz, Noorani Qaida and Islamic Studies classes for children and adults.',
  keywords: ['Online Quran classes', 'Learn Quran online', 'Online Quran academy', 'Quran classes for kids', 'Quran classes for adults', 'Quran with Tajweed', 'Quran memorization online'],
  alternates: { canonical: '/' },
  openGraph: { title: 'BM-Technologist | Online Quran Classes', description: 'Learn Quran, understand Islam and grow with faith through convenient online classes.', url: '/', siteName: 'BM-Technologist', type: 'website' },
  twitter: { card: 'summary_large_image', title: 'BM-Technologist | Online Quran Classes', description: 'One-to-one Quran and Islamic education for children and adults worldwide.' },
  icons: { icon: '/icon.svg', apple: '/apple-icon.png' },
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#0c3b32', userScalable: true }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
