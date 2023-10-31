const Product = require('../../model/product.model');
const Categorie = require('../../model/categorie.model');
const Order = require('../../model/order.model');
const MessageAndStatus = require('../../../controller/messageAndStatus.controller');
const mongoose = require('mongoose');


exports.createCategorie = async (req) => {
    const newCategorie = new Categorie({
        store_id: req.session.storeId,
        categorieName: req.body.categorieName,
        slug: req.body.slug,
        categoriePicture: req.body.categoriePicture
    });
    return await newCategorie.save();
}

exports.getCategorie = async (req) => {
    var categorie = await Categorie.find({ store_id: req.session.storeId });
    console.log(categorie);
    return categorie;
}

exports.createProduct = async (req) => {
    console.log(req.body.information.categorie);
    const newProduct = new Product({
        store_id: req.session.storeId,
        information: {
            productTitle: req.body.information.productTitle,
            slug: req.body.information.slug,
            description: req.body.information.description,
            category_id: req.body.information.categorie
        },
        gallery: req.body.gallery,
        generaleInformation: req.body.generaleInformation,
        variation: req.body.variation,
        publish: req.body.publish,
        publishSchedule: req.body.publishSchedule,
        meta: req.body.meta
    });
    return await newProduct.save();
}

exports.getProduct = async (req) => {
    var products = await Product.find({ store_id: req.session.storeId })
        .populate({
            path: 'information.category_id',
            select: 'categorieName'
        });
    console.log(products);
    return products;
}

exports.getOrder = async (req) => {
    var order = await Order.find({ store_id: req.session.storeId }).populate({
        path: 'product',
        select: 'information.productTitle gallery '
    });
    return order;
}

exports.OrderFilterByDays = async (req) => {
    try {
        const storeObjectId = new mongoose.Types.ObjectId(req.session.storeId);
        const aggregationPipeline = [
            {
                $match: {
                    store_id: storeObjectId,
                },
            },
            {
                $group: {
                    _id: {
                        month: { $month: '$date' },
                        day: { $dayOfMonth: '$date' },
                    },
                    totalOrders: { $sum: 1 },
                    totalConfirmedOrders: {
                        $sum: {
                            $cond: [{ $eq: ['$status', 'confirmed'] }, 1, 0],
                        },
                    },
                },
            },
            {
                $sort: {
                    '_id.month': 1,
                    '_id.day': 1,
                },
            },
        ];

        const result = await Order.aggregate(aggregationPipeline);

        // Formater les données
        const formattedData = result.map(item => {
            const { month, day } = item._id;
            const formattedDate = `${month}/${day}`;
            return {
                date: formattedDate,
                totalOrders: item.totalOrders,
                totalConfirmedOrders: item.totalConfirmedOrders,
            };
        });
        return formattedData;
    } catch (error) {
        throw error;
    }
};


