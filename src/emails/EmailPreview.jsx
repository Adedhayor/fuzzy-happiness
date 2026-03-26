/**
 * EmailPreview — browser preview of all 5 Nukodes email templates.
 * Uses raw HTML strings with the same {{variable}} slots filled with dummy data.
 */
import React, { useState } from 'react'

// ── inline template strings (subset of the real HTML files, for browser preview) ──

const WELCOME_HTML = `<!DOCTYPE html><html><head>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@700&family=Rokkitt:wght@400;600;700&display=swap" rel="stylesheet">
</head><body style="margin:0;padding:24px;background:#F0F0F5;font-family:'Rokkitt',Georgia,serif;">
<div style="max-width:600px;margin:0 auto;border-radius:20px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.12);">
  <div style="background:#0A0A0C;padding:36px 48px;text-align:center;">
    <div style="background:#1A1D24;border:1px solid rgba(255,255,255,0.1);border-radius:14px;width:52px;height:52px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:12px;">
      <span style="font-family:'Oswald',sans-serif;font-size:26px;font-weight:700;color:#fff;">N</span>
    </div>
    <div style="font-family:'Rokkitt',serif;font-size:18px;font-weight:700;color:#fff;">Nukodes</div>
    <h1 style="font-family:'Rokkitt',serif;font-size:32px;font-weight:700;color:#fff;margin:24px 0 10px;line-height:1.15;">Welcome to Nukodes,<br>Adedayo! 🎉</h1>
    <p style="font-family:'Rokkitt',serif;font-size:15px;color:#9B9FAF;margin:0 0 24px;line-height:1.6;">Your business finance account is ready. Here's what you can do right now.</p>
    <a href="#" style="display:inline-block;background:#2323FF;color:#fff;font-family:'Rokkitt',serif;font-size:15px;font-weight:700;padding:14px 36px;border-radius:80px;text-decoration:none;">Go to Dashboard →</a>
  </div>
  <div style="background:#fff;padding:40px 48px;">
    <h2 style="font-family:'Rokkitt',serif;font-size:20px;font-weight:700;color:#0A0A0C;margin:0 0 24px;">Here's what you can do with Nukodes</h2>
    ${[['📄','Professional Invoicing','Create, send, and track invoices. Get paid faster with Nukodes payment links.'],
      ['💰','Cash Flow Visibility','See your cash on hand, revenue, and expenses in real time across all your accounts.'],
      ['📊','Expense Tracking','Log and categorise every naira spent. Stay on top of your business expenses effortlessly.']
    ].map(([emoji,title,desc]) => `
    <div style="display:flex;gap:14px;margin-bottom:20px;align-items:flex-start;">
      <div style="background:#E8E8FF;border-radius:10px;width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">${emoji}</div>
      <div><div style="font-family:'Rokkitt',serif;font-size:15px;font-weight:700;color:#0A0A0C;margin-bottom:3px;">${title}</div>
      <div style="font-family:'Rokkitt',serif;font-size:13px;color:#9B9FAF;line-height:1.5;">${desc}</div></div>
    </div>`).join('')}
    <div style="border-top:1px solid #F0F0F5;padding-top:24px;margin-top:8px;">
      <p style="font-family:'Rokkitt',serif;font-size:14px;color:#9B9FAF;margin:0 0 16px;line-height:1.6;">Need help getting started? Our support team is here — just reply to this email.</p>
      <p style="font-family:'Rokkitt',serif;font-size:14px;color:#0A0A0C;margin:0;">To your business growth,<br><strong>The Nukodes Team</strong></p>
    </div>
  </div>
  <div style="background:#F9F9FB;padding:20px 48px;border-top:1px solid #F0F0F5;text-align:center;">
    <p style="font-family:'Rokkitt',serif;font-size:11px;color:#B8B8C7;margin:0;">© 2026 Nukodes · Lagos, Nigeria · <a href="#" style="color:#9B9FAF;">Privacy Policy</a> · <a href="#" style="color:#9B9FAF;">Terms</a></p>
  </div>
</div></body></html>`

const OTP_HTML = `<!DOCTYPE html><html><head>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@700&family=Rokkitt:wght@400;600;700&display=swap" rel="stylesheet">
</head><body style="margin:0;padding:24px;background:#F0F0F5;font-family:'Rokkitt',Georgia,serif;">
<div style="max-width:600px;margin:0 auto;border-radius:20px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.12);">
  <div style="background:#0A0A0C;padding:28px 48px;text-align:center;">
    <div style="background:#1A1D24;border:1px solid rgba(255,255,255,0.1);border-radius:14px;width:52px;height:52px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:10px;">
      <span style="font-family:'Oswald',sans-serif;font-size:24px;font-weight:700;color:#fff;">N</span>
    </div>
    <div style="font-family:'Rokkitt',serif;font-size:17px;font-weight:700;color:#fff;">Nukodes</div>
  </div>
  <div style="background:#fff;padding:48px;">
    <h1 style="font-family:'Rokkitt',serif;font-size:26px;font-weight:700;color:#0A0A0C;margin:0 0 8px;">Verify your email address</h1>
    <p style="font-family:'Rokkitt',serif;font-size:15px;color:#9B9FAF;margin:0 0 32px;line-height:1.6;">Hi Adedayo, enter the code below to verify your email address. It expires in <strong style="color:#0A0A0C;">10 minutes</strong>.</p>
    <div style="background:#0A0A0C;border-radius:16px;padding:32px;text-align:center;margin-bottom:28px;">
      <div style="font-family:'Oswald',sans-serif;font-size:52px;font-weight:700;color:#fff;letter-spacing:12px;line-height:1;">482 916</div>
      <div style="margin-top:12px;font-family:'Rokkitt',serif;font-size:13px;color:#9B9FAF;">Your one-time verification code</div>
    </div>
    <div style="background:#F9F9FB;border-radius:12px;border:1px solid #F0F0F5;padding:16px 20px;margin-bottom:24px;">
      <div style="font-family:'Rokkitt',serif;font-size:14px;color:#0A0A0C;font-weight:600;margin-bottom:4px;">⏱ This code expires in 10 minutes</div>
      <div style="font-family:'Rokkitt',serif;font-size:13px;color:#9B9FAF;line-height:1.5;">Once expired, you'll need to request a new code from the app.</div>
    </div>
    <div style="border-top:1px solid #F0F0F5;padding-top:20px;">
      <p style="font-family:'Rokkitt',serif;font-size:13px;color:#B8B8C7;margin:0;line-height:1.6;">🔒 <strong style="color:#9B9FAF;">Security notice:</strong> Nukodes will never ask you to share this code. If you didn't request this, you can safely ignore this email.</p>
    </div>
  </div>
  <div style="background:#F9F9FB;padding:18px 48px;border-top:1px solid #F0F0F5;text-align:center;">
    <p style="font-family:'Rokkitt',serif;font-size:11px;color:#B8B8C7;margin:0;">© 2026 Nukodes · Lagos, Nigeria</p>
  </div>
</div></body></html>`

const RESET_HTML = `<!DOCTYPE html><html><head>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@700&family=Rokkitt:wght@400;600;700&display=swap" rel="stylesheet">
</head><body style="margin:0;padding:24px;background:#F0F0F5;font-family:'Rokkitt',Georgia,serif;">
<div style="max-width:600px;margin:0 auto;border-radius:20px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.12);">
  <div style="background:#0A0A0C;padding:28px 48px;text-align:center;">
    <div style="background:#1A1D24;border:1px solid rgba(255,255,255,0.1);border-radius:14px;width:52px;height:52px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:10px;">
      <span style="font-family:'Oswald',sans-serif;font-size:24px;font-weight:700;color:#fff;">N</span>
    </div>
    <div style="font-family:'Rokkitt',serif;font-size:17px;font-weight:700;color:#fff;">Nukodes</div>
  </div>
  <div style="background:#fff;padding:48px;text-align:center;">
    <div style="background:#F0F0F5;border-radius:50%;width:64px;height:64px;display:inline-flex;align-items:center;justify-content:center;font-size:28px;margin-bottom:24px;">🔐</div>
    <h1 style="font-family:'Rokkitt',serif;font-size:26px;font-weight:700;color:#0A0A0C;margin:0 0 8px;">Reset your password</h1>
    <p style="font-family:'Rokkitt',serif;font-size:15px;color:#9B9FAF;margin:0 0 28px;line-height:1.6;">Hi Adedayo, we received a request to reset the password for your Nukodes account.</p>
    <a href="#" style="display:inline-block;background:#2323FF;color:#fff;font-family:'Rokkitt',serif;font-size:15px;font-weight:700;padding:15px 40px;border-radius:80px;text-decoration:none;margin-bottom:10px;">Reset Password</a>
    <p style="font-family:'Rokkitt',serif;font-size:12px;color:#B8B8C7;margin:0 0 28px;">Button not working? Copy the link in your email client.</p>
    <div style="background:#F9F9FB;border-radius:12px;border:1px solid #F0F0F5;padding:16px 20px;text-align:left;margin-bottom:24px;">
      <div style="font-family:'Rokkitt',serif;font-size:14px;color:#0A0A0C;font-weight:600;margin-bottom:4px;">⏱ This link expires in 24 hours</div>
      <div style="font-family:'Rokkitt',serif;font-size:13px;color:#9B9FAF;line-height:1.5;">After it expires, you'll need to make a new password reset request.</div>
    </div>
    <div style="border-top:1px solid #F0F0F5;padding-top:20px;text-align:left;">
      <p style="font-family:'Rokkitt',serif;font-size:13px;color:#B8B8C7;margin:0;line-height:1.6;">🔒 <strong style="color:#9B9FAF;">Didn't request this?</strong> If you didn't ask to reset your password, you can safely ignore this email. Your account password will not be changed.</p>
    </div>
  </div>
  <div style="background:#F9F9FB;padding:18px 48px;border-top:1px solid #F0F0F5;text-align:center;">
    <p style="font-family:'Rokkitt',serif;font-size:11px;color:#B8B8C7;margin:0;">© 2026 Nukodes · Lagos, Nigeria</p>
  </div>
</div></body></html>`

const INVITE_HTML = `<!DOCTYPE html><html><head>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@700&family=Rokkitt:wght@400;600;700&display=swap" rel="stylesheet">
</head><body style="margin:0;padding:24px;background:#F0F0F5;font-family:'Rokkitt',Georgia,serif;">
<div style="max-width:600px;margin:0 auto;border-radius:20px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.12);">
  <div style="background:#0A0A0C;padding:28px 48px 0;text-align:center;">
    <div style="background:#1A1D24;border:1px solid rgba(255,255,255,0.1);border-radius:14px;width:52px;height:52px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:10px;">
      <span style="font-family:'Oswald',sans-serif;font-size:24px;font-weight:700;color:#fff;">N</span>
    </div>
    <div style="font-family:'Rokkitt',serif;font-size:17px;font-weight:700;color:#fff;margin-bottom:24px;">Nukodes</div>
    <div style="background:#1A1D24;border:1px solid #2D303B;border-radius:16px;padding:20px 24px;margin-bottom:0;text-align:left;">
      <div style="font-family:'Rokkitt',serif;font-size:11px;color:#9B9FAF;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:6px;">Invitation to join</div>
      <div style="font-family:'Rokkitt',serif;font-size:22px;font-weight:700;color:#fff;margin-bottom:4px;">Adedayo Enterprises Ltd</div>
      <div style="font-family:'Rokkitt',serif;font-size:13px;color:#9B9FAF;">Account ID: <span style="color:#CDCFD7;">NB-01001</span></div>
    </div>
  </div>
  <div style="background:#0A0A0C;height:2px;background:linear-gradient(90deg,#2323FF,#4C4CFF);"></div>
  <div style="background:#fff;padding:40px 48px;">
    <h1 style="font-family:'Rokkitt',serif;font-size:24px;font-weight:700;color:#0A0A0C;margin:0 0 8px;">You've been invited! 👋</h1>
    <p style="font-family:'Rokkitt',serif;font-size:15px;color:#9B9FAF;margin:0 0 24px;line-height:1.6;"><strong style="color:#0A0A0C;">Adedayo Olamide</strong> has invited you to join <strong style="color:#0A0A0C;">Adedayo Enterprises Ltd</strong> on Nukodes as a <strong style="color:#2323FF;">Finance Manager</strong>.</p>
    <div style="background:#F9F9FB;border-radius:12px;border:1px solid #F0F0F5;padding:16px 20px;margin-bottom:24px;">
      <div style="font-family:'Rokkitt',serif;font-size:11px;color:#9B9FAF;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:10px;">Your access includes</div>
      ${[['✅','View invoices and payments'],['✅','Track expenses and cash flow'],['✅','Access business reports']].map(([icon,text])=>`
      <div style="padding:3px 0;"><span>${icon}</span><span style="font-family:'Rokkitt',serif;font-size:14px;color:#0A0A0C;padding-left:8px;">${text}</span></div>`).join('')}
    </div>
    <a href="#" style="display:block;background:#2323FF;color:#fff;font-family:'Rokkitt',serif;font-size:15px;font-weight:700;padding:15px;border-radius:80px;text-decoration:none;text-align:center;margin-bottom:10px;">Accept Invitation</a>
    <a href="#" style="display:block;border:1px solid #F0F0F5;color:#9B9FAF;font-family:'Rokkitt',serif;font-size:14px;padding:14px;border-radius:80px;text-decoration:none;text-align:center;margin-bottom:16px;">Decline</a>
    <p style="font-family:'Rokkitt',serif;font-size:13px;color:#B8B8C7;text-align:center;margin:0 0 20px;">⏱ This invitation expires on <strong style="color:#9B9FAF;">Apr 2, 2026</strong></p>
    <div style="border-top:1px solid #F0F0F5;padding-top:20px;">
      <p style="font-family:'Rokkitt',serif;font-size:13px;color:#B8B8C7;margin:0;line-height:1.6;">🔒 If you don't know <strong style="color:#9B9FAF;">Adedayo Olamide</strong> or weren't expecting this, you can safely ignore this email.</p>
    </div>
  </div>
  <div style="background:#F9F9FB;padding:18px 48px;border-top:1px solid #F0F0F5;text-align:center;">
    <p style="font-family:'Rokkitt',serif;font-size:11px;color:#B8B8C7;margin:0;">© 2026 Nukodes · Lagos, Nigeria</p>
  </div>
</div></body></html>`

const INVOICE_HTML = `<!DOCTYPE html><html><head>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@700&family=Rokkitt:wght@400;600;700&display=swap" rel="stylesheet">
</head><body style="margin:0;padding:24px;background:#F0F0F5;font-family:'Rokkitt',Georgia,serif;">
<div style="max-width:600px;margin:0 auto;border-radius:20px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.12);">
  <div style="background:#0A0A0C;padding:28px 48px;">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;">
      <div>
        <div style="background:#1A1D24;border:1px solid rgba(255,255,255,0.1);border-radius:12px;width:44px;height:44px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:10px;">
          <span style="font-family:'Oswald',sans-serif;font-size:20px;font-weight:700;color:#fff;">AE</span>
        </div>
        <div style="font-family:'Rokkitt',serif;font-size:15px;font-weight:700;color:#fff;">Adedayo Enterprises Ltd</div>
        <div style="font-family:'Rokkitt',serif;font-size:12px;color:#9B9FAF;margin-top:2px;">finance@adedayo.com</div>
      </div>
      <div style="text-align:right;">
        <div style="font-family:'Rokkitt',serif;font-size:11px;color:#9B9FAF;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:4px;">Invoice</div>
        <div style="font-family:'Oswald',sans-serif;font-size:20px;font-weight:700;color:#fff;">#INV-0042</div>
        <div style="margin-top:8px;background:rgba(38,204,90,0.15);border-radius:80px;padding:4px 12px;display:inline-block;">
          <span style="font-family:'Rokkitt',serif;font-size:11px;font-weight:700;color:#26CC5A;text-transform:uppercase;letter-spacing:0.8px;">SENT</span>
        </div>
      </div>
    </div>
  </div>
  <div style="background:#1A1D24;padding:14px 48px;">
    <div style="display:flex;justify-content:space-between;">
      <div><div style="font-family:'Rokkitt',serif;font-size:11px;color:#9B9FAF;text-transform:uppercase;letter-spacing:1px;margin-bottom:3px;">Issue Date</div>
        <div style="font-family:'Rokkitt',serif;font-size:13px;color:#fff;">26 Mar 2026</div></div>
      <div><div style="font-family:'Rokkitt',serif;font-size:11px;color:#9B9FAF;text-transform:uppercase;letter-spacing:1px;margin-bottom:3px;">Due Date</div>
        <div style="font-family:'Rokkitt',serif;font-size:13px;color:#fff;">10 Apr 2026</div></div>
      <div style="text-align:right;"><div style="font-family:'Rokkitt',serif;font-size:11px;color:#9B9FAF;text-transform:uppercase;letter-spacing:1px;margin-bottom:3px;">Billed To</div>
        <div style="font-family:'Rokkitt',serif;font-size:13px;color:#fff;">TechCorp Nigeria</div>
        <div style="font-family:'Rokkitt',serif;font-size:12px;color:#9B9FAF;">techcorp@ng.co</div></div>
    </div>
  </div>
  <div style="background:#fff;padding:32px 48px 0;">
    <div style="display:flex;border-bottom:2px solid #F0F0F5;padding-bottom:10px;margin-bottom:4px;">
      <div style="flex:1;font-family:'Rokkitt',serif;font-size:11px;font-weight:700;color:#9B9FAF;text-transform:uppercase;letter-spacing:1px;">Description</div>
      <div style="width:60px;text-align:center;font-family:'Rokkitt',serif;font-size:11px;font-weight:700;color:#9B9FAF;text-transform:uppercase;letter-spacing:1px;">Qty</div>
      <div style="width:120px;text-align:right;font-family:'Rokkitt',serif;font-size:11px;font-weight:700;color:#9B9FAF;text-transform:uppercase;letter-spacing:1px;">Amount</div>
    </div>
    ${[
      ['Web Development Services','Monthly retainer — March 2026','1','₦ 350,000'],
      ['UI/UX Design Consultation','Dashboard redesign review','3','₦ 75,000'],
      ['Hosting & Infrastructure','Cloud server (monthly)','1','₦ 25,000'],
    ].map(([name,desc,qty,amount])=>`
    <div style="display:flex;border-bottom:1px solid #F9F9FB;padding:12px 0;align-items:flex-start;">
      <div style="flex:1;"><div style="font-family:'Rokkitt',serif;font-size:14px;color:#0A0A0C;font-weight:600;">${name}</div><div style="font-family:'Rokkitt',serif;font-size:12px;color:#9B9FAF;margin-top:2px;">${desc}</div></div>
      <div style="width:60px;text-align:center;font-family:'Rokkitt',serif;font-size:14px;color:#9B9FAF;">${qty}</div>
      <div style="width:120px;text-align:right;font-family:'Oswald',sans-serif;font-size:15px;color:#0A0A0C;">${amount}</div>
    </div>`).join('')}
    <div style="display:flex;justify-content:flex-end;margin-top:20px;">
      <div style="width:200px;">
        <div style="display:flex;justify-content:space-between;padding:5px 0;"><span style="font-family:'Rokkitt',serif;font-size:14px;color:#9B9FAF;">Subtotal</span><span style="font-family:'Oswald',sans-serif;font-size:14px;color:#0A0A0C;">₦ 450,000</span></div>
        <div style="display:flex;justify-content:space-between;padding:5px 0;"><span style="font-family:'Rokkitt',serif;font-size:14px;color:#9B9FAF;">VAT (7.5%)</span><span style="font-family:'Oswald',sans-serif;font-size:14px;color:#0A0A0C;">₦ 33,750</span></div>
        <div style="display:flex;justify-content:space-between;border-top:2px solid #0A0A0C;padding:12px 0 4px;"><span style="font-family:'Rokkitt',serif;font-size:16px;font-weight:700;color:#0A0A0C;">Total</span><span style="font-family:'Oswald',sans-serif;font-size:22px;font-weight:700;color:#0A0A0C;">₦ 483,750</span></div>
      </div>
    </div>
  </div>
  <div style="background:#fff;padding:28px 48px 36px;">
    <a href="#" style="display:block;background:#2323FF;color:#fff;font-family:'Rokkitt',serif;font-size:15px;font-weight:700;padding:15px;border-radius:80px;text-decoration:none;text-align:center;margin-bottom:8px;">Pay Now — ₦ 483,750</a>
    <p style="font-family:'Rokkitt',serif;font-size:12px;color:#B8B8C7;text-align:center;margin:0 0 20px;">Or pay via bank transfer · Account details below</p>
    <div style="background:#F9F9FB;border-radius:12px;border:1px solid #F0F0F5;padding:16px 20px;">
      <div style="font-family:'Rokkitt',serif;font-size:11px;color:#9B9FAF;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;">Bank Transfer Details</div>
      ${[['Bank','Access Bank'],['Account Name','Adedayo Enterprises Ltd'],['Account Number','0123456789']].map(([k,v])=>`
      <div style="display:flex;justify-content:space-between;padding:3px 0;">
        <span style="font-family:'Rokkitt',serif;font-size:13px;color:#9B9FAF;">${k}</span>
        <span style="font-family:'${k==='Account Number'?'Oswald':'Rokkitt'}',sans-serif;font-size:${k==='Account Number'?'15':'13'}px;color:#0A0A0C;font-weight:600;letter-spacing:${k==='Account Number'?'1':'0'}px;">${v}</span>
      </div>`).join('')}
    </div>
  </div>
  <div style="background:#0A0A0C;padding:20px 48px;">
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <div><div style="font-family:'Rokkitt',serif;font-size:13px;color:#fff;font-weight:700;">Adedayo Enterprises Ltd</div><div style="font-family:'Rokkitt',serif;font-size:11px;color:#9B9FAF;margin-top:2px;">14 Admiralty Way, Lekki, Lagos</div></div>
      <div style="text-align:right;"><div style="font-family:'Rokkitt',serif;font-size:11px;color:#9B9FAF;">Powered by</div><div style="font-family:'Rokkitt',serif;font-size:13px;color:#4C4CFF;font-weight:700;">Nukodes</div></div>
    </div>
  </div>
</div></body></html>`

// ── Preview Component ──────────────────────────────────────────────────────────

const TEMPLATES = [
  { id: 'welcome',      label: 'Welcome Email',                html: WELCOME_HTML },
  { id: 'otp',          label: 'Verification OTP',             html: OTP_HTML },
  { id: 'reset',        label: 'Reset Password',               html: RESET_HTML },
  { id: 'invite',       label: 'Organization Invitation',      html: INVITE_HTML },
  { id: 'invoice',      label: 'Invoice Send',                 html: INVOICE_HTML },
]

export default function EmailPreview() {
  const [active, setActive] = useState('welcome')
  const current = TEMPLATES.find(t => t.id === active)

  return (
    <div style={{ width:'100vw', height:'100vh', display:'flex', background:'#050508', fontFamily:"'Rokkitt', serif" }}>

      {/* Sidebar */}
      <div style={{ width:220, background:'#0A0A0C', borderRight:'1px solid #1A1D24', padding:'20px 0', flexShrink:0 }}>
        <div style={{ padding:'0 16px 20px', borderBottom:'1px solid #1A1D24' }}>
          <div style={{ fontSize:13, fontWeight:700, color:'#fff', marginBottom:2 }}>Nukodes</div>
          <div style={{ fontSize:11, color:'#9B9FAF', letterSpacing:1, textTransform:'uppercase' }}>Email Templates</div>
        </div>
        <div style={{ padding:'12px 8px 0' }}>
          {TEMPLATES.map(t => (
            <button key={t.id} onClick={() => setActive(t.id)} style={{
              width:'100%', textAlign:'left', background: active===t.id ? '#1A1D24' : 'transparent',
              border: active===t.id ? '1px solid #2D303B' : '1px solid transparent',
              borderRadius:10, padding:'10px 12px', cursor:'pointer', marginBottom:4,
              color: active===t.id ? '#fff' : '#9B9FAF',
              fontSize:13, fontFamily:"'Rokkitt', serif", fontWeight: active===t.id ? 600 : 400,
              transition:'all 0.15s',
            }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div style={{ flex:1, overflow:'auto', background:'#0F0F14' }}>
        {/* Toolbar */}
        <div style={{ height:44, background:'#0A0A0C', borderBottom:'1px solid #1A1D24', display:'flex', alignItems:'center', padding:'0 20px', gap:12 }}>
          <div style={{ fontSize:12, color:'#9B9FAF', fontFamily:"'Rokkitt', serif" }}>Preview:</div>
          <div style={{ fontSize:13, color:'#fff', fontWeight:600, fontFamily:"'Rokkitt', serif" }}>{current?.label}</div>
        </div>
        {/* iframe */}
        <div style={{ padding:32, display:'flex', justifyContent:'center' }}>
          <iframe
            srcDoc={current?.html}
            style={{
              width:680, minHeight:800, border:'none', borderRadius:12,
              boxShadow:'0 8px 48px rgba(0,0,0,0.5)',
            }}
            title={current?.label}
          />
        </div>
      </div>
    </div>
  )
}
