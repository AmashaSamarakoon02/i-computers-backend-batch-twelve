import Product from "../models/product.js";
import {isAdmin} from "./userController.js"

export async function createProduct(req, res){
    try{
        if(isAdmin(req)){
            const product= new Product(req.body);
            await product.save();
            res.json({message: "Product created successfully"});
        }else{
            return res.status(403).json({message: "You need to login as admin to create a product"}) 
        }

    }catch(err){
        res.status(500).json({message: "Error creating product"})
    }
}

export async function getAllProducts(req, res){
    try{
        if(isAdmin(req)){
        const products= await Product.find();
        res.json(products);
    }else{
        const products= await Product.find({isAvailable: true});
        res.json(products);

    }
    }catch(err){
        res.status(500).json({message: "Error fetching products"})
    }
}

export async function deleteProduct(req,res) {
    
        try{
             const productId = req.params.productId;

            if(isAdmin(req)){
                const product= await Product.findOne({productId:productId});
                if(product==null){      
                    return res.status(404).json({message: "Product not found"})
                }
                await Product.findOneAndDelete({productId: productId});
                res.json({message: "Product deleted successfully"});
            }else{
                return res.status(403).json({message: "You need to login as admin to delete a product"})
            }
            
        }catch(err){
            res.status(500).json({message: "Error deleting products"})
        }
}

export async function updateProduct(req, res){
    try{
        const productId = req.params.productId; 
        if(isAdmin(req)){
            const product= await Product.findOne({productId:productId});
            if(product==null){      
                return res.status(404).json({message: "Product not found"})
            }   
            await Product.findOneAndUpdate({productId: productId}, req.body);
            res.json({message: "Product updated successfully"});
        }else{
            return res.status(403).json({message: "You need to login as admin to update a product"})
        }
    }catch(err){
        res.status(500).json({message: "Error updating products"})
    }
}

export async function getProductId(req, res){
    try{
        const productId = req.params.productId;
        const product = await Product.findOne({productId: productId});
        if(product==null){
            return res.status(404).json({message: "Product not found"});
        }
        if(product.isAvailable){
            res.json(product);
        }else{
            if(isAdmin(req)){
                res.json(product);
            }else{
                return res.status(404).json({message: "Product not found"});
            }
        }
    }catch(err){
        res.status(500).json({message: "Error fetching product"});
    }
}