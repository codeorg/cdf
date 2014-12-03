/**
 * Created by codeorg on 2014/12/2.
 */
var fs = require('fs');
var path = require('../../config/path');

exports.get = function (req, res) {
    sleep(3000);
    var filepath=path.configTpl;
    console.log(filepath);
    //res.header("Content-Type", "text/html; charset=utf-8");
    res.header("Content-Type", "text/html; charset=utf-8");
    //res.writeHead(200, {"Content-Type": "application/json"});
   // res.setOption('Content-Format', 'application/json');
    //res.setOptions('Content-Format', 'application/json');
    fs.readFile(filepath, "utf-8", function (err, file) {
        if (err) {
            res.end('{msg:"'+err+'"}');
        } else {
            console.time('adminMenu');
            res.end(file);
            console.timeEnd('adminMenu');
        }

    });


    //res.end(path.adminMenu);
};

function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}