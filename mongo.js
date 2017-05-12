
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
                    collection.find({'name': msg.name}).toArray(function (err, docs) {
                        if (!err) {
                            // Check if message is new to collection
                            if (docs.length == 0) {
                                collection.insert(msg, function (err) {
                                    if (!err) {
                                        db.close();
                                        callback(err, 'Updated');
                                    }
                                    else {
                                        onErr(err, callback);
                                    }
                                }); // end collection.insert
                            }
                            else {
                                // Check if existing message contains screenId
                                var screenId = msg.screenIds[0];
                                if (docs[0].screenIds.indexOf(screenId) == -1) {
                                    collection.update({'name': msg.name},
                                        {$push: {screenIds: screenId}}, function (err) {
                                            if (!err) {
                                                db.close();
                                                callback(err, 'Updated');
                                            }
                                            else {
                                                onErr(err, callback);
                                            }
                                        })
                                }
                                else {
                                    db.close();
                                    callback(err, 'already exists for screenId: ' + screenId);
                                }
                            }
                        } else {
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