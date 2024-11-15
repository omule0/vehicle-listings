 'use client';

export default function VehicleCard({ vehicle, onClick }) {
  return (
    <div 
      onClick={() => onClick(vehicle)}
      className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
    >
      <h2 className="text-xl font-semibold mb-2">{vehicle.main_category}</h2>
      <div className="space-y-2">
        <p><span className="font-medium">Price:</span> {vehicle.current_price}</p>
        <p><span className="font-medium">Year:</span> {vehicle.pickup_specs.Year}</p>
        <p><span className="font-medium">Mileage:</span> {vehicle.pickup_specs.Mileage}</p>
        <p><span className="font-medium">Engine:</span> {vehicle.pickup_specs.Engine}</p>
        <p><span className="font-medium">Transmission:</span> {vehicle.pickup_specs.Trans}</p>
        
        <div className="mt-4">
          <h3 className="font-medium mb-2">Features:</h3>
          <div className="flex flex-wrap gap-2">
            {vehicle.included_features.slice(0, 3).map((feature, index) => (
              <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                {feature}
              </span>
            ))}
            {vehicle.included_features.length > 3 && (
              <span className="text-xs text-gray-500">+{vehicle.included_features.length - 3} more</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}