import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rocket, Satellite, Users, Globe, Zap, Star } from "lucide-react";

const timelineEvents = [
  {
    year: "1957",
    title: "Sputnik 1 Launch",
    description: "Soviet Union launches first artificial satellite, beginning the Space Age.",
    icon: Satellite,
    category: "Milestone",
    color: "bg-primary"
  },
  {
    year: "1961",
    title: "First Human in Space",
    description: "Yuri Gagarin becomes the first human to orbit Earth aboard Vostok 1.",
    icon: Users,
    category: "Achievement",
    color: "bg-accent"
  },
  {
    year: "1969",
    title: "Moon Landing",
    description: "Apollo 11 successfully lands on the Moon. Neil Armstrong takes first steps.",
    icon: Rocket,
    category: "Historic",
    color: "bg-primary"
  },
  {
    year: "1973",
    title: "Skylab Space Station",
    description: "America's first space station launches, advancing long-duration spaceflight.",
    icon: Globe,
    category: "Station",
    color: "bg-secondary"
  },
  {
    year: "1981",
    title: "Space Shuttle Era",
    description: "First Space Shuttle mission (STS-1) marks beginning of reusable spacecraft.",
    icon: Rocket,
    category: "Innovation",
    color: "bg-accent"
  },
  {
    year: "1990",
    title: "Hubble Space Telescope",
    description: "Revolutionary space telescope launches, transforming our view of the universe.",
    icon: Star,
    category: "Science",
    color: "bg-primary"
  },
  {
    year: "1998",
    title: "International Space Station",
    description: "Construction begins on humanity's greatest collaborative space project.",
    icon: Globe,
    category: "Collaboration",
    color: "bg-secondary"
  },
  {
    year: "2012",
    title: "SpaceX Dragon Success",
    description: "First commercial spacecraft to dock with ISS, opening new era of space commerce.",
    icon: Rocket,
    category: "Commercial",
    color: "bg-accent"
  },
  {
    year: "2020",
    title: "Crew Dragon Demo-2",
    description: "SpaceX successfully transports astronauts to ISS, ending US dependence on Russia.",
    icon: Users,
    category: "Independence",
    color: "bg-primary"
  },
  {
    year: "2021",
    title: "Mars Perseverance",
    description: "Advanced rover lands on Mars, searching for signs of ancient microbial life.",
    icon: Zap,
    category: "Exploration",
    color: "bg-accent"
  }
];

const SpaceTimeline = () => {
  return (
    <section id="timeline" className="py-20 bg-gradient-stellar">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-aurora bg-clip-text text-transparent">
            Space Exploration Timeline
          </h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Journey through the key moments that shaped humanity's quest to explore the cosmos
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-cosmic"></div>

          <div className="space-y-8">
            {timelineEvents.map((event, index) => (
              <div
                key={event.year}
                className={`flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                } gap-8`}
              >
                {/* Content Card */}
                <div className="flex-1 max-w-md">
                  <Card className="bg-card/80 backdrop-blur-sm border-border shadow-cosmic hover:shadow-stellar transition-all duration-300 group">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${event.color}`}>
                            <event.icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg group-hover:text-primary transition-colors">
                              {event.title}
                            </CardTitle>
                            <CardDescription className="text-sm font-semibold text-accent">
                              {event.year}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-primary/30 text-primary">
                          {event.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground/90 leading-relaxed">
                        {event.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline Node */}
                <div className="relative">
                  <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-glow-primary"></div>
                  <div className="absolute inset-0 w-4 h-4 bg-primary rounded-full animate-ping opacity-30"></div>
                </div>

                {/* Spacer for opposite side */}
                <div className="flex-1 max-w-md"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpaceTimeline;