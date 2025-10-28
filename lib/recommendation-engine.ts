import { type Crop, cropDatabase } from "./crop-database"

export interface FarmerInput {
  landSize: number // hectares
  region: string
  soilType: string
  budget: number // Rs
  waterAvailability: "high" | "medium" | "low"
  preferredSeason: "kharif" | "rabi" | "both"
  experience: "beginner" | "intermediate" | "advanced"
}

export interface Recommendation {
  crop: Crop
  suitability: number // 0-100
  reasons: string[]
  estimatedProfit: number
  riskLevel: "low" | "medium" | "high"
  calendar: CalendarEvent[]
}

export interface CalendarEvent {
  month: number
  activity: string
  hindiActivity: string
}

export function recommendCrops(input: FarmerInput): Recommendation[] {
  const recommendations: Recommendation[] = []

  for (const crop of cropDatabase) {
    let suitability = 100
    const reasons: string[] = []

    // Season matching
    if (crop.season !== "both" && crop.season !== input.preferredSeason) {
      suitability -= 20
      reasons.push(`Not ideal for ${input.preferredSeason} season`)
    } else {
      reasons.push(`Suitable for ${input.preferredSeason} season`)
    }

    // Soil type matching
    if (!crop.soilTypes.includes(input.soilType)) {
      suitability -= 15
      reasons.push(`Requires different soil type`)
    } else {
      reasons.push(`Compatible with ${input.soilType} soil`)
    }

    // Budget matching
    if (crop.costPerHectare > input.budget / input.landSize) {
      suitability -= 25
      reasons.push(`High cost of cultivation`)
    } else {
      reasons.push(`Within budget constraints`)
    }

    // Water availability
    const waterScore = getWaterScore(crop.waterRequirement, input.waterAvailability)
    suitability += waterScore - 50
    if (waterScore >= 70) {
      reasons.push(`Good water availability match`)
    }

    // Experience level
    if (input.experience === "beginner" && crop.pesticides.length > 2) {
      suitability -= 10
      reasons.push(`Requires pest management experience`)
    }

    // Profitability
    const estimatedProfit = (crop.yieldPerHectare * crop.pricePerKg - crop.costPerHectare) * input.landSize

    // Risk assessment
    let riskLevel: "low" | "medium" | "high" = "medium"
    if (crop.pesticides.length > 3) riskLevel = "high"
    if (crop.pesticides.length <= 1) riskLevel = "low"

    if (suitability > 40) {
      recommendations.push({
        crop,
        suitability: Math.max(0, Math.min(100, suitability)),
        reasons,
        estimatedProfit,
        riskLevel,
        calendar: generateCalendar(crop),
      })
    }
  }

  return recommendations.sort((a, b) => b.suitability - a.suitability)
}

function getWaterScore(required: number, availability: "high" | "medium" | "low"): number {
  if (availability === "high") return Math.min(100, 100 - Math.abs(required - 1000) / 10)
  if (availability === "medium") return Math.min(100, 100 - Math.abs(required - 600) / 10)
  return Math.min(100, 100 - Math.abs(required - 300) / 10)
}

function generateCalendar(crop: Crop): CalendarEvent[] {
  const events: CalendarEvent[] = []
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const hindiMonths = ["जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"]

  crop.plantingMonth.forEach((month) => {
    events.push({
      month,
      activity: `Prepare land and sow ${crop.name}`,
      hindiActivity: `${crop.hindiName} की बुवाई करें`,
    })
  })

  crop.plantingMonth.forEach((month) => {
    const fertMonth = (month + 1) % 12 || 12
    events.push({
      month: fertMonth,
      activity: `Apply fertilizer (N: ${crop.fertilizer.nitrogen}kg, P: ${crop.fertilizer.phosphorus}kg, K: ${crop.fertilizer.potassium}kg)`,
      hindiActivity: `खाद का प्रयोग करें`,
    })
  })

  crop.harvestMonth.forEach((month) => {
    events.push({
      month,
      activity: `Harvest ${crop.name}`,
      hindiActivity: `${crop.hindiName} की कटाई करें`,
    })
  })

  return events
}
