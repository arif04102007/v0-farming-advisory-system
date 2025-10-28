# Farming Advisory System - API Documentation

## Overview

The Farming Advisory System provides a recommendation engine API that analyzes farm conditions and returns personalized crop recommendations.

## Base URL

\`\`\`
https://farming-advisory.vercel.app/api
\`\`\`

## Authentication

Currently, no authentication is required. Future versions will implement API key-based authentication.

## Endpoints

### 1. Get Crop Recommendations

**Endpoint**: `POST /recommendations`

**Description**: Returns a list of recommended crops based on farmer input, sorted by suitability score.

**Request Body**:
\`\`\`json
{
  "landSize": 2.5,
  "region": "north",
  "soilType": "alluvial",
  "budget": 100000,
  "waterAvailability": "medium",
  "preferredSeason": "kharif",
  "experience": "intermediate"
}
\`\`\`

**Request Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| landSize | number | Yes | Farm size in hectares (0.1-100) |
| region | string | Yes | Region ID: north, south, central, east, west |
| soilType | string | Yes | Soil type ID: alluvial, black, red, laterite |
| budget | number | Yes | Total budget in Rs (10000-1000000) |
| waterAvailability | string | Yes | high, medium, or low |
| preferredSeason | string | Yes | kharif, rabi, or both |
| experience | string | Yes | beginner, intermediate, or advanced |

**Response Body**:
\`\`\`json
{
  "recommendations": [
    {
      "crop": {
        "id": "wheat",
        "name": "Wheat",
        "hindiName": "गेहूं",
        "season": "rabi",
        "waterRequirement": 450,
        "soilTypes": ["alluvial", "black", "red"],
        "temperatureRange": [15, 25],
        "rainfallRange": [375, 650],
        "costPerHectare": 35000,
        "yieldPerHectare": 5000,
        "pricePerKg": 25,
        "growthPeriod": 120,
        "plantingMonth": [10, 11],
        "harvestMonth": [3, 4, 5],
        "fertilizer": {
          "nitrogen": 120,
          "phosphorus": 60,
          "potassium": 40
        },
        "pesticides": ["Armyworm", "Aphids", "Rust"],
        "practices": ["Crop rotation", "Timely sowing", "Proper spacing"]
      },
      "suitability": 92,
      "reasons": [
        "Suitable for rabi season",
        "Compatible with alluvial soil",
        "Within budget constraints",
        "Good water availability match"
      ],
      "estimatedProfit": 187500,
      "riskLevel": "low",
      "calendar": [
        {
          "month": 10,
          "activity": "Prepare land and sow Wheat",
          "hindiActivity": "गेहूं की बुवाई करें"
        },
        {
          "month": 11,
          "activity": "Apply fertilizer (N: 120kg, P: 60kg, K: 40kg)",
          "hindiActivity": "खाद का प्रयोग करें"
        },
        {
          "month": 3,
          "activity": "Harvest Wheat",
          "hindiActivity": "गेहूं की कटाई करें"
        }
      ]
    }
  ],
  "totalRecommendations": 5,
  "processingTime": "245ms"
}
\`\`\`

**Response Fields**:
| Field | Type | Description |
|-------|------|-------------|
| recommendations | array | Array of crop recommendations |
| crop | object | Complete crop information |
| suitability | number | Suitability score (0-100) |
| reasons | array | List of reasons for recommendation |
| estimatedProfit | number | Estimated profit in Rs |
| riskLevel | string | low, medium, or high |
| calendar | array | Month-by-month farming activities |
| totalRecommendations | number | Total number of recommendations |
| processingTime | string | API response time |

**Status Codes**:
- `200 OK`: Successful request
- `400 Bad Request`: Invalid parameters
- `500 Internal Server Error`: Server error

**Example Request**:
\`\`\`bash
curl -X POST https://farming-advisory.vercel.app/api/recommendations \
  -H "Content-Type: application/json" \
  -d '{
    "landSize": 2.5,
    "region": "north",
    "soilType": "alluvial",
    "budget": 100000,
    "waterAvailability": "medium",
    "preferredSeason": "kharif",
    "experience": "intermediate"
  }'
\`\`\`

**Example Response**:
\`\`\`json
{
  "recommendations": [
    {
      "crop": { ... },
      "suitability": 92,
      "reasons": [ ... ],
      "estimatedProfit": 187500,
      "riskLevel": "low",
      "calendar": [ ... ]
    }
  ],
  "totalRecommendations": 5,
  "processingTime": "245ms"
}
\`\`\`

## Data Models

### Crop Object
\`\`\`typescript
interface Crop {
  id: string
  name: string
  hindiName: string
  season: "kharif" | "rabi" | "both"
  waterRequirement: number
  soilTypes: string[]
  temperatureRange: [number, number]
  rainfallRange: [number, number]
  costPerHectare: number
  yieldPerHectare: number
  pricePerKg: number
  growthPeriod: number
  plantingMonth: number[]
  harvestMonth: number[]
  fertilizer: {
    nitrogen: number
    phosphorus: number
    potassium: number
  }
  pesticides: string[]
  practices: string[]
}
\`\`\`

### Recommendation Object
\`\`\`typescript
interface Recommendation {
  crop: Crop
  suitability: number
  reasons: string[]
  estimatedProfit: number
  riskLevel: "low" | "medium" | "high"
  calendar: CalendarEvent[]
}
\`\`\`

### CalendarEvent Object
\`\`\`typescript
interface CalendarEvent {
  month: number
  activity: string
  hindiActivity: string
}
\`\`\`

## Error Handling

### Error Response Format
\`\`\`json
{
  "error": "Invalid parameters",
  "message": "landSize must be between 0.1 and 100",
  "code": "INVALID_LAND_SIZE"
}
\`\`\`

### Common Errors
| Code | Message | Solution |
|------|---------|----------|
| INVALID_LAND_SIZE | Land size out of range | Provide value between 0.1-100 hectares |
| INVALID_REGION | Unknown region | Use: north, south, central, east, west |
| INVALID_SOIL_TYPE | Unknown soil type | Use: alluvial, black, red, laterite |
| INVALID_BUDGET | Budget out of range | Provide value between 10000-1000000 Rs |
| INVALID_WATER | Invalid water availability | Use: high, medium, low |
| INVALID_SEASON | Invalid season | Use: kharif, rabi, both |
| INVALID_EXPERIENCE | Invalid experience level | Use: beginner, intermediate, advanced |

## Rate Limiting

- **Requests per minute**: 60
- **Requests per hour**: 1000
- **Requests per day**: 10000

## Versioning

Current API version: `v1`

Future versions will be available at `/api/v2`, `/api/v3`, etc.

## Changelog

### Version 1.0 (October 2025)
- Initial release
- 8 crops supported
- 5 regions covered
- Multi-language support (English, Hindi)

---

**API Documentation Version**: 1.0
**Last Updated**: October 2025
