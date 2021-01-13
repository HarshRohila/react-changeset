import validatePresence from './presence';

test('it accepts a `true` option', function () {
  let key = 'firstName';
  let validator = validatePresence(true);

  expect(validator(key, undefined)).toEqual(`${key} blank`);
  expect(validator(key, null)).toEqual(`${key} blank`);
  expect(validator(key, '')).toEqual(`${key} blank`);
  expect(validator(key, 'a')).toBeTruthy();
});

test('it accepts a `false` option', function () {
  let key = 'firstName';
  let validator = validatePresence(false);

  expect(validator(key, undefined)).toBeTruthy();
  expect(validator(key, null)).toBeTruthy();
  expect(validator(key, '')).toBeTruthy();
  expect(validator(key, 'a')).toEqual(`${key} present`);
});

test('it accepts a true `presence` option', function () {
  let key = 'firstName';
  let validator = validatePresence({ presence: true });

  expect(validator(key, undefined)).toEqual(`${key} blank`);
  expect(validator(key, null)).toEqual(`${key} blank`);
  expect(validator(key, '')).toEqual(`${key} blank`);
  expect(validator(key, 'a')).toBeTruthy();
});

test('it accepts a false `presence` option', function () {
  let key = 'firstName';
  let validator = validatePresence({ presence: false });

  expect(validator(key, undefined)).toBeTruthy();
  expect(validator(key, null)).toBeTruthy();
  expect(validator(key, '')).toBeTruthy();
  expect(validator(key, 'a')).toEqual(`${key} present`);
});

test('it can output a custom message string', function () {
  let key = 'firstName';
  let options = { presence: true, message: 'firstName should be present' };
  let validator = validatePresence(options);

  expect(validator(key, '')).toEqual(options.message);
});

test('it can output a custom message function', function () {
  let key = 'firstName';
  let options = {
    presence: false,
    message: function (_key: any, type: any, value: any, context: { presence: any; }) {
      expect(_key).toEqual(key);
      expect(type).toEqual('blank');
      expect(value).toEqual('test');
      expect(context.presence).toBeFalsy();

      return 'some test message';
    },
  };
  let validator = validatePresence(options);

  expect(validator(key, 'test')).toEqual('some test message');
});
