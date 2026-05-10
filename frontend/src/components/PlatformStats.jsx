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
    <div className="stats-backdrop">
      <div className="stats-modal surface-card">
        <div className="stats-header">
          <div>
            <div className="section-label">Analytics snapshot</div>
            <h2>{platform} Analytics</h2>
          </div>
          <button onClick={onClose} className="ghost-button stats-close">✕</button>
        </div>
        
        <div className="stats-grid">
          <div className="stats-card">
            <div className="stats-label">Followers</div>
            <div className="stats-value green">{stats.followers.toLocaleString()}</div>
          </div>
          <div className="stats-card">
            <div className="stats-label">Engagement Rate</div>
            <div className="stats-value blue">{stats.engagement}%</div>
          </div>
          <div className="stats-card">
            <div className="stats-label">Posts This Month</div>
            <div className="stats-value amber">{stats.postsThisMonth}</div>
          </div>
          <div className="stats-card">
            <div className="stats-label">Avg Reach</div>
            <div className="stats-value pink">{stats.averageReach.toLocaleString()}</div>
          </div>
        </div>

        <div className="stats-performance surface-card">
          <div className="stats-label">Top Post Performance</div>
          <div className="stats-meter-row">
            <div className="stats-meter">
              <div className="stats-meter-fill"></div>
            </div>
            <div className="stats-value stats-compact">{stats.topPost.toLocaleString()} views</div>
          </div>
        </div>

        <div className="stats-note">
          <p>Connected and actively posting. Your content is performing well on this platform. Keep engaging with your audience.</p>
        </div>

        <div className="stats-actions">
          <button onClick={onClose} className="secondary-button">Close</button>
          <button className="primary-button">View Full Analytics</button>
        </div>
      </div>
    </div>
  )
}
