'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MenuIcon, XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { NAV_LINKS } from '@/utilities/navLinks'

export function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <header className="sticky top-0 z-20 w-full border-b border-border bg-background">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image src="/brand/logo-light.svg" alt="Toggle" width={66} height={18} priority />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-lg px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button asChild className="hidden px-4 tracking-wide hover:opacity-90 md:flex">
          <Link href="/contact">Book a call</Link>
        </Button>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-foreground transition-colors hover:bg-accent md:hidden"
        >
          {open ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 top-16 z-10 flex flex-col bg-background md:hidden">
          <nav className="flex flex-1 flex-col gap-1 p-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-lg text-foreground transition-colors hover:bg-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="p-6">
            <Button
              asChild
              className="w-full px-4 py-3 tracking-wide hover:opacity-90"
              onClick={() => setOpen(false)}
            >
              <Link href="/contact">Book a call</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
