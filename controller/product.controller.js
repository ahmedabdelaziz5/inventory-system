const  productModel  = require('../modules/product/product.model');
const { checkIslimited } = require('../helpers/isLimitedProduct');
const mongoose = require('mongoose');

exports.addProduct = async (req, res) => {
    try {
        const {
            productName, productSerialNumber, productQuantity, limit,
            productCategory, countryOfProductOrigin, productPrice
        } = req.body;

        const { userName, userId, inventoryName } = req.user;
        let result = checkIslimited(limit, productQuantity);
        const productId = new mongoose.Types.ObjectId ;

        await productModel.create({
            _id : productId, userName, userId, inventoryName, islimited: result,
            productName, productSerialNumber, productQuantity, limit,
            productCategory, countryOfProductOrigin, productPrice, addedAt: Date.now()
        }).then(() => {
            return res.status(200).json({
                message: "success",
                productId
            })
        })
    }
    catch (err) {
        res.status(500).json({
            message: "error",
            err
        })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const { userName, inventoryName, userId } = req.user;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                message: "there is no such product !"
            });
        }

        let product = await productModel.findOneAndDelete({ _id: productId }).lean().select("inventoryName userName userId");

        if (!product) {
            return res.status(400).json({
                message: "there is no such product !"
            })
        }

        if (product.inventoryName != inventoryName || product.userName != userName || product.userId != userId) {
            return res.status(401).json({
                message: "Not authorized to remove this information !"
            })
        }

        return res.status(200).json({
            message: "success"
        })

    }
    catch (err) {
        res.status(500).json({
            message: "error",
            err
        })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const { userName, inventoryName, userId } = req.user;
        const {
            productName, productSerialNumber, productQuantity, limit,
            productCategory, countryOfProductOrigin, productPrice
        } = req.body;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                message: "there is no such product !"
            });
        }

        let result =  checkIslimited(limit, productQuantity);

        let product = await productModel.findOneAndUpdate({ _id: productId, userId, inventoryName }, {
            productName, productSerialNumber, productQuantity, limit,
            productCategory, countryOfProductOrigin, productPrice, islimited: result
        }).lean().select("inventoryName userName userId");

        if (!product) {
            return res.status(400).json({
                message: "there is no such product !"
            })
        }

        if (product.inventoryName != inventoryName || product.userName != userName || product.userId != userId) {
            return res.status(401).json({
                message: "Not authorized to remove this information !"
            })
        }

        return res.status(200).json({
            message: "success"
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            err
        })
    }
}

exports.getSpecificProduct = async (req, res) => {
    try {

        const productName = req.params.productName;
        const { userId, inventoryName } = req.user;
        const queryFilter = "-userId -inventoryName -email";

        let product = await productModel.find({ productName, userId, inventoryName }).select(queryFilter).lean()

        if (!product) {
            return res.status(400).json({
                message: "there is no such product"
            })
        }

        return res.status(200).json({
            message: "success",
            data: product
        })

    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            err: new Error(err)
        })
    }
}

exports.getSpecificCategory = async (req, res) => {
    try {

        const categoryName = req.params.categoryName;
        const { userId, inventoryName } = req.user;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const queryFilter = "-userId -inventoryName -email";

        let data = await productModel.find({ userId, inventoryName, productCategory: categoryName }).
            select(queryFilter).sort({ addedAt: -1 }).skip(skip).limit(limit).lean();
        let totalNumOfItems = await productModel.countDocuments({ userId, productCategory: categoryName });

        if (!data.length) {
            return res.status(200).json({
                message: "there is no produts for this category yet !"
            })
        }

        return res.status(200).json({
            message: "success",
            data,
            page: page,
            numOfItems: data.length,
            totalNumOfItems: totalNumOfItems,
            numOfPages: Math.ceil(totalNumOfItems / limit)
        })

    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            err: new Error(err)
        })
    }
}

exports.getLimitedItems = async (req, res) => {
    try {
        const { userId, inventoryName } = req.user;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const queryFilter = "-userName -inventoryName -userId";

        // mongoose.set('debug', true);
        let data = await productModel.find({ userId, inventoryName, islimited: true }).select(queryFilter).sort({ addedAt: -1 }).skip(skip).limit(limit).lean();
        let totalNumOfItems = await productModel.countDocuments({ userId, islimited: true });

        if (!data.length) {
            return res.status(200).json({
                message: "there is no limited produts in inventory yet !"
            })
        }

        return res.status(200).json({
            message: "success",
            data,
            page: page,
            numOfItems: data.length,
            totalNumOfItems: totalNumOfItems,
            numOfPages: Math.ceil(totalNumOfItems / limit)
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            err
        })
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const { userId } = req.user;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const queryFilter = "-userName -inventoryName -userId";

        let data = await productModel.find({ userId }).select(queryFilter).sort({ addedAt: -1 }).skip(skip).limit(limit).lean();
        let totalNumOfItems = await productModel.countDocuments({ userId });


        if (!data.length) {
            return res.status(200).json({
                message: "there is no products in inventory yet !"
            })
        }


        return res.status(200).json({
            message: "success",
            data,
            page: page,
            numOfItems: data.length,
            totalNumOfItems: totalNumOfItems,
            numOfPages: Math.ceil(totalNumOfItems / limit)
        })

    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            err
        })
    }
}






