import {
  Body,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components'
import { LOGO_BLACK_DATA_URI } from './assets'

export interface WorkshopNotificationEmailProps {
  name: string
  company: string
  email: string
  whatsapp: string
  need: string
  spend: string
}

export function WorkshopNotificationEmail({
  name,
  company,
  email,
  whatsapp,
  need,
  spend,
}: WorkshopNotificationEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>New workshop lead: {name}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={outerPad}>
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
                  <Text style={headerLabel}>Workshop Lead</Text>
                </Column>
              </Row>
            </Section>

            <Section style={contentPanel}>
              <FieldRow label="Name" value={name} />
              <FieldRow label="Company" value={company} />
              <FieldRow label="Email" value={email} />
              <FieldRow label="WhatsApp" value={whatsapp} />

              <Hr style={divider} />

              <FieldRow label="Needs" value={need} />
              <FieldRow label="Spend" value={spend} />
            </Section>

            <Section style={footerSection}>
              <Row>
                <Column style={{ padding: '16px 24px' }}>
                  <Text style={footerText}>Toggle Solutions &middot; hello@toggle.solutions</Text>
                </Column>
              </Row>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <Row style={fieldRow}>
      <Column style={fieldLabelCol}>
        <Text style={fieldLabelStyle}>{label}</Text>
      </Column>
      <Column style={fieldValueCol}>
        <Text style={fieldValue}>{value}</Text>
      </Column>
    </Row>
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

const headerLabel: React.CSSProperties = {
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

const fieldRow: React.CSSProperties = {
  marginBottom: '4px',
}

const fieldLabelCol: React.CSSProperties = {
  width: '90px',
  verticalAlign: 'top',
  paddingBottom: '14px',
}

const fieldValueCol: React.CSSProperties = {
  verticalAlign: 'top',
  paddingBottom: '14px',
}

const fieldLabelStyle: React.CSSProperties = {
  color: '#888888',
  fontSize: '11px',
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  margin: '0',
  lineHeight: '1.5',
}

const fieldValue: React.CSSProperties = {
  color: '#111111',
  fontSize: '14px',
  margin: '0',
  lineHeight: '1.5',
}

const divider: React.CSSProperties = {
  borderColor: '#e2e0dd',
  borderTopWidth: '1px',
  margin: '8px 0 24px',
}

const footerSection: React.CSSProperties = {
  backgroundColor: '#ffffff',
}

const footerText: React.CSSProperties = {
  color: '#aaaaaa',
  fontSize: '12px',
  margin: '0',
}

export default WorkshopNotificationEmail
