import './globals.css'
import type { Metadata } from 'next'
import { JetBrains_Mono, Staatliches, Kanit } from 'next/font/google'

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

const staatliches = Staatliches({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-staatliches',
  display: 'swap',
})

const kanit = Kanit({
  weight: '400',
  subsets: ['thai', 'latin'],
  variable: '--font-kanit',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'inLAB - Outreach Division',
  description: 'inLAB - Science VTuber together strong',
  openGraph: {
    title: 'inLAB - Outreach Division',
    description: 'inLAB - Science VTuber together strong',
    images: [
      {
        url: '/img/INLAB_ABOUT_US.png', // Place your image in public/img/og-image.png
        width: 1200,
        height: 630,
        alt: 'inLAB - Outreach Division',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'inLAB - Outreach Division',
    description: 'inLAB - Science VTuber together strong',
    images: ['/img/INLAB_ABOUT_US.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${staatliches.variable} ${kanit.variable}`}>
      <body className="font-mono">{children}</body>
    </html>
  )
}