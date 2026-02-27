export type Budget = 'budget' | 'mid' | 'high'
export type TravelStyle = 'local' | 'famous'
export type DietaryRestriction = 'None' | 'Halal' | 'Vegan' | 'Vegetarian' | 'Gluten-Free' | 'Nut Allergy'

export interface ItineraryForm {
  days: string
  area: string
  budget: Budget
  restriction: DietaryRestriction
  style: TravelStyle
  cuisines: string[]
}

export interface Meal {
  time: 'Breakfast' | 'Lunch' | 'Dinner' | 'Late Night'
  name: string
  cuisine: string
  area: string
  price: string
  description: string
  tip?: string
}

export interface Day {
  day: number
  theme: string
  meals: Meal[]
}

export interface Itinerary {
  days: Day[]
  summary?: string
}
