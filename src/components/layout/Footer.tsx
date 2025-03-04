
import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Travelify</h4>
            <p className="text-muted-foreground">
              Create personalized travel itineraries based on your preferences.
            </p>
          </div>
          
          <div>
            <h5 className="font-medium mb-4">Links</h5>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'Plan a Trip', path: '/planner' },
                { name: 'Saved Itineraries', path: '/itineraries' },
              ].map(item => (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h5 className="font-medium mb-4">Resources</h5>
            <ul className="space-y-2">
              {[
                { name: 'Travel Tips', path: '#' },
                { name: 'Destinations', path: '#' },
                { name: 'FAQ', path: '#' },
              ].map(item => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h5 className="font-medium mb-4">Legal</h5>
            <ul className="space-y-2">
              {[
                { name: 'Privacy Policy', path: '#' },
                { name: 'Terms of Service', path: '#' },
                { name: 'Cookie Policy', path: '#' },
              ].map(item => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Travelify. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {[
              { name: 'Twitter', href: '#' },
              { name: 'Instagram', href: '#' },
              { name: 'Facebook', href: '#' },
            ].map(social => (
              <a 
                key={social.name}
                href={social.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
