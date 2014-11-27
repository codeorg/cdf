var express = require('express');
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
var fr= require("./common/formRule");
var ts= require("./common/test");
var ts2= require("./common/test");
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

/*
var getMsg=function(controlname,errorname,html) {
    if(!controlname) return "";
    errorname=errorname.replace("ng-","");
    //var pat = /<[^>]+.$error=['"]*(.*?)['"]*[^>]*>/g;
    var reg = new RegExp("<[^>]+" + controlname + "\\.\\$error\\."+errorname+"[^>]+>(.*?)<[^>]+>");
    var m = reg.test(html);
    if (!m) return "";
    return RegExp.$1;

}*/
/*
var getMsg=function(controlname,errorname,msgSet) {

    errorname=errorname.replace("ng-","");
   var name=controlname+"-"+errorname;
    if (!msgSet.hasOwnProperty(name))return "";
    return msgSet[name];
}

var getMsgSet=function(html) {
    //var reg = new RegExp("<[^>]+\\.\\$error\\.[^>]+>(.*?)<[^>]+>");
    var reg = /<[^>]+\.\$error\.[^>]+>(.*?)<[^>]+>/gi;
    var m = html.match(reg);
    var obj={};
   for(i in m){

       var r = /<[^\.]+\.([^\.]+)\.\$error\.([^\s\&"]+)[^>]+>(.*?)<[^>]+>/i;
       var m2 = m[i].match(r);
       if(!m2)continue;
       obj[m2[1]+"-"+m2[2]]=m2[3];
       //arr.push({m2[1]+"-"+m2[2]:m2[3]});
       //arr.push(obj);
   }

    return obj;
}

var getControlName=function(control){
    var pat=/name=['"](.*?)['"]/g;
    var m=control.match(pat);
    if(!m) return "";
    return [1];
}
var getJsonByString=function(html){

    var controls=[];
    //console.log(control['ng-minlength']);
    var pat=/<[^>]+ng\-model=['"]*(.*?)['"]*[^>]*>/g;
    var ms=html.match(pat);
    var atts='';
    var msgs=getMsgSet(html);
    for(i in ms) {
        //console.time('getControlName');
        var name=getControlName(ms[i]);
        //console.timeEnd('getControlName');
        //var reg=/([^=\s]+=['"]?(.*?)['"]?)|([^=\s<>]+)/gi;
        var reg = /([^=\s]+=['"](.*?)['"])|([^=\s<>]+)/gi;
        var att = ms[i].match(reg);
        var c = {
            "name":{"value":"","msg":""},
            "ng-model":{"value":"","msg":""},
            "min":{"value":"","msg":""},
            "max":{"value":"","msg":""},
            "required":{"value":"","msg":""},
            "ng-minlength":{"value":"","msg":""},
            "ng-maxlength":{"value":"","msg":""},
            "ng-pattern":{"value":"","msg":""},
            "ng-blur":{"value":"","msg":""},
            "ng-click":{"value":"","msg":""}
        };



        for (j in att) {
            var r = /([^=\s]+)=['"](.*?)['"]/;
            var atm = att[j].match(r);
            if (!atm) {
                if (!c.hasOwnProperty(att[j]))continue;
                c[att[j]]["value"] = att[j];
                if(att[j]=="required")c[att[j]]["msg"]=getMsg(name,att[j],msgs);

            }
            else {
                //if(atm[1]=="name") continue;
                if (!c.hasOwnProperty(atm[1]))continue;
                //if(atm[1]=="name") name=atm[2];
                c[atm[1]]["value"] = atm[2];
                //console.log(getMsg(name,atm[1],html))
                c[atm[1]]["msg"]=getMsg(name,atm[1],msgs);
                //atts+=atm[1]+' ' ;

            }


        }

        controls.push(c);
    }
    return controls;
}*/

app.get('/jq:id', function(req, res) {

    res.header("Content-Type", "text/html; charset=utf-8");
    ts.get();
    console.log("".test()+"-----------test()");
    console.log(ts.get()+"-----------1");
    ts.set("sssssssssssssssssss");
    console.log(ts.get()+"-----------2");
    //ts.set("sssssssssssssssssss");
    console.log(ts2.get()+"-----------ts2");
    console.log("".test()+"-----------test()");

    fr.fileToRoles("test2.html",function(data){
        res.end(data);
    });

/*

    var filepath = path.join(__dirname+"/wwwroot/template", "test3.html");
    console.log(filepath.toRoles());

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
            //var obj=$(file);
     */
/*       obj.find('input').eq(0).map(function(){
             console.log(this+'=============');

             })*//*

            console.log(+'----------');
            console.timeEnd('createJqueryObject');



            console.time('RegEx');
            //var re =/<input(.+?)name="text1"(.+?)value="(.+?)"(.+?)>/;
            //re.exec(url);


            //var arr = file.match(re);
            var t='';
            for(var i=0;i<1;i++)
            {
                t+=JSON.stringify(file.toRoles());
                //var t= file.match(re);
            }

            res.write("<br>RegEx:"+t);
            //return arr;

            //console.log(file);

            res.end();

            console.timeEnd('RegEx');
        }
        console.timeEnd('openfile');
    });
*/

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