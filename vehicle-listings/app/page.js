'use client';
import { useState, useEffect } from "react";
import SearchFilters from "@/components/SearchFilters";
import VehicleCard from "@/components/VehicleCard";
import VehicleDetail from "@/components/VehicleDetail";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null
  });

  useEffect(() => {
    fetchVehicles();
  }, [currentPage, filters]);

  const fetchVehicles = async () => {
    try {
      const queryParams = new URLSearchParams({
        page: currentPage,
        ...filters
      });
      
      const response = await fetch(
        `https://da-scraper-api-uqxz6.ondigitalocean.app/car-details/?${queryParams}`
      );
      const data = await response.json();
      
      setVehicles(data.results);
      setPagination({
        count: data.count,
        next: data.next,
        previous: data.previous
      });
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

    if (filters.transmission && filters.transmission !== 'all') {
      filtered = filtered.filter(vehicle => 
        vehicle.pickup_specs.Trans.includes(filters.transmission)
      );
    }

    if (filters.fuel && filters.fuel !== 'all') {
      filtered = filtered.filter(vehicle => 
        vehicle.pickup_specs.Fuel.includes(filters.fuel)
      );
    }

    if (filters.priceRange && filters.priceRange !== 'all') {
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

  const totalPages = Math.ceil(pagination.count / 10);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Vehicle Listings</h1>
          <p className="text-muted-foreground">Browse and filter available vehicles.</p>
        </div>
        
        <Separator />
        
        {/* Search and Filters */}
        <SearchFilters onSearch={handleSearch} onFilter={handleFilter} />
        
        {/* Loading and Error States */}
        {loading && (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-destructive/10 text-destructive px-4 py-2 rounded-md">
            {error}
          </div>
        )}
        
        {/* Vehicle Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <VehicleCard 
                key={vehicle.id} 
                vehicle={vehicle} 
                onClick={setSelectedVehicle}
              />
            ))}
          </div>
        )}
        
        {/* Pagination */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={!pagination.previous}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>
                Page {currentPage} of {Math.ceil(pagination.count / 10)}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={!pagination.next}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {selectedVehicle && (
        <VehicleDetail 
          vehicle={selectedVehicle} 
          onClose={() => setSelectedVehicle(null)} 
        />
      )}
    </div>
  );
}
