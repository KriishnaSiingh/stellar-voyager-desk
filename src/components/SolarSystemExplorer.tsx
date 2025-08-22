import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Thermometer, Clock, Ruler, Zap } from "lucide-react";

interface PlanetData {
  name: string;
  type: string;
  distance: string;
  diameter: string;
  temperature: string;
  dayLength: string;
  moons: number;
  description: string;
  funFacts: string[];
  color: string;
  image: string;
}

const planetsData: PlanetData[] = [
  {
    name: "Mercury",
    type: "Rocky Planet",
    distance: "57.9 million km",
    diameter: "4,879 km",
    temperature: "-173°C to 427°C",
    dayLength: "58.6 Earth days",
    moons: 0,
    description: "The smallest planet in our solar system and nearest to the Sun, Mercury is only slightly larger than Earth's Moon.",
    funFacts: [
      "Has the most extreme temperature variations",
      "One day on Mercury lasts longer than its year",
      "Has a very thin atmosphere called an exosphere"
    ],
    color: "bg-orange-500",
    image: "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=400"
  },
  {
    name: "Venus",
    type: "Rocky Planet",
    distance: "108.2 million km",
    diameter: "12,104 km",
    temperature: "462°C",
    dayLength: "243 Earth days",
    moons: 0,
    description: "Venus is the hottest planet in our solar system due to its thick atmosphere that traps heat in a runaway greenhouse effect.",
    funFacts: [
      "Rotates backwards compared to most planets",
      "Has clouds of sulfuric acid",
      "Surface pressure is 90 times that of Earth"
    ],
    color: "bg-yellow-500",
    image: "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=400"
  },
  {
    name: "Earth",
    type: "Rocky Planet",
    distance: "149.6 million km",
    diameter: "12,756 km",
    temperature: "-89°C to 58°C",
    dayLength: "24 hours",
    moons: 1,
    description: "Our home planet is the only known place in the universe where life exists, with liquid water covering about 71% of its surface.",
    funFacts: [
      "The only planet known to support life",
      "Has a magnetic field that protects from solar radiation",
      "About 4.54 billion years old"
    ],
    color: "bg-blue-500",
    image: "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=400"
  },
  {
    name: "Mars",
    type: "Rocky Planet",
    distance: "227.9 million km",
    diameter: "6,792 km",
    temperature: "-87°C to -5°C",
    dayLength: "24.6 hours",
    moons: 2,
    description: "Known as the Red Planet due to iron oxide on its surface, Mars has the largest volcano and canyon in the solar system.",
    funFacts: [
      "Has the largest volcano in the solar system (Olympus Mons)",
      "Polar ice caps contain water and carbon dioxide",
      "A day on Mars is very similar to Earth's"
    ],
    color: "bg-red-500",
    image: "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=400"
  },
  {
    name: "Jupiter",
    type: "Gas Giant",
    distance: "778.5 million km",
    diameter: "142,984 km",
    temperature: "-108°C",
    dayLength: "9.9 hours",
    moons: 95,
    description: "The largest planet in our solar system, Jupiter is a gas giant with a Great Red Spot that is a giant storm larger than Earth.",
    funFacts: [
      "Has the most moons of any planet",
      "The Great Red Spot is a storm larger than Earth",
      "Acts as a 'cosmic vacuum cleaner' protecting inner planets"
    ],
    color: "bg-amber-600",
    image: "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=400"
  },
  {
    name: "Saturn",
    type: "Gas Giant",
    distance: "1.43 billion km",
    diameter: "120,536 km",
    temperature: "-139°C",
    dayLength: "10.7 hours",
    moons: 146,
    description: "Famous for its prominent ring system, Saturn is the second-largest planet and the least dense - it would float in water!",
    funFacts: [
      "Has the most spectacular ring system",
      "Less dense than water",
      "Its moon Titan has lakes of liquid methane"
    ],
    color: "bg-yellow-600",
    image: "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=400"
  },
  {
    name: "Uranus",
    type: "Ice Giant",
    distance: "2.87 billion km",
    diameter: "51,118 km",
    temperature: "-197°C",
    dayLength: "17.2 hours",
    moons: 27,
    description: "This ice giant rotates on its side, making it unique among planets. It has a faint ring system and methane in its atmosphere gives it a blue-green color.",
    funFacts: [
      "Rotates on its side at a 98-degree angle",
      "Has faint rings that were discovered in 1977",
      "Methane gives it its blue-green color"
    ],
    color: "bg-cyan-500",
    image: "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=400"
  },
  {
    name: "Neptune",
    type: "Ice Giant",
    distance: "4.5 billion km",
    diameter: "49,528 km",
    temperature: "-201°C",
    dayLength: "16.1 hours",
    moons: 16,
    description: "The windiest planet with speeds reaching 2,100 km/h, Neptune is the most distant planet from the Sun in our solar system.",
    funFacts: [
      "Has the fastest winds in the solar system",
      "Takes 165 Earth years to orbit the Sun",
      "Was discovered through mathematical predictions"
    ],
    color: "bg-blue-600",
    image: "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=400"
  }
];

const SolarSystemExplorer = () => {
  const [selectedPlanet, setSelectedPlanet] = useState("Earth");

  const currentPlanet = planetsData.find(p => p.name === selectedPlanet) || planetsData[2];

  return (
    <section id="explore" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-cosmic bg-clip-text text-transparent">
            Solar System Explorer
          </h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Discover the fascinating worlds in our cosmic neighborhood
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Planet Selection */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-border shadow-cosmic sticky top-20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Select Planet
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {planetsData.map((planet) => (
                    <Button
                      key={planet.name}
                      variant={selectedPlanet === planet.name ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedPlanet(planet.name)}
                    >
                      <div className={`w-4 h-4 rounded-full ${planet.color} mr-2`} />
                      {planet.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Planet Details */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border shadow-cosmic hover:shadow-stellar transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-3xl flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${currentPlanet.color}`} />
                      {currentPlanet.name}
                    </CardTitle>
                    <CardDescription className="text-lg mt-2">
                      {currentPlanet.type}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="border-primary text-primary">
                    {currentPlanet.moons} {currentPlanet.moons === 1 ? 'Moon' : 'Moons'}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Planet Image */}
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={currentPlanet.image}
                    alt={currentPlanet.name}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=600";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                {/* Description */}
                <p className="text-foreground/90 leading-relaxed text-lg">
                  {currentPlanet.description}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Ruler className="h-4 w-4 text-accent" />
                      <span className="text-sm font-medium text-muted-foreground">Distance from Sun</span>
                    </div>
                    <p className="font-semibold text-foreground">{currentPlanet.distance}</p>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="h-4 w-4 text-accent" />
                      <span className="text-sm font-medium text-muted-foreground">Diameter</span>
                    </div>
                    <p className="font-semibold text-foreground">{currentPlanet.diameter}</p>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Thermometer className="h-4 w-4 text-accent" />
                      <span className="text-sm font-medium text-muted-foreground">Temperature</span>
                    </div>
                    <p className="font-semibold text-foreground">{currentPlanet.temperature}</p>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg md:col-span-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-accent" />
                      <span className="text-sm font-medium text-muted-foreground">Day Length</span>
                    </div>
                    <p className="font-semibold text-foreground">{currentPlanet.dayLength}</p>
                  </div>
                </div>

                {/* Fun Facts */}
                <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Fun Facts
                  </h3>
                  <ul className="space-y-2">
                    {currentPlanet.funFacts.map((fact, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-foreground/90">{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolarSystemExplorer;