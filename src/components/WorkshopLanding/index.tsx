import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Media } from '@/components/Media'
import { Separator } from '@/components/ui/separator'

import { DeckDownloadForm } from './DeckDownloadForm'
import { WorkshopForm } from './WorkshopForm'

const proofStats = [
  '6x ROAS on TikTok',
  '32,000+ leads',
  '−47% CPL',
  'RM35 CPL',
  '11.5x ROI',
  '50+ clients · 5/5',
]

const teamInitials = (name: string) => name.replace(/[[\]]/g, '').charAt(0).toUpperCase()

export async function WorkshopLanding() {
  const payload = await getPayload({ config: configPromise })

  const [caseStudies, team, faq, topics] = await Promise.all([
    payload.find({ collection: 'case-studies', sort: 'order', limit: 100 }),
    payload.find({ collection: 'team', sort: 'order', limit: 100 }),
    payload.find({ collection: 'faq', sort: 'order', limit: 100 }),
    payload.find({ collection: 'topics', sort: 'order', limit: 100 }),
  ])

  return (
    <>
      {/* Hero */}
      <section className="container flex min-h-screen flex-col justify-center gap-10 pt-16 pb-16 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col items-start gap-4 lg:max-w-xl lg:flex-1">
          <Badge variant="outline">TikTok Partnership Workshop · [[CITY]] · [[DATE]]</Badge>
          <h1 className="font-display text-5xl uppercase tracking-tight sm:text-7xl">
            You just saw the system. Now see it run on your business.
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            30 minutes with a senior operator. We tell you where the leak is before we pitch you
            anything.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#form">▸ Book my free teardown</a>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <a href="#deck">Just send me the slides</a>
            </Button>
          </div>
          <Badge variant="secondary">⚡ Workshop attendees only · closes [[FRI 21 AUG]]</Badge>
        </div>

        <WorkshopForm />
      </section>

      <Separator />

      {/* Proof bar */}
      <section className="container flex flex-wrap justify-center gap-3 py-8">
        {proofStats.map((stat) => (
          <Badge key={stat} variant="outline" className="text-sm">
            {stat}
          </Badge>
        ))}
      </section>

      <Separator />

      {/* Recap cards */}
      <section className="container flex flex-col gap-6 py-16">
        <div>
          <h2 className="font-display text-4xl uppercase tracking-tight">The four things we walked through</h2>
          <p className="text-muted-foreground">
            Give the real insight here — not a teaser. They just sat through the talk.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {topics.docs.map((item, i) => (
            <Card key={item.id}>
              <CardHeader>
                <CardDescription>{String(i + 1).padStart(2, '0')}</CardDescription>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <p className="text-muted-foreground">{item.description}</p>
                <Button asChild variant="link" className="self-start px-0">
                  <a href="#form">Map this to my business →</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <DeckDownloadForm />
      </section>

      <Separator />

      {/* Three doors */}
      <section className="container flex flex-col gap-6 py-16">
        <div>
          <h2 className="font-display text-4xl uppercase tracking-tight">Pick the one that fits</h2>
          <p className="text-muted-foreground">
            Different commitment levels. Nobody has to self-identify as &quot;not ready.&quot;
          </p>
        </div>
        <div className="grid justify-center gap-4 sm:grid-cols-3">
          <Card className="relative flex h-full flex-col rounded-2xl border-2 border-primary">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1">
              Most people start here
            </Badge>
            <CardHeader className="pt-8">
              <CardTitle>Free growth teardown</CardTitle>
              <CardDescription>30 minutes. We find the leak. No card, no obligation.</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <Button asChild className="w-full">
                <a href="#form">Book my teardown</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="flex h-full flex-col rounded-2xl">
            <CardHeader className="pt-8">
              <CardTitle>Toggle Bespoke weekend</CardTitle>
              <CardDescription>
                Build the system in-house. One weekend. No retainer. For founders and teams who
                want capability, not dependency.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <Button asChild variant="outline" className="w-full">
                <a href="#form">See how Bespoke works</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="flex h-full flex-col rounded-2xl">
            <CardHeader className="pt-8">
              <CardTitle>Just talk to us</CardTitle>
              <CardDescription>Have a specific question? Message us directly.</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <Button asChild variant="outline" className="w-full">
                <a href="#">💬 WhatsApp [[Viknesh]]</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Case proof */}
      <section className="container flex flex-col gap-6 py-16">
        <div>
          <h2 className="font-display text-4xl uppercase tracking-tight">Three we can show you</h2>
          <p className="text-muted-foreground">
            Verify every number against <code>brain/case-studies/</code> before launch.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {caseStudies.docs.map((c) => (
            <Card key={c.id} className="overflow-hidden">
              {c.image && typeof c.image === 'object' && (
                <Media resource={c.image} imgClassName="w-full object-cover" />
              )}
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{c.name}</CardTitle>
                  <Badge variant="secondary">{c.context}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {c.stats.map((stat, i) => (
                    <p key={i} className="text-xl font-semibold">
                      {stat.number}
                      {stat.text}
                    </p>
                  ))}
                </div>
                <p className="text-muted-foreground">{c.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Already have an agency */}
      <section className="container py-16">
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-4xl uppercase tracking-tight">
              Already have an agency? Good.
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-muted-foreground">
              A teardown isn&apos;t a pitch to replace anyone. It&apos;s a second set of eyes from
              senior operators who&apos;ve run this across education, e-commerce, banking,
              insurance, and property — and who&apos;ll tell you plainly what we&apos;d check
              first.
            </p>
            <p className="font-serif text-xl italic">
              Some of what we find, your team can fix in a week without us. That&apos;s a fine
              outcome.
            </p>
            <Button asChild size="lg" className="self-start">
              <a href="#form">Get a second opinion</a>
            </Button>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Team */}
      <section className="container flex flex-col gap-6 py-16">
        <div>
          <h2 className="font-display text-4xl uppercase tracking-tight">Senior operators, not account managers</h2>
          <p className="text-muted-foreground">The people who&apos;d actually run your teardown.</p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {team.docs.map((person) => {
            const image = person.image && typeof person.image === 'object' ? person.image : null
            return (
              <div key={person.id} className="flex flex-col gap-4">
                <div className="relative aspect-3/4 bg-muted">
                  {image ? (
                    <Media resource={image} fill imgClassName="object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-2xl font-medium">
                      {teamInitials(person.name)}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[13px] leading-4 uppercase">{person.name}</span>
                  <span className="font-mono text-[13px] leading-4 text-muted-foreground uppercase">
                    {person.role}
                  </span>
                </div>
                {person.description && (
                  <p className="text-sm text-muted-foreground">{person.description}</p>
                )}
                <div className="flex gap-3">
                  {person.linkedin && (
                    <Button asChild variant="link" size="sm" className="px-0">
                      <a href={person.linkedin} target="_blank" rel="noopener noreferrer">
                        LinkedIn
                      </a>
                    </Button>
                  )}
                  {person.social && (
                    <Button asChild variant="link" size="sm" className="px-0">
                      <a href={person.social} target="_blank" rel="noopener noreferrer">
                        Social
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <Separator />

      {/* FAQ */}
      <section className="container flex flex-col gap-6 py-16">
        <h2 className="font-display text-4xl uppercase tracking-tight">Before you ask</h2>
        <Accordion type="single" collapsible>
          {faq.docs.map((item) => (
            <AccordionItem key={item.id} value={`faq-${item.id}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <Separator />

      {/* Final CTA */}
      <section className="container flex flex-col items-center gap-4 py-16 text-center">
        <h2 className="font-display text-4xl uppercase tracking-tight">Last call</h2>
        <p className="max-w-xl text-muted-foreground">
          Workshop attendee slots close [[Friday 21 August]]. After that it&apos;s the normal
          queue.
        </p>
        <Button asChild size="lg">
          <a href="#form">▸ Book my free teardown</a>
        </Button>
      </section>
    </>
  )
}
