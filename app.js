var express = require('express');
//var jsdom = require("jsdom");
var $ = require("jquery");
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var favicon = require('serve-favicon');
require('./common/extend');
var base64=require('./wwwroot/public/base64');
var url = require('url');
var hbs = require('hbs');

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
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

app.all('/recipes/:id', function(req, res) {
    res.writeHead(200, {"Content-Type": "application/json"});

    var obj=req.body;
    var obj2=new Object;
    obj2.id=req.params.id;


    var post='';
/*req.on('data',function(chunk){
    post+=chunk;
});*/

    obj2.method=req.method;
    var obj3=    extend(obj,obj2,true);
    //{id:req.params.id+"---"+req.method}
    res.end(JSON.stringify(obj))
});

var extend=function(o,n,override){
    for(var p in n)if(n.hasOwnProperty(p) && (!o.hasOwnProperty(p) || override))o[p]=n[p];
};






//console.log(req.method);

app.get('/aa', function(req, res) {
/*    res.writeHead(200,{"Content-Type":"text/json"});
   // res.write();
    res.write(JSON.stringify({ id: 1 }));
    res.end();*/


    /*   //c:\Users\Administrator\WebstormProjects\untitled6
     var ex=require('c:\\Users\\Administrator\\WebstormProjects\\untitled3\\node_modules\\express');
     var app3 = ex();
     //var app3=require('c:\\Users\\Administrator\\WebstormProjects\\untitled3\\app.tool');
     //app3.listen(8080);*/

/*    res.locals = {
        some_value: 'foo bar',
        list: [{'id':'cat','remark':'dog'},{'id':'cat2','remark':'dog2'} ]
    }
    //res.render('index');
    console.log(req.fullURL2()+'---'+req.params.user);*/
    res.render('index2',{'test':$('<a>ddddsssd</a>sss').text(),'test2':'2222','layout':'layout2'});
});
app.listen(80);
//module.exports = app;