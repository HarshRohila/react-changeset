import isEmail from 'validator/es/lib/isEmail';
import isURL from 'validator/es/lib/isURL';
import isEmpty from 'validator/es/lib/isEmpty';

interface Types {
  email: string;
  url: string;
}

const TYPES: Types = {
  email: 'email',
  url: 'url',
};

interface FormatOptions {
  type?: keyof Types;
  allowBlank?: boolean;
  regex?: RegExp;
  inverse?: boolean;
  message?: string | Function;
}

export default function validateFormat(options: FormatOptions = {}) {
  if (options.type && !Object.keys(TYPES).includes(options.type)) {
    console.error('invalid type field value');
  }

  return (_key: string, value: string) => {
    if (options.allowBlank && isEmpty(value)) {
      return true;
    }

    const validate = options.type ? getValidateFn(options.type) : () => true;
    // @ts-ignore
    const isValid = validate(value, options);

    const isRegexValid = options.regex ? options.regex.test(value) : true;

    let isValidValue = isValid && isRegexValid;

    isValidValue = options.inverse ? !isValidValue : isValidValue;

    if (isValidValue) {
      return true;
    }

    if (typeof options.message === 'function') {
      return options.message(_key, options.type, value, options);
    }

    return options.message ? options.message : 'Invalid format';
  };
}

function getValidateFn(type: keyof Types) {
  switch (type) {
    case TYPES.email:
      return isEmail;
    case TYPES.url:
      return isURL;
    default:
      return () => true
  }
}
