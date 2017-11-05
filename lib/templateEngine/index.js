

function TemplateEngine (templateObject) {

    var template = templateObject;

    function updateObject ( obj, data ){
        for( var prop in obj){
            if ( isNestedObject( obj[prop] )== true){
                updateObject (obj[prop], data);
            } else {
                updateProperty (obj, prop, data)
            }                
        }
    }

    function isNestedObject ( objNest){
        return false;
    }

    function updateProperty ( obj, prop, data){
        var propExpression = obj[prop];
        if (propExpression==null){
            return;
        }
        propExpression = propExpression.toString();
        if ( isExpression(propExpression)==true){
            var exprType = propExpression[0];
            if ( exprType=="$"){
                try{
                    var exprResult = data[propExpression.substr(1, propExpression.length-1)];
                    obj[prop] = exprResult;
                } catch(e) {
                    console.log (e)
                }
            } else if ( exprType=="@"){

            }
        }
    }

    function isExpression ( evalProp ){
        if ( evalProp !=null){
            if (evalProp[0]=='$'){
                return true;
            } else if (evalProp[0]=='@'){
                return true;
            }
        } else{
            return false;
        }
        return false;
    }

    this.getNew = function ( dataObejct){
        var newObj = JSON.parse( JSON.stringify(templateObject));
        updateObject ( newObj, dataObejct);
        return newObj;
    }
    


    return this;
}

module.exports = TemplateEngine;