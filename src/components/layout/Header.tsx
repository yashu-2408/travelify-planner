
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, profile, signOut, loading } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';
  
  const handleSignOut = async () => {
    await signOut();
  };

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
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
        
        <div className="flex items-center gap-3">
          {!loading && !user ? (
            <Link to="/auth">
              <Button 
                variant="secondary"
                className="shadow-sm"
              >
                Sign In
              </Button>
            </Link>
          ) : !loading && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarImage src={profile?.avatar_url || ""} />
                    <AvatarFallback>{getInitials(profile?.full_name || user?.email)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="px-2 py-1.5 text-sm font-medium">
                  {profile?.full_name || user?.email}
                </div>
                <DropdownMenuSeparator />
                <Link to="/planner">
                  <DropdownMenuItem>Plan a Trip</DropdownMenuItem>
                </Link>
                <Link to="/itineraries">
                  <DropdownMenuItem>My Itineraries</DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
          
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
