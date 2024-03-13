import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Tracker from './pages/Tracker';
import Profile from './pages/Profile';
import Resources from './pages/Resources';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Tracker />} />
        <Route path="profile" element={<Profile />} />
        <Route path="resources" element={<Resources />} />
      </Routes>
    </Router>
  )
}

export default App
