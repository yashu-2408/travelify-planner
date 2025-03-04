
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-10",
        isScrolled || !isHomePage 
          ? "py-3 bg-background/80 backdrop-blur-md border-b border-border shadow-sm" 
          : "py-6 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-semibold tracking-tight text-foreground flex items-center gap-2 transition-transform hover:scale-[1.02]"
        >
          <span className="text-travel-600">Travelify</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-1">
          {[
            { name: 'Home', path: '/' },
            { name: 'New Trip', path: '/planner' },
            { name: 'Itineraries', path: '/itineraries' },
          ].map(item => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={location.pathname === item.path ? "secondary" : "ghost"}
                className="text-base"
              >
                {item.name}
              </Button>
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-2">
          <Link to="/planner">
            <Button 
              className="shadow-sm"
              variant={location.pathname === '/planner' ? "secondary" : "default"}
            >
              Plan a Trip
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
