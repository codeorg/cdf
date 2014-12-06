/**
 * Created by codeorg on 2014/12/2.
 */
var express = require('express');
var router = express.Router();
var admin=require('../bll/admin');

router.all('/admin/', admin.popedom.get);
router.all('/admin/*', admin.popedom.get);
router.get('/admin/menu/', admin.menu.getMenu);//获取菜单
router.get('/admin/config?web', admin.config.getWeb);//获取网站配置
router.put('/admin/config?web',admin.config.updateWeb);
router.get('/admin/config?category', admin.config.getCategory);//获取分类配置
router.get('/admin/category?:moudle&:id', admin.category.getCategoryByParentid);//根据父级ＩＤ获取分类
module.exports = router;
