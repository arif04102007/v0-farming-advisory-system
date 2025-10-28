// Comprehensive crop database with requirements and profitability data
export interface Crop {
  id: string
  name: string
  hindiName: string
  season: "kharif" | "rabi" | "both"
  waterRequirement: number // mm
  soilTypes: string[]
  temperatureRange: [number, number] // Celsius
  rainfallRange: [number, number] // mm
  costPerHectare: number // Rs
  yieldPerHectare: number // kg
  pricePerKg: number // Rs
  growthPeriod: number // days
  plantingMonth: number[]
  harvestMonth: number[]
  fertilizer: {
    nitrogen: number // kg/ha
    phosphorus: number // kg/ha
    potassium: number // kg/ha
  }
  pesticides: string[]
  practices: string[]
}

export const cropDatabase: Crop[] = [
  {
    id: "wheat",
    name: "Wheat",
    hindiName: "गेहूं",
    season: "rabi",
    waterRequirement: 450,
    soilTypes: ["alluvial", "black", "red"],
    temperatureRange: [15, 25],
    rainfallRange: [375, 650],
    costPerHectare: 35000,
    yieldPerHectare: 5000,
    pricePerKg: 25,
    growthPeriod: 120,
    plantingMonth: [10, 11],
    harvestMonth: [3, 4, 5],
    fertilizer: { nitrogen: 120, phosphorus: 60, potassium: 40 },
    pesticides: ["Armyworm", "Aphids", "Rust"],
    practices: ["Crop rotation", "Timely sowing", "Proper spacing"],
  },
  {
    id: "rice",
    name: "Rice",
    hindiName: "चावल",
    season: "kharif",
    waterRequirement: 1200,
    soilTypes: ["alluvial", "black"],
    temperatureRange: [20, 30],
    rainfallRange: [1200, 1400],
    costPerHectare: 45000,
    yieldPerHectare: 6000,
    pricePerKg: 30,
    growthPeriod: 120,
    plantingMonth: [6, 7],
    harvestMonth: [10, 11],
    fertilizer: { nitrogen: 100, phosphorus: 50, potassium: 40 },
    pesticides: ["Stem borer", "Leaf folder", "Brown planthopper"],
    practices: ["Puddling", "Transplanting", "Proper water management"],
  },
  {
    id: "cotton",
    name: "Cotton",
    hindiName: "कपास",
    season: "kharif",
    waterRequirement: 600,
    soilTypes: ["black", "red"],
    temperatureRange: [21, 30],
    rainfallRange: [600, 1000],
    costPerHectare: 55000,
    yieldPerHectare: 2000,
    pricePerKg: 60,
    growthPeriod: 180,
    plantingMonth: [5, 6],
    harvestMonth: [10, 11, 12],
    fertilizer: { nitrogen: 120, phosphorus: 60, potassium: 60 },
    pesticides: ["Bollworm", "Whitefly", "Jassids"],
    practices: ["Intercropping", "Pest monitoring", "Timely picking"],
  },
  {
    id: "maize",
    name: "Maize",
    hindiName: "मक्का",
    season: "kharif",
    waterRequirement: 500,
    soilTypes: ["alluvial", "red", "black"],
    temperatureRange: [21, 27],
    rainfallRange: [500, 750],
    costPerHectare: 30000,
    yieldPerHectare: 7000,
    pricePerKg: 20,
    growthPeriod: 120,
    plantingMonth: [5, 6, 7],
    harvestMonth: [9, 10],
    fertilizer: { nitrogen: 150, phosphorus: 75, potassium: 40 },
    pesticides: ["Stem borer", "Armyworm"],
    practices: ["Line sowing", "Timely weeding", "Proper spacing"],
  },
  {
    id: "groundnut",
    name: "Groundnut",
    hindiName: "मूंगफली",
    season: "kharif",
    waterRequirement: 500,
    soilTypes: ["red", "alluvial"],
    temperatureRange: [20, 30],
    rainfallRange: [500, 1000],
    costPerHectare: 25000,
    yieldPerHectare: 2500,
    pricePerKg: 50,
    growthPeriod: 120,
    plantingMonth: [5, 6],
    harvestMonth: [9, 10],
    fertilizer: { nitrogen: 20, phosphorus: 50, potassium: 40 },
    pesticides: ["Leaf spot", "Rust"],
    practices: ["Crop rotation", "Proper drainage", "Timely harvesting"],
  },
  {
    id: "chickpea",
    name: "Chickpea",
    hindiName: "चना",
    season: "rabi",
    waterRequirement: 400,
    soilTypes: ["black", "alluvial"],
    temperatureRange: [15, 25],
    rainfallRange: [400, 600],
    costPerHectare: 20000,
    yieldPerHectare: 2000,
    pricePerKg: 55,
    growthPeriod: 120,
    plantingMonth: [10, 11],
    harvestMonth: [3, 4],
    fertilizer: { nitrogen: 20, phosphorus: 50, potassium: 20 },
    pesticides: ["Pod borer", "Gram caterpillar"],
    practices: ["Crop rotation", "Seed treatment", "Proper spacing"],
  },
  {
    id: "soybean",
    name: "Soybean",
    hindiName: "सोयाबीन",
    season: "kharif",
    waterRequirement: 450,
    soilTypes: ["black", "red"],
    temperatureRange: [20, 30],
    rainfallRange: [450, 750],
    costPerHectare: 28000,
    yieldPerHectare: 2000,
    pricePerKg: 45,
    growthPeriod: 100,
    plantingMonth: [6, 7],
    harvestMonth: [9, 10],
    fertilizer: { nitrogen: 20, phosphorus: 60, potassium: 40 },
    pesticides: ["Leaf folder", "Pod fly"],
    practices: ["Crop rotation", "Inoculation", "Timely weeding"],
  },
  {
    id: "sugarcane",
    name: "Sugarcane",
    hindiName: "गन्ना",
    season: "both",
    waterRequirement: 2000,
    soilTypes: ["alluvial", "black"],
    temperatureRange: [21, 27],
    rainfallRange: [1200, 2250],
    costPerHectare: 80000,
    yieldPerHectare: 70000,
    pricePerKg: 3,
    growthPeriod: 360,
    plantingMonth: [10, 11, 12, 1, 2],
    harvestMonth: [11, 12, 1, 2, 3, 4, 5],
    fertilizer: { nitrogen: 150, phosphorus: 75, potassium: 75 },
    pesticides: ["Stem borer", "Scale insect"],
    practices: ["Proper spacing", "Mulching", "Timely harvesting"],
  },
]

export const soilTypes = [
  { id: "alluvial", name: "Alluvial", hindiName: "जलोढ़", characteristics: "Fertile, good for most crops" },
  { id: "black", name: "Black (Regur)", hindiName: "काली मिट्टी", characteristics: "Best for cotton, rich in minerals" },
  { id: "red", name: "Red", hindiName: "लाल मिट्टी", characteristics: "Porous, good drainage" },
  {
    id: "laterite",
    name: "Laterite",
    hindiName: "लेटराइट",
    characteristics: "Hard when dry, suitable for specific crops",
  },
]

export const regions = [
  {
    id: "north",
    name: "North India",
    hindiName: "उत्तर भारत",
    avgRainfall: 600,
    states: ["Punjab", "Haryana", "Uttar Pradesh"],
  },
  {
    id: "south",
    name: "South India",
    hindiName: "दक्षिण भारत",
    avgRainfall: 1000,
    states: ["Karnataka", "Tamil Nadu", "Andhra Pradesh"],
  },
  {
    id: "central",
    name: "Central India",
    hindiName: "मध्य भारत",
    avgRainfall: 800,
    states: ["Madhya Pradesh", "Chhattisgarh"],
  },
  { id: "east", name: "East India", hindiName: "पूर्व भारत", avgRainfall: 1200, states: ["Bihar", "West Bengal"] },
  { id: "west", name: "West India", hindiName: "पश्चिम भारत", avgRainfall: 700, states: ["Gujarat", "Maharashtra"] },
]
