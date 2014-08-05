!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.swaggerValidate=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

function DataTypeValidationError(message){
  this.name = 'DataTypeValidationError';
  this.message = message || 'Invalid data type';
}
DataTypeValidationError.prototype = Object.create(Error.prototype);
DataTypeValidationError.prototype.constructor = DataTypeValidationError;
exports.DataTypeValidationError = DataTypeValidationError;

function NotAnIntegerError(value){
  this.name = 'NotAnIntegerError';
  this.message = '"' + value + '" is not an integer';
  this.value = value;
}
NotAnIntegerError.prototype = Object.create(DataTypeValidationError.prototype);
NotAnIntegerError.prototype.constructor = NotAnIntegerError;
exports.NotAnIntegerError = NotAnIntegerError;

function NotANumberError(value, actualType){
  this.name = 'NotANumberError';
  this.message = '"' + value + '" is not a number';
  if(actualType) this.message += ' (got a ' + actualType + ' instead)';

  this.value = value;
}
NotANumberError.prototype = Object.create(DataTypeValidationError.prototype);
NotANumberError.prototype.constructor = NotANumberError;
exports.NotANumberError = NotANumberError;

function NumberTooLargeError(value, max){
  this.name = 'NumberTooLargeError';
  this.message = '"' + value + '" is above the maximum of ' + max.toString();
  this.value = value;
}
NumberTooLargeError.prototype = Object.create(DataTypeValidationError.prototype);
NumberTooLargeError.prototype.constructor = NumberTooLargeError;
exports.NumberTooLargeError = NumberTooLargeError;

function NumberTooSmallError(value, max){
  this.name = 'NumberTooSmallError';
  this.message = '"' + value + '" is above the maximum of ' + max.toString();
  this.value = value;
}
NumberTooSmallError.prototype = Object.create(DataTypeValidationError.prototype);
NumberTooSmallError.prototype.constructor = NumberTooSmallError;
exports.NumberTooSmallError = NumberTooSmallError;

function NotABooleanError(value, actualType){
  this.name = 'NotABooleanError';
  this.message = '"' + value + '" is not a boolean';
  if(actualType) this.message += ' (got a ' + actualType + ' instead)';

  this.value = value;
}
NotABooleanError.prototype = Object.create(DataTypeValidationError.prototype);
NotABooleanError.prototype.constructor = NotABooleanError;
exports.NotABooleanError = NotABooleanError;

function NotAnArrayError(value, actualType){
  this.name = 'NotAnArrayError';
  this.message = '"' + value + '" is not an array';
  if(actualType) this.message += ' (got a ' + actualType + ' instead)';

  this.value = value;
}
NotAnArrayError.prototype = Object.create(DataTypeValidationError.prototype);
NotAnArrayError.prototype.constructor = NotAnArrayError;
exports.NotAnArrayError = NotAnArrayError;

function DuplicateInSetError(arr, dupes){
  this.name = 'DuplicateInSetError';
  this.message = 'Duplicates ("' + dupes.join('", "') + '") found in set: ["' + arr.join('", "') + '"';
  this.dupes = dupes;
  this.value = arr;
}
DuplicateInSetError.prototype = Object.create(DataTypeValidationError.prototype);
DuplicateInSetError.prototype.constructor = DuplicateInSetError;
exports.DuplicateInSetError = DuplicateInSetError;

function NotVoidError(value, actualType){
  this.name = 'NotVoidError';
  this.message = '"' + value + '" is not null or undefined';
  if(actualType) this.message += ' (got a ' + actualType + ' instead)';

  this.value = value;
}
NotVoidError.prototype = Object.create(DataTypeValidationError.prototype);
NotVoidError.prototype.constructor = NotVoidError;
exports.NotVoidError = NotVoidError;

function NotAStringError(value, actualType){
  this.name = 'NotAStringError';
  this.message = '"' + value + '" is not a string';
  if(actualType) this.message += ' (got a ' + actualType + ' instead)';

  this.value = value;
}
NotAStringError.prototype = Object.create(DataTypeValidationError.prototype);
NotAStringError.prototype.constructor = NotAStringError;
exports.NotAStringError = NotAStringError;

function StringNotInEnumError(value, acceptableValues){
  this.name = 'StringNotInEnumError';
  this.message = '"' + value + '" is not an acceptable value: "' + acceptableValues.join('", "') + '"';
 
  this.value = value;
}
StringNotInEnumError.prototype = Object.create(DataTypeValidationError.prototype);
StringNotInEnumError.prototype.constructor = StringNotInEnumError;
exports.StringNotInEnumError = StringNotInEnumError;


function ErrorsInArrayElementsError(errors){
  this.name = 'ErrorsInArrayElementsError';
  this.message = 'Errors in array elements:\n\t' + errors.join(',\n\t');
  this.errors = errors;
}
ErrorsInArrayElementsError.prototype = Object.create(DataTypeValidationError.prototype);
ErrorsInArrayElementsError.prototype.constructor = ErrorsInArrayElementsError;
exports.ErrorsInArrayElementsError = ErrorsInArrayElementsError;

function MissingValueError(){
  this.name = 'MissingValueError';
  
  this.message = 'This value is required but missing';
}
MissingValueError.prototype = Object.create(DataTypeValidationError.prototype);
MissingValueError.prototype.constructor = MissingValueError;
exports.MissingValueError = MissingValueError;

function ValidationError(specName, spec, error){
  this.name = 'ValidationError';
  this.specName = specName;
  this.spec = spec;
  this.error = error;

  this.message = specName + ' is invalid: ' + error.message;
}
ValidationError.prototype = Object.create(DataTypeValidationError.prototype);
ValidationError.prototype.constructor = ValidationError;
exports.ValidationError = ValidationError;

function ValidationErrors(value, specName, spec, errors){
  this.name = 'ValidationErrors';

  this.value = value;
  this.specName = specName;
  this.spec = spec;
  this.errors = errors || [];

  this.message = specName + ' is invalid';

  if(this.errors.length){
    this.message += ':\n\t' + this.errors.map(function(e){ return e.message; }).join('\n\t');
  }
}
ValidationErrors.prototype = Object.create(DataTypeValidationError.prototype);
ValidationErrors.prototype.constructor = ValidationErrors;
exports.ValidationErrors = ValidationErrors;

},{}],2:[function(_dereq_,module,exports){
exports.dataType = _dereq_('./validateDataType');
exports.model = _dereq_('./validateModel');
exports.operation = _dereq_('./validateOperation');
exports.array = _dereq_('./validateArray');
exports.errors = _dereq_('./errorTypes');

var primitives = _dereq_('./validatePrimitiveTypes');
exports.primitive = {
  integer: primitives.validateInteger,
  number: primitives.validateNumber,
  string: primitives.validateString,
  boolean: primitives.validateBoolean,
  void: primitives.validateVoid,
  file: primitives.validateFile
};

},{"./errorTypes":1,"./validateArray":3,"./validateDataType":4,"./validateModel":5,"./validateOperation":6,"./validatePrimitiveTypes":7}],3:[function(_dereq_,module,exports){
'use strict';

var errorTypes = _dereq_('./errorTypes'),
  validate = _dereq_('./index');

function validateArray(candidate, dataType, models){
  if(!Array.isArray(candidate)){
    return new errorTypes.NotAnArrayError(candidate, typeof candidate);
  }

  var items = dataType.items;

  if(dataType.uniqueItems){
    var dupeCheck = [];
    var dupes = candidate.filter(function(value){
      var signature;
      if(items.$ref){
        signature = JSON.stringify(value);
      } else {
        signature = value;
      }
      if(dupeCheck.indexOf(signature) !== -1){
        return true;
      } else {
        dupeCheck.push(signature);
        return false;
      }
    });

    if(dupes.length) {
      return new errorTypes.DuplicateInSetError(candidate, dupes);
    }
  }

  var errors;

  if(items.$ref){
    var model = models[items.$ref];
    errors = candidate.filter(function(value){
      return validate.model(value, model, models);
    });
  } else {
    errors = candidate.filter(function(value){
      return validate.dataType(value, items, models);
    });
  }

  if(errors.length){
    return new errorTypes.ErrorsInArrayElementsError(errors);
  }
}
module.exports = validateArray;
},{"./errorTypes":1,"./index":2}],4:[function(_dereq_,module,exports){
'use strict';

var validate = _dereq_('./index');
  
function validateDataType(candidate, dataType, models){
  models = models || {};
      
  var type = dataType.type || dataType.dataType || dataType.$ref;

  switch(type){
    case 'integer':
      return validate.primitive.integer(candidate, dataType);
    case 'number':
      return validate.primitive.number(candidate, dataType);
    case 'string':
      return validate.primitive.string(candidate, dataType);
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
      var model = models[type];
      return validate.model(candidate, model, models);
  }
}
module.exports = validateDataType;
},{"./index":2}],5:[function(_dereq_,module,exports){
'use strict';

var errorTypes = _dereq_('./errorTypes'),
  ValidationError = errorTypes.ValidationError,
  ValidationErrors = errorTypes.ValidationErrors,
  MissingValueError = errorTypes.MissingValueError,
  validate = _dereq_('./index');

// http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-clone-an-object
function clone(obj){
    if(obj === null || obj === undefined || typeof obj !== 'object') return obj;

    if(Array.isArray(obj)) return obj.slice();

    var temp = {};

    for(var key in obj)
        temp[key] = clone(obj[key]);
    return temp;
}

function addInhertiedProperties(model, modelId, models){
  var parent;

  Object.keys(models).some(function(modelName){
    var potentialParent = models[modelName];
    if (!potentialParent.subTypes) return;

    if(potentialParent.subTypes.indexOf(modelId) !== -1){
      parent = potentialParent;
      return true;
    }
  });

  if(!parent) return;

  for(var propertyName in parent.properties){
    model.properties[propertyName] = parent.properties[propertyName];
  }
  
  if(parent.required) model.required = model.required.concat(parent.required);

  addInhertiedProperties(model, parent.id, models);
}

function validateModel(candidate, model, models){
  if(candidate === null || typeof candidate !== 'object'){
    return new ValidationErrors(candidate, model);
  }

  models = models || {};

  model = clone(model);
  if(!model.required) model.required = [];
  addInhertiedProperties(model, model.id, models);

  var errors = [];

  model.required.forEach(function(propertyName){
    if (propertyName in candidate) return;

    var property = model.properties[propertyName];
    var error = new MissingValueError();
    errors.push(new ValidationError(propertyName, property, error));
  });

  Object.keys(candidate).forEach(function(propertyName){
    var property = model.properties[propertyName];

    var error = validate.dataType(candidate[propertyName], property, models);
    if(error){
      errors.push(new ValidationError(propertyName, property, error));
    }
  });
  
  if(errors.length){
    return new ValidationErrors(candidate, model.id, model, errors);
  }
}
module.exports = validateModel;
},{"./errorTypes":1,"./index":2}],6:[function(_dereq_,module,exports){
'use strict';

var errorTypes = _dereq_('./errorTypes'),
  ValidationError = errorTypes.ValidationError,
  ValidationErrors = errorTypes.ValidationErrors,
  MissingValueError = errorTypes.MissingValueError,
  validate = _dereq_('./index');

function validateOperation(candidate, operation, models){
  var errors = [];
  
  operation.parameters.forEach(function(param){
    if (!param.required) return;
    if (param.name in candidate) return;

    var error = new MissingValueError();
    errors.push(new ValidationError(param.name, param, error));
  });


  Object.keys(candidate).forEach(function(paramName){
    var parameter = operation.parameters.filter(function(param){
      return param.name === paramName;
    })[0];

    var error = validate.dataType(candidate[paramName], parameter, models);
    if(error){
      errors.push(new ValidationError(paramName, parameter, error));
    }
  });
  
  if(errors.length){
    return new ValidationErrors(candidate, operation.nickname, operation, errors);
  }
}
module.exports = validateOperation;
},{"./errorTypes":1,"./index":2}],7:[function(_dereq_,module,exports){
'use strict';

var errorTypes = _dereq_('./errorTypes');

function validateInteger(candidate, dataType){
  var error = validateNumber(candidate, dataType);
  if(error) return error;

  if(candidate % 1){
    return new errorTypes.NotAnIntegerError(candidate);
  }
}
exports.validateInteger = validateInteger;

function validateNumber(candidate, dataType){
  if(!(typeof candidate === 'number' || candidate instanceof Number) || isNaN(candidate)){
    return new errorTypes.NotANumberError(candidate, typeof candidate);
  }
  
  if(('minimum' in dataType) && candidate < parseInt(dataType.minimum, 10)){
    return new errorTypes.NumberTooSmallError(candidate, dataType.minimum);
  }
  
  if(('maximum' in dataType) && candidate > parseInt(dataType.maximum, 10)){
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

function validateString(candidate, dataType){
  if(typeof candidate !== 'string' && !(candidate instanceof String)){
    return new errorTypes.NotAStringError(candidate, typeof candidate);
  }

  if('enum' in dataType){
    if(dataType.enum.indexOf(candidate) === -1) {
      return new errorTypes.StringNotInEnumError(candidate, dataType.enum);
    }
  }
}
exports.validateString = validateString;
},{"./errorTypes":1}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImM6XFxVc2Vyc1xcb3phblxcY29kZVxcc3dhZ2dlci12YWxpZGF0ZVxcbm9kZV9tb2R1bGVzXFxib2lsZXJwbGF0ZS1ndWxwXFxub2RlX21vZHVsZXNcXGJyb3dzZXJpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsImM6L1VzZXJzL296YW4vY29kZS9zd2FnZ2VyLXZhbGlkYXRlL3NyYy9lcnJvclR5cGVzLmpzIiwiYzovVXNlcnMvb3phbi9jb2RlL3N3YWdnZXItdmFsaWRhdGUvc3JjL2luZGV4LmpzIiwiYzovVXNlcnMvb3phbi9jb2RlL3N3YWdnZXItdmFsaWRhdGUvc3JjL3ZhbGlkYXRlQXJyYXkuanMiLCJjOi9Vc2Vycy9vemFuL2NvZGUvc3dhZ2dlci12YWxpZGF0ZS9zcmMvdmFsaWRhdGVEYXRhVHlwZS5qcyIsImM6L1VzZXJzL296YW4vY29kZS9zd2FnZ2VyLXZhbGlkYXRlL3NyYy92YWxpZGF0ZU1vZGVsLmpzIiwiYzovVXNlcnMvb3phbi9jb2RlL3N3YWdnZXItdmFsaWRhdGUvc3JjL3ZhbGlkYXRlT3BlcmF0aW9uLmpzIiwiYzovVXNlcnMvb3phbi9jb2RlL3N3YWdnZXItdmFsaWRhdGUvc3JjL3ZhbGlkYXRlUHJpbWl0aXZlVHlwZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZnVuY3Rpb24gRGF0YVR5cGVWYWxpZGF0aW9uRXJyb3IobWVzc2FnZSl7XHJcbiAgdGhpcy5uYW1lID0gJ0RhdGFUeXBlVmFsaWRhdGlvbkVycm9yJztcclxuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlIHx8ICdJbnZhbGlkIGRhdGEgdHlwZSc7XHJcbn1cclxuRGF0YVR5cGVWYWxpZGF0aW9uRXJyb3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUpO1xyXG5EYXRhVHlwZVZhbGlkYXRpb25FcnJvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBEYXRhVHlwZVZhbGlkYXRpb25FcnJvcjtcclxuZXhwb3J0cy5EYXRhVHlwZVZhbGlkYXRpb25FcnJvciA9IERhdGFUeXBlVmFsaWRhdGlvbkVycm9yO1xyXG5cclxuZnVuY3Rpb24gTm90QW5JbnRlZ2VyRXJyb3IodmFsdWUpe1xyXG4gIHRoaXMubmFtZSA9ICdOb3RBbkludGVnZXJFcnJvcic7XHJcbiAgdGhpcy5tZXNzYWdlID0gJ1wiJyArIHZhbHVlICsgJ1wiIGlzIG5vdCBhbiBpbnRlZ2VyJztcclxuICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbn1cclxuTm90QW5JbnRlZ2VyRXJyb3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShEYXRhVHlwZVZhbGlkYXRpb25FcnJvci5wcm90b3R5cGUpO1xyXG5Ob3RBbkludGVnZXJFcnJvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBOb3RBbkludGVnZXJFcnJvcjtcclxuZXhwb3J0cy5Ob3RBbkludGVnZXJFcnJvciA9IE5vdEFuSW50ZWdlckVycm9yO1xyXG5cclxuZnVuY3Rpb24gTm90QU51bWJlckVycm9yKHZhbHVlLCBhY3R1YWxUeXBlKXtcclxuICB0aGlzLm5hbWUgPSAnTm90QU51bWJlckVycm9yJztcclxuICB0aGlzLm1lc3NhZ2UgPSAnXCInICsgdmFsdWUgKyAnXCIgaXMgbm90IGEgbnVtYmVyJztcclxuICBpZihhY3R1YWxUeXBlKSB0aGlzLm1lc3NhZ2UgKz0gJyAoZ290IGEgJyArIGFjdHVhbFR5cGUgKyAnIGluc3RlYWQpJztcclxuXHJcbiAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG59XHJcbk5vdEFOdW1iZXJFcnJvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKERhdGFUeXBlVmFsaWRhdGlvbkVycm9yLnByb3RvdHlwZSk7XHJcbk5vdEFOdW1iZXJFcnJvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBOb3RBTnVtYmVyRXJyb3I7XHJcbmV4cG9ydHMuTm90QU51bWJlckVycm9yID0gTm90QU51bWJlckVycm9yO1xyXG5cclxuZnVuY3Rpb24gTnVtYmVyVG9vTGFyZ2VFcnJvcih2YWx1ZSwgbWF4KXtcclxuICB0aGlzLm5hbWUgPSAnTnVtYmVyVG9vTGFyZ2VFcnJvcic7XHJcbiAgdGhpcy5tZXNzYWdlID0gJ1wiJyArIHZhbHVlICsgJ1wiIGlzIGFib3ZlIHRoZSBtYXhpbXVtIG9mICcgKyBtYXgudG9TdHJpbmcoKTtcclxuICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbn1cclxuTnVtYmVyVG9vTGFyZ2VFcnJvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKERhdGFUeXBlVmFsaWRhdGlvbkVycm9yLnByb3RvdHlwZSk7XHJcbk51bWJlclRvb0xhcmdlRXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTnVtYmVyVG9vTGFyZ2VFcnJvcjtcclxuZXhwb3J0cy5OdW1iZXJUb29MYXJnZUVycm9yID0gTnVtYmVyVG9vTGFyZ2VFcnJvcjtcclxuXHJcbmZ1bmN0aW9uIE51bWJlclRvb1NtYWxsRXJyb3IodmFsdWUsIG1heCl7XHJcbiAgdGhpcy5uYW1lID0gJ051bWJlclRvb1NtYWxsRXJyb3InO1xyXG4gIHRoaXMubWVzc2FnZSA9ICdcIicgKyB2YWx1ZSArICdcIiBpcyBhYm92ZSB0aGUgbWF4aW11bSBvZiAnICsgbWF4LnRvU3RyaW5nKCk7XHJcbiAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG59XHJcbk51bWJlclRvb1NtYWxsRXJyb3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShEYXRhVHlwZVZhbGlkYXRpb25FcnJvci5wcm90b3R5cGUpO1xyXG5OdW1iZXJUb29TbWFsbEVycm9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE51bWJlclRvb1NtYWxsRXJyb3I7XHJcbmV4cG9ydHMuTnVtYmVyVG9vU21hbGxFcnJvciA9IE51bWJlclRvb1NtYWxsRXJyb3I7XHJcblxyXG5mdW5jdGlvbiBOb3RBQm9vbGVhbkVycm9yKHZhbHVlLCBhY3R1YWxUeXBlKXtcclxuICB0aGlzLm5hbWUgPSAnTm90QUJvb2xlYW5FcnJvcic7XHJcbiAgdGhpcy5tZXNzYWdlID0gJ1wiJyArIHZhbHVlICsgJ1wiIGlzIG5vdCBhIGJvb2xlYW4nO1xyXG4gIGlmKGFjdHVhbFR5cGUpIHRoaXMubWVzc2FnZSArPSAnIChnb3QgYSAnICsgYWN0dWFsVHlwZSArICcgaW5zdGVhZCknO1xyXG5cclxuICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbn1cclxuTm90QUJvb2xlYW5FcnJvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKERhdGFUeXBlVmFsaWRhdGlvbkVycm9yLnByb3RvdHlwZSk7XHJcbk5vdEFCb29sZWFuRXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTm90QUJvb2xlYW5FcnJvcjtcclxuZXhwb3J0cy5Ob3RBQm9vbGVhbkVycm9yID0gTm90QUJvb2xlYW5FcnJvcjtcclxuXHJcbmZ1bmN0aW9uIE5vdEFuQXJyYXlFcnJvcih2YWx1ZSwgYWN0dWFsVHlwZSl7XHJcbiAgdGhpcy5uYW1lID0gJ05vdEFuQXJyYXlFcnJvcic7XHJcbiAgdGhpcy5tZXNzYWdlID0gJ1wiJyArIHZhbHVlICsgJ1wiIGlzIG5vdCBhbiBhcnJheSc7XHJcbiAgaWYoYWN0dWFsVHlwZSkgdGhpcy5tZXNzYWdlICs9ICcgKGdvdCBhICcgKyBhY3R1YWxUeXBlICsgJyBpbnN0ZWFkKSc7XHJcblxyXG4gIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxufVxyXG5Ob3RBbkFycmF5RXJyb3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShEYXRhVHlwZVZhbGlkYXRpb25FcnJvci5wcm90b3R5cGUpO1xyXG5Ob3RBbkFycmF5RXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTm90QW5BcnJheUVycm9yO1xyXG5leHBvcnRzLk5vdEFuQXJyYXlFcnJvciA9IE5vdEFuQXJyYXlFcnJvcjtcclxuXHJcbmZ1bmN0aW9uIER1cGxpY2F0ZUluU2V0RXJyb3IoYXJyLCBkdXBlcyl7XHJcbiAgdGhpcy5uYW1lID0gJ0R1cGxpY2F0ZUluU2V0RXJyb3InO1xyXG4gIHRoaXMubWVzc2FnZSA9ICdEdXBsaWNhdGVzIChcIicgKyBkdXBlcy5qb2luKCdcIiwgXCInKSArICdcIikgZm91bmQgaW4gc2V0OiBbXCInICsgYXJyLmpvaW4oJ1wiLCBcIicpICsgJ1wiJztcclxuICB0aGlzLmR1cGVzID0gZHVwZXM7XHJcbiAgdGhpcy52YWx1ZSA9IGFycjtcclxufVxyXG5EdXBsaWNhdGVJblNldEVycm9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRGF0YVR5cGVWYWxpZGF0aW9uRXJyb3IucHJvdG90eXBlKTtcclxuRHVwbGljYXRlSW5TZXRFcnJvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBEdXBsaWNhdGVJblNldEVycm9yO1xyXG5leHBvcnRzLkR1cGxpY2F0ZUluU2V0RXJyb3IgPSBEdXBsaWNhdGVJblNldEVycm9yO1xyXG5cclxuZnVuY3Rpb24gTm90Vm9pZEVycm9yKHZhbHVlLCBhY3R1YWxUeXBlKXtcclxuICB0aGlzLm5hbWUgPSAnTm90Vm9pZEVycm9yJztcclxuICB0aGlzLm1lc3NhZ2UgPSAnXCInICsgdmFsdWUgKyAnXCIgaXMgbm90IG51bGwgb3IgdW5kZWZpbmVkJztcclxuICBpZihhY3R1YWxUeXBlKSB0aGlzLm1lc3NhZ2UgKz0gJyAoZ290IGEgJyArIGFjdHVhbFR5cGUgKyAnIGluc3RlYWQpJztcclxuXHJcbiAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG59XHJcbk5vdFZvaWRFcnJvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKERhdGFUeXBlVmFsaWRhdGlvbkVycm9yLnByb3RvdHlwZSk7XHJcbk5vdFZvaWRFcnJvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBOb3RWb2lkRXJyb3I7XHJcbmV4cG9ydHMuTm90Vm9pZEVycm9yID0gTm90Vm9pZEVycm9yO1xyXG5cclxuZnVuY3Rpb24gTm90QVN0cmluZ0Vycm9yKHZhbHVlLCBhY3R1YWxUeXBlKXtcclxuICB0aGlzLm5hbWUgPSAnTm90QVN0cmluZ0Vycm9yJztcclxuICB0aGlzLm1lc3NhZ2UgPSAnXCInICsgdmFsdWUgKyAnXCIgaXMgbm90IGEgc3RyaW5nJztcclxuICBpZihhY3R1YWxUeXBlKSB0aGlzLm1lc3NhZ2UgKz0gJyAoZ290IGEgJyArIGFjdHVhbFR5cGUgKyAnIGluc3RlYWQpJztcclxuXHJcbiAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG59XHJcbk5vdEFTdHJpbmdFcnJvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKERhdGFUeXBlVmFsaWRhdGlvbkVycm9yLnByb3RvdHlwZSk7XHJcbk5vdEFTdHJpbmdFcnJvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBOb3RBU3RyaW5nRXJyb3I7XHJcbmV4cG9ydHMuTm90QVN0cmluZ0Vycm9yID0gTm90QVN0cmluZ0Vycm9yO1xyXG5cclxuZnVuY3Rpb24gU3RyaW5nTm90SW5FbnVtRXJyb3IodmFsdWUsIGFjY2VwdGFibGVWYWx1ZXMpe1xyXG4gIHRoaXMubmFtZSA9ICdTdHJpbmdOb3RJbkVudW1FcnJvcic7XHJcbiAgdGhpcy5tZXNzYWdlID0gJ1wiJyArIHZhbHVlICsgJ1wiIGlzIG5vdCBhbiBhY2NlcHRhYmxlIHZhbHVlOiBcIicgKyBhY2NlcHRhYmxlVmFsdWVzLmpvaW4oJ1wiLCBcIicpICsgJ1wiJztcclxuIFxyXG4gIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxufVxyXG5TdHJpbmdOb3RJbkVudW1FcnJvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKERhdGFUeXBlVmFsaWRhdGlvbkVycm9yLnByb3RvdHlwZSk7XHJcblN0cmluZ05vdEluRW51bUVycm9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFN0cmluZ05vdEluRW51bUVycm9yO1xyXG5leHBvcnRzLlN0cmluZ05vdEluRW51bUVycm9yID0gU3RyaW5nTm90SW5FbnVtRXJyb3I7XHJcblxyXG5cclxuZnVuY3Rpb24gRXJyb3JzSW5BcnJheUVsZW1lbnRzRXJyb3IoZXJyb3JzKXtcclxuICB0aGlzLm5hbWUgPSAnRXJyb3JzSW5BcnJheUVsZW1lbnRzRXJyb3InO1xyXG4gIHRoaXMubWVzc2FnZSA9ICdFcnJvcnMgaW4gYXJyYXkgZWxlbWVudHM6XFxuXFx0JyArIGVycm9ycy5qb2luKCcsXFxuXFx0Jyk7XHJcbiAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XHJcbn1cclxuRXJyb3JzSW5BcnJheUVsZW1lbnRzRXJyb3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShEYXRhVHlwZVZhbGlkYXRpb25FcnJvci5wcm90b3R5cGUpO1xyXG5FcnJvcnNJbkFycmF5RWxlbWVudHNFcnJvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBFcnJvcnNJbkFycmF5RWxlbWVudHNFcnJvcjtcclxuZXhwb3J0cy5FcnJvcnNJbkFycmF5RWxlbWVudHNFcnJvciA9IEVycm9yc0luQXJyYXlFbGVtZW50c0Vycm9yO1xyXG5cclxuZnVuY3Rpb24gTWlzc2luZ1ZhbHVlRXJyb3IoKXtcclxuICB0aGlzLm5hbWUgPSAnTWlzc2luZ1ZhbHVlRXJyb3InO1xyXG4gIFxyXG4gIHRoaXMubWVzc2FnZSA9ICdUaGlzIHZhbHVlIGlzIHJlcXVpcmVkIGJ1dCBtaXNzaW5nJztcclxufVxyXG5NaXNzaW5nVmFsdWVFcnJvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKERhdGFUeXBlVmFsaWRhdGlvbkVycm9yLnByb3RvdHlwZSk7XHJcbk1pc3NpbmdWYWx1ZUVycm9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE1pc3NpbmdWYWx1ZUVycm9yO1xyXG5leHBvcnRzLk1pc3NpbmdWYWx1ZUVycm9yID0gTWlzc2luZ1ZhbHVlRXJyb3I7XHJcblxyXG5mdW5jdGlvbiBWYWxpZGF0aW9uRXJyb3Ioc3BlY05hbWUsIHNwZWMsIGVycm9yKXtcclxuICB0aGlzLm5hbWUgPSAnVmFsaWRhdGlvbkVycm9yJztcclxuICB0aGlzLnNwZWNOYW1lID0gc3BlY05hbWU7XHJcbiAgdGhpcy5zcGVjID0gc3BlYztcclxuICB0aGlzLmVycm9yID0gZXJyb3I7XHJcblxyXG4gIHRoaXMubWVzc2FnZSA9IHNwZWNOYW1lICsgJyBpcyBpbnZhbGlkOiAnICsgZXJyb3IubWVzc2FnZTtcclxufVxyXG5WYWxpZGF0aW9uRXJyb3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShEYXRhVHlwZVZhbGlkYXRpb25FcnJvci5wcm90b3R5cGUpO1xyXG5WYWxpZGF0aW9uRXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVmFsaWRhdGlvbkVycm9yO1xyXG5leHBvcnRzLlZhbGlkYXRpb25FcnJvciA9IFZhbGlkYXRpb25FcnJvcjtcclxuXHJcbmZ1bmN0aW9uIFZhbGlkYXRpb25FcnJvcnModmFsdWUsIHNwZWNOYW1lLCBzcGVjLCBlcnJvcnMpe1xyXG4gIHRoaXMubmFtZSA9ICdWYWxpZGF0aW9uRXJyb3JzJztcclxuXHJcbiAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gIHRoaXMuc3BlY05hbWUgPSBzcGVjTmFtZTtcclxuICB0aGlzLnNwZWMgPSBzcGVjO1xyXG4gIHRoaXMuZXJyb3JzID0gZXJyb3JzIHx8IFtdO1xyXG5cclxuICB0aGlzLm1lc3NhZ2UgPSBzcGVjTmFtZSArICcgaXMgaW52YWxpZCc7XHJcblxyXG4gIGlmKHRoaXMuZXJyb3JzLmxlbmd0aCl7XHJcbiAgICB0aGlzLm1lc3NhZ2UgKz0gJzpcXG5cXHQnICsgdGhpcy5lcnJvcnMubWFwKGZ1bmN0aW9uKGUpeyByZXR1cm4gZS5tZXNzYWdlOyB9KS5qb2luKCdcXG5cXHQnKTtcclxuICB9XHJcbn1cclxuVmFsaWRhdGlvbkVycm9ycy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKERhdGFUeXBlVmFsaWRhdGlvbkVycm9yLnByb3RvdHlwZSk7XHJcblZhbGlkYXRpb25FcnJvcnMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVmFsaWRhdGlvbkVycm9ycztcclxuZXhwb3J0cy5WYWxpZGF0aW9uRXJyb3JzID0gVmFsaWRhdGlvbkVycm9ycztcclxuIiwiZXhwb3J0cy5kYXRhVHlwZSA9IHJlcXVpcmUoJy4vdmFsaWRhdGVEYXRhVHlwZScpO1xyXG5leHBvcnRzLm1vZGVsID0gcmVxdWlyZSgnLi92YWxpZGF0ZU1vZGVsJyk7XHJcbmV4cG9ydHMub3BlcmF0aW9uID0gcmVxdWlyZSgnLi92YWxpZGF0ZU9wZXJhdGlvbicpO1xyXG5leHBvcnRzLmFycmF5ID0gcmVxdWlyZSgnLi92YWxpZGF0ZUFycmF5Jyk7XHJcbmV4cG9ydHMuZXJyb3JzID0gcmVxdWlyZSgnLi9lcnJvclR5cGVzJyk7XHJcblxyXG52YXIgcHJpbWl0aXZlcyA9IHJlcXVpcmUoJy4vdmFsaWRhdGVQcmltaXRpdmVUeXBlcycpO1xyXG5leHBvcnRzLnByaW1pdGl2ZSA9IHtcclxuICBpbnRlZ2VyOiBwcmltaXRpdmVzLnZhbGlkYXRlSW50ZWdlcixcclxuICBudW1iZXI6IHByaW1pdGl2ZXMudmFsaWRhdGVOdW1iZXIsXHJcbiAgc3RyaW5nOiBwcmltaXRpdmVzLnZhbGlkYXRlU3RyaW5nLFxyXG4gIGJvb2xlYW46IHByaW1pdGl2ZXMudmFsaWRhdGVCb29sZWFuLFxyXG4gIHZvaWQ6IHByaW1pdGl2ZXMudmFsaWRhdGVWb2lkLFxyXG4gIGZpbGU6IHByaW1pdGl2ZXMudmFsaWRhdGVGaWxlXHJcbn07XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBlcnJvclR5cGVzID0gcmVxdWlyZSgnLi9lcnJvclR5cGVzJyksXHJcbiAgdmFsaWRhdGUgPSByZXF1aXJlKCcuL2luZGV4Jyk7XHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZUFycmF5KGNhbmRpZGF0ZSwgZGF0YVR5cGUsIG1vZGVscyl7XHJcbiAgaWYoIUFycmF5LmlzQXJyYXkoY2FuZGlkYXRlKSl7XHJcbiAgICByZXR1cm4gbmV3IGVycm9yVHlwZXMuTm90QW5BcnJheUVycm9yKGNhbmRpZGF0ZSwgdHlwZW9mIGNhbmRpZGF0ZSk7XHJcbiAgfVxyXG5cclxuICB2YXIgaXRlbXMgPSBkYXRhVHlwZS5pdGVtcztcclxuXHJcbiAgaWYoZGF0YVR5cGUudW5pcXVlSXRlbXMpe1xyXG4gICAgdmFyIGR1cGVDaGVjayA9IFtdO1xyXG4gICAgdmFyIGR1cGVzID0gY2FuZGlkYXRlLmZpbHRlcihmdW5jdGlvbih2YWx1ZSl7XHJcbiAgICAgIHZhciBzaWduYXR1cmU7XHJcbiAgICAgIGlmKGl0ZW1zLiRyZWYpe1xyXG4gICAgICAgIHNpZ25hdHVyZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzaWduYXR1cmUgPSB2YWx1ZTtcclxuICAgICAgfVxyXG4gICAgICBpZihkdXBlQ2hlY2suaW5kZXhPZihzaWduYXR1cmUpICE9PSAtMSl7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZHVwZUNoZWNrLnB1c2goc2lnbmF0dXJlKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGlmKGR1cGVzLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm4gbmV3IGVycm9yVHlwZXMuRHVwbGljYXRlSW5TZXRFcnJvcihjYW5kaWRhdGUsIGR1cGVzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHZhciBlcnJvcnM7XHJcblxyXG4gIGlmKGl0ZW1zLiRyZWYpe1xyXG4gICAgdmFyIG1vZGVsID0gbW9kZWxzW2l0ZW1zLiRyZWZdO1xyXG4gICAgZXJyb3JzID0gY2FuZGlkYXRlLmZpbHRlcihmdW5jdGlvbih2YWx1ZSl7XHJcbiAgICAgIHJldHVybiB2YWxpZGF0ZS5tb2RlbCh2YWx1ZSwgbW9kZWwsIG1vZGVscyk7XHJcbiAgICB9KTtcclxuICB9IGVsc2Uge1xyXG4gICAgZXJyb3JzID0gY2FuZGlkYXRlLmZpbHRlcihmdW5jdGlvbih2YWx1ZSl7XHJcbiAgICAgIHJldHVybiB2YWxpZGF0ZS5kYXRhVHlwZSh2YWx1ZSwgaXRlbXMsIG1vZGVscyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGlmKGVycm9ycy5sZW5ndGgpe1xyXG4gICAgcmV0dXJuIG5ldyBlcnJvclR5cGVzLkVycm9yc0luQXJyYXlFbGVtZW50c0Vycm9yKGVycm9ycyk7XHJcbiAgfVxyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gdmFsaWRhdGVBcnJheTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdmFsaWRhdGUgPSByZXF1aXJlKCcuL2luZGV4Jyk7XHJcbiAgXHJcbmZ1bmN0aW9uIHZhbGlkYXRlRGF0YVR5cGUoY2FuZGlkYXRlLCBkYXRhVHlwZSwgbW9kZWxzKXtcclxuICBtb2RlbHMgPSBtb2RlbHMgfHwge307XHJcbiAgICAgIFxyXG4gIHZhciB0eXBlID0gZGF0YVR5cGUudHlwZSB8fCBkYXRhVHlwZS5kYXRhVHlwZSB8fCBkYXRhVHlwZS4kcmVmO1xyXG5cclxuICBzd2l0Y2godHlwZSl7XHJcbiAgICBjYXNlICdpbnRlZ2VyJzpcclxuICAgICAgcmV0dXJuIHZhbGlkYXRlLnByaW1pdGl2ZS5pbnRlZ2VyKGNhbmRpZGF0ZSwgZGF0YVR5cGUpO1xyXG4gICAgY2FzZSAnbnVtYmVyJzpcclxuICAgICAgcmV0dXJuIHZhbGlkYXRlLnByaW1pdGl2ZS5udW1iZXIoY2FuZGlkYXRlLCBkYXRhVHlwZSk7XHJcbiAgICBjYXNlICdzdHJpbmcnOlxyXG4gICAgICByZXR1cm4gdmFsaWRhdGUucHJpbWl0aXZlLnN0cmluZyhjYW5kaWRhdGUsIGRhdGFUeXBlKTtcclxuICAgIGNhc2UgJ2Jvb2xlYW4nOlxyXG4gICAgICByZXR1cm4gdmFsaWRhdGUucHJpbWl0aXZlLmJvb2xlYW4oY2FuZGlkYXRlKTtcclxuICAgIGNhc2UgJ2FycmF5JzpcclxuICAgICAgcmV0dXJuIHZhbGlkYXRlLmFycmF5KGNhbmRpZGF0ZSwgZGF0YVR5cGUsIG1vZGVscyk7XHJcbiAgICBjYXNlICd2b2lkJzpcclxuICAgICAgcmV0dXJuIHZhbGlkYXRlLnByaW1pdGl2ZS52b2lkKGNhbmRpZGF0ZSk7XHJcbiAgICBjYXNlICdGaWxlJzpcclxuICAgICAgcmV0dXJuIHZhbGlkYXRlLnByaW1pdGl2ZS5maWxlKCk7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICAvLyBBc3N1bWVkIHRvIGJlIGNvbXBsZXggbW9kZWxcclxuICAgICAgdmFyIG1vZGVsID0gbW9kZWxzW3R5cGVdO1xyXG4gICAgICByZXR1cm4gdmFsaWRhdGUubW9kZWwoY2FuZGlkYXRlLCBtb2RlbCwgbW9kZWxzKTtcclxuICB9XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSB2YWxpZGF0ZURhdGFUeXBlOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBlcnJvclR5cGVzID0gcmVxdWlyZSgnLi9lcnJvclR5cGVzJyksXHJcbiAgVmFsaWRhdGlvbkVycm9yID0gZXJyb3JUeXBlcy5WYWxpZGF0aW9uRXJyb3IsXHJcbiAgVmFsaWRhdGlvbkVycm9ycyA9IGVycm9yVHlwZXMuVmFsaWRhdGlvbkVycm9ycyxcclxuICBNaXNzaW5nVmFsdWVFcnJvciA9IGVycm9yVHlwZXMuTWlzc2luZ1ZhbHVlRXJyb3IsXHJcbiAgdmFsaWRhdGUgPSByZXF1aXJlKCcuL2luZGV4Jyk7XHJcblxyXG4vLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEyMjEwMi93aGF0LWlzLXRoZS1tb3N0LWVmZmljaWVudC13YXktdG8tY2xvbmUtYW4tb2JqZWN0XHJcbmZ1bmN0aW9uIGNsb25lKG9iail7XHJcbiAgICBpZihvYmogPT09IG51bGwgfHwgb2JqID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHJldHVybiBvYmo7XHJcblxyXG4gICAgaWYoQXJyYXkuaXNBcnJheShvYmopKSByZXR1cm4gb2JqLnNsaWNlKCk7XHJcblxyXG4gICAgdmFyIHRlbXAgPSB7fTtcclxuXHJcbiAgICBmb3IodmFyIGtleSBpbiBvYmopXHJcbiAgICAgICAgdGVtcFtrZXldID0gY2xvbmUob2JqW2tleV0pO1xyXG4gICAgcmV0dXJuIHRlbXA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZEluaGVydGllZFByb3BlcnRpZXMobW9kZWwsIG1vZGVsSWQsIG1vZGVscyl7XHJcbiAgdmFyIHBhcmVudDtcclxuXHJcbiAgT2JqZWN0LmtleXMobW9kZWxzKS5zb21lKGZ1bmN0aW9uKG1vZGVsTmFtZSl7XHJcbiAgICB2YXIgcG90ZW50aWFsUGFyZW50ID0gbW9kZWxzW21vZGVsTmFtZV07XHJcbiAgICBpZiAoIXBvdGVudGlhbFBhcmVudC5zdWJUeXBlcykgcmV0dXJuO1xyXG5cclxuICAgIGlmKHBvdGVudGlhbFBhcmVudC5zdWJUeXBlcy5pbmRleE9mKG1vZGVsSWQpICE9PSAtMSl7XHJcbiAgICAgIHBhcmVudCA9IHBvdGVudGlhbFBhcmVudDtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIGlmKCFwYXJlbnQpIHJldHVybjtcclxuXHJcbiAgZm9yKHZhciBwcm9wZXJ0eU5hbWUgaW4gcGFyZW50LnByb3BlcnRpZXMpe1xyXG4gICAgbW9kZWwucHJvcGVydGllc1twcm9wZXJ0eU5hbWVdID0gcGFyZW50LnByb3BlcnRpZXNbcHJvcGVydHlOYW1lXTtcclxuICB9XHJcbiAgXHJcbiAgaWYocGFyZW50LnJlcXVpcmVkKSBtb2RlbC5yZXF1aXJlZCA9IG1vZGVsLnJlcXVpcmVkLmNvbmNhdChwYXJlbnQucmVxdWlyZWQpO1xyXG5cclxuICBhZGRJbmhlcnRpZWRQcm9wZXJ0aWVzKG1vZGVsLCBwYXJlbnQuaWQsIG1vZGVscyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlTW9kZWwoY2FuZGlkYXRlLCBtb2RlbCwgbW9kZWxzKXtcclxuICBpZihjYW5kaWRhdGUgPT09IG51bGwgfHwgdHlwZW9mIGNhbmRpZGF0ZSAhPT0gJ29iamVjdCcpe1xyXG4gICAgcmV0dXJuIG5ldyBWYWxpZGF0aW9uRXJyb3JzKGNhbmRpZGF0ZSwgbW9kZWwpO1xyXG4gIH1cclxuXHJcbiAgbW9kZWxzID0gbW9kZWxzIHx8IHt9O1xyXG5cclxuICBtb2RlbCA9IGNsb25lKG1vZGVsKTtcclxuICBpZighbW9kZWwucmVxdWlyZWQpIG1vZGVsLnJlcXVpcmVkID0gW107XHJcbiAgYWRkSW5oZXJ0aWVkUHJvcGVydGllcyhtb2RlbCwgbW9kZWwuaWQsIG1vZGVscyk7XHJcblxyXG4gIHZhciBlcnJvcnMgPSBbXTtcclxuXHJcbiAgbW9kZWwucmVxdWlyZWQuZm9yRWFjaChmdW5jdGlvbihwcm9wZXJ0eU5hbWUpe1xyXG4gICAgaWYgKHByb3BlcnR5TmFtZSBpbiBjYW5kaWRhdGUpIHJldHVybjtcclxuXHJcbiAgICB2YXIgcHJvcGVydHkgPSBtb2RlbC5wcm9wZXJ0aWVzW3Byb3BlcnR5TmFtZV07XHJcbiAgICB2YXIgZXJyb3IgPSBuZXcgTWlzc2luZ1ZhbHVlRXJyb3IoKTtcclxuICAgIGVycm9ycy5wdXNoKG5ldyBWYWxpZGF0aW9uRXJyb3IocHJvcGVydHlOYW1lLCBwcm9wZXJ0eSwgZXJyb3IpKTtcclxuICB9KTtcclxuXHJcbiAgT2JqZWN0LmtleXMoY2FuZGlkYXRlKS5mb3JFYWNoKGZ1bmN0aW9uKHByb3BlcnR5TmFtZSl7XHJcbiAgICB2YXIgcHJvcGVydHkgPSBtb2RlbC5wcm9wZXJ0aWVzW3Byb3BlcnR5TmFtZV07XHJcblxyXG4gICAgdmFyIGVycm9yID0gdmFsaWRhdGUuZGF0YVR5cGUoY2FuZGlkYXRlW3Byb3BlcnR5TmFtZV0sIHByb3BlcnR5LCBtb2RlbHMpO1xyXG4gICAgaWYoZXJyb3Ipe1xyXG4gICAgICBlcnJvcnMucHVzaChuZXcgVmFsaWRhdGlvbkVycm9yKHByb3BlcnR5TmFtZSwgcHJvcGVydHksIGVycm9yKSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgXHJcbiAgaWYoZXJyb3JzLmxlbmd0aCl7XHJcbiAgICByZXR1cm4gbmV3IFZhbGlkYXRpb25FcnJvcnMoY2FuZGlkYXRlLCBtb2RlbC5pZCwgbW9kZWwsIGVycm9ycyk7XHJcbiAgfVxyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gdmFsaWRhdGVNb2RlbDsiLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgZXJyb3JUeXBlcyA9IHJlcXVpcmUoJy4vZXJyb3JUeXBlcycpLFxyXG4gIFZhbGlkYXRpb25FcnJvciA9IGVycm9yVHlwZXMuVmFsaWRhdGlvbkVycm9yLFxyXG4gIFZhbGlkYXRpb25FcnJvcnMgPSBlcnJvclR5cGVzLlZhbGlkYXRpb25FcnJvcnMsXHJcbiAgTWlzc2luZ1ZhbHVlRXJyb3IgPSBlcnJvclR5cGVzLk1pc3NpbmdWYWx1ZUVycm9yLFxyXG4gIHZhbGlkYXRlID0gcmVxdWlyZSgnLi9pbmRleCcpO1xyXG5cclxuZnVuY3Rpb24gdmFsaWRhdGVPcGVyYXRpb24oY2FuZGlkYXRlLCBvcGVyYXRpb24sIG1vZGVscyl7XHJcbiAgdmFyIGVycm9ycyA9IFtdO1xyXG4gIFxyXG4gIG9wZXJhdGlvbi5wYXJhbWV0ZXJzLmZvckVhY2goZnVuY3Rpb24ocGFyYW0pe1xyXG4gICAgaWYgKCFwYXJhbS5yZXF1aXJlZCkgcmV0dXJuO1xyXG4gICAgaWYgKHBhcmFtLm5hbWUgaW4gY2FuZGlkYXRlKSByZXR1cm47XHJcblxyXG4gICAgdmFyIGVycm9yID0gbmV3IE1pc3NpbmdWYWx1ZUVycm9yKCk7XHJcbiAgICBlcnJvcnMucHVzaChuZXcgVmFsaWRhdGlvbkVycm9yKHBhcmFtLm5hbWUsIHBhcmFtLCBlcnJvcikpO1xyXG4gIH0pO1xyXG5cclxuXHJcbiAgT2JqZWN0LmtleXMoY2FuZGlkYXRlKS5mb3JFYWNoKGZ1bmN0aW9uKHBhcmFtTmFtZSl7XHJcbiAgICB2YXIgcGFyYW1ldGVyID0gb3BlcmF0aW9uLnBhcmFtZXRlcnMuZmlsdGVyKGZ1bmN0aW9uKHBhcmFtKXtcclxuICAgICAgcmV0dXJuIHBhcmFtLm5hbWUgPT09IHBhcmFtTmFtZTtcclxuICAgIH0pWzBdO1xyXG5cclxuICAgIHZhciBlcnJvciA9IHZhbGlkYXRlLmRhdGFUeXBlKGNhbmRpZGF0ZVtwYXJhbU5hbWVdLCBwYXJhbWV0ZXIsIG1vZGVscyk7XHJcbiAgICBpZihlcnJvcil7XHJcbiAgICAgIGVycm9ycy5wdXNoKG5ldyBWYWxpZGF0aW9uRXJyb3IocGFyYW1OYW1lLCBwYXJhbWV0ZXIsIGVycm9yKSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgXHJcbiAgaWYoZXJyb3JzLmxlbmd0aCl7XHJcbiAgICByZXR1cm4gbmV3IFZhbGlkYXRpb25FcnJvcnMoY2FuZGlkYXRlLCBvcGVyYXRpb24ubmlja25hbWUsIG9wZXJhdGlvbiwgZXJyb3JzKTtcclxuICB9XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSB2YWxpZGF0ZU9wZXJhdGlvbjsiLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgZXJyb3JUeXBlcyA9IHJlcXVpcmUoJy4vZXJyb3JUeXBlcycpO1xyXG5cclxuZnVuY3Rpb24gdmFsaWRhdGVJbnRlZ2VyKGNhbmRpZGF0ZSwgZGF0YVR5cGUpe1xyXG4gIHZhciBlcnJvciA9IHZhbGlkYXRlTnVtYmVyKGNhbmRpZGF0ZSwgZGF0YVR5cGUpO1xyXG4gIGlmKGVycm9yKSByZXR1cm4gZXJyb3I7XHJcblxyXG4gIGlmKGNhbmRpZGF0ZSAlIDEpe1xyXG4gICAgcmV0dXJuIG5ldyBlcnJvclR5cGVzLk5vdEFuSW50ZWdlckVycm9yKGNhbmRpZGF0ZSk7XHJcbiAgfVxyXG59XHJcbmV4cG9ydHMudmFsaWRhdGVJbnRlZ2VyID0gdmFsaWRhdGVJbnRlZ2VyO1xyXG5cclxuZnVuY3Rpb24gdmFsaWRhdGVOdW1iZXIoY2FuZGlkYXRlLCBkYXRhVHlwZSl7XHJcbiAgaWYoISh0eXBlb2YgY2FuZGlkYXRlID09PSAnbnVtYmVyJyB8fCBjYW5kaWRhdGUgaW5zdGFuY2VvZiBOdW1iZXIpIHx8IGlzTmFOKGNhbmRpZGF0ZSkpe1xyXG4gICAgcmV0dXJuIG5ldyBlcnJvclR5cGVzLk5vdEFOdW1iZXJFcnJvcihjYW5kaWRhdGUsIHR5cGVvZiBjYW5kaWRhdGUpO1xyXG4gIH1cclxuICBcclxuICBpZigoJ21pbmltdW0nIGluIGRhdGFUeXBlKSAmJiBjYW5kaWRhdGUgPCBwYXJzZUludChkYXRhVHlwZS5taW5pbXVtLCAxMCkpe1xyXG4gICAgcmV0dXJuIG5ldyBlcnJvclR5cGVzLk51bWJlclRvb1NtYWxsRXJyb3IoY2FuZGlkYXRlLCBkYXRhVHlwZS5taW5pbXVtKTtcclxuICB9XHJcbiAgXHJcbiAgaWYoKCdtYXhpbXVtJyBpbiBkYXRhVHlwZSkgJiYgY2FuZGlkYXRlID4gcGFyc2VJbnQoZGF0YVR5cGUubWF4aW11bSwgMTApKXtcclxuICAgIHJldHVybiBuZXcgZXJyb3JUeXBlcy5OdW1iZXJUb29MYXJnZUVycm9yKGNhbmRpZGF0ZSwgZGF0YVR5cGUubWF4aW11bSk7XHJcbiAgfVxyXG59XHJcbmV4cG9ydHMudmFsaWRhdGVOdW1iZXIgPSB2YWxpZGF0ZU51bWJlcjtcclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlQm9vbGVhbihjYW5kaWRhdGUpe1xyXG4gIGlmKCEodHlwZW9mIGNhbmRpZGF0ZSA9PT0gJ2Jvb2xlYW4nIHx8IGNhbmRpZGF0ZSBpbnN0YW5jZW9mIEJvb2xlYW4pKXtcclxuICAgIHJldHVybiBuZXcgZXJyb3JUeXBlcy5Ob3RBQm9vbGVhbkVycm9yKGNhbmRpZGF0ZSwgdHlwZW9mIGNhbmRpZGF0ZSk7XHJcbiAgfVxyXG59XHJcbmV4cG9ydHMudmFsaWRhdGVCb29sZWFuID0gdmFsaWRhdGVCb29sZWFuO1xyXG5cclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlVm9pZChjYW5kaWRhdGUpe1xyXG4gIGlmKGNhbmRpZGF0ZSAhPSBudWxsKXtcclxuICAgIHJldHVybiBuZXcgZXJyb3JUeXBlcy5Ob3RWb2lkRXJyb3IoY2FuZGlkYXRlLCB0eXBlb2YgY2FuZGlkYXRlKTtcclxuICB9XHJcbn1cclxuZXhwb3J0cy52YWxpZGF0ZVZvaWQgPSB2YWxpZGF0ZVZvaWQ7XHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZUZpbGUoKXtcclxuICAvLyBOb3Qgc3VyZSBob3cgdG8gY2hlY2sgdGhpcywgc2luY2UgYW55dGhpbmcgY291bGQgcXVhbGlmeSBhcyAnRmlsZScuXHJcbn1cclxuZXhwb3J0cy52YWxpZGF0ZUZpbGUgPSB2YWxpZGF0ZUZpbGU7XHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZVN0cmluZyhjYW5kaWRhdGUsIGRhdGFUeXBlKXtcclxuICBpZih0eXBlb2YgY2FuZGlkYXRlICE9PSAnc3RyaW5nJyAmJiAhKGNhbmRpZGF0ZSBpbnN0YW5jZW9mIFN0cmluZykpe1xyXG4gICAgcmV0dXJuIG5ldyBlcnJvclR5cGVzLk5vdEFTdHJpbmdFcnJvcihjYW5kaWRhdGUsIHR5cGVvZiBjYW5kaWRhdGUpO1xyXG4gIH1cclxuXHJcbiAgaWYoJ2VudW0nIGluIGRhdGFUeXBlKXtcclxuICAgIGlmKGRhdGFUeXBlLmVudW0uaW5kZXhPZihjYW5kaWRhdGUpID09PSAtMSkge1xyXG4gICAgICByZXR1cm4gbmV3IGVycm9yVHlwZXMuU3RyaW5nTm90SW5FbnVtRXJyb3IoY2FuZGlkYXRlLCBkYXRhVHlwZS5lbnVtKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuZXhwb3J0cy52YWxpZGF0ZVN0cmluZyA9IHZhbGlkYXRlU3RyaW5nOyJdfQ==
(2)
});
