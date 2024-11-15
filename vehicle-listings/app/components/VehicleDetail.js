 'use client';

export default function VehicleDetail({ vehicle, onClose }) {
  if (!vehicle) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">{vehicle.main_category}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Basic Information</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Current Price:</span> {vehicle.current_price}</p>
              <p><span className="font-medium">Total Price:</span> {vehicle.total_price}</p>
              <p><span className="font-medium">Model:</span> {vehicle.model_name}</p>
              <p><span className="font-medium">Year:</span> {vehicle.pickup_specs.Year}</p>
            </div>

            <h3 className="font-semibold mt-4 mb-2">Specifications</h3>
            <div className="space-y-2">
              {Object.entries(vehicle.pickup_specs).map(([key, value]) => (
                <p key={key}><span className="font-medium">{key}:</span> {value}</p>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Included Features</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {vehicle.included_features.map((feature, index) => (
                <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  {feature}
                </span>
              ))}
            </div>

            <h3 className="font-semibold mb-2">Shipping Information</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Type:</span> {vehicle.shipping_type}</p>
              <p><span className="font-medium">Inspection:</span> {vehicle.shipping_inspection}</p>
              <p><span className="font-medium">Destination:</span> {vehicle.shipping_destination}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}