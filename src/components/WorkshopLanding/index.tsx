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
      <section className="relative isolate overflow-hidden bg-black">
        {/* Decorative TikTok note watermark — positioned per breakpoint, matches Figma */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[90px] -top-[70px] hidden h-[660px] w-[580px] rotate-[-15deg] bg-[url('/brand/tiktok-note.svg')] bg-contain bg-no-repeat md:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[60px] -top-[20px] h-[540px] w-[474px] rotate-[24deg] bg-[url('/brand/tiktok-note.svg')] bg-contain bg-no-repeat md:hidden"
        />

        <div className="container relative flex flex-col items-start gap-6 pb-32 pt-28 font-jakarta">
          <h1 className="max-w-[800px] text-[48px] font-semibold leading-[61px] tracking-tight text-white md:text-[60px] md:leading-[72px]">
            Now let&apos;s hear from you.
          </h1>
          <p className="max-w-[800px] text-[19px] leading-[32.3px] text-[#94a3b8] md:text-[20px]">
            Explore our values, philosophy, and approach that guide every project and help our
            clients build stronger, lasting brands.
          </p>
          <div className="flex w-full flex-col gap-4 pt-2 sm:w-auto sm:flex-row sm:items-center">
            <Button
              asChild
              size="clear"
              className="w-full rounded-2xl bg-white px-[31px] py-[18px] text-[17px] font-semibold text-black hover:bg-white/90 sm:w-auto"
            >
              <a href="#form">Book a Call</a>
            </Button>
            <Button
              asChild
              size="clear"
              className="w-full rounded-2xl bg-[#387aff] px-8 py-[19px] text-[17px] font-semibold text-white hover:bg-[#387aff]/90 sm:w-auto"
            >
              <a href="#form">Audit My Brand</a>
            </Button>
          </div>
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
