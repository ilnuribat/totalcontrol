//Здесь надо описывать все глобальные переменные
//потом с помощью exports.* сделать общим для всех модулей
var express = require('express');
var extend = require('util')._extend;
var app = express();
var bodyParser = require('body-parser');
var url = require('url');
app.use(bodyParser.urlencoded());
var mysql = require('mysql');
var queryString = require('querystring');
var FS = require('fs');
var rTitles = {};

exports.app = app;
exports.mysql = mysql;
exports.url = url;
exports.queryString = queryString;
exports.FS = FS;
exports.rTitles = rTitles;