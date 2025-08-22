import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, BookOpen, Star, Rocket, Globe, Zap, Telescope, Satellite } from "lucide-react";

interface EncyclopediaEntry {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  icon: any;
  color: string;
  keyFacts: string[];
  relatedTerms: string[];
}

const encyclopediaData: EncyclopediaEntry[] = [
  {
    id: "black-hole",
    title: "Black Hole",
    category: "cosmic-phenomena",
    shortDescription: "A region of spacetime where gravity is so strong that nothing can escape.",
    fullDescription: "Black holes are among the most extreme objects in the universe. They form when massive stars collapse at the end of their lives, creating a region where the gravitational pull is so strong that not even light can escape. The boundary around a black hole is called the event horizon.",
    icon: Star,
    color: "bg-purple-500",
    keyFacts: [
      "First theorized by John Michell in 1783",
      "The first image of a black hole was captured in 2019 (M87*)",
      "Supermassive black holes exist at the center of most galaxies",
      "Time dilation occurs near black holes due to extreme gravity"
    ],
    relatedTerms: ["Event Horizon", "Singularity", "Hawking Radiation", "Accretion Disk"]
  },
  {
    id: "nebula",
    title: "Nebula",
    category: "cosmic-phenomena",
    shortDescription: "A cloud of gas and dust in outer space, visible as bright patches or dark silhouettes.",
    fullDescription: "Nebulae are vast clouds of dust and gas in space. Some nebulae are stellar nurseries where new stars are born, while others are the remnants of dying stars. They come in various types including emission nebulae, reflection nebulae, and planetary nebulae.",
    icon: Globe,
    color: "bg-pink-500",
    keyFacts: [
      "The word 'nebula' comes from Latin meaning 'cloud'",
      "The Orion Nebula is the closest star-forming region to Earth",
      "Planetary nebulae have nothing to do with planets",
      "Some nebulae are visible to the naked eye"
    ],
    relatedTerms: ["Star Formation", "Emission Nebula", "Planetary Nebula", "Supernova Remnant"]
  },
  {
    id: "exoplanet",
    title: "Exoplanet",
    category: "planets",
    shortDescription: "A planet that orbits a star outside our solar system.",
    fullDescription: "Exoplanets, or extrasolar planets, are worlds beyond our solar system. Since the first confirmed detection in 1995, thousands have been discovered. They range from gas giants larger than Jupiter to rocky worlds smaller than Earth, with some potentially habitable.",
    icon: Globe,
    color: "bg-green-500",
    keyFacts: [
      "Over 5,000 exoplanets have been confirmed",
      "The first exoplanet around a sun-like star was 51 Pegasi b",
      "The Kepler Space Telescope discovered thousands of exoplanets",
      "Some exoplanets orbit in the habitable zone"
    ],
    relatedTerms: ["Habitable Zone", "Transit Method", "Kepler Mission", "TRAPPIST-1"]
  },
  {
    id: "space-station",
    title: "Space Station",
    category: "technology",
    shortDescription: "A spacecraft capable of supporting crew members for extended periods in orbit.",
    fullDescription: "Space stations are large spacecraft that remain in orbit and serve as homes and workplaces for astronauts. The International Space Station (ISS) is the largest human-made object in space and has been continuously occupied since 2000.",
    icon: Satellite,
    color: "bg-blue-500",
    keyFacts: [
      "The ISS orbits Earth every 90 minutes",
      "It travels at about 28,000 km/h",
      "The ISS is about the size of a football field",
      "Astronauts conduct hundreds of experiments on the ISS"
    ],
    relatedTerms: ["ISS", "Microgravity", "EVA", "Docking"]
  },
  {
    id: "wormhole",
    title: "Wormhole",
    category: "theoretical",
    shortDescription: "A hypothetical tunnel through spacetime that could connect distant regions of the universe.",
    fullDescription: "Wormholes are theoretical passages through spacetime that could create shortcuts for long journeys across the universe. While predicted by Einstein's theory of general relativity, no wormholes have been observed, and their existence remains highly speculative.",
    icon: Zap,
    color: "bg-indigo-500",
    keyFacts: [
      "Also called Einstein-Rosen bridges",
      "Would require exotic matter to remain stable",
      "Could theoretically allow time travel",
      "Popular in science fiction but unproven in reality"
    ],
    relatedTerms: ["Einstein-Rosen Bridge", "Spacetime", "General Relativity", "Exotic Matter"]
  },
  {
    id: "supernova",
    title: "Supernova",
    category: "cosmic-phenomena",
    shortDescription: "The explosive death of a massive star, briefly outshining entire galaxies.",
    fullDescription: "A supernova is the explosive death of a star that has reached the end of its life. These spectacular events can briefly outshine entire galaxies and are responsible for creating and dispersing many of the heavy elements necessary for life.",
    icon: Star,
    color: "bg-orange-500",
    keyFacts: [
      "Can be seen from billions of light-years away",
      "Create elements heavier than iron",
      "Type Ia supernovae helped discover dark energy",
      "Neutron stars and black holes are supernova remnants"
    ],
    relatedTerms: ["Neutron Star", "Type Ia", "Core Collapse", "Heavy Elements"]
  }
];

const SpaceEncyclopedia = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedEntry, setSelectedEntry] = useState<EncyclopediaEntry | null>(null);

  const categories = [
    { id: "all", name: "All Topics", icon: BookOpen },
    { id: "cosmic-phenomena", name: "Cosmic Phenomena", icon: Star },
    { id: "planets", name: "Planets & Systems", icon: Globe },
    { id: "technology", name: "Space Technology", icon: Rocket },
    { id: "theoretical", name: "Theoretical Physics", icon: Zap }
  ];

  const filteredEntries = encyclopediaData.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || entry.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="data" className="py-20 bg-gradient-stellar">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-aurora bg-clip-text text-transparent">
            Space Encyclopedia
          </h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Explore comprehensive knowledge about the universe, from cosmic phenomena to space technology
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Search and Categories */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-border shadow-cosmic sticky top-20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Encyclopedia
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Categories */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                    Categories
                  </h3>
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "ghost"}
                      className="w-full justify-start text-sm"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <category.icon className="h-4 w-4 mr-2" />
                      {category.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            {selectedEntry ? (
              // Detailed View
              <Card className="bg-card border-border shadow-cosmic">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${selectedEntry.color}`}>
                        <selectedEntry.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{selectedEntry.title}</CardTitle>
                        <CardDescription className="capitalize">
                          {selectedEntry.category.replace('-', ' ')}
                        </CardDescription>
                      </div>
                    </div>
                    <Button variant="outline" onClick={() => setSelectedEntry(null)}>
                      Back to List
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg text-foreground/90 leading-relaxed">
                    {selectedEntry.fullDescription}
                  </p>

                  <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Telescope className="h-5 w-5 text-primary" />
                      Key Facts
                    </h3>
                    <ul className="space-y-3">
                      {selectedEntry.keyFacts.map((fact, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-foreground/90">{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Related Terms</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedEntry.relatedTerms.map((term, index) => (
                        <Badge key={index} variant="outline" className="border-accent text-accent">
                          {term}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              // List View
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">
                    {filteredEntries.length} {filteredEntries.length === 1 ? 'Topic' : 'Topics'} Found
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredEntries.map((entry) => (
                    <Card
                      key={entry.id}
                      className="bg-card border-border shadow-cosmic hover:shadow-stellar transition-all duration-300 cursor-pointer group"
                      onClick={() => setSelectedEntry(entry)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${entry.color}`}>
                            <entry.icon className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg group-hover:text-primary transition-colors">
                              {entry.title}
                            </CardTitle>
                            <Badge variant="outline" className="border-accent text-accent text-xs mt-1">
                              {entry.category.replace('-', ' ')}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="line-clamp-2">
                          {entry.shortDescription}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredEntries.length === 0 && (
                  <Card className="bg-card border-border shadow-cosmic">
                    <CardContent className="text-center py-12">
                      <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-semibold mb-2">No topics found</h3>
                      <p className="text-muted-foreground">
                        Try adjusting your search terms or category filter.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpaceEncyclopedia;