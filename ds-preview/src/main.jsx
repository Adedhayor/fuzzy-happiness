import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import NukodesApp from './Nukodes_App.jsx'

function AppSelector() {
    const [view, setView] = useState('app'); // 'ds' or 'app'

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
                    DS Reference
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
                    Mobile App
                </button>
            </div>

            {view === 'ds' ? <App /> : <NukodesApp />}
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AppSelector />
    </React.StrictMode>,
)
