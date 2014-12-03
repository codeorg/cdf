/**
 * Created by codeorg on 2014/12/2.
 */
exports.get = function (req, res,next) {
//return true;
    req.session.isAdmin=true;
    if(req.session.isAdmin){
        next();
    }else{
        //return;
        res.end("用户不存在")
    }

    // req.session.isAdmin;
};