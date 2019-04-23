'use strict';

const validators = require('./validatePrimitiveTypes');
const errorTypes = require('./errorTypes');

describe('integer validator', function() {
  it('exists', function() {
    expect(validators.validateInteger).toBeDefined();
  });

  it('doesn\'t throw errors for valid values', function() {
    /**
     * test
     * @param {*} value - value
     * @param {*} dataType - data type
     */
    function test(value, dataType) {
      const result = validators.validateInteger(value, dataType);
      expect(result).toBeUndefined();
    }

    test(0, {});
    test(1, {});
    test(Number('2'), {});
    test(10, {minimum: 10});
    test(10, {maximum: 10});
    test(7, {minimum: 5, maximum: 10});
  });

  it('throws errors for invalid values', function() {
    /**
     * test
     * @param {*} value - value
     * @param {*} dataType - data type
     * @param {*} errorType - error type
     */
    function test(value, dataType, errorType) {
      const result = validators.validateInteger(value, dataType);
      expect(result instanceof errorType).toBe(true);
    }

    test(false, {}, errorTypes.NotANumberError);
    test(true, {}, errorTypes.NotANumberError);
    test('3', {}, errorTypes.NotANumberError);
    test(3.14, {}, errorTypes.NotAnIntegerError);
    test(NaN, {}, errorTypes.NotANumberError);
    test(10, {minimum: 100}, errorTypes.NumberTooSmallError);
    test(10, {maximum: 2}, errorTypes.NumberTooLargeError);
    test(7, {minimum: 8, maximum: 10}, errorTypes.NumberTooSmallError);
  });
});

describe('number validator', function() {
  it('exists', function() {
    expect(validators.validateNumber).toBeDefined();
  });

  it('doesn\'t throw errors for valid values', function() {
    /**
     * test
     * @param {*} value - value
     * @param {*} dataType - data type
     */
    function test(value, dataType) {
      const result = validators.validateNumber(value, dataType);
      expect(result).toBeUndefined();
    }

    test(0, {});
    test(1, {});
    test(Number('2'), {});
    test(10, {minimum: 10});
    test(10, {maximum: 10});
    test(5.1, {minimum: 5, maximum: 10});
  });

  it('throws errors for invalid values', function() {
    /**
     * test
     * @param {*} value - value
     * @param {*} dataType - data type
     * @param {*} errorType - error type
     */
    function test(value, dataType, errorType) {
      const result = validators.validateNumber(value, dataType);
      expect(result instanceof errorType).toBe(true);
    }

    test(false, {}, errorTypes.NotANumberError);
    test(true, {}, errorTypes.NotANumberError);
    test('3', {}, errorTypes.NotANumberError);
    test(NaN, {}, errorTypes.NotANumberError);
    test(10, {minimum: 100}, errorTypes.NumberTooSmallError);
    test(10, {maximum: 2}, errorTypes.NumberTooLargeError);
    test(7, {minimum: 8, maximum: 10}, errorTypes.NumberTooSmallError);
  });
});

describe('boolean validator', function() {
  it('exists', function() {
    expect(validators.validateBoolean).toBeDefined();
  });

  it('doesn\'t throw errors for valid values', function() {
    /**
     * test
     * @param {*} value - value
     * @param {*} dataType - data type
     */
    function test(value, dataType) {
      const result = validators.validateBoolean(value, dataType);
      expect(result).toBeUndefined();
    }

    test(false, {});
    test(true, {});
    test(Boolean(true), {});
    test(Boolean(false), {});
  });

  it('throws errors for invalid values', function() {
    /**
     * test
     * @param {*} value - value
     * @param {*} dataType - data type
     * @param {*} errorType - error type
     */
    function test(value, dataType, errorType) {
      const result = validators.validateBoolean(value, dataType);
      expect(result instanceof errorType).toBe(true);
    }

    test('false', {}, errorTypes.NotABooleanError);
    test('true', {}, errorTypes.NotABooleanError);
    test(0, {}, errorTypes.NotABooleanError);
    test(1, {}, errorTypes.NotABooleanError);
    test('popcorn', {}, errorTypes.NotABooleanError);
    test({}, {}, errorTypes.NotABooleanError);
    test(null, {}, errorTypes.NotABooleanError);
    test([], {}, errorTypes.NotABooleanError);
  });
});

describe('void validator', function() {
  it('exists', function() {
    expect(validators.validateVoid).toBeDefined();
  });

  it('doesn\'t throw errors for valid values', function() {
    /**
     * test
     * @param {*} value - value
     * @param {*} dataType - data type
     */
    function test(value, dataType) {
      const result = validators.validateVoid(value, dataType);
      expect(result).toBeUndefined();
    }

    test(null, {});
    test(undefined, {});
  });

  it('throws errors for invalid values', function() {
    /**
     * test
     * @param {*} value - value
     * @param {*} dataType - data type
     * @param {*} errorType - error type
     */
    function test(value, dataType, errorType) {
      const result = validators.validateVoid(value, dataType);
      expect(result instanceof errorType).toBe(true);
    }

    test('not void', {}, errorTypes.NotVoidError);
    test(0, {}, errorTypes.NotVoidError);
    test(false, {}, errorTypes.NotVoidError);
    test(9101, {}, errorTypes.NotVoidError);
    test(function() {}, {}, errorTypes.NotVoidError);
    test({}, {}, errorTypes.NotVoidError);
  });
});

describe('file validator', function() {
  it('exists', function() {
    expect(validators.validateFile).toBeDefined();
  });

  it('doesn\'t throw errors for valid values', function() {
    /**
     * test
     * @param {*} value - value
     * @param {*} dataType - data type
     */
    function test(value, dataType) {
      const result = validators.validateFile(value, dataType);
      expect(result).toBeUndefined();
    }

    test(123, {});
    test('my file', {});
    test(new ArrayBuffer(1), {});
    test(null, {});
    test({}, {});
  });
});

describe('string validator', function() {
  it('exists', function() {
    expect(validators.validateString).toBeDefined();
  });

  it('doesn\'t throw errors for valid values', function() {
    /**
     * test
     * @param {*} value - value
     * @param {*} dataType - data type
     */
    function test(value, dataType) {
      const result = validators.validateString(value, dataType);
      expect(result).toBeUndefined();
    }

    test('', {});
    test('test', {});
    test('123', {});
    test('false', {});
    test('one two three four', {});
    test('الفشار', {});
    test('valid', {enum: ['valid']});
    test('valid', {enum: ['a', 'valid', 'b']});
    test('', {enum: ['']});
  });

  it('throws errors for invalid values', function() {
    /**
     * test
     * @param {*} value - value
     * @param {*} dataType - data type
     * @param {*} errorType - error type
     */
    function test(value, dataType, errorType) {
      const result = validators.validateString(value, dataType);
      expect(result instanceof errorType).toBe(true);
    }

    test(null, {}, errorTypes.NotAStringError);
    test(undefined, {}, errorTypes.NotAStringError);
    test(123, {}, errorTypes.NotAStringError);
    test(function() {}, {}, errorTypes.NotAStringError);
    test({}, {}, errorTypes.NotAStringError);
    test(false, {}, errorTypes.NotAStringError);
    test('invalid', {enum: ['valid']}, errorTypes.StringNotInEnumError);
    test('', {enum: []}, errorTypes.StringNotInEnumError);
  });
});
