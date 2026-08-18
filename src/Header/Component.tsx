import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export function Header() {
  return (
    <header className="sticky top-0 z-20 w-full border-b border-border bg-background">
      <div className="container flex h-16 items-center justify-center">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image src="/brand/logo-light.svg" alt="Toggle" width={66} height={18} priority />
        </Link>
      </div>
    </header>
  )
}
