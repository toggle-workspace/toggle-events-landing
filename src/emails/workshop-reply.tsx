import {
  Body,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components'
import {
  LOGO_BLACK_DATA_URI,
  ICON_INSTAGRAM_DATA_URI,
  ICON_LINKEDIN_DATA_URI,
} from './assets'

export interface WorkshopReplyEmailProps {
  name: string
  need: string
}

export function WorkshopReplyEmail({ name, need }: WorkshopReplyEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Got it — we&apos;ll WhatsApp you within 2 working hours.</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={outerPad}>
            {/* Header — white, logo left + company name right */}
            <Section style={headerSection}>
              <Row>
                <Column style={{ verticalAlign: 'middle' }}>
                  <Img
                    src={LOGO_BLACK_DATA_URI}
                    alt="Toggle Solutions"
                    width={80}
                    height={22}
                    style={{ display: 'block' }}
                  />
                </Column>
                <Column align="right" style={{ verticalAlign: 'middle' }}>
                  <Text style={headerCompany}>Toggle Solutions</Text>
                </Column>
              </Row>
            </Section>

            {/* Content — light grey panel */}
            <Section style={contentPanel}>
              <Text style={greeting}>Hi {name},</Text>

              <Text style={paragraph}>
                We got your teardown request. Someone from Toggle will WhatsApp you within 2 working
                hours to lock in a 30-minute slot. No pitch, no pressure — just a look at what your
                marketing is doing now and what&apos;s worth fixing first.
              </Text>

              <Hr style={divider} />

              <Text style={label}>What you want help with</Text>
              <Text style={serviceItem}>{need}</Text>

              <Hr style={divider} />

              <Text style={paragraph}>
                If you have any questions before then, reply to this email and we&apos;ll get back
                to you.
              </Text>

              <Text style={signoff}>The Toggle Solutions Team</Text>
            </Section>

            {/* Footer — white, centred */}
            <Section style={footerSection}>
              <Row>
                <Column style={{ textAlign: 'center', padding: '28px 24px 24px' }}>
                  <Text style={footerBlurb}>
                    Performance marketing and growth systems for brands worldwide.
                  </Text>

                  <Row style={socialRow}>
                    <Column align="center">
                      <Link
                        href="https://www.linkedin.com/company/toggle-solutions"
                        style={socialIconLink}
                      >
                        <Img
                          src={ICON_LINKEDIN_DATA_URI}
                          alt="LinkedIn"
                          width={18}
                          height={18}
                          style={{ display: 'inline-block' }}
                        />
                      </Link>
                      {'  '}
                      <Link
                        href="https://www.instagram.com/toggle.solutions/"
                        style={socialIconLink}
                      >
                        <Img
                          src={ICON_INSTAGRAM_DATA_URI}
                          alt="Instagram"
                          width={18}
                          height={18}
                          style={{ display: 'inline-block' }}
                        />
                      </Link>
                    </Column>
                  </Row>

                  <Text style={footerAddress}>Kuala Lumpur, Malaysia</Text>

                  <Text style={footerNote}>
                    You received this because you requested a teardown at{' '}
                    <Link href="https://toggle.solutions" style={footerLink}>
                      toggle.solutions
                    </Link>
                    .
                  </Text>
                </Column>
              </Row>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const body: React.CSSProperties = {
  backgroundColor: '#f0f0ee',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  margin: '0',
  textAlign: 'center',
}

const container: React.CSSProperties = {
  maxWidth: '600px',
  margin: '32px auto 0',
  width: '100%',
}

const outerPad: React.CSSProperties = {
  backgroundColor: '#ffffff',
  padding: '16px 24px',
  borderRadius: '12px',
}

const headerSection: React.CSSProperties = {
  marginBottom: '12px',
  padding: '8px 24px',
}

const headerCompany: React.CSSProperties = {
  color: '#888888',
  fontSize: '13px',
  margin: '0',
}

const contentPanel: React.CSSProperties = {
  backgroundColor: '#f5f5f4',
  padding: '40px',
  textAlign: 'left',
  borderRadius: '8px',
}

const greeting: React.CSSProperties = {
  color: '#111111',
  fontSize: '28px',
  fontWeight: '600',
  margin: '0 0 24px',
  lineHeight: '1.3',
}

const paragraph: React.CSSProperties = {
  color: '#444444',
  fontSize: '16px',
  lineHeight: '1.65',
  margin: '0',
  maxWidth: '420px',
}

const label: React.CSSProperties = {
  color: '#888888',
  fontSize: '11px',
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: '0.07em',
  margin: '0 0 10px',
}

const serviceItem: React.CSSProperties = {
  color: '#111111',
  fontSize: '14px',
  margin: '0 0 6px',
  lineHeight: '1.5',
}

const signoff: React.CSSProperties = {
  color: '#888888',
  fontSize: '13px',
  margin: '24px 0 0',
}

const divider: React.CSSProperties = {
  borderColor: '#e2e0dd',
  borderTopWidth: '1px',
  margin: '24px 0',
}

const footerSection: React.CSSProperties = {
  backgroundColor: '#ffffff',
}

const footerBlurb: React.CSSProperties = {
  color: '#888888',
  fontSize: '13px',
  margin: '0 auto 16px',
  maxWidth: '280px',
  lineHeight: '1.5',
}

const socialRow: React.CSSProperties = {
  marginBottom: '16px',
}

const socialIconLink: React.CSSProperties = {
  display: 'inline-block',
  verticalAlign: 'middle',
  margin: '0 8px',
}

const footerAddress: React.CSSProperties = {
  color: '#aaaaaa',
  fontSize: '11px',
  margin: '0 0 12px',
}

const footerNote: React.CSSProperties = {
  color: '#aaaaaa',
  fontSize: '11px',
  margin: '0',
}

const footerLink: React.CSSProperties = {
  color: '#aaaaaa',
}

export default WorkshopReplyEmail
