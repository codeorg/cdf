/**
 * Created by codeorg on 2014/12/2.
 */
var fs = require('fs');
var path = require('../../config/path');

exports.getMenu = function (req, res) {

    var filepath=path.adminMenu;
    console.log(filepath);
    //res.header("Content-Type", "text/html; charset=utf-8");
   // res.header("Content-Type", "text/html; charset=utf-8");
    res.writeHead(200, {"Content-Type": "application/json"});
   // res.setOption('Content-Format', 'application/json');
    //res.setOptions('Content-Format', 'application/json');
    fs.readFile(filepath, "utf-8", function (err, file) {
        if (err) {
            res.end('{msg:"err"}');
        } else {
            //console.time('adminMenu');
            res.end(file);
            //console.timeEnd('adminMenu');
        }

    });


    //res.end(path.adminMenu);
};