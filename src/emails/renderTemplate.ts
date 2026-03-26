/**
 * Nukodes Email Template Renderer
 * Loads HTML templates and substitutes {{variable}} placeholders.
 * Compatible with any email sending library (Nodemailer, Resend, SendGrid, etc.)
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const TEMPLATES_DIR = path.join(__dirname, 'templates')

/** Replace {{key}} placeholders with values from data object */
function interpolate(html: string, data: Record<string, string | number>): string {
  return html.replace(/\{\{(\w+)\}\}/g, (_, key) =>
    data[key] !== undefined ? String(data[key]) : `{{${key}}}`
  )
}

function loadTemplate(name: string): string {
  const filePath = path.join(TEMPLATES_DIR, `${name}.html`)
  return fs.readFileSync(filePath, 'utf-8')
}

// ─── Template Payloads ───────────────────────────────────────────────────────

export interface WelcomeEmailData {
  firstName: string
  dashboardUrl: string
  unsubscribeUrl?: string
  privacyUrl?: string
  termsUrl?: string
}

export interface VerificationOtpEmailData {
  firstName: string
  otpCode: string
  privacyUrl?: string
}

export interface ResetPasswordEmailData {
  firstName: string
  resetUrl: string
  supportUrl?: string
  privacyUrl?: string
}

export interface OrganizationInvitationEmailData {
  businessName: string
  accountId: string
  inviterName: string
  role: string
  acceptUrl: string
  declineUrl: string
  expiresAt: string
  supportUrl?: string
  privacyUrl?: string
}

export interface InvoiceEmailData {
  // Sender
  businessName: string
  businessInitials: string
  businessEmail: string
  businessAddress: string
  // Invoice meta
  invoiceNumber: string
  status: string
  statusBg: string    // e.g. '#26CC5A22' for paid, '#EF444422' for overdue
  statusColor: string // e.g. '#26CC5A' for paid
  issueDate: string
  dueDate: string
  dueDateColor: string // red if overdue, white if ok
  // Client
  clientName: string
  clientEmail: string
  // Totals
  subtotal: string
  vatAmount: string
  total: string
  // Payment
  paymentUrl: string
  bankName: string
  accountName: string
  accountNumber: string
  // Optional
  note?: string
}

// ─── Render Functions ────────────────────────────────────────────────────────

export function renderWelcomeEmail(data: WelcomeEmailData): string {
  const defaults = {
    unsubscribeUrl: '#',
    privacyUrl: 'https://nukodes.com/privacy',
    termsUrl: 'https://nukodes.com/terms',
  }
  return interpolate(loadTemplate('welcome'), { ...defaults, ...data })
}

export function renderVerificationOtpEmail(data: VerificationOtpEmailData): string {
  const defaults = { privacyUrl: 'https://nukodes.com/privacy' }
  return interpolate(loadTemplate('verification-otp'), { ...defaults, ...data })
}

export function renderResetPasswordEmail(data: ResetPasswordEmailData): string {
  const defaults = {
    supportUrl: 'https://nukodes.com/support',
    privacyUrl: 'https://nukodes.com/privacy',
  }
  return interpolate(loadTemplate('reset-password'), { ...defaults, ...data })
}

export function renderOrganizationInvitationEmail(data: OrganizationInvitationEmailData): string {
  const defaults = {
    supportUrl: 'https://nukodes.com/support',
    privacyUrl: 'https://nukodes.com/privacy',
  }
  return interpolate(loadTemplate('organization-invitation'), { ...defaults, ...data })
}

export function renderInvoiceEmail(data: InvoiceEmailData): string {
  return interpolate(loadTemplate('invoice'), { ...data })
}

// ─── Email Subject Lines ─────────────────────────────────────────────────────

export const subjects = {
  welcome:              (firstName: string) =>
    `Welcome to Nukodes, ${firstName}! Your account is ready 🎉`,
  verificationOtp:      (otpCode: string) =>
    `${otpCode} is your Nukodes verification code`,
  resetPassword:        () =>
    `Reset your Nukodes password`,
  organizationInvitation: (businessName: string, inviterName: string) =>
    `${inviterName} invited you to join ${businessName} on Nukodes`,
  invoice:              (invoiceNumber: string, businessName: string, total: string) =>
    `Invoice ${invoiceNumber} from ${businessName} — ₦ ${total}`,
}
