
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'


// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const isValidClerkKey =
  PUBLISHABLE_KEY &&
  PUBLISHABLE_KEY.trim() !== '' &&
  !PUBLISHABLE_KEY.includes('your_clerk_publishable_key') &&
  PUBLISHABLE_KEY.startsWith('pk_');

function SetupGuide() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        maxWidth: '580px',
        width: '100%',
        backgroundColor: '#1e293b',
        border: '1px solid #334155',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px'
          }}>
            ⚡
          </div>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 'bold', margin: 0 }}>QwixAI is Live!</h1>
            <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#94a3b8' }}>
              Frontend server running successfully at <code>http://localhost:5173</code>
            </p>
          </div>
        </div>

        <div style={{
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '24px'
        }}>
          <div style={{ color: '#fbbf24', fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>
            Next Step: Add your Clerk Publishable Key
          </div>
          <div style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: '1.5' }}>
            QwixAI uses Clerk for user authentication. To load the platform, add your Publishable Key to <code>client/.env</code>.
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px', color: '#cbd5e1' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <span style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#475569',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              flexShrink: 0
            }}>1</span>
            <div>
              <strong style={{ color: '#fff' }}>Get a free Clerk API Key:</strong>
              <div style={{ color: '#94a3b8', marginTop: '2px' }}>
                Visit <a href="https://dashboard.clerk.com" target="_blank" rel="noreferrer" style={{ color: '#a855f7', textDecoration: 'underline' }}>dashboard.clerk.com</a> &rarr; create or select an app &rarr; go to <b>API Keys</b>.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <span style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#475569',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              flexShrink: 0
            }}>2</span>
            <div style={{ width: '100%' }}>
              <strong style={{ color: '#fff' }}>Update client/.env:</strong>
              <div style={{ color: '#94a3b8', marginTop: '2px' }}>
                Replace the placeholder in <code>client/.env</code>:
              </div>
              <pre style={{
                backgroundColor: '#090d16',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '12px',
                fontFamily: 'monospace',
                color: '#38bdf8',
                border: '1px solid #1e293b',
                marginTop: '8px',
                overflowX: 'auto'
              }}>
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
              </pre>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <span style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#475569',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              flexShrink: 0
            }}>3</span>
            <div>
              <strong style={{ color: '#fff' }}>Instant Hot-Reload:</strong>
              <div style={{ color: '#94a3b8', marginTop: '2px' }}>
                Save the file and this page will immediately display the full QwixAI application!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ClerkWithRouter() {
  const navigate = useNavigate()
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      afterSignOutUrl='/'
    >
      <App />
    </ClerkProvider>
  )
}

createRoot(document.getElementById('root')).render(
  isValidClerkKey ? (
    <BrowserRouter>
      <ClerkWithRouter />
    </BrowserRouter>
  ) : (
    <SetupGuide />
  )
)

