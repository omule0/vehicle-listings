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
import { Skeleton } from "@/components/ui/skeleton"
import { Search } from "lucide-react"

// Add this new component for the no results state
const NoResults = ({ filters }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <div className="mb-4 text-muted-foreground">
      <Search className="h-12 w-12 mx-auto mb-4" />
      <h3 className="text-lg font-semibold mb-2">No vehicles found</h3>
      <p className="text-sm text-muted-foreground">
        {Object.keys(filters).length > 0 
          ? "Try adjusting your filters or search criteria"
          : "No vehicles are currently available"}
      </p>
    </div>
    {Object.keys(filters).length > 0 && (
      <Button 
        variant="outline" 
        className="mt-4"
        onClick={() => window.location.reload()}
      >
        Clear all filters
      </Button>
    )}
  </div>
);

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
  const [cachedData, setCachedData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (cachedData[currentPage]) {
        setVehicles(cachedData[currentPage].results);
        setPagination({
          count: cachedData[currentPage].count,
          next: cachedData[currentPage].next,
          previous: cachedData[currentPage].previous
        });
      } else {
        await fetchVehicles();
      }
    };
    
    fetchData();
  }, [currentPage, JSON.stringify(filters)]);

  const fetchVehicles = async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams({
        page: currentPage.toString()
      });

      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== 'all') {
          queryParams.append(key, value);
        }
      });
      
      console.log('Fetching with params:', queryParams.toString());
      
      const response = await fetch(
        `https://da-scraper-api-uqxz6.ondigitalocean.app/car-details/?${queryParams}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      setCachedData(prev => ({
        ...prev,
        [currentPage]: data
      }));
      
      setVehicles(data.results);
      setPagination({
        count: data.count,
        next: data.next,
        previous: data.previous
      });
    } catch (err) {
      setError('Failed to fetch vehicles');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchTerm) => {
    setCachedData({});
    setFilters(prev => ({
      ...prev,
      search: searchTerm || undefined
    }));
  };

  const handleFilter = async (filterType, value) => {
    setCachedData({});
    setFilters(prev => {
      const newFilters = {
        ...prev,
        [filterType]: value === 'all' ? undefined : value
      };
      Object.keys(newFilters).forEach(key => 
        newFilters[key] === undefined && delete newFilters[key]
      );
      return newFilters;
    });
  };

  const totalPages = Math.ceil(pagination.count / 10);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Vehicle Listings</h1>
            <p className="text-sm text-muted-foreground">
              {pagination.count > 0 
                ? `${pagination.count} vehicles available` 
                : "No vehicles available"}
            </p>
          </div>
        </div>
        
        <Separator className="my-2" />
        
        {/* Search and Filters */}
        <SearchFilters 
          onSearch={handleSearch} 
          onFilter={handleFilter} 
          activeFilters={filters}
        />
        
        {/* Loading State */}
        {loading && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 space-y-3"
                >
                  <Skeleton className="h-6 w-3/4" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <div className="pt-2">
                    <div className="flex flex-wrap gap-2">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Skeleton */}
            <div className="flex justify-center">
              <div className="flex items-center gap-8">
                <Skeleton className="h-10 w-24" /> {/* Previous button */}
                <Skeleton className="h-10 w-32" /> {/* Page indicator */}
                <Skeleton className="h-10 w-24" /> {/* Next button */}
              </div>
            </div>
          </div>
        )}
        
        {/* Error State */}
        {error && !loading && (
          <div className="bg-destructive/10 text-destructive px-4 py-2 rounded-md">
            {error}
          </div>
        )}
        
        {/* Vehicle Grid or No Results */}
        {!loading && !error && (
          <>
            {vehicles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.map((vehicle) => (
                  <VehicleCard 
                    key={vehicle.id} 
                    vehicle={vehicle} 
                    onClick={setSelectedVehicle}
                  />
                ))}
              </div>
            ) : (
              <NoResults filters={filters} />
            )}

            {/* Pagination - Only show if there are results */}
            {vehicles.length > 0 && (
              <div className="mt-8 flex justify-center">
                <Pagination>
                  <PaginationContent className="gap-8">
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={!pagination.previous}
                        className="hover:bg-accent"
                      />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink className="min-w-[100px] text-center">
                        Page {currentPage} of {Math.ceil(pagination.count / 10)}
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        disabled={!pagination.next}
                        className="hover:bg-accent"
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
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
