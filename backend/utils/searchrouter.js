const express = require('express')
const { globalSearch } = require('../utils/search')

const router = express.Router()

router.get('/search', globalSearch)

module.exports = router
