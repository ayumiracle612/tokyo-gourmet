'use client'

import { useState } from 'react'
import { Itinerary, ItineraryForm, Meal } from '@/lib/types'
import styles from './ItineraryResult.module.css'

interface Props {
  itinerary: Itinerary
  form: ItineraryForm
  onReset: () => void
}

const TIME_COLORS: Record<string, string> = {
  Breakfast: '#2b70c9',
  Lunch: '#3d8c5a',
  Dinner: '#c94f6a',
  'Late Night': '#6b4fa0',
}

export default function ItineraryResult({ itinerary, form, onReset }: Props) {
  const [mapMeal, setMapMeal] = useState<Meal | null>(null)

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>{form.days}-Day Tokyo Gourmet Plan</h2>
          {itinerary.summary && (
            <p className={styles.summary}>{itinerary.summary}</p>
          )}
        </div>
        <button className={styles.resetBtn} onClick={onReset}>
          ← New Search
        </button>
      </div>

      {itinerary.days?.map((day) => (
        <div key={day.day} className={styles.dayBlock}>
          <div className={styles.dayLabel}>
            Day {day.day}
            {day.theme && <span className={styles.dayTheme}> · {day.theme}</span>}
          </div>

          {day.meals?.map((meal, i) => (
            <div key={i} className={styles.mealCard}>
              <span
                className={styles.mealTime}
                style={{ color: TIME_COLORS[meal.time] ?? 'var(--neon)', borderColor: `${TIME_COLORS[meal.time] ?? 'var(--neon)'}44`, background: `${TIME_COLORS[meal.time] ?? 'var(--neon)'}18` }}
              >
                {meal.time}
              </span>

              <div className={styles.mealBody}>
                <div className={styles.cuisine}>{meal.cuisine}</div>
                <h3 className={styles.mealName}>{meal.name}</h3>
                <p className={styles.mealDesc}>{meal.description}</p>
                {meal.tip && (
                  <div className={styles.tip}>💡 {meal.tip}</div>
                )}
              </div>

              <div className={styles.mealMeta}>
                <div className={styles.area}>{meal.area}</div>
                <div className={styles.price}>{meal.price}</div>
                <button
                  className={styles.mapBtn}
                  onClick={() => setMapMeal(meal)}
                >
                  Google Maps
                </button>
                <a
                  className={styles.reserveBtn}
                  href={`https://tableall.com/en/search?q=${encodeURIComponent(meal.name + ' Tokyo')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Reserve →
                </a>
              </div>
            </div>
          ))}
        </div>
      ))}

      {mapMeal && (
        <div className={styles.mapOverlay} onClick={() => setMapMeal(null)}>
          <div className={styles.mapModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.mapModalHeader}>
              <span className={styles.mapModalTitle}>{mapMeal.name}</span>
              <button className={styles.mapModalClose} onClick={() => setMapMeal(null)}>✕</button>
            </div>
            <iframe
              className={styles.mapFrame}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(mapMeal.name + ' ' + mapMeal.area + ' Tokyo')}&output=embed`}
              allowFullScreen
              loading="lazy"
            />
            <div className={styles.mapModalFooter}>
              <a
                className={styles.mapOpenLink}
                href={`https://www.google.com/maps/search/${encodeURIComponent(mapMeal.name + ' ' + mapMeal.area + ' Tokyo')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Mapsで開く →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
