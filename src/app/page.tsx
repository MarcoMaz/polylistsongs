"use client";
import React, { useEffect } from 'react';
import styles from './page.module.css'

export default function Home() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const backgroundColor = params.get('backgroundColor');

    document.body.style.backgroundColor = backgroundColor || 'red'; // Set the background color
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
       HELLO THIS IS A TEST
      </div>
    </main>
  )
}
