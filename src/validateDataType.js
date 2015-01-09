'use strict';

var validate = require('./index');
  
function validateDataType(candidate, dataType, models){
  models = models || {};
      
  var type = dataType.type || dataType.dataType || dataType.$ref;
  var format = dataType.format;
  var pattern = dataType.pattern;

  switch(type){
    case 'integer':
      return validate.primitive.integer(candidate, dataType, format);
    case 'number':
      return validate.primitive.number(candidate, dataType, format);
    case 'string':
      return validate.primitive.string(candidate, dataType, format, pattern);
    case 'boolean':
      return validate.primitive.boolean(candidate);
    case 'array':
      return validate.array(candidate, dataType, models);
    case 'void':
      return validate.primitive.void(candidate);
    case 'File':
      return validate.primitive.file();
    case 'date-time':
      return validate.primitive.dateTime();
    default:
      // Assumed to be complex model
      var model = models[type];
      return validate.model(candidate, model, models);
  }
}
module.exports = validateDataType;