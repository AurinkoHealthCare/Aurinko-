import React, { useState, useEffect } from 'react'
import axios from '../../api/axios'
import { MagnifyingGlassIcon, InboxIcon } from '@heroicons/react/24/outline'

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
        .get(`/products-search/search?q=${encodeURIComponent(query)}`)
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
    <div className="max-w-7xl mx-auto p-6 font-sans bg-gray-50 min-h-screen">
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          Explore Products
        </h1>
        <div className="mt-2 w-20 h-1 bg-emerald-500 mx-auto rounded"></div>
      </div>

      {/* Search Input */}
      <div className="relative w-full mb-6 max-w-2xl mx-auto">
        <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by name, category, or details..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full pl-14 pr-4 py-3 text-lg rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm transition-all placeholder-gray-400 bg-white"
        />
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-16">
          <div className="h-12 w-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* No Results */}
      {!loading && results.length === 0 && query.trim() !== '' && (
        <div className="flex flex-col items-center justify-center py-16 animate-fadeIn">
          <InboxIcon className="h-16 w-16 text-gray-400 mb-3" />
          <p className="text-lg font-semibold text-gray-600">No Results Found</p>
          <p className="text-sm text-gray-400">Try another keyword</p>
        </div>
      )}

      {/* Product Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-h-[700px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
        {results.map(item => (
          <div
            key={item._id}
            className="border border-gray-200 rounded-2xl p-4 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white flex flex-col"
          >
            {/* Image */}
            {item.image || item.productImage ? (
              <div className="w-full h-48 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden mb-4">
                <img
                  src={item.image || item.productImage}
                  alt={item.name || item.generalInfo?.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ) : (
              <div className="w-full h-48 bg-gray-100 rounded-xl mb-4 flex items-center justify-center text-gray-400 font-semibold">
                No Image
              </div>
            )}

            {/* Name */}
            <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">
              {item.name || item.generalInfo?.name}
            </h3>

            {/* Category Badge */}
            <span className="inline-block text-xs px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full mb-3 font-medium w-max">
              {item.categoryType?.toUpperCase() || 'UNKNOWN'}
            </span>

            {/* Category Info */}
            {item.category || item.generalInfo?.category ? (
              <p className="text-gray-700 text-sm mb-2">
                <span className="font-semibold">Category:</span>{' '}
                {item.category || item.generalInfo?.category}
              </p>
            ) : null}

            {/* Details */}
            {item.details || item.generalInfo?.details ? (
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {item.details || item.generalInfo?.details}
              </p>
            ) : null}

            {/* Button */}
            <button className="mt-auto bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg font-medium transition duration-300">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Search_bar
