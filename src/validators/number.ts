import isInt from 'validator/es/lib/isInt';
import isFloat from 'validator/es/lib/isFloat';
import getMessage from '../utils/getMessage';

interface NumberOptions {
  integer?: boolean;
  allowBlank?: boolean;
  message?: string | Function;
  is?: number;
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  positive?: boolean;
  odd?: boolean;
  even?: boolean;
  multipleOf?: number;
}

export default function validateNumber(options: NumberOptions = {}) {
  options = { message: 'invalid number', integer: false, ...options };

  return (key: string, value: any) => {
    const originalValue = value;

    if (options.allowBlank) {
      if ([undefined, null].includes(value) || value === '') {
        return true;
      }
    }

    if (options.is) {
      return options.is === +value
        ? true
        : getMessage(key, originalValue, options);
    }

    if (typeof value === 'number') {
      if (isNaN(value)) {
        return getMessage(key, originalValue, options);
      }
      value = value.toString();
    }

    if (typeof value !== 'string') {
      return getMessage(key, originalValue, options);
    }

    const isValid = options.integer ? isInt : isFloat;

    if (options.lte) {
      options.lt = options.lte + 1;
    }

    if (options.gte) {
      options.gt = options.gte - 1;
    }

    // @ts-ignore
    let isValidValue = isValid(value, options);

    isValidValue = options.positive
      ? isValidValue && +value >= 0
      : isValidValue;

    isValidValue =
      isValidValue && options.odd
        ? isValidValue && +value % 2 !== 0
        : isValidValue;

    isValidValue =
      isValidValue && options.even
        ? isValidValue && +value % 2 === 0
        : isValidValue;

    isValidValue =
      isValidValue && options.multipleOf
        ? isValidValue && +value % options.multipleOf === 0
        : isValidValue;

    return isValidValue === true
      ? true
      : getMessage<NumberOptions>(key, originalValue, options);
  };
}
