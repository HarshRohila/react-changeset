import validateConfirmation from './confirmation';

const INVALID_MSG = 'invalid';

test('it accepts an `on` option', function () {
  let changes = { password: '1234567' };
  let key = 'passwordConfirmation';
  let opts = { on: 'password' };
  let validator = validateConfirmation(opts);

  expect(validator(key, undefined, undefined, changes)).toEqual(INVALID_MSG);
  expect(validator(key, null, undefined, changes)).toEqual(INVALID_MSG);
  expect(validator(key, '', undefined, changes)).toEqual(INVALID_MSG);
  expect(validator(key, '1234567', undefined, changes)).toEqual(true);
});

test('it can output custom message string', function () {
  let changes = { password: '1234567' };
  let key = 'passwordConfirmation';
  let opts = {
    on: 'password',
    message: 'password confirmation is not equal to password',
  };
  let validator = validateConfirmation(opts);

  expect(validator(key, undefined, undefined, changes)).toEqual(
    'password confirmation is not equal to password'
  );
});

test('it can output with custom message function', function () {
  let changes = { password: '1234567' };
  let key = 'passwordConfirmation';
  let opts = {
    on: 'password',
    message: function (key: string, value: any, context: { on: any }) {
      expect(key).toEqual(key);
      expect(value).toEqual('testValue');
      expect(context.on).toEqual(opts.on);

      return 'some test message';
    },
  };
  let validator = validateConfirmation(opts);

  expect(validator(key, 'testValue', undefined, changes)).toEqual(
    'some test message'
  );
});

test('it accepts an `allowBlank` option', function () {
  let key = 'email';
  let options = { allowBlank: true, on: 'foo' };
  let validator = validateConfirmation(options);

  expect(validator(key, '')).toEqual(true);
});
