/**
 * Created by codeorg on 2014/12/2.
 */
var db = require('../../common/db.js');


exports.getWebConfig = function (req, res) {
    db.config.findOne({_id:1},function(err,doc){
        if(err)res.end({err:false});
            res.writeHead(200, {"Content-Type": "application/json"});
        //console.log(doc)
            res.end(JSON.stringify(doc));
    })
};
exports.updateWebConfig = function (req, res) {
    db.config.findAndModify({
        query: { _id: 1 },
        update: { $set: req.body },
        new: true
    }, function(err, doc, lastErrorObject) {
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(doc));
        console.log(lastErrorObject);
    });
};

