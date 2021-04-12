const Item = require('../models/item');

exports.getItems = async (req, res, next) => {

    // pagination is handled on the client side so from here I only need the number of the items
    let totalItems;

    try {

        // counting the items so that we can send it on the client side
        totalItems = await Item.find().countDocuments();

        // finding the items
        const items = await Item.find()
 
            // sending res with the items so that we can fetch it on the client side and the total number of the items
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