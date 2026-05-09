import React from 'react'

export default function PlatformCard({platform, isLoggedIn, onAction}){
  const colors = {
    linkedin: '#0A66C2',
    twitter: '#1DA1F2',
    facebook: '#3b5998',
    reddit: '#FF4500',
    discord: '#5865F2',
    telegram: '#0088cc'
  }
  const bg = colors[platform.key] || '#666'
  
  return (
    <div style={{border:'1px solid #333', borderRadius:8, padding:12, width:200, display:'flex',flexDirection:'column',alignItems:'center', gap:8, background:'#1a1a1a'}}>
      <div style={{width:56,height:56,borderRadius:8,background:bg,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:18}}>
        {platform.icon||platform.key[0].toUpperCase()}
      </div>
      <div style={{fontWeight:600, color:'#e0e0e0'}}>{platform.name}</div>
      <div style={{color:isLoggedIn?'#4ade80':'#f87171',fontSize:12}}>{isLoggedIn? '● Connected':'● Not connected'}</div>
      <button 
        onClick={() => onAction(platform.key)} 
        style={{
          width:'100%',
          padding:'8px 12px',
          borderRadius:6,
          background:isLoggedIn?bg:'#333',
          color:'#fff',
          border:'1px solid ' + (isLoggedIn?bg:'#444'),
          cursor:'pointer',
          fontWeight:600,
          transition:'all 0.2s'
        }}
      >
        {isLoggedIn? 'View Analytics' : 'Connect Account'}
      </button>
    </div>
  )
}
