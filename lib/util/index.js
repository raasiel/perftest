function Util () {
    
    var path = require('path');
    var appDir = path.dirname(require.main.filename);

    this.getProperPath = function ( path){
        return path.replace ("[$APPDIR$]", appDir);
    }
    return this;
}

module.exports = Util();

