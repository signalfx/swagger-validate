'use strict';

const errorTypes = require('./errorTypes');
const validate = require('./index');

/**
 * validateArray
 * @param {*} candidate -  value to validate
 * @param {*} dataType - model
 * @param {*} models - map of models with name as key
 * @return {Error} - errors
 */
function validateArray(candidate, dataType, models) {
  if (!Array.isArray(candidate)) {
    return new errorTypes.NotAnArrayError(candidate, typeof candidate);
  }

  if ('maxLength' in dataType && candidate.length > dataType.maxLength) {
    return new errorTypes.ArrayLengthTooLongError(dataType.maxLength);
  }
  if ('minLength' in dataType && candidate.length < dataType.minLength) {
    return new errorTypes.ArrayLengthTooShortError(dataType.minLength);
  }

  const items = dataType.items;

  if (dataType.uniqueItems) {
    const dupeCheck = [];
    const dupes = candidate.filter(function(value) {
      let signature;
      if (items.$ref) {
        signature = JSON.stringify(value);
      } else {
        signature = value;
      }
      if (dupeCheck.indexOf(signature) !== -1) {
        return true;
      } else {
        dupeCheck.push(signature);
        return false;
      }
    });

    if (dupes.length) {
      return new errorTypes.DuplicateInSetError(candidate, dupes);
    }
  }

  const errors =[];

  if (items.$ref) {
    const model = models[items.$ref];
    candidate.map(function(value) {
      const err=validate.model(value, model, models);
      if (err) {
        errors.push(err);
      }
    });
  } else {
    candidate.map(function(value) {
      const err= validate.dataType(value, items, models);
      if (err) {
        errors.push(err);
      }
    });
  }

  if (errors.length) {
    return new errorTypes.ErrorsInArrayElementsError(errors);
  }
}

module.exports = validateArray;
