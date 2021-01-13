# React Changeset

It provides a react hook on top of [validated-changeset](https://github.com/validated-changeset/validated-changeset/) library (which is base library for [`ember-changeset`](https://github.com/poteto/ember-changeset))

It makes forms easy to handle

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
import useChangeset from 'react-changeset';

// without validations
const { userChangeset } = useChangeset(user);

// with validations
const userChangeset = useChangeset(
  user,
  lookupValidator(validationMap),
  validationMap
);
```

Example validation map [here]()

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
{
  userChangeset.error.username && userChangeset.error.username.validation[0];
}
```

For complete changeset API, visit [validated-changeset](https://github.com/validated-changeset/validated-changeset/)

For full react form example, [view]()

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
