'use client';
import { useState, useEffect } from "react";
import SearchFilters from './components/SearchFilters';
import VehicleCard from './components/VehicleCard';
import VehicleDetail from './components/VehicleDetail';

export default function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const vehiclesPerPage = 9;

  useEffect(() => {
    fetchVehicles();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [vehicles, filters]);

  const fetchVehicles = async () => {
    try {
      const response = await fetch('https://da-scraper-api-uqxz6.ondigitalocean.app/car-details');
      const data = await response.json();
      setVehicles(data.results);
      setFilteredVehicles(data.results);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch vehicles');
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  };

  const handleFilter = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
    setCurrentPage(1);
  };

  const applyFilters = () => {
    let filtered = [...vehicles];

    if (filters.search) {
      filtered = filtered.filter(vehicle => 
        vehicle.main_category.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.transmission) {
      filtered = filtered.filter(vehicle => 
        vehicle.pickup_specs.Trans.includes(filters.transmission)
      );
    }

    if (filters.fuel) {
      filtered = filtered.filter(vehicle => 
        vehicle.pickup_specs.Fuel.includes(filters.fuel)
      );
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(price => 
        price === '+' ? Infinity : Number(price)
      );
      filtered = filtered.filter(vehicle => {
        const price = Number(vehicle.current_price.replace(/[^0-9.-]+/g, ''));
        return price >= min && (max === Infinity || price <= max);
      });
    }

    setFilteredVehicles(filtered);
  };

  const paginatedVehicles = filteredVehicles.slice(
    (currentPage - 1) * vehiclesPerPage,
    currentPage * vehiclesPerPage
  );

  const totalPages = Math.ceil(filteredVehicles.length / vehiclesPerPage);

  if (loading) return <div className="flex justify-center p-8">Loading...</div>;
  if (error) return <div className="text-red-500 p-8">{error}</div>;

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Vehicle Listings</h1>
      
      <SearchFilters onSearch={handleSearch} onFilter={handleFilter} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedVehicles.map((vehicle) => (
          <VehicleCard 
            key={vehicle.id} 
            vehicle={vehicle} 
            onClick={setSelectedVehicle}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {selectedVehicle && (
        <VehicleDetail 
          vehicle={selectedVehicle} 
          onClose={() => setSelectedVehicle(null)} 
        />
      )}
    </main>
  );
}
