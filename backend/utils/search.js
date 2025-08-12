const Products = require('../model/products/productsSchema')
const Products2 = require('../model/products2/products2')

exports.globalSearch = async (req, res) => {
  const query = req.query.q ? req.query.q.trim() : ''
  if (!query) return res.json([])

  try {
    const searchFilter = {
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } }
      ]
    }

    const [products1, products2] = await Promise.all([
      Products.find(searchFilter),
      Products2.find(searchFilter)
    ])

    const results = [
      ...products1.map(item => ({ ...item._doc, categoryType: 'products' })),
      ...products2.map(item => ({ ...item._doc, categoryType: 'products2' }))
    ]

    res.json(results)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
