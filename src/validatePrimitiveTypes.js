'use strict';

const moment = require('moment');
const errorTypes = require('./errorTypes');

const EMAIL_RE = '[\\w!#$%&\'*+/=?^_`{|}~-]+(?:\\.[\\w!#$%&\'*+/=?^_`{|}~-]+)*@(?:[\\w](?:[\\w-]*[\\w])?\\.)+[\\w](?:[\\w-]*[\\w])?';
// Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
const PASSWORD_RE = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$';
const URL_RE = '(http|ftp|https):\\/\\/[\\w\\-_]+(\\.[\\w\\-_]+)+([\\w\\-\\.,@?^=%&:/~\\+#]*[\\w\\-\\@?^=%&/~\\+#])?';

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
  if (candidate === null) return null;
  if (format === 'int32') {
    const int32Max = Math.pow(2, 31) - 1;
    const int32Value = parseInt(candidate);
    if (isNaN(int32Value) || !isFinite(candidate) || int32Value < -(int32Max + 1) || int32Value > int32Max || candidate.toString()!==int32Value.toString()) {
      error = new errorTypes.NotANumberError(candidate, typeof candidate);
    }
  } else if (format === 'int64') {
    const int64Value = parseInt(candidate);
    if (isNaN(int64Value) || !isFinite(candidate) || candidate.toString()!==int64Value.toString()) {
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
  const error = validateNull(candidate, dataType);
  if (error) return error;
  if (candidate == null) return;
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
function validateBoolean(candidate, dataType) {
  const error = validateNull(candidate, dataType);
  if (error) return error;
  if (candidate == null) return;
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
 * @param {string | RegExp } pattern - pattern
 * @return {Error}
 */
function validateString(candidate, dataType, format, pattern) {
  const error = validateNull(candidate, dataType);
  if (error) return error;
  if (candidate == null) return;

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
  if ('min' in dataType && candidate.length < dataType.min) {
    return new errorTypes.StringTooShortError(candidate, dataType.min);
  }

  if ( format === 'date-time') {
    if (!moment(candidate, moment.ISO_8601, true).isValid()) {
      return new errorTypes.DateFormatError(candidate, typeof candidate);
    }
    // 过滤调以空格分隔日期时间的ISO8601格式
    if (candidate.indexOf(' ') >= 0) {
      return new errorTypes.DateFormatError(candidate, typeof candidate);
    }
  } else if (format === 'date') {
    const date = new Date(candidate);
    if (date !== 'Invalid Date' && !isNaN(date) && isNaN(candidate)) {
      if ( candidate.length !== 10) {
        return new errorTypes.InValidDateValueError(candidate, typeof candidate);
      }
    }
  }

  if (format) {
    switch (format) {
      case 'url':
        pattern = URL_RE;
        break;
      case 'email':
        pattern = EMAIL_RE;
        break;
      case 'password':
        pattern= PASSWORD_RE;
        break;
    }
  }

  if ( pattern ) {
    const regExp = new RegExp(pattern);
    if ( !regExp.test(candidate) ) {
      return new errorTypes.RegExpValidateError(candidate, format? format : pattern);
    }
  }
}

/**
 * validateNull
 * chack if candidate is null dataType['nullable'] is default to be false
 * @param {*} candidate - value
 * @param {*} dataType - datatype
 * @return
 */
function validateNull(candidate, dataType) {
  if (candidate === null) {
    if ('nullable' in dataType && dataType['nullable']) return;
    return new errorTypes.IsNullError();
  }
}
exports.validateString = validateString;
