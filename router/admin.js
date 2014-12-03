/**
 * Created by codeorg on 2014/12/2.
 */
var express = require('express');
var router = express.Router();
var menu =  require('../bll/admin/menu.js');
var popedom =  require('../bll/admin/popedom.js');
var _configTpl =  require('../bll/admin/_tpl.js');

//router.all('/template/admin/config',_configTpl.get);
router.all('/admin/', popedom.get);
router.all('/admin/*', popedom.get);
router.get('/admin/menu', menu.getMenu);//获取菜单

module.exports = router;
