import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Camera, MapPin, Activity } from "lucide-react";

interface RoverPhoto {
  id: number;
  img_src: string;
  earth_date: string;
  camera: {
    name: string;
    full_name: string;
  };
  rover: {
    name: string;
    status: string;
    landing_date: string;
    max_date: string;
  };
}

interface RoverData {
  photos: RoverPhoto[];
}

const MarsRoverData = () => {
  const [roverData, setRoverData] = useState<RoverData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedRover, setSelectedRover] = useState("curiosity");

  const rovers = [
    { id: "curiosity", name: "Curiosity", color: "bg-primary" },
    { id: "opportunity", name: "Opportunity", color: "bg-accent" },
    { id: "spirit", name: "Spirit", color: "bg-secondary" }
  ];

  useEffect(() => {
    const fetchRoverData = async () => {
      setLoading(true);
      try {
        // Using NASA Mars Rover Photos API
        const response = await fetch(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/${selectedRover}/photos?sol=1000&api_key=DEMO_KEY`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch rover data');
        }
        
        const data = await response.json();
        setRoverData(data);
      } catch (error) {
        console.error('Error fetching rover data:', error);
        // Fallback data for demo
        setRoverData({
          photos: [
            {
              id: 1,
              img_src: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=600",
              earth_date: "2024-01-15",
              camera: {
                name: "MAST",
                full_name: "Mast Camera"
              },
              rover: {
                name: selectedRover.charAt(0).toUpperCase() + selectedRover.slice(1),
                status: "active",
                landing_date: "2012-08-05",
                max_date: "2024-01-15"
              }
            },
            {
              id: 2,
              img_src: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=600",
              earth_date: "2024-01-14",
              camera: {
                name: "NAVCAM",
                full_name: "Navigation Camera"
              },
              rover: {
                name: selectedRover.charAt(0).toUpperCase() + selectedRover.slice(1),
                status: "active",
                landing_date: "2012-08-05",
                max_date: "2024-01-15"
              }
            }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRoverData();
  }, [selectedRover]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-muted rounded w-1/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-muted rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section id="missions" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-cosmic bg-clip-text text-transparent">
            Mars Rover Missions
          </h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Explore the Red Planet through the eyes of NASA's robotic explorers
          </p>
        </div>

        <Tabs value={selectedRover} onValueChange={setSelectedRover} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            {rovers.map((rover) => (
              <TabsTrigger key={rover.id} value={rover.id} className="capitalize">
                {rover.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {rovers.map((rover) => (
            <TabsContent key={rover.id} value={rover.id}>
              {roverData && roverData.photos.length > 0 && (
                <div className="mb-8">
                  <Card className="bg-card border-border shadow-cosmic">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-2xl capitalize">
                            {rover.name} Rover
                          </CardTitle>
                          <CardDescription className="flex items-center gap-4 mt-2">
                            <span className="flex items-center gap-1">
                              <Activity className="h-4 w-4" />
                              Status: {roverData.photos[0]?.rover.status || 'Active'}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Landing: {new Date(roverData.photos[0]?.rover.landing_date || '').toLocaleDateString()}
                            </span>
                          </CardDescription>
                        </div>
                        <Badge className={`${rover.color} text-white`}>
                          <MapPin className="h-3 w-3 mr-1" />
                          Mars
                        </Badge>
                      </div>
                    </CardHeader>
                  </Card>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roverData?.photos.slice(0, 6).map((photo) => (
                  <Card key={photo.id} className="bg-card border-border shadow-cosmic hover:shadow-stellar transition-all duration-300 group overflow-hidden">
                    <div className="relative overflow-hidden">
                      <img
                        src={photo.img_src}
                        alt={`Mars photo from ${photo.camera.full_name}`}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=600";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="border-accent text-accent">
                          <Camera className="h-3 w-3 mr-1" />
                          {photo.camera.name}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(photo.earth_date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-foreground/80">
                        {photo.camera.full_name}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {roverData?.photos.length === 0 && (
                <Card className="bg-card border-border shadow-cosmic">
                  <CardContent className="text-center py-8">
                    <p className="text-muted-foreground">
                      No photos available for {rover.name} rover at the moment.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default MarsRoverData;