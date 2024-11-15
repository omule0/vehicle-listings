'use client';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, Gauge, Settings2, Fuel } from "lucide-react";

export default function VehicleCard({ vehicle, onClick }) {
  return (
    <Card 
      onClick={() => onClick(vehicle)}
      className="hover:shadow-lg transition-shadow cursor-pointer relative border-muted"
    >
      <a 
        href={vehicle.url}
        className="absolute top-2 right-2 text-muted-foreground hover:text-primary"
        onClick={(e) => e.stopPropagation()}
        target="_blank"
        rel="noopener noreferrer"
      >
        <ExternalLink className="h-4 w-4" />
      </a>

      <CardHeader>
        <h2 className="text-xl font-semibold">{vehicle.main_category}</h2>
        <p className="text-2xl font-bold text-primary">{vehicle.current_price}</p>
      </CardHeader>
      
      <CardContent className="space-y-2">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground flex items-center gap-1">
              <Calendar className="h-4 w-4" /> Year
            </p>
            <p className="font-medium">{vehicle.pickup_specs.Year}</p>
          </div>
          <div>
            <p className="text-muted-foreground flex items-center gap-1">
              <Gauge className="h-4 w-4" /> Mileage
            </p>
            <p className="font-medium">{vehicle.pickup_specs.Mileage}</p>
          </div>
          <div>
            <p className="text-muted-foreground flex items-center gap-1">
              <Settings2 className="h-4 w-4" /> Engine
            </p>
            <p className="font-medium">{vehicle.pickup_specs.Engine}</p>
          </div>
          <div>
            <p className="text-muted-foreground flex items-center gap-1">
              <Settings2 className="h-4 w-4" /> Transmission
            </p>
            <p className="font-medium">{vehicle.pickup_specs["Trans."]}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <div className="flex flex-wrap gap-2">
          {vehicle.included_features.slice(0, 3).map((feature, index) => (
            <Badge 
              key={index} 
              variant="outline"
              className="bg-white text-secondary border-secondary hover:bg-secondary/10"
            >
              {feature}
            </Badge>
          ))}
          {vehicle.included_features.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{vehicle.included_features.length - 3} more
            </span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}