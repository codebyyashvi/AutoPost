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
    <div className="platform-card surface-card">
      <div className="platform-icon" style={{background:bg}}>
        {platform.icon||platform.key[0].toUpperCase()}
      </div>
      <div className="platform-name">{platform.name}</div>
      <div className={isLoggedIn ? 'platform-state connected' : 'platform-state disconnected'}>{isLoggedIn? 'Connected':'Not connected'}</div>
      <button 
        onClick={() => onAction(platform.key)} 
        className={isLoggedIn ? 'platform-button connected' : 'platform-button'}
      >
        {isLoggedIn? 'View Analytics' : 'Connect Account'}
      </button>
    </div>
  )
}
