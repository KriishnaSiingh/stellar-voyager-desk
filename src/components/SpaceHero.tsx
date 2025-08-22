import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import spaceHeroImage from "@/assets/space-hero.jpg";

const SpaceHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${spaceHeroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-stellar opacity-60" />
      </div>

      {/* Animated Stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-aurora bg-clip-text text-transparent">
          Explore the Cosmos
        </h1>
        <p className="text-xl lg:text-2xl text-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          Journey through space with real NASA data, discover celestial wonders, 
          and explore the infinite beauty of our universe.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary-glow text-primary-foreground shadow-glow-primary hover:shadow-stellar transition-all duration-300 group"
          >
            Start Exploring
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="border-accent text-accent hover:bg-accent/10 shadow-glow-accent transition-all duration-300 group"
          >
            <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            Watch Journey
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-foreground/30 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpaceHero;