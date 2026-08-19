import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { Bebas_Neue, Fraunces, Inter, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google'
import React from 'react'
import { Toaster } from 'sonner'

import { AdminBar } from '@/components/AdminBar'
import { Header } from '@/Header/Component'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' })
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces' })
const bebasNeue = Bebas_Neue({ subsets: ['latin'], weight: '400', variable: '--font-bebas-neue' })
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-plus-jakarta-sans' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className={cn(
        'scroll-smooth',
        inter.variable,
        jetbrainsMono.variable,
        fraunces.variable,
        bebasNeue.variable,
        plusJakartaSans.variable,
      )}
      data-theme="dark"
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <AdminBar />

        <Header />
        {children}
        <Toaster position="top-center" richColors theme="dark" />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
