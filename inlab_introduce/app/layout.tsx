import './globals.css'
import type { Metadata } from 'next'
import { JetBrains_Mono, Staatliches } from 'next/font/google'

// JetBrains Mono for main content
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

// Staatliches for headers
const staatliches = Staatliches({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-staatliches',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'VTuber Department',
  description: 'Virtual Talent Division',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${staatliches.variable}`}>
      <body className="font-mono">{children}</body>
    </html>
  )
}