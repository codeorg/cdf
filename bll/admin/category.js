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
 * 根据module和父级id获取分类数组
 */
exports.getCategoryByParentid = function (req, res) {

    db.category.find({module:req.params.module,parentid:req.params.id || "0"},function(err,docs){
        if(err)res.end({err:false});
        res.writeHead(200, {"Content-Type": "application/json"});
        console.log('---------------')
        console.log(docs)
        res.end(JSON.stringify(docs));
    })
};

exports.insert = function (req, res) {
    //sort:{sort:-1}
    db.category.find({module:req.body.module,parentid:req.body.parentid},{sort:{sort:-1},limit:1},function(err,docs){
        if(err)res.end({err:true,msg:err});
        //var max=docs[0].sort+1;
        //parseInt('j', 32).toString(32)
        var obj=req.body;
        var id=req.body.parentid=="0"?"":req.body.parentid;
        if(docs==null||docs.length==0){
            id+=(33).toString(32);
            obj.id=id;
            obj.sort=0;
            //var _id=docs[0]._id;
            db.category.insert(obj,function(err,doc){
                if(err)res.end({err:true,msg:err});
                if(req.body.parentid=="0"){
                    res.writeHead(200, {"Content-Type": "application/json"});
                    console.log(doc)
                    res.end(JSON.stringify(doc));
                }
                db.category.update({id:req.body.parentid},{$set:{haschild:true}},function(err,_doc){
                    if(err)res.end({err:true,msg:err});
                    //res.writeHead(200, {"Content-Type": "application/json"});
                    console.log(doc)
                    //res.end(JSON.stringify(doc));
                });

            });


            return;
        }

        obj.sort=docs[0].sort+1;
        console.log(obj)
        db.category.find({module:req.body.module,parentid:req.body.parentid},{sort:{id:-1},limit:1},function(err,docs){
            if(err)res.end({err:true,msg:err});
            //var id=req.body.parentid=="0"?"":req.body.parentid;

            obj.id=(parseInt(docs[0].id,32)+1).toString(32);
            db.category.insert(obj,function(err,doc){
                if(err)res.end({err:true,msg:err});
                if(req.body.parentid=="0"){
                    res.writeHead(200, {"Content-Type": "application/json"});
                    console.log(doc)
                    res.end(JSON.stringify(doc));
                }

                db.category.update({id:req.body.parentid},{$set:{haschild:true}},function(err,_doc){
                    if(err)res.end({err:true,msg:err});
                    //res.writeHead(200, {"Content-Type": "application/json"});
                    console.log(doc)
                    res.end(JSON.stringify(doc));
                });
            });
        })

    })

   /* db.category.find({module:req.body.module,parentid:req.body.parentid}).sort({sort:-1},function(err,docs){
        console.log(docs)
    })*/
  /*
    db.category.insert({},function(err,docs){
        if(err)res.end({err:false});
        res.writeHead(200, {"Content-Type": "application/json"});
        console.log('---------------')
        console.log(docs)
        res.end(JSON.stringify(docs));
    })*/
};