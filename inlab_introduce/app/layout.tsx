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
  description: 'inLAB - Outreach Division',
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