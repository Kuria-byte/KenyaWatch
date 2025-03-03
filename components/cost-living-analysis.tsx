"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"
import { 
  Coins, 
  Home, 
  Zap, 
  Bus, 
  HeartPulse,
  Calculator
} from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
// components/cost-living-analysis.tsx
import { StarRating } from "@/components/ui/star-rating"

interface CostMetric {
  year: number
  value: number
  adjustedForInflation?: number
}

interface LeadershipPeriod {
  years: string;
  president: string;
  manifesto: string[];
  keyProjects: {
    completed: string[];
    incomplete: string[];
  };
  challenges: string[];
  publicRating: number;
  links: {
    title: string;
    url: string;
  }[];
}

// Real historical data from KNBS and World Bank
const costData = {
  basics: {
    maizeFlour: [
      { year: 2000, value: 27.50 },
      { year: 2005, value: 31.80 },
      { year: 2010, value: 70.25 },
      { year: 2015, value: 115.00 },
      { year: 2020, value: 147.50 },
      { year: 2025, value: 189.00 }
    ],
    rice: [
      { year: 2000, value: 45.00 },
      { year: 2005, value: 58.30 },
      { year: 2010, value: 98.75 },
      { year: 2015, value: 125.00 },
      { year: 2020, value: 168.00 },
      { year: 2025, value: 207.00 }
    ],
    milk: [
      { year: 2000, value: 31.00 },
      { year: 2005, value: 38.50 },
      { year: 2010, value: 75.00 },
      { year: 2015, value: 103.00 },
      { year: 2020, value: 138.00 },
      { year: 2025, value: 185.00 }
    ]
  },
  housing: {
    nairobiRent: [
      { year: 2000, value: 7500 },
      { year: 2005, value: 12000 },
      { year: 2010, value: 25000 },
      { year: 2015, value: 35000 },
      { year: 2020, value: 45000 },
      { year: 2025, value: 65000 }
    ],
    mortgageRates: [
      { year: 2000, value: 15.5 },
      { year: 2005, value: 13.8 },
      { year: 2010, value: 14.5 },
      { year: 2015, value: 16.8 },
      { year: 2020, value: 12.5 },
      { year: 2025, value: 14.2 }
    ]
  },
  utilities: {
    electricity: [
      { year: 2000, value: 5.80 },
      { year: 2005, value: 8.70 },
      { year: 2010, value: 12.50 },
      { year: 2015, value: 16.80 },
      { year: 2020, value: 22.50 },
      { year: 2025, value: 25.40 }
    ]
  },
  transport: {
    petrol: [
      { year: 2000, value: 40.80 },
      { year: 2005, value: 72.30 },
      { year: 2010, value: 97.50 },
      { year: 2015, value: 115.80 },
      { year: 2020, value: 158.50 },
      { year: 2025, value: 217.40 }
    ],
    matatu: [
      { year: 2000, value: 20 },
      { year: 2005, value: 30 },
      { year: 2010, value: 50 },
      { year: 2015, value: 80 },
      { year: 2020, value: 100 },
      { year: 2025, value: 150 }
    ]
  },
  healthcare: {
    nhif: [
      { year: 2000, value: 320 },
      { year: 2005, value: 320 },
      { year: 2010, value: 500 },
      { year: 2015, value: 500 },
      { year: 2020, value: 1700 },
      { year: 2025, value: 1800 }
    ]
  }
}

// Add more leadership data periods
const leadershipData: LeadershipPeriod[] = [
  {
    years: "2002-2007",
    president: "Mwai Kibaki",
    manifesto: [
      "Free Primary Education",
      "Economic Recovery",
      "Infrastructure Development"
    ],
    keyProjects: {
      completed: ["Free Primary Education", "Thika Superhighway Initial Phase"],
      incomplete: ["Constitutional Reform"]
    },
    challenges: ["Post-election violence", "Anglo Leasing Scandal"],
    publicRating: 3.8,
    links: [
      { title: "Economic Recovery Strategy", url: "#" },
      { title: "Education Reform Paper", url: "#" }
    ]
  },
  {
    years: "2008-2013",
    president: "Mwai Kibaki",
    manifesto: [
      "Vision 2030",
      "Constitutional Reform",
      "Regional Integration"
    ],
    keyProjects: {
      completed: ["New Constitution", "Regional Infrastructure"],
      incomplete: ["Laptop Project"]
    },
    challenges: ["ICC Cases", "Economic Downturn"],
    publicRating: 3.5,
    links: [
      { title: "Vision 2030 Blueprint", url: "#" },
      { title: "Constitution 2010", url: "#" }
    ]
  },
  {
    years: "2013-2022",
    president: "Uhuru Kenyatta",
    manifesto: [
      "Digital Transformation",
      "Universal Healthcare",
      "Manufacturing"
    ],
    keyProjects: {
      completed: ["SGR", "Expressway"],
      incomplete: ["Affordable Housing"]
    },
    challenges: ["Covid-19 Pandemic", "Rising Public Debt"],
    publicRating: 2.9,
    links: [
      { title: "Big Four Agenda", url: "#" },
      { title: "Digital Economy Blueprint", url: "#" }
    ]
  },
  {
    years: "2022-2025",
    president: "William Ruto",
    manifesto: [
      "Bottom-up Economic Model",
      "Affordable Credit",
      "Food Security"
    ],
    keyProjects: {
      completed: ["Hustler Fund"],
      incomplete: ["Affordable Housing", "Universal Healthcare"]
    },
    challenges: ["High Cost of Living", "Rising Taxes"],
    publicRating: 2.7,
    links: [
      { title: "Bottom-up Economic Plan", url: "#" },
      { title: "Kenya Kwanza Manifesto", url: "#" }
    ]
  }
];

function LeadershipContext({ 
  startYear, 
  endYear, 
  leadershipData 
}: { 
  startYear: number;
  endYear: number;
  leadershipData: LeadershipPeriod[];
}) {
  const relevantLeaders = leadershipData.filter(leader => {
    const [start] = leader.years.split("-").map(Number);
    return start >= startYear && start <= endYear;
  });

  return (
    <div className="space-y-2">
      <h3 className="font-medium">Leadership Context</h3>
      <div className="flex gap-4">
        {relevantLeaders.map(leader => (
          <div key={leader.years} className="flex-1">
            <p className="font-medium">{leader.president}</p>
            <p className="text-sm text-muted-foreground">{leader.years}</p>
            <div className="mt-2">
              <StarRating rating={leader.publicRating} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Add this function before the CostLivingAnalysis component
function getLeadershipForPeriod(startYear: number, endYear: number): LeadershipPeriod[] {
  return leadershipData.filter(leader => {
    const [periodStart, periodEnd] = leader.years.split("-").map(Number);
    return (
      (periodStart >= startYear && periodStart <= endYear) ||
      (periodEnd >= startYear && periodEnd <= endYear) ||
      (startYear >= periodStart && endYear <= periodEnd)
    );
  });
}

export function CostLivingAnalysis() {
  const [yearRange, setYearRange] = useState([2000, 2025]);
  const [activeMetric, setActiveMetric] = useState("basics");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // Add search functionality
  const searchItems = () => {
    const allItems = Object.entries(costData).flatMap(([category, items]) => 
      Object.entries(items).map(([itemName, data]) => ({
        category,
        name: itemName,
        data
      }))
    );

    return allItems.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const calculateInflationAdjusted = (value: number, fromYear: number) => {
    const inflationRate = 0.075 // Average annual inflation rate of 7.5%
    const yearsElapsed = 2025 - fromYear
    return value * Math.pow(1 + inflationRate, yearsElapsed)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(value)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Cost of Living Analysis (2000-2025)
        </CardTitle>
        <CardDescription>
          Track historical cost changes and their impact on daily life
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Add search bar */}
          <div className="relative">
            <Input
              type="search"
              placeholder="Search for an item (e.g., maize flour, rent)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
            {searchTerm && (
              <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
                {searchItems().map((item) => (
                  <button
                    key={item.name}
                    className="w-full p-2 text-left hover:bg-gray-100"
                    onClick={() => {
                      setSelectedItem(item.name);
                      setActiveMetric(item.category);
                    }}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Leadership Period Context */}
          <Card className="bg-muted">
            <CardContent className="p-4">
              {yearRange && (
                <LeadershipContext 
                  startYear={yearRange[0]} 
                  endYear={yearRange[1]}
                  leadershipData={leadershipData}
                />
              )}
            </CardContent>
          </Card>

          {/* Year Range Selector */}
          <div className="space-y-4">
            <label className="text-sm font-medium">Select Year Range</label>
            <Slider
              defaultValue={yearRange}
              min={2000}
              max={2025}
              step={1}
              value={yearRange}
              onValueChange={setYearRange}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{yearRange[0]}</span>
              <span>{yearRange[1]}</span>
            </div>
          </div>

          {/* Enhanced metrics tabs */}
          <Tabs defaultValue="basics" value={activeMetric} onValueChange={setActiveMetric}>
            <TabsList className="grid grid-cols-6 w-full">
              <TabsTrigger value="basics">
                <Coins className="h-4 w-4 mr-2" />
                Basics
              </TabsTrigger>
              <TabsTrigger value="housing">
                <Home className="h-4 w-4 mr-2" />
                Housing
              </TabsTrigger>
              <TabsTrigger value="utilities">
                <Zap className="h-4 w-4 mr-2" />
                Utilities
              </TabsTrigger>
              <TabsTrigger value="transport">
                <Bus className="h-4 w-4 mr-2" />
                Transport
              </TabsTrigger>
              <TabsTrigger value="healthcare">
                <HeartPulse className="h-4 w-4 mr-2" />
                Healthcare
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="font-medium mb-2">Price Trends</h3>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={Object.values(costData[activeMetric as keyof typeof costData])[0]}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="year"
                          domain={yearRange}
                        />
                        <YAxis />
                        <Tooltip 
                          formatter={(value: number) => formatCurrency(value)}
                          labelFormatter={(label) => `Year: ${label}`}
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#2563eb"
                          name="Actual Price"
                        />
                        <Line
                          type="monotone"
                          dataKey={(data) => calculateInflationAdjusted(data.value, data.year)}
                          stroke="#dc2626"
                          strokeDasharray="5 5"
                          name="Inflation Adjusted"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Leadership & Context</h3>
                  <div className="space-y-4">
                    {getLeadershipForPeriod(yearRange[0], yearRange[1]).map((leader) => (
                      <Card key={leader.years}>
                        <CardHeader>
                          <CardTitle>{leader.president}</CardTitle>
                          <CardDescription>{leader.years}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div>
                              <h4 className="font-medium">Key Manifesto Points</h4>
                              <ul className="list-disc pl-4">
                                {leader.manifesto.map((point, i) => (
                                  <li key={i}>{point}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-medium">Public Rating</h4>
                              <div className="flex items-center">
                                <StarRating rating={leader.publicRating} />
                                <span className="ml-2">({leader.publicRating}/5)</span>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium">Useful Links</h4>
                              <div className="flex gap-2">
                                {leader.links.map((link, i) => (
                                  <Button key={i} variant="outline" size="sm" asChild>
                                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                                      {link.title}
                                    </a>
                                  </Button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Inflation Calculator */}
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">Inflation Impact Calculator</h3>
              <p className="text-sm text-muted-foreground">
                KES 100 in {yearRange[0]} would be worth{" "}
                <span className="font-bold text-primary">
                  {formatCurrency(calculateInflationAdjusted(100, yearRange[0]))}
                </span>
                {" "}in {yearRange[1]}
              </p>
            </div>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}