import express from 'express';
import { createProduct} from '../controllers/productController.js';
import { getAllProducts } from '../controllers/productController.js';
import { deleteProduct } from '../controllers/productController.js';
import { updateProduct } from '../controllers/productController.js';
import { getProductId } from '../controllers/productController.js';

const productRouter= express.Router();

productRouter.post("/", createProduct)
productRouter.get("/", getAllProducts)

productRouter.get("/search",(req,res) => {  
    res.json({message: `Search results`})
}) 

productRouter.delete("/:productId", deleteProduct)
productRouter.put("/:productId", updateProduct)
productRouter.get("/:productId", getProductId)

export default productRouter;