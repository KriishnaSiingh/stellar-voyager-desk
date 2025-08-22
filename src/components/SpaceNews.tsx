import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, Clock, Newspaper } from "lucide-react";

interface NewsArticle {
  id: number;
  title: string;
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
  featured?: boolean;
}

const SpaceNews = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpaceNews = async () => {
      try {
        const response = await fetch('https://api.spaceflightnewsapi.net/v4/articles/?limit=12');
        if (!response.ok) {
          throw new Error('Failed to fetch space news');
        }
        const data = await response.json();
        setNews(data.results || []);
      } catch (error) {
        console.error('Error fetching space news:', error);
        // Fallback news data
        setNews([
          {
            id: 1,
            title: "NASA's Artemis Mission Makes Historic Progress",
            url: "#",
            image_url: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=600",
            news_site: "NASA",
            summary: "The Artemis program continues to advance with new milestones in lunar exploration technology and astronaut training programs.",
            published_at: new Date().toISOString(),
            featured: true
          },
          {
            id: 2,
            title: "Mars Sample Return Mission Updates",
            url: "#",
            image_url: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=600",
            news_site: "ESA",
            summary: "European Space Agency collaborates with NASA on the ambitious mission to bring Martian samples back to Earth.",
            published_at: new Date(Date.now() - 86400000).toISOString()
          },
          {
            id: 3,
            title: "James Webb Telescope Discovers New Exoplanets",
            url: "#",
            image_url: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=600",
            news_site: "Space Telescope Science Institute",
            summary: "Revolutionary observations reveal potentially habitable worlds in distant star systems.",
            published_at: new Date(Date.now() - 172800000).toISOString()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchSpaceNews();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-muted rounded w-1/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-80 bg-muted rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section id="articles" className="py-20 bg-gradient-nebula">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-aurora bg-clip-text text-transparent">
            Latest Space News
          </h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Stay updated with the latest discoveries, missions, and breakthroughs in space exploration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.slice(0, 9).map((article) => (
            <Card
              key={article.id}
              className="bg-card/80 backdrop-blur-sm border-border shadow-cosmic hover:shadow-stellar transition-all duration-300 group overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=600";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                {article.featured && (
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                    <Newspaper className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="border-accent text-accent text-xs">
                    {article.news_site}
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDate(article.published_at)}
                  </div>
                </div>
                <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-0">
                <CardDescription className="line-clamp-3 mb-4">
                  {article.summary}
                </CardDescription>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-primary text-primary hover:bg-primary/10 group"
                  asChild
                >
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    Read Full Article
                    <ExternalLink className="h-3 w-3 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary-glow text-primary-foreground shadow-glow-primary hover:shadow-stellar transition-all duration-300"
            asChild
          >
            <a href="https://spaceflightnewsapi.net/" target="_blank" rel="noopener noreferrer">
              View More Space News
              <ExternalLink className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SpaceNews;