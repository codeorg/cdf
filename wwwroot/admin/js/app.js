/**
 * Created by codeorg on 2014/12/3.
 */

/**
 * 模块定义
 */
var  app =angular.module('app', ['ngRoute','ngResource','xeditable']);
app.run(function(editableOptions) {
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});
/**
 * 远程菜单，数组必须指定数组，不然得不到data数组
 */
app.factory( 'menuRemote', [ '$resource', function( $resource ) {
    return $resource( '/admin/menu', {} ,{'get':  {method:'GET', isArray:true}});
}]);


/**
 * admin/index页监视器,
 */
app.controller("main", [ '$scope','menuRemote' ,function($scope,menuRemote) {
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
    menuRemote.get(function(data){

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
        if(!($scope.selectedindex==fIndex&&$scope.childindex==index)) $scope.loading.value=true;
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
    var formartTpl=function(name){
        return '/template/admin/'+name+'.html'
        //return '/template/admin/'+name+''
    }
    $routeProvider
        .when('/:module/:id', { templateUrl:function(params) {return  '/template/admin/'+params.module+'.html'},controller: 'loginCtrl' })
        .when('/config',{ templateUrl:formartTpl('config'), controller:'config'})
        .otherwise({ redirectTo: '/main' });
}]);


/**
    * 页面监视器
    */
    app.controller('loginCtrl', function($scope, $routeParams) {
        //$scope.isLoading=true;
    //$scope.id=$routeParams.id;

});
/**
 * config，配置管理页面
 */
app.controller('config', function($scope, $routeParams) {
    //$scope.id=$routeParams.id;

    $scope.test=function(){
        $scope.loading.value=false;
    }
    $scope.addUser=function(){
        $scope.loading.value=false;
    }
});


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


