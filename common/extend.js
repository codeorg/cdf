/*
var request = require('express/lib/request');

request.fullURL=function() {
    return this.headers.host+this.url;
}*/
var express = require('express');

var request=express.request;

request.fullURL2=function() {
    return this.headers.host + this.url;
}


//module.exports = request;
