'use client'
import styles from './ProductNavbar.module.css'

export default function ProductNavbar() {
  return (
    <nav className={styles.nav}>
      <h1 className={styles.brand}>RALPH LAUREN</h1>

      <div className={styles.right}>
        {/* search can come later */}
      </div>
    </nav>
  )
}
