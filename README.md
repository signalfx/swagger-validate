# Validate Swagger Model

Validates objects against a given [swagger model](https://github.com/wordnik/swagger-spec/blob/master/versions/1.2.md#527-model-object). Like this:

```javascript
var catModel = {
    id: 'Cat',
    required: ['name'],
    properties: {
      name: { type: 'string' },
      age: { type: 'number' }
    }
};

var myCat = {
    name: 'Grumpy',
    age: 'blue'
};

var error = validateSwaggerModel(myCat, catModel);
// error.toString():
// ModelValidationError: "Cat" is invalid:
//   PropertyValidationError: "age" is invalid: blue must be a number, not a string
}
```

## Installation and Use
For nodejs, `npm install swagger-model-validator` then use `var validateSwaggerModel = require('validate-swagger-model')` to include it in a script.

For browsers, include the `./dist/validate-swagger-model.js` file as a script tag to put the validateSwaggerModel function in the global scope. You may also `require` it with browserify or with Requirejs instead of including it as a script tag.

## API

### var error = validateSwaggerModel(object, model[, models])
Validate an object using a given model spec.

#### Parameters
* *object* - the instance to validate against the defined model
* *model* - the model to use when validating the object
* *models* - optional map of model names to models to be used when dereferencing linked models (such as $refs or inherited properties).

#### Returns
* *error* or *undefined* - if a validation error is found, a ModelValidationError object will be returned with the details of the error(s).

### validateSwaggerModel.errors.ModelValidationError
The primary error object emitted by the validator with the following properties:
* *name* - The name of the error (always 'ModelValidationError')
* *message* - A human readable message of the error
* *model* - The model the validation errors occurred to
* *value* - The object which failed the validation
* *propertyErrors* - A list of PropertyValidationError objects for each property with an invalid property.

### validateSwaggerModel.errors.PropertyValidationError
This is the wrapper around individual property validation errors. Each property in a model will have at most one PropertyValidationError object within the ModelValidationError.propertyErrors list.

* *name* - The name of the error (always 'PropertyValidationError')
* *message* - A human readable message of the error
* *propertyName* - The name of the property with the validation error
* *property* - The property object from the model
* *innerError* - A subtype of DataTypeValidationError object with specific error details.

### validateSwaggerModel.errors.DataValidationError
This is a super class for the individual validation errors that can occur in properties. Here's a full list of the different types, all which are accessable via validateSwaggerModel.errors[*name of error*]:
* *NotAStringError* - The property was expected to be a string but wasn't.
* *NotABooleanError* - The property was expected to be a boolen but wasn't.
* *NotAnArrayError* - The property was expected to be an array but wasn't.
* *NotVoidError* - The property was expected to be void but wasn't.
* *NotANumberError* - The property was expected to be a number but wasn't.
* *NotAnIntegerError* - The property was a number but not an integer as expected.
* *NumberTooLargeError* - The property was a number but over the maximum value allowed by the model.
* *NumberTooSmallError* - The property was a number but under the minumum value allowed by the model.
* *DuplicateInSetError* - The property is an array which has duplicates, which is not allowed by the model.
* *ErrorsInArrayElementsError* - Errors occurred within the elements of an array. Depending on the type of an array these errors may be of ModelValidationError type or subtypes of DataValidationErrors.
* *MissingPropertyError* - The property is required by the model but doesn't exist.

## Developing
After installing [nodejs](http://nodejs.org) do the following:

```shell
git clone https://github.com/signalfuse/validate-swagger-model.git
cd validate-swagger-model
npm install
npm run dev
```
The build engine will test and build everything, start a server hosting the `example` folder on [localhost:3000](http://localhost:3000), and watch for any changes and rebuild when nescessary.

To generate minified files in `dist`:
```shell
npm run dist
```