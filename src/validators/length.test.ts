import validateLength from './length';

test('it accepts a `min` option', function () {
  let key = 'firstName';
  let options = { min: 1 };
  let validator = validateLength(options);

  expect(validator(key, '')).toEqual('invalid length');
  expect(validator(key, 'a')).toBeTruthy();
});

test('it accepts a `max` option', function () {
  let key = 'firstName';
  let options = { max: 1 };
  let validator = validateLength(options);

  expect(validator(key, '')).toBeTruthy();
  expect(validator(key, 'a')).toBeTruthy();
  expect(validator(key, 'ab')).toEqual('invalid length');
});

test('it accepts a `min` and `max` option', function () {
  let key = 'firstName';
  let options = { min: 1, max: 3 };
  let validator = validateLength(options);

  expect(validator(key, '')).toEqual('invalid length');
  expect(validator(key, 'a')).toBeTruthy();
  expect(validator(key, 'ab')).toBeTruthy();
  expect(validator(key, 'abc')).toBeTruthy();
  expect(validator(key, 'abcd')).toEqual('invalid length');
});

test('it accepts an `is` option', function () {
  let key = 'firstName';
  let options = { is: 2 };
  let validator = validateLength(options);

  expect(validator(key, 'a')).toEqual('invalid length');
  expect(validator(key, 'ab')).toBeTruthy();
  expect(validator(key, 'abc')).toEqual('invalid length');
});

test('it can output custom message string', function () {
  let key = 'firstName';
  let options = { is: 2, message: 'First name should be length 2' };
  let validator = validateLength(options);

  expect(validator(key, 'abc')).toEqual('First name should be length 2');
});

test('it can output custom message function', function () {
  let key = 'firstName';
  let options = {
    is: 2,
    message: function (_key, type, value, context) {
      expect(_key).toEqual(key);
      expect(type).toEqual('wrongLength');
      expect(value).toEqual('abc');
      expect(context.is).toEqual(2);

      return 'some test message';
    },
  };
  let validator = validateLength(options);

  expect(validator(key, 'abc')).toEqual('some test message');
});
