'use client'

import { useState } from 'react'
import ItineraryFormComponent from '@/components/ItineraryForm'
import ItineraryResult from '@/components/ItineraryResult'
import LoadingSlideshow from '@/components/LoadingSlideshow'
import { Itinerary, ItineraryForm } from '@/lib/types'
import styles from './page.module.css'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [itinerary, setItinerary] = useState<Itinerary | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [lastForm, setLastForm] = useState<ItineraryForm | null>(null)

  const handleGenerate = async (form: ItineraryForm) => {
    setLoading(true)
    setError(null)
    setItinerary(null)
    setLastForm(form)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error('API error')

      const data = await res.json()
      setItinerary(data)
    } catch {
      setError('Failed to generate itinerary. Please check your API key and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Background effects */}
      <div className={styles.noise} />
      <div className={`${styles.orb} ${styles.orb1}`} />
      <div className={`${styles.orb} ${styles.orb2}`} />

      <main className={styles.main}>
        {/* Header */}
        <header className={styles.header}>
          <span className={styles.eyebrow}>Tokyo Food Guide · AI-Powered</span>
          <h1 className={styles.heading}>
            Your Perfect<br />Tokyo Food Journey
          </h1>
          <p className={styles.subheading}>
            Tell us your taste, and we&apos;ll craft a personalized gourmet itinerary —
            from hidden ramen alleys to rooftop omakase.
          </p>
        </header>

        {/* Form or Result */}
        {!itinerary ? (
          <>
            <ItineraryFormComponent onSubmit={handleGenerate} loading={loading} />
            {loading && <LoadingSlideshow />}
            {error && <div className={styles.error}>{error}</div>}
          </>
        ) : (
          <ItineraryResult
            itinerary={itinerary}
            form={lastForm!}
            onReset={() => setItinerary(null)}
          />
        )}
      </main>
    </>
  )
}
