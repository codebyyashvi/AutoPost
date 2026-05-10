import React, {useState} from 'react'

export default function LoginModal({open, onClose, onSuccess, apiBaseUrl}){
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if(!open) return null

  async function handleSubmit(event){
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${apiBaseUrl}/auth/${mode}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email,
          password,
          ...(mode === 'register' ? {full_name: fullName} : {})
        })
      })

      const data = await response.json()

      if(!response.ok){
        throw new Error(data?.detail || 'Unable to authenticate right now.')
      }

      onSuccess?.(data)
      setPassword('')
      setFullName('')
      onClose()
    } catch (err) {
      setError(err.message || 'Authentication failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-backdrop">
      <div className="auth-modal">
        <div className="auth-header">
          <div>
            <div className="section-label">Secure access</div>
            <h3>Welcome to AutoPost</h3>
            <p>Sign in or create an account to unlock the workspace.</p>
          </div>
          <button type="button" className="ghost-button auth-close" onClick={onClose}>Close</button>
        </div>

        <div className="auth-toggle-row">
          <button
            type="button"
            className={mode === 'login' ? 'auth-toggle active' : 'auth-toggle'}
            onClick={() => setMode('login')}
          >
            Sign In
          </button>
          <button
            type="button"
            className={mode === 'register' ? 'auth-toggle active' : 'auth-toggle'}
            onClick={() => setMode('register')}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'register' && (
            <label className="auth-field">
              <span>Full name</span>
              <input
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Your name"
              />
            </label>
          )}

          <label className="auth-field">
            <span>Email</span>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="you@example.com"
            />
          </label>

          <label className="auth-field">
            <span>Password</span>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              placeholder="Minimum 8 characters"
            />
          </label>

          {error ? <div className="auth-error">{error}</div> : null}

          <button
            type="submit"
            disabled={loading}
            className="primary-button auth-submit"
          >
            {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footnote">
          <span>Protected by PostgreSQL-backed authentication and token sessions.</span>
        </div>
      </div>
    </div>
  )
}
