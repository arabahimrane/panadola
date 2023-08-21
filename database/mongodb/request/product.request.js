const Product = require('../../model/product.model');
const Categorie = require('../../model/categorie.model');
const MessageAndStatus = require('../../../controller/messageAndStatus.controller');



exports.createCategorie = async (req) => {
    const newCategorie = new Categorie({
        store_id: req.session.storeId,
        categorieName: req.body.categorieName,
        slug: req.body.slug,
    });
    return newCategorie.save();
}

exports.findCategorie = async (req, categorieName, slug) => {
    var categorie = await Categorie.findOne({
        $and: [
            { store_id: req.session.storeId },
            { categorieName: categorieName },
            { slug: slug }
        ]
    })

    categorie.save();
}

exports.createProduct = async (req) => {
    const newProduct = new Product({
        store_id: req.session.storeId,
        information: req.body.information,
        gallery: req.body.gallery,
        generaleInformation: req.body.generaleInformation,
        variation: req.body.variation,
        publish: req.body.publish,
        publishSchedule: req.body.publishSchedule,
        meta: req.body.meta
    })
}