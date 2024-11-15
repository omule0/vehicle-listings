'use client';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function VehicleCard({ vehicle, onClick }) {
  return (
    <Card 
      onClick={() => onClick(vehicle)}
      className="hover:shadow-lg transition-shadow cursor-pointer"
    >
      <CardHeader>
        <h2 className="text-xl font-semibold">{vehicle.main_category}</h2>
        <p className="text-2xl font-bold text-primary">{vehicle.current_price}</p>
      </CardHeader>
      
      <CardContent className="space-y-2">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">Year</p>
            <p className="font-medium">{vehicle.pickup_specs.Year}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Mileage</p>
            <p className="font-medium">{vehicle.pickup_specs.Mileage}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Engine</p>
            <p className="font-medium">{vehicle.pickup_specs.Engine}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Transmission</p>
            <p className="font-medium">{vehicle.pickup_specs.Trans}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <div className="flex flex-wrap gap-2">
          {vehicle.included_features.slice(0, 3).map((feature, index) => (
            <Badge key={index} variant="secondary">
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