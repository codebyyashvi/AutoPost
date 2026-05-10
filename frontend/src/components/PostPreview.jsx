import React, {useState} from 'react'

export default function PostPreview({posts, onPost, posted}){
  const [busyKey, setBusyKey] = useState(null)

  async function handlePost(key){
    const ok = window.confirm(`Schedule "${key}" post?\n\nThis will post immediately in this demo.`)
    if(!ok) return
    setBusyKey(key)
    await new Promise(r => setTimeout(r, 600))
    setBusyKey(null)
    onPost(key)
  }

  if(!posts || Object.keys(posts).length===0) return (
    <div className="surface-card post-preview-empty">
      <p>Generated posts will appear here</p>
    </div>
  )

  return (
    <div className="post-preview-grid">
      {Object.entries(posts).map(([k,v])=> (
        <div key={k} className="surface-card post-preview-card">
          <div className="post-preview-header">
            <div className="post-preview-platform">{k}</div>
            <div className={posted[k] ? 'post-preview-status posted' : 'post-preview-status'}>
              {posted[k] ? '✓ Posted' : 'Ready to schedule'}
            </div>
          </div>
          <div className="post-preview-body">{v}</div>
          <div className="post-preview-footer">
            <button 
              disabled={posted[k]} 
              onClick={()=>handlePost(k)} 
              className={posted[k] ? 'post-preview-button muted' : 'post-preview-button'}
            >
              {posted[k]? 'Posted' : (busyKey===k? 'Posting...' : 'Schedule')}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
