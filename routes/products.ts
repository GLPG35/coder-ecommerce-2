import express from 'express'
import ProductManager from '../productManager'

const router = express.Router()

const products = new ProductManager('./assets/products.json')

router.get('/', (req, res) => {
	const { limit } = req.query

	products.getProducts(limit ? +limit : undefined)
	.then(product => {
		res.send(product)
	}).catch(err => {
		res.status(400).send(err.message)
	})

})

router.get('/:pid', (req, res) => {
	const { pid } = req.params

	products.getProductById(+pid)
	.then(product => {
		res.send(product)
	}).catch(err => {
		res.status(404).send(err.message)
	})
})

export default router