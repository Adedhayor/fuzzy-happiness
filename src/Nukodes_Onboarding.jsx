import React, { useState, useEffect, useRef } from 'react'

// ─── Design Tokens ─────────────────────────────────────────────────────────────
const C = {
  bg:       '#0A0A0C',
  surf:     '#1A1D24',
  elevated: '#2D303B',
  textPri:  '#FFFFFF',
  textSec:  '#CDCFD7',
  textMute: '#9B9FAF',
  textInv:  '#0A0A0C',
  primary:  '#2323FF',
  pri400:   '#4C4CFF',
  pri0:     '#E8E8FF',
  success:  '#26CC5A',
  error:    '#EF4444',
  border:   '#2D303B',
  liquid:   '#060919',
}
const RF = "'Rokkitt', serif"
const OF = "'Oswald', sans-serif"

const NIGERIAN_STATES = [
  'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue',
  'Borno','Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu',
  'FCT - Abuja','Gombe','Imo','Jigawa','Kaduna','Kano','Katsina',
  'Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger','Ogun','Ondo',
  'Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara',
]

const BUSINESS_TYPES = [
  { id:'bn',          label:'Business Name' },
  { id:'ltd',         label:'Private Limited Company (Ltd)' },
  { id:'plc',         label:'Public Limited Company (PLC)' },
  { id:'partnership', label:'Partnership' },
  { id:'ngo',         label:'NGO / Non-Profit' },
  { id:'cooperative', label:'Cooperative Society' },
]

const COUNTRIES = [
  // Suggested first
  { code:'NG', flag:'🇳🇬', name:'Nigeria' },
  { code:'GH', flag:'🇬🇭', name:'Ghana' },
  { code:'KE', flag:'🇰🇪', name:'Kenya' },
  { code:'ZA', flag:'🇿🇦', name:'South Africa' },
  // Africa
  { code:'AO', flag:'🇦🇴', name:'Angola' },
  { code:'BJ', flag:'🇧🇯', name:'Benin' },
  { code:'BW', flag:'🇧🇼', name:'Botswana' },
  { code:'BF', flag:'🇧🇫', name:'Burkina Faso' },
  { code:'BI', flag:'🇧🇮', name:'Burundi' },
  { code:'CM', flag:'🇨🇲', name:'Cameroon' },
  { code:'CV', flag:'🇨🇻', name:'Cape Verde' },
  { code:'CF', flag:'🇨🇫', name:'Central African Republic' },
  { code:'TD', flag:'🇹🇩', name:'Chad' },
  { code:'KM', flag:'🇰🇲', name:'Comoros' },
  { code:'CD', flag:'🇨🇩', name:'DR Congo' },
  { code:'CG', flag:'🇨🇬', name:'Republic of Congo' },
  { code:'CI', flag:'🇨🇮', name:"Côte d'Ivoire" },
  { code:'DJ', flag:'🇩🇯', name:'Djibouti' },
  { code:'EG', flag:'🇪🇬', name:'Egypt' },
  { code:'GQ', flag:'🇬🇶', name:'Equatorial Guinea' },
  { code:'ER', flag:'🇪🇷', name:'Eritrea' },
  { code:'ET', flag:'🇪🇹', name:'Ethiopia' },
  { code:'GA', flag:'🇬🇦', name:'Gabon' },
  { code:'GM', flag:'🇬🇲', name:'Gambia' },
  { code:'GN', flag:'🇬🇳', name:'Guinea' },
  { code:'GW', flag:'🇬🇼', name:'Guinea-Bissau' },
  { code:'LS', flag:'🇱🇸', name:'Lesotho' },
  { code:'LR', flag:'🇱🇷', name:'Liberia' },
  { code:'LY', flag:'🇱🇾', name:'Libya' },
  { code:'MG', flag:'🇲🇬', name:'Madagascar' },
  { code:'MW', flag:'🇲🇼', name:'Malawi' },
  { code:'ML', flag:'🇲🇱', name:'Mali' },
  { code:'MR', flag:'🇲🇷', name:'Mauritania' },
  { code:'MU', flag:'🇲🇺', name:'Mauritius' },
  { code:'MA', flag:'🇲🇦', name:'Morocco' },
  { code:'MZ', flag:'🇲🇿', name:'Mozambique' },
  { code:'NA', flag:'🇳🇦', name:'Namibia' },
  { code:'NE', flag:'🇳🇪', name:'Niger' },
  { code:'RW', flag:'🇷🇼', name:'Rwanda' },
  { code:'ST', flag:'🇸🇹', name:'São Tomé and Príncipe' },
  { code:'SN', flag:'🇸🇳', name:'Senegal' },
  { code:'SL', flag:'🇸🇱', name:'Sierra Leone' },
  { code:'SO', flag:'🇸🇴', name:'Somalia' },
  { code:'SS', flag:'🇸🇸', name:'South Sudan' },
  { code:'SD', flag:'🇸🇩', name:'Sudan' },
  { code:'SZ', flag:'🇸🇿', name:'Eswatini' },
  { code:'TZ', flag:'🇹🇿', name:'Tanzania' },
  { code:'TG', flag:'🇹🇬', name:'Togo' },
  { code:'TN', flag:'🇹🇳', name:'Tunisia' },
  { code:'UG', flag:'🇺🇬', name:'Uganda' },
  { code:'ZM', flag:'🇿🇲', name:'Zambia' },
  { code:'ZW', flag:'🇿🇼', name:'Zimbabwe' },
  // Rest of world
  { code:'GB', flag:'🇬🇧', name:'United Kingdom' },
  { code:'US', flag:'🇺🇸', name:'United States' },
  { code:'CA', flag:'🇨🇦', name:'Canada' },
  { code:'DE', flag:'🇩🇪', name:'Germany' },
  { code:'FR', flag:'🇫🇷', name:'France' },
  { code:'NL', flag:'🇳🇱', name:'Netherlands' },
  { code:'AE', flag:'🇦🇪', name:'UAE' },
  { code:'IN', flag:'🇮🇳', name:'India' },
  { code:'CN', flag:'🇨🇳', name:'China' },
  { code:'SG', flag:'🇸🇬', name:'Singapore' },
]

const SUGGESTED_CODES = ['NG','GH','KE','ZA']

// ─── Primitives ────────────────────────────────────────────────────────────────

function StatusBar() {
  return (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 24px 4px' }}>
      <span style={{ fontFamily:OF, fontSize:15, fontWeight:600, color:C.textPri }}>9:41</span>
      <div style={{ display:'flex', gap:5, alignItems:'center' }}>
        {/* signal */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="white">
          <rect x="0" y="4" width="3" height="8" rx="1"/>
          <rect x="4.5" y="2.5" width="3" height="9.5" rx="1"/>
          <rect x="9" y="1" width="3" height="11" rx="1"/>
          <rect x="13.5" y="0" width="3" height="12" rx="1" opacity="0.3"/>
        </svg>
        {/* wifi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
          <path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"/>
          <path d="M3.5 6.5C5 4.9 6.4 4 8 4s3 .9 4.5 2.5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <path d="M.5 3.5C2.8 1.3 5.3 0 8 0s5.2 1.3 7.5 3.5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </svg>
        {/* battery */}
        <svg width="26" height="12" viewBox="0 0 26 12" fill="none">
          <rect x="0.5" y="0.5" width="22" height="11" rx="3.5" stroke="white" strokeOpacity="0.35"/>
          <rect x="1.5" y="1.5" width="18" height="9" rx="2.5" fill="white"/>
          <rect x="23" y="3.5" width="2.5" height="5" rx="1.25" fill="white" fillOpacity="0.4"/>
        </svg>
      </div>
    </div>
  )
}

function BackBtn({ onPress }) {
  return (
    <button onClick={onPress} style={{
      background:'none', border:'none', cursor:'pointer',
      padding:'4px 0 16px', alignSelf:'flex-start', display:'flex', alignItems:'center',
    }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M15 19L8 12L15 5" stroke={C.textPri} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}

function PrimaryBtn({ label, onPress, disabled }) {
  return (
    <button onClick={!disabled ? onPress : undefined} style={{
      width:'100%', height:52, borderRadius:80,
      background: disabled ? C.elevated : C.textPri,
      color: disabled ? C.textMute : C.textInv,
      fontFamily:RF, fontSize:16, fontWeight:600,
      border:'none', cursor: disabled ? 'not-allowed' : 'pointer',
      letterSpacing:0.2, transition:'background 0.2s',
    }}>{label}</button>
  )
}

function BlueBtn({ label, onPress, disabled, style={} }) {
  return (
    <button onClick={!disabled ? onPress : undefined} style={{
      width:'100%', height:52, borderRadius:80,
      background: disabled ? C.elevated : C.primary,
      color: disabled ? C.textMute : C.textPri,
      fontFamily:RF, fontSize:16, fontWeight:600,
      border:'none', cursor: disabled ? 'not-allowed' : 'pointer',
      letterSpacing:0.2, transition:'background 0.2s', ...style,
    }}>{label}</button>
  )
}

function GhostBtn({ label, onPress, style={} }) {
  return (
    <button onClick={onPress} style={{
      width:'100%', height:52, borderRadius:80,
      background:'transparent', color:C.textPri,
      fontFamily:RF, fontSize:16, fontWeight:500,
      border:'none', cursor:'pointer', letterSpacing:0.2, ...style,
    }}>{label}</button>
  )
}

function TextInput({ label, value, onChange, hint, error, type='text' }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ marginBottom:12 }}>
      <div style={{
        borderRadius:12, background:C.surf,
        border:`1px solid ${error ? C.error : focused ? C.pri400 : C.border}`,
        padding:'10px 16px', transition:'border-color 0.2s',
      }}>
        {(focused || value) && (
          <div style={{ fontFamily:RF, fontSize:11, color:C.textMute, marginBottom:2, letterSpacing:0.3 }}>{label}</div>
        )}
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={focused ? '' : label}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            background:'none', border:'none', outline:'none', width:'100%',
            color:C.textPri, fontFamily:RF, fontSize:15, padding:0,
            letterSpacing:0.2,
          }}
        />
      </div>
      {hint && !error && <div style={{ fontFamily:RF, fontSize:11, color:C.textMute, marginTop:4, paddingLeft:2 }}>{hint}</div>}
      {error && <div style={{ fontFamily:RF, fontSize:11, color:C.error, marginTop:4, paddingLeft:2 }}>⚠ {error}</div>}
    </div>
  )
}

function NumPad({ onKey }) {
  const rows = [['1','2','3'],['4','5','6'],['7','8','9'],['','0','⌫']]
  const sub = { '2':'ABC','3':'DEF','4':'GHI','5':'JKL','6':'MNO','7':'PQRS','8':'TUV','9':'WXYZ' }
  return (
    <div style={{ padding:'0 12px' }}>
      {rows.map((row, ri) => (
        <div key={ri} style={{ display:'flex', marginBottom:2 }}>
          {row.map((k, ki) => (
            <button key={ki} onClick={() => k && onKey(k)} style={{
              flex:1, height:66, margin:'0 2px',
              background: k ? C.surf : 'transparent',
              border:'none', borderRadius:8, cursor: k ? 'pointer' : 'default',
              color:C.textPri, fontFamily: k === '⌫' ? 'system-ui' : RF,
              fontSize: k === '⌫' ? 22 : 26, fontWeight:400,
              display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:2,
            }}>
              {k}
              {sub[k] && <span style={{ fontSize:9, letterSpacing:1, color:C.textMute, fontFamily:RF }}>{sub[k]}</span>}
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}

function BottomSheet({ title, onDismiss, children }) {
  return (
    <div style={{ position:'absolute', inset:0, zIndex:100, display:'flex', alignItems:'flex-end' }}>
      <div onClick={onDismiss} style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.55)' }}/>
      <div style={{
        position:'relative', width:'100%',
        background:C.surf, borderRadius:'24px 24px 0 0',
        padding:'20px 20px 36px',
        boxShadow:'0 -4px 48px rgba(0,0,0,0.5)',
        maxHeight:'75%', overflowY:'auto',
      }}>
        {/* drag handle */}
        <div style={{ width:36, height:4, borderRadius:2, background:C.elevated, margin:'0 auto 20px' }}/>
        {title && <div style={{ fontFamily:RF, fontSize:18, fontWeight:700, color:C.textPri, marginBottom:16, textAlign:'center' }}>{title}</div>}
        {children}
      </div>
    </div>
  )
}

function Screen({ children, scrollable=false }) {
  return (
    <div style={{
      position:'absolute', inset:0, background:C.bg,
      display:'flex', flexDirection:'column',
      overflowY: scrollable ? 'auto' : 'hidden',
    }}>
      {children}
    </div>
  )
}

// ─── Splash Illustrations ──────────────────────────────────────────────────────

function Illus1() {
  return (
    <div style={{ width:280, height:280, position:'relative', display:'flex', alignItems:'center', justifyContent:'center' }}>
      {Array.from({length:14}).map((_,i) => (
        <div key={i} style={{
          position:'absolute', width:1.5, height:130,
          background:'linear-gradient(to top, transparent, rgba(35,35,255,0.35))',
          transformOrigin:'bottom center',
          transform:`rotate(${i*(360/14)}deg) translateY(-50%)`,
          top:'50%', left:'50%', marginLeft:-0.75,
        }}/>
      ))}
      <div style={{
        width:96, height:96, borderRadius:'50%',
        background:'linear-gradient(145deg, #2a2a42, #181828)',
        border:'2px solid rgba(255,255,255,0.12)',
        display:'flex', alignItems:'center', justifyContent:'center',
        boxShadow:'0 0 48px rgba(35,35,255,0.35), inset 0 2px 4px rgba(255,255,255,0.08)',
        position:'relative', zIndex:1,
      }}>
        <span style={{ fontFamily:OF, fontSize:38, fontWeight:700, color:C.textPri, letterSpacing:-1 }}>N</span>
      </div>
    </div>
  )
}

function Illus2() {
  return (
    <div style={{ width:300, height:260, position:'relative' }}>
      <div style={{
        position:'absolute', left:12, top:8,
        width:220, borderRadius:20,
        background:'linear-gradient(135deg, #1A1D24, #2D303B)',
        border:'1px solid rgba(255,255,255,0.08)',
        padding:20, transform:'rotate(-4deg)',
        boxShadow:'0 16px 48px rgba(0,0,0,0.5)',
      }}>
        <div style={{ fontFamily:RF, fontSize:10, color:C.textMute, marginBottom:6, letterSpacing:1 }}>INVOICE #INV-001</div>
        <div style={{ fontFamily:OF, fontSize:22, color:C.textPri, marginBottom:14 }}>₦ 450,000</div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ height:5, width:'55%', borderRadius:3, background:C.elevated }}/>
          <div style={{ height:20, width:48, borderRadius:10, background:C.success, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ fontFamily:RF, fontSize:9, color:'#fff', fontWeight:700 }}>PAID</span>
          </div>
        </div>
      </div>
      <div style={{
        position:'absolute', right:8, bottom:0,
        width:220, borderRadius:20,
        background:'linear-gradient(135deg, #1a204488, #2323ff18)',
        border:'1px solid rgba(35,35,255,0.25)',
        padding:20, transform:'rotate(3deg)',
        boxShadow:'0 16px 48px rgba(0,0,0,0.5)',
      }}>
        <div style={{ fontFamily:RF, fontSize:10, color:C.textMute, marginBottom:6, letterSpacing:1 }}>INVOICE #INV-002</div>
        <div style={{ fontFamily:OF, fontSize:22, color:C.textPri, marginBottom:14 }}>₦ 120,000</div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ height:5, width:'55%', borderRadius:3, background:C.elevated }}/>
          <div style={{ height:20, width:60, borderRadius:10, background:'rgba(239,68,68,0.15)', border:`1px solid ${C.error}`, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ fontFamily:RF, fontSize:9, color:C.error, fontWeight:700 }}>OVERDUE</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Illus3() {
  const cards = [
    { bg:'linear-gradient(135deg,#1A2060,#0d1040)', y:24 },
    { bg:'linear-gradient(135deg,#1A1D24,#2D303B)', y:12 },
    { bg:'linear-gradient(135deg,#2323FF,#4C4CFF)', y:0 },
  ]
  return (
    <div style={{ width:280, height:240, position:'relative', display:'flex', alignItems:'center', justifyContent:'center' }}>
      {cards.map((c,i) => (
        <div key={i} style={{
          position:'absolute', width:240, height:136, borderRadius:16,
          background:c.bg, border:'1px solid rgba(255,255,255,0.08)',
          top:c.y, boxShadow:'0 8px 32px rgba(0,0,0,0.4)',
          padding:'16px 20px', display:'flex', flexDirection:'column', justifyContent:'space-between',
        }}>
          {i === 2 && <>
            <div style={{ fontFamily:RF, fontSize:10, color:'rgba(255,255,255,0.6)', letterSpacing:1 }}>NUKODES BUSINESS</div>
            <div>
              <div style={{ fontFamily:OF, fontSize:20, color:C.textPri, marginBottom:3 }}>₦ 18,750,239</div>
              <div style={{ fontFamily:RF, fontSize:11, color:'rgba(255,255,255,0.5)' }}>Cash on Hand</div>
            </div>
          </>}
        </div>
      ))}
    </div>
  )
}

function Illus4() {
  return (
    <div style={{ width:240, height:240, position:'relative', display:'flex', alignItems:'center', justifyContent:'center' }}>
      {[168,136,104,72].map((s,i) => (
        <div key={i} style={{
          position:'absolute', width:s, height:s,
          borderRadius: 16 + i*6,
          border:`1px solid rgba(35,35,255,${0.7 - i*0.13})`,
          background: i === 3 ? 'linear-gradient(135deg,#2323FF,#4C4CFF)' : 'transparent',
          display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow: i === 3 ? '0 0 32px rgba(35,35,255,0.5)' : 'none',
        }}>
          {i === 3 && (
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" fill="white"/>
            </svg>
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Screens ──────────────────────────────────────────────────────────────────

function SplashScreen({ onCreateAccount, onLogIn }) {
  const [slide, setSlide] = useState(0)
  const slides = [
    { headline:'Built for Nigerian businesses', sub:'Run your business smarter — from invoicing to cash flow management', el:<Illus1/> },
    { headline:'Invoice, track, grow', sub:'Create professional invoices and track every naira you earn', el:<Illus2/> },
    { headline:'Cash flow in your hands', sub:'Monitor all your accounts and expenses in real time, anywhere', el:<Illus3/> },
    { headline:'Offline-ready security', sub:'Your data stays safe and syncs automatically when you reconnect', el:<Illus4/> },
  ]
  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s+1)%4), 3200)
    return () => clearInterval(t)
  }, [])

  return (
    <Screen>
      <StatusBar />
      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'8px 0' }}>
        {slides[slide].el}
      </div>
      <div style={{ padding:'0 24px' }}>
        {/* slide dots */}
        <div style={{ display:'flex', gap:5, marginBottom:20 }}>
          {slides.map((_,i) => (
            <div key={i} onClick={() => setSlide(i)} style={{
              height:3, borderRadius:2, cursor:'pointer', transition:'all 0.35s',
              background: i === slide ? C.textPri : C.elevated,
              width: i === slide ? 24 : 10,
            }}/>
          ))}
        </div>
        <h1 style={{ fontFamily:RF, fontSize:32, fontWeight:700, color:C.textPri, margin:'0 0 10px', lineHeight:'38px', letterSpacing:-0.64 }}>
          {slides[slide].headline}
        </h1>
        <p style={{ fontFamily:RF, fontSize:14, color:C.textSec, margin:'0 0 28px', lineHeight:'22px' }}>
          {slides[slide].sub}
        </p>
      </div>
      <div style={{ padding:'0 20px 40px', display:'flex', flexDirection:'column', gap:10 }}>
        <PrimaryBtn label="Create account" onPress={onCreateAccount}/>
        <GhostBtn label="Log in" onPress={onLogIn}/>
      </div>
    </Screen>
  )
}

function GetStartedScreen({ onContinue, onBack }) {
  const [selected, setSelected] = useState(COUNTRIES[0]) // default Nigeria
  const [sheetOpen, setSheetOpen] = useState(false)
  const [search, setSearch] = useState('')
  const searchRef = useRef(null)

  const suggested = COUNTRIES.filter(c => SUGGESTED_CODES.includes(c.code))
  const filtered = search.trim()
    ? COUNTRIES.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    : COUNTRIES.filter(c => !SUGGESTED_CODES.includes(c.code))

  const openSheet = () => {
    setSearch('')
    setSheetOpen(true)
    setTimeout(() => searchRef.current?.focus(), 120)
  }

  const pick = (country) => {
    setSelected(country)
    setSheetOpen(false)
    setSearch('')
  }

  return (
    <Screen>
      <StatusBar />
      <div style={{ padding:'8px 20px', flex:1, display:'flex', flexDirection:'column' }}>
        <BackBtn onPress={onBack}/>
        <h1 style={{ fontFamily:RF, fontSize:28, fontWeight:700, color:C.textPri, margin:'0 0 8px', letterSpacing:-0.5 }}>
          Let's get started!
        </h1>
        <p style={{ fontFamily:RF, fontSize:14, color:C.textSec, margin:'0 0 28px', lineHeight:'20px' }}>
          Select the country you set up your business in
        </p>

        {/* Country selector */}
        <button onClick={openSheet} style={{
          borderRadius:12, background:C.surf, border:`1px solid ${C.border}`,
          padding:'14px 16px', display:'flex', alignItems:'center', justifyContent:'space-between',
          cursor:'pointer', width:'100%', textAlign:'left',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <span style={{ fontSize:22 }}>{selected.flag}</span>
            <div>
              <div style={{ fontFamily:RF, fontSize:11, color:C.textMute, marginBottom:2 }}>Country of incorporation</div>
              <div style={{ fontFamily:RF, fontSize:15, color:C.textPri }}>{selected.name}</div>
            </div>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke={C.textMute} strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <div style={{ flex:1 }}/>
        <p style={{ fontFamily:RF, fontSize:12, color:C.textMute, textAlign:'center', margin:'0 0 16px', lineHeight:'18px' }}>
          By proceeding, you agree to our <span style={{ color:C.pri400 }}>Terms of Service</span> and that you have read and understood our <span style={{ color:C.pri400 }}>Privacy Policy</span>
        </p>
        <PrimaryBtn label="Continue" onPress={onContinue}/>
        <GhostBtn label="I've been invited to join a business" onPress={()=>{}} style={{ marginTop:4, fontSize:14 }}/>
      </div>

      {/* Country bottom sheet */}
      {sheetOpen && (
        <div style={{ position:'absolute', inset:0, zIndex:100, display:'flex', alignItems:'flex-end' }}>
          <div onClick={() => { setSheetOpen(false); setSearch('') }} style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.55)' }}/>
          <div style={{
            position:'relative', width:'100%',
            background:C.surf, borderRadius:'24px 24px 0 0',
            paddingBottom:36,
            boxShadow:'0 -4px 48px rgba(0,0,0,0.5)',
            display:'flex', flexDirection:'column',
            maxHeight:'82%',
          }}>
            {/* drag handle */}
            <div style={{ width:36, height:4, borderRadius:2, background:C.elevated, margin:'14px auto 0', flexShrink:0 }}/>

            {/* title */}
            <div style={{ fontFamily:RF, fontSize:18, fontWeight:700, color:C.textPri, textAlign:'center', padding:'14px 20px 12px', flexShrink:0 }}>
              Country of incorporation
            </div>

            {/* search */}
            <div style={{ padding:'0 16px 12px', flexShrink:0 }}>
              <div style={{
                borderRadius:10, background:C.elevated,
                display:'flex', alignItems:'center', gap:10,
                padding:'10px 14px',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" stroke={C.textMute} strokeWidth="1.5"/>
                  <path d="M21 21l-4.35-4.35" stroke={C.textMute} strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <input
                  ref={searchRef}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search country"
                  style={{
                    background:'none', border:'none', outline:'none',
                    fontFamily:RF, fontSize:15, color:C.textPri, flex:1,
                  }}
                />
                {search && (
                  <button onClick={() => setSearch('')} style={{ background:'none', border:'none', cursor:'pointer', padding:0, display:'flex', alignItems:'center' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" fill={C.elevated}/>
                      <path d="M8 8l8 8M16 8l-8 8" stroke={C.textMute} strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* list */}
            <div style={{ overflowY:'auto', flex:1, padding:'0 16px' }}>
              {!search.trim() && (
                <>
                  <div style={{ fontFamily:RF, fontSize:12, color:C.textMute, letterSpacing:1, textTransform:'uppercase', padding:'4px 0 8px' }}>
                    Suggested
                  </div>
                  {suggested.map(c => (
                    <CountryRow key={c.code} country={c} selected={selected} onPick={pick}/>
                  ))}
                  <div style={{ fontFamily:RF, fontSize:12, color:C.textMute, letterSpacing:1, textTransform:'uppercase', padding:'12px 0 8px' }}>
                    All countries
                  </div>
                </>
              )}
              {filtered.length === 0 && (
                <div style={{ fontFamily:RF, fontSize:14, color:C.textMute, textAlign:'center', padding:'32px 0' }}>
                  No results for "{search}"
                </div>
              )}
              {filtered.map(c => (
                <CountryRow key={c.code} country={c} selected={selected} onPick={pick}/>
              ))}
              <div style={{ height:8 }}/>
            </div>
          </div>
        </div>
      )}
    </Screen>
  )
}

function CountryRow({ country, selected, onPick }) {
  const isSelected = selected.code === country.code
  return (
    <button onClick={() => onPick(country)} style={{
      width:'100%', background:'none', border:'none', cursor:'pointer',
      padding:'13px 4px', borderBottom:`1px solid ${C.elevated}`,
      display:'flex', alignItems:'center', gap:14, textAlign:'left',
    }}>
      <span style={{ fontSize:22, lineHeight:1, flexShrink:0 }}>{country.flag}</span>
      <span style={{ fontFamily:RF, fontSize:15, color:C.textPri, flex:1 }}>{country.name}</span>
      {isSelected && (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M5 12l5 5L19 7" stroke={C.primary} strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      )}
    </button>
  )
}

function BusinessTypeScreen({ data, setData, onContinue, onBack }) {
  const [sheetOpen, setSheetOpen] = useState(false)
  const [marketing, setMarketing] = useState(false)
  const selected = BUSINESS_TYPES.find(b => b.id === data.businessType)
  return (
    <Screen>
      <StatusBar />
      <div style={{ padding:'8px 20px', flex:1, display:'flex', flexDirection:'column' }}>
        <BackBtn onPress={onBack}/>
        <h1 style={{ fontFamily:RF, fontSize:28, fontWeight:700, color:C.textPri, margin:'0 0 8px', letterSpacing:-0.5 }}>
          Legal business type
        </h1>
        <p style={{ fontFamily:RF, fontSize:14, color:C.textSec, margin:'0 0 24px', lineHeight:'20px' }}>
          Select the type that best describes your business. This helps us set up the right account.
        </p>
        <button onClick={() => setSheetOpen(true)} style={{
          borderRadius:12, background:C.surf, border:`1px solid ${C.border}`,
          padding:'14px 16px', display:'flex', alignItems:'center', justifyContent:'space-between',
          cursor:'pointer', width:'100%', textAlign:'left',
        }}>
          {selected
            ? <div><div style={{ fontFamily:RF, fontSize:11, color:C.textMute, marginBottom:2 }}>Legal business type</div>
                <div style={{ fontFamily:RF, fontSize:15, color:C.textPri }}>{selected.label}</div></div>
            : <span style={{ fontFamily:RF, fontSize:15, color:C.textMute }}>Legal business type</span>
          }
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke={C.textMute} strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <div style={{ flex:1 }}/>
        <div style={{ display:'flex', gap:12, alignItems:'flex-start', marginBottom:20 }}>
          <div onClick={() => setMarketing(v=>!v)} style={{
            width:20, height:20, borderRadius:4, flexShrink:0, marginTop:1,
            background: marketing ? C.primary : 'transparent',
            border:`2px solid ${marketing ? C.primary : C.elevated}`,
            cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
            transition:'all 0.2s',
          }}>
            {marketing && <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
              <path d="M1 4.5L4.5 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>}
          </div>
          <p style={{ fontFamily:RF, fontSize:12, color:C.textMute, margin:0, lineHeight:'18px' }}>
            Update me about personalised Nukodes offers, products, and services
          </p>
        </div>
        <PrimaryBtn label="Continue" onPress={onContinue} disabled={!selected}/>
      </div>

      {sheetOpen && (
        <BottomSheet title="Legal business type" onDismiss={() => setSheetOpen(false)}>
          <button style={{ background:'none', border:'none', cursor:'pointer', color:C.pri400, fontFamily:RF, fontSize:14, padding:'4px 0 14px', display:'block' }}>
            My business type isn't listed
          </button>
          {BUSINESS_TYPES.map((bt,i) => (
            <button key={bt.id} onClick={() => { setData(d=>({...d,businessType:bt.id})); setSheetOpen(false) }} style={{
              width:'100%', background:'none', border:'none', cursor:'pointer',
              padding:'14px 0', borderTop:`1px solid ${C.elevated}`,
              textAlign:'left', display:'flex', justifyContent:'space-between', alignItems:'center',
            }}>
              <span style={{ fontFamily:RF, fontSize:15, color:C.textPri }}>{bt.label}</span>
              {data.businessType === bt.id && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12l5 5L19 7" stroke={C.primary} strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              )}
            </button>
          ))}
        </BottomSheet>
      )}
    </Screen>
  )
}

function CreateAccountScreen({ data, setData, onContinue, onBack }) {
  const [showConfirm, setShowConfirm] = useState(false)
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email||'')
  return (
    <Screen scrollable>
      <StatusBar />
      <div style={{ padding:'8px 20px', flex:1, display:'flex', flexDirection:'column' }}>
        <BackBtn onPress={onBack}/>
        <h1 style={{ fontFamily:RF, fontSize:28, fontWeight:700, color:C.textPri, margin:'0 0 8px', letterSpacing:-0.5 }}>
          Create your Nukodes account
        </h1>
        <p style={{ fontFamily:RF, fontSize:14, color:C.textSec, margin:'0 0 24px', lineHeight:'20px' }}>
          Enter your email address. We'll send you a confirmation link there.
        </p>
        <TextInput label="Enter your email" type="email" value={data.email||''} onChange={v => setData(d=>({...d,email:v}))}/>
        <button style={{ background:'none', border:'none', cursor:'pointer', color:C.pri400, fontFamily:RF, fontSize:13, padding:'2px 0 20px', textAlign:'left' }}>
          Already have a Nukodes account?
        </button>
        <BlueBtn label="Continue" onPress={() => valid && setShowConfirm(true)} disabled={!valid}/>
        <div style={{ display:'flex', alignItems:'center', gap:12, margin:'20px 0 16px' }}>
          <div style={{ flex:1, height:1, background:C.elevated }}/><span style={{ fontFamily:RF, fontSize:13, color:C.textMute }}>or sign up with</span><div style={{ flex:1, height:1, background:C.elevated }}/>
        </div>
        {[
          { icon:<svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>, label:'Sign up with Google' },
          { icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>, label:'Sign up with Apple' },
        ].map(s => (
          <button key={s.label} style={{
            height:52, borderRadius:80, background:C.surf, border:`1px solid ${C.border}`,
            display:'flex', alignItems:'center', justifyContent:'center', gap:10,
            cursor:'pointer', fontFamily:RF, fontSize:15, color:C.textPri, marginBottom:10,
          }}>
            {s.icon}{s.label}
          </button>
        ))}
      </div>

      {showConfirm && (
        <BottomSheet onDismiss={() => setShowConfirm(false)}>
          <div style={{ textAlign:'center', padding:'0 8px' }}>
            <div style={{ fontFamily:RF, fontSize:18, fontWeight:700, color:C.textPri, marginBottom:8, wordBreak:'break-all' }}>{data.email}</div>
            <div style={{ fontFamily:RF, fontSize:14, color:C.textSec, marginBottom:24, lineHeight:'20px' }}>Is the email entered correctly?</div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              <PrimaryBtn label="Confirm" onPress={onContinue}/>
              <GhostBtn label="Go back" onPress={() => setShowConfirm(false)}/>
            </div>
          </div>
        </BottomSheet>
      )}
    </Screen>
  )
}

function CheckEmailScreen({ data, onContinue, onBack }) {
  const masked = (data.email||'').replace(/(.{2})(.*)(@.*)/, (_,a,b,c) => a + '•••' + c)
  return (
    <Screen>
      <StatusBar />
      <div style={{ padding:'8px 20px', flex:1, display:'flex', flexDirection:'column' }}>
        <BackBtn onPress={onBack}/>
        <h1 style={{ fontFamily:RF, fontSize:28, fontWeight:700, color:C.textPri, margin:'0 0 12px', letterSpacing:-0.5 }}>
          Check email on this device
        </h1>
        <p style={{ fontFamily:RF, fontSize:14, color:C.textSec, margin:'0 0 6px', lineHeight:'22px' }}>
          We've sent a verification email. Check your inbox for an email from <span style={{ color:C.textPri }}>{masked}</span>, including spam and junk folders. Tap the link in the email to continue.
        </p>
        <button style={{ background:'none', border:'none', cursor:'pointer', color:C.pri400, fontFamily:RF, fontSize:13, padding:'4px 0', textAlign:'left' }}>
          I don't have email on this device
        </button>
        <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <svg width="88" height="72" viewBox="0 0 88 72" fill="none">
            <rect x="2" y="2" width="84" height="68" rx="10" fill={C.surf} stroke={C.elevated} strokeWidth="2"/>
            <path d="M4 12L44 42L84 12" stroke={C.elevated} strokeWidth="2"/>
          </svg>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          <PrimaryBtn label="Go to inbox" onPress={onContinue}/>
          <GhostBtn label="Didn't receive email?" onPress={()=>{}}/>
        </div>
      </div>
    </Screen>
  )
}

function PhoneNumberScreen({ data, setData, onContinue, onBack }) {
  const [input, setInput] = useState(data.phone||'')
  const [showConfirm, setShowConfirm] = useState(false)
  const handleKey = k => {
    if (k==='⌫') { setInput(v=>v.slice(0,-1)); return }
    if (input.length < 10) setInput(v=>v+k)
  }
  const valid = input.length >= 8
  return (
    <Screen>
      <StatusBar />
      <div style={{ padding:'8px 20px 0', display:'flex', flexDirection:'column' }}>
        <BackBtn onPress={onBack}/>
        <h1 style={{ fontFamily:RF, fontSize:28, fontWeight:700, color:C.textPri, margin:'0 0 8px', letterSpacing:-0.5 }}>
          Phone number
        </h1>
        <p style={{ fontFamily:RF, fontSize:14, color:C.textSec, margin:'0 0 24px', lineHeight:'20px' }}>
          Enter your phone number. We'll send you a verification code there.
        </p>
        <div style={{
          borderRadius:12, background:C.surf, border:`1px solid ${C.pri400}`,
          padding:'14px 16px', display:'flex', alignItems:'center', gap:10, marginBottom:16,
        }}>
          <span style={{ fontSize:20 }}>🇳🇬</span>
          <span style={{ fontFamily:RF, fontSize:14, color:C.textSec }}>+234</span>
          <div style={{ width:1, height:18, background:C.elevated }}/>
          <span style={{ fontFamily:OF, fontSize:20, color: input ? C.textPri : C.textMute, letterSpacing:1.5, flex:1 }}>
            {input || <span style={{ fontFamily:RF, fontSize:14, letterSpacing:0 }}>Enter your phone</span>}
          </span>
        </div>
        <BlueBtn label="Continue" onPress={() => valid && setShowConfirm(true)} disabled={!valid} style={{ marginBottom:16 }}/>
      </div>
      <div style={{ flex:1 }}/>
      <div style={{ paddingBottom:20 }}>
        <NumPad onKey={handleKey}/>
      </div>

      {showConfirm && (
        <BottomSheet onDismiss={() => setShowConfirm(false)}>
          <div style={{ textAlign:'center', padding:'0 8px' }}>
            <div style={{ fontFamily:OF, fontSize:22, fontWeight:600, color:C.textPri, marginBottom:8 }}>+234 {input}</div>
            <div style={{ fontFamily:RF, fontSize:14, color:C.textSec, marginBottom:24, lineHeight:'20px' }}>
              Is this number correct? We'll send you a confirmation code there.
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              <PrimaryBtn label="Confirm" onPress={() => { setData(d=>({...d,phone:input})); onContinue() }}/>
              <GhostBtn label="Go back" onPress={() => setShowConfirm(false)}/>
            </div>
          </div>
        </BottomSheet>
      )}
    </Screen>
  )
}

function OTPScreen({ onContinue, onBack }) {
  const [code, setCode] = useState(['','','','','',''])
  const refs = useRef([])
  const handleChange = (i, val) => {
    const v = val.replace(/\D/g,'').slice(-1)
    const next = [...code]; next[i]=v; setCode(next)
    if (v && i<5) refs.current[i+1]?.focus()
    if (next.every(c=>c)) setTimeout(onContinue, 300)
  }
  const handleKeyDown = (i, e) => {
    if (e.key==='Backspace' && !code[i] && i>0) refs.current[i-1]?.focus()
  }
  return (
    <Screen>
      <StatusBar />
      <div style={{ padding:'8px 20px', flex:1, display:'flex', flexDirection:'column' }}>
        <BackBtn onPress={onBack}/>
        <h1 style={{ fontFamily:RF, fontSize:28, fontWeight:700, color:C.textPri, margin:'0 0 8px', letterSpacing:-0.5 }}>
          6-digit code
        </h1>
        <p style={{ fontFamily:RF, fontSize:14, color:C.textSec, margin:'0 0 36px', lineHeight:'20px' }}>
          Enter the code sent to your phone number
        </p>
        <div style={{ display:'flex', gap:8, justifyContent:'center' }}>
          {code.map((c,i) => (
            <React.Fragment key={i}>
              {i===3 && <div style={{ display:'flex', alignItems:'center', color:C.textMute, fontFamily:RF, fontSize:22, paddingBottom:2 }}>–</div>}
              <input
                ref={el => refs.current[i]=el}
                type="text" inputMode="numeric" maxLength={1} value={c}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                style={{
                  width:44, height:54, borderRadius:10, textAlign:'center',
                  background:C.surf, border:`2px solid ${c ? C.pri400 : C.elevated}`,
                  color:C.textPri, fontFamily:OF, fontSize:24, fontWeight:600,
                  outline:'none', transition:'border-color 0.2s',
                }}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </Screen>
  )
}

function CreatePasscodeScreen({ onContinue, onBack }) {
  const [code, setCode] = useState('')
  const [showError, setShowError] = useState(false)
  const MAX = 6
  const handleKey = k => {
    if (k==='⌫') { setCode(v=>v.slice(0,-1)); return }
    if (code.length>=MAX) return
    const next = code+k
    setCode(next)
    if (next.length===MAX) {
      const weak = /^(.)\1{5}$/.test(next) || ['123456','654321','000000','111111','222222'].includes(next)
      if (weak) { setShowError(true); setTimeout(()=>{ setCode(''); setShowError(false) },1800) }
      else setTimeout(()=>onContinue(next), 200)
    }
  }
  return (
    <Screen>
      <StatusBar />
      <div style={{ padding:'8px 20px 0', display:'flex', flexDirection:'column' }}>
        <BackBtn onPress={onBack}/>
      </div>
      <h1 style={{ fontFamily:RF, fontSize:24, fontWeight:700, color:C.textPri, textAlign:'center', margin:'8px 0 40px', letterSpacing:-0.5 }}>
        Create passcode
      </h1>
      <div style={{ display:'flex', gap:18, justifyContent:'center', marginBottom:48 }}>
        {Array.from({length:MAX}).map((_,i) => (
          <div key={i} style={{
            width:14, height:14, borderRadius:'50%',
            background: i<code.length ? C.textPri : C.elevated,
            transition:'background 0.15s',
          }}/>
        ))}
      </div>
      <div style={{ flex:1 }}/>
      <div style={{ paddingBottom:32 }}>
        <NumPad onKey={handleKey}/>
      </div>

      {showError && (
        <BottomSheet onDismiss={() => { setShowError(false); setCode('') }}>
          <div style={{ textAlign:'center', padding:'0 8px 8px' }}>
            <div style={{ fontSize:28, color:C.error, marginBottom:14 }}>✕</div>
            <div style={{ fontFamily:RF, fontSize:18, fontWeight:700, color:C.textPri, marginBottom:8 }}>
              This passcode can be guessed easily
            </div>
            <div style={{ fontFamily:RF, fontSize:13, color:C.textSec, marginBottom:20, lineHeight:'19px' }}>
              Avoid using 4 or more repeated digits (e.g., 111123) or simple sequences
            </div>
            <PrimaryBtn label="Change passcode" onPress={() => { setShowError(false); setCode('') }}/>
          </div>
        </BottomSheet>
      )}
    </Screen>
  )
}

function FullNameScreen({ data, setData, onContinue, onBack }) {
  const valid = data.firstName?.trim() && data.lastName?.trim()
  return (
    <Screen scrollable>
      <StatusBar />
      <div style={{ padding:'8px 20px', flex:1, display:'flex', flexDirection:'column' }}>
        <BackBtn onPress={onBack}/>
        <h1 style={{ fontFamily:RF, fontSize:28, fontWeight:700, color:C.textPri, margin:'0 0 8px', letterSpacing:-0.5 }}>
          Name as it appears in ID
        </h1>
        <p style={{ fontFamily:RF, fontSize:14, color:C.textSec, margin:'0 0 24px', lineHeight:'20px' }}>
          Name as it appears in your official documents
        </p>
        <TextInput label="First name" value={data.firstName||''} onChange={v=>setData(d=>({...d,firstName:v}))} hint="E.g., Adedayo, not 'Dayo'"/>
        <TextInput label="Last name" value={data.lastName||''} onChange={v=>setData(d=>({...d,lastName:v}))}/>
        <TextInput label="Alias (optional)" value={data.alias||''} onChange={v=>setData(d=>({...d,alias:v}))}/>
        <button style={{ background:'none', border:'none', cursor:'pointer', color:C.pri400, fontFamily:RF, fontSize:13, padding:'2px 0', textAlign:'left' }}>
          What's an alias?
        </button>
        <div style={{ flex:1 }}/>
        <BlueBtn label="Continue" onPress={onContinue} disabled={!valid}/>
      </div>
    </Screen>
  )
}

function DateOfBirthScreen({ data, setData, onContinue, onBack }) {
  const [input, setInput] = useState(data.dob||'')
  const [error, setError] = useState('')
  const handleKey = k => {
    setError('')
    if (k==='⌫') { setInput(v=>v.slice(0,-1)); return }
    if (input.length<8) setInput(v=>v+k)
  }
  const display = input.length>0
    ? input.slice(0,2) + (input.length>2?'/':'') + input.slice(2,4) + (input.length>4?'/':'') + input.slice(4,8)
    : ''
  const validate = () => {
    if (input.length<8) { setError('Please enter a complete date'); return }
    const m=parseInt(input.slice(0,2)), d=parseInt(input.slice(2,4)), y=parseInt(input.slice(4,8))
    const dob=new Date(y,m-1,d)
    const age=new Date().getFullYear()-dob.getFullYear()
    if (age<18||age>120) { setError('You must be aged between 18 and 120 years old'); return }
    setData(d=>({...d,dob:input})); onContinue()
  }
  return (
    <Screen>
      <StatusBar />
      <div style={{ padding:'8px 20px 0', display:'flex', flexDirection:'column' }}>
        <BackBtn onPress={onBack}/>
        <h1 style={{ fontFamily:RF, fontSize:28, fontWeight:700, color:C.textPri, margin:'0 0 8px', letterSpacing:-0.5 }}>
          Date of birth
        </h1>
        <p style={{ fontFamily:RF, fontSize:14, color:C.textSec, margin:'0 0 24px', lineHeight:'20px' }}>
          As stated on your official ID. You must be 18 or older to open a Nukodes account.
        </p>
        <div style={{
          borderRadius:12, background:C.surf,
          border:`1px solid ${error ? C.error : C.border}`,
          padding:'12px 16px', marginBottom:4,
        }}>
          <div style={{ fontFamily:RF, fontSize:11, color:C.textMute, marginBottom:3 }}>Date of birth</div>
          <div style={{ fontFamily:OF, fontSize:22, color: display ? C.textPri : C.textMute, letterSpacing:2 }}>
            {display || 'MM / DD / YYYY'}
          </div>
        </div>
        {error && <div style={{ color:C.error, fontFamily:RF, fontSize:12, marginBottom:12, paddingLeft:2 }}>⚠ {error}</div>}
        <BlueBtn label="Continue" onPress={validate} disabled={input.length<8} style={{ marginBottom:12, marginTop: error?0:12 }}/>
      </div>
      <div style={{ flex:1 }}/>
      <div style={{ paddingBottom:28 }}>
        <NumPad onKey={handleKey}/>
      </div>
    </Screen>
  )
}

function ResidentialAddressScreen({ data, setData, onContinue, onBack }) {
  const [stateOpen, setStateOpen] = useState(false)
  const [search, setSearch] = useState('')
  const filtered = NIGERIAN_STATES.filter(s => s.toLowerCase().includes(search.toLowerCase()))
  const valid = data.resState && data.resStreet
  return (
    <Screen scrollable>
      <StatusBar />
      <div style={{ padding:'8px 20px', display:'flex', flexDirection:'column' }}>
        <BackBtn onPress={onBack}/>
        <h1 style={{ fontFamily:RF, fontSize:28, fontWeight:700, color:C.textPri, margin:'0 0 8px', letterSpacing:-0.5 }}>
          Residential address
        </h1>
        <p style={{ fontFamily:RF, fontSize:14, color:C.textSec, margin:'0 0 24px', lineHeight:'20px' }}>
          Please enter your current legal residential address. We may require documentation depending on your state.
        </p>
        <button onClick={() => setStateOpen(true)} style={{
          borderRadius:12, background:C.surf, border:`1px solid ${C.border}`,
          padding:'14px 16px', display:'flex', alignItems:'center', justifyContent:'space-between',
          cursor:'pointer', width:'100%', textAlign:'left', marginBottom:12,
        }}>
          {data.resState
            ? <div><div style={{ fontFamily:RF, fontSize:11, color:C.textMute, marginBottom:2 }}>State</div>
                <div style={{ fontFamily:RF, fontSize:15, color:C.textPri }}>{data.resState}</div></div>
            : <span style={{ fontFamily:RF, fontSize:15, color:C.textMute }}>State or region</span>
          }
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke={C.textMute} strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <TextInput label="Street address, building" value={data.resStreet||''} onChange={v=>setData(d=>({...d,resStreet:v}))}/>
        <TextInput label="LGA / Area (optional)" value={data.resLGA||''} onChange={v=>setData(d=>({...d,resLGA:v}))}/>
        <TextInput label="Postal code (optional)" value={data.resPostal||''} onChange={v=>setData(d=>({...d,resPostal:v}))}/>
        <div style={{ height:16 }}/>
        <BlueBtn label="Continue" onPress={onContinue} disabled={!valid}/>
        <div style={{ height:32 }}/>
      </div>

      {stateOpen && (
        <BottomSheet title="Select state" onDismiss={() => { setStateOpen(false); setSearch('') }}>
          <div style={{
            borderRadius:10, background:C.elevated, border:`1px solid ${C.border}`,
            display:'flex', alignItems:'center', gap:8, padding:'10px 14px', marginBottom:12,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke={C.textMute} strokeWidth="1.5"/>
              <path d="M21 21l-4.35-4.35" stroke={C.textMute} strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Search state" style={{ background:'none', border:'none', outline:'none', fontFamily:RF, fontSize:14, color:C.textPri, flex:1 }}
            />
          </div>
          <div style={{ maxHeight:260, overflowY:'auto' }}>
            {filtered.map(s => (
              <button key={s} onClick={() => { setData(d=>({...d,resState:s})); setStateOpen(false); setSearch('') }} style={{
                width:'100%', background:'none', border:'none', cursor:'pointer',
                padding:'13px 0', borderTop:`1px solid ${C.elevated}`,
                textAlign:'left', display:'flex', justifyContent:'space-between', alignItems:'center',
              }}>
                <span style={{ fontFamily:RF, fontSize:15, color:C.textPri }}>{s}</span>
                {data.resState===s && <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L19 7" stroke={C.primary} strokeWidth="2.5" strokeLinecap="round"/></svg>}
              </button>
            ))}
          </div>
        </BottomSheet>
      )}
    </Screen>
  )
}

function BVNScreen({ data, setData, onContinue, onBack }) {
  const [tab, setTab] = useState('bvn')
  const val = tab==='bvn' ? (data.bvn||'') : (data.nin||'')
  const setVal = v => setData(d => tab==='bvn' ? {...d,bvn:v} : {...d,nin:v})
  const valid = val.length===11
  return (
    <Screen scrollable>
      <StatusBar />
      <div style={{ padding:'8px 20px', flex:1, display:'flex', flexDirection:'column' }}>
        <BackBtn onPress={onBack}/>
        <h1 style={{ fontFamily:RF, fontSize:28, fontWeight:700, color:C.textPri, margin:'0 0 8px', letterSpacing:-0.5 }}>
          Verify your identity
        </h1>
        <p style={{ fontFamily:RF, fontSize:14, color:C.textSec, margin:'0 0 24px', lineHeight:'20px' }}>
          Enter your BVN or NIN to verify your identity as required by the CBN.
        </p>
        {/* tab toggle */}
        <div style={{ display:'flex', background:C.surf, borderRadius:10, padding:3, marginBottom:20 }}>
          {['bvn','nin'].map(t => (
            <button key={t} onClick={()=>setTab(t)} style={{
              flex:1, height:36, borderRadius:8,
              background: tab===t ? C.textPri : 'transparent',
              color: tab===t ? C.textInv : C.textMute,
              fontFamily:RF, fontSize:14, fontWeight:700,
              border:'none', cursor:'pointer', transition:'all 0.2s', letterSpacing:1,
            }}>{t.toUpperCase()}</button>
          ))}
        </div>
        <TextInput
          label={tab==='bvn' ? 'Bank Verification Number (BVN)' : 'National Identification Number (NIN)'}
          value={val} onChange={setVal} type="tel"
          hint={tab==='bvn' ? 'Dial *565*0# on your phone to get your BVN' : '11-digit NIN from your ID slip or NIMC card'}
        />
        <div style={{ borderRadius:12, background:'rgba(35,35,255,0.08)', border:`1px solid rgba(35,35,255,0.2)`, padding:'12px 14px', marginTop:4 }}>
          <div style={{ fontFamily:RF, fontSize:12, color:C.textSec, lineHeight:'19px' }}>
            🔒 Your {tab.toUpperCase()} is encrypted end-to-end and only used for identity verification. Nukodes does not store or share it with third parties.
          </div>
        </div>
        <div style={{ flex:1 }}/>
        <BlueBtn label="Continue" onPress={onContinue} disabled={!valid}/>
        <div style={{ height:24 }}/>
      </div>
    </Screen>
  )
}

function PushNotifScreen({ onEnable, onSkip }) {
  return (
    <Screen>
      <StatusBar />
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'0 28px' }}>
        <div style={{
          width:88, height:88, borderRadius:24, background:C.surf,
          display:'flex', alignItems:'center', justifyContent:'center', marginBottom:28,
        }}>
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <path d="M22 4c-1.1 0-2 .9-2 2v1.6C13.7 8.9 9 14.1 9 20.5v9L5 33v2h34v-2l-4-3.5v-9C35 14.1 30.3 8.9 24 7.6V6c0-1.1-.9-2-2-2zm0 36c2.2 0 4-1.8 4-4H18c0 2.2 1.8 4 4 4z" fill="white"/>
          </svg>
        </div>
        <h1 style={{ fontFamily:RF, fontSize:26, fontWeight:700, color:C.textPri, textAlign:'center', margin:'0 0 12px', letterSpacing:-0.5 }}>
          Get what you need, in a tap
        </h1>
        <p style={{ fontFamily:RF, fontSize:14, color:C.textSec, textAlign:'center', lineHeight:'22px', margin:0 }}>
          Get instant payment alerts, invoice updates, overdue reminders, and important business notifications
        </p>
      </div>
      <div style={{ padding:'0 20px 40px', display:'flex', flexDirection:'column', gap:10 }}>
        <PrimaryBtn label="Enable push notifications" onPress={onEnable}/>
        <GhostBtn label="Not now" onPress={onSkip}/>
      </div>
    </Screen>
  )
}

function PersonalizationScreen({ onContinue }) {
  return (
    <Screen>
      <StatusBar />
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'0 28px' }}>
        <div style={{
          width:88, height:88, borderRadius:24, background:C.surf,
          display:'flex', alignItems:'center', justifyContent:'center', marginBottom:28,
        }}>
          <svg width="48" height="28" viewBox="0 0 48 28" fill="none">
            <rect width="48" height="28" rx="14" fill={C.elevated}/>
            <circle cx="36" cy="14" r="10" fill={C.textMute}/>
          </svg>
        </div>
        <h1 style={{ fontFamily:RF, fontSize:26, fontWeight:700, color:C.textPri, textAlign:'center', margin:'0 0 12px', letterSpacing:-0.5 }}>
          Help us tailor your experience
        </h1>
        <p style={{ fontFamily:RF, fontSize:14, color:C.textSec, textAlign:'center', lineHeight:'22px', margin:0 }}>
          See better in-app suggestions and fewer irrelevant notifications based on how you use Nukodes
        </p>
      </div>
      <div style={{ padding:'0 20px 40px' }}>
        <PrimaryBtn label="Continue" onPress={onContinue}/>
      </div>
    </Screen>
  )
}

function BusinessDetailsScreen({ data, setData, onContinue, onBack }) {
  const [typeOpen, setTypeOpen] = useState(false)
  const selected = BUSINESS_TYPES.find(b => b.id===(data.bizType||data.businessType))
  const valid = data.bizName && data.rcNumber && data.bizIncDate
  return (
    <Screen scrollable>
      <StatusBar />
      <div style={{ padding:'8px 20px', display:'flex', flexDirection:'column' }}>
        <BackBtn onPress={onBack}/>
        <h1 style={{ fontFamily:RF, fontSize:26, fontWeight:700, color:C.textPri, margin:'0 0 8px', letterSpacing:-0.5 }}>
          Tell us about your business
        </h1>
        <p style={{ fontFamily:RF, fontSize:14, color:C.textSec, margin:'0 0 20px', lineHeight:'20px' }}>
          We need these details to set up the right account for your business
        </p>
        <div style={{
          borderRadius:12, background:C.surf, border:`1px solid ${C.border}`,
          padding:'12px 16px', marginBottom:12, display:'flex', alignItems:'center', gap:12,
        }}>
          <span style={{ fontSize:20 }}>🇳🇬</span>
          <div>
            <div style={{ fontFamily:RF, fontSize:11, color:C.textMute, marginBottom:2 }}>Country of incorporation</div>
            <div style={{ fontFamily:RF, fontSize:15, color:C.textPri }}>Nigeria</div>
          </div>
        </div>
        <TextInput label="Business name" value={data.bizName||''} onChange={v=>setData(d=>({...d,bizName:v}))}/>
        <TextInput label="Business trade name (optional)" value={data.bizTradeName||''} onChange={v=>setData(d=>({...d,bizTradeName:v}))}/>
        <TextInput label="RC Number (CAC Registration)" value={data.rcNumber||''} onChange={v=>setData(d=>({...d,rcNumber:v}))} hint="E.g., RC1234567 — your CAC registration number"/>
        <TextInput label="Date of incorporation (MM/DD/YYYY)" value={data.bizIncDate||''} onChange={v=>setData(d=>({...d,bizIncDate:v}))}/>
        <button onClick={() => setTypeOpen(true)} style={{
          borderRadius:12, background:C.surf, border:`1px solid ${C.border}`,
          padding:'14px 16px', display:'flex', alignItems:'center', justifyContent:'space-between',
          cursor:'pointer', width:'100%', textAlign:'left', marginBottom:12,
        }}>
          {selected
            ? <div><div style={{ fontFamily:RF, fontSize:11, color:C.textMute, marginBottom:2 }}>Business type</div>
                <div style={{ fontFamily:RF, fontSize:15, color:C.textPri }}>{selected.label}</div></div>
            : <span style={{ fontFamily:RF, fontSize:15, color:C.textMute }}>Business type</span>
          }
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke={C.textMute} strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <div style={{ height:16 }}/>
        <BlueBtn label="Continue" onPress={onContinue} disabled={!valid}/>
        <div style={{ height:32 }}/>
      </div>

      {typeOpen && (
        <BottomSheet title="Business type" onDismiss={() => setTypeOpen(false)}>
          {BUSINESS_TYPES.map((bt,i) => (
            <button key={bt.id} onClick={() => { setData(d=>({...d,bizType:bt.id})); setTypeOpen(false) }} style={{
              width:'100%', background:'none', border:'none', cursor:'pointer',
              padding:'14px 0', borderTop: i>0 ? `1px solid ${C.elevated}` : 'none',
              textAlign:'left', display:'flex', justifyContent:'space-between', alignItems:'center',
            }}>
              <span style={{ fontFamily:RF, fontSize:15, color:C.textPri }}>{bt.label}</span>
              {(data.bizType||data.businessType)===bt.id && <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L19 7" stroke={C.primary} strokeWidth="2.5" strokeLinecap="round"/></svg>}
            </button>
          ))}
        </BottomSheet>
      )}
    </Screen>
  )
}

function BusinessAddressScreen({ data, setData, onContinue, onBack }) {
  const [stateOpen, setStateOpen] = useState(false)
  const valid = data.bizState && data.bizStreet
  return (
    <Screen scrollable>
      <StatusBar />
      <div style={{ padding:'8px 20px', display:'flex', flexDirection:'column' }}>
        <BackBtn onPress={onBack}/>
        <h1 style={{ fontFamily:RF, fontSize:26, fontWeight:700, color:C.textPri, margin:'0 0 8px', letterSpacing:-0.5 }}>
          Registered business address
        </h1>
        <p style={{ fontFamily:RF, fontSize:14, color:C.textSec, margin:'0 0 24px', lineHeight:'20px' }}>
          The official address registered with the CAC. This may differ from your trading address.
        </p>
        <button onClick={() => setStateOpen(true)} style={{
          borderRadius:12, background:C.surf, border:`1px solid ${C.border}`,
          padding:'14px 16px', display:'flex', alignItems:'center', justifyContent:'space-between',
          cursor:'pointer', width:'100%', textAlign:'left', marginBottom:12,
        }}>
          {data.bizState
            ? <div><div style={{ fontFamily:RF, fontSize:11, color:C.textMute, marginBottom:2 }}>State</div>
                <div style={{ fontFamily:RF, fontSize:15, color:C.textPri }}>{data.bizState}</div></div>
            : <span style={{ fontFamily:RF, fontSize:15, color:C.textMute }}>State</span>
          }
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke={C.textMute} strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <TextInput label="Street address, building" value={data.bizStreet||''} onChange={v=>setData(d=>({...d,bizStreet:v}))}/>
        <TextInput label="Floor, unit number (optional)" value={data.bizUnit||''} onChange={v=>setData(d=>({...d,bizUnit:v}))}/>
        <div style={{ height:16 }}/>
        <BlueBtn label="Continue" onPress={onContinue} disabled={!valid}/>
        <div style={{ height:32 }}/>
      </div>

      {stateOpen && (
        <BottomSheet title="Select state" onDismiss={() => setStateOpen(false)}>
          <div style={{ maxHeight:300, overflowY:'auto' }}>
            {NIGERIAN_STATES.map(s => (
              <button key={s} onClick={() => { setData(d=>({...d,bizState:s})); setStateOpen(false) }} style={{
                width:'100%', background:'none', border:'none', cursor:'pointer',
                padding:'13px 0', borderTop:`1px solid ${C.elevated}`,
                textAlign:'left', display:'flex', justifyContent:'space-between', alignItems:'center',
              }}>
                <span style={{ fontFamily:RF, fontSize:15, color:C.textPri }}>{s}</span>
                {data.bizState===s && <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L19 7" stroke={C.primary} strokeWidth="2.5" strokeLinecap="round"/></svg>}
              </button>
            ))}
          </div>
        </BottomSheet>
      )}
    </Screen>
  )
}

function CompanyRoleScreen({ data, setData, onContinue, onBack }) {
  const roles = [
    { id:'sole', emoji:'👤', title:'I am the only director and shareholder', desc:'You are the only director and shareholder with more than 25%' },
    { id:'one_of', emoji:'👥', title:'I am one of the directors or shareholders', desc:'You are one of the directors or shareholders with more than 25%' },
    { id:'neither', emoji:'📋', title:"I'm neither a director nor a shareholder", desc:'You are applying on behalf of your employer or client' },
  ]
  return (
    <Screen scrollable>
      <StatusBar />
      <div style={{ padding:'8px 20px', display:'flex', flexDirection:'column' }}>
        <BackBtn onPress={onBack}/>
        <h1 style={{ fontFamily:RF, fontSize:26, fontWeight:700, color:C.textPri, margin:'0 0 28px', letterSpacing:-0.5, lineHeight:'32px' }}>
          Tell us about your role in the company
        </h1>
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {roles.map(r => (
            <button key={r.id} onClick={() => { setData(d=>({...d,role:r.id})); onContinue() }} style={{
              borderRadius:16, background:C.surf,
              border:`1px solid ${data.role===r.id ? C.primary : C.border}`,
              padding:'16px', display:'flex', alignItems:'flex-start', gap:14,
              cursor:'pointer', textAlign:'left', width:'100%', transition:'border-color 0.2s',
            }}>
              <div style={{
                width:40, height:40, borderRadius:10, background:C.elevated, flexShrink:0,
                display:'flex', alignItems:'center', justifyContent:'center', fontSize:20,
              }}>{r.emoji}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:RF, fontSize:15, fontWeight:600, color:C.textPri, marginBottom:4, lineHeight:'20px' }}>{r.title}</div>
                <div style={{ fontFamily:RF, fontSize:13, color:C.textSec, lineHeight:'18px' }}>{r.desc}</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink:0, alignSelf:'center' }}>
                <path d="M9 18l6-6-6-6" stroke={C.textMute} strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          ))}
        </div>
        <div style={{ height:32 }}/>
      </div>
    </Screen>
  )
}

function ActivateAccountScreen({ onGoToDashboard }) {
  const tasks = [
    { id:'biz_address', label:'Business address' },
    { id:'nature',      label:'Nature of business' },
    { id:'biz_details', label:'Business details' },
    { id:'corporate',   label:'Corporate structure' },
    { id:'identity',    label:'Personal identity' },
    { id:'plan',        label:'Plan & subscription' },
  ]
  const icons = {
    biz_address: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" stroke={C.textMute} strokeWidth="1.5"/><path d="M7 8h10M7 12h6" stroke={C.textMute} strokeWidth="1.5" strokeLinecap="round"/></svg>,
    nature:      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.5" stroke={C.textMute} strokeWidth="1.5"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={C.textMute} strokeWidth="1.5" strokeLinecap="round"/></svg>,
    biz_details: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="4" y="2" width="16" height="20" rx="2" stroke={C.textMute} strokeWidth="1.5"/><path d="M8 7h8M8 11h8M8 15h5" stroke={C.textMute} strokeWidth="1.5" strokeLinecap="round"/></svg>,
    corporate:   <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="4.5" r="2.5" stroke={C.textMute} strokeWidth="1.5"/><circle cx="5" cy="19" r="2.5" stroke={C.textMute} strokeWidth="1.5"/><circle cx="19" cy="19" r="2.5" stroke={C.textMute} strokeWidth="1.5"/><path d="M12 7v4M12 11L5 16.5M12 11l7 5.5" stroke={C.textMute} strokeWidth="1.5" strokeLinecap="round"/></svg>,
    identity:    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="2" stroke={C.textMute} strokeWidth="1.5"/><circle cx="8" cy="12" r="2.5" stroke={C.textMute} strokeWidth="1.5"/><path d="M13 9h5M13 12h5M13 15h3" stroke={C.textMute} strokeWidth="1.5" strokeLinecap="round"/></svg>,
    plan:        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="2" stroke={C.textMute} strokeWidth="1.5"/><path d="M2 10h20" stroke={C.textMute} strokeWidth="1.5"/><path d="M6 15h4M14 15h4" stroke={C.textMute} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  }
  return (
    <Screen>
      <StatusBar />
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 20px' }}>
        <div style={{ width:38, height:38, borderRadius:10, background:C.surf, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="white" strokeWidth="1.5"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </div>
        <div style={{ flex:1, marginLeft:10, height:34, borderRadius:8, background:C.surf, display:'flex', alignItems:'center', paddingLeft:12, gap:8 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke={C.textMute} strokeWidth="1.5"/><path d="M21 21l-4.35-4.35" stroke={C.textMute} strokeWidth="1.5" strokeLinecap="round"/></svg>
          <span style={{ fontFamily:RF, fontSize:13, color:C.textMute }}>Search</span>
        </div>
        <div style={{ width:38, height:38, borderRadius:10, background:C.surf, display:'flex', alignItems:'center', justifyContent:'center', marginLeft:8 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1" stroke="white" strokeWidth="1.5"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="white" strokeWidth="1.5"/><rect x="3" y="14" width="7" height="7" rx="1" stroke="white" strokeWidth="1.5"/><rect x="14" y="14" width="7" height="7" rx="1" stroke="white" strokeWidth="1.5"/></svg>
        </div>
      </div>

      {/* hero */}
      <div style={{ textAlign:'center', padding:'12px 20px 20px' }}>
        <div style={{
          width:76, height:76, borderRadius:18, margin:'0 auto 16px',
          background:'linear-gradient(135deg,#1A1D24,#2D303B)',
          border:'1px solid rgba(255,255,255,0.08)',
          display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow:'0 0 32px rgba(35,35,255,0.22)',
        }}>
          <span style={{ fontFamily:OF, fontSize:30, fontWeight:700, color:C.textPri }}>N</span>
        </div>
        <h1 style={{ fontFamily:RF, fontSize:26, fontWeight:700, color:C.textPri, margin:'0 0 8px', letterSpacing:-0.5 }}>
          Activate your account
        </h1>
        <p style={{ fontFamily:RF, fontSize:14, color:C.textSec, margin:0, lineHeight:'20px' }}>
          You're almost there. Complete the remaining {tasks.length} tasks to activate your account
        </p>
      </div>

      {/* task list */}
      <div style={{ flex:1, overflowY:'auto', padding:'0 20px' }}>
        <div style={{ borderRadius:16, background:C.surf, border:`1px solid ${C.border}`, overflow:'hidden', marginBottom:16 }}>
          {tasks.map((t,i) => (
            <button key={t.id} style={{
              width:'100%', background:'none', border:'none', cursor:'pointer',
              padding:'14px 16px', display:'flex', alignItems:'center', gap:14,
              textAlign:'left', borderTop: i>0 ? `1px solid ${C.border}` : 'none',
            }}>
              <div style={{ width:36, height:36, borderRadius:8, background:C.elevated, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                {icons[t.id]}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:RF, fontSize:15, color:C.textPri }}>{t.label}</div>
                <div style={{ fontFamily:RF, fontSize:12, color:C.error, marginTop:2 }}>Requires action</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke={C.textMute} strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          ))}
        </div>
        <button onClick={onGoToDashboard} style={{
          width:'100%', height:46, borderRadius:80,
          background:'transparent', border:`1px solid ${C.border}`,
          color:C.textSec, fontFamily:RF, fontSize:14, cursor:'pointer',
          marginBottom:8,
        }}>
          I'll do this later → Go to Dashboard
        </button>
        <div style={{ height:24 }}/>
      </div>

      {/* bottom nav */}
      <div style={{
        height:72, background:'rgba(10,10,12,0.92)', backdropFilter:'blur(20px)',
        borderTop:`1px solid ${C.border}`, display:'flex', alignItems:'center',
        justifyContent:'space-around', padding:'0 8px 10px', flexShrink:0,
      }}>
        {['Home','Cards','Transfers','Merchant','More'].map((tab,i) => (
          <button key={tab} style={{
            display:'flex', flexDirection:'column', alignItems:'center', gap:3,
            background:'none', border:'none', cursor:'pointer', padding:'4px 10px',
          }}>
            <div style={{ width:22, height:22, background: i===0 ? C.primary : C.elevated, borderRadius:5 }}/>
            <span style={{ fontFamily:RF, fontSize:10, color: i===0 ? C.primary : C.textMute }}>{tab}</span>
          </button>
        ))}
      </div>
    </Screen>
  )
}

// ─── Router ────────────────────────────────────────────────────────────────────

export default function NukodesOnboarding() {
  const [screen, setScreen] = useState('splash')
  const [history, setHistory] = useState([])
  const [form, setForm] = useState({})

  const go = s => { setHistory(h=>[...h,screen]); setScreen(s) }
  const back = () => {
    if (!history.length) return
    setScreen(history[history.length-1])
    setHistory(h=>h.slice(0,-1))
  }

  const screens = {
    splash:             <SplashScreen onCreateAccount={()=>go('getStarted')} onLogIn={()=>{}}/>,
    getStarted:         <GetStartedScreen onContinue={()=>go('businessType')} onBack={back}/>,
    businessType:       <BusinessTypeScreen data={form} setData={setForm} onContinue={()=>go('createAccount')} onBack={back}/>,
    createAccount:      <CreateAccountScreen data={form} setData={setForm} onContinue={()=>go('checkEmail')} onBack={back}/>,
    checkEmail:         <CheckEmailScreen data={form} onContinue={()=>go('phoneNumber')} onBack={back}/>,
    phoneNumber:        <PhoneNumberScreen data={form} setData={setForm} onContinue={()=>go('otpCode')} onBack={back}/>,
    otpCode:            <OTPScreen onContinue={()=>go('createPasscode')} onBack={back}/>,
    createPasscode:     <CreatePasscodeScreen onContinue={()=>go('fullName')} onBack={back}/>,
    fullName:           <FullNameScreen data={form} setData={setForm} onContinue={()=>go('dateOfBirth')} onBack={back}/>,
    dateOfBirth:        <DateOfBirthScreen data={form} setData={setForm} onContinue={()=>go('residentialAddress')} onBack={back}/>,
    residentialAddress: <ResidentialAddressScreen data={form} setData={setForm} onContinue={()=>go('bvnNin')} onBack={back}/>,
    bvnNin:             <BVNScreen data={form} setData={setForm} onContinue={()=>go('pushNotif')} onBack={back}/>,
    pushNotif:          <PushNotifScreen onEnable={()=>go('personalization')} onSkip={()=>go('personalization')}/>,
    personalization:    <PersonalizationScreen onContinue={()=>go('businessDetails')}/>,
    businessDetails:    <BusinessDetailsScreen data={form} setData={setForm} onContinue={()=>go('businessAddress')} onBack={back}/>,
    businessAddress:    <BusinessAddressScreen data={form} setData={setForm} onContinue={()=>go('companyRole')} onBack={back}/>,
    companyRole:        <CompanyRoleScreen data={form} setData={setForm} onContinue={()=>go('activateAccount')} onBack={back}/>,
    activateAccount:    <ActivateAccountScreen onGoToDashboard={()=>{}}/>,
  }

  return (
    <div style={{
      width:'100vw', height:'100vh',
      display:'flex', alignItems:'center', justifyContent:'center',
      background:'#050508',
    }}>
      <div style={{
        width:393, height:852, borderRadius:44,
        overflow:'hidden', position:'relative',
        boxShadow:'0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08)',
      }}>
        {screens[screen]}
      </div>
    </div>
  )
}
