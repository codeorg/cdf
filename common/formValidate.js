var fs = require('./stringX');
var validate=function(rules,data){
    var _obj= {success:true,msg:"success"};
    //var data={name500207:"kalaco",email:"sssss@ssss"};
    if(!rules)return _obj;
    for(var i in rules){
        var rule=rules[i];
        var field=rule["ng-model"].getField();
        if(!data.hasOwnProperty(field)){
            _obj.success=false;
            _obj.msg="该数据为外部提交数据";
            return _obj;
        }
        var _val=data[field];
        for(var attr in rule){
            if(typeof rule[attr]  === 'string')continue;
            if(!rule[attr].value)continue;
            if(rule[attr].value=="number"){
                console.log(attr+"---------------------="+rule[attr]);
                if(!_val.isNumber())return{success:false,msg:rule[attr].msg};
                if(_val.isMin(rule[attr].min.value))return{success:false,msg:rule[attr].min.msg};
                if(_val.isMax(rule[attr].max.value))return{success:false,msg:rule[attr].max.msg};
            }
            else if(attr==rule[attr].value){
               //requried email url　三种情况
                if(!eval('_val.'+attr.formatFunc())){
                    console.log(attr+"----------------------------="+rule[attr]);
                    return{success:false,msg:rule[attr].msg}
                }
            }
            else if(attr[attr.length-1]==")"){
            //事件
            }
            else {
                //ng-minlength,ng-maxlength,ng-pattern
                if(!eval('_val.'+attr.formatFunc(rule[attr].value))){
                    return{success:false,msg:rule[attr].msg}
                }
            }


        }

    }
    return _obj;
}

exports.validate = validate;