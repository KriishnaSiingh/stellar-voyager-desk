import SpaceNavigation from "@/components/SpaceNavigation";
import SpaceHero from "@/components/SpaceHero";
import NasaAPOD from "@/components/NasaAPOD";
import MarsRoverData from "@/components/MarsRoverData";
import SpaceTimeline from "@/components/SpaceTimeline";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SpaceNavigation />
      <SpaceHero />
      
      {/* NASA APOD Section */}
      <section id="explore" className="py-20 bg-gradient-nebula">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-aurora bg-clip-text text-transparent">
              Today's Cosmic Wonder
            </h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              Discover the universe through NASA's Astronomy Picture of the Day
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <NasaAPOD />
          </div>
        </div>
      </section>

      <MarsRoverData />
      <SpaceTimeline />

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-cosmic rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">CE</span>
              </div>
              <span className="text-xl font-bold bg-gradient-aurora bg-clip-text text-transparent">
                CosmosExplorer
              </span>
            </div>
            <p className="text-muted-foreground mb-4">
              Bringing the wonders of space exploration to everyone
            </p>
            <p className="text-sm text-muted-foreground">
              Data provided by NASA APIs • Built with cosmic passion
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;