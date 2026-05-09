import React from 'react'

export default function LoginModal({platform, open, onClose}){
  if(!open) return null
  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.6)',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{background:'#1a1a1a',padding:20,borderRadius:8,width:360,maxWidth:'90%',border:'1px solid #333'}}>
        <h3 style={{margin:0, color:'#fff'}}>Login (dummy)</h3>
        <p style={{color:'#999'}}>This is a placeholder login modal for <strong>{platform}</strong>. Login is not implemented in this prototype.</p>
        <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
          <button onClick={onClose} style={{padding:'8px 12px',background:'#333',color:'#e0e0e0',border:'1px solid #444',borderRadius:6}}>Close</button>
        </div>
      </div>
    </div>
  )
}
