'use client'

import { useState } from 'react'
import { ItineraryForm as FormType, Budget, TravelStyle, DietaryRestriction } from '@/lib/types'
import styles from './ItineraryForm.module.css'

const CUISINES = [
  '🍜 Ramen', '🍣 Sushi', '🥩 Yakiniku', '🍱 Teishoku',
  '🍤 Tempura', '🍺 Izakaya', '☕ Café', '🍡 Wagashi',
  '🍛 Curry', '🥟 Gyoza', '🐡 Kaiseki', '🍙 Onigiri',
]

const AREAS = [
  'Shinjuku & Shibuya',
  'Asakusa & Ueno',
  'Ginza & Marunouchi',
  'Roppongi & Azabu',
  'Shimokitazawa & Nakameguro',
  'Akihabara & Kanda',
  'All Areas Mix',
]

const RESTRICTIONS: DietaryRestriction[] = [
  'None', 'Halal', 'Vegan', 'Vegetarian', 'Gluten-Free', 'Nut Allergy',
]

interface Props {
  onSubmit: (form: FormType) => void
  loading: boolean
}

export default function ItineraryFormComponent({ onSubmit, loading }: Props) {
  const [form, setForm] = useState<FormType>({
    days: '2',
    area: 'Shinjuku & Shibuya',
    budget: 'mid',
    restriction: 'None',
    style: 'local',
    cuisines: ['🍜 Ramen', '🍣 Sushi', '🍺 Izakaya'],
  })

  const toggleCuisine = (c: string) => {
    setForm((f) => ({
      ...f,
      cuisines: f.cuisines.includes(c)
        ? f.cuisines.filter((x) => x !== c)
        : [...f.cuisines, c],
    }))
  }

  const handleSubmit = () => {
    if (form.cuisines.length === 0) return
    onSubmit(form)
  }

  return (
    <div className={styles.card}>
      <div className={styles.grid}>
        {/* Days */}
        <div className={styles.field}>
          <label className={styles.label}>Duration</label>
          <select
            className={styles.select}
            value={form.days}
            onChange={(e) => setForm((f) => ({ ...f, days: e.target.value }))}
          >
            {['1', '2', '3', '4', '5'].map((d) => (
              <option key={d} value={d}>{d} Day{Number(d) > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>

        {/* Area */}
        <div className={styles.field}>
          <label className={styles.label}>Area</label>
          <select
            className={styles.select}
            value={form.area}
            onChange={(e) => setForm((f) => ({ ...f, area: e.target.value }))}
          >
            {AREAS.map((a) => <option key={a}>{a}</option>)}
          </select>
        </div>

        {/* Budget */}
        <div className={styles.field}>
          <label className={styles.label}>Budget</label>
          <select
            className={styles.select}
            value={form.budget}
            onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value as Budget }))}
          >
            <option value="budget">¥ Budget (&lt;¥1,500)</option>
            <option value="mid">¥¥ Mid-Range (¥1,500–5,000)</option>
            <option value="high">¥¥¥ High-End (¥5,000+)</option>
          </select>
        </div>

        {/* Dietary */}
        <div className={styles.field}>
          <label className={styles.label}>Dietary Needs</label>
          <select
            className={styles.select}
            value={form.restriction}
            onChange={(e) => setForm((f) => ({ ...f, restriction: e.target.value as DietaryRestriction }))}
          >
            {RESTRICTIONS.map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>

        {/* Style */}
        <div className={`${styles.field} ${styles.full}`}>
          <label className={styles.label}>Travel Style</label>
          <div className={styles.chips}>
            {([['local', '🗺 Local Hidden Gems'], ['famous', '⭐ Famous Must-Visits']] as [TravelStyle, string][]).map(([v, l]) => (
              <button
                key={v}
                className={`${styles.chip} ${form.style === v ? styles.active : ''}`}
                onClick={() => setForm((f) => ({ ...f, style: v }))}
                type="button"
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Cuisines */}
        <div className={`${styles.field} ${styles.full}`}>
          <label className={styles.label}>
            Preferred Cuisines
            <span className={styles.labelNote}> — pick at least one</span>
          </label>
          <div className={styles.chips}>
            {CUISINES.map((c) => (
              <button
                key={c}
                className={`${styles.chip} ${form.cuisines.includes(c) ? styles.active : ''}`}
                onClick={() => toggleCuisine(c)}
                type="button"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        className={styles.submit}
        onClick={handleSubmit}
        disabled={loading || form.cuisines.length === 0}
      >
        {loading ? (
          <span className={styles.loadingText}>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
            Crafting your itinerary…
          </span>
        ) : (
          'Generate My Tokyo Itinerary →'
        )}
      </button>
    </div>
  )
}
