import isLength from 'validator/es/lib/isLength';

interface LengthOptions {
  is?: number;
  min?: number;
  max?: number;
  message?: string | Function;
}

export default function validateLength(options: LengthOptions = {}) {
  options = { message: 'invalid length', ...options };

  if (options.is) {
    options.max = options.min = options.is;
  }

  return (key: string, value: any) => {
    const isValid = isLength(value, options);

    if (isValid) {
      return true;
    }

    if (typeof options.message === 'function') {
      return options.message(key, 'wrongLength', value, options);
    }

    return options.message;
  };
}
