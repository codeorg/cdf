/**
 * Created by codeorg on 2014/12/4.
 */
var mongojs = require('mongojs');
var db = mongojs('localhost:27017/codeorg',['config']);
module.exports = db