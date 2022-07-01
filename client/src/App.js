import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HomeScreen } from './Screens'

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<HomeScreen />} exact />
        </Routes>
      </main>
    </Router>
  )
}

export default App
