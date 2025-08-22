import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ExternalLink, Star } from "lucide-react";

interface APODData {
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  date: string;
  media_type: string;
  copyright?: string;
}

const NasaAPOD = () => {
  const [apodData, setApodData] = useState<APODData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        // Using NASA's APOD API (you can add API key if needed)
        const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
        if (!response.ok) {
          throw new Error('Failed to fetch APOD data');
        }
        const data = await response.json();
        setApodData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        // Fallback data for demo
        setApodData({
          title: "Cosmic Wonder",
          explanation: "Explore the magnificent beauty of space through NASA's Astronomy Picture of the Day. This stunning cosmic view showcases the infinite wonders of our universe, from distant galaxies to nebulae painted across the celestial canvas.",
          url: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800",
          date: new Date().toISOString().split('T')[0],
          media_type: "image"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAPOD();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse">
        <Card className="bg-card border-border shadow-cosmic">
          <CardHeader>
            <div className="h-6 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/6"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!apodData) {
    return (
      <Card className="bg-card border-border shadow-cosmic">
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">Failed to load Astronomy Picture of the Day</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-border shadow-cosmic hover:shadow-stellar transition-all duration-300 group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-2xl bg-gradient-cosmic bg-clip-text text-transparent group-hover:scale-[1.02] transition-transform">
              {apodData.title}
            </CardTitle>
            <CardDescription className="flex items-center gap-2 mt-2">
              <Calendar className="h-4 w-4" />
              {new Date(apodData.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            <Star className="h-3 w-3 mr-1" />
            NASA APOD
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {apodData.media_type === 'image' && (
          <div className="relative overflow-hidden rounded-lg group">
            <img
              src={apodData.url}
              alt={apodData.title}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}
        
        <p className="text-foreground/90 leading-relaxed">
          {apodData.explanation}
        </p>
        
        {apodData.copyright && (
          <p className="text-sm text-muted-foreground">
            © {apodData.copyright}
          </p>
        )}
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-accent text-accent hover:bg-accent/10"
            asChild
          >
            <a href={apodData.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Full Image
            </a>
          </Button>
          {apodData.hdurl && (
            <Button
              variant="outline"
              size="sm"
              className="border-primary text-primary hover:bg-primary/10"
              asChild
            >
              <a href={apodData.hdurl} target="_blank" rel="noopener noreferrer">
                HD Version
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NasaAPOD;