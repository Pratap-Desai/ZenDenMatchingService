
const mongoose = require('mongoose');

const SchemaMatch = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    
        matchedOwner: [{
            _id: mongoose.Schema.Types.ObjectId,
            isApproved: Boolean,
    }],
        approvedhouse: [{
            _id: mongoose.Schema.Types.ObjectId,
            ownerId: String,
            street: String,
            country: String,
            pincode: Number,
            isActive: Boolean,
    }]
    
});


module.exports = mongoose.model('Match', SchemaMatch);
/*
 * testdata {}
 * 
 * 
 {
    "_id": "51ec4ac3eb7f7c701b000000",
    "house": {
        "metadata": {
            "street": "201 S 4th street",
            "country": "USA",
            "pincode": 95112,
            "isActive": true
        },
    "mUser": [
    {
        "id": test1,
        "isApproved": true
    },
    {
        "id": test2,
        "isApproved": true
    },
    {
        "id": test3,
        "isApproved": true
    },
    ]
    }
}
 * /

/*
 * 
 * 
 * 
 {
    "_id": ObjectId("51ec4ac3eb7f7c701b000000"),
    "gpx": {
        "metadata": {
            "desc": "Nürburgring VLN-Variante",
            "country": "de",
            "isActive": true
        },
    "trk": [
    {
        "lat": 50.3299594,
        "lng": 6.9393006
    },
    {
        "lat": 50.3295046,
        "lng": 6.9390688
    },
    {
        "lat": 50.3293714,
        "lng": 6.9389939
    },
    {
        "lat": 50.3293284,
        "lng": 6.9389634
    }]
    }
}
var TrackSchema = Schema({
            _id: Schema.ObjectId,
            gpx: {
                metadata: {
                    desc: String,
                    country: String,
                    isActive: Boolean
                },
                trk: [{lat:Number, lng:Number}]
            }
        }, { collection: "tracks" });

trk : [{
    lat : String,
    lng : String
     }]
or

trk : { type : Array , "default" : [] }

In the second case during insertion make the object and push it into the array like

db.update({'Searching criteria goes here'},
{
 $push : {
    trk :  {
             "lat": 50.3293714,
             "lng": 6.9389939
           } //inserted data is the object to be inserted
  }
});
or you can set the Array of object by

db.update ({'seraching criteria goes here ' },
{
 $set : {
          trk : [ {
                     "lat": 50.3293714,
                     "lng": 6.9389939
                  },
                  {
                     "lat": 50.3293284,
                     "lng": 6.9389634
                  }
               ]//'inserted Array containing the list of object'
      }
});


 */