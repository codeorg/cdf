/**
 * Created by codeorg on 2014/12/2.
 */
var express = require('express');
var router = express.Router();
var admin=require('../bll/admin');

router.all('/admin/', admin.popedom.get);
router.all('/admin/*', admin.popedom.get);
router.get('/admin/menu/', admin.menu.getMenu);//获取菜单
router.get('/admin/config/web', admin.config.getWebConfig);//获取网站配置
router.put('/admin/config/web',admin.config.updateWebConfig);
module.exports = router;
