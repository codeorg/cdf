$('.drag').draggable({
    appendTo: 'body',
    helper: 'clone'
});

$('#dropzone').droppable({
    activeClass: 'active',
    hoverClass: 'hover',
    accept: ":not(.ui-sortable-helper)", // Reject clones generated by sortable
    drop: function (e, ui) {

        //$el.append($('<input class="ctrl-dsc" id="text" >').val('用户名:'));
        //$el.append(' <input class="form-control" type="' + ui.draggable.text() + '"> <div><label>More Data</label><input type="text" /></div></div>');

        var $el = $('<div class="drop-item">' );
        var _type=ui.draggable.text();
        _type=_type.replace(/[^a-z]/gi,"").trim();
        //_type=_type.replace('拖动','').trim();
        var strC=$("<div></div>").append(ui.draggable.find(".col-sm-5").clone()).html().replace('col-sm-5','col-sm-7').trim();
        var desbtn=(_type=='Button'?'':'<input class="form-control ctrl-dsc" name="co_des" value="' + _type + '">');
            var str='<div class="form-horizontal">'+
            '<div class="form-group">'+ ' <label class="col-sm-2">'+desbtn+'<input name="co_type" type="hidden" value="' + _type.toLowerCase() + '"></label>'+
            strC+
            '</div>'+
            '</div>' +
            '<div class="divEdit">' +
            getTableByType(_type)+
            '</div>' +
            '</div>';
        $el.append(str);
        // $el.append($('<button type="button" class="btn btn-default btn-xs remove"><span class="glyphicon glyphicon-trash"></span></button>').click(function () { $(this).parent().detach(); }));
        //$(this).append(str);
        //$el.append( $('<button type="button" class="btn btn-primary btn-xs edit"><span class="glyphicon glyphicon-edit"></span> </button> ').click(function () { $(this).parent().find('.divEdit').toggle(300); }));

        var editButton='';
        if(_type==="Text"){
            editButton='<div class="btn-group glyphicon edit">'+
            '<a name="co_edit" type="button" class="btn btn-primary btn-xs" ><span class="glyphicon-edit  icon-white"></span> 编辑</a>'+
            '<a class="btn btn-primary btn-xs dropdown-toggle" data-toggle="dropdown" href="#"><span class="caret"></span></a>'+
            '<ul class="dropdown-menu">'+
            '<li><a class="co-user"><span class="glyphicon-user"></span> 用户名</a></li>'+
            '<li><a href="#"><span class="glyphicon-font"></span> 标题</a></li>'+
            '<li><a href="#"><span class="glyphicon-phone"></span> 手机</a></li>'+
            '<li><a href="#"><span class="glyphicon-unchecked"></span> 电话</a></li>'+
            '<li class="divider"></li>'+
            '<li><a href="#"><span class="glyphicon-pencil"></span> 自定义</a></li>'+
            '</ul>'+
            '</div>';
        }
        else
        {
            editButton='<div class="btn-group glyphicon edit">' +
            '<a name="co_edit"  type="button" class="btn btn-primary btn-xs" ><span class="glyphicon-edit  icon-white"></span> 编辑</a>'+
            '</div>';
        }

        var edit=$(editButton);
        $el.append(edit);

        //---------------------------------------- 描述框状态 --------------------------------------------//
        $el.find('[name="co_des"]').click(function(){
            $el.find('[name="co_des"]').attr("class", "form-control ctrl-dsc-border");
        });
        $el.find('[name="co_des"]').blur(function(){

            $el.find('[name="co_des"]').attr("class",$el.find('.divEdit').is(":visible")? "form-control ctrl-dsc-border":"form-control ctrl-dsc");
        });

        //---------------------------------------- 编辑按键 --------------------------------------------//

        edit.find('[name="co_edit"]').click(function(){

            $el.find('[name="co_des"]').attr("class",  !$el.find('.divEdit').is(":visible")? "form-control ctrl-dsc-border":"form-control ctrl-dsc");
            edit.parent().find('.divEdit').toggle(300);

            //alert("ssss");
        });
        //---------------------------------------- 用户名 --------------------------------------------//
        edit.find('.co-user').click(function(){
            $el.find('[name="co_des"]').attr("class", "form-control ctrl-dsc-border");
            edit.parent().find('.divEdit').show(300);

            //alert("ssss");
        });

        //---------------------------------------- 运行生成单个控件代码 --------------------------------------------//
        $el.append( $('<button type="button" class="btn btn-primary btn-xs run"><span class="glyphicon glyphicon-play"></span> </button> ').click(function () {

            var ci=getControlByItem($el);
            $('[name="codeorg_code"]').val(ci.html+getJS(ci.js));
            $('#modal-code').modal('show');





        }));
        //---------------------------------------- 删除控件 --------------------------------------------//
        $el.append( $('<button type="button" class="btn btn-danger btn-xs remove"><span class="glyphicon glyphicon-trash"></span> </button> ').click(function () { $(this).parent().detach(); }));
        $(this).append($el);
    }
}).sortable({
    items: '.drop-item',
    sort: function() {
        // gets added unintentionally by droppable interacting with sortable
        // using connectWithSortable fixes this, but doesn't allow you to customize active/hoverClass options
        $( this ).removeClass( "active" );
    }
});

//---------------------------------------- 得到单个控件 --------------------------------------------//

var getControlByItem=function(item){
    var s='';
    item.find('input').each(function(){
        //obj$(this).attr('name')
        if (!s) { s='"'+$(this).attr('name')+'":"'+$(this).val()+'"';}
        else
        {s+=',"'+$(this).attr('name')+'":"'+$(this).val()+'"';}
    });
    item.find('textarea').each(function(){
        //obj$(this).attr('name')
        if (!s) { s='"'+$(this).attr('name')+'":"'+$(this).val()+'"';}
        else
        {s+=',"'+$(this).attr('name')+'":"'+encodeURIComponent($(this).val())+'"';}

    });
    var objC=JSON.parse('{'+s+'}');
    objC.co_required=item.find('[name="co_required"]').prop("checked")?"true":"";
    return getControl(objC);
}
var getControl=function(obj){
    var f='<div class="form-group"' +
        '\n ng-class=\'{ "has-error" : codeorgForm.{{co_name}}.$invalid && (codeorgForm.{{co_name}}.$dirty || isPost)}\'>' +
        '\n<label class="col-sm-3 control-label text-right" >{{co_des}}</label>' +
        '<div class="col-sm-9" >{{control}}'+
        '{{errs}}</div>\n</div>';


    var input='\n<input type="{{co_type}}" name="{{co_name}}" class="form-control" ng-model="datatable.{{co_name}}"{{required}}{{minlength}}{{maxlength}}{{pattern}}{{blur}}{{min}}{{max}}> ';
    var ta='\n<textarea name="{{co_name}}" class="form-control" ng-model="datatable.{{co_name}}"{{required}}{{minlength}}{{maxlength}}{{pattern}}{{blur}}{{min}}{{max}}></textarea>';
    var sel='\n<select name="{{co_name}}" class="form-control" ng-model="datatable.{{co_name}}"{{required}}{{minlength}}{{maxlength}}{{pattern}}{{blur}}{{min}}{{max}}><option value="">请选择地址</option><option value="sh">上海</option></select>';
    var ck='\n<label class="{{co_type}}"><input type="{{co_type}}"  name="{{co_name}}"  ng-model="datatable.{{co_name}}"{{required}}{{minlength}}{{maxlength}}{{pattern}}{{blur}}{{min}}{{max}}>选择</label>';
    var bt='\n<button class="btn btn-primary"{{click}}>提交</button>';

    var typeerr='';
    var html='';var js='';
    var errs= getErrs(obj);
    switch (obj.co_type)
    {
        case "radio":
        case "checkbox":
        html= f.replace(/\{\{control\}\}/g,ck);
        html=html.replace(/\{\{co_des\}\}/g,obj.co_des);
        break;
        case "button":
            html= f.replace(/\{\{control\}\}/g,bt);
            html=html.replace(/\{\{click\}\}/g,errs.click);
            html=html.replace(/\{\{co_des\}\}/g,"");
            if(typeof obj.co_click_function!=="undefined")
                js+=decodeURIComponent(obj.co_click_function)+'\n';
            break;
        case "select":
            html= f.replace(/\{\{control\}\}/g,sel);
            html=html.replace(/\{\{co_des\}\}/g,obj.co_des);
            break;
        case "textarea":
            html= f.replace(/\{\{control\}\}/g,ta);
            html=html.replace(/\{\{co_des\}\}/g,obj.co_des);
            break;
        default :
            html= f.replace(/\{\{control\}\}/g,input);
            html=html.replace(/\{\{co_des\}\}/g,obj.co_des);
            break;
    }

    html= html.replace(/\{\{errs\}\}/g,errs.val);
    html=html.replace(/\{\{required\}\}/g,errs.required);
    html=html.replace(/\{\{minlength\}\}/g,errs.minlength);
    html=html.replace(/\{\{maxlength\}\}/g,errs.maxlength);
    html=html.replace(/\{\{pattern\}\}/g,errs.pattern);
    html=html.replace(/\{\{blur\}\}/g,errs.blur);

    html=html.replace(/\{\{min\}\}/g,errs.min);
    html=html.replace(/\{\{max\}\}/g,errs.max);
    html=html.replace(/\{\{co_name\}\}/g,obj.co_name);
    html=html.replace(/\{\{co_type\}\}/g,obj.co_type);

    //html=html.replace(/\{\{blur_function\}\}/g,decodeURIComponent(obj.co_blur_function));

    if(typeof obj.co_blur_function!=="undefined")
        js+=decodeURIComponent(obj.co_blur_function)+'\n';
    var obj={};
    obj.js=js;
    obj.html=html;
    return obj;
}
//---------------------------------------- 得到JS --------------------------------------------//
var getJS=function(str){
    var f='\n<script>\n' +
    '\nvar  appM =angular.module("app", []);' +
    '\nappM.controller("codeorgController", [ "$scope" ,function($scope) {' +
    '\n$scope.isPost=false;' +
    '\n{{function}}' +
    '\n} ]);' +
    '\n</script>';
    f=f.replace(/\{\{function\}\}/g,str);
    return f;
}

//---------------------------------------- 得到错误提示 --------------------------------------------//
var getErrs=function(obj){
    var li='\n<p ng-show="codeorgForm.{{co_name}}.$error.{{errortype}} && (codeorgForm.{{co_name}}.$dirty || isPost)" class="help-block">{{msg}}</p>';
    var errs={required:'',minlength:'',maxlength:'',pattern:'',blur:'',min:'',max:'',click:''}

    var s='';
    for(var item in obj) {
        switch (item)
        {
            case "co_required":
                if(obj[item]!=='true') continue;
                errs.required=' required';
                var t=li.replace('{{errortype}}','required');
                t=t.replace('{{msg}}',obj.msg_required);
                s+=t;
                continue;
            case "co_minlength":
                if(!obj[item]) continue;
                errs.minlength=' ng-minlength="'+obj.co_minlength+'"';
                var t=li.replace('{{errortype}}','minlength');
                t=t.replace('{{msg}}',obj.msg_minlength);
                s+=t;
                continue;
            case "co_maxlength":
                if(!obj[item]) continue;
                errs.maxlength=' ng-maxlength="'+obj.co_maxlength+'"';
                var t=li.replace('{{errortype}}','maxlength');
                t=t.replace('{{msg}}',obj.msg_maxlength);
                s+=t;
                continue;
            case "co_pattern":
                if(!obj[item]) continue;
                errs.pattern=' ng-pattern="'+obj.co_pattern+'"';
                var t=li.replace('{{errortype}}','pattern');
                t=t.replace('{{msg}}',obj.msg_pattern);
                s+=t;
                continue;
            case "co_blur":
                if(!obj[item]) continue;
                //errs.blur=' ng-blur="'+(obj.co_blur.trim().indexOf("()")!==-1?obj.co_blur.trim():obj.co_blur.trim()+'()')+'"';
                //errs.blur=' ng-blur="'+obj.co_blur.trim()+'"';
                errs.blur=obj.co_blur.trim().indexOf("()")===-1?' ng-blur="'+obj.co_blur.trim()+'()"':' ng-blur="'+obj.co_blur.trim()+'"';
                continue;
            case "co_click":
                if(!obj[item]) continue;

                errs.click=obj.co_click.trim().indexOf("()")===-1?' ng-click="'+obj.co_click.trim()+'()"':' ng-click="'+obj.co_click.trim()+'"';
                continue;
            case "co_type":
                if(!obj[item]) continue;
                if(obj[item]=="email" || obj[item]=="number" || obj[item]=="url"){
                    var t=li.replace('{{errortype}}',obj[item]);
                    t=t.replace('{{msg}}',obj.msg_typeerr);
                    s+=t;
                }
                continue;
            case "co_min":
                if(!obj[item]) continue;
                errs.min=' min="'+obj.co_min+'"';
                var t=li.replace('{{errortype}}','min');
                t=t.replace('{{msg}}',obj.msg_min);
                s+=t;
                continue;
            case "co_max":
            if(!obj[item]) continue;
            errs.max=' max="'+obj.co_max+'"';
            var t=li.replace('{{errortype}}','max');
            t=t.replace('{{msg}}',obj.msg_max);
            s+=t;
            continue;
            default :
                continue;
        }
    }

    errs.val=s;
    return errs;
    //switch ()

}
//---------------------------------------- 得到验证项表格 --------------------------------------------//
var getTableByType=function(_t){
    _t=_t.toLowerCase();
    switch (_t){
        case "select":
            return  '<table class="table table-bordered">'+
                '<tr><td width="20%">描述</td><td width="35%">值</td><td width="45%">错误提示</td></tr>'+
                '<tr><td>name</td><td><input name="co_name" class="form-control" value="text1"></td><td>N/A</td></tr>'+
                '<tr><td>是否必选</td><td><input name="co_required" type="checkbox"  value="true"></td><td><input  name="msg_required" class="form-control" placeholder="请选择地区"></td></tr>'+
                '<tr><td>选中事件<br>如：省份，地区等连动</td><td><input name="co_change" class="form-control" value="" placeholder="onchange（ng-change）事件名"><textarea name="msg_blur" rows="3" class="form-control text-func" placeholder="function(){//代码...}"></textarea></td><td>N/A</td></tr>'+
                '</table>';
        case "radio":
        case "checkbox":
            return  '<table class="table table-bordered">'+
                '<tr><td width="20%">描述</td><td width="35%">值</td><td width="45%">错误提示</td></tr>'+
                '<tr><td>name</td><td><input name="co_name" class="form-control" value="text1"></td><td>N/A</td></tr>'+
                '<tr><td>是否必选</td><td><input name="co_required" type="checkbox"  value="true"></td><td><input  name="msg_required" class="form-control" placeholder="请选择地区"></td></tr>'+
                '</table>';
        case "button":
            return  '<table class="table table-bordered">'+
                    '<tr><td width="20%">描述</td><td width="80%">值</td></tr>'+
                    '<tr><td>提交事件</td><td><input name="co_click" class="form-control" value="saveToDataBase()" ><textarea name="co_click_function" rows="19" class="form-control text-func">$scope.saveToDataBase=function(){' +
                '$scope.isPost=true;' +

                '}</textarea></td></tr>'+
                    '</table>';
        case "number":
            return '<table class="table table-bordered">'+
                '<tr><td width="20%">描述</td><td width="35%">值</td><td width="45%">错误提示</td></tr>'+
                '<tr><td>name</td><td><input name="co_name" class="form-control" value="text1"></td><td>N/A</td></tr>'+
                '<tr><td>是否必须</td><td><input id="aaaa" name="co_required" type="checkbox" ></td><td><input  name="msg_required" class="form-control" placeholder="您输入的不能为空" value="您输入的不能为空"></td></tr>'+
                '<tr><td>最小值</td><td><input  name="co_min"  class="form-control" value=""></td><td><input name="msg_min" class="form-control" placeholder="不能小于" value="不能小于"></td></tr>'+
                '<tr><td>最大值</td><td><input  name="co_max"  class="form-control" value=""></td><td><input name="msg_max" class="form-control" placeholder="不能大于" value="不能大于"></td></tr>'+
                '<tr><td>最少长度<br>（字符串长度）</td><td><input  name="co_minlength"  class="form-control" value=""></td><td><input name="msg_minlength" class="form-control" placeholder="不能少于{0}位" value="不能少于{0}位"></td></tr>'+
                '<tr><td>最大长度</td><td><input name="co_maxlength" class="form-control" value=""></td><td><input name="msg_maxlength" class="form-control" placeholder="不能大于{0}位" value="不能大于{0}位"></td></tr>'+
                '<tr><td>数字类型</td><td>N/A</td><td><input name="msg_typeerr" class="form-control" placeholder="请输入正确的数字" value="请输入正确的数字"></td></tr>'+
                '<tr><td>正则表达式</td><td><input name="co_pattern" class="form-control"></td><td><input name="msg_pattern" class="form-control"></td></tr>'+
                '<tr><td>失去焦点事件<br>主要验证Ajax回调<br>如：email是否重复</td><td><input name="co_blur" class="form-control" value="check()" placeholder="nblur（ng-blur）事件名"><textarea name="co_blur_function" rows="3" class="form-control text-func" placeholder="function(){//代码...}">$scope.checkUser=function(){' +
                '$scope.isPost=true;' +
                'alert(1111);' +
                '}</textarea></td><td><input name="msg_blur" class="form-control" placeholder="如：用户名已经存在"></td></tr>'+
                '</table>';
        case "email":
            return '<table class="table table-bordered">'+
                '<tr><td width="20%">描述</td><td width="35%">值</td><td width="45%">错误提示</td></tr>'+
                '<tr><td>name</td><td><input name="co_name" class="form-control" value="text1"></td><td>N/A</td></tr>'+
                '<tr><td>是否必须</td><td><input id="aaaa" name="co_required" type="checkbox" ></td><td><input  name="msg_required" class="form-control" placeholder="您输入的不能为空" value="您输入的不能为空"></td></tr>'+
                '<tr><td>最少长度</td><td><input  name="co_minlength"  class="form-control" value=""></td><td><input name="msg_minlength" class="form-control" placeholder="不能少于{0}位" value="不能少于{0}位"></td></tr>'+
                '<tr><td>最大长度</td><td><input name="co_maxlength" class="form-control" value=""></td><td><input name="msg_maxlength" class="form-control" placeholder="不能大于{0}位" value="不能大于{0}位"></td></tr>'+
                '<tr><td>email类型</td><td>N/A</td><td><input name="msg_typeerr" class="form-control" placeholder="请输入合法的Email" value="请输入合法的Email"></td></tr>'+
                '<tr><td>正则表达式</td><td><input name="co_pattern" class="form-control"></td><td><input name="msg_pattern" class="form-control"></td></tr>'+
                '<tr><td>失去焦点事件<br>主要验证Ajax回调<br>如：email是否重复</td><td><input name="co_blur" class="form-control" value="check()" placeholder="nblur（ng-blur）事件名"><textarea name="co_blur_function" rows="3" class="form-control text-func" placeholder="function(){//代码...}">$scope.checkUser=function(){' +
                '$scope.isPost=true;' +
                'alert(1111);' +
                '}</textarea></td><td><input name="msg_blur" class="form-control" placeholder="如：用户名已经存在"></td></tr>'+
                '</table>';
        case "url":
            return '<table class="table table-bordered">'+
                '<tr><td width="20%">描述</td><td width="35%">值</td><td width="45%">错误提示</td></tr>'+
                '<tr><td>name</td><td><input name="co_name" class="form-control" value="text1"></td><td>N/A</td></tr>'+
                '<tr><td>是否必须</td><td><input id="aaaa" name="co_required" type="checkbox" ></td><td><input  name="msg_required" class="form-control" placeholder="您输入的不能为空" value="您输入的不能为空"></td></tr>'+
                '<tr><td>最少长度</td><td><input  name="co_minlength"  class="form-control" value=""></td><td><input name="msg_minlength" class="form-control" placeholder="不能少于{0}位" value="不能少于{0}位"></td></tr>'+
                '<tr><td>最大长度</td><td><input name="co_maxlength" class="form-control" value=""></td><td><input name="msg_maxlength" class="form-control" placeholder="不能大于{0}位" value="不能大于{0}位"></td></tr>'+
                '<tr><td>URL类型</td><td>N/A</td><td><input name="msg_typeerr" class="form-control" placeholder="请输入正确的URL" value="请输入正确的URL"></td></tr>'+
                '<tr><td>正则表达式</td><td><input name="co_pattern" class="form-control"></td><td><input name="msg_pattern" class="form-control"></td></tr>'+
                '<tr><td>失去焦点事件<br>主要验证Ajax回调<br>如：email是否重复</td><td><input name="co_blur" class="form-control" value="check()" placeholder="nblur（ng-blur）事件名"><textarea name="co_blur_function" rows="3" class="form-control text-func" placeholder="function(){//代码...}">$scope.checkUser=function(){' +
                '$scope.isPost=true;' +
                'alert(1111);' +
                '}</textarea></td><td><input name="msg_blur" class="form-control" placeholder="如：用户名已经存在"></td></tr>'+
                '</table>';
        default:
            return '<table class="table table-bordered">'+
                '<tr><td width="20%">描述</td><td width="35%">值</td><td width="45%">错误提示</td></tr>'+
                '<tr><td>name</td><td><input name="co_name" class="form-control" value="text1"></td><td>N/A</td></tr>'+
                '<tr><td>是否必须</td><td><input id="aaaa" name="co_required" type="checkbox" ></td><td><input  name="msg_required" class="form-control" placeholder="您输入的不能为空" value="您输入的不能为空"></td></tr>'+
                '<tr><td>最少长度</td><td><input  name="co_minlength"  class="form-control" value=""></td><td><input name="msg_minlength" class="form-control" placeholder="不能少于{0}位" value="不能少于{0}位"></td></tr>'+
                '<tr><td>最大长度</td><td><input name="co_maxlength" class="form-control" value=""></td><td><input name="msg_maxlength" class="form-control" placeholder="不能大于{0}位" value="不能大于{0}位"></td></tr>'+
                '<tr><td>正则表达式</td><td><input name="co_pattern" class="form-control" value="/^[A-Za-z0-9]+$/"></td><td><input name="msg_pattern" class="form-control" value="必须是：A-Za-z0-9"></td></tr>'+
                '<tr><td>失去焦点事件<br>主要验证Ajax回调<br>如：用户名是否存在</td><td><input name="co_blur" class="form-control" value="checkUser()" placeholder="onblur（ng-blur）事件名"><textarea name="co_blur_function" rows="3" class="form-control text-func" placeholder="function(){//代码...}">$scope.checkUser=function(){' +
                '$scope.isPost=true;' +
                'alert(1111);' +
                '}</textarea></td><td><input name="msg_blur" class="form-control" placeholder="如：用户名已经存在"></td></tr>'+
                '</table>';
    }
}

$('#run').click(function(){
    var html='';
    var js='';
    $('#dropzone').find('.drop-item').each(function() {
        var ci=getControlByItem($(this));
        html+=ci.html;
        js+=ci.js;
    })

    $('[name="codeorg_code"]').val(html+getJS(js));
    $('#modal-code').modal('show');
})

$('#modal-code').find('#sub_code').click(function(){

    var cc=$('#modal-code').find('[name="codeorg_code"]');
    $('#modal-code').find('[name="codeorg_cd"]').val(Base64.encode(cc.val()));
    //cc.val();
    $('[name="formcode"]').submit();
});

$('#modal-code').find('#decode').click(function(){

    var cc=$('#modal-code').find('[name="codeorg_code"]');

    cc.val(Base64.decode(cc.val()));
});