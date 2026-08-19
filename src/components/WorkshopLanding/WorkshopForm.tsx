'use client'

import React, { useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import { sendWorkshopLead } from './actions'

type Step = 'step1' | 'step2' | 'done'

const NEEDS = [
  { value: 'leads', label: 'Getting more leads' },
  { value: 'conversion', label: "Leads come in, sales don't" },
  { value: 'tiktok', label: 'TikTok / paid ads specifically' },
  { value: 'web', label: 'Website & tracking' },
  { value: 'bespoke', label: 'Build the system in-house' },
  { value: 'other', label: 'Something else' },
]

const SPENDS = [
  { value: '0', label: 'Not yet' },
  { value: 'lt5', label: 'Under RM5k' },
  { value: '5-20', label: 'RM5k–20k' },
  { value: '20-50', label: 'RM20k–50k' },
  { value: '50+', label: 'RM50k+' },
]

const labelOf = (options: { value: string; label: string }[], value: string) =>
  options.find((option) => option.value === value)?.label ?? ''

export const WorkshopForm: React.FC = () => {
  const [step, setStep] = useState<Step>('step1')
  const [name, setName] = useState('')
  const [whatsapp, setWhatsapp] = useState('+60 ')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [need, setNeed] = useState('')
  const [spend, setSpend] = useState('')
  const [consent, setConsent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return toast.error('Please tell us your name.')
    if (whatsapp.replace(/\D/g, '').length < 9)
      return toast.error('Please enter a valid WhatsApp number.')
    if (!company.trim()) return toast.error('Please tell us your company.')
    setStep('step2')
  }

  const handleStep2 = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
      return toast.error('Please enter a valid email address.')
    if (!consent) return toast.error('Please agree to be contacted so we can reply.')

    setSubmitting(true)
    const result = await sendWorkshopLead({
      name,
      whatsapp,
      company,
      email,
      need: labelOf(NEEDS, need),
      spend: labelOf(SPENDS, spend),
      consent,
    })
    setSubmitting(false)

    if (result.success) {
      toast.success('Booked. Check your email, we sent a confirmation.')
      setStep('done')
    } else {
      toast.error(result.error ?? 'Something went wrong. Please try again.')
    }
  }

  return (
    <Card id="form" className="w-full max-w-lg">
      {step === 'step1' && (
        <form onSubmit={handleStep1}>
          <CardHeader>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Step 1 of 2</span>
              <span>Takes 20 seconds</span>
            </div>
            <Progress value={50} />
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                autoComplete="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="wa">WhatsApp number</Label>
              <Input
                id="wa"
                type="tel"
                autoComplete="tel"
                placeholder="+60 12-345 6789"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="co">Company</Label>
              <Input
                id="co"
                autoComplete="organization"
                placeholder="Company name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <Button type="submit" size="lg">
              Continue →
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              🔒 We don&apos;t share your details. Ever.
            </p>
          </CardContent>
        </form>
      )}

      {step === 'step2' && (
        <form onSubmit={handleStep2}>
          <CardHeader>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Step 2 of 2</span>
              <span>Almost done</span>
            </div>
            <Progress value={100} />
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label>What do you want help with?</Label>
              <RadioGroup value={need} onValueChange={setNeed}>
                {NEEDS.map((option) => (
                  <div key={option.value} className="flex items-center gap-2">
                    <RadioGroupItem value={option.value} id={`need-${option.value}`} />
                    <Label htmlFor={`need-${option.value}`} className="font-normal">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Roughly what do you spend on marketing monthly?</Label>
              <RadioGroup value={spend} onValueChange={setSpend}>
                {SPENDS.map((option) => (
                  <div key={option.value} className="flex items-center gap-2">
                    <RadioGroupItem value={option.value} id={`spend-${option.value}`} />
                    <Label htmlFor={`spend-${option.value}`} className="font-normal">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="em">Email</Label>
              <Input
                id="em"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex items-start gap-2">
              <Checkbox
                id="cons"
                checked={consent}
                onCheckedChange={(checked) => setConsent(checked === true)}
              />
              <Label htmlFor="cons" className="font-normal">
                I agree to be contacted about my enquiry.
              </Label>
            </div>

            <Button type="submit" size="lg" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="animate-spin" /> Sending…
                </>
              ) : (
                '▸ Book my teardown'
              )}
            </Button>
          </CardContent>
        </form>
      )}

      {step === 'done' && (
        <CardContent className="flex flex-col gap-4 pt-6 text-center">
          <CheckCircle2 className="mx-auto size-10 text-primary" />
          <h2 className="text-xl font-semibold">Got it, {name.split(' ')[0] || 'there'}.</h2>
          <p className="text-muted-foreground">
            Viknesh will WhatsApp you within <strong>2 working hours</strong>.
          </p>

          <div className="text-sm font-medium text-muted-foreground">While you wait</div>
          <div className="flex flex-col gap-2">
            <Button variant="outline">📥 The workshop deck (PDF)</Button>
            <Button variant="outline">👤 Save Viknesh&apos;s contact (vCard)</Button>
            <Button variant="outline">▶ Follow Toggle on TikTok</Button>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
