import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthScreen, HomeScreen } from './Screens'
import { Header } from './Components'

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<AuthScreen />} exact />
          <Route path="/home" element={<HomeScreen />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
