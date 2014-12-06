/**
 * Created by codeorg on 2014/12/2.
 */
var db = require('../../common/db.js');


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
 * 分类一级分类
 */
exports.getCategoryByParentid = function (req, res) {

    db.category.find({moudle:req.params.moudle,parentid:req.params.id || "0"},function(err,docs){
        if(err)res.end({err:false});
        res.writeHead(200, {"Content-Type": "application/json"});
        console.log('---------------')
        console.log(docs)
        res.end(JSON.stringify(docs));
    })
};