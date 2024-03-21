import Navbar from './components/Navbar'
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Tracker from './pages/Tracker';
import Profile from './pages/Profile';
import { Auth } from '@supabase/auth-ui-react'
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from "react";
import { ThemeSupa } from '@supabase/auth-ui-shared'
import Resources from './pages/Resources';

const supabase = createClient(
  'https://muhmvbrhzksmloawaqcl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11aG12YnJoemtzbWxvYXdhcWNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAzNjM5MjIsImV4cCI6MjAyNTkzOTkyMn0.3Fr05BJ5aEHumzOU6BBUmtSSwDKxTtcwWo40Jc5qjdw',
)

function App() {
  const [session, setSession] = useState(null)

  const signout = async () => {
    setSession(null)
    await supabase.auth.signOut();
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (

      <div className='container'>
        <Auth supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
        />
      </div>
    )
  }
  else {
    return (
      <Router>
        <Navbar signout={signout} />
        <Routes>
          <Route path="/" element={<Tracker session={session} supabase={supabase} />} />
          <Route path="profile" element={<Profile session={session} supabase={supabase} />} />
          <Route path="resources" element={<Resources/>}/>
        </Routes>
        <Footer />
      </Router>
    )
  }
}


export default App
