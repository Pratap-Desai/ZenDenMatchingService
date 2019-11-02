const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Matches = require("../models/matchModels");

router.get('/getmatches', (req, res, next) => {

    const userId = req.query.user_id;
    console.log(userId);
   
    Matches.find({
             "_id": userId 
    }
    ).exec().then(val => {
        console.log("pratap");
        console.log(val);
        res.status(200).json(val);
        console.log("pratap over");
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
   
   
});

/*Matches.findOneAndUpdate({
    "matchedOwner._id": ownerid,
    "_id": userId
},
    {
        $push: {

            house: house[0]
        }
    },
    { upsert: true, returnNewDocument: true }

).exec().then(val => {
    console.log("pratap");
    console.log(val);
    res.status(200).json(val);
    console.log("pratap over");
}).catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
});
*/

router.post('/approveUser', (req, res, next) => {
    const userId = req.body.id;
    const buyerId = req.body.buyer;
    console.log(userId);
    console.log(buyerId);

    Matches.findOne({
        "matchedOwner._id": userId,
        "_id": buyerId
    }

    ).exec().then(val => {
        console.log("pratap");
        if (!val) {
           console.log(err);
        }
        else {
            Matches.updateOne(
                { '_id': buyerId, "matchedOwner._id": userId },
                { $set: { "matchedOwner.$": { "_id": userId, 'isApproved': true } } }
            ).then(result => {
                console.log(result);
                res.status(201).json({
                    message: 'Handling User msg approve requests',
                    order: result
                });
            }).catch(err => console.log(err));


        }

        console.log("pratap over");
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });



});


router.post('/right', (req, res, next) => {
    const userId = req.body.id;
    const owner = req.body.matchedOwner;
    const house = req.body.approvedhouse;
    console.log(userId);
    console.log(owner);
    console.log(house);
    const ownerid = owner[0]._id;
    console.log(ownerid);

    Matches.findOne({
        "matchedOwner._id": ownerid,
        "_id": userId
    }

    ).exec().then(val => {
        console.log("pratap");
        if (!val) {
            Matches.updateOne(
                { _id: userId },
                {
                    $push: {
                        matchedOwner: owner,
                        approvedhouse: house
                    }
                }
            ).then(result => {
                console.log(result);
                res.status(201).json({
                    message: 'Handling rigth swipe request for matches',
                    order: result
            });
            }).catch(err => console.log(err));

        }
        else {
            Matches.updateOne(
                { _id: userId },
                {
                    $push: {
                        approvedhouse: house
                    }
                }
            ).then(result => {
                console.log(result);
                res.status(201).json({
                    message: 'Handling rigth swipe request for matches',
                    order: result
                });
            }).catch(err => console.log(err));

           
        }
       
        console.log("pratap over");
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });



});


//for first right swipe
router.post('/', (req, res, next) => {
    console.log("called");

    const match = new Matches({
        _id: req.body.id,
        matchedOwner: req.body.matchedOwner,
        approvedhouse: req.body.approvedhouse

    });
   // console.log(req);
    console.log(req.body);
    console.log(match);

    match.save().then(result => {
        console.log(result);
    }).catch(err => console.log(err));

    res.status(201).json({
        message: 'Handling post request for matches',
        order: match
    });
});

module.exports = router;
