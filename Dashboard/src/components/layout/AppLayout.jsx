import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

export default function AppLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="h-screen overflow-hidden bg-[rgb(var(--bg))] text-[rgb(var(--fg))]">
      {/* Sidebar DESKTOP (fixa) */}
      <aside className="hidden md:block fixed inset-y-0 left-0 w-72 p-4">
        <Sidebar onNavigate={() => {}} />
      </aside>

      {/* Drawer MOBILE */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 p-4 bg-white dark:bg-gray-900">
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Coluna principal: compensa a largura da sidebar fixa no desktop */}
      <div className="md:pl-72 h-full flex flex-col min-w-0">
        <Header openMobile={() => setMobileOpen(true)} />
        {/* Só o conteúdo rola */}
        <main className="flex-1 overflow-y-auto">
          <div className="container py-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
