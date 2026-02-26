import { ItineraryForm } from './types'

const BUDGET_LABEL: Record<string, string> = {
  budget: 'Budget (under ¥1,500/meal)',
  mid: 'Mid-range (¥1,500–5,000/meal)',
  high: 'High-end (¥5,000+/meal)',
}

export function buildPrompt(form: ItineraryForm): string {
  return `You are an expert Tokyo food guide. Create a ${form.days}-day Tokyo gourmet itinerary.

Traveler preferences:
- Area: ${form.area}
- Budget: ${BUDGET_LABEL[form.budget]}
- Dietary restriction: ${form.restriction}
- Travel style: ${form.style === 'local' ? 'Local hidden gems & neighborhood spots' : 'Famous must-try spots & iconic restaurants'}
- Preferred cuisines: ${form.cuisines.join(', ')}

Respond ONLY with a valid JSON object. No markdown, no explanation, no extra text. Use this exact format:
{
  "days": [
    {
      "day": 1,
      "theme": "short evocative theme (e.g. 'Old Tokyo & Street Food')",
      "meals": [
        {
          "time": "Breakfast",
          "name": "Restaurant name in English (and Japanese if known)",
          "cuisine": "specific cuisine type",
          "area": "neighborhood name",
          "price": "¥XXX–¥XXX per person",
          "description": "2 vivid sentences: what makes this place special and what to order",
          "tip": "one specific local insider tip (best seat, what to avoid, best time to go, etc.)"
        }
      ]
    }
  ],
  "summary": "One evocative sentence capturing the overall trip vibe"
}

Include 3 meals per day (Breakfast, Lunch, Dinner). Add Late Night only if the area and style warrants it.
Make restaurant names realistic and specific to Tokyo. Respect dietary restrictions strictly.`
}
