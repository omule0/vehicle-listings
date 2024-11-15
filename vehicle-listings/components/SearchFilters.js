'use client';
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Search, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function SearchFilters({ onSearch, onFilter, activeFilters = {} }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Clear all filters
  const handleClearFilters = () => {
    setSearchTerm('');
    onSearch('');
    Object.keys(activeFilters).forEach(key => {
      onFilter(key, 'all');
    });
  };

  // Get active filter count
  const getActiveFilterCount = () => {
    return Object.values(activeFilters).filter(value => value && value !== 'all').length;
  };

  const renderActiveFilters = () => {
    return Object.entries(activeFilters)
      .filter(([_, value]) => value && value !== 'all')
      .map(([key, value]) => (
        <Badge 
          key={key} 
          variant="secondary"
          className="flex items-center gap-1"
        >
          {`${key}: ${value}`}
          <X 
            className="h-3 w-3 cursor-pointer" 
            onClick={() => onFilter(key, 'all')}
          />
        </Badge>
      ));
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        {/* Search Bar */}
        <div className="flex gap-4">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              value={searchTerm}
              placeholder="Search vehicles..."
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
            {searchTerm && (
              <X
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => setSearchTerm('')}
              />
            )}
          </div>
          {getActiveFilterCount() > 0 && (
            <Button 
              variant="outline" 
              onClick={handleClearFilters}
              className="whitespace-nowrap"
            >
              Clear Filters
            </Button>
          )}
        </div>

        {/* Active Filters */}
        {getActiveFilterCount() > 0 && (
          <div className="flex flex-wrap gap-2">
            {renderActiveFilters()}
          </div>
        )}

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select 
            value={activeFilters.transmission || 'all'}
            onValueChange={(value) => onFilter('transmission', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Transmission" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Transmissions</SelectItem>
              <SelectItem value="AT">Automatic</SelectItem>
              <SelectItem value="MT">Manual</SelectItem>
              <SelectItem value="CVT">CVT</SelectItem>
            </SelectContent>
          </Select>

          <Select 
            value={activeFilters.fuel || 'all'}
            onValueChange={(value) => onFilter('fuel', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Fuel Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Fuel Types</SelectItem>
              <SelectItem value="Petrol">Petrol</SelectItem>
              <SelectItem value="Hybrid">Hybrid</SelectItem>
              <SelectItem value="Diesel">Diesel</SelectItem>
            </SelectContent>
          </Select>

          <Select 
            value={activeFilters.priceRange || 'all'}
            onValueChange={(value) => onFilter('priceRange', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="0-5000">$0 - $5,000</SelectItem>
              <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
              <SelectItem value="10000-20000">$10,000 - $20,000</SelectItem>
              <SelectItem value="20000+">$20,000+</SelectItem>
            </SelectContent>
          </Select>

          <Select 
            value={activeFilters.year || 'all'}
            onValueChange={(value) => onFilter('year', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              <SelectItem value="2020+">2020+</SelectItem>
              <SelectItem value="2015-2019">2015-2019</SelectItem>
              <SelectItem value="2010-2014">2010-2014</SelectItem>
              <SelectItem value="-2009">Before 2010</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}