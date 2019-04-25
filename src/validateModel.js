/* eslint-disable guard-for-in */
'use strict';

const errorTypes = require('./errorTypes');
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
  if (model.type=='object') {
    Object.keys(model.properties).forEach(function(propertyName) {
      const property = model.properties[propertyName];
      if (property.default != undefined) {
        if (candidate[propertyName] == undefined) {
          candidate[propertyName]=property.default;
        }
      }
    });
  }


  Object.keys(candidate).forEach(function(propertyName) {
    const property = model.properties[propertyName];

    if (property === undefined) {
      if ( options.checkUnexpectedValues ) {
        errors.push(new ValidationError(propertyName, propertyName, new UnexpectedValueError()));
      }
      return;
    }

    const error = validate.dataType(candidate[propertyName], property, models);
    if (error) {
      errors.push(new ValidationError(propertyName, property, error));
    }
  });


  if (errors.length) {
    return new ValidationErrors(candidate, model.id, model, errors);
  }
}
module.exports = validateModel;
