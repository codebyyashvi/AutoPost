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
    <div style={{background:'#1a1a1a',padding:16,borderRadius:8,border:'1px dashed #333',color:'#666',textAlign:'center',padding:32}}>
      <p>Generated posts will appear here</p>
    </div>
  )

  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:12}}>
      {Object.entries(posts).map(([k,v])=> (
        <div key={k} style={{border:'1px solid #333',padding:14,borderRadius:8,display:'flex',flexDirection:'column',gap:10,background:'#1a1a1a'}}>
          <div style={{fontWeight:700, textTransform:'capitalize',color:'#fff',fontSize:14}}>{k}</div>
          <div style={{whiteSpace:'pre-wrap',flex:1,color:'#e0e0e0',fontSize:13,lineHeight:1.5}}>{v}</div>
          <div style={{display:'flex',gap:8,justifyContent:'space-between',alignItems:'center'}}>
            <div style={{fontSize:11, color:'#666'}}>
              {posted[k] ? '✓ Posted' : 'Ready to schedule'}
            </div>
            <button 
              disabled={posted[k]} 
              onClick={()=>handlePost(k)} 
              style={{
                padding:'8px 14px',
                background:posted[k]?'#333':'#4ade80',
                color:posted[k]?'#666':'#111',
                border:'none',
                borderRadius:6,
                cursor:posted[k]?'default':'pointer',
                fontWeight:600,
                fontSize:12,
                transition:'all 0.2s'
              }}
            >
              {posted[k]? 'Posted' : (busyKey===k? 'Posting...' : 'Schedule')}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
