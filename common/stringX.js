var fr = require('./formRule');
String.prototype.toControls=function(){
    return fr.toControls(this);
}