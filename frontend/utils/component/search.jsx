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
        placeholder="Search products by name, category, or details..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {loading && <p className="mt-4 text-gray-600">Loading results...</p>}

      {!loading && results.length === 0 && query.trim() !== '' && (
        <p className="mt-4 text-red-600 font-semibold">No results found</p>
      )}

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-h-[700px] overflow-y-auto">
        {results.map(item => (
          <div
            key={item._id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow bg-white flex flex-col"
          >
            {item.image || item.productImage ? (
              <img
                src={item.image || item.productImage}
                alt={item.name || item.generalInfo?.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
            ) : (
              <div className="w-full h-40 bg-gray-200 rounded-md mb-4 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}

            <h3 className="text-lg font-semibold text-indigo-700 mb-1">
              {item.name || item.generalInfo?.name}
            </h3>

            <span className="inline-block text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full mb-2 w-max">
              {item.categoryType?.toUpperCase() || 'UNKNOWN'}
            </span>

            {item.category || item.generalInfo?.category ? (
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Category:</span> {item.category || item.generalInfo?.category}
              </p>
            ) : null}

            {item.details || item.generalInfo?.details ? (
              <p className="text-gray-600 mb-2 line-clamp-3">
                {item.details || item.generalInfo?.details}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}
