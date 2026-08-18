import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { NAV_LINKS as BASE_NAV_LINKS } from '@/utilities/navLinks'

const NAV_LINKS = [...BASE_NAV_LINKS, { label: 'Contact', href: '/contact' }]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto w-full border-t border-border bg-black dark:bg-card text-white">
      <div className="container">
        <div className="flex flex-col gap-12 py-16 md:flex-row md:justify-between">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex shrink-0 items-center gap-3">
              <Image src="/brand/logo-light.svg" alt="Toggle" width={66} height={18} />
            </Link>
            <p className="max-w-xs text-base leading-relaxed text-white/60">
              Your product is the gem. We build the website that proves it.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold">Navigation</p>
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <hr className="border-white/10" />

        <div className="flex flex-col items-start gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/60">
            © {year} Toggle Group Sdn. Bhd. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <Link
              href="/privacy-policy"
              className="text-xs text-white/60 transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <span className="text-xs text-white/60">|</span>
            <Link
              href="/terms"
              className="text-xs text-white/60 transition-colors hover:text-white"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
