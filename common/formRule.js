var fs = require('fs');
//--------------------------把html表单转化成json对象--------------------------//
var toRoles=function(html){
    var controls=[];
    //html=html.replace('\r','');
    //html=html.replace('\n','');
    //console.log(control['ng-minlength']);
    var pat=/<[^>]+ng\-model=['"]*(.*?)['"]*[^>]*>/g;
    var arrControl=html.match(pat);
    var msgs=getMsgSet(html);
    for(i in arrControl) {
        //console.time('getControlName');
        var name=getControlName(arrControl[i]);
        var reg = /(([^=\s]+)=['"](.*?)['"])|([^=\s<>]+)/gi;
        var arrAttr = arrControl[i].match(reg);
        var rule= ruleObject();

        for (j in arrAttr) {
            var r = /([^=\s]+)=['"](.*?)['"]/;
            var formatAttr = arrAttr[j].match(r);

            if (!formatAttr) {
                if (!rule.hasOwnProperty(arrAttr[j]))continue;
                rule[arrAttr[j]].value = arrAttr[j];
                if(arrAttr[j]=="required")rule[arrAttr[j]].msg=getMsg(name,arrAttr[j],msgs);
            }
            else {
                if(formatAttr[1]=="type"){
                    if(formatAttr[2]=="email"||formatAttr[2]=="number"||formatAttr[2]=="url"){
                        rule[formatAttr[2]].value = formatAttr[2];
                        rule[formatAttr[2]].msg=getMsg(name,formatAttr[2],msgs);
                        continue;
                    }
                }
                if(formatAttr[1]=="min" || formatAttr[1]=="max"){
                    //rule["number"].value = "number";
                    rule["number"][formatAttr[1]].value = formatAttr[2];
                    rule["number"][formatAttr[1]].msg=getMsg(name,formatAttr[1],msgs);
                    continue;
                }

                if (!rule.hasOwnProperty(formatAttr[1]))continue;
                 if(formatAttr[1]=="name" || formatAttr[1]=="ng-model"){
                    rule[formatAttr[1]] = formatAttr[2];
                    continue;
                }

                rule[formatAttr[1]].value = formatAttr[2];
                rule[formatAttr[1]].msg=getMsg(name,formatAttr[1],msgs);

            }


        }
        controls.push(rule);
    }
    return controls;
}


/*
*验证规则对象
*/
function ruleObject(){
    return {
        "name":"",
        "required":{"value":"","msg":""},
        "email":{"value":"","msg":""},
        "number":{"value":"","msg":"",min:{"value":"","msg":""},max:{"value":"","msg":""}},
        "url":{"value":"","msg":""},
        "ng-minlength":{"value":"","msg":""},
        "ng-maxlength":{"value":"","msg":""},
        "ng-pattern":{"value":"","msg":""},
        "ng-blur":{"value":"","msg":""},
        "ng-click":{"value":"","msg":""},
        "ng-model":""
    };
}
/*
 *获得消息错误　根据控件名字，错误类型　
 */
var getMsg=function(controlname,errorname,msgSet) {
    errorname=errorname.replace("ng-","");
    var name=controlname+"."+errorname;
    if (!msgSet.hasOwnProperty(name))return "";
    return msgSet[name];
}

/*
 *得到所有提示信息集合
 */
var getMsgSet=function(html) {
    var reg = /<[^>]+\.\$error\.[^>]+>(.*?)<[^>]+>/gi;
    var m = html.match(reg);
    var obj={};
    for(i in m){
        var r = /<[^>]+\.([a-zA>]+)\.\$error\.([a-zA-Z]+)[^>]+>(.*?)<[^>]+>/i;
        //var r = /<[^>]+\.\$error\.[^>]+>(.*?)<[^>]+>/i;
        var m2 = m[i].match(r);
        if(!m2)continue;
        obj[m2[1]+"."+m2[2]]=m2[3];
        //arr.push({m2[1]+"-"+m2[2]:m2[3]});
        //arr.push(obj);
    }
    return obj;
}
/*
 *得到控件名字
 */
var getControlName=function(control){
    var pat=/name=['"](.*?)['"]/i;
    var m=control.match(pat);
    if(!m) return "";
    return m[1];
}
/*
* path=模板template目录下的路径，如:user/user.html
*/
var fileToRoles=function(filename,callback){
    //var filepath = path.join(__dirname+"/wwwroot/template", filename);
    var filepath = "./wwwroot/template/"+ filename;
    fs.readFile(filepath, "utf-8", function (err, file) {
        if (err) {
            return {"msg":err};
        } else {
            console.time('RegEx');
            //callback(JSON.stringify(toRoles(file)));
            callback(toRoles(file));
            console.timeEnd('RegEx');
        }

    });
}
exports.fileToRoles = fileToRoles;
exports.toRoles = toRoles;
