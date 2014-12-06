/**
 * Created by codeorg on 2014/12/3.
 */

/**
 * 模块定义
 */
var  app =angular.module('app', ['ngRoute','ngResource','xeditable','ui.bootstrap','angularBootstrapNavTree']);
app.run(function(editableOptions) {
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});
/**
 * 远程Ajax请求，数组用query,get只能拿到单个对象
 * { 'get':    {method:'GET'},
  'save':   {method:'POST'},
  'query':  {method:'GET', isArray:true},
  'remove': {method:'DELETE'},
  'delete': {method:'DELETE'}
};
 */
app.factory( 'remote', [ '$resource', function( $resource ) {
    //多个参数 param1&param1&param1
    return $resource( '/admin/:module?:params', {module:'@module',params:'@params'} ,{
        'update':{method:'PUT'},
        'insert':{method:'POST'}
    });
}]);

/**
 * admin/index页监视器,
 */
app.controller("main", [ '$scope','remote','$location' ,function($scope,remote,$location) {
    //菜单缩小，只省下图标
    $scope.leftMinified=false;
    //菜单极小，但还是有点
    $scope.leftMinimal=false;
    $scope.selectedindex=0;
    $scope.childindex=0;
    //面包屑
    $scope.breadcrumbs=[];
    //加载图标
    $scope.loading={value:false};
    //$scope.items=remote.get({id:"menu"});
    remote.query({module:'menu'},function(data){
        $scope.items=data;
    });

    //缩小菜单
    $scope.minifyMenu=function(){
        $scope.leftMinified=!$scope.leftMinified;
    }

    //极小菜单
    $scope.minimalMenu=function(){
        $scope.leftMinimal=!$scope.leftMinimal;
    }

    //目录
    $scope.openClose=function(index){
        //$scope.isopen=!$scope.isopen;
        //alert($scope.items[index].selected)
        //如果没有子菜单
        if($scope.items[index].childs.length<1){
            $scope.items[$scope.selectedindex].selected=false;
            setLastSelectedIItem();
            //设置面包屑
            $scope.breadcrumbs.splice(0,$scope.breadcrumbs.length);
            $scope.breadcrumbs.push($scope.items[index]);
            //设置选中状态
            $scope.items[index].selected=true;
            $scope.selectedindex=index;
            $scope.childindex=0;
            return true;
        }
        //有子菜单
        if(index!=$scope.selectedindex){
            $scope.items[$scope.selectedindex].selected=false;
            setLastSelectedIItem();
        }
        $scope.items[index].selected=!$scope.items[index].selected;
        $scope.selectedindex=index;
    }
    //上次选中项设为false
    var setLastSelectedIItem=function(){
        if($scope.items[$scope.selectedindex].childs.length<1){
            $scope.items[$scope.selectedindex].selected=false;
        }
        else{
            $scope.items[$scope.selectedindex].childs[$scope.childindex].selected=false;
        }
    }
    //子菜单点击
    $scope.goTo=function(fIndex,index){
        //不为自己的时候，添加加载
        //alert($location.path())
        var url=$scope.items[fIndex].childs[index].url;
        if(!($scope.selectedindex==fIndex&&$scope.childindex==index)) {
            if(url!="#"+$location.path()) $scope.loading.value = true;
        }
        setLastSelectedIItem();
        //设置面包屑
        $scope.breadcrumbs.splice(0,$scope.breadcrumbs.length);
        $scope.breadcrumbs.push($scope.items[fIndex]);
        $scope.breadcrumbs.push($scope.items[fIndex].childs[index]);
        //设置选择状态
        $scope.items[fIndex].childs[index].selected=true;
        $scope.childindex=index;
    }
} ]);

/**
 * admin/index路由配置
 */
app.config(['$routeProvider', function($routeProvider) {
    var formartTpl=function(name){ return '/template/admin/'+name+'.html'}
    var moudles=['main','config','category'];
    moudles.forEach(function(moudle){
        $routeProvider.when('/'+moudle,{ templateUrl:formartTpl(moudle), controller:moudle});
    });
    $routeProvider.when('/category/:id',{ templateUrl:formartTpl('category'), controller:'category'});
    $routeProvider .otherwise({ redirectTo: '/main' });
}]);


/**
    * 页面监视器
    */
    app.controller('loginCtrl', function($scope, $routeParams) {
        //$scope.isLoading=true;
    //$scope.id=$routeParams.id;

});

/**
 * Main页面监视器
 */
app.controller('loginCtrl', function($scope, $routeParams) {
    $scope.loaded=function(){
        $scope.loading.value=false;
    }

});
/**
 * config，配置管理页面
 */
app.controller('config', [ '$scope','remote',function($scope,remote) {
    remote.get({module:'config',params:'web'},function(data){
        $scope.config=data;
    });
    $scope.fullScreen={id:"",isFull:false,title:"全屏",height:''}


    //缩放配置屏
    $scope.zoomScreen=function(){
        if($scope.fullScreen.isFull){
            $scope.fullScreen={id:"",isFull:false,title:"全屏",height:''}
        }else {
            $scope.fullScreen={id:"jarviswidget-fullscreen-mode",isFull:true,title:"恢复正常大小",height:'height: '+window.screen.height+'px;'}
        }
    }

    $scope.updateConfig=function(key,value){
        var val;
        if(typeof value!='undefined'){
            //数据没改变时退出
            if(value==$scope.config[key]) return;
            val=value;
        }
        else{
            //没传$data
            val=$scope.config[key];
        }

        var obj={};
        obj[key]=val;
        remote.update({module:'config',params:'web'},obj,function(data){
            $scope.msg=data;
        });
    }

}]);

/**
 * category，分类管理页面
 */
app.controller('category', [ '$scope','remote','$routeParams',function($scope,remote,$routeParams){
    $scope.my_tree = tree = {};
    $scope.my_data=[];
 /*   $scope.my_data =[ {
        module: 'news',
        name: 'kakall',
        parent: '0',
        id: 'a1',
        children: ['White Leghorn', 'Rhode Island Red', 'Jersey Giant'],
        sort: '0' },
        {
            module: 'news',
            name: 'dsfsfs',
            parent: '0',
            id: 'a2',
            sort: '1' ,haschild:true} ];*/
    $scope.getChilds=function(row){
        //当前branch有child并且为+号合并着的
        if(row.branch.haschild && !row.branch.expanded){
            row.tree_icon="fa fa-spinner fa-spin";
            //admin/category/area/11
            remote.query({module:'category',params:row.branch.module+"&"+row.branch.id},function(data){
                row.branch.expanded=tree;//展开-
                row.branch.children=data;
            })
        }
        //row.branch.expanded = !row.branch.expanded
    }

    remote.query({module:'config',params:'category'},function(data){
        if(!data||data.length==0)return;
        $scope.categorys=data;

        if(!$routeParams.id)
            $scope.selectedId=$scope.categorys[0].id;
        else
            $scope.selectedId=$routeParams.id;
        getCategoryByMoudleId($scope.selectedId);
    });

    $scope.categoryClick=function(c){
        $scope.selectedId= c.id;
        getCategoryByMoudleId($scope.selectedId);
    }
    function getCategoryByMoudleId(val){
        remote.query({module:'category',params:val+"&0"},function(data){
            $scope.my_data = data;
            if(data!=null&&data.length>0) tree.select_branch($scope.my_data[0]);
        });
    }

    return $scope.try_adding_a_branch = function() {
        var b;
        b = tree.get_selected_branch();
        return tree.add_branch(b, {
            name: 'New Branch',
            data: {
                something: 42,
                "else": 43
            }
        });
    };



}]);

/**
 * co-show指令，实现jquery.show(time)效果
 *
 * 对应html标签属性co-show,co-show-duration
 */
app.directive(
    "coShow",
    function() {
        function link( $scope, element, attributes ) {

            // 设置监视属性.
            var expression = attributes.coShow;
            // 得到持续的时间（show(time)里的time，必须是数字）
            var duration = ( attributes.coShowDuration || 0 );
            duration=parseInt(duration);
            //初始化：执行co-show为flase时候隐藏
            if ( ! $scope.$eval( expression ) ) {
                element.hide();
            }

            //监视co-show的值有没有改变，当改变时改变相应元素的显示状态（显示、隐藏）
            $scope.$watch(
                expression,
                function( newValue, oldValue ) {
                    // 第一次运行，不用改变其状态，它有默认状态
                    // 没有改变时，退出
                    if ( newValue === oldValue ) {  return; }

                    // 有改变时
                    if ( newValue ) {
                        //当co-show=true时，我们显示它
                        element
                            .stop( true, true )
                            .slideDown( duration )
                        ;
                    } else {
                        //当co-show=false，我们隐藏它
                        element
                            .stop( true, true )
                            .slideUp( duration )
                        ;

                    }

                }
            );

        }
        // 返回指令配置.
        return({
            link: link,
            restrict: "A"
        });

    }
);


