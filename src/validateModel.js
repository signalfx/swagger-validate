/* eslint-disable guard-for-in */
'use strict';

const errorTypes = require('./errorTypes');
const ConvertError = errorTypes.ConvertError;
const ValidationError = errorTypes.ValidationError;
const ValidationErrors = errorTypes.ValidationErrors;
const MissingValueError = errorTypes.MissingValueError;
const UnexpectedValueError = errorTypes.UnexpectedValueError;
const validate = require('./index');

// http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-clone-an-object
/**
 * clone
 * @param {*} obj - value
 * @return {*} clone of obj
 */
function clone(obj) {
  if (obj === null || obj === undefined || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) return obj.slice();

  const temp = {};

  for (const key in obj) {
    temp[key] = clone(obj[key]);
  }
  return temp;
}

/**
 * addInhertiedProperties
 * @param {*} model - model
 * @param {*} modelId - modelId
 * @param {*} models - map of models
 */
function addInhertiedProperties(model, modelId, models) {
  let parent;

  Object.keys(models).some(function(modelName) {
    const potentialParent = models[modelName];
    if (!potentialParent.subTypes) return;

    if (potentialParent.subTypes.indexOf(modelId) !== -1) {
      parent = potentialParent;
      return true;
    }
  });

  if (!parent) return;

  for (const propertyName in parent.properties) {
    model.properties[propertyName] = parent.properties[propertyName];
  }

  if (parent.required) model.required = model.required.concat(parent.required);

  addInhertiedProperties(model, parent.id, models);
}

/**
 *
 * @param {*} candidate - value to validate
 * @param {*} model - model
 * @param {*} models - map of models
 * @param {*} options - validate options
 * @return {void} threw ValidationErrors if validate fail
 */
function validateModel(candidate, model, models, options) {
  let hasConvertError = false;

  if (candidate === null || typeof candidate !== 'object') {
    return new ValidationErrors(candidate, model);
  }

  models = models || {};
  options = options || {};

  model = clone(model);
  if (!model.required) model.required = [];
  addInhertiedProperties(model, model.id, models);

  const errors = [];

  model.required.forEach(function(propertyName) {
    if (candidate[propertyName] !== undefined) return;

    const property = model.properties[propertyName];
    const error = new MissingValueError();
    errors.push(new ValidationError(propertyName, property, error));
  });


  // set default value
  Object.keys(model.properties).forEach(function(propertyName) {
    const property = model.properties[propertyName];
    if (property.default != undefined) {
      if (candidate[propertyName] == undefined || candidate[propertyName] == null ) {
        candidate[propertyName]=property.default;
      }
    }
    if (property['trim']) {
      if (candidate[propertyName] && typeof candidate[propertyName] ==='string' ) {
        candidate[propertyName]=candidate[propertyName].trim();
      }
    }
    // convert to type
    if (property['convertType'] && property['convertType'] === property['type']) {
      if (candidate[propertyName] !== null && candidate[propertyName] !== undefined) {
        try {
          let same = (typeof candidate[propertyName] === property['type']);
          if (!same) {
            same = (property['type'] == 'array' && Array.isArray(candidate[propertyName]));
          }
          if (!same) {
            let convertValue = candidate[propertyName].toString().trim();
            switch (property['type']) {
              case 'integer':
                const value = parseInt(convertValue);
                if (convertValue !== value.toString()) {
                  convertValue = null;
                } else {
                  convertValue = value;
                }
                break;
              case 'number':
                convertValue = Number(convertValue);
                break;
              case 'boolean':
                if (convertValue === 'true') {
                  convertValue = true;
                } else if (convertValue === 'false') {
                  convertValue = false;
                } else {
                  hasConvertError = true;
                  throw new ConvertError(candidate[propertyName], property['type']);
                }
                break;
              default:
                convertValue = candidate[propertyName];
                break;
            }
            if (convertValue === null) {
              hasConvertError = true;
              throw new ConvertError(candidate[propertyName], property['type']);
            }
            candidate[propertyName] = convertValue;
          }
        } catch (e) {
          errors.push(new ValidationError(propertyName, propertyName, e));
        }
      }
    }
  });


  Object.keys(candidate).forEach(function(propertyName) {
    const property = model.properties[propertyName];

    if (!property) {
      if ( options.checkUnexpectedValues ) {
        errors.push(new ValidationError(propertyName, propertyName, new UnexpectedValueError()));
      }
      return;
    }

    if (candidate[propertyName]===null && property.nullable===true) {
      return;
    }

    if (!hasConvertError) {
      const error = validate.dataType(candidate[propertyName], property, models);
      if (error) {
        errors.push(new ValidationError(propertyName, property, error));
      }
    }
  });


  if (errors.length) {
    return new ValidationErrors(candidate, model.id, model, errors);
  }
}
module.exports = validateModel;
