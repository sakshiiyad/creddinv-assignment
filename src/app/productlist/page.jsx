'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'

import styles from './productlist.module.scss'
import ProductNavbar from '@/components/ProductNavbar'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export default function ProductListPage() {
  const BRAND_NAME = 'RALPH LAUREN'
  const router = useRouter()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const [price, setPrice] = useState('')
  const [size, setSize] = useState('')
  const [color, setColor] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      router.push('/login')
      return
    }

    const fetchData = async () => {
      try {
        const res = await fetch(
          'https://coding-assignment-server.vercel.app/validateToken',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const data = await res.json()

        if (!data.isValid) {
          localStorage.clear()
          router.push('/login')
          return
        }

        const productsRes = await fetch(
          'https://coding-assignment-server.vercel.app/products',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const productData = await productsRes.json()
        setProducts(productData.data)
        setLoading(false)
      } catch (err) {
        console.log('Error fetching data', err)
      }
    }

    fetchData()
  }, [router])

  // FILTER LOGIC
  const filteredProducts = products.filter((p) => {
    if (price && p.price > Number(price)) return false
    if (size && !p.sizes.includes(size)) return false
    if (color && !p.color.includes(color)) return false
    return true
  })

  return (
    <>
    <Navbar/>
      <ProductNavbar brand={BRAND_NAME} />

      <div className={styles.page}>
        {/* SIDEBAR */}
        <aside className={styles.sidebar}>
          <h3 className={styles.filterTitle}>Filters</h3>

          {/* SIZE */}
          <div className={styles.filterBlock}>
            <p>Size</p>
            <div className={styles.sizeOptions}>
              {['S', 'M', 'L', 'XL'].map((s) => (
                <button
                  key={s}
                  className={size === s ? styles.activeSize : ''}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* COLORS */}
          <div className={styles.filterBlock}>
            <p>Colors</p>
            <div className={styles.colorOptions}>
              {['red', 'blue', 'green'].map((c) => (
                <span
                  key={c}
                  className={`${styles[c]} ${
                    color === c ? styles.activeColor : ''
                  }`}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
          </div>

          {/* PRICE */}
          <div className={styles.filterBlock}>
            <p>Price</p>
            <ul className={styles.priceList}>
              <li
                className={price === '500' ? styles.activePrice : ''}
                onClick={() => setPrice('500')}
              >
                0 - ₹500
              </li>
              <li
                className={price === '600' ? styles.activePrice : ''}
                onClick={() => setPrice('600')}
              >
                ₹500 - ₹600
              </li>
              <li
                className={price === '1000' ? styles.activePrice : ''}
                onClick={() => setPrice('1000')}
              >
                ₹600 - ₹1000
              </li>
            </ul>
          </div>

          <button
            className={styles.clearBtn}
            onClick={() => {
              setPrice('')
              setSize('')
              setColor('')
            }}
          >
            Clear Filters
          </button>
        </aside>

        {/* PRODUCTS */}
        <main className={styles.products}>
          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div className={styles.grid}>
              {filteredProducts.map((product, index) => (
                <div key={index} className={styles.card}>
                  <Image
                    src="/whiteTshirt.jpg"
                    alt={product.name}
                    width={300}
                    height={380}
                    className={styles.productImage}
                  />
                  <h4>{product.name}</h4>
                  <p className={styles.price}>₹{product.price}</p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer brand={BRAND_NAME} />
    </>
  )
}
