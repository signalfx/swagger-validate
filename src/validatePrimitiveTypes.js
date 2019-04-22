'use strict';

var errorTypes = require('./errorTypes');

function validateInteger(candidate, dataType, format){
  var error = validateNumber(candidate, dataType);	  var error;
  if(error) return error;	  if( !format ) {
    error = validateNumber(candidate, dataType);
  }
  else if(format === 'int32') {
    var int32Max = Math.pow(2, 31) - 1;
    var int32Value = parseInt(candidate);
    if(isNaN(int32Value) || !isFinite(candidate) || int32Value < -(int32Max + 1) || int32Value > int32Max) {
      error = new errorTypes.NotANumberError(candidate, typeof candidate);
    }
  }
  else if(format === 'int64') {
    var int64Value = parseInt(candidate);
    if(isNaN(int64Value) || !isFinite(candidate)) {
      error = new errorTypes.NotANumberError(candidate, typeof candidate);
    }
  }

   if(error) {
    return error;
  }
}
exports.validateInteger = validateInteger;

function validateNumber(candidate, dataType){
  if(!(typeof candidate === 'number' || candidate instanceof Number) || isNaN(candidate)){
    return new errorTypes.NotANumberError(candidate, typeof candidate);
  }
  
  if((dataType.minimum !== undefined) && candidate < parseInt(dataType.minimum, 10)){
    return new errorTypes.NumberTooSmallError(candidate, dataType.minimum);
  }
  
  if((dataType.maximum !== undefined) && candidate > parseInt(dataType.maximum, 10)){
    return new errorTypes.NumberTooLargeError(candidate, dataType.maximum);
  }
}
exports.validateNumber = validateNumber;

function validateBoolean(candidate){
  if(!(typeof candidate === 'boolean' || candidate instanceof Boolean)){
    return new errorTypes.NotABooleanError(candidate, typeof candidate);
  }
}
exports.validateBoolean = validateBoolean;


function validateVoid(candidate){
  if(candidate != null){
    return new errorTypes.NotVoidError(candidate, typeof candidate);
  }
}
exports.validateVoid = validateVoid;

function validateFile(){
  // Not sure how to check this, since anything could qualify as 'File'.
}
exports.validateFile = validateFile;

function validateString(candidate, dataType, format, pattern){
  if(typeof candidate !== 'string' && !(candidate instanceof String)){
    return new errorTypes.NotAStringError(candidate, typeof candidate);
  }

  if('enum' in dataType){
    if(dataType.enum.indexOf(candidate) === -1) {
      return new errorTypes.StringNotInEnumError(candidate, dataType.enum);
    }
  }
  
  if( format === 'date-time' || format === 'date' ) {
    var date = new Date(candidate);
    if(date !== 'Invalid Date' && !isNaN(date) && isNaN(candidate)) {
      if(format === 'date' && candidate.length !== 10) {
        return new errorTypes.NotADateValueError(candidate, typeof candidate);
      }
    }
    else {
      return new errorTypes.NotADateValueError(candidate, typeof candidate);
    }
  }

   if( pattern ) {
    var regExp = new RegExp(pattern);
    if( !regExp.test(candidate) ) {
      return new errorTypes.StringFormatNotValidError(candidate, pattern);
    }
  }
}
exports.validateString = validateString;