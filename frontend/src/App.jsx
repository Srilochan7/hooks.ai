import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Hero from './pages/Hero'
import NavigationMenuDemo from './components/Navbar'
import Navbar from './components/Navbar'
import HookGeneratorScreen from './pages/GenerateHooks'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <Hero/>
    <HookGeneratorScreen/>
    </>
  )
}

export default App
