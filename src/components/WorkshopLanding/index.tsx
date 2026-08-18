import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import { OrgPathwayPicker } from './OrgPathwayPicker'
import { WorkshopForm } from './WorkshopForm'

export async function WorkshopLanding() {
  const payload = await getPayload({ config: configPromise })

  const [faq, organizations] = await Promise.all([
    payload.find({ collection: 'faq', sort: 'order', limit: 100 }),
    payload.find({ collection: 'organizations', sort: 'order', limit: 100 }),
  ])

  return (
    <>
      {/* Hero */}
      <section className="container flex flex-col items-start gap-4 py-16">
        <h1 className="font-display text-5xl uppercase tracking-tight sm:text-8xl">
          Now let&apos;s hear from you.
        </h1>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a href="#form">Book a call</a>
          </Button>
          <Button asChild size="lg" variant="ghost">
            <a href="#form">Audit my brand</a>
          </Button>
        </div>
      </section>

      <Separator />

      {/* Your pathway */}
      <section className="container flex flex-col gap-6 py-16">
        <div>
          <h2 className="font-display text-4xl uppercase tracking-tight">Your pathway</h2>
          <p className="text-muted-foreground">
            We mapped a Toggle Bespoke pathway for every organisation in the room.
          </p>
        </div>
        <OrgPathwayPicker organizations={organizations.docs} />
      </section>

      <Separator />

      {/* Training */}
      <section className="container py-16">
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-4xl uppercase tracking-tight">
              Want to turn your marketing team into marketing experts?
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-muted-foreground">
              Our audit does not replace your current team, but our world-class educators can
              provide expert training to upskill you: from ads to creatives and AI.
            </p>
            <Button asChild size="lg" className="self-start">
              <a href="#form">Training Curriculum For My Brand</a>
            </Button>
          </CardContent>
        </Card>
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

      {/* Form */}
      <section className="container flex flex-col items-center gap-6 py-16">
        <WorkshopForm />
      </section>

      <Separator />

      {/* Contact */}
      <section className="container py-16">
        <Card className="mx-auto max-w-md text-center">
          <CardHeader>
            <CardTitle>Talk to us on WhatsApp</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-2">
            <a href="https://wa.me/60125688681" className="text-xl font-semibold">
              +60 12-568 8681
            </a>
            <p className="text-sm text-muted-foreground">
              [[Viknesh]] · replies within 2 working hours
            </p>
            <Button asChild size="lg" className="mt-4 w-full">
              <a href="https://wa.me/60125688681">💬 Message us on WhatsApp</a>
            </Button>
          </CardContent>
        </Card>
      </section>
    </>
  )
}
