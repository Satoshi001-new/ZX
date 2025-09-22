import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const router = useRouter()

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) alert(error.message)
    else {
      alert("Check your email to confirm sign up!")
      setUser(data.user)
      router.push('/home') // 🔥 redirect after signup
    }
  }

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) alert(error.message)
    else {
      alert("Logged in successfully!")
      setUser(data.user)
      router.push('/home') // 🔥 redirect after login
    }
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) alert(error.message)
    else {
      alert("Logged out!")
      setUser(null)
      router.push('/auth') // go back to auth screen
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', textAlign: 'center' }}>
      <h1>Auth Test</h1>

      {!user ? (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ display: 'block', margin: '10px auto', padding: '10px' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ display: 'block', margin: '10px auto', padding: '10px' }}
          />
          <button onClick={handleSignUp} style={{ marginRight: 10 }}>Sign Up</button>
          <button onClick={handleLogin}>Login</button>
        </>
      ) : (
        <>
          <p>Welcome, {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  )
}
