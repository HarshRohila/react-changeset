import validateNumber from './number';

test('it accepts an `allowBlank` option', function () {
  let key = 'age';
  let options = { allowBlank: true };
  let validator = validateNumber(options);

  expect(validator(key, '')).toEqual(true);
  expect(validator(key, null)).toEqual(true);
  expect(validator(key, undefined)).toEqual(true);
  expect(validator(key, '6')).toEqual(true);

  expect(validator(key, 'not a number')).toEqual('invalid number');
  expect(validator(key, NaN)).toEqual('invalid number');
});

test('it rejects non-numbers', function () {
  let key = 'age';
  let options = {};
  let validator = validateNumber(options);

  expect(validator(key, 'not a number')).toEqual('invalid number');
  expect(validator(key, '7')).toEqual(true);
  expect(validator(key, 7)).toEqual(true);
});

test('it rejects empty strings', function () {
  let key = 'age';
  let options = {};
  let validator = validateNumber(options);

  expect(validator(key, '')).toEqual('invalid number');
  expect(validator(key, '7')).toEqual(true);
});

test('it rejects null and undefined', function () {
  let key = 'age';
  let options = {};
  let validator = validateNumber(options);

  expect(validator(key, null)).toEqual('invalid number');
  expect(validator(key, undefined)).toEqual('invalid number');
});

test('it accepts an `integer` option', function () {
  let key = 'age';
  let options = { integer: true };
  let validator = validateNumber(options);

  expect(validator(key, '8.5')).toEqual('invalid number');
  expect(validator(key, '7')).toEqual(true);
});

test('it accepts an `is` option', function () {
  let key = 'age';
  let options = { is: 12 };
  let validator = validateNumber(options);

  expect(validator(key, '8.5')).toEqual('invalid number');
  expect(validator(key, '12')).toEqual(true);
});

test('it accepts a `lt` option', function () {
  let key = 'age';
  let options = { lt: 12 };
  let validator = validateNumber(options);

  expect(validator(key, '15')).toEqual('invalid number');
  expect(validator(key, '12')).toEqual('invalid number');
  expect(validator(key, '4')).toEqual(true);
});

test('it accepts a `lte` option', function () {
  let key = 'age';
  let options = { lte: 12 };
  let validator = validateNumber(options);

  expect(validator(key, '15')).toEqual('invalid number');
  expect(validator(key, '12')).toEqual(true);
  expect(validator(key, '4')).toEqual(true);
});

test('it accepts a `gt` option', function () {
  let key = 'age';
  let options = { gt: 12 };
  let validator = validateNumber(options);

  expect(validator(key, '15')).toEqual(true);
  expect(validator(key, '12')).toEqual('invalid number');
  expect(validator(key, '4')).toEqual('invalid number');
});

test('it accepts a `gte` option', function () {
  let key = 'age';
  let options = { gte: 12 };
  let validator = validateNumber(options);

  expect(validator(key, '15')).toEqual(true);
  expect(validator(key, '12')).toEqual(true);
  expect(validator(key, '4')).toEqual('invalid number');
});

test('it accepts a `positive` option', function () {
  let key = 'age';
  let options = { positive: true };
  let validator = validateNumber(options);

  expect(validator(key, '15')).toEqual(true);
  expect(validator(key, '-12')).toEqual('invalid number');
});

test('it accepts an `odd` option', function () {
  let key = 'age';
  let options = { odd: true };
  let validator = validateNumber(options);

  expect(validator(key, '15')).toEqual(true);
  expect(validator(key, '34')).toEqual('invalid number');
});

test('it accepts an `even` option', function () {
  let key = 'age';
  let options = { even: true };
  let validator = validateNumber(options);

  expect(validator(key, '15')).toEqual('invalid number');
  expect(validator(key, '34')).toEqual(true);
});

test('it accepts an `multipleOf` option', function () {
  let key = 'age';
  let options = { multipleOf: 17 };
  let validator = validateNumber(options);

  expect(validator(key, '15')).toEqual('invalid number');
  expect(validator(key, '34')).toEqual(true);
});

test('it can output custom message string', function () {
  let key = 'age';
  let options = { even: true, message: `Even ${key} is wrong` };
  let validator = validateNumber(options);

  expect(validator(key, 33)).toEqual(`Even ${key} is wrong`);
});

test('it can output custom message function', function () {
  let key = 'age';
  let options = {
    even: true,
    message: function (_key: string, value: any, context) {
      expect(_key).toEqual(key);
      expect(value).toEqual(33);
      expect(context.even).toEqual(true);

      return 'some test message';
    },
  };
  let validator = validateNumber(options);

  expect(validator(key, 33)).toEqual('some test message');
});
