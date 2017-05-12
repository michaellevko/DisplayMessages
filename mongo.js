
// modules and params ================================================
var mongoClient     = require('mongodb').MongoClient;
var dbName          = 'msgDB';
var collectionName  = 'msgCollection';
var url             = 'mongodb://localhost:27017/' + dbName;

/*
 * finds messages in msgDB that match screenId
 * returns found messages in array
 */
exports.getMsgByScreenId = function(screenId, callback){
    mongoClient.connect(url, function(err, db) {
        var onErr = function(err, callback) {
            db.close();
            callback(err);
        };
        if (!err) {
            db.collection(collectionName, function (err, collection) {
                if (!err) {
                    collection.find({'screenIds': {$in: [screenId]}})
                        .toArray(function (err, docs) {
                            if (!err) {
                                db.close();
                                callback(err, docs);
                            }
                            else {
                                onErr(err, callback);
                            }
                        }); // end collection.find
                }
                else {
                    onErr(err, callback);
                }
            }); // end db.collection
        }
        else {
            onErr(err, callback);
        }
    }); // end mongoClient.connect
};
/*
 * inserts given msg to msgCollection
 * returns error variable
 */
exports.addMsgToCollection = function(msg, callback){
    mongoClient.connect(url, function(err, db) {
        var onErr = function(err, callback) {
            db.close();
            callback(err);
        };
        if (!err) {
            db.collection(collectionName, function (err, collection) {
                if (!err) {
                    collection.insert(msg, function (err) {
                        if (!err) {
                            db.close();
                            callback(err);
                        }
                        else {
                            onErr(err, callback);
                        }
                    }); // end collection.find
                }
                else {
                    onErr(err, callback);
                }
            }); // end db.collection
        }
        else {
            onErr(err, callback);
        }
    }); // end mongoClient.connect
};