'use strict';

/* jshint -W053 */

const validateArray = require('./validateArray');
const errorTypes = require('./errorTypes');

describe('array validator', function() {
  it('exists', function() {
    expect(validateArray).toBeDefined();
  });

  it('doesn\'t throw errors for valid values', function() {
    /**
     * test
     * @param {*} value - value
     * @param {*} dataType - model
     */
    function test(value, dataType) {
      const result = validateArray(value, dataType);
      expect(result).toBeUndefined();
    }

    const stringArrayDataType = {
      items: {
        type: 'string',
      },
    };

    test([], stringArrayDataType);
    test([1, 2, 3], {
      items: {
        type: 'number',
      },
      uniqueItems: true,
    });
    test(['1', '2', '3'], stringArrayDataType);
  });

  it('throws errors for invalid values', function() {
    /**
     * test
     * @param {*} value - value
     * @param {*} dataType - model
     * @param {*} errorType - error Type
     */
    function test(value, dataType, errorType) {
      const result = validateArray(value, dataType);
      expect(result instanceof errorType).toBe(true);
    }

    const stringArrayDataType = {
      items: {
        type: 'string',
      },
    };

    test('not an array', stringArrayDataType, errorTypes.NotAnArrayError);
    test(123, stringArrayDataType, errorTypes.NotAnArrayError);
    test(String('not an array'), stringArrayDataType, errorTypes.NotAnArrayError);
    test({}, stringArrayDataType, errorTypes.NotAnArrayError);
    test(undefined, stringArrayDataType, errorTypes.NotAnArrayError);
    test([1, 2, 3], stringArrayDataType, errorTypes.ErrorsInArrayElementsError);
    test([1, 2, 1], {
      uniqueItems: true,
      items: {
        type: 'string',
      },
    }, errorTypes.DuplicateInSetError);
  });
});
