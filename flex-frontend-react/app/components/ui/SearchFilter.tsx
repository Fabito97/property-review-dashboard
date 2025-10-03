import { Search, X } from "lucide-react";
import React, { useState, useEffect } from "react";

type SearchFilterProps<T> = {
  data: T[];
  keys: (keyof T)[];
  onFiltered: (results: T[]) => void;
  label?: string;
  placeholder?: string;
};

export default function SearchFilter<T>({
  data,
  keys,
  onFiltered,
  label,
  placeholder = "Search...",
}: SearchFilterProps<T>) {
  const [query, setQuery] = useState("");

  useEffect(() => {
  if (!query.trim()) {
    onFiltered(data);
    return;
  }
console.log("Filtering", { query, data, keys });
  const filtered = data.filter((item) =>
    keys.some((key) =>
      String(item[key] ?? "")
        .toLowerCase()
        .includes(query.toLowerCase())
    )
  );

  onFiltered(filtered);
}, [query, data]); 

  const clearSearch = () => setQuery("");

  return (
    <div>
      {label && (
        <label className="block font-medium text-gray-700 mb-1">{label}</label>
      )}
      <div className="relative">
        <Search className="absolute left-2 top-2 h-3 w-3 text-gray-400" />
        <input
          type="text"
          placeholder={placeholder}
          className="w-full pl-8 pr-6 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  );
}