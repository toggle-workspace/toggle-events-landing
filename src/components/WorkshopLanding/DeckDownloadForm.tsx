'use client'

import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export const DeckDownloadForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) return
    setSent(true)
  }

  return (
    <Card id="deck">
      <CardHeader>
        <CardTitle>📥 Download the full deck</CardTitle>
        <CardDescription>One field. No call unless you ask for one.</CardDescription>
      </CardHeader>
      <CardContent>
        {sent ? (
          <p className="text-sm font-medium text-primary">✓ On its way. Check your inbox.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit">Send me the deck</Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
