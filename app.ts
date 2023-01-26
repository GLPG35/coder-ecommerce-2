import express from 'express'
import products from './routes/products'

const app = express()
app.use(express.json())

const PORT = 3000

app.use('/products', products)

app.listen(PORT, () => {
	console.log(`Listening on: http://localhost:${PORT}`)
})