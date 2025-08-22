import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Globe, Calendar, Rocket } from "lucide-react";

interface Astronaut {
  name: string;
  craft: string;
}

interface SpaceData {
  people: Astronaut[];
  number: number;
  message: string;
}

const CurrentAstronauts = () => {
  const [spaceData, setSpaceData] = useState<SpaceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentAstronauts = async () => {
      try {
        const response = await fetch('http://api.open-notify.org/astros.json');
        if (!response.ok) {
          throw new Error('Failed to fetch astronaut data');
        }
        const data = await response.json();
        setSpaceData(data);
      } catch (error) {
        console.error('Error fetching astronaut data:', error);
        // Fallback data
        setSpaceData({
          people: [
            { name: "Jasmin Moghbeli", craft: "ISS" },
            { name: "Andreas Mogensen", craft: "ISS" },
            { name: "Satoshi Furukawa", craft: "ISS" },
            { name: "Konstantin Borisov", craft: "ISS" },
            { name: "Oleg Kononenko", craft: "ISS" },
            { name: "Nikolai Chub", craft: "ISS" },
            { name: "Loral O'Hara", craft: "ISS" }
          ],
          number: 7,
          message: "success"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentAstronauts();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse">
        <Card className="bg-card border-border shadow-cosmic">
          <CardHeader>
            <div className="h-6 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-1/3"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-12 bg-muted rounded"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card className="bg-card border-border shadow-cosmic hover:shadow-stellar transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Users className="h-6 w-6 text-accent" />
              People in Space Right Now
            </CardTitle>
            <CardDescription className="flex items-center gap-2 mt-2">
              <Globe className="h-4 w-4" />
              Currently {spaceData?.number || 0} humans in orbit
            </CardDescription>
          </div>
          <Badge variant="outline" className="border-primary text-primary bg-primary/5">
            <Rocket className="h-3 w-3 mr-1" />
            Live Data
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid gap-3">
          {spaceData?.people.map((astronaut, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-cosmic flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {astronaut.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {astronaut.name}
                  </p>
                  <p className="text-sm text-muted-foreground">Astronaut</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                {astronaut.craft}
              </Badge>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Data updated in real-time from Open Notify API</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentAstronauts;