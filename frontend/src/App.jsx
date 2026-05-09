import React, {useState} from 'react'
import './App.css'
import Dashboard from './components/Dashboard'
import PlatformStats from './components/PlatformStats'
import Chatbot from './components/Chatbot'
import PostPreview from './components/PostPreview'

function App(){
  const [connectedPlatforms, setConnectedPlatforms] = useState([])
  const [selectedPlatforms, setSelectedPlatforms] = useState([])
  const [statsOpenFor, setStatsOpenFor] = useState(null)
  const [generatedPosts, setGeneratedPosts] = useState({})
  const [posted, setPosted] = useState({})

  function handlePlatformAction(key){
    if(connectedPlatforms.includes(key)){
      // Already connected, show stats
      setStatsOpenFor(key)
    } else {
      // Not connected, simulate login (auto-connect for demo)
      const confirmed = window.confirm(`Connect ${key} account?\n\nThis is a demo - you'll be automatically connected for testing.`)
      if(confirmed){
        setConnectedPlatforms(prev => [...prev, key])
      }
    }
  }

  function togglePlatformForPosting(key){
    setGeneratedPosts({})
    setPosted({})
    setSelectedPlatforms(prev => prev.includes(key) ? prev.filter(p=>p!==key) : [...prev, key])
  }

  function handleGenerate(posts){
    setGeneratedPosts(posts)
    setPosted({})
  }

  function handlePost(key){
    setPosted(prev => ({...prev, [key]: true}))
    alert(`✓ Successfully posted to ${key}!`)
  }

  return (
    <div style={{padding:20, maxWidth:1200, margin:'0 auto', fontFamily:'Inter, system-ui, Arial'}}>
      <header style={{marginBottom:28}}>
        <h1 style={{margin:0, fontSize:32, fontWeight:700}}>AutoPost</h1>
        <p style={{color:'#999', margin:'4px 0 0 0'}}>Social media post automation & scheduling</p>
      </header>

      <section style={{marginBottom:24}}>
        <h2 style={{margin:'0 0 12px 0', fontSize:18, fontWeight:600}}>Your Connected Platforms</h2>
        <Dashboard connectedPlatforms={connectedPlatforms} onPlatformAction={handlePlatformAction} />
      </section>

      <section style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
        <div>
          <h2 style={{margin:'0 0 12px 0', fontSize:18, fontWeight:600}}>Generate Posts</h2>
          <Chatbot selectedPlatforms={connectedPlatforms.length > 0 ? selectedPlatforms : []} onToggle={togglePlatformForPosting} onGenerate={handleGenerate} />
        </div>
        <div>
          <h2 style={{margin:'0 0 12px 0', fontSize:18, fontWeight:600}}>Preview & Schedule</h2>
          {connectedPlatforms.length === 0 ? (
            <div style={{background:'#1a1a1a',padding:16,borderRadius:8,border:'1px solid #333',color:'#999'}}>
              <p>Connect at least one platform to start creating posts.</p>
            </div>
          ) : (
            <>
              <div style={{fontSize:13, color:'#999', marginBottom:8}}>Select platforms above, then generate & schedule your posts</div>
              <PostPreview posts={generatedPosts} onPost={handlePost} posted={posted} />
            </>
          )}
        </div>
      </section>

      <PlatformStats platform={statsOpenFor} open={!!statsOpenFor} onClose={() => setStatsOpenFor(null)} />
    </div>
  )
}

export default App

