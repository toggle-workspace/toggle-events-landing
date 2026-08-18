'use client'

import * as icons from 'lucide-react'
import React, { useEffect, useState } from 'react'

import type { Organization } from '@/payload-types'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const NOT_LISTED = 'not-listed'

export const OrgPathwayPicker: React.FC<{ organizations: Organization[] }> = ({
  organizations,
}) => {
  const [slug, setSlug] = useState<string>('')

  useEffect(() => {
    const fromQuery = new URLSearchParams(window.location.search).get('org')
    const stored = window.localStorage.getItem('toggle_org')
    const initial =
      (fromQuery && organizations.some((o) => o.slug === fromQuery) && fromQuery) ||
      (stored && organizations.some((o) => o.slug === stored) && stored) ||
      NOT_LISTED
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSlug(initial)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (value: string) => {
    setSlug(value)
    window.localStorage.setItem('toggle_org', value)
    const url = new URL(window.location.href)
    url.searchParams.set('org', value)
    window.history.replaceState(null, '', url)
  }

  const org = organizations.find((o) => o.slug === slug)

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 sm:max-w-sm">
        <label htmlFor="orgpick" className="text-sm font-medium">
          Your org
        </label>
        <Select value={slug} onValueChange={handleChange}>
          <SelectTrigger id="orgpick" aria-label="Select your organisation">
            <SelectValue placeholder="Select your organisation" />
          </SelectTrigger>
          <SelectContent>
            {organizations.map((o) => (
              <SelectItem key={o.id} value={o.slug}>
                {o.name}
              </SelectItem>
            ))}
            <SelectItem value={NOT_LISTED}>My organization is not listed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {!org ? (
        <Card>
          <CardContent className="pt-6">
            <p className="font-medium">Pick your organisation above.</p>
            <p className="text-muted-foreground">
              We mapped a Toggle Bespoke pathway for every organisation in the room. Choose yours
              to see it.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="font-medium">{org.name}</span>
            <Badge variant="secondary">{org.sector}</Badge>
          </div>

          <h3 className="font-display text-3xl uppercase tracking-tight">{org.headline}</h3>
          <p className="text-muted-foreground">{org.situation}</p>

          <Card>
            <CardHeader>
              <CardDescription>{org.pathway.code}</CardDescription>
              <CardTitle>{org.pathway.name}</CardTitle>
              <CardDescription>{org.pathway.shape}</CardDescription>
            </CardHeader>
          </Card>

          <div>
            <p className="mb-3 text-sm font-semibold tracking-wide uppercase text-muted-foreground">
              What the weekend covers
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {org.pillars.map((pillar, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardDescription>{String(i + 1).padStart(2, '0')}</CardDescription>
                    <CardTitle>{pillar.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{pillar.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {(() => {
            const modules = org.modules.filter(
              (m): m is Exclude<typeof m, number> => typeof m === 'object',
            )
            return (
              modules.length > 0 && (
                <div>
                  <p className="mb-3 text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                    Your modules
                  </p>
                  <div className="flex flex-col gap-3">
                    {modules.map((m) => {
                      const Icon = icons[m.icon as keyof typeof icons] as React.ComponentType<{
                        className?: string
                      }>
                      return (
                        <Card key={m.id}>
                          <CardContent className="flex items-start gap-4 pt-6">
                            {Icon && <Icon className="size-5 shrink-0" />}
                            <div>
                              <p className="font-medium">{m.title}</p>
                              <p className="text-sm text-muted-foreground">{m.description}</p>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              )
            )
          })()}

          <div>
            <p className="mb-3 text-sm font-semibold tracking-wide uppercase text-muted-foreground">
              What you walk out able to do
            </p>
            <ul className="flex flex-col gap-2">
              {org.outcomes.map((o, i) => (
                <li key={i} className="text-muted-foreground">
                  {o.outcome}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold tracking-wide uppercase text-muted-foreground">
              Why this shape
            </p>
            <p className="text-muted-foreground">{org.pathway.why}</p>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold tracking-wide uppercase text-muted-foreground">
              Proof
            </p>
            {typeof org.proof === 'object' && (
              <Card>
                <CardHeader>
                  <CardTitle>{org.proof.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{org.proof.description}</p>
                </CardContent>
              </Card>
            )}
          </div>

          <Button asChild size="lg" className="self-start">
            <a href="#form">Book a call about this pathway</a>
          </Button>
        </div>
      )}
    </div>
  )
}
