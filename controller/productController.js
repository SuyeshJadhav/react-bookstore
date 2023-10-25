import productModel from '../models/productModel.js';
import slugify from 'slugify';
import fs from 'fs';

export const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Name is required' });
            case !slug:
                return res.status(500).send({ error: 'slug is required' });
            case !description:
                return res.status(500).send({ error: 'description is required' });
            case !price:
                return res.status(500).send({ error: 'price is required' });
            case !category:
                return res.status(500).send({ error: 'category is required' });
            case !quantity:
                return res.status(500).send({ error: 'quantity is required' });
            case !photo && photo.size > 1000000:
                return res.status(500).send({ error: 'photo is required and less than 1mb' });
        }

        const products = new productModel({ ...req.fields, slug: slugify(name) })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: 'Product created successfully',
            products
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'error in creating product'
        })
    }
}

export const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            total: products.length,
            message: 'All products',
            products,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'error in getting product'
        })
    }
}
export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate("category")
        res.status(200).send({
            success: true,
            message: 'single product fetched',
            product,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'error in getting single product'
        })
    }
}

export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo")
        if(product.photo.data){
            res.set('Content-type', product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
        res.status(200).send({
            success: true,
            message: 'single product fetched',
            product,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'error in getting single product'
        })
    }
}

export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success: true,
            message: 'product deleted successfully',
            product,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'error in deleting product'
        })
    }
}