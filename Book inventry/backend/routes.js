const { createBook, updateBook, deleteBook, getSingleBook, getAllBook } = require('./controller')

const router = require('express').Router()

router.post('/book', createBook)
router.patch('/book/:id', updateBook)
router.delete('/book/:id', deleteBook)
router.get('/book/:id', getSingleBook)
router.get('/book', getAllBook)


module.exports = router