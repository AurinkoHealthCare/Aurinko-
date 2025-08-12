import React, { useState, useEffect } from 'react'
import axios from '../../api/axios'

export default function LiveProductSearch() {
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
    <div className="max-w-7xl mx-auto p-6">
      <input
        type="text"
        placeholder="Search products by name or category..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {loading && <p className="mt-4 text-gray-600">Loading results...</p>}

      {!loading && results.length === 0 && query.trim() !== '' && (
        <p className="mt-4 text-red-600 font-semibold">No results found</p>
      )}

      {/* Grid for cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-h-[700px] overflow-y-auto">
        {results.map(item => (
          <div
            key={item._id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow bg-white flex flex-col"
          >
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
            ) : (
              <div className="w-full h-40 bg-gray-200 rounded-md mb-4 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}

            <h3 className="text-lg font-semibold text-indigo-700 mb-1">{item.name}</h3>

            <span className="inline-block text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full mb-2 w-max">
              {item.categoryType.toUpperCase()}
            </span>

            {item.category && (
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Category:</span> {item.category}
              </p>
            )}

            {item.description && (
              <p className="text-gray-600 mb-2 line-clamp-3">{item.description}</p>
            )}

            {item.price !== undefined && (
              <p className="font-semibold text-indigo-600 mb-1">
                Price: ₹{item.price.toLocaleString()}
              </p>
            )}

            {item.brand && (
              <p className="text-gray-600">
                <span className="font-semibold">Brand:</span> {item.brand}
              </p>
            )}

            {item.color && (
              <p className="text-gray-600">
                <span className="font-semibold">Color:</span> {item.color}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
