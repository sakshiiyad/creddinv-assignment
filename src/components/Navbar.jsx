'use client'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import styles from './navbar.module.scss'

export default function Navbar(){
    const router=useRouter();
    const[userName,setUserName]=useState('');

    useEffect(()=>{
        const name=localStorage.getItem('userName');
        setUserName(name);

    },[])


const handleLogout=()=>{
    localStorage.clear();
    router.push('/login');
}

  return (
    <div className={styles.nav}>
      <div className={styles.left}>Creddinv</div>

      <div className={styles.right}>
        {userName && <span className={styles.user}>Hi, {userName}</span>}
        <button className={styles.logout} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

