import React, { useState, useEffect } from 'react'
import axios from '../../api/axios'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const Search_bar = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim() === '') {
        setResults([])
        return
      }

      setLoading(true)
      axios
        .get(`/products/search?q=${encodeURIComponent(query)}`)
        .then(res => {
          setResults(res.data)
          setLoading(false)
        })
        .catch(() => {
          setResults([])
          setLoading(false)
        })
    }, 500)

    return () => clearTimeout(delayDebounce)
  }, [query])

  return (
    <div className="max-w-7xl mx-auto p-6 font-sans">
      {/* Heading Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-indigo-700 mb-2">
          Discover Your Perfect Product
        </h1>
        <div className="mt-4 w-24 h-1 bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 mx-auto rounded-full"></div>
      </div>

      {/* Search Input */}
      <div className="relative w-full mb-6">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search products by name, category, or details..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 text-lg rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition duration-300 placeholder-gray-400"
        />
      </div>

      {/* Loading & No Results */}
      {loading && <p className="mt-2 text-gray-500">Loading results...</p>}
      {!loading && results.length === 0 && query.trim() !== '' && (
        <p className="mt-2 text-red-600 font-semibold">No results found</p>
      )}

      {/* Product Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-h-[700px] overflow-y-auto  scrollbar-track-gray-100">
        {results.map(item => (
          <div
            key={item._id}
            className="border rounded-2xl p-4 shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-105 bg-gradient-to-tr from-white via-indigo-50 to-white flex flex-col"
          >
            {/* Product Image */}
            {item.image || item.productImage ? (
              <img
                src={item.image || item.productImage}
                alt={item.name || item.generalInfo?.name}
                className="w-full object-cover rounded-xl mb-4"
              />
            ) : (
              <div className="w-full h-40 bg-gray-200 rounded-xl mb-4 flex items-center justify-center text-gray-400 font-semibold">
                No Image
              </div>
            )}

            {/* Product Name */}
            <h3 className="text-lg font-bold text-indigo-700 mb-2 hover:text-indigo-900 transition-colors duration-300">
              {item.name || item.generalInfo?.name}
            </h3>

            {/* Category Badge */}
            <span className="inline-block text-xs px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full mb-2 w-max">
              {item.categoryType?.toUpperCase() || 'UNKNOWN'}
            </span>

            {/* Category Info */}
            {item.category || item.generalInfo?.category ? (
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Category:</span> {item.category || item.generalInfo?.category}
              </p>
            ) : null}

            {/* Details */}
            {item.details || item.generalInfo?.details ? (
              <p className="text-gray-600 mb-2 line-clamp-3">{item.details || item.generalInfo?.details}</p>
            ) : null}

            {/* View Details Button */}
            <button className="mt-auto bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition duration-300">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Search_bar
