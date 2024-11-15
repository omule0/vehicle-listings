'use client';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

export default function SearchFilters({ onSearch, onFilter }) {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        {/* Search Bar */}
        <div className="flex gap-4">
          <Input
            type="text"
            placeholder="Search vehicles..."
            onChange={(e) => onSearch(e.target.value)}
            className="max-w-xl"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select onValueChange={(value) => onFilter('transmission', value)}>
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

          <Select onValueChange={(value) => onFilter('fuel', value)}>
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

          <Select onValueChange={(value) => onFilter('priceRange', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="0-5000">$0 - $5,000</SelectItem>
              <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
              <SelectItem value="10000+">$10,000+</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => onFilter('year', value)}>
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