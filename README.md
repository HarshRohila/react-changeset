# React Changeset

It provides a react hook on top of [validated-changeset](https://github.com/validated-changeset/validated-changeset/) library (which is base library for [`ember-changeset`](https://github.com/poteto/ember-changeset))

It makes forms easy to handle

### Quick Start
For full react form codesandbox example, [view](https://codesandbox.io/s/adoring-sun-1wt6b?file=/src/App.js:229-296)

### Features

1. Check if form `isValid`, `isDirty`(changed), `changes`(what fieds are changed), `errors`(error messages) without any extra logic
2. Define validations for each form field in declarative way (based on [ember-changeset-validations](https://github.com/poteto/ember-changeset-validations))

## Steps to use

1. Define initial values of your form with all fields

```js
const user = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};
```

2. Pass it to changeset hook to get changeset

```js
import { useChangeset, lookupValidator } from 'react-changeset';

// without validations
const userChangeset = useChangeset(user);

// with validations
const userChangeset = useChangeset(
  user,
  lookupValidator(validationMap),
  validationMap
);
```

Example validation map [here](##validation-map)

3. Bind changeset to react form fields

```jsx
<input
  type="text"
  value={userChangeset.get('name')}
  onChange={({ target }) => {
    userChangeset.set('name', target.value);
  }}
/>
```

4. Enjoy changeset features, like

- Get only changed fields to send for PUT/PATCH request

```jsx
userChangeset.changes;
```

- Enable/Disable submit button

```jsx
<input
  type="submit"
  disabled={!(userChangeset.isDirty && userChangeset.isValid)}
/>
```

- Show errors for each field

```jsx
userChangeset.error.username && userChangeset.error.username.validation[0];
```

For complete changeset API, visit [validated-changeset](https://github.com/validated-changeset/validated-changeset/)

For full react form example, [view](https://codesandbox.io/s/adoring-sun-1wt6b?file=/src/App.js:229-296)

## Validation Map

```js
// validations/user-form.js
import {
  validateLength,
  validateFormat,
  validatePresence,
  validateConfirmation,
} from 'react-changeset';

const validationMap = {
  name: [validateLength({ min: 8 })],
  email: [validateFormat({ type: 'email' })],
  password: [validateLength({ min: 5 }), validatePresence(true)],
  confirmPassword: [validateConfirmation({ on: 'password' })],
};

export default validationMap;
```

## Available Validation Functions
* These are similar to [ember-changeset-validations](https://github.com/poteto/ember-changeset-validations). But without ember dependencies
#### `presence`

Validates presence/absence of a value.

```js
{
  propertyName: validatePresence(true), // must be present
  propertyName: validatePresence(false) // must be blank
  propertyName: validatePresence({ presence: true }) // alternative option syntax
  propertyName: validatePresence({ presence: true, ignoreBlank: true }) // If ignoreBlank true, treats an empty or whitespace string as not present.
  propertyName: validatePresence({ presence: true, message: "Property not present" }) // custom error message
}
```

* All validators accepts `message` property for custom error message

#### `length`

Validates the length of a `String`

```js
{
  propertyName: validateLength({ min: 1 }), // 1 or more
  propertyName: validateLength({ max: 8 }), // up to 8
  propertyName: validateLength({ min: 1, max: 8 }), // between 1 and 8 (inclusive)
  propertyName: validateLength({ is: 16 }), // exactly 16
}
```
#### `number`

Validates various properties of a number.
```js
{
  propertyName: validateNumber({ is: 16 }), // exactly 16
  propertyName: validateNumber({ allowBlank: true }), // can be blank
  propertyName: validateNumber({ integer: true }), // must be an integer
  propertyName: validateNumber({ lt: 10 }), // less than 10
  propertyName: validateNumber({ lte: 10 }), // less than or equal to 10
  propertyName: validateNumber({ gt: 5 }), // greater than 5
  propertyName: validateNumber({ gte: 10 }), // greater than or equal to 10
  propertyName: validateNumber({ positive: true }), // must be a positive number
  propertyName: validateNumber({ odd: true }), // must be an odd number
  propertyName: validateNumber({ even: true }), // must be an even number
  propertyName: validateNumber({ multipleOf: 7 }) // must be a multiple of 7
}
```

#### `format`

Validates a `String` based on a regular expression.
```js
{
  propertyName: validateFormat({ allowBlank: true }), // can be blank
  propertyName: validateFormat({ type: 'email' }), // built-in email format
  propertyName: validateFormat({ type: 'url' }), // built-in URL format
  propertyName: validateFormat({ regex: /\w{6,30}/ }) // custom regular expression
  propertyName: validateFormat({ type: 'email', inverse: true }) // passes if the value doesn't match the given format
}
```

#### `confirmation`

Validates that a field has the same value as another.
```js
{
  propertyName: validateConfirmation({ on: 'password' }), // must match 'password'
  propertyName: validateConfirmation({ allowBlank: true }), // can be blank
}
```

