var express = require('express');
var session = require('express-session');
var cookie=require('cookie-parser');
require('./common/stringX')
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var favicon = require('serve-favicon');
require('./common/extend');
var base64=require('./wwwroot/public/base64');
var url = require('url');
var hbs = require('hbs');
//var $ = require('jquery');
var path = require("path");
var fv= require("./common/formValidate");
var fr= require("./common/formRule");
var sys= require("./router/sys");
var user= require("./router/user");
var admin= require("./router/admin");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({

    extended: true
}));
app.use(favicon(__dirname + '/wwwroot/favicon.ico'));

/*
 var hbs = require('hbs');
 hbs.registerPartial('partial', fs.readFileSync(__dirname + '/views/partial.hbs', 'utf8'));
 hbs.registerPartials(__dirname + '/views/partials');

 */


// set the view engine to use handlebars
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/wwwroot'));
//app.use(express.static(__dirname + '/views'));

app.use(favicon(__dirname + '/wwwroot/favicon.ico'));
app.use(cookie('test'));
app.use(session({
    secret: 'test',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.use(sys);//前台用的
app.use(user);//用户中心
app.use(admin);//后台管理

app.get('/v0.10.33/:id',function(req,res,next){

    //..db get file realpath
    res.download(realpath,filename);
});


app.get('/jq:id', function(req, res) {

    res.header("Content-Type", "text/html; charset=utf-8");

    fr.fileToRoles("test2.html",function(rule){
        //      fv.validate(rule,null);

        res.end(JSON.stringify(rule));
    });

});
//--------------------- mongous ----------------------------//
//var $ = require("mongous").Mongous
//$().open("127.0.0.1",27017);
/*  $("codeorg.table").find({},function(r) {
 console.log(r.documents);
 });*/

//---------------------- mongoskin ------------------------//
/*var db = require('mongoskin').db('mongodb://localhost:27017/codeorg');
db.collection('table').find({adminMenu:"aa"}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);

});*/

var mongojs = require('mongojs');
var db = mongojs('localhost:27017/codeorg',['table','user']);
//var table = db.collection('table');
app.get('/mg/:id', function(req, res) {
    res.header("Content-Type", "text/html; charset=utf-8");
    //db('table').find()


    db.table.findAndModify({
        query: { sss: '111' },
        sort: {bbb: -1},
        update: { $set: { bbb:'ssssss' } },
        new: true
    }, function(err, doc, lastErrorObject) {
        console.log(lastErrorObject);

        // doc.tag === 'maintainer'
    });

    db.table.find({aaa:""},function(err, docs) {
        //console.log(docs.length);




        docs.forEach(function(value,index){
            //console.log(index);

            //console.log(value);
            res.write(JSON.stringify(value));

        })
        res.end();

    /*   for(d in docs){
           console.log(docs[d]);
       }
*/
       // res.end(docs)
        //res.end(docs);
        // docs is an array of all the documents in mycollection
    });

    db.collection('table').find(function(err, docs) {
        //console.log(docs);
        //res.end(docs);
        // docs is an array of all the documents in mycollection
    });

});





app.get('/test', function(req, res) {
    res.writeHead(200,{"Content-Type":"text/json"});

    res.end(JSON.stringify([{id:11,title:"title11",remark:"remark11"},
        {id:112,title:"title112",remark:"remark112"},
        {id:113,title:"title113",remark:"remark113"}]));
});

app.all('/codeview*', function(req, res) {
    //res.header("Content-Type", "text/html; charset=utf-8");
    //res.writeHead(200,{"Content-Type":"text/html;charset:utf-8"});
    //var arg = url.parse(req.url, true).query;

    var s=base64.Base64.decode(req.body.codeorg_cd);
    // s=s.replace('{/script}','</script>');
    //res.end(s);

    res.render('tool/ng-form',{'control':s,'layout':''});
});


app.all('/recipes/:id', function(req, res) {
   // res.writeHead(200, {"Content-Type": "application/json"});
    res.writeHead(200, {"Content-Type": "application/json"});
    var obj=req.body;
    fr.fileToRoles("test2.html",function(rule){

        res.end(JSON.stringify(fv.validate(rule,obj)));
    });

});
var async = require('async');
var t = require('./help/async/t');
var log = t.log;


aa=function (callback) {
    setTimeout(function(){
        aaa="getData1"
        console.log('1.1: got data');
        callback(null, 'mydata111111111111');
    }, 300);
}
app.get('/async', function(req, res) {
    async.auto({
        getData: aa,
        makeFolder: function (callback) {
            setTimeout(function(){
                console.log('1.1: made folder');
                callback(null, 'myfolder');
            }, 200);
        },
        writeFile: ['getData', 'makeFolder', function(callback,re) {
            setTimeout(function(){
                console.log('1.1: wrote file'+ re.makeFolder);
                callback(null, 'myfile');
            }, 300);
        }],
        emailFiles: ['writeFile', function(callback, results) {
            log('1.1: emailed file: ', results.writeFile);
            callback(null, results.writeFile);
        }]
    }, function(err, results) {
        log('1.1: err: ', err);
        log('1.1: results: ', results);
    });

})


//console.log(req.method);

app.get('/', function(req, res) {
    /*    res.writeHead(200,{"Content-Type":"text/json"});
     // res.write();
     res.write(JSON.stringify({ id: 1 }));
     res.end();*/


    /*   //c:\Users\Administrator\WebstormProjects\untitled6
     var ex=require('c:\\Users\\Administrator\\WebstormProjects\\untitled3\\node_modules\\express');
     var app3 = ex();
     //var app3=require('c:\\Users\\Administrator\\WebstormProjects\\untitled3\\app.tool');
     //app3.listen(8080);*/

    res.locals = {
        some_value: 'foo bar',
        list: [{'id':'cat','remark':'dog'},{'id':'cat2','remark':'dog2'} ]
    }
    //res.render('index');
    console.log(req.fullURL2()+'---'+req.params.user);
    res.render('index2',{'test':'aaa','test2':'2222','layout':'layout2'});
});
app.listen(80);
//module.exports = app;