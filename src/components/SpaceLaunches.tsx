import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Rocket, ExternalLink, CheckCircle, AlertCircle } from "lucide-react";

interface Launch {
  id: string;
  name: string;
  date: string;
  status: "scheduled" | "success" | "failed" | "in-progress";
  agency: string;
  location: string;
  mission: string;
  description: string;
  image: string;
  rocket: string;
}

const launchData: Launch[] = [
  {
    id: "artemis-3",
    name: "Artemis 3",
    date: "2026-12-01T00:00:00Z",
    status: "scheduled",
    agency: "NASA",
    location: "Kennedy Space Center, FL",
    mission: "Lunar Landing",
    description: "NASA's ambitious mission to return humans to the Moon's surface for the first time since Apollo 17.",
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=600",
    rocket: "Space Launch System"
  },
  {
    id: "europa-clipper",
    name: "Europa Clipper",
    date: "2024-10-14T00:00:00Z",
    status: "success",
    agency: "NASA",
    location: "Kennedy Space Center, FL",
    mission: "Jupiter's Moon Europa",
    description: "Mission to study Jupiter's moon Europa and its subsurface ocean that may harbor conditions suitable for life.",
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=600",
    rocket: "Falcon Heavy"
  },
  {
    id: "starship-ihm",
    name: "Starship IFT-5",
    date: "2024-10-13T00:00:00Z",
    status: "success",
    agency: "SpaceX",
    location: "Starbase, TX",
    mission: "Integrated Flight Test",
    description: "Fifth integrated flight test of SpaceX's Starship, featuring the first successful booster catch.",
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=600",
    rocket: "Starship"
  },
  {
    id: "crew-8",
    name: "Crew-8 Mission",
    date: "2024-03-03T00:00:00Z",
    status: "success",
    agency: "SpaceX",
    location: "Kennedy Space Center, FL",
    mission: "ISS Crew Transport",
    description: "Eighth operational crew mission to the International Space Station as part of NASA's Commercial Crew Program.",
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=600",
    rocket: "Falcon 9"
  },
  {
    id: "juice",
    name: "JUICE Mission",
    date: "2023-04-14T00:00:00Z",
    status: "success",
    agency: "ESA",
    location: "French Guiana",
    mission: "Jupiter System",
    description: "Jupiter Icy Moons Explorer mission to study three of Jupiter's largest moons: Ganymede, Callisto, and Europa.",
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=600",
    rocket: "Ariane 5"
  },
  {
    id: "psyche",
    name: "Psyche Mission",
    date: "2023-10-13T00:00:00Z",
    status: "success",
    agency: "NASA",
    location: "Kennedy Space Center, FL",
    mission: "Asteroid Psyche",
    description: "Mission to study the metallic asteroid Psyche, which may be the exposed core of an early planet.",
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=600",
    rocket: "Falcon Heavy"
  }
];

const SpaceLaunches = () => {
  const [selectedTab, setSelectedTab] = useState("upcoming");

  const filterLaunches = (filter: string) => {
    const now = new Date();
    switch (filter) {
      case "upcoming":
        return launchData.filter(launch => new Date(launch.date) > now);
      case "recent":
        return launchData.filter(launch => new Date(launch.date) <= now).slice(0, 6);
      case "all":
        return launchData;
      default:
        return launchData;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Calendar className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "border-green-500 text-green-500";
      case "failed":
        return "border-red-500 text-red-500";
      case "in-progress":
        return "border-yellow-500 text-yellow-500";
      default:
        return "border-blue-500 text-blue-500";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  const getTimeUntilLaunch = (dateString: string) => {
    const now = new Date();
    const launchDate = new Date(dateString);
    const diffTime = launchDate.getTime() - now.getTime();
    
    if (diffTime < 0) return "Launched";
    
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 1) return "1 day";
    if (diffDays < 30) return `${diffDays} days`;
    
    const diffMonths = Math.ceil(diffDays / 30);
    if (diffMonths === 1) return "1 month";
    if (diffMonths < 12) return `${diffMonths} months`;
    
    const diffYears = Math.ceil(diffMonths / 12);
    return diffYears === 1 ? "1 year" : `${diffYears} years`;
  };

  return (
    <section className="py-20 bg-gradient-stellar">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-aurora bg-clip-text text-transparent">
            Space Launch Tracker
          </h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Track upcoming missions and celebrate recent achievements in space exploration
          </p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="all">All Missions</TabsTrigger>
          </TabsList>

          {["upcoming", "recent", "all"].map((tab) => (
            <TabsContent key={tab} value={tab}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterLaunches(tab).map((launch) => (
                  <Card
                    key={launch.id}
                    className="bg-card/80 backdrop-blur-sm border-border shadow-cosmic hover:shadow-stellar transition-all duration-300 group overflow-hidden"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={launch.image}
                        alt={launch.name}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=600";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                        {launch.agency}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`absolute top-3 right-3 bg-background/80 ${getStatusColor(launch.status)}`}
                      >
                        {getStatusIcon(launch.status)}
                        <span className="ml-1 capitalize">{launch.status}</span>
                      </Badge>
                    </div>
                    
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-1">
                        {launch.name}
                      </CardTitle>
                      <CardDescription className="line-clamp-1">
                        {launch.mission}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <p className="text-sm text-foreground/80 line-clamp-2">
                        {launch.description}
                      </p>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3 text-accent" />
                          <span className="text-muted-foreground">
                            {formatDate(launch.date).split(',')[0]}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3 text-accent" />
                          <span className="text-muted-foreground line-clamp-1">
                            {launch.location}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Rocket className="h-3 w-3 text-accent" />
                          <span className="text-muted-foreground">
                            {launch.rocket}
                          </span>
                        </div>
                        
                        {launch.status === "scheduled" && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3 text-primary" />
                            <span className="text-primary font-medium">
                              T-{getTimeUntilLaunch(launch.date)}
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filterLaunches(tab).length === 0 && (
                <Card className="bg-card border-border shadow-cosmic">
                  <CardContent className="text-center py-12">
                    <Rocket className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">No launches found</h3>
                    <p className="text-muted-foreground">
                      Check back later for more space missions.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          ))}
        </Tabs>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary-glow text-primary-foreground shadow-glow-primary hover:shadow-stellar transition-all duration-300"
            asChild
          >
            <a href="https://launchlibrary.net/" target="_blank" rel="noopener noreferrer">
              View More Launches
              <ExternalLink className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SpaceLaunches;