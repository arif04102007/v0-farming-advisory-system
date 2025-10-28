"use client"

import { useState } from "react"
import { FarmerForm } from "@/components/farmer-form"
import { RecommendationCard } from "@/components/recommendation-card"
import { recommendCrops, type FarmerInput, type Recommendation } from "@/lib/recommendation-engine"

export default function Home() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleFormSubmit = (data: FarmerInput) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      const recs = recommendCrops(data)
      setRecommendations(recs)
      setSubmitted(true)
      setIsLoading(false)
    }, 500)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Farming Advisory System</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get personalized crop recommendations based on your farm conditions, budget, and experience level
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <FarmerForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {!submitted ? (
              <div className="text-center py-12">
                <div className="text-muted-foreground">
                  Fill in your farm details to get personalized crop recommendations
                </div>
              </div>
            ) : recommendations.length > 0 ? (
              <div className="space-y-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">Top {recommendations.length} Recommended Crops</h2>
                  <p className="text-muted-foreground">Based on your farm conditions and preferences</p>
                </div>
                {recommendations.map((rec, idx) => (
                  <RecommendationCard key={rec.crop.id} recommendation={rec} rank={idx + 1} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-muted-foreground">
                  No suitable crops found for your conditions. Please adjust your preferences.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">8+</div>
            <div className="text-muted-foreground">Major Crops Covered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">5</div>
            <div className="text-muted-foreground">Regions Supported</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <div className="text-muted-foreground">Free & Open</div>
          </div>
        </div>
      </div>
    </main>
  )
}
