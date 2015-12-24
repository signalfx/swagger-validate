'use strict';

var validate = require('./index');

function validateDataType(candidate, dataType, models){
  models = models || {};
  var type = dataType.type || dataType.dataType || dataType.$ref;
  var types;

  if (Array.isArray(type)) {
      types = type;
      type = 'multiple';
  }

  switch(type){
    case 'integer':
      return validate.primitive.integer(candidate, dataType);
    case 'number':
      return validate.primitive.number(candidate, dataType);
    case 'string':
      return validate.primitive.string(candidate, dataType);
    case 'boolean':
      return validate.primitive.boolean(candidate);
    case 'array':
      return validate.array(candidate, dataType, models);
    case 'void':
      return validate.primitive.void(candidate);
    case 'File':
      return validate.primitive.file();
    case 'multiple':
      var errors = [];
      Object.keys(types).forEach(function(key) {
        var error = validate.dataType(candidate, {type: types[key]} ,models);
        if (error) {
          errors.push(error);
        }
      });

      if (errors.length < type.length) {
        return null;
      } else {
        return errors;
      }
      break;
    default:
      // Assumed to be complex model
      var model = models[type];
      return validate.model(candidate, model, models);
  }
}
module.exports = validateDataType;
