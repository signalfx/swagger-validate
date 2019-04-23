'use strict';

const validate = require('./index');

/**
 * validateDataType
 * @param {*} candidate -  value to validate
 * @param {*} dataType - model
 * @param {*} models - map of models with name as key
 * @return {Error} - errors
 */
function validateDataType(candidate, dataType, models) {
  models = models || {};

  const type = dataType.type || dataType.dataType || dataType.$ref;
  const format = dataType.format;
  const pattern = dataType.pattern;

  switch (type) {
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
    default:
      // Assumed to be complex model
      const model = models[type];
      return validate.model(candidate, model, models);
  }
}
module.exports = validateDataType;
