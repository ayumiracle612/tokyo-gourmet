'use client'

import { Itinerary, ItineraryForm } from '@/lib/types'
import styles from './ItineraryResult.module.css'

interface Props {
  itinerary: Itinerary
  form: ItineraryForm
  onReset: () => void
}

const TIME_COLORS: Record<string, string> = {
  Breakfast: '#58a6ff',
  Lunch: '#3fb950',
  Dinner: '#ff8c42',
  'Late Night': '#bc8cff',
}

export default function ItineraryResult({ itinerary, form, onReset }: Props) {
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
    </div>
  )
}
