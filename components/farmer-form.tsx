"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { FarmerInput } from "@/lib/recommendation-engine"
import { soilTypes, regions } from "@/lib/crop-database"

interface FarmerFormProps {
  onSubmit: (data: FarmerInput) => void
  isLoading?: boolean
}

export function FarmerForm({ onSubmit, isLoading }: FarmerFormProps) {
  const [formData, setFormData] = useState<FarmerInput>({
    landSize: 1,
    region: "north",
    soilType: "alluvial",
    budget: 50000,
    waterAvailability: "medium",
    preferredSeason: "kharif",
    experience: "intermediate",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Farm Information</CardTitle>
        <CardDescription>Tell us about your farm to get personalized crop recommendations</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Land Size */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Land Size (hectares)</label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={formData.landSize}
                onChange={(e) => setFormData({ ...formData, landSize: Number.parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              />
            </div>

            {/* Region */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Region</label>
              <select
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
                {regions.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} ({r.hindiName})
                  </option>
                ))}
              </select>
            </div>

            {/* Soil Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Soil Type</label>
              <select
                value={formData.soilType}
                onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
                {soilTypes.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.hindiName})
                  </option>
                ))}
              </select>
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Budget (Rs)</label>
              <input
                type="number"
                min="10000"
                step="5000"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: Number.parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              />
            </div>

            {/* Water Availability */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Water Availability</label>
              <select
                value={formData.waterAvailability}
                onChange={(e) => setFormData({ ...formData, waterAvailability: e.target.value as any })}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="high">High (Irrigation available)</option>
                <option value="medium">Medium (Seasonal)</option>
                <option value="low">Low (Rainfed)</option>
              </select>
            </div>

            {/* Season */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Preferred Season</label>
              <select
                value={formData.preferredSeason}
                onChange={(e) => setFormData({ ...formData, preferredSeason: e.target.value as any })}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="kharif">Kharif (Monsoon)</option>
                <option value="rabi">Rabi (Winter)</option>
                <option value="both">Both</option>
              </select>
            </div>

            {/* Experience */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Farming Experience</label>
              <select
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value as any })}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Getting Recommendations..." : "Get Crop Recommendations"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
