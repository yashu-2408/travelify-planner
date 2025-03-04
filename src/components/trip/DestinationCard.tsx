
import { cn } from "@/lib/utils";

interface DestinationCardProps {
  title: string;
  image: string;
  description: string;
  onClick?: () => void;
  className?: string;
}

export function DestinationCard({
  title,
  image,
  description,
  onClick,
  className,
}: DestinationCardProps) {
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-lg group cursor-pointer card-hover",
        className
      )}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
      
      <img
        src={image}
        alt={title}
        className="object-cover w-full h-80 transition-transform duration-500 group-hover:scale-105"
      />
      
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform transition-transform duration-300">
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <p className="mt-2 text-white/90 line-clamp-2">{description}</p>
      </div>
    </div>
  );
}
