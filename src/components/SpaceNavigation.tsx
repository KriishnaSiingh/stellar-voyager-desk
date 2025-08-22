import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Rocket, Globe, Users, Calendar, BookOpen, Database } from "lucide-react";

const SpaceNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Explore", icon: Globe, href: "#explore" },
    { name: "Missions", icon: Rocket, href: "#missions" },
    { name: "Timeline", icon: Calendar, href: "#timeline" },
    { name: "Astronauts", icon: Users, href: "#astronauts" },
    { name: "Articles", icon: BookOpen, href: "#articles" },
    { name: "Data", icon: Database, href: "#data" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-card/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Rocket className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-aurora bg-clip-text text-transparent">
              CosmosExplorer
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className="hover:bg-primary/10 hover:text-primary transition-colors"
                asChild
              >
                <a href={item.href} className="flex items-center space-x-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </a>
              </Button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="justify-start hover:bg-primary/10 hover:text-primary"
                  onClick={() => setIsOpen(false)}
                  asChild
                >
                  <a href={item.href} className="flex items-center space-x-2">
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </a>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default SpaceNavigation;