var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var favicon = require('serve-favicon');
require('./common/extend');
var base64=require('./wwwroot/public/base64');
var url = require('url');
var hbs = require('hbs');
var $ = require('jquery');
var path = require("path");

//var $ = require('./wwwroot/lib/jquery/jquery-2.1.1.min.js');

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

app.get('/v0.10.33/:id',function(req,res,next){
    //..db get file realpath
    res.download(realpath,filename);
});



var getJsonByString=function(html){
    //
    var pat=/<[^>]+ng\-model=['"]*(.*?)['"]*[^>]*>/g;
    var ms=html.match(pat);
    var atts='';
    for(i in ms) {
        //var reg=/([^=\s]+=['"]?(.*?)['"]?)|([^=\s<>]+)/gi;
        var reg=/([^=\s]+=['"](.*?)['"])|([^=\s<>]+)/gi;
        var att=ms[i].match(reg);
        for(j in att) {
            var r=/([^=\s]+)=['"](.*?)['"]/;
            var atm=att[j].match(r);
            if(!atm)
                atts+=att[j]+'\n' ;
            else
                atts+=atm[1]+'\n' ;
        }
    }
    return atts;
}
app.get('/jq:id', function(req, res) {


    var filepath = path.join(__dirname+"/wwwroot/template", "test1.html");
    console.log(filepath);
    console.time('openfile');
    console.time('other');
    fs.readFile(filepath, "utf-8", function (err, file) {

        if (err) {
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            });

            res.end(err);
        } else {

            res.header("Content-Type", "text/html; charset=utf-8");
            console.timeEnd('other');
            console.time('createJqueryObject');
            var obj=$(file);
            obj.find('input').eq(0).map(function(){
               console.log(this+'=============');

            })
            console.log(+'----------');
            console.timeEnd('createJqueryObject');

            console.time('jquery');
            for(var i=0;i<1;i++)
            {


                obj.find('.form-control').eq(function(i){
                    console.log(this);
                    this.attr().eq(function(){
                        console.log(this)
                    });
                });
            }
            res.write(obj.find('[name="name23258"]').text()+"<br>"+req.params.id);
            console.timeEnd('jquery');

            console.time('RegEx');
            //var re =/<input(.+?)name="text1"(.+?)value="(.+?)"(.+?)>/;
            //re.exec(url);


            //var arr = file.match(re);
            var t='';
            for(var i=0;i<1;i++)
            {
                t+=getJsonByString(file);
                //var t= file.match(re);
            }

            res.write("<br>"+t);
            //return arr;

            //console.log(file);

            res.end();

            console.timeEnd('RegEx');
        }
        console.timeEnd('openfile');
    });

    //res.end($('<a>ddddd</a>').text());
});


/*
 app.get('/dist/v0.10.33/node.lib', function(req, res) {

 var pathname = url.parse(req.url).pathname;
 console.log(pathname);
 //var filepath = path.join("./tmp", "wwwroot", pathname);
 var filepath = path.join(__dirname+"/wwwroot", "dist/v0.10.33/node.lib");
 console.log(filepath);

 fs.readFile(filepath, "binary", function (err, file) {
 if (err) {
 res.writeHead(500, {
 'Content-Type': 'text/plain'
 });

 res.end(err);
 } else {
 res.writeHead(200, {
 'Content-Type': 'application/zip'
 });

 res.write(file, "binary");

 res.end();
 }
 });

 */
/*
 var stream = fs.createReadStream(filepath, {flags : "r", encoding : null});
 stream.on("error", function() {
 res.writeHead(404);
 res.end();
 });
 stream.pipe(res);
 *//*


 })


 app.get('/dist/v0.10.33/x64/node.lib', function(req, res) {

 var pathname = url.parse(req.url).pathname;
 console.log(pathname);
 //var filepath = path.join("./tmp", "wwwroot", pathname);
 var filepath = path.join(__dirname+"/wwwroot", "dist/v0.10.33/x64/node.lib");
 console.log(filepath);

 fs.readFile(filepath, "binary", function (err, file) {
 if (err) {
 res.writeHead(500, {
 'Content-Type': 'text/plain'
 });

 res.end(err);
 } else {
 res.writeHead(200, {
 'Content-Type': 'application/zip'
 });

 res.write(file, "binary");

 res.end();
 }
 });

 */
/*
 var stream = fs.createReadStream(filepath, {flags : "r", encoding : null});
 stream.on("error", function() {
 res.writeHead(404);
 res.end();
 });
 stream.pipe(res);
 *//*


 })
 */


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