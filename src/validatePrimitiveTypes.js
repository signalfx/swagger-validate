'use strict';

const moment = require('moment');
const errorTypes = require('./errorTypes');

/**
 * validateInteger
 * @param {int} candidate - value
 * @param {object} dataType - model
 * @param {string} format - format
 * @return {Error}
 */
function validateInteger(candidate, dataType, format) {
  let error = validateNumber(candidate, dataType);
  if (error) return error;
  if (!format) {
    error = validateNumber(candidate, dataType);
  } else if (format === 'int32') {
    const int32Max = Math.pow(2, 31) - 1;
    const int32Value = parseInt(candidate);
    if (isNaN(int32Value) || !isFinite(candidate) || int32Value < -(int32Max + 1) || int32Value > int32Max) {
      error = new errorTypes.NotANumberError(candidate, typeof candidate);
    }
  } else if (format === 'int64') {
    const int64Value = parseInt(candidate);
    if (isNaN(int64Value) || !isFinite(candidate)) {
      error = new errorTypes.NotANumberError(candidate, typeof candidate);
    }
  }

  if (error) {
    return error;
  }
}
exports.validateInteger = validateInteger;

/**
 * validateNumber
 * @param {number} candidate - value
 * @param {object} dataType - model
 * @param {string} format - format
 * @return {Error}
 */
function validateNumber(candidate, dataType) {
  if (!(typeof candidate === 'number' || candidate instanceof Number) || isNaN(candidate)) {
    return new errorTypes.NotANumberError(candidate, typeof candidate);
  }

  if ((dataType.minimum !== undefined) && candidate < parseInt(dataType.minimum, 10)) {
    return new errorTypes.NumberTooSmallError(candidate, dataType.minimum);
  }

  if ((dataType.maximum !== undefined) && candidate > parseInt(dataType.maximum, 10)) {
    return new errorTypes.NumberTooLargeError(candidate, dataType.maximum);
  }
}
exports.validateNumber = validateNumber;


/**
 * validateBoolean
 * @param {boolean} candidate - value
 * @return {Error}
 */
function validateBoolean(candidate) {
  if (!(typeof candidate === 'boolean' || candidate instanceof Boolean)) {
    return new errorTypes.NotABooleanError(candidate, typeof candidate);
  }
}
exports.validateBoolean = validateBoolean;


/**
 * validateVoid
 * @param {*} candidate - value
 * @return {Error}
 */
function validateVoid(candidate) {
  if (candidate != null) {
    return new errorTypes.NotVoidError(candidate, typeof candidate);
  }
}
exports.validateVoid = validateVoid;

/**
 * validateFile
 */
function validateFile() {
  // Not sure how to check this, since anything could qualify as 'File'.
}
exports.validateFile = validateFile;

/**
 * validateString
 * @param {string} candidate - value
 * @param {object} dataType - model
 * @param {string} format - format
 * @param {string} pattern - pattern
 * @return {Error}
 */
function validateString(candidate, dataType, format, pattern) {
  if (typeof candidate !== 'string' && !(candidate instanceof String)) {
    return new errorTypes.NotAStringError(candidate, typeof candidate);
  }

  if ('enum' in dataType) {
    if (dataType.enum.indexOf(candidate) === -1) {
      return new errorTypes.StringNotInEnumError(candidate, dataType.enum);
    }
  }

  if (!candidate) {
    if ('allowEmpty' in dataType && dataType.allowEmpty) return;
    return new errorTypes.StringNotEmptyError(candidate, typeof candidate);
  }

  if ('max' in dataType && candidate.length > dataType.max) {
    return new errorTypes.StringTooLongError(candidate, dataType.max);
  }
  if ('min' in dataType && value.length < dataType.min) {
    return new errorTypes.StringTooShortError(candidate, dataType.min);
  }

  if ( format === 'date-time') {
    if (!moment(candidate, moment.ISO_8601, true).isValid()) {
      return new errorTypes.NotADateValueError(candidate, typeof candidate);
    }
  } else if (format === 'date') {
    const date = new Date(candidate);
    if (date !== 'Invalid Date' && !isNaN(date) && isNaN(candidate)) {
      if ( candidate.length !== 10) {
        return new errorTypes.NotADateValueError(candidate, typeof candidate);
      }
    }
  }

  if ( pattern ) {
    const regExp = new RegExp(pattern);
    if ( !regExp.test(candidate) ) {
      return new errorTypes.StringFormatNotValidError(candidate, pattern);
    }
  }
}
exports.validateString = validateString;
