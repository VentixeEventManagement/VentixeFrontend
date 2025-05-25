import { Suspense } from 'react'
import './App.css'
import RouteRenderer from './routing/RouteRenderer'
import "react-big-calendar/lib/css/react-big-calendar.css";

function App() {
  return (
    <Suspense fallback={<div className="spinner">Loading...</div>}>
      <RouteRenderer />
    </Suspense>
  )
}

export default App
