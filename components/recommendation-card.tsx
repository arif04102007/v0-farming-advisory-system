"use client"

import type { Recommendation } from "@/lib/recommendation-engine"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"

interface RecommendationCardProps {
  recommendation: Recommendation
  rank: number
}

export function RecommendationCard({ recommendation, rank }: RecommendationCardProps) {
  const { crop, suitability, reasons, estimatedProfit, riskLevel, calendar } = recommendation

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">#{rank}</Badge>
              <CardTitle>{crop.name}</CardTitle>
              <span className="text-sm text-muted-foreground">({crop.hindiName})</span>
            </div>
            <CardDescription className="mt-2">{crop.season.toUpperCase()} Season</CardDescription>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary">{Math.round(suitability)}%</div>
            <div className="text-xs text-muted-foreground">Suitability</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Suitability Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Match Score</span>
            <span className="text-muted-foreground">{Math.round(suitability)}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${suitability}%` }} />
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Estimated Profit</div>
            <div className="text-lg font-semibold text-green-600">₹{(estimatedProfit / 100000).toFixed(1)}L</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Risk Level</div>
            <Badge className={getRiskColor(riskLevel)}>{riskLevel.toUpperCase()}</Badge>
          </div>
        </div>

        {/* Reasons */}
        <div className="space-y-2">
          <div className="text-sm font-medium">Why This Crop?</div>
          <ul className="space-y-1">
            {reasons.map((reason, idx) => (
              <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Crop Details */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div>
            <div className="text-xs text-muted-foreground">Water Requirement</div>
            <div className="font-medium">{crop.waterRequirement} mm</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Growth Period</div>
            <div className="font-medium">{crop.growthPeriod} days</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Cost/Hectare</div>
            <div className="font-medium">₹{crop.costPerHectare.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Expected Yield</div>
            <div className="font-medium">{crop.yieldPerHectare} kg/ha</div>
          </div>
        </div>

        {/* Farming Calendar */}
        <div className="space-y-2 pt-4 border-t">
          <div className="text-sm font-medium flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Farming Calendar
          </div>
          <div className="space-y-2">
            {calendar.slice(0, 5).map((event, idx) => (
              <div key={idx} className="text-sm bg-secondary/50 p-2 rounded">
                <div className="font-medium text-primary">Month {event.month}</div>
                <div className="text-muted-foreground">{event.activity}</div>
                <div className="text-xs text-muted-foreground italic">{event.hindiActivity}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
