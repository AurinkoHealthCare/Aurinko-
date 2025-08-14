const Products = require('../model/products/productsSchema');
const Products2 = require('../model/products2/products2');

exports.globalSearch = async (req, res) => {
  const query = req.query.q ? req.query.q.trim() : '';
  if (!query) return res.json([]);

  try {
    const words = query.split(/\s+/).filter(Boolean);

    const buildRegexArray = (fields) =>
      fields.map((field) => ({
        $or: [
          { [field]: { $regex: query, $options: 'i' } },
          ...words.map(word => ({ [field]: { $regex: word, $options: 'i' } }))
        ]
      }));

    const nestedFields = ['name', 'category', 'generalInfo.name', 'generalInfo.category', 'generalInfo.segment', 'generalInfo.type'];

    const translationFields = [
      'translations.fr.name',
      'translations.fr.category',
      'translations.es.name',
      'translations.es.category',
      'translations.ar.name',
      'translations.ar.category',
      'translations.ko.name',
      'translations.ko.category'
    ];

    const searchFilter1 = {
      $or: [
        ...buildRegexArray(nestedFields),
        ...translationFields.map(field => ({ [field]: { $regex: query, $options: 'i' } }))
      ]
    };

    const searchFilter2 = {
      $or: [
        ...buildRegexArray(nestedFields),
        ...translationFields.map(field => ({ [field]: { $regex: query, $options: 'i' } }))
      ]
    };

    const [products1, products2] = await Promise.all([
      Products.find(searchFilter1),
      Products2.find(searchFilter2)
    ]);

    const results = [
      ...products1.map(item => ({ ...item._doc, categoryType: 'products' })),
      ...products2.map(item => ({ ...item._doc, categoryType: 'products2' }))
    ];

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
