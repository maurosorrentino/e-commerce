const Item = require('../models/item');

exports.getItems = async (req, res, next) => {

    // pagination
    const currentPage = req.query.page || 1;
    const perPage = 10;
    let totalItems;

    try {

        // counting the items
        const totalItems = await Item.find().countDocuments();

        // finding the items
        const items = await Item.find()
 
            // pagination (controlling how many items are shown into the page)
            .skip((currentPage - 1) * perPage)
            .limit(perPage) 

            // sending res with the items so that we can fetch it on the client side
            res.status(200).json({

                message: 'fetched items',
                items,
                totalItems,

            });

    } catch (err) {

        console.log(err);

        if(!err.statusCode) {

            err.statusCode = 500;

        }

    }

};