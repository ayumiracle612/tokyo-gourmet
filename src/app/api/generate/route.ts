import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { buildPrompt } from '@/lib/prompt'
import { ItineraryForm } from '@/lib/types'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const form: ItineraryForm = await req.json()

    // Basic validation
    if (!form.days || !form.area || !form.cuisines?.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const prompt = buildPrompt(form)

    const message = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = message.content
      .map((block) => (block.type === 'text' ? block.text : ''))
      .join('')

    // Strip any accidental markdown fences
    const clean = text.replace(/```json|```/g, '').trim()
    const itinerary = JSON.parse(clean)

    return NextResponse.json(itinerary)
  } catch (error) {
    console.error('Generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate itinerary. Please try again.' },
      { status: 500 }
    )
  }
}
