'use strict';

const validateDataType = require('./validateDataType');
const errorTypes = require('./errorTypes');

describe('data type validator', function() {
  it('exists', function() {
    expect(validateDataType).toBeDefined();
  });

  it('doesn\'t throw errors for valid values', function() {
    /**
     * test
     * @param {*} value - value
     * @param {*} dataType - model
     * @param {*} errorType - error Type
     */
    function test(value, dataType) {
      const result = validateDataType(value, dataType);
      expect(result).toBeUndefined();
    }

    test(0, {type: 'integer'});
    test(0.111, {type: 'number'});
    test('test', {type: 'string'});
    test(true, {type: 'boolean'});
    test([1, 2, 3], {type: 'array', items: {type: 'number'}});
    test(null, {type: 'void'});
    test(new ArrayBuffer(10), {type: 'File'});
  });

  it('throws errors for invalid values', function() {
    /**
     * test
     * @param {*} value - value
     * @param {*} dataType - model
     * @param {*} errorType - error Type
     */
    function test(value, dataType, errorType) {
      const result = validateDataType(value, dataType);
      expect(result instanceof errorType).toBe(true);
    }

    test(0.111, {type: 'integer'}, errorTypes.NotAnIntegerError);
    test('test', {type: 'number'}, errorTypes.NotANumberError);
    test(true, {type: 'string'}, errorTypes.NotAStringError);
    test([1, 2, 3], {type: 'boolean'}, errorTypes.NotABooleanError);
    test(null, {type: 'array', items: {type: 'number'}}, errorTypes.NotAnArrayError);
    test(new ArrayBuffer(10), {type: 'void'}, errorTypes.NotVoidError);
  });
});
