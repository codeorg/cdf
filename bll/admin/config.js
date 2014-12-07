/**
 * Created by codeorg on 2014/12/2.
 */
var db = require('../../common/db.js');

/**
 * 得到网站配置
 */
exports.getWeb = function (req, res) {
    db.config.findOne({_id:1},function(err,doc){
        if(err)res.end({err:false});
            res.writeHead(200, {"Content-Type": "application/json"});
        //console.log(doc)
            res.end(JSON.stringify(doc));
    })
};
exports.updateWeb = function (req, res) {
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

/**
 * 得到分类配置
 */
exports.getCategory = function (req, res) {
    db.config.find({module:"category"},function(err,docs){
        if(err)res.end({err:false});
        res.writeHead(200, {"Content-Type": "application/json"});
        console.log(docs)
        res.end(JSON.stringify(docs));
    })
};