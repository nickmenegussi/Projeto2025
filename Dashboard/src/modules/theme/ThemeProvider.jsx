import { createContext, useContext, useEffect, useState } from 'react'

const ThemeCtx = createContext({ theme: 'light', toggle: ()=>{} })
export const useTheme = () => useContext(ThemeCtx)

export default function ThemeProvider({ children }){
  const [theme, setTheme] = useState('light')
  useEffect(()=>{
    const t = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    setTheme(t)
    document.documentElement.classList.toggle('dark', t === 'dark')
  }, [])
  function toggle(){
    const t = theme === 'dark' ? 'light' : 'dark'
    setTheme(t)
    localStorage.setItem('theme', t)
    document.documentElement.classList.toggle('dark', t === 'dark')
  }
  return <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>
}
