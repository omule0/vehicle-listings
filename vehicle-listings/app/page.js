'use client';
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await fetch('https://da-scraper-api-uqxz6.ondigitalocean.app/car-details');
      const data = await response.json();
      setVehicles(data.results);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch vehicles');
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center p-8">Loading...</div>;
  if (error) return <div className="text-red-500 p-8">{error}</div>;

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Vehicle Listings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="border rounded-lg p-4 shadow-md">
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
                  {vehicle.included_features.map((feature, index) => (
                    <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
