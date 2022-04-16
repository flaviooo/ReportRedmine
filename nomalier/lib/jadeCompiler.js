var _jade = require('jade');
var fs = require('fs');
     let compiledTemplate = '';
    exports.compile = function(relativeTemplatePath, data   , next ){
    var absoluteTemplatePath = relativeTemplatePath + '.jade';
    _jade.renderFile(absoluteTemplatePath, data, function(err, compiledTemplate){
    if(err){
      throw new Error('Problem compiling template(double check relative template path): ' + relativeTemplatePath);
     }
    console.log('[INFO] COMPILED TEMPLATE: ', compiledTemplate);
    next(null, compiledTemplate);

     });
};