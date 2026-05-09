import React from 'react'

export default function PlatformStats({platform, open, onClose}){
  if(!open) return null

  // Dummy stats data
  const stats = {
    followers: Math.floor(Math.random() * 50000) + 1000,
    engagement: (Math.random() * 12 + 2).toFixed(1),
    postsThisMonth: Math.floor(Math.random() * 25) + 5,
    averageReach: Math.floor(Math.random() * 100000) + 10000,
    topPost: Math.floor(Math.random() * 50000) + 1000,
  }

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.6)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
      <div style={{background:'#1a1a1a',padding:24,borderRadius:12,width:420,maxWidth:'90%',border:'1px solid #333'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
          <h2 style={{margin:0, color:'#fff', textTransform:'capitalize'}}>{platform} Analytics</h2>
          <button onClick={onClose} style={{background:'#333',color:'#e0e0e0',border:'1px solid #444',borderRadius:6,padding:'6px 12px',cursor:'pointer'}}>✕</button>
        </div>
        
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:16}}>
          <div style={{background:'#111',padding:12,borderRadius:8,border:'1px solid #333'}}>
            <div style={{color:'#999',fontSize:12,marginBottom:4}}>Followers</div>
            <div style={{color:'#4ade80',fontSize:24,fontWeight:700}}>{stats.followers.toLocaleString()}</div>
          </div>
          <div style={{background:'#111',padding:12,borderRadius:8,border:'1px solid #333'}}>
            <div style={{color:'#999',fontSize:12,marginBottom:4}}>Engagement Rate</div>
            <div style={{color:'#60a5fa',fontSize:24,fontWeight:700}}>{stats.engagement}%</div>
          </div>
          <div style={{background:'#111',padding:12,borderRadius:8,border:'1px solid #333'}}>
            <div style={{color:'#999',fontSize:12,marginBottom:4}}>Posts This Month</div>
            <div style={{color:'#fbbf24',fontSize:24,fontWeight:700}}>{stats.postsThisMonth}</div>
          </div>
          <div style={{background:'#111',padding:12,borderRadius:8,border:'1px solid #333'}}>
            <div style={{color:'#999',fontSize:12,marginBottom:4}}>Avg Reach</div>
            <div style={{color:'#f472b6',fontSize:24,fontWeight:700}}>{stats.averageReach.toLocaleString()}</div>
          </div>
        </div>

        <div style={{background:'#111',padding:12,borderRadius:8,border:'1px solid #333',marginBottom:16}}>
          <div style={{color:'#999',fontSize:12,marginBottom:8}}>Top Post Performance</div>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <div style={{flex:1,height:8,background:'#333',borderRadius:4,overflow:'hidden'}}>
              <div style={{height:'100%',width:'75%',background:'linear-gradient(90deg, #4ade80, #60a5fa)'}}></div>
            </div>
            <div style={{color:'#e0e0e0',fontWeight:700}}>{stats.topPost.toLocaleString()} views</div>
          </div>
        </div>

        <div style={{background:'#0f0f0f',padding:12,borderRadius:8,border:'1px solid #444'}}>
          <p style={{margin:0,color:'#999',fontSize:14}}>Connected & actively posting. Your content is performing well on this platform. Keep engaging with your audience!</p>
        </div>

        <div style={{display:'flex',gap:8,marginTop:16,justifyContent:'flex-end'}}>
          <button onClick={onClose} style={{background:'#333',color:'#e0e0e0',border:'1px solid #444',borderRadius:6,padding:'8px 16px',cursor:'pointer'}}>Close</button>
          <button style={{background:'linear-gradient(135deg, #4ade80, #60a5fa)',color:'#fff',border:'none',borderRadius:6,padding:'8px 16px',cursor:'pointer',fontWeight:600}}>View Full Analytics</button>
        </div>
      </div>
    </div>
  )
}
