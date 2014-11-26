var fs = require('fs');
//--------------------------把html表单转化成json对象--------------------------//
var toControls=function(html){
    var controls=[];
    //console.log(control['ng-minlength']);
    var pat=/<[^>]+ng\-model=['"]*(.*?)['"]*[^>]*>/g;
    var ms=html.match(pat);
    var atts='';
    var msgs=getmsgSet(html);
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
}

var getMsg=function(controlname,errorname,msgSet) {
    errorname=errorname.replace("ng-","");
    var name=controlname+"-"+errorname;
    if (!msgSet.hasOwnProperty(name))return "";
    return msgSet[name];
}

var getmsgSet=function(html) {
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
/*
* path=模板template目录下的路径，如:user/user.html
*/
var fileToControls=function(filename,callback){
    //var filepath = path.join(__dirname+"/wwwroot/template", filename);
    var filepath = "./wwwroot/template/"+ filename;
    fs.readFile(filepath, "utf-8", function (err, file) {
        if (err) {
            return {"msg":err};
        } else {
            console.time('RegEx');
            callback(JSON.stringify(toControls(file)));
            console.timeEnd('RegEx');
        }

    });
}
exports.fileToControls = fileToControls;
exports.toControls = toControls;
