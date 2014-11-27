var fr = require('./formRule');
var test = require('./test');
String.prototype.toControls=function(){
    return fr.toRoles(this);
}

String.prototype.test=function(){
    return test.get();
}