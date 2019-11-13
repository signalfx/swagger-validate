'use strict';

const errorTypes = require('./errorTypes');
const ValidationError = errorTypes.ValidationError;
const ValidationErrors = errorTypes.ValidationErrors;
const MissingValueError = errorTypes.MissingValueError;
const validate = require('./index');

/**
 * validateOperation
 * @param {*} candidate - value to validate
 * @param {*} operation - operation
 * @param {*} models - map of models
 * @return {ValidationErrors}
 */
function validateOperation(candidate, operation, models) {
  const errors = [];

  const presentParams = operation.parameters.filter(function(param) {
    if (candidate[param.name] !== undefined) return true;

    if (param.required) {
      const error = new MissingValueError(propertyName);
      errors.push(new ValidationError(param.name, param, error));
    }

    return false;
  });

  presentParams.forEach(function(param) {
    const error = validate.dataType(candidate[param.name], param, models);
    if (error) {
      errors.push(new ValidationError(param.name, param, error));
    }
  });

  if (errors.length) {
    return new ValidationErrors(candidate, operation.nickname, operation, errors);
  }
}
module.exports = validateOperation;
