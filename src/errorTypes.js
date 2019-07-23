'use strict';

/**
 * DataTypeValidationError
 * @param {*} message - message
 */
function IsNullError(message) {
  this.name = 'IsNullError';
  this.message = message || 'Could not to be null';
}
IsNullError.prototype = Object.create(Error.prototype);
IsNullError.prototype.constructor = IsNullError;
exports.IsNullError = IsNullError;

/**
 * DataTypeValidationError
 * @param {*} message - message
 */
function DataTypeValidationError(message) {
  this.name = 'DataTypeValidationError';
  this.message = message || 'Invalid data type';
}
DataTypeValidationError.prototype = Object.create(Error.prototype);
DataTypeValidationError.prototype.constructor = DataTypeValidationError;
exports.DataTypeValidationError = DataTypeValidationError;

/**
 * NotAnIntegerError
 * @param {*} value - value
 */
function NotAnIntegerError(value) {
  this.name = 'NotAnIntegerError';
  this.message = value + ' is not an integer';
  this.value = value;
}
NotAnIntegerError.prototype = Object.create(DataTypeValidationError.prototype);
NotAnIntegerError.prototype.constructor = NotAnIntegerError;
exports.NotAnIntegerError = NotAnIntegerError;

/**
 * NotANumberError
 * @param {*} value - value
 * @param {*} actualType -actual type
 */
function NotANumberError(value, actualType) {
  this.name = 'NotANumberError';
  this.message = value + ' is not a number';
  if (actualType) this.message += ' (got a ' + actualType + ' instead)';

  this.value = value;
}
NotANumberError.prototype = Object.create(DataTypeValidationError.prototype);
NotANumberError.prototype.constructor = NotANumberError;
exports.NotANumberError = NotANumberError;


/**
 * NumberTooLargeError
 * @param {*} value - value
 * @param {*} max - max value
 */
function NumberTooLargeError(value, max) {
  this.name = 'NumberTooLargeError';
  this.message = value + ' is above the maximum of ' + max.toString();
  this.value = value;
}
NumberTooLargeError.prototype = Object.create(DataTypeValidationError.prototype);
NumberTooLargeError.prototype.constructor = NumberTooLargeError;
exports.NumberTooLargeError = NumberTooLargeError;

/**
 * NumberTooSmallError
 * @param {*} value - value
 * @param {*} min - max value
 */
function NumberTooSmallError(value, min) {
  this.name = 'NumberTooSmallError';
  this.message = value + ' is below the minimum of ' + min.toString();
  this.value = value;
}
NumberTooSmallError.prototype = Object.create(DataTypeValidationError.prototype);
NumberTooSmallError.prototype.constructor = NumberTooSmallError;
exports.NumberTooSmallError = NumberTooSmallError;

/**
 * NotABooleanError
 * @param {*} value - value
 * @param {*} actualType - actual Type
 */
function NotABooleanError(value, actualType) {
  this.name = 'NotABooleanError';
  this.message = value + ' is not a boolean';
  if (actualType) this.message += ' (got a ' + actualType + ' instead)';

  this.value = value;
}
NotABooleanError.prototype = Object.create(DataTypeValidationError.prototype);
NotABooleanError.prototype.constructor = NotABooleanError;
exports.NotABooleanError = NotABooleanError;

/**
 * NotAnArrayError
 * @param {*} value - value
 * @param {*} actualType - actual Type
 */
function NotAnArrayError(value, actualType) {
  this.name = 'NotAnArrayError';
  this.message = value + ' is not an array';
  if (actualType) this.message += ' (got a ' + actualType + ' instead)';

  this.value = value;
}
NotAnArrayError.prototype = Object.create(DataTypeValidationError.prototype);
NotAnArrayError.prototype.constructor = NotAnArrayError;
exports.NotAnArrayError = NotAnArrayError;

/**
 * ArrayLengthTooLongError
 * @param {*} maxLength - max length of array
 */
function ArrayLengthTooLongError(maxLength) {
  this.name = 'ArrayLengthTooLongError';
  this.message = `array length is bigger than ${maxLength}`;
}
ArrayLengthTooLongError.prototype = Object.create(DataTypeValidationError.prototype);
ArrayLengthTooLongError.prototype.constructor = ArrayLengthTooLongError;
exports.ArrayLengthTooLongError = ArrayLengthTooLongError;

/**
 * ArrayLengthTooShortError
 * @param {*} minLength - min length of array
 */
function ArrayLengthTooShortError(minLength) {
  this.name = 'ArrayLengthTooShortError';
  this.message = `array length is smaller than ${minLength}`;
}
ArrayLengthTooShortError.prototype = Object.create(DataTypeValidationError.prototype);
ArrayLengthTooShortError.prototype.constructor = ArrayLengthTooShortError;
exports.ArrayLengthTooShortError = ArrayLengthTooShortError;

/**
 * DuplicateInSetError
 * @param {*} arr - arr
 * @param {*} dupes - dupes
 */
function DuplicateInSetError(arr, dupes) {
  this.name = 'DuplicateInSetError';
  this.message = 'Duplicates (' + dupes.join(', ') + ') found in set: [' + arr.join(', ');
  this.dupes = dupes;
  this.value = arr;
}
DuplicateInSetError.prototype = Object.create(DataTypeValidationError.prototype);
DuplicateInSetError.prototype.constructor = DuplicateInSetError;
exports.DuplicateInSetError = DuplicateInSetError;


/**
 * NotVoidError
 * @param {*} value - value
 * @param {*} actualType - actual Type
 */
function NotVoidError(value, actualType) {
  this.name = 'NotVoidError';
  this.message = value + ' is not null or undefined';
  if (actualType) this.message += ' (got a ' + actualType + ' instead)';

  this.value = value;
}
NotVoidError.prototype = Object.create(DataTypeValidationError.prototype);
NotVoidError.prototype.constructor = NotVoidError;
exports.NotVoidError = NotVoidError;


/**
 * NotAStringError
 * @param {*} value - value
 * @param {*} actualType - actual Type
 */
function ConvertError(value, type) {
  this.name = 'ConvertError';
  this.message = `${value} is not type of ${type}`;
  this.value = value;
}
ConvertError.prototype = Object.create(DataTypeValidationError.prototype);
ConvertError.prototype.constructor = ConvertError;
exports.ConvertError = ConvertError;


/**
 * NotAStringError
 * @param {*} value - value
 * @param {*} actualType - actual Type
 */
function NotAStringError(value, actualType) {
  this.name = 'NotAStringError';
  this.message = value + ' is not a string';
  if (actualType) this.message += ' (got a ' + actualType + ' instead)';

  this.value = value;
}
NotAStringError.prototype = Object.create(DataTypeValidationError.prototype);
NotAStringError.prototype.constructor = NotAStringError;
exports.NotAStringError = NotAStringError;


/**
 * StringTooLongError
 * @param {*} value - value
 * @param {*} max - max length
 */
function StringTooLongError(value, max) {
  this.name = 'StringTooLongError';
  this.message = value + ' length is bigger than  ' + max;

  this.value = value;
}
StringTooLongError.prototype = Object.create(DataTypeValidationError.prototype);
StringTooLongError.prototype.constructor = StringTooLongError;
exports.StringTooLongError = StringTooLongError;

/**
 * StringTooShortError
 * @param {*} value - value
 * @param {*} min - min length
 */
function StringTooShortError(value, min) {
  this.name = 'StringTooShortError';
  this.message = value + ' length is smaller than ' + min;

  this.value = value;
}
StringTooShortError.prototype = Object.create(DataTypeValidationError.prototype);
StringTooShortError.prototype.constructor = StringTooShortError;
exports.StringTooShortError = StringTooShortError;

/**
 * StringNotEmptyError
 * @param {*} value - value
 * @param {*} acceptableValues - acceptableValues
 */
function StringNotEmptyError(value, acceptableValues) {
  this.name = 'StringNotEmptyError';
  this.message = value + ' is empty : ' + acceptableValues;

  this.value = value;
}
StringNotEmptyError.prototype = Object.create(DataTypeValidationError.prototype);
StringNotEmptyError.prototype.constructor = StringNotEmptyError;
exports.StringNotEmptyError = StringNotEmptyError;

/**
 * StringNotInEnumError
 * @param {*} value - value
 * @param {*} acceptableValues - acceptableValues
 */
function StringNotInEnumError(value, acceptableValues) {
  this.name = 'StringNotInEnumError';
  this.message = value + ' is not an acceptable value: ' + acceptableValues;

  this.value = value;
}
StringNotInEnumError.prototype = Object.create(DataTypeValidationError.prototype);
StringNotInEnumError.prototype.constructor = StringNotInEnumError;
exports.StringNotInEnumError = StringNotInEnumError;

/**
 * StringFormatNotValidError
 * @param {*} value - value
 * @param {*} pattern - pattern
 */
function StringFormatNotValidError(value, pattern) {
  this.name = 'StringFormatNotValidError';
  this.message = value + ' is not an acceptable value: ' + pattern + ' needed!';

  this.value = value;
}
StringFormatNotValidError.prototype = Object.create(DataTypeValidationError.prototype);
StringFormatNotValidError.prototype.constructor = StringFormatNotValidError;
exports.StringFormatNotValidError = StringFormatNotValidError;

/**
 * InValidDateValueError
 * @param {*} value - value
 * @param {*} actualType - actual type
 */
function InValidDateValueError(value, actualType) {
  this.name = 'InValidDateValueError';
  this.message = value + ' is not a valid date value';
  this.value = value;
}
InValidDateValueError.prototype = Object.create(InValidDateValueError.prototype);
InValidDateValueError.prototype.constructor = InValidDateValueError;
exports.InValidDateValueError = InValidDateValueError;

/**
 * DateFormatError
 * @param {*} value - value
 * @param {*} actualType - actual type
 */
function DateFormatError(value, actualType) {
  this.name = 'DateFormatError';
  this.message = value + ' is not a valid ISO_8601 format date';
  this.value = value;
}
DateFormatError.prototype = Object.create(DateFormatError.prototype);
DateFormatError.prototype.constructor = DateFormatError;
exports.DateFormatError = DateFormatError;

/**
 * ErrorsInArrayElementsError
 * @param {*} errors - errors
 */
function ErrorsInArrayElementsError(errors) {
  this.name = 'ErrorsInArrayElementsError';
  this.message = 'Errors in array elements: \n\t' + errors.join(', \n\t');
  this.errors = errors;
}
ErrorsInArrayElementsError.prototype = Object.create(DataTypeValidationError.prototype);
ErrorsInArrayElementsError.prototype.constructor = ErrorsInArrayElementsError;
exports.ErrorsInArrayElementsError = ErrorsInArrayElementsError;

/**
 * MissingValueError
 */
function MissingValueError() {
  this.name = 'MissingValueError';

  this.message = 'This value is required but missing';
}
MissingValueError.prototype = Object.create(DataTypeValidationError.prototype);
MissingValueError.prototype.constructor = MissingValueError;
exports.MissingValueError = MissingValueError;

/**
 * UnexpectedValueError
 */
function UnexpectedValueError() {
  this.name = 'UnexpectedValueError';

  this.message = 'This value is unexpected';
}
UnexpectedValueError.prototype = Object.create(DataTypeValidationError.prototype);
UnexpectedValueError.prototype.constructor = UnexpectedValueError;
exports.UnexpectedValueError = UnexpectedValueError;

/**
 * ValidationError
 * @param {*} specName - specName
 * @param {*} spec - spec
 * @param {*} error - error
 */
function ValidationError(specName, spec, error) {
  this.name = 'ValidationError';
  this.specName = specName;
  this.spec = spec;
  this.error = error;

  this.message = error.message;
}
ValidationError.prototype = Object.create(DataTypeValidationError.prototype);
ValidationError.prototype.constructor = ValidationError;
exports.ValidationError = ValidationError;

/**
 * ValidationError
 * @param {*} value - value
 * @param {*} specName - specName
 * @param {*} spec - spec
 * @param {*} errors - errors
 */
function ValidationErrors(value, specName, spec, errors) {
  this.name = 'ValidationErrors';

  this.value = value;
  this.specName = specName;
  this.spec = spec;
  this.errors = errors || [];

  this.message = specName + ' is invalid';

  if (this.errors.length) {
    this.message += ':\n\t' + this.errors.map(function(e) {
      return e.message;
    }).join('\n\t');
  }
}
ValidationErrors.prototype = Object.create(DataTypeValidationError.prototype);
ValidationErrors.prototype.constructor = ValidationErrors;
exports.ValidationErrors = ValidationErrors;
