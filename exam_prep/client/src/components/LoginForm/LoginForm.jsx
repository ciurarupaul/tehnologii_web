import './LoginForm.css'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { login } from '../../stores/actions/user-actions'

// selectors
const userDataSelector = state => state.user.data
const userLoadingSelector = state => state.user.loading
const userErrorSelector = state => state.user.error

const LoginForm = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const userData = useSelector(userDataSelector)
  const loading = useSelector(userLoadingSelector)
  const error = useSelector(userErrorSelector)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const isAuthenticated = !!userData.token

  const handleLoginClick = async () => {
    const action = await login(email, password)
    dispatch(action)
  }

  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from || '/'
      navigate(from)
    }
  }, [isAuthenticated, location.state, navigate])

  return (
    <div className='login-form'>
      <div className='form-container'>
        <h1>Login</h1>
        <input
          type='text'
          placeholder='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={handleLoginClick} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && (
          <div className='error'>
            Login failed
          </div>
        )}
      </div>
    </div>
  )
}

export default LoginForm
