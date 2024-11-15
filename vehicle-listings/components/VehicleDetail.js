'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, 
  Gauge, 
  Settings2, 
  Fuel,
  DollarSign, 
  Car, 
  Truck, 
  Ship 
} from "lucide-react";

export default function VehicleDetail({ vehicle, onClose }) {
  if (!vehicle) return null;

  return (
    <Dialog open={!!vehicle} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{vehicle.main_category}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Basic Information</h3>
              <div className="space-y-2">
                <p><span className="text-muted-foreground flex items-center gap-1">
                  <DollarSign className="h-4 w-4" /> Current Price:
                </span> {vehicle.current_price}</p>
                <p><span className="text-muted-foreground flex items-center gap-1">
                  <DollarSign className="h-4 w-4" /> Total Price:
                </span> {vehicle.total_price}</p>
                <p><span className="text-muted-foreground flex items-center gap-1">
                  <Car className="h-4 w-4" /> Model:
                </span> {vehicle.model_name}</p>
                <p><span className="text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> Year:
                </span> {vehicle.pickup_specs.Year}</p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Specifications</h3>
              <div className="space-y-2">
                {Object.entries(vehicle.pickup_specs).map(([key, value]) => (
                  <p key={key}>
                    <span className="text-muted-foreground">{key}:</span> {value}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Included Features</h3>
              <div className="flex flex-wrap gap-2">
                {vehicle.included_features.map((feature, index) => (
                  <Badge 
                    key={index} 
                    variant="outline"
                    className="bg-white text-secondary border-secondary hover:bg-secondary/10"
                  >
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Shipping Information</h3>
              <div className="space-y-2">
                <p><span className="text-muted-foreground flex items-center gap-1">
                  <Truck className="h-4 w-4" /> Type:
                </span> {vehicle.shipping_type}</p>
                <p><span className="text-muted-foreground flex items-center gap-1">
                  <Ship className="h-4 w-4" /> Inspection:
                </span> {vehicle.shipping_inspection}</p>
                <p><span className="text-muted-foreground flex items-center gap-1">
                  <Ship className="h-4 w-4" /> Destination:
                </span> {vehicle.shipping_destination}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}