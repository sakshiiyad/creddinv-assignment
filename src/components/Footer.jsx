import styles from './footer.module.scss'

export default function Footer({ brand }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>{brand}</div>
      <p className={styles.footerpara}>© 2026 All rights reserved.</p>
    </footer>
  )
}
