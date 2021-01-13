import validateFormat from './format';

test('it accepts an empty options', function () {
  let key = 'email';
  let options = {};
  let validator = validateFormat(options);

  expect(validator(key, '')).toBeTruthy();
});

test('it accepts an `allowBlank` option', function () {
  let key = 'email';
  let options = { allowBlank: true, type: 'email' as 'email' };
  let validator = validateFormat(options);

  expect(validator(key, '')).toBeTruthy();
});

test('it accepts a `type` option', function () {
  let key = 'URL';
  let options = { type: 'url' as 'url', message: 'Invalid' };
  let validator = validateFormat(options);

  expect(validator(key, 'http://lauren.com')).toBeTruthy();
  expect(validator(key, 'somevalue')).toEqual(options.message);
});

test('it accepts a `regex` option', function () {
  let key = 'secret';
  let options = { regex: /^secretword$/, message: 'Invalid' };
  let validator = validateFormat(options);

  expect(validator(key, 'secretword')).toBeTruthy();
  expect(validator(key, 'fail')).toEqual(options.message);
});

test('it accepts an `inverse` option with defined regex', function () {
  let key = 'email';
  let options = { type: 'email' as 'email', inverse: true, message: 'Invalid' };
  let validator = validateFormat(options);

  expect(validator(key, 'test@example.com')).toEqual(options.message);
  expect(validator(key, 'notanemail')).toBeTruthy();
});

test('it accepts an `inverse` option with custom regex', function () {
  let key = 'custom';
  let options = { regex: /^customregex$/, inverse: true, message: 'Invalid' };
  let validator = validateFormat(options);

  expect(validator(key, 'customregex')).toEqual(options.message);
  expect(validator(key, 'notmatching')).toBeTruthy();
});

test('it can output custom message string', function () {
  let key = 'URL';
  let options = {
    type: 'url' as 'url',
    message: 'Invalid URL',
  };
  let validator = validateFormat(options);

  expect(validator(key, 'notaurl')).toEqual(options.message);
});

test('it can output custom message function', function () {
  let key = 'URL';
  let options = {
    type: 'url' as 'url',
    message: function (key, type, value, context) {
      expect(key).toEqual('URL');
      expect(type).toEqual('url');
      expect(value).toEqual('notaurl');
      expect(context.type).toEqual('url');

      return 'some test message';
    },
  };
  let validator = validateFormat(options);

  expect(validator(key, 'notaurl')).toEqual('some test message');
});
