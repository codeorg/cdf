var fr = require('./formRule');
var test = require('./test');
String.prototype.toControls=function(){
    return fr.toRoles(this);
}

String.prototype.isRequired=function(){
    return !!this;
}

String.prototype.isEmail=function(){
    return false;
}
String.prototype.isNumber=function(min){
  return /([0-9]+)(\.[0-9]+)?/.test(this);
}
String.prototype.isMin=function(min){
    if(!min||!min.isNumber()) return true;
    return this>=min;
}
String.prototype.isMax=function(max){
    if(!max||!max.isNumber()) return true;
    return max>=this;
}
String.prototype.isMinlength=function(minlength){
    if(!minlength) return true;
    return this.length>=minlength;
}

String.prototype.isMaxlength=function(maxlength){
    if(!maxlength) return true;
    return maxlength>=this.length;
}

String.prototype.isPattern=function(pat){
    if(!pat) return true;
    var reg = new RegExp(pat);
    return reg.test(this);
}


String.prototype.toFirstUpper=function() {
    //var str = this.toLowerCase();
    return this.toLowerCase().replace(/\b(\w)|\s(\w)/g,function(m){return m.toUpperCase()})

}

String.prototype.formatFunc=function(arg){
    if(!arg)return "is"+this.replace("ng-","").toFirstUpper()+"()";
    return "is"+this.replace("ng-","").toFirstUpper()+"('"+arg+"')";
}


String.prototype.getField=function(){
    return this.substr(this.indexOf('.')+1);
    //return fr.toRoles(this);
}

String.prototype.getDB=function(){
    return this.substr(0,this.indexOf('.'));
    //return fr.toRoles(this);
}
