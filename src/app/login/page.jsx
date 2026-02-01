'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './login.module.scss'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mobile, setMobile] = useState('')
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    let newErrors = {}

    // email validation
    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Enter a valid email'
    }

    // password validation
    if (!password) {
      newErrors.password = 'Password is required'
    } else {
      if (password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters'
      } else if (!/[0-9]/.test(password)) {
        newErrors.password = 'Password must contain a number'
      } else if (!/[!@#$%^&*]/.test(password)) {
        newErrors.password = 'Password must contain a special character'
      }
    }

    // mobile validation
    if (!mobile) {
      newErrors.mobile = 'Mobile number is required'
    } else if (!/^\d{10}$/.test(mobile)) {
      newErrors.mobile = 'Mobile number must be 10 digits'
    }

    setErrors(newErrors)
    setApiError('')

    if (Object.keys(newErrors).length > 0) return

    //  LOGIN API CALL
    try {
      const response = await fetch(
        'https://coding-assignment-server.vercel.app/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            mobile,
          }),
        }
      )

      const data = await response.json()
    //   console.log(data)

      if (!response.ok) {
        setApiError(data.message || 'Login failed')
        return
      }

      // save token & username
      localStorage.setItem('token', data.token)
      localStorage.setItem('userName', data.userName)

      // redirect to product list
      router.push('/productlist')
    } catch (error) {
      setApiError('Something went wrong. Please try again.')
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Login</h2>

        <div className={styles.field}>
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>

        <div className={styles.field}>
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className={styles.error}>{errors.password}</p>
          )}
        </div>

        <div className={styles.field}>
          <input
            className={styles.input}
            type="text"
            placeholder="Mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          {errors.mobile && <p className={styles.error}>{errors.mobile}</p>}
        </div>

        {apiError && <p className={styles.error}>{apiError}</p>}

        <button className={styles.button} type="submit">
          Login
        </button>
      </form>
    </div>
  )
}
