import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import NukodesApp from './Nukodes_App.jsx'
import NukodesAppV2 from './Nukodes_App_V2.jsx'
import NukodesAppV3 from './Nukodes_App_V3.jsx'
import NukodesAppV4 from './Nukodes_App_V4.jsx'
import NukodesOnboarding from './Nukodes_Onboarding.jsx'
import EmailPreview from './emails/EmailPreview.jsx'

function AppSelector() {
    const [view, setView] = useState('v4'); // 'ds', 'app', 'v2', 'v3', 'v4', 'onboarding', 'emails'

    return (
        <div style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden' }}>
            <div style={{
                position: 'fixed',
                top: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 10000,
                display: 'flex',
                gap: 10,
                background: 'rgba(26, 29, 36, 0.8)',
                backdropFilter: 'blur(10px)',
                padding: '6px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}>
                <button
                    onClick={() => setView('ds')}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: 'none',
                        background: view === 'ds' ? '#2323FF' : 'transparent',
                        color: '#fff',
                        cursor: 'pointer',
                        fontFamily: 'Rokkitt, serif',
                        fontSize: '14px',
                        fontWeight: 600,
                        transition: 'background 0.2s'
                    }}
                >
                    DS
                </button>
                <button
                    onClick={() => setView('app')}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: 'none',
                        background: view === 'app' ? '#2323FF' : 'transparent',
                        color: '#fff',
                        cursor: 'pointer',
                        fontFamily: 'Rokkitt, serif',
                        fontSize: '14px',
                        fontWeight: 600,
                        transition: 'background 0.2s'
                    }}
                >
                    App V1
                </button>
                <button
                    onClick={() => setView('v2')}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: 'none',
                        background: view === 'v2' ? '#2323FF' : 'transparent',
                        color: '#fff',
                        cursor: 'pointer',
                        fontFamily: 'Rokkitt, serif',
                        fontSize: '14px',
                        fontWeight: 600,
                        transition: 'background 0.2s'
                    }}
                >
                    App V2
                </button>
                <button
                    onClick={() => setView('v3')}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: 'none',
                        background: view === 'v3' ? '#2323FF' : 'transparent',
                        color: '#fff',
                        cursor: 'pointer',
                        fontFamily: 'Rokkitt, serif',
                        fontSize: '14px',
                        fontWeight: 600,
                        transition: 'background 0.2s'
                    }}
                >
                    App V3
                </button>
                <button
                    onClick={() => setView('onboarding')}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: 'none',
                        background: view === 'onboarding' ? '#2323FF' : 'transparent',
                        color: '#fff',
                        cursor: 'pointer',
                        fontFamily: 'Rokkitt, serif',
                        fontSize: '14px',
                        fontWeight: 600,
                        transition: 'background 0.2s'
                    }}
                >
                    Onboarding
                </button>
                <button
                    onClick={() => setView('v4')}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: 'none',
                        background: view === 'v4' ? '#0A84FF' : 'transparent',
                        color: '#fff',
                        cursor: 'pointer',
                        fontFamily: 'Rokkitt, serif',
                        fontSize: '14px',
                        fontWeight: 600,
                        transition: 'background 0.2s'
                    }}
                >
                    App V4
                </button>
                <button
                    onClick={() => setView('emails')}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: 'none',
                        background: view === 'emails' ? '#2323FF' : 'transparent',
                        color: '#fff',
                        cursor: 'pointer',
                        fontFamily: 'Rokkitt, serif',
                        fontSize: '14px',
                        fontWeight: 600,
                        transition: 'background 0.2s'
                    }}
                >
                    Emails
                </button>
            </div>

            {view === 'ds' ? <App /> : view === 'app' ? <NukodesApp /> : view === 'v2' ? <NukodesAppV2 /> : view === 'v3' ? <NukodesAppV3 /> : view === 'v4' ? <NukodesAppV4 /> : view === 'onboarding' ? <NukodesOnboarding /> : <EmailPreview />}
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AppSelector />
    </React.StrictMode>,
)
