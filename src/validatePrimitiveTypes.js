'use strict';
const {DateTime} = require('luxon');
const errorTypes = require('./errorTypes');

const EMAIL_RE = '[\\w!#$%&\'*+/=?^_`{|}~-]+(?:\\.[\\w!#$%&\'*+/=?^_`{|}~-]+)*@(?:[\\w](?:[\\w-]*[\\w])?\\.)+[\\w](?:[\\w-]*[\\w])?';
// Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
const PASSWORD_RE = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$';
const URL_RE = '(http|ftp|https):\\/\\/[\\w\\-_]+(\\.[\\w\\-_]+)+([\\w\\-\\.,@?^=%&:/~\\+#]*[\\w\\-\\@?^=%&/~\\+#])?';
const MOBILE_RE = '^((\\+86)|(86))?[1][3456789][0-9]{9}$';
const ISO_8601_FULL = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(([+-]\d{2}(:\d{2})?)|Z)$/;

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
      error = new errorTypes.NumberFormatError(candidate, format);
    }
  } else if (format === 'int64') {
    const int64Value = parseInt(candidate);
    if (isNaN(int64Value) || !isFinite(candidate) || candidate.toString()!==int64Value.toString()) {
      error = new errorTypes.NumberFormatError(candidate, format);
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

  if ((dataType.minimum !== undefined) && candidate <parseFloat(dataType.minimum)) {
    return new errorTypes.NumberTooSmallError(candidate, dataType.minimum);
  }

  if ((dataType.maximum !== undefined) && candidate > parseFloat(dataType.maximum)) {
    return new errorTypes.NumberTooLargeError(candidate, dataType.maximum);
  }
}
exports.validateNumber = validateNumber;


/**
 * validateBoolean
 * @param {boolean} candidate - value
 * @param {*} dataType - value
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
 * 身份证校验算法
 * @param {string} idcode 身份证号码
 * @return {bool}
 */
function isCNIdentityCard(idcode) {
  if ( typeof idcode != 'string' || idcode.length != 18 ) {
    return false;
  }
  // 加权因子
  const weightFactor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  // 校验码
  const checkCode = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

  const code = idcode + '';
  const last = idcode[17]; // 最后一位

  const seventeen = code.substring(0, 17);

  // ISO 7064:1983.MOD 11-2
  // 判断最后一位校验码是否正确
  const arr = seventeen.split('');
  const len = arr.length;
  let num = 0;
  for (let i = 0; i < len; i++) {
    num = num + parseInt(arr[i]) * weightFactor[i];
  }

  // 获取余数
  const resisue = num % 11;
  const lastNo = checkCode[resisue];

  // 格式的正则
  // 正则思路
  /*
    第一位不可能是0
    第二位到第六位可以是0-9
    第七位到第十位是年份，所以七八位为19或者20
    十一位和十二位是月份，这两位是01-12之间的数值
    十三位和十四位是日期，是从01-31之间的数值
    十五，十六，十七都是数字0-9
    十八位可能是数字0-9，也可能是X
    */
  const patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;

  // 判断格式是否正确
  const format = patter.test(idcode);

  // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
  return last === lastNo && format ? true : false;
}


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
    const regExp = new RegExp(ISO_8601_FULL);
    if ( !regExp.test(candidate) ) {
      return new errorTypes.DateFormatError(candidate, typeof candidate);
    }
    if (!DateTime.fromISO(candidate).isValid) {
      return new errorTypes.DateFormatError(candidate, typeof candidate);
    }
    // 过滤调以空格分隔日期时间的ISO8601格式
    if (candidate.indexOf(' ') >= 0) {
      return new errorTypes.DateFormatError(candidate, typeof candidate);
    }
  } else if (format === 'date') {
    const date = new Date(candidate);
    if (date.toString() === 'Invalid Date') {
      return new errorTypes.InValidDateValueError(candidate, typeof candidate);
    }
    if (candidate.length !== 10) {
      return new errorTypes.InValidDateValueError(candidate, typeof candidate);
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
      case 'CNIdentityCard':
        if (!isCNIdentityCard(candidate)) {
          return new errorTypes.RegExpValidateError(candidate, format? format : pattern);
        }
        break;
      case 'mobile':
        pattern = MOBILE_RE;
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
 * @return {bool}
 */
function validateNull(candidate, dataType) {
  if (candidate === null) {
    if ('nullable' in dataType && dataType['nullable']) return;
    return new errorTypes.IsNullError();
  }
}
exports.validateString = validateString;
