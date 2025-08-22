import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Users, Calendar, Flag, Award, Rocket, Globe } from "lucide-react";

interface Astronaut {
  id: string;
  name: string;
  country: string;
  missions: string[];
  totalDays: number;
  firstFlight: string;
  status: "active" | "retired" | "deceased";
  achievements: string[];
  biography: string;
  image: string;
  agency: string;
}

const astronautData: Astronaut[] = [
  {
    id: "neil-armstrong",
    name: "Neil Armstrong",
    country: "United States",
    missions: ["Gemini 8", "Apollo 11"],
    totalDays: 8,
    firstFlight: "1966-03-16",
    status: "deceased",
    achievements: [
      "First person to walk on the Moon",
      "Commander of Apollo 11",
      "Naval aviator and test pilot",
      "Purdue University alumnus"
    ],
    biography: "Neil Alden Armstrong was an American astronaut and aeronautical engineer who was the first person to walk on the Moon. He was also a naval aviator, test pilot, and university professor.",
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300",
    agency: "NASA"
  },
  {
    id: "yuri-gagarin",
    name: "Yuri Gagarin",
    country: "Soviet Union",
    missions: ["Vostok 1"],
    totalDays: 1,
    firstFlight: "1961-04-12",
    status: "deceased",
    achievements: [
      "First human in space",
      "First to orbit Earth",
      "Hero of the Soviet Union",
      "Test pilot"
    ],
    biography: "Yuri Alexeyevich Gagarin was a Soviet pilot and cosmonaut who became the first human to journey into outer space, achieving a major milestone in the Space Race.",
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300",
    agency: "Roscosmos"
  },
  {
    id: "mae-jemison",
    name: "Mae Jemison",
    country: "United States",
    missions: ["STS-47"],
    totalDays: 8,
    firstFlight: "1992-09-12",
    status: "retired",
    achievements: [
      "First African American woman in space",
      "Medical doctor and engineer",
      "Peace Corps volunteer",
      "Dancer and actress"
    ],
    biography: "Mae Carol Jemison is an American engineer, physician, and former NASA astronaut. She became the first African American woman to travel into space when she served as a mission specialist aboard the Space Shuttle Endeavour.",
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300",
    agency: "NASA"
  },
  {
    id: "chris-hadfield",
    name: "Chris Hadfield",
    country: "Canada",
    missions: ["STS-74", "STS-100", "Expedition 34/35"],
    totalDays: 166,
    firstFlight: "1995-11-12",
    status: "retired",
    achievements: [
      "First Canadian to walk in space",
      "ISS Commander",
      "Social media pioneer in space",
      "Musician and author"
    ],
    biography: "Chris Austin Hadfield is a retired Canadian astronaut, engineer, and former Royal Canadian Air Force fighter pilot. He was the first Canadian to walk in space and served as commander of the International Space Station.",
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300",
    agency: "CSA"
  },
  {
    id: "peggy-whitson",
    name: "Peggy Whitson",
    country: "United States",
    missions: ["Expedition 5", "Expedition 16", "Expedition 50/51"],
    totalDays: 665,
    firstFlight: "2002-06-05",
    status: "active",
    achievements: [
      "Most time in space by any woman",
      "Oldest woman to fly in space",
      "First female ISS commander",
      "Biochemist and researcher"
    ],
    biography: "Peggy Annette Whitson is an American biochemistry researcher, retired NASA astronaut, and former NASA Chief Astronaut. She holds the record for most time in space by any woman and any American.",
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300",
    agency: "NASA"
  },
  {
    id: "tim-peake",
    name: "Tim Peake",
    country: "United Kingdom",
    missions: ["Expedition 46/47"],
    totalDays: 186,
    firstFlight: "2015-12-15",
    status: "active",
    achievements: [
      "First British ESA astronaut",
      "Army Air Corps officer",
      "London Marathon runner in space",
      "Science communicator"
    ],
    biography: "Timothy Nigel Peake is a British former Army Air Corps officer and current European Space Agency astronaut. He is the first British citizen to visit the International Space Station.",
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300",
    agency: "ESA"
  }
];

const AstronautDatabase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedAstronaut, setSelectedAstronaut] = useState<Astronaut | null>(null);

  const statusOptions = [
    { id: "all", name: "All Astronauts", count: astronautData.length },
    { id: "active", name: "Active", count: astronautData.filter(a => a.status === "active").length },
    { id: "retired", name: "Retired", count: astronautData.filter(a => a.status === "retired").length },
    { id: "deceased", name: "Deceased", count: astronautData.filter(a => a.status === "deceased").length }
  ];

  const filteredAstronauts = astronautData.filter(astronaut => {
    const matchesSearch = astronaut.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         astronaut.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         astronaut.agency.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || astronaut.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "retired": return "bg-blue-500";
      case "deceased": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": return "border-green-500 text-green-500";
      case "retired": return "border-blue-500 text-blue-500";
      case "deceased": return "border-gray-500 text-gray-500";
      default: return "border-gray-500 text-gray-500";
    }
  };

  return (
    <section id="astronauts" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-cosmic bg-clip-text text-transparent">
            Astronaut Database
          </h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Explore the heroes who dared to venture beyond Earth's atmosphere
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters and Stats */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-border shadow-cosmic sticky top-20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Astronauts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search astronauts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Status Filter */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                    Status
                  </h3>
                  {statusOptions.map((option) => (
                    <Button
                      key={option.id}
                      variant={selectedStatus === option.id ? "default" : "ghost"}
                      className="w-full justify-between text-sm"
                      onClick={() => setSelectedStatus(option.id)}
                    >
                      <span className="capitalize">{option.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {option.count}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            {selectedAstronaut ? (
              // Detailed View
              <Card className="bg-card border-border shadow-cosmic">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={selectedAstronaut.image}
                        alt={selectedAstronaut.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300";
                        }}
                      />
                      <div>
                        <CardTitle className="text-2xl">{selectedAstronaut.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Flag className="h-4 w-4" />
                          <span>{selectedAstronaut.country}</span>
                          <Badge variant="outline" className={getStatusBadge(selectedAstronaut.status)}>
                            {selectedAstronaut.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" onClick={() => setSelectedAstronaut(null)}>
                      Back to List
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <p className="text-lg text-foreground/90 leading-relaxed">
                    {selectedAstronaut.biography}
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-muted/30 p-4 rounded-lg text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Rocket className="h-4 w-4 text-accent" />
                        <span className="text-sm font-medium text-muted-foreground">Missions</span>
                      </div>
                      <p className="font-bold text-lg text-foreground">{selectedAstronaut.missions.length}</p>
                    </div>

                    <div className="bg-muted/30 p-4 rounded-lg text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-accent" />
                        <span className="text-sm font-medium text-muted-foreground">Days in Space</span>
                      </div>
                      <p className="font-bold text-lg text-foreground">{selectedAstronaut.totalDays}</p>
                    </div>

                    <div className="bg-muted/30 p-4 rounded-lg text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Globe className="h-4 w-4 text-accent" />
                        <span className="text-sm font-medium text-muted-foreground">Agency</span>
                      </div>
                      <p className="font-bold text-lg text-foreground">{selectedAstronaut.agency}</p>
                    </div>

                    <div className="bg-muted/30 p-4 rounded-lg text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Rocket className="h-4 w-4 text-accent" />
                        <span className="text-sm font-medium text-muted-foreground">First Flight</span>
                      </div>
                      <p className="font-bold text-lg text-foreground">
                        {new Date(selectedAstronaut.firstFlight).getFullYear()}
                      </p>
                    </div>
                  </div>

                  {/* Missions */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Rocket className="h-5 w-5 text-primary" />
                      Missions
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedAstronaut.missions.map((mission, index) => (
                        <Badge key={index} variant="outline" className="border-primary text-primary">
                          {mission}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      Key Achievements
                    </h3>
                    <ul className="space-y-3">
                      {selectedAstronaut.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-foreground/90">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ) : (
              // List View
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">
                    {filteredAstronauts.length} {filteredAstronauts.length === 1 ? 'Astronaut' : 'Astronauts'} Found
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredAstronauts.map((astronaut) => (
                    <Card
                      key={astronaut.id}
                      className="bg-card border-border shadow-cosmic hover:shadow-stellar transition-all duration-300 cursor-pointer group"
                      onClick={() => setSelectedAstronaut(astronaut)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img
                              src={astronaut.image}
                              alt={astronaut.name}
                              className="w-12 h-12 rounded-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300";
                              }}
                            />
                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${getStatusColor(astronaut.status)} border-2 border-background`} />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg group-hover:text-primary transition-colors">
                              {astronaut.name}
                            </CardTitle>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Flag className="h-3 w-3" />
                              <span>{astronaut.country}</span>
                              <span>•</span>
                              <span>{astronaut.agency}</span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Rocket className="h-3 w-3" />
                              {astronaut.missions.length} missions
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {astronaut.totalDays} days
                            </span>
                          </div>
                          <Badge variant="outline" className={getStatusBadge(astronaut.status)}>
                            {astronaut.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredAstronauts.length === 0 && (
                  <Card className="bg-card border-border shadow-cosmic">
                    <CardContent className="text-center py-12">
                      <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-semibold mb-2">No astronauts found</h3>
                      <p className="text-muted-foreground">
                        Try adjusting your search terms or status filter.
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

export default AstronautDatabase;