'use client'

import { useState, useEffect } from 'react'
import styles from './LoadingSlideshow.module.css'

const SLIDES = [
  {
    emoji: '🍜',
    kanji: '麺',
    title: 'Ramen Culture',
    tip: 'Most ramen shops have ticket machines at the entrance — just pick your bowl and hand the ticket to staff.',
  },
  {
    emoji: '🚇',
    kanji: '駅',
    title: 'Food Near Every Station',
    tip: 'Explore the basement floors (depachika) of department stores near major stations for incredible food halls.',
  },
  {
    emoji: '💴',
    kanji: '現金',
    title: 'Keep Cash Ready',
    tip: 'Many beloved neighborhood restaurants are cash-only. Carry ¥5,000–¥10,000 for spontaneous discoveries.',
  },
  {
    emoji: '🍱',
    kanji: '昼',
    title: 'Lunch Set Magic',
    tip: 'Lunch sets (ランチセット) offer the same quality as dinner at half the price — often under ¥1,000.',
  },
  {
    emoji: '🏮',
    kanji: '夜',
    title: 'Evening Izakaya Crawl',
    tip: 'Izakayas open around 5pm. Order small plates and share — the whole table eats and drinks together.',
  },
  {
    emoji: '🙏',
    kanji: '礼',
    title: 'Dining Etiquette',
    tip: 'Say "itadakimasu" (いただきます) before eating and "gochisosama" after — locals will appreciate it.',
  },
]

export default function LoadingSlideshow() {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    const interval = setInterval(() => {
      setVisible(false)
      timeout = setTimeout(() => {
        setCurrent((c) => (c + 1) % SLIDES.length)
        setVisible(true)
      }, 400)
    }, 3200)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  const slide = SLIDES[current]

  return (
    <div className={styles.wrap}>
      <div className={`${styles.slide} ${visible ? styles.visible : styles.hidden}`}>
        <div className={styles.illustration}>
          <span className={styles.kanji}>{slide.kanji}</span>
          <span className={styles.emoji}>{slide.emoji}</span>
        </div>
        <h3 className={styles.title}>{slide.title}</h3>
        <p className={styles.tip}>{slide.tip}</p>
      </div>

      <div className={styles.progress}>
        {SLIDES.map((_, i) => (
          <div
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
          />
        ))}
      </div>

      <div className={styles.status}>
        <span className={styles.dot1} />
        <span className={styles.dot2} />
        <span className={styles.dot3} />
        <span className={styles.statusText}>Crafting your Tokyo itinerary…</span>
      </div>
    </div>
  )
}
