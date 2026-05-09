import React from 'react'
import PlatformCard from './PlatformCard'

const PLATFORMS = [
  { key: 'linkedin', name: 'LinkedIn' },
  { key: 'twitter', name: 'Twitter' },
  { key: 'facebook', name: 'Facebook' },
  { key: 'reddit', name: 'Reddit' },
  { key: 'discord', name: 'Discord' },
  { key: 'telegram', name: 'Telegram' }
]

export default function Dashboard({connectedPlatforms, onPlatformAction}){
  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:16}}>
      {PLATFORMS.map(p => (
        <PlatformCard key={p.key} platform={p} isLoggedIn={connectedPlatforms.includes(p.key)} onAction={onPlatformAction} />
      ))}
    </div>
  )
}
