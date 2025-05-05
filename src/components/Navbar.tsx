import React from 'react'
import { FloatingDock } from './ui/floating-dock'

function Navbar() {
  return (
    <FloatingDock
      items={[
        { title: 'Home', icon: <div>🏠</div>, href: '/' },
        { title: 'Dashboard', icon: <div>📊</div>, href: '/dashboard' },
        { title: 'Settings', icon: <div>⚙️</div>, href: '/settings' },
      ]}
      desktopClassName="hidden md:flex"
      mobileClassName="flex md:hidden"
    />
  )
}

export default Navbar