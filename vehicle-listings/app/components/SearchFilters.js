'use client';

export default function SearchFilters({ onSearch, onFilter }) {
  return (
    <div className="mb-6 space-y-4">
      {/* Search Bar */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search vehicles..."
          onChange={(e) => onSearch(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <select 
          onChange={(e) => onFilter('transmission', e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Transmission</option>
          <option value="AT">Automatic</option>
          <option value="MT">Manual</option>
          <option value="CVT">CVT</option>
        </select>

        <select 
          onChange={(e) => onFilter('fuel', e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Fuel Type</option>
          <option value="Petrol">Petrol</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Diesel">Diesel</option>
        </select>

        <select 
          onChange={(e) => onFilter('priceRange', e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Price Range</option>
          <option value="0-5000">$0 - $5,000</option>
          <option value="5000-10000">$5,000 - $10,000</option>
          <option value="10000+">$10,000+</option>
        </select>

        <select 
          onChange={(e) => onFilter('year', e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Year</option>
          <option value="2020+">2020+</option>
          <option value="2015-2019">2015-2019</option>
          <option value="2010-2014">2010-2014</option>
          <option value="-2009">Before 2010</option>
        </select>
      </div>
    </div>
  );
}