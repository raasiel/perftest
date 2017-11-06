function Util () {
    
    var path = require('path');
    var appDir = path.dirname(require.main.filename);

    this.getProperPath = function ( path, pathReplaceOptions){
        var ret = path.replace ("[$APPDIR$]", appDir);
        for( var key in pathReplaceOptions){
            var value = pathReplaceOptions[key];
            //console.log ( key, value, ret)            
            ret =  ret.replace("[$" + key.toUpperCase() + "$]", value)
        }
        //console.log (ret) 
        return ret;
    }
    return this;
}

module.exports = Util();

