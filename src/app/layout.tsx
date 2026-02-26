import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tokyo Gourmet | AI-Powered Food Itinerary',
  description: 'Generate your perfect Tokyo food journey with AI. Personalized gourmet itineraries for every taste, budget, and dietary need.',
  openGraph: {
    title: 'Tokyo Gourmet | AI-Powered Food Itinerary',
    description: 'Your perfect Tokyo food journey, crafted by AI.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
