/**
 * Created by codeorg on 2014/12/2.
 */
var express = require('express');
var router = express.Router();
var adminMenu =  require('../bll/admin/menu.js');

router.all('/admin/menu', adminMenu.getMenu);

module.exports = router;
