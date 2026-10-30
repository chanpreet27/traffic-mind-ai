import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <img src="/trafficmind-logo.png" alt="TrafficMind AI" style={{ height: '38px', width: 'auto', objectFit: 'contain' }} />
        </div>
        <div className="header-actions">
          <a href="/norva" className="switch-link">🌃 View NORVA Hero</a>
          <span className="badge">Prototype</span>
        </div>
      </div>
    </header>
  )
}

export default Header
