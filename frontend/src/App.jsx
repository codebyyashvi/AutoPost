import React, {useEffect, useState} from 'react'
import './App.css'
import Dashboard from './components/Dashboard'
import PlatformStats from './components/PlatformStats'
import Chatbot from './components/Chatbot'
import PostPreview from './components/PostPreview'
import LoginModal from './components/LoginModal'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
const AUTH_TOKEN_KEY = 'autopost_access_token'
const AUTH_USER_KEY = 'autopost_user'

const PRODUCT_POINTS = [
  {
    title: 'Cross-platform publishing',
    description: 'Plan, generate, and schedule content for LinkedIn, X, Facebook, Reddit, Discord, and Telegram from one workspace.'
  },
  {
    title: 'Workflow automation',
    description: 'Turn a single brief into platform-specific posts with a guided, repeatable production flow for teams.'
  },
  {
    title: 'Auth-first access',
    description: 'Users land on the About page first and must authenticate before the product surface becomes available.'
  },
  {
    title: 'Operational visibility',
    description: 'Track connected channels, preview drafts, and review analytics-style summaries in a clean, business-ready interface.'
  }
]

const VALUE_COLUMNS = [
  {
    label: 'Security',
    value: 'PostgreSQL-backed auth'
  },
  {
    label: 'Speed',
    value: 'One prompt to multi-platform copy'
  },
  {
    label: 'Scale',
    value: 'Built for repeatable publishing'
  }
]

function AboutPage({onOpenAuth}) {
  return (
    <main className="about-page">
      <header className="landing-nav">
        <div className="brand-lockup">
          <div className="brand-mark">A</div>
          <div>
            <div className="brand-name">Autopost</div>
            <div className="brand-tagline">Social publishing operations</div>
          </div>
        </div>
        <div className="nav-actions">
          <button className="secondary-button" onClick={onOpenAuth}>Sign in</button>
          <button className="primary-button" onClick={onOpenAuth}>Create account</button>
        </div>
      </header>

      <section className="hero-split">
        <div className="hero-copy-column">
          <div className="eyebrow">Autopost Platform</div>
          <h1>Centralize your social publishing workflow in one professional control surface.</h1>
          <p className="hero-copy">
            AutoPost helps teams generate, preview, and schedule content across the major social channels from a single place.
            It is designed to feel like a real operations product: focused, secure, and ready for business use.
          </p>

          <div className="hero-actions">
            <button className="primary-button" onClick={onOpenAuth}>Create account</button>
            <button className="secondary-button" onClick={onOpenAuth}>Sign in</button>
          </div>

          <div className="value-row">
            {VALUE_COLUMNS.map((item) => (
              <article key={item.label} className="value-card">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </article>
            ))}
          </div>
        </div>

        <aside className="hero-visual">
          <div className="visual-pill">Industry-ready workflow</div>
          <h2>One place to manage content, access, and publishing.</h2>
          <p>
            A polished interface that explains the product before login, then unlocks the workspace after authentication.
          </p>

          <div className="visual-metrics">
            <div className="metric-card">
              <span>Channels</span>
              <strong>6+</strong>
            </div>
            <div className="metric-card">
              <span>Access</span>
              <strong>Secure</strong>
            </div>
            <div className="metric-card">
              <span>Workflow</span>
              <strong>Guided</strong>
            </div>
          </div>

          <div className="visual-preview">
            <div className="preview-dot blue"></div>
            <div className="preview-dot teal"></div>
            <div className="preview-dot violet"></div>
          </div>
        </aside>
      </section>

      <section className="intro-grid">
        <article className="surface-card intro-card intro-card-large">
          <div className="section-label">What it does</div>
          <h2>Built to manage social content operations, not just draft text.</h2>
          <p>
            The platform is meant to support a complete publishing cycle: authentication, connected channels,
            post generation, previews, and scheduling. Access is intentionally gated so users sign in before
            interacting with product features.
          </p>
        </article>

        <article className="surface-card intro-card accent-card">
          <div className="section-label">User access</div>
          <h2>Login and registration are required before using the workspace.</h2>
          <p>
            New visitors see this About page first. Once authenticated, they gain access to the dashboard and
            content-generation tools.
          </p>
        </article>
      </section>

      <section className="feature-section">
        <div className="section-heading">
          <div className="section-label">Capabilities</div>
          <h2>Everything the site is doing, explained clearly.</h2>
        </div>
        <div className="feature-grid">
          {PRODUCT_POINTS.map((point) => (
            <article key={point.title} className="surface-card feature-card">
              <h3>{point.title}</h3>
              <p>{point.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="process-section">
        <div className="section-heading">
          <div className="section-label">Workflow</div>
          <h2>How the experience flows</h2>
        </div>
        <div className="process-grid">
          <article className="surface-card process-card">
            <span>01</span>
            <h3>Authenticate</h3>
            <p>Users register or sign in to unlock the product workspace and persist their session securely.</p>
          </article>
          <article className="surface-card process-card">
            <span>02</span>
            <h3>Connect platforms</h3>
            <p>Choose the social accounts you want to manage from the dashboard and open platform analytics.</p>
          </article>
          <article className="surface-card process-card">
            <span>03</span>
            <h3>Generate and schedule</h3>
            <p>Draft platform-specific content, preview it, and schedule publishing from the same interface.</p>
          </article>
        </div>
      </section>

      <section className="cta-panel surface-card">
        <div>
          <div className="section-label">Get started</div>
          <h2>Sign in to access the product workspace.</h2>
          <p>Once you authenticate, you will be taken into the full AutoPost experience.</p>
        </div>
        <button className="primary-button" onClick={onOpenAuth}>Open authentication</button>
      </section>
    </main>
  )
}

function AppShell({currentUser, authToken, onLogout, connectedPlatforms, onPlatformAction, selectedPlatforms, onTogglePlatformForPosting, onGenerate, onPost, generatedPosts, posted, statsOpenFor, onCloseStats, onOpenAuth}) {
  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <div className="eyebrow">AutoPost workspace</div>
          <h1>Social publishing control center</h1>
          <p>Manage platforms, generate content, and schedule posts from a single authenticated workspace.</p>
        </div>
        <div className="topbar-actions">
          <div className="user-chip">
            <span className="user-chip-label">Signed in as</span>
            <strong>{currentUser.full_name || currentUser.email}</strong>
            <span>{authToken ? 'Session active' : 'Session pending'}</span>
          </div>
          <button className="secondary-button" onClick={onLogout}>Logout</button>
        </div>
      </header>

      <section className="notice-banner">
        <div>
          <strong>Authenticated access only.</strong>
          <span>Product tools remain locked until login or registration is complete.</span>
        </div>
        <button className="ghost-button" onClick={onOpenAuth}>Manage account</button>
      </section>

      <section className="workspace-grid">
        <div className="workspace-column wide-column">
          <div className="section-heading compact">
            <div className="section-label">Connected channels</div>
            <h2>Platforms available to your team</h2>
          </div>
          <Dashboard connectedPlatforms={connectedPlatforms} onPlatformAction={onPlatformAction} />
        </div>

        <div className="workspace-column">
          <div className="section-heading compact">
            <div className="section-label">Content generation</div>
            <h2>Build platform-specific drafts</h2>
          </div>
          <Chatbot selectedPlatforms={selectedPlatforms} onToggle={onTogglePlatformForPosting} onGenerate={onGenerate} />
        </div>

        <div className="workspace-column full-width">
          <div className="section-heading compact">
            <div className="section-label">Preview and scheduling</div>
            <h2>Review what will be published</h2>
          </div>
          {connectedPlatforms.length === 0 ? (
            <div className="empty-state surface-card">
              <p>Connect at least one platform to start creating posts.</p>
            </div>
          ) : (
            <>
              <p className="helper-copy">Select platforms above, generate copy, then schedule each draft when it is ready.</p>
              <PostPreview posts={generatedPosts} onPost={onPost} posted={posted} />
            </>
          )}
        </div>
      </section>

      <PlatformStats platform={statsOpenFor} open={!!statsOpenFor} onClose={onCloseStats} />
    </main>
  )
}

function LoadingScreen() {
  return (
    <main className="loading-screen">
      <div className="loading-card surface-card">
        <div className="spinner" />
        <h1>Checking your session</h1>
        <p>Preparing the authenticated workspace.</p>
      </div>
    </main>
  )
}

function App() {
  const [connectedPlatforms, setConnectedPlatforms] = useState([])
  const [selectedPlatforms, setSelectedPlatforms] = useState([])
  const [statsOpenFor, setStatsOpenFor] = useState(null)
  const [generatedPosts, setGeneratedPosts] = useState({})
  const [posted, setPosted] = useState({})
  const [authOpen, setAuthOpen] = useState(false)
  const [authToken, setAuthToken] = useState(() => localStorage.getItem(AUTH_TOKEN_KEY) || '')
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem(AUTH_USER_KEY)
    if (!storedUser) return null
    try {
      return JSON.parse(storedUser)
    } catch {
      return null
    }
  })
  const [sessionReady, setSessionReady] = useState(false)

  useEffect(() => {
    if (!authToken) {
      setSessionReady(true)
      return
    }

    let isActive = true

    async function loadCurrentUser() {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        })

        if (!response.ok) {
          throw new Error('Session expired')
        }

        const user = await response.json()
        if (isActive) {
          setCurrentUser(user)
          localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
        }
      } catch {
        if (isActive) {
          setAuthToken('')
          setCurrentUser(null)
          localStorage.removeItem(AUTH_TOKEN_KEY)
          localStorage.removeItem(AUTH_USER_KEY)
        }
      } finally {
        if (isActive) {
          setSessionReady(true)
        }
      }
    }

    loadCurrentUser()

    return () => {
      isActive = false
    }
  }, [authToken])

  function handleAuthSuccess(data) {
    setAuthToken(data.access_token)
    setCurrentUser(data.user)
    localStorage.setItem(AUTH_TOKEN_KEY, data.access_token)
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(data.user))
    setAuthOpen(false)
    setSessionReady(true)
  }

  function handleLogout() {
    setAuthToken('')
    setCurrentUser(null)
    setSessionReady(true)
    localStorage.removeItem(AUTH_TOKEN_KEY)
    localStorage.removeItem(AUTH_USER_KEY)
  }

  function handlePlatformAction(key) {
    if (connectedPlatforms.includes(key)) {
      setStatsOpenFor(key)
      return
    }

    const confirmed = window.confirm(`Connect ${key} account?\n\nThis is a demo - you'll be automatically connected for testing.`)
    if (confirmed) {
      setConnectedPlatforms((prev) => [...prev, key])
    }
  }

  function togglePlatformForPosting(key) {
    setGeneratedPosts({})
    setPosted({})
    setSelectedPlatforms((prev) => (prev.includes(key) ? prev.filter((platform) => platform !== key) : [...prev, key]))
  }

  function handleGenerate(posts) {
    setGeneratedPosts(posts)
    setPosted({})
  }

  function handlePost(key) {
    setPosted((prev) => ({...prev, [key]: true}))
    alert(`Successfully posted to ${key}!`)
  }

  if (!sessionReady) {
    return <LoadingScreen />
  }

  if (!currentUser) {
    return (
      <>
        <AboutPage onOpenAuth={() => setAuthOpen(true)} />
        <LoginModal open={authOpen} onClose={() => setAuthOpen(false)} onSuccess={handleAuthSuccess} apiBaseUrl={API_BASE_URL} />
      </>
    )
  }

  return (
    <>
      <AppShell
        currentUser={currentUser}
        authToken={authToken}
        onLogout={handleLogout}
        connectedPlatforms={connectedPlatforms}
        onPlatformAction={handlePlatformAction}
        selectedPlatforms={connectedPlatforms.length > 0 ? selectedPlatforms : []}
        onTogglePlatformForPosting={togglePlatformForPosting}
        onGenerate={handleGenerate}
        onPost={handlePost}
        generatedPosts={generatedPosts}
        posted={posted}
        statsOpenFor={statsOpenFor}
        onCloseStats={() => setStatsOpenFor(null)}
        onOpenAuth={() => setAuthOpen(true)}
      />
      <LoginModal open={authOpen} onClose={() => setAuthOpen(false)} onSuccess={handleAuthSuccess} apiBaseUrl={API_BASE_URL} />
    </>
  )
}

export default App
